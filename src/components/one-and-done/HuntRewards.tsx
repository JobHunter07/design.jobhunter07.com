import React from "react";

import { CardShell, Icon, Muted, SectionTitle, STATUS } from "./shared";

/**
 * Hire Reward — a coin rebate, never a cash refund, fired ONLY on a
 * seeker-confirmed hire. The employer gets the 500-coin posting fee
 * back plus a time adjustment on total hunt spend.
 */
export function HireRewardPanel() {
  const rows = [
    { label: "Hired within 30 days", result: "+5%", example: "Day 18: 570 back (500 fee + 70 bonus)" },
    { label: "Hired within 60 days", result: "+2.5%", example: "Day 45: 535 back (500 + 35)" },
    { label: "Hired within 120 days", result: "−2.5%", example: "Day 90: 465 back (500 − 35)" },
    { label: "After 120 days", result: "No refund", example: "0 back" },
  ];
  return (
    <CardShell labelledBy="hire-reward-title">
      <SectionTitle id="hire-reward-title">Hire Reward</SectionTitle>
      <Muted>Worked example: 1,400-coin hunt (500 post + 4×200 reveals + 100 call). Fires only on a seeker-confirmed hire — no confirmation, no reward for either side. The seeker earns +2,000 coins for confirming.</Muted>
      <ul className="mt-3 grid gap-2">
        {rows.map((row) => (
          <li key={row.label} className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm ring-1" style={{ borderColor: "var(--jh-border)" }}>
            <span style={{ color: "var(--jh-text)" }}>{row.label}</span>
            <span className="font-bold" style={{ color: "var(--jh-text)" }}>{row.result}</span>
            <span className="text-xs" style={{ color: "var(--jh-muted-text)" }}>{row.example}</span>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

/**
 * No Ghosting — ghosting is punished on both ends, fast action is
 * rewarded in coins. Declining with a reason counts as acting.
 */
export function NoGhostingPanel({ strikes = 0, avgReply = "3 hrs" }: { strikes?: number; avgReply?: string }) {
  return (
    <CardShell labelledBy="no-ghosting-title">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <SectionTitle id="no-ghosting-title">No Ghosting</SectionTitle>
        <span className="text-sm" style={{ color: "var(--jh-muted-text)" }}>
          Avg reply: {avgReply}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2" aria-label={`${strikes} of 3 strikes`}>
        <span className="text-sm font-semibold" style={{ color: "var(--jh-text)" }}>Strikes:</span>
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            aria-hidden
            className="inline-block h-4 w-4 rounded-full ring-2"
            style={{
              backgroundColor: index < strikes ? STATUS.fail : "transparent",
              borderColor: STATUS.fail,
            }}
          />
        ))}
        <span className="text-sm" style={{ color: "var(--jh-muted-text)" }}>{strikes} of 3</span>
      </div>

      <ul className="mt-3 grid gap-2 text-sm">
        <li className="flex items-start gap-2" style={{ color: "var(--jh-text)" }}>
          <Icon name="check" size={16} /> Reply in 2 hrs: +100 coins · in 24 hrs: +50 coins · within 48 hrs: on time
        </li>
        <li className="flex items-start gap-2" style={{ color: "var(--jh-text)" }}>
          <Icon name="close" size={16} /> No reply in 72 hrs: −250 coins, match expires, 1 strike
        </li>
        <li className="flex items-start gap-2" style={{ color: "var(--jh-text)" }}>
          <Icon name="close" size={16} /> Booked-call no-show: −500 coins + 1 strike
        </li>
        <li className="flex items-start gap-2" style={{ color: "var(--jh-text)" }}>
          <Icon name="schedule" size={16} /> 3 strikes in 90 days = 14-day hunting pause
        </li>
      </ul>
      <Muted>Declining — even a one-word “no” — counts as acting, not ghosting. Every strike gets one human review on appeal; if upheld, the strike and coin penalty are reversed in full.</Muted>
    </CardShell>
  );
}
