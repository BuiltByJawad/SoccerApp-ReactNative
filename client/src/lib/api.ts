const BASE = "";

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export interface AuthUser {
  id: string;
  username: string;
  role: string;
  imageUrl: string | null;
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  location: string;
  slots: number;
  active: boolean;
  imageUrl: string | null;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  venueId: string;
  type: string;
  dateLabel: string;
  timeLabel: string;
  amount: number;
  status: "pending" | "confirmed" | "cancelled";
  split: boolean;
  teammates: number;
  createdAt: string;
}

export const api = {
  auth: {
    me: () => request<{ user: AuthUser | null }>("/api/auth/me"),
    register: (username: string, password: string) =>
      request<AuthUser>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }),
    login: (username: string, password: string) =>
      request<AuthUser>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }),
    logout: () =>
      request<{ ok: boolean }>("/api/auth/logout", { method: "POST" }),
    updateProfile: (data: { username?: string; password?: string }) =>
      request<{ user: AuthUser }>("/api/auth/profile", {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    forgotPassword: (username: string) =>
      request<{ message: string; hint?: string }>("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ username }),
      }),
    resetPassword: (username: string, token: string, password: string) =>
      request<{ message: string }>("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ username, token, password }),
      }),
    uploadAvatar: async (file: File) => {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch("/api/upload/avatar", { method: "POST", body: fd, credentials: "include" });
      if (!res.ok) { const b = await res.json().catch(() => ({ message: res.statusText })); throw new Error(b.message || `Upload failed: ${res.status}`); }
      return res.json() as Promise<{ url: string }>;
    },
  },

  venues: {
    list: () => request<{ venues: Venue[] }>("/api/venues"),
    get: (id: string) => request<{ venue: Venue }>(`/api/venues/${id}`),
  },

  bookings: {
    list: () => request<{ bookings: Booking[] }>("/api/bookings"),
    create: (data: Omit<Booking, "id" | "userId" | "status" | "createdAt">) =>
      request<{ booking: Booking }>("/api/bookings", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    cancel: (id: string) =>
      request<{ booking: Booking }>(`/api/bookings/${id}/cancel`, {
        method: "PATCH",
      }),
  },

  payments: {
    initiate: (data: {
      venueId: string;
      type: string;
      dateLabel: string;
      timeLabel: string;
      amount: number;
      split: boolean;
      teammates: number;
    }) =>
      request<{ gatewayUrl: string; tranId: string; bookingId: string }>("/api/payments/initiate", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  admin: {
    venues: {
      list: () => request<{ venues: Venue[] }>("/api/admin/venues"),
      create: (data: Pick<Venue, "name" | "type" | "location" | "slots">) =>
        request<{ venue: Venue }>("/api/admin/venues", {
          method: "POST",
          body: JSON.stringify(data),
        }),
      update: (id: string, data: Partial<Pick<Venue, "name" | "type" | "location" | "slots" | "imageUrl"> & { active: boolean }>) =>
        request<{ venue: Venue }>(`/api/admin/venues/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        }),
      uploadImage: async (file: File) => {
        const fd = new FormData();
        fd.append("image", file);
        const res = await fetch("/api/upload/venue", { method: "POST", body: fd, credentials: "include" });
        if (!res.ok) { const b = await res.json().catch(() => ({ message: res.statusText })); throw new Error(b.message || `Upload failed: ${res.status}`); }
        return res.json() as Promise<{ url: string }>;
      },
    },
    bookings: {
      list: () => request<{ bookings: Booking[] }>("/api/admin/bookings"),
      updateStatus: (id: string, status: "pending" | "confirmed" | "cancelled") =>
        request<{ booking: Booking }>(`/api/admin/bookings/${id}/status`, {
          method: "PATCH",
          body: JSON.stringify({ status }),
        }),
    },
  },
};
