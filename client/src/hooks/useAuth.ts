import { useEffect, useState } from "react";
import { api, type AuthUser } from "../lib/api";

export function useAuth(required?: true | "admin") {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.auth
      .me()
      .then((res) => {
        setUser(res.user);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const unauthorized = !loading && !user;
  const forbidden = !loading && required === "admin" && user?.role !== "admin";

  return { user, loading, unauthorized, forbidden };
}
