import {
  BookingsData,
  CommunityData,
  HomeData,
  MatchupsData,
  ProfileData,
} from "../types/enterprise";
import bannerImage from "../../assets/images/banner.png";
import bannerHero from "../../assets/images/banner-2.png";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const homeData: HomeData = {
  kpis: [
    {
      id: "kpi-1",
      label: "Active Venues",
      value: "128",
      trend: "+12%",
      trendDirection: "up",
    },
    {
      id: "kpi-2",
      label: "Monthly Bookings",
      value: "4,386",
      trend: "+8%",
      trendDirection: "up",
    },
    {
      id: "kpi-3",
      label: "Avg Utilization",
      value: "74%",
      trend: "+5%",
      trendDirection: "up",
    },
  ],
  events: [
    {
      id: "evt-1",
      title: "City League Week 3",
      time: "Today · 6:30 PM",
      location: "DBox Sports Complex",
      status: "Open",
    },
    {
      id: "evt-2",
      title: "Corporate 5v5 Cup",
      time: "Fri · 8:00 PM",
      location: "JAFF Arena & Academy",
      status: "Filling",
    },
    {
      id: "evt-3",
      title: "Youth Academy Trials",
      time: "Sat · 10:00 AM",
      location: "North Field Hub",
      status: "Invite",
    },
  ],
  operations: [
    {
      id: "ops-1",
      title: "Facility Audits",
      detail: "5 venues due for inspection this week",
    },
    {
      id: "ops-2",
      title: "Payments",
      detail: "96% settlements completed for February",
    },
    {
      id: "ops-3",
      title: "Support",
      detail: "12 escalations pending SLA review",
    },
  ],
  venues: [
    {
      id: "ven-1",
      name: "JAFF Arena & Academy",
      address: "RC6F+RR6, Bashundhara Main Gate, Dhaka 1229",
      price: "BDT 3,000/-",
      image: bannerImage,
    },
    {
      id: "ven-2",
      name: "DBox Sports Complex",
      address: "Plot 217, Block B, B B Rd No. 3, Dhaka 1216",
      price: "BDT 2,500/-",
      image: bannerHero,
    },
    {
      id: "ven-3",
      name: "North Field Hub",
      address: "Sector 11, Uttara, Dhaka 1230",
      price: "BDT 2,800/-",
      image: bannerImage,
    },
  ],
};

const communityData: CommunityData = {
  announcements: [
    {
      id: "ann-1",
      title: "League Expansion Approved",
      detail: "12 new clubs onboarding across the city starting April.",
      time: "2h ago",
    },
    {
      id: "ann-2",
      title: "Referee Training Cohort",
      detail: "Registration opens Friday for certified officials.",
      time: "Yesterday",
    },
  ],
  programs: [
    {
      id: "prog-1",
      title: "Academy Clinics",
      detail: "6-week technical program across 5 hubs.",
    },
    {
      id: "prog-2",
      title: "Women in Sport",
      detail: "Community league partnerships and mentorships.",
    },
    {
      id: "prog-3",
      title: "Grassroots Grants",
      detail: "Funding applications close in 9 days.",
    },
  ],
};

const matchupsData: MatchupsData = {
  divisions: ["All", "Corporate", "Community", "Academy"],
  matchups: [
    {
      id: "match-1",
      title: "Corporate League Alpha vs Sigma",
      time: "Today · 7:30 PM",
      venue: "DBox Sports Complex",
      slots: "2 slots remaining",
    },
    {
      id: "match-2",
      title: "Community Friendly Scrimmage",
      time: "Thu · 6:00 PM",
      venue: "JAFF Arena & Academy",
      slots: "Open roster",
    },
    {
      id: "match-3",
      title: "Elite 7v7 Showcase",
      time: "Sat · 9:00 AM",
      venue: "Southview Turf",
      slots: "Invite only",
    },
  ],
};

const bookingsData: BookingsData = {
  upcoming: [
    {
      id: "book-1",
      venue: "DBox Sports Complex",
      time: "Today · 8:00 PM",
      court: "Turf A · 90 mins",
      status: "Confirmed",
    },
    {
      id: "book-2",
      venue: "JAFF Arena & Academy",
      time: "Fri · 7:00 PM",
      court: "Pitch 2 · 60 mins",
      status: "Pending",
    },
  ],
  recent: [
    {
      id: "book-3",
      venue: "North Field Hub",
      time: "Yesterday · 6:00 PM",
      court: "Court 3 · 90 mins",
      status: "Completed",
    },
    {
      id: "book-4",
      venue: "Southview Turf",
      time: "Mon · 9:00 PM",
      court: "Pitch 1 · 60 mins",
      status: "Completed",
    },
  ],
};

const profileData: ProfileData = {
  profile: {
    id: "usr-1",
    name: "Amina Rahman",
    role: "Regional Operations Director",
    region: "Dhaka Metro",
    badges: [
      { id: "badge-1", label: "Enterprise Admin", tone: "primary" },
      { id: "badge-2", label: "Verified", tone: "success" },
    ],
    permissions: [
      "Multi-venue access",
      "Scheduling approvals",
      "Billing oversight",
      "Roster governance",
    ],
    preferences: [
      { id: "pref-1", label: "Live match alerts", state: "Enabled" },
      { id: "pref-2", label: "Weekly utilization report", state: "Enabled" },
      { id: "pref-3", label: "Incident escalation", state: "On-call" },
    ],
  },
};

export const getEnterpriseHome = async (): Promise<HomeData> => {
  await delay(180);
  return homeData;
};

export const getCommunityData = async (): Promise<CommunityData> => {
  await delay(140);
  return communityData;
};

export const getMatchupsData = async (): Promise<MatchupsData> => {
  await delay(140);
  return matchupsData;
};

export const getBookingsData = async (): Promise<BookingsData> => {
  await delay(140);
  return bookingsData;
};

export const getProfileData = async (): Promise<ProfileData> => {
  await delay(140);
  return profileData;
};
