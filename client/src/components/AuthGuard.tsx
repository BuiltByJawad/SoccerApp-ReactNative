import React from "react";
import { Redirect } from "wouter";
import { useAuth } from "../hooks/useAuth";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading, unauthorized } = useAuth(true);
  if (loading) return <div style={{ color: "#94a3b8", textAlign: "center", padding: 40 }}>Loading...</div>;
  if (unauthorized) return <Redirect to="/login" />;
  return <>{children}</>;
}

export function RequirePlayer({ children }: { children: React.ReactNode }) {
  const { user, loading, unauthorized } = useAuth(true);
  if (loading) return <div style={{ color: "#94a3b8", textAlign: "center", padding: 40 }}>Loading...</div>;
  if (unauthorized) return <Redirect to="/login" />;
  if (user?.role === "admin") return <Redirect to="/admin" />;
  return <>{children}</>;
}

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, loading, unauthorized, forbidden } = useAuth("admin");
  if (loading) return <div style={{ color: "#94a3b8", textAlign: "center", padding: 40 }}>Loading...</div>;
  if (unauthorized) return <Redirect to="/login" />;
  if (forbidden) return <Redirect to="/home" />;
  return <>{children}</>;
}
