import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("player"),
  imageUrl: text("image_url"),
  resetToken: text("reset_token"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const venues = pgTable("venues", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(),
  location: text("location").notNull(),
  slots: integer("slots").notNull().default(0),
  active: boolean("active").notNull().default(true),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertVenueSchema = createInsertSchema(venues).pick({
  name: true,
  type: true,
  location: true,
  slots: true,
});

export const updateVenueSchema = z
  .object({
    name: z.string().min(1).optional(),
    type: z.string().min(1).optional(),
    location: z.string().min(1).optional(),
    slots: z.number().int().min(0).optional(),
    active: z.boolean().optional(),
  })
  .strict();

export const bookingStatusSchema = z.enum(["pending", "confirmed", "cancelled"]);

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  venueId: varchar("venue_id").notNull(),
  type: text("type").notNull(),
  dateLabel: text("date_label").notNull(),
  timeLabel: text("time_label").notNull(),
  amount: integer("amount").notNull(),
  status: text("status").notNull().default("pending"),
  split: boolean("split").notNull().default(false),
  teammates: integer("teammates").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).pick({
  userId: true,
  venueId: true,
  type: true,
  dateLabel: true,
  timeLabel: true,
  amount: true,
  split: true,
  teammates: true,
});

export const updateBookingSchema = z
  .object({
    status: bookingStatusSchema.optional(),
  })
  .strict();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertVenue = z.infer<typeof insertVenueSchema>;
export type Venue = typeof venues.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
