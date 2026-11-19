import React from "react";

import { CardShell, Muted, SectionTitle, STATUS } from "./shared";

export interface CompHunt {
  label: string;
  rate: string;
  base: number;
  baseLabel: string;
  pto: number;
  ptoLabel: string;
  health: number;
  healthLabel: string;
  total: number;
}

export interface TotalCompPanelProps {
  hunt1: CompHunt;
  hunt2: CompHunt;
  difference: number;
  basis: string;
}

function money(n: number): string {
  const sign = n < 0 ? "−" : "+";
  return `${n === 0 ? "$0" : `${sign}$${Math.abs(n).toLocaleString()}`}`;
}

/**
 * Total Comp Panel — cash rate vs total compensation. The pay gate
 * judges total comp, not the cash rate alone: cash + PTO value +
 * insurance replacement (the seeker's own $9,519/yr) + 401k + bonus.
 * A benefit not stated is valued at $0, never guessed.
 */
export function TotalCompPanel({ hunt1, hunt2, difference, basis }: TotalCompPanelProps) {
  const hunts = [hunt1, hunt2];
  return (
    <CardShell labelledBy="total-comp-title">
      <SectionTitle id="total-comp-title">Cash rate vs total comp</SectionTitle>
      <Muted>{basis}</Muted>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="text-left" style={{ color: "var(--jh-muted-text)" }}>
              <th scope="col" className="pb-2 pr-3 font-semibold">Line</th>
              {hunts.map((hunt) => (
                <th key={hunt.label} scope="col" className="pb-2 pr-3 font-semibold">
                  {hunt.label} · {hunt.rate}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t" style={{ borderColor: "var(--jh-border)" }}>
              <th scope="row" className="py-2 pr-3 text-left font-normal" style={{ color: "var(--jh-muted-text)" }}>Base pay</th>
              {hunts.map((hunt) => (
                <td key={hunt.label} className="py-2 pr-3 font-mono" style={{ color: "var(--jh-text)" }}>
                  ${hunt.base.toLocaleString()}
                </td>
              ))}
            </tr>
            <tr className="border-t" style={{ borderColor: "var(--jh-border)" }}>
              <th scope="row" className="py-2 pr-3 text-left font-normal" style={{ color: "var(--jh-muted-text)" }}>PTO</th>
              {hunts.map((hunt) => (
                <td key={hunt.label} className="py-2 pr-3 font-mono" style={{ color: "var(--jh-text)" }} title={hunt.ptoLabel}>
                  {money(hunt.pto)}
                </td>
              ))}
            </tr>
            <tr className="border-t" style={{ borderColor: "var(--jh-border)" }}>
              <th scope="row" className="py-2 pr-3 text-left font-normal" style={{ color: "var(--jh-muted-text)" }}>Health cover</th>
              {hunts.map((hunt) => (
                <td key={hunt.label} className="py-2 pr-3 font-mono" style={{ color: hunt.health >= 0 ? STATUS.pass : STATUS.fail }} title={hunt.healthLabel}>
                  {money(hunt.health)}
                </td>
              ))}
            </tr>
            <tr className="border-t font-bold" style={{ borderColor: "var(--jh-border)" }}>
              <th scope="row" className="py-2 pr-3 text-left" style={{ color: "var(--jh-text)" }}>Total comp</th>
              {hunts.map((hunt) => (
                <td key={hunt.label} className="py-2 pr-3 font-mono" style={{ color: "var(--jh-text)" }}>
                  ${hunt.total.toLocaleString()}/yr
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 rounded-lg px-3 py-2 text-sm font-semibold" style={{ backgroundColor: "#E6F4E6", color: STATUS.pass }} role="status">
        Hunt 1 wins by ${difference.toLocaleString()}/yr — the $50/hr hunt beats the $60/hr hunt. On cash alone Hunt 2
        looks $19,200 ahead; on total comp it&apos;s behind.
      </p>
    </CardShell>
  );
}
