import { ImageSourcePropType } from "react-native";

export type Kpi = {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "flat";
};

export type EventSummary = {
  id: string;
  title: string;
  time: string;
  location: string;
  status: string;
};

export type OpsUpdate = {
  id: string;
  title: string;
  detail: string;
};

export type Venue = {
  id: string;
  name: string;
  address: string;
  price: string;
  image: ImageSourcePropType;
};

export type Announcement = {
  id: string;
  title: string;
  detail: string;
  time: string;
};

export type Program = {
  id: string;
  title: string;
  detail: string;
};

export type Matchup = {
  id: string;
  title: string;
  time: string;
  venue: string;
  slots: string;
};

export type Booking = {
  id: string;
  venue: string;
  time: string;
  court: string;
  status?: string;
};

export type ProfileBadge = {
  id: string;
  label: string;
  tone: "primary" | "success";
};

export type Preference = {
  id: string;
  label: string;
  state: string;
};

export type Profile = {
  id: string;
  name: string;
  role: string;
  region: string;
  badges: ProfileBadge[];
  permissions: string[];
  preferences: Preference[];
};

export type HomeData = {
  kpis: Kpi[];
  events: EventSummary[];
  operations: OpsUpdate[];
  venues: Venue[];
};

export type CommunityData = {
  announcements: Announcement[];
  programs: Program[];
};

export type MatchupsData = {
  matchups: Matchup[];
  divisions: string[];
};

export type BookingsData = {
  upcoming: Booking[];
  recent: Booking[];
};

export type ProfileData = {
  profile: Profile;
};
