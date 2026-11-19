import React from "react";

import { CardShell, Icon, Muted, SectionTitle, STATUS } from "./shared";
import type { ExpenseLine } from "./data";

export interface ExpensesLedgerProps {
  burnPerMonth: number;
  burnPerYear: number;
  medianMonth: number;
  runRate: number;
  categories: { label: string; amount: number }[];
  lines: ExpenseLine[];
  filter?: "All" | "Plaid" | "Manual";
  onFilterChange?: (filter: "All" | "Plaid" | "Manual") => void;
}

/**
 * Expenses Ledger — one ledger, two sources. Plaid pulls the bank trail
 * in automatically (read-only, categorised); manual entries cover cash,
 * checks, and bills paid outside the account. Every line is labelled by
 * where it came from. The burn feeds Know Your Range — floor $69.46/hr.
 */
export function ExpensesLedger({
  burnPerMonth,
  burnPerYear,
  medianMonth,
  runRate,
  categories,
  lines,
  filter = "All",
  onFilterChange,
}: ExpensesLedgerProps) {
  const maxCategory = Math.max(...categories.map((c) => c.amount));
  const shown = filter === "All" ? lines : lines.filter((line) => line.source === filter);

  return (
    <CardShell labelledBy="expenses-title">
      <SectionTitle id="expenses-title">Track Your Costs</SectionTitle>
      <Muted>
        Every cost leaves a track. Plaid pulls your bank trail in automatically — read-only, categorised — and you add
        what the bank never sees. Your burn feeds Know Your Range — floor $69.46/hr.
      </Muted>

      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Clean burn", value: `$${burnPerMonth.toLocaleString()}/mo` },
          { label: "12-month total", value: `$${burnPerYear.toLocaleString()}` },
          { label: "Median month", value: `$${medianMonth.toLocaleString()}` },
          { label: "May–Oct run-rate", value: `$${runRate.toLocaleString()}/mo` },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl p-3 ring-1" style={{ borderColor: "var(--jh-border)" }}>
            <dt className="text-xs font-semibold" style={{ color: "var(--jh-muted-text)" }}>{stat.label}</dt>
            <dd className="mt-1 text-xl font-bold" style={{ color: "var(--jh-text)" }}>{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 grid gap-1.5" role="img" aria-label="Burn by category">
        {categories.map((category) => (
          <div key={category.label} className="grid grid-cols-[9rem_1fr_auto] items-center gap-2 text-sm">
            <span style={{ color: "var(--jh-muted-text)" }}>{category.label}</span>
            <div className="h-2.5 overflow-hidden rounded-full" style={{ backgroundColor: "var(--jh-border)" }}>
              <div className="h-full rounded-full" style={{ width: `${(category.amount / maxCategory) * 100}%`, backgroundColor: "var(--jh-primary)" }} />
            </div>
            <span className="font-mono font-semibold" style={{ color: "var(--jh-text)" }}>${category.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-2" role="group" aria-label="Filter ledger by source">
        {(["All", "Plaid", "Manual"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onFilterChange?.(option)}
            aria-pressed={filter === option}
            className="rounded-full px-3 py-1.5 text-xs font-semibold focus:outline-none focus-visible:ring-2"
            style={{
              backgroundColor: filter === option ? "var(--jh-primary)" : "transparent",
              color: filter === option ? "#fff" : "var(--jh-text)",
              border: "1px solid var(--jh-border)",
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <ul className="mt-3 grid gap-2">
        {shown.map((line) => (
          <li key={`${line.date}-${line.merchant}`} className="rounded-xl p-3 ring-1" style={{ borderColor: "var(--jh-border)", opacity: line.excluded ? 0.6 : 1 }}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold" style={{ color: "var(--jh-text)" }}>
                {line.merchant} <span className="font-normal" style={{ color: "var(--jh-muted-text)" }}>· {line.category} · {line.date}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="rounded-full px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: line.source === "Plaid" ? "#E8EEF9" : "#FDF3C8", color: line.source === "Plaid" ? "#1D4ED8" : "#8A6D3B" }}>
                  {line.source}
                </span>
                <span className="font-mono text-sm font-bold" style={{ color: "var(--jh-text)" }}>${line.amount.toFixed(2)}</span>
              </span>
            </div>
            {line.note ? <p className="mt-1 text-xs" style={{ color: "var(--jh-muted-text)" }}>{line.note}</p> : null}
            {line.duplicate ? (
              <p className="mt-2 flex items-start gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold" style={{ backgroundColor: "#FDF3E3", color: STATUS.amber }} role="status">
                <Icon name="schedule" size={14} /> Possible duplicate — same amount + date as a Plaid line. Counting both would double-count. Not decided yet — both lines are currently counted.
              </p>
            ) : null}
            {line.excluded ? (
              <p className="mt-2 text-xs" style={{ color: "var(--jh-muted-text)" }}>
                Excluded from burn — Reason: {line.excludedReason}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </CardShell>
  );
}
