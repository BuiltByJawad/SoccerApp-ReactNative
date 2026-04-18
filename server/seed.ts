import "dotenv/config";
import { db } from "./db";
import { users, venues } from "@shared/schema";
import { createPasswordHash } from "./auth";

async function seed() {
  console.log("Seeding database...");

  const existing = await db.select().from(users).limit(1);
  if (existing.length > 0) {
    console.log("Database already has data, skipping seed.");
    return;
  }

  const adminPasswordHash = await createPasswordHash("admin123");
  const [admin] = await db.insert(users).values({
    username: "admin",
    password: adminPasswordHash,
    role: "admin",
  }).returning();
  console.log(`Created admin user: ${admin.username} (id: ${admin.id})`);

  const playerPasswordHash = await createPasswordHash("player123");
  const [player] = await db.insert(users).values({
    username: "player1",
    password: playerPasswordHash,
    role: "player",
  }).returning();
  console.log(`Created player user: ${player.username} (id: ${player.id})`);

  const venueData = [
    { name: "DBox Sports Complex", type: "5v5 Outdoor", location: "Gulshan", slots: 6, active: true },
    { name: "Premier Football Arena", type: "7v7 Indoor", location: "Dhanmondi", slots: 4, active: true },
    { name: "Green Field Club", type: "11v11 Grass", location: "Mirpur", slots: 3, active: true },
    { name: "City Sports Hub", type: "5v5 Futsal", location: "Uttara", slots: 8, active: true },
  ];

  const insertedVenues = await db.insert(venues).values(venueData).returning();
  for (const v of insertedVenues) {
    console.log(`Created venue: ${v.name} (id: ${v.id})`);
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
