import {
  bookings,
  type Booking,
  type InsertBooking,
  type InsertUser,
  type InsertVenue,
  type User,
  type Venue,
  users,
  venues,
} from "@shared/schema";
import { and, desc, eq } from "drizzle-orm";
import { db } from "./db";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, patch: Record<string, string>): Promise<User | undefined>;

  listVenues(): Promise<Venue[]>;
  getVenue(id: string): Promise<Venue | undefined>;
  createVenue(venue: InsertVenue): Promise<Venue>;
  updateVenue(id: string, patch: Partial<InsertVenue> & { active?: boolean }): Promise<Venue | undefined>;

  listBookings(filter?: { userId?: string; venueId?: string }): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: string, status: "pending" | "confirmed" | "cancelled"): Promise<Booking | undefined>;
}

export class PgStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return rows[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const rows = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    return rows[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const rows = await db.insert(users).values(user).returning();
    return rows[0];
  }

  async updateUser(id: string, patch: Record<string, string>): Promise<User | undefined> {
    const rows = await db.update(users).set(patch).where(eq(users.id, id)).returning();
    return rows[0];
  }

  async listVenues(): Promise<Venue[]> {
    return db.select().from(venues).orderBy(desc(venues.createdAt));
  }

  async getVenue(id: string): Promise<Venue | undefined> {
    const rows = await db.select().from(venues).where(eq(venues.id, id)).limit(1);
    return rows[0];
  }

  async createVenue(venue: InsertVenue): Promise<Venue> {
    const rows = await db.insert(venues).values(venue).returning();
    return rows[0];
  }

  async updateVenue(
    id: string,
    patch: Partial<InsertVenue> & { active?: boolean },
  ): Promise<Venue | undefined> {
    const rows = await db.update(venues).set(patch).where(eq(venues.id, id)).returning();
    return rows[0];
  }

  async listBookings(filter?: { userId?: string; venueId?: string }): Promise<Booking[]> {
    const conditions = [] as Array<ReturnType<typeof eq>>;
    if (filter?.userId) conditions.push(eq(bookings.userId, filter.userId));
    if (filter?.venueId) conditions.push(eq(bookings.venueId, filter.venueId));

    if (conditions.length === 0) {
      return db.select().from(bookings).orderBy(desc(bookings.createdAt));
    }

    return db
      .select()
      .from(bookings)
      .where(and(...conditions))
      .orderBy(desc(bookings.createdAt));
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const rows = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    return rows[0];
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const rows = await db.insert(bookings).values(booking).returning();
    return rows[0];
  }

  async updateBookingStatus(
    id: string,
    status: "pending" | "confirmed" | "cancelled",
  ): Promise<Booking | undefined> {
    const rows = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    return rows[0];
  }
}

export const storage = new PgStorage();
