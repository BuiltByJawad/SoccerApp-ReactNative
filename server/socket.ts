import type { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import type { IStorage } from "./storage";

let io: SocketIOServer;

export function setupSocketIO(httpServer: Server): SocketIOServer {
  io = new SocketIOServer(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] },
    path: "/socket.io",
  });

  io.use((socket, next) => {
    const sessionId = socket.handshake.auth.sessionId || socket.handshake.headers.cookie;
    if (!sessionId) {
      return next(new Error("Authentication required"));
    }
    next();
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;
    if (userId) {
      socket.join(`user:${userId}`);
    }
    socket.join("admins");
  });

  return io;
}

export function getIO(): SocketIOServer {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}

export function notifyUser(userId: string, event: string, data: unknown): void {
  if (!io) return;
  io.to(`user:${userId}`).emit(event, data);
}

export function notifyAdmins(event: string, data: unknown): void {
  if (!io) return;
  io.to("admins").emit(event, data);
}
