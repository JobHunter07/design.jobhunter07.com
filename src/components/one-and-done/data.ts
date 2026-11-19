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

/* ------------------------------------------------------------------ */
/* Preview-port data — figures copied verbatim from the Storybook     */
/* Preview artifact (slug jobhunter07-storybook-preview). These are   */
/* the numbers in force — do not invent or round differently.         */
/* ------------------------------------------------------------------ */

export const HEALTHBRIDGE = {
  role: "Senior .NET API Developer",
  client: "HealthBridge",
  agency: "Direct employer",
  payBand: "$72–$78/hr",
  payTop: 78,
  remote: "100% remote",
  contract: "W2 contract",
  rarity: "EPIC",
  repRating: 4.8,
  repHunts: 23,
  fitScore: 86,
  clock: "1 day 22 hrs left",
  gaps: ["Azure Functions", "Terraform"],
  payAboveFloorPerHour: 8.54,
} as const;

export const HEALTHBRIDGE_GATES: Gate[] = [
  { label: "Pay", result: "pass", detail: "$78/hr top vs $69.46/hr floor" },
  { label: "Remote", result: "pass", detail: "100% remote" },
  { label: "Contract type", result: "pass", detail: "W2 contract" },
  { label: "Authorization", result: "pass" },
  { label: "Availability", result: "pass", detail: "Overlap Mon–Fri 9am–12pm ET" },
];

export const HEALTHBRIDGE_SCORE_PARTS: ScorePart[] = [
  { label: "Gap coverage", points: 34, max: 40 },
  { label: "Skill depth + recency", points: 22, max: 25 },
  { label: "Seniority", points: 14, max: 15 },
  { label: "Preferences", points: 9, max: 10 },
  { label: "Availability + speed", points: 7, max: 10 },
];

/** Seeker wallet ledger exactly as the preview shows it (Screen 1). */
export const SEEKER_WALLET = {
  balance: 3300,
  lines: [
    { icon: "calendar_month", label: "Free monthly coins — 1st of the month", coins: 2500 },
    { icon: "verified", label: "Profile complete — range locked", coins: 500 },
    { icon: "explore", label: "Hunt complete", coins: 200 },
    { icon: "event_available", label: "Weekly check-in", coins: 100 },
  ],
} as const;

/** Employer wallet ledger exactly as the preview shows it (Screen 2). */
export const EMPLOYER_WALLET = {
  balance: 4000,
  lines: [
    { icon: "paid", label: "Employer monthly plan — $5/mo = 5,000 coins", coins: 5000, kind: "buy" },
    { icon: "event", label: "Employer access fee — 1st of month", coins: -1000, kind: "spend" },
    { icon: "emoji_events", label: "+570 Hire reward (day 18) — posting fee back + 5% bonus, seeker-confirmed hire", coins: 570, kind: "earn" },
  ],
} as const;

/** Process stages with the intake "days after previous stage" labels. */
export const PROCESS_STAGES_INTAKE = [
  { name: "Screen call", owner: "Emily Rotundo, recruiter", format: "Phone · 30 min · First contact — the call already on the Target Card", days: "Day 0" },
  { name: "HR interview", owner: "HR partner", format: "Video · 45 min · Background, comp expectations, timeline", days: "+3 days" },
  { name: "Fit interview", owner: "Hiring manager", format: "Video · 45 min · Team fit, working style, the role day to day", days: "+4 days" },
  { name: "Tech interview", owner: "Senior engineers ×2", format: "Video · 90 min · Live .NET problem-solving — no take-home", days: "+5 days" },
  { name: "Offer", owner: "Hiring manager + HR", format: "Written offer · Decision inside the 5 business days declared below", days: "+6 days" },
  { name: "Onboarding", owner: "Team lead", format: "After acceptance · Laptop shipped, accounts ready day 1, buddy assigned", days: "After offer" },
] as const;

export interface AdminConfigRow {
  setting: string;
  current: string;
  def: string;
  edit: string;
}

export interface AdminConfigGroup {
  id: string;
  title: string;
  key: string;
  desc: string;
  rows: AdminConfigRow[];
}

export const ADMIN_CONFIG_GROUPS: AdminConfigGroup[] = [
  {
    id: "coin",
    title: "Coin Economy",
    key: "config.coin_economy",
    desc: "1 coin = $0.001. Spend when taking value out, earn when adding value in. Coins roll over, never expire, never buy a gate.",
    rows: [
      { setting: "Coin value", current: "$0.001", def: "$0.001", edit: "$0.001" },
      { setting: "Coins per $5 purchase", current: "5,000", def: "5,000", edit: "5000" },
      { setting: "Employer access fee — 1st of month", current: "1,000", def: "1,000", edit: "1000" },
      { setting: "Seeker free coins / month", current: "2,500", def: "2,500", edit: "2500" },
      { setting: "Post a Need (spend)", current: "500", def: "500", edit: "500" },
      { setting: "Target Card reveal (spend)", current: "200", def: "200", edit: "200" },
      { setting: "Book a call (spend)", current: "100", def: "100", edit: "100" },
      { setting: "Counter (spend)", current: "100", def: "100", edit: "100" },
      { setting: "Plaid run (spend)", current: "300", def: "300", edit: "300" },
      { setting: "COLA run (spend)", current: "100", def: "100", edit: "100" },
      { setting: "Profile complete (earn)", current: "+500", def: "+500", edit: "500" },
      { setting: "Verify a skill (earn)", current: "+250", def: "+250", edit: "250" },
      { setting: "Weekly check-in (earn)", current: "+100", def: "+100", edit: "100" },
      { setting: "Hunt quest complete (earn)", current: "+200", def: "+200", edit: "200" },
      { setting: "Referral (earn)", current: "+500", def: "+500", edit: "500" },
      { setting: "Placement — hire confirmed (earn)", current: "+2,000", def: "+2,000", edit: "2000" },
    ],
  },
  {
    id: "hire",
    title: "Hire Reward",
    key: "config.hire_reward",
    desc: "Seeker-confirmed hire only. Employer gets the posting fee back plus a time bonus on total hunt spend. No confirmation, no reward for either side.",
    rows: [
      { setting: "Posting fee returned on confirmed hire", current: "500", def: "500", edit: "500" },
      { setting: "Hired within 30 days — bonus", current: "+5%", def: "+5%", edit: "5" },
      { setting: "Hired within 60 days — bonus", current: "+2.5%", def: "+2.5%", edit: "2.5" },
      { setting: "Hired within 120 days — adjustment", current: "−2.5%", def: "−2.5%", edit: "-2.5" },
      { setting: "Hired after 120 days — refund", current: "0", def: "0", edit: "0" },
      { setting: "Seeker reward for confirming hire", current: "+2,000", def: "+2,000", edit: "2000" },
      { setting: "Worked example — total hunt spend", current: "1,400", def: "1,400", edit: "1400" },
    ],
  },
  {
    id: "ghost",
    title: "Anti-Ghosting",
    key: "config.anti_ghosting",
    desc: "Both sides. Fast action earns, silence costs. Declining with a reason counts as acting, never as ghosting.",
    rows: [
      { setting: "Response clock", current: "48 hrs", def: "48 hrs", edit: "48" },
      { setting: "Reply within 2 hrs (earn)", current: "+100", def: "+100", edit: "100" },
      { setting: "Reply within 24 hrs (earn)", current: "+50", def: "+50", edit: "50" },
      { setting: "Ghosting threshold — no reply", current: "72 hrs", def: "72 hrs", edit: "72" },
      { setting: "Ghosting penalty", current: "−250", def: "−250", edit: "-250" },
      { setting: "No-show booked call penalty", current: "−500", def: "−500", edit: "-500" },
      { setting: "Strikes before pause", current: "3", def: "3", edit: "3" },
      { setting: "Strike window", current: "90 days", def: "90 days", edit: "90" },
      { setting: "Hunting pause after max strikes", current: "14 days", def: "14 days", edit: "14" },
    ],
  },
  {
    id: "matching",
    title: "Matching",
    key: "config.matching",
    desc: "5 binary hard gates first, then Fit Score 0–100. Coins never buy a score, a gate, or a match.",
    rows: [
      { setting: "Send card threshold", current: "80+", def: "80+", edit: "80" },
      { setting: "Held for review — low", current: "65", def: "65", edit: "65" },
      { setting: "Held for review — high", current: "79", def: "79", edit: "79" },
      { setting: "No match below", current: "<65", def: "<65", edit: "65" },
      { setting: "Weight — gap coverage", current: "40", def: "40", edit: "40" },
      { setting: "Weight — skill depth + recency", current: "25", def: "25", edit: "25" },
      { setting: "Weight — seniority", current: "15", def: "15", edit: "15" },
      { setting: "Weight — preferences", current: "10", def: "10", edit: "10" },
      { setting: "Weight — availability + speed", current: "10", def: "10", edit: "10" },
    ],
  },
  {
    id: "cola",
    title: "COLA",
    key: "config.cola",
    desc: "Any country / global = Tier 0 ZERO COLA, no factor at all; anywhere in the U.S. = national average COLA (index 1.00, the base band itself, explicitly applied); CONUS = Tier 1a blended; list of states = Tier 1b blended of ONLY the listed states with low–high range; single state = Tier 1 state average; city = Tier 2 state + city + county layered. Loaded cost stays separate from COLA.",
    rows: [
      { setting: "Tier 0 — Global (ZERO COLA) index", current: "1.00", def: "1.00", edit: "1.00" },
      { setting: "U.S. anywhere — national-average index", current: "1.00", def: "1.00", edit: "1.00" },
      { setting: "Tier 1a — CONUS blended index", current: "to validate", def: "to validate", edit: "0" },
      { setting: "Tier 1b — Listed-states blended index", current: "range only", def: "range only", edit: "0" },
      { setting: "Tier 1 — Single-state index", current: "to validate", def: "to validate", edit: "0" },
      { setting: "Tier 2 — City layered index", current: "to validate", def: "to validate", edit: "0" },
      { setting: "Employer FICA (loaded cost)", current: "7.65%", def: "7.65%", edit: "7.65" },
      { setting: "Benefits — low (loaded cost)", current: "20%", def: "20%", edit: "20" },
      { setting: "Benefits — high (loaded cost)", current: "30%", def: "30%", edit: "30" },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    key: "config.pricing",
    desc: "Cash prices that buy coins. Seekers never pay cash to start — top-up and Seeker Plus only appear at 0 coins, opt-in only.",
    rows: [
      { setting: "Employer plan", current: "$5 = 5,000", def: "$5 = 5,000", edit: "5" },
      { setting: "Employer plan coins", current: "5,000", def: "5,000", edit: "5000" },
      { setting: "One-time top-up", current: "$5 = 5,000", def: "$5 = 5,000", edit: "5" },
      { setting: "Top-up coins", current: "5,000", def: "5,000", edit: "5000" },
      { setting: "Seeker Plus price", current: "$5/mo", def: "$5/mo", edit: "5" },
      { setting: "Seeker Plus extra coins / month", current: "+5,000", def: "+5,000", edit: "5000" },
      { setting: "Seeker Plus total / month (incl. free)", current: "7,500", def: "7,500", edit: "7500" },
    ],
  },
];

export const ADMIN_AUDIT_LOG = [
  { date: "Nov 19", who: "System", what: "Plaid fee changed → Plaid run 290 → 300 coins (system) in Pricing • System sets the prices", change: "290 → 300 coins" },
  { date: "Nov 18, 21:40", who: "Tom", what: "changed Seeker free coins in Coin Economy", change: "0 → 2,500 /mo" },
  { date: "Nov 18, 21:12", who: "Brian", what: "changed Hire Reward ≤30 days in Hire Reward", change: "+0% → +5%" },
  { date: "Nov 18, 20:58", who: "Brian", what: "changed Ghosting penalty (72 hrs) in Anti-Ghosting", change: "−100 → −250 coins" },
  { date: "Nov 18, 20:31", who: "Tom", what: "changed Matching — send threshold in Matching", change: "75 → 80+" },
  { date: "Nov 18, 19:44", who: "System", what: "restored COLA Tier 0 index to default in COLA", change: "1.08 → 1.00" },
] as const;

/** Business Stats dashboard figures — all example / illustrative. */
export const BIZ_STATS = {
  coverage: 1.04,
  coverageTarget: 1.01,
  mrr: 5,
  mau: 94,
  mauPrev: 68,
  totalUsers: 132,
  payingCustomers: 1,
  signups: 18,
  churn: 0,
  costPerUser: 13.27,
  monthlyCost: 1247,
  avgCoinsPerUser: 2410,
  matches: 12,
  hired: 2,
  avgTimeToHireDays: 18,
  ghostingRatePct: 4,
  seekers: 132,
  employers: 9,
  openHunts: 12,
  huntsNeeded: 27,
  revenueByMonth: [
    { month: "September", short: "Sep", revenue: 1146, cost: 1102 },
    { month: "October", short: "Oct", revenue: 1237, cost: 1189 },
    { month: "November", short: "Nov", revenue: 1297, cost: 1247 },
  ],
  mrrByMonth: [
    { month: "Sep", value: 0 },
    { month: "Oct", value: 0 },
    { month: "Nov", value: 5 },
  ],
  usersByMonth: [
    { month: "September", mau: 68, signups: 12, churned: 0 },
    { month: "October", mau: 82, signups: 22, churned: 1 },
    { month: "November", mau: 94, signups: 18, churned: 0 },
  ],
  activityWeek: [
    { label: "Check-ins", value: 61, pct: 100, color: "var(--moss)" },
    { label: "Reveals", value: 34, pct: 56, color: "var(--earth)" },
    { label: "Confirms", value: 12, pct: 20, color: "var(--green)" },
    { label: "Posts (Needs)", value: 9, pct: 15, color: "var(--gold)" },
  ],
  matchRatePct: 63,
  cardAcceptancePct: 75,
  firstCalls: 8,
  matchesPerHunt: 1.0,
  ghosted: 1,
} as const;
