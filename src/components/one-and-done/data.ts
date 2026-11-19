/**
 * Canonical One-and-Done data, copied verbatim from the rough-draft
 * mockups (artifact `jobhunter07-hunting-mockups`, audited 2026-11-19).
 * These are the numbers in force — do not invent or round differently.
 * Figures labelled example/illustrative in the mockups are marked so here.
 */

import type { Gate, ScorePart } from "./shared";

export const FLOORS = {
  salaryPerYear: 133367,
  contractPerHour: 69.46,
  contractTargetPerHour: 70,
  contract1099PerHour: 75.5,
  contract1099PerYear: 144890,
  netNeedPerMonth: 7660,
  netNeedPerYear: 91919,
  burnPerMonth: 6661,
  burnPerYear: 79929,
  burnMedianMonth: 6397,
  burnRunRate: 7152,
  debtTotal: 6925,
} as const;

export const OPTUMSERVE = {
  role: "Senior .NET Developer",
  client: "Optumserve",
  agency: "Brooksource",
  recruiter: "Emily Rotundo",
  payBand: "$60–$65/hr",
  payTop: 65,
  remote: "100% remote",
  timezone: "CST",
  contract: "W2 contract-to-hire",
  rarity: "RARE",
  repRating: 4.6,
  repHunts: 11,
  fitScore: 78,
  clock: "1 day 14 hrs left",
  clockLabel: "Respond within 2 days",
  gaps: ["Kubernetes", "CI/CD pipelines"],
  payShortfallPerHour: 4.46,
  payBelowFloorPct: 6.4,
} as const;

export const OPTUMSERVE_GATES: Gate[] = [
  { label: "Pay", result: "fail", detail: "$65/hr top vs $69.46/hr floor" },
  { label: "Remote", result: "pass", detail: "100% remote" },
  { label: "Contract type", result: "pass", detail: "W2 contract" },
  { label: "Authorization", result: "pass" },
  { label: "Availability", result: "pass", detail: "Overlap Mon–Fri 10am–12pm ET" },
];

export const OPTUMSERVE_SCORE_PARTS: ScorePart[] = [
  { label: "Gap coverage", points: 28, max: 40 },
  { label: "Skill depth + recency", points: 20, max: 25 },
  { label: "Seniority", points: 13, max: 15 },
  { label: "Preferences", points: 8, max: 10 },
  { label: "Availability + speed", points: 9, max: 10 },
];

export const PROCESS_STAGES = [
  { name: "Screen call", owner: "Emily Rotundo, recruiter", format: "Phone · 30 min", dayOffset: 0, dayLabel: "Day 0" },
  { name: "HR interview", owner: "HR partner", format: "Video · 45 min", dayOffset: 3, dayLabel: "Day 3" },
  { name: "Fit interview", owner: "Hiring manager", format: "Video · 45 min", dayOffset: 4, dayLabel: "Day 7" },
  { name: "Tech interview", owner: "Senior engineers ×2", format: "Video · 90 min · Live .NET problem-solving — no take-home", dayOffset: 5, dayLabel: "Day 12" },
  { name: "Offer", owner: "Hiring manager + HR", format: "Written offer · Decision inside 5 business days", dayOffset: 6, dayLabel: "Day 18" },
  { name: "Onboarding", owner: "Team lead", format: "After acceptance · Laptop shipped, accounts ready day 1", dayOffset: null, dayLabel: "After offer" },
] as const;

export const TOTAL_COMP = {
  hunt1: { label: "Hunt 1", rate: "$50/hr + benefits", base: 96000, pto: 4000, ptoLabel: "PTO +$4,000 (10 days × 8 hrs × $50)", health: 9519, healthLabel: "Health +$9,519 employer-paid", total: 109519 },
  hunt2: { label: "Hunt 2", rate: "$60/hr, thin benefits", base: 115200, pto: 480, ptoLabel: "PTO +$480 (1 day × 8 hrs × $60)", health: -9519, healthLabel: "Health −$9,519 you pay", total: 106161 },
  difference: 3358,
  basis: "1,920 billable hrs/yr · PTO/sick at 8 hrs × rate · Insurance at your real $9,519/yr",
} as const;

export const SEEKER_AVAILABILITY = {
  windows: "Mon–Fri · 9am–12pm ET",
  availableFrom: "Mon, Dec 7, 2026",
  notice: "2 weeks",
  maxCallsPerWeek: 3,
  checkedIn: "Live — checked in 2 days ago",
} as const;

export const EMPLOYER_AVAILABILITY = {
  windows: "Mon–Fri · 9am–5pm CT",
  windowsEt: "10am–6pm ET",
  slotsPerWeek: 4,
  decisionTimeline: "5 business days after the final call",
  cover: "If Emily is away, Dan covers",
  owner: "Emily Rotundo",
} as const;

export const OVERLAP = "Mon–Fri 10am–12pm ET";

export const SEEKER_LEDGER = [
  { label: "Free coins — 1st of the month", coins: 2500 },
  { label: "Profile complete", coins: 500 },
  { label: "Hunt complete", coins: 200 },
  { label: "Weekly check-in", coins: 100 },
  { label: "Plaid rate run", coins: -300 },
  { label: "Target Card reveal", coins: -200 },
] as const;

export const EMPLOYER_LEDGER = [
  { label: "Employer plan — $5/mo", coins: 5000 },
  { label: "Access fee — 1st of the month", coins: -1000 },
  { label: "Post a Need", coins: -500 },
] as const;

export const LEADERBOARD_SEEKERS = [
  { rank: 1, name: "Maya R.", hunts: 14, coins: 6200, response: "1.2h", hires: 2, streak: "6 wks" },
  { rank: 2, name: "Jordan K.", hunts: 12, coins: 5400, response: "1.8h", hires: 1, streak: "5 wks" },
  { rank: 3, name: "Samira L.", hunts: 11, coins: 4900, response: "2.1h", hires: 1, streak: "4 wks" },
  { rank: 4, name: "Alex T.", hunts: 9, coins: 3800, response: "2.4h", hires: 1, streak: "3 wks" },
  { rank: 5, name: "Brian D. (You · example)", hunts: 8, coins: 3300, response: "3.0h", hires: 0, streak: "3 wks" },
] as const;

export const LEADERBOARD_EMPLOYERS = [
  { rank: 1, name: "Northbridge Health", hunts: 9, coins: 2800, response: "1.5h", hires: 4, streak: "8 wks" },
  { rank: 2, name: "Optumserve", hunts: 7, coins: 2100, response: "2.0h", hires: 3, streak: "6 wks" },
  { rank: 3, name: "Keystone Systems", hunts: 6, coins: 1750, response: "2.3h", hires: 2, streak: "5 wks" },
  { rank: 4, name: "Harbor Logistics", hunts: 5, coins: 1400, response: "2.9h", hires: 2, streak: "4 wks" },
  { rank: 5, name: "Blue Ridge Labs", hunts: 4, coins: 1100, response: "3.4h", hires: 1, streak: "3 wks" },
] as const;

export const EXPENSE_CATEGORIES = [
  { label: "Mortgage", amount: 2205 },
  { label: "General merchandise", amount: 1314 },
  { label: "Food & drink", amount: 1172 },
  { label: "Rent & utilities", amount: 707 },
  { label: "Entertainment", amount: 399 },
  { label: "Services", amount: 393 },
  { label: "Medical & fees", amount: 365 },
] as const;

export type ExpenseSource = "Plaid" | "Manual";

export interface ExpenseLine {
  date: string;
  merchant: string;
  category: string;
  amount: number;
  source: ExpenseSource;
  note?: string;
  duplicate?: boolean;
  excluded?: boolean;
  excludedReason?: string;
}

export const EXPENSE_LINES: ExpenseLine[] = [
  { date: "Nov 15", merchant: "Planet Home Lending", category: "Mortgage", amount: 2205.0, source: "Plaid" },
  { date: "Nov 14", merchant: "Instacart", category: "Food & drink", amount: 87.42, source: "Plaid" },
  { date: "Nov 14", merchant: "Instacart (added by hand)", category: "Food & drink", amount: 87.42, source: "Manual", duplicate: true, note: "Possible duplicate — same amount + date as a Plaid line." },
  { date: "Nov 13", merchant: "Walmart", category: "General merchandise", amount: 142.18, source: "Plaid" },
  { date: "Nov 12", merchant: "FirstEnergy", category: "Rent & utilities", amount: 118.5, source: "Plaid", excluded: true, excludedReason: "Landlord reimburses utilities this month" },
  { date: "Nov 11", merchant: "Comcast", category: "Services", amount: 89.99, source: "Plaid" },
  { date: "Nov 14", merchant: "Cash groceries", category: "Food & drink", amount: 60.0, source: "Manual", note: "Farmers market — cash, no receipt in bank feed" },
  { date: "Nov 10", merchant: "City water bill — paid by check #1042", category: "Rent & utilities", amount: 74.0, source: "Manual" },
];
