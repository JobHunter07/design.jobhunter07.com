import React from "react";

import { CardShell, Icon, Muted, SectionTitle, STATUS } from "./shared";

export interface AdminStatsPanelProps {
  /** All figures are the mockup's labelled example/illustrative data. */
  verdict?: "good" | "watch" | "underwater" | "danger";
  coverage?: number;
  coverageTarget?: number;
  mrr?: number;
  seekers?: number;
  employers?: number;
  openHunts?: number;
  huntsNeeded?: number;
  costPerUser?: number;
  mau?: number;
  monthlyCost?: number;
}

/**
 * Admin Stats Panel — the Business Stats health dashboard. Verdict is
 * evaluated danger-first from config thresholds; every stat is computed
 * from the ledger, never hand-typed. All figures shown here are the
 * mockup's labelled example/illustrative data, not actuals.
 */
export function AdminStatsPanel({
  verdict = "good",
  coverage = 1.04,
  coverageTarget = 1.01,
  mrr = 5,
  seekers = 132,
  employers = 9,
  openHunts = 12,
  huntsNeeded = 27,
  costPerUser = 13.27,
  mau = 94,
  monthlyCost = 1247,
}: AdminStatsPanelProps) {
  const verdicts = {
    good: { label: "In good shape", bg: "#E6F4E6", color: STATUS.pass },
    watch: { label: "Covering costs, watch it", bg: "#FDF3E3", color: STATUS.amber },
    underwater: { label: "Under water", bg: "#FDECEA", color: STATUS.fail },
    danger: { label: "In danger", bg: "#FDECEA", color: STATUS.fail },
  } as const;
  const v = verdicts[verdict];
  const huntsShort = huntsNeeded - openHunts;
  const seekerEmployerRatio = (seekers / employers).toFixed(1);
  const seekersPerHunt = Math.round(seekers / openHunts);
  const progressPct = Math.round((openHunts / huntsNeeded) * 100);
  const revenueVsCost = [
    { month: "Sep", revenue: 1146, cost: 1102 },
    { month: "Oct", revenue: 1237, cost: 1189 },
    { month: "Nov", revenue: 1297, cost: 1247 },
  ];
  const maxBar = Math.max(...revenueVsCost.flatMap((r) => [r.revenue, r.cost]));

  return (
    <CardShell labelledBy="admin-stats-title">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <SectionTitle id="admin-stats-title">Business Stats — Admin Portal</SectionTitle>
        <span className="text-xs font-semibold" style={{ color: "var(--jh-muted-text)" }}>
          Example / illustrative data — not actuals
        </span>
      </div>

      <p className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold" style={{ backgroundColor: v.bg, color: v.color }} role="status">
        <Icon name="verified" size={16} /> {v.label}
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "MRR", value: `$${mrr.toFixed(2)}` },
          { label: "Cost coverage", value: coverage.toFixed(2) },
          { label: "MAU", value: String(mau) },
          { label: "Cost per user", value: `$${costPerUser.toFixed(2)}` },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl p-3 ring-1" style={{ borderColor: "var(--jh-border)" }}>
            <dt className="text-xs font-semibold" style={{ color: "var(--jh-muted-text)" }}>{stat.label}</dt>
            <dd className="mt-1 text-xl font-bold" style={{ color: "var(--jh-text)" }}>{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <h4 className="text-sm font-bold" style={{ color: "var(--jh-text)" }}>Revenue vs cost — are we covering costs?</h4>
          <div className="mt-3 grid gap-2" role="img" aria-label={`Revenue versus cost, September to November. November revenue $1,297 against cost $${monthlyCost}.`}>
            {revenueVsCost.map((row) => (
              <div key={row.month} className="grid grid-cols-[3rem_1fr] items-center gap-2 text-xs">
                <span style={{ color: "var(--jh-muted-text)" }}>{row.month}</span>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <div className="h-3 rounded" style={{ width: `${(row.revenue / maxBar) * 100}%`, backgroundColor: "var(--jh-primary)" }} />
                    <span style={{ color: "var(--jh-text)" }}>${row.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 rounded" style={{ width: `${(row.cost / maxBar) * 100}%`, backgroundColor: "var(--jh-secondary)" }} />
                    <span style={{ color: "var(--jh-text)" }}>${row.cost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs" style={{ color: "var(--jh-muted-text)" }}>Green = revenue · Gold = cost. MRR vs total cost is under water in this example: $5.00 vs ${monthlyCost.toLocaleString()}/mo.</p>
        </div>

        <div>
          <h4 className="text-sm font-bold" style={{ color: "var(--jh-text)" }}>Coverage gauge</h4>
          <div
            className="relative mt-3 h-4 overflow-hidden rounded-full"
            style={{ backgroundColor: "var(--jh-border)" }}
            role="meter"
            aria-valuenow={coverage}
            aria-valuemin={0}
            aria-valuemax={1.3}
            aria-label={`Cost coverage ${coverage.toFixed(2)} against target ${coverageTarget.toFixed(2)}`}
          >
            <div className="h-full rounded-full" style={{ width: `${(coverage / 1.3) * 100}%`, backgroundColor: "var(--jh-primary)" }} />
            <span
              aria-hidden
              className="absolute top-0 h-full w-0.5"
              style={{ left: `${(coverageTarget / 1.3) * 100}%`, backgroundColor: STATUS.fail }}
            />
          </div>
          <p className="mt-1 text-xs" style={{ color: "var(--jh-muted-text)" }}>
            Now {coverage.toFixed(2)} · target line {coverageTarget.toFixed(2)} · scale 0–1.30
          </p>

          <h4 className="mt-5 text-sm font-bold" style={{ color: "var(--jh-text)" }}>Supply / demand</h4>
          <p className="mt-1 text-sm" style={{ color: "var(--jh-text)" }}>
            Seeker:employer {seekerEmployerRatio}:1 · {seekersPerHunt} seekers per open hunt (target 5)
          </p>
          <p className="mt-2 rounded-lg px-3 py-2 text-sm font-semibold" style={{ backgroundColor: "#FDECEA", color: STATUS.fail }} role="status">
            {seekers} seekers need {huntsNeeded} hunts — {openHunts} open, {huntsShort} short.
          </p>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full"
            style={{ backgroundColor: "var(--jh-border)" }}
            role="progressbar"
            aria-valuenow={openHunts}
            aria-valuemin={0}
            aria-valuemax={huntsNeeded}
            aria-label={`${openHunts} of ${huntsNeeded} hunts open`}
          >
            <div className="h-full rounded-full" style={{ width: `${progressPct}%`, backgroundColor: "var(--jh-secondary)" }} />
          </div>
          <Muted>Course-correct: recruit employers — {huntsShort} more hunts needed. Suggestions only, never automatic.</Muted>
        </div>
      </div>
    </CardShell>
  );
}
