import type { Express } from "express";
import type { Server } from "http";
import passport from "passport";
import { z } from "zod";
import {
  bookingStatusSchema,
  insertBookingSchema,
  insertUserSchema,
  insertVenueSchema,
  updateVenueSchema,
} from "@shared/schema";
import { setupAuth, requireAdmin, requireAuth, createPasswordHash, ensureSessionTable } from "./auth";
import { storage } from "./storage";
import { upload, uploadImage, uploadAvatar } from "./upload";
import { initPayment, validatePayment } from "./payment";
import { notifyUser, notifyAdmins } from "./socket";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  await ensureSessionTable();
  setupAuth(app, storage);

  const idParamSchema = z.object({ id: z.string().min(1) }).strict();

  app.post("/api/auth/register", async (req, res, next) => {
    try {
      const parsed = insertUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: parsed.error.message });
      }

      const existing = await storage.getUserByUsername(parsed.data.username);
      if (existing) {
        return res.status(409).json({ message: "Username already exists" });
      }

      const passwordHash = await createPasswordHash(parsed.data.password);
      const user = await storage.createUser({
        username: parsed.data.username,
        password: passwordHash,
      });

      req.login(user, (err) => {
        if (err) return next(err);
        return res.status(201).json({ id: user.id, username: user.username, role: user.role });
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: unknown, user: Express.User | false) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: "Invalid credentials" });
      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        return res.json({ id: user.id, username: user.username, role: user.role });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", requireAuth, (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy((destroyErr) => {
        if (destroyErr) return next(destroyErr);
        return res.json({ ok: true });
      });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (!(req.isAuthenticated && req.isAuthenticated())) {
      return res.status(200).json({ user: null });
    }
    const user = req.user;
    return res.status(200).json({ user: { id: user.id, username: user.username, role: user.role, imageUrl: (user as unknown as Record<string, unknown>).imageUrl as string | null || null } });
  });

  app.patch("/api/auth/profile", requireAuth, async (req, res, next) => {
    try {
      const schema = z.object({ username: z.string().min(2).max(50).optional(), password: z.string().min(6).optional() }).strict();
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
      if (!parsed.data.username && !parsed.data.password) return res.status(400).json({ message: "Nothing to update" });

      const updates: Record<string, string> = {};
      if (parsed.data.username) {
        const existing = await storage.getUserByUsername(parsed.data.username);
        if (existing && existing.id !== req.user!.id) return res.status(409).json({ message: "Username taken" });
        updates.username = parsed.data.username;
      }
      if (parsed.data.password) {
        updates.password = await createPasswordHash(parsed.data.password);
      }

      const updated = await storage.updateUser(req.user!.id, updates);
      if (!updated) return res.status(404).json({ message: "User not found" });
      req.login(updated as Express.User, (err) => {
        if (err) return next(err);
        return res.json({ user: { id: updated.id, username: updated.username, role: updated.role, imageUrl: (updated as unknown as Record<string, unknown>).imageUrl as string | null || null } });
      });
    } catch (err) { next(err); }
  });

  app.post("/api/auth/forgot-password", async (req, res, next) => {
    try {
      const schema = z.object({ username: z.string().min(1) }).strict();
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: parsed.error.message });

      const user = await storage.getUserByUsername(parsed.data.username);
      if (!user) return res.json({ message: "If that username exists, a reset token has been generated" });

      const token = Math.random().toString(36).slice(2, 10);
      await storage.updateUser(user.id, { resetToken: token });
      return res.json({ message: "If that username exists, a reset token has been generated", hint: `Reset token: ${token}` });
    } catch (err) { next(err); }
  });

  app.post("/api/auth/reset-password", async (req, res, next) => {
    try {
      const schema = z.object({ username: z.string().min(1), token: z.string().min(1), password: z.string().min(6) }).strict();
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: parsed.error.message });

      const user = await storage.getUserByUsername(parsed.data.username);
      if (!user || (user as Record<string, unknown>).resetToken !== parsed.data.token) {
        return res.status(400).json({ message: "Invalid token or username" });
      }

      const hashed = await createPasswordHash(parsed.data.password);
      await storage.updateUser(user.id, { password: hashed, resetToken: "" });
      return res.json({ message: "Password reset successfully" });
    } catch (err) { next(err); }
  });

  app.get("/api/venues", async (_req, res, next) => {
    try {
      const all = await storage.listVenues();
      const active = all.filter((v) => v.active);
      res.json({ venues: active });
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/venues/:id", async (req, res, next) => {
    try {
      const parsedId = idParamSchema.safeParse(req.params);
      if (!parsedId.success) return res.status(400).json({ message: "Invalid id" });

      const venue = await storage.getVenue(parsedId.data.id);
      if (!venue || !venue.active) return res.status(404).json({ message: "Not found" });
      return res.json({ venue });
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/bookings", requireAuth, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const list = await storage.listBookings({ userId });
      res.json({ bookings: list });
    } catch (err) {
      next(err);
    }
  });

  const createBookingBodySchema = insertBookingSchema.omit({ userId: true });
  app.post("/api/payments/initiate", requireAuth, async (req, res, next) => {
    try {
      const schema = z.object({
        venueId: z.string().min(1),
        type: z.string().min(1),
        dateLabel: z.string().min(1),
        timeLabel: z.string().min(1),
        amount: z.number().positive(),
        split: z.boolean(),
        teammates: z.number().min(0),
      }).strict();
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: parsed.error.message });

      const venue = await storage.getVenue(parsed.data.venueId);
      if (!venue || !venue.active) return res.status(400).json({ message: "Invalid venue" });

      const tranId = `TXN_${Date.now()}_${req.user!.id.slice(0, 8)}`;
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      const gatewayUrl = await initPayment({
        totalAmount: parsed.data.amount,
        tranId,
        cusName: req.user!.username,
        cusEmail: "",
        cusPhone: "",
        successUrl: `${baseUrl}/api/payments/success`,
        failUrl: `${baseUrl}/api/payments/fail`,
        cancelUrl: `${baseUrl}/api/payments/cancel`,
        productName: `${venue.name} - ${parsed.data.type} Booking`,
      });

      const booking = await storage.createBooking({
        ...parsed.data,
        userId: req.user!.id,
      });

      notifyAdmins("booking:new", { booking, userId: req.user!.id });
      notifyUser(req.user!.id, "booking:created", { booking });

      return res.json({ gatewayUrl, tranId, bookingId: booking.id });
    } catch (err) { next(err); }
  });

  app.post("/api/payments/success", async (req, res, next) => {
    try {
      const { tran_id, val_id, amount, status } = req.body;
      if (status === "VALID" || status === "VALIDATED") {
        return res.redirect(`/confirmation?tranId=${tran_id}&status=success`);
      }
      return res.redirect(`/checkout?error=payment_failed`);
    } catch (err) { next(err); }
  });

  app.post("/api/payments/fail", async (_req, res) => {
    return res.redirect(`/checkout?error=payment_failed`);
  });

  app.post("/api/payments/cancel", async (_req, res) => {
    return res.redirect(`/bookings`);
  });

  app.post("/api/bookings", requireAuth, async (req, res, next) => {
    try {
      const parsed = createBookingBodySchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: parsed.error.message });

      const venue = await storage.getVenue(parsed.data.venueId);
      if (!venue || !venue.active) return res.status(400).json({ message: "Invalid venue" });

      const booking = await storage.createBooking({
        ...parsed.data,
        userId: req.user!.id,
      });
      return res.status(201).json({ booking });
    } catch (err) {
      next(err);
    }
  });

  app.patch("/api/bookings/:id/cancel", requireAuth, async (req, res, next) => {
    try {
      const parsedId = idParamSchema.safeParse(req.params);
      if (!parsedId.success) return res.status(400).json({ message: "Invalid id" });

      const booking = await storage.getBooking(parsedId.data.id);
      if (!booking) return res.status(404).json({ message: "Booking not found" });
      if (booking.userId !== req.user!.id) return res.status(403).json({ message: "Not your booking" });
      if (booking.status === "cancelled") return res.status(400).json({ message: "Already cancelled" });

      const updated = await storage.updateBookingStatus(parsedId.data.id, "cancelled");
      notifyUser(booking.userId, "booking:cancelled", { booking: updated });
      notifyAdmins("booking:updated", { booking: updated });
      return res.json({ booking: updated });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/upload/venue", requireAdmin, upload.single("image"), async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No file" });
      const url = await uploadImage(req.file.buffer, "venues");
      return res.json({ url });
    } catch (err) { next(err); }
  });

  app.post("/api/upload/avatar", requireAuth, upload.single("image"), async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No file" });
      const url = await uploadAvatar(req.file.buffer, "avatars");
      await storage.updateUser(req.user!.id, { imageUrl: url });
      return res.json({ url });
    } catch (err) { next(err); }
  });

  app.get("/api/admin/venues", requireAdmin, async (_req, res, next) => {
    try {
      const list = await storage.listVenues();
      res.json({ venues: list });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/admin/venues", requireAdmin, async (req, res, next) => {
    try {
      const parsed = insertVenueSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: parsed.error.message });

      const venue = await storage.createVenue(parsed.data);
      return res.status(201).json({ venue });
    } catch (err) {
      next(err);
    }
  });

  app.patch("/api/admin/venues/:id", requireAdmin, async (req, res, next) => {
    try {
      const parsedId = idParamSchema.safeParse(req.params);
      if (!parsedId.success) return res.status(400).json({ message: "Invalid id" });

      const parsedBody = updateVenueSchema.safeParse(req.body);
      if (!parsedBody.success) return res.status(400).json({ message: parsedBody.error.message });

      const updated = await storage.updateVenue(parsedId.data.id, parsedBody.data);
      if (!updated) return res.status(404).json({ message: "Not found" });
      return res.json({ venue: updated });
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/admin/bookings", requireAdmin, async (_req, res, next) => {
    try {
      const list = await storage.listBookings();
      res.json({ bookings: list });
    } catch (err) {
      next(err);
    }
  });

  app.patch("/api/admin/bookings/:id/status", requireAdmin, async (req, res, next) => {
    try {
      const parsedId = idParamSchema.safeParse(req.params);
      if (!parsedId.success) return res.status(400).json({ message: "Invalid id" });

      const bodySchema = z.object({ status: bookingStatusSchema }).strict();
      const parsedBody = bodySchema.safeParse(req.body);
      if (!parsedBody.success) return res.status(400).json({ message: parsedBody.error.message });

      const updated = await storage.updateBookingStatus(parsedId.data.id, parsedBody.data.status);
      if (!updated) return res.status(404).json({ message: "Not found" });
      notifyUser(updated.userId, "booking:status", { booking: updated });
      return res.json({ booking: updated });
    } catch (err) {
      next(err);
    }
  });

  return httpServer;
}
