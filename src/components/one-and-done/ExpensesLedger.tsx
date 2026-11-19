import React, { useState } from "react";

import { EXPENSE_CATEGORIES, EXPENSE_LINES } from "./data";
import { Icon, Ood, Pill } from "./shared";

export type ExpensesFilter = "All" | "Plaid" | "Manual";

export interface ExpensesLedgerProps {
  filter?: ExpensesFilter;
}

/** Row sub-notes, exactly as the Storybook Preview artifact shows them. */
const ROW_NOTES: Record<string, string> = {
  "Nov 15|Planet Home Lending": "Mortgage payment — Chase checking",
  "Nov 14|Instacart|Plaid": "Grocery delivery — auto-categorised by Plaid",
  "Nov 14|Instacart (added by hand)": "Added by hand — “groceries, Instacart”",
  "Nov 13|Walmart": "General merchandise — Chase",
  "Nov 12|FirstEnergy": "Electric bill — auto-import · Exclude from burn available, with a reason",
  "Nov 11|Comcast": "Internet — Services",
  "Nov 14|Cash groceries": "Farmers market — cash, no bank trail · Note: weekly shop",
  "Nov 10|City water bill — paid by check #1042": "Check #1042 — outside the bank feed · Note: quarterly water",
};

const SUMMARY_NOTES = [
  "2,448 Plaid transactions + manual entries · This ledger is the ground truth behind Know Your Range — floor $69.46/hr",
  "Clean burn × 12 — what a year on the ground actually costs",
  "Half your months cost less than this, half cost more",
  "Recent 6-month pace — higher than the 12-month average",
];

/**
 * Expenses Ledger — one ledger, two sources, exactly as in the
 * Storybook Preview artifact. Plaid pulls the bank trail in
 * automatically (read-only, categorised); manual entries cover cash,
 * checks, and bills paid outside the account. Every line is labelled by
 * where it came from. The burn feeds Know Your Range — floor $69.46/hr.
 */
export function ExpensesLedger({ filter: initialFilter = "All" }: ExpensesLedgerProps) {
  const [filter, setFilter] = useState<ExpensesFilter>(initialFilter);
  const shown = filter === "All" ? EXPENSE_LINES : EXPENSE_LINES.filter((line) => line.source === filter);
  const hasDuplicate = shown.some((line) => line.duplicate);
  const stats = [
    { label: "Clean burn — live", value: "$6,661/mo", gold: true },
    { label: "12-month total", value: "$79,929", gold: false },
    { label: "Median month", value: "$6,397", gold: false },
    { label: "May–Oct run-rate", value: "$7,152/mo", gold: false },
  ];

  return (
    <Ood>
      <div className="exp-summary" aria-label="Monthly burn summary">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="exp-stat"
            style={stat.gold ? { border: "2px solid var(--gold)", background: "var(--goldbg)" } : undefined}
          >
            <span>{stat.label}</span>
            <b className="mono">{stat.value}</b>
            <p className="note" style={{ margin: "2px 0 0" }}>
              {SUMMARY_NOTES[i]}
            </p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "start",
            textAlign: "left",
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>
              <Icon name="receipt_long" /> Cost ledger — November trail
            </h3>
            <p className="note" style={{ margin: "4px 0 0" }}>
              Every row shows its source. Filter to see one trail at a time — try the Plaid / Manual buttons.
            </p>
          </div>
          <Pill tone="gold" icon="receipt_long">
            {shown.length} lines shown
          </Pill>
        </div>

        <div className="exp-filter" role="group" aria-label="Filter by source" style={{ marginTop: 14 }}>
          {(["All", "Plaid", "Manual"] as const).map((option) => (
            <button
              key={option}
              type="button"
              className={filter === option ? "active" : ""}
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
            >
              <Icon name={option === "All" ? "receipt_long" : option === "Plaid" ? "account_balance" : "edit_note"} />
              {option}
            </button>
          ))}
        </div>

        {hasDuplicate ? (
          <div className="dup-box" role="alert">
            <b>
              <Icon name="warning" /> Possible duplicate — same amount + date as a Plaid line
            </b>
            <p style={{ margin: "6px 0 8px" }}>
              Manual <b>Instacart — $87.42 on Nov 14</b> matches the Plaid Instacart line below, dollar for
              dollar and day for day. Counting both would double-count one shop in your burn.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button type="button" className="mini-btn">
                <Icon name="check_circle" /> Keep both
              </button>
              <button type="button" className="mini-btn" style={{ borderColor: "var(--red)", color: "var(--red)" }}>
                <Icon name="delete" /> Keep one — remove the manual copy
              </button>
            </div>
            <p className="note" style={{ margin: "8px 0 0" }}>
              Not decided yet — both lines are currently counted in the burn.
            </p>
          </div>
        ) : null}

        <div style={{ overflowX: "auto" }}>
          <table className="exp-table" aria-label="Expense ledger">
            <thead>
              <tr>
                <th>Date</th>
                <th>Merchant / Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((line) => {
                const key = `${line.date}|${line.merchant}${line.source === "Plaid" && line.merchant === "Instacart" ? "|Plaid" : ""}`;
                const note = ROW_NOTES[key] ?? ROW_NOTES[`${line.date}|${line.merchant}`];
                const displayMerchant = line.duplicate ? "Instacart" : line.merchant;
                return (
                  <tr key={`${line.date}-${line.merchant}-${line.source}`} data-source={line.source.toLowerCase()}>
                    <td className="mono">{line.date}</td>
                    <td>
                      <b>{displayMerchant}</b>{" "}
                      {line.duplicate ? <Pill tone="gold" icon="warning">Possible duplicate</Pill> : null}
                      <br />
                      {note ? <span className="note">{note}</span> : null}
                    </td>
                    <td>{line.category}</td>
                    <td className="mono" style={{ fontWeight: 800 }}>
                      ${line.amount.toFixed(2)}
                    </td>
                    <td>
                      <span className={`source-chip source-${line.source.toLowerCase()}`}>
                        <Icon name={line.source === "Plaid" ? "account_balance" : "edit_note"} />
                        {line.source}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="note" style={{ marginTop: 10, textAlign: "left" }}>
          <Icon name="account_balance" /> Plaid is <b>read-only auto-import</b> — lines arrive categorised on
          their own. Manual entries cover what the bank never sees: cash, checks, bills paid outside the
          account. One ledger, every line labelled. A Plaid line that isn&apos;t really your cost can be{" "}
          <b>excluded from burn</b> with a reason instead of deleting the trail.
        </p>
      </div>
      <p className="note" style={{ marginTop: 12 }}>
        Category burn behind the summary (Screen 1 / Screen 6):{" "}
        {EXPENSE_CATEGORIES.map((c) => `${c.label} $${c.amount.toLocaleString()}`).join(" · ")} — plus the 15%
        savings padding of $999/mo that turns burn $6,661 into net need $7,660/mo.
      </p>
    </Ood>
  );
}
