import type { Express, RequestHandler } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto";
import { Buffer } from "node:buffer";
import type { User } from "@shared/schema";
import type { IStorage } from "./storage";
import { pool } from "./db";

export async function ensureSessionTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "session" (
      "sid" varchar NOT NULL,
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL,
      CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
    );
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
  `);
}

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      role: string;
    }
  }
}

const PBKDF2_ITERATIONS = 210_000;
const PBKDF2_KEYLEN = 32;
const PBKDF2_DIGEST = "sha256";

function hashPassword(plain: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      plain,
      salt,
      PBKDF2_ITERATIONS,
      PBKDF2_KEYLEN,
      PBKDF2_DIGEST,
      (err: NodeJS.ErrnoException | null, derivedKey: Buffer) => {
        if (err) return reject(err);
        resolve(derivedKey.toString("hex"));
      },
    );
  });
}

export async function createPasswordHash(plain: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashed = await hashPassword(plain, salt);
  return `pbkdf2$${PBKDF2_ITERATIONS}$${salt}$${hashed}`;
}

export async function verifyPassword(
  plain: string,
  stored: string,
): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;

  const iterations = Number(parts[1]);
  const salt = parts[2];
  const hash = parts[3];

  if (!Number.isFinite(iterations) || iterations <= 0) return false;

  const computed = await new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      plain,
      salt,
      iterations,
      PBKDF2_KEYLEN,
      PBKDF2_DIGEST,
      (err: NodeJS.ErrnoException | null, derivedKey: Buffer) => {
        if (err) return reject(err);
        resolve(derivedKey.toString("hex"));
      },
    );
  });

  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(computed, "hex"));
}

export function setupAuth(app: Express, storage: IStorage): void {
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is required");
  }

  const PgSession = connectPgSimple(session);

  app.use(
    session({
      store: new PgSession({
        pool,
        tableName: "session",
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      async (
        username: string,
        password: string,
        done: (error: unknown, user?: Express.User | false) => void,
      ) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) return done(null, false);

        const ok = await verifyPassword(password, user.password);
        if (!ok) return done(null, false);

        return done(null, user);
      } catch (err) {
        return done(err);
      }
      },
    ),
  );

  passport.serializeUser((user: Express.User, done: (err: unknown, id?: string) => void) => {
    done(null, user.id);
  });

  passport.deserializeUser(
    async (
      id: string,
      done: (err: unknown, user?: Express.User | false) => void,
    ) => {
    try {
      const user = await storage.getUser(id);
      if (!user) return done(null, false);
      done(null, user);
    } catch (err) {
      done(err);
    }
    },
  );
}

export const requireAuth: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Unauthorized" });
};

export const requireAdmin: RequestHandler = (req, res, next) => {
  if (!(req.isAuthenticated && req.isAuthenticated())) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = req.user as User | undefined;
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  return next();
};
