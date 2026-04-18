import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { type Booking } from "../lib/api";

interface SocketNotification {
  booking: Booking;
  userId?: string;
}

export function useSocket(userId?: string) {
  const socketRef = useRef<Socket | null>(null);
  const [notifications, setNotifications] = useState<SocketNotification[]>([]);

  useEffect(() => {
    const socket = io({
      path: "/socket.io",
      auth: { userId },
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[socket] connected", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("[socket] disconnected");
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId]);

  const onBookingCreated = useCallback((handler: (data: SocketNotification) => void) => {
    const socket = socketRef.current;
    if (!socket) return () => {};
    socket.on("booking:created", handler);
    return () => { socket.off("booking:created", handler); };
  }, []);

  const onBookingCancelled = useCallback((handler: (data: SocketNotification) => void) => {
    const socket = socketRef.current;
    if (!socket) return () => {};
    socket.on("booking:cancelled", handler);
    return () => { socket.off("booking:cancelled", handler); };
  }, []);

  const onBookingStatus = useCallback((handler: (data: SocketNotification) => void) => {
    const socket = socketRef.current;
    if (!socket) return () => {};
    socket.on("booking:status", handler);
    return () => { socket.off("booking:status", handler); };
  }, []);

  const onBookingNew = useCallback((handler: (data: SocketNotification) => void) => {
    const socket = socketRef.current;
    if (!socket) return () => {};
    socket.on("booking:new", handler);
    return () => { socket.off("booking:new", handler); };
  }, []);

  return { notifications, setNotifications, onBookingCreated, onBookingCancelled, onBookingStatus, onBookingNew };
}
