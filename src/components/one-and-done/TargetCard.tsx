import React from "react";

import {
  CardShell,
  GateChip,
  HuntButton,
  Icon,
  Muted,
  ScoreBreakdown,
  SectionTitle,
  STATUS,
  type Gate,
  type ScorePart,
} from "./shared";

export type TargetCardVariant = "default" | "tolerance" | "held";

export interface TargetCardProps {
  role: string;
  client: string;
  agency: string;
  recruiter: string;
  payBand: string;
  remote: string;
  contract: string;
  rarity: string;
  verified?: boolean;
  repRating: number;
  repHunts: number;
  fitScore: number;
  scoreParts: ScorePart[];
  gates: Gate[];
  clock: string;
  clockLabel: string;
  gaps: string[];
  /** Sealed (held 65–79) cards cannot be revealed until review clears. */
  variant?: TargetCardVariant;
  heldNote?: string;
  onReveal?: () => void;
  onCounter?: () => void;
  onBookCall?: () => void;
  onWalkAway?: () => void;
}

const RARITY_STYLES: Record<string, { bg: string; color: string }> = {
  RARE: { bg: "#E8EEF9", color: "#1D4ED8" },
  EPIC: { bg: "#F3E8FF", color: "#7E22CE" },
  UNCOMMON: { bg: "#E6F4E6", color: "#2E7D32" },
  COMMON: { bg: "#F5F5F4", color: "#57534E" },
};

/**
 * Target Card — the RARE trading card revealed from the Hunts board.
 * A hard-gate fail outranks any Fit Score: Accept and Book stay locked
 * while the pay gate fails, even at 78/100.
 */
export function TargetCard({
  role,
  client,
  agency,
  recruiter,
  payBand,
  remote,
  contract,
  rarity,
  verified = true,
  repRating,
  repHunts,
  fitScore,
  scoreParts,
  gates,
  clock,
  clockLabel,
  gaps,
  variant = "default",
  heldNote = "78 lands in the 65–79 held for review band — but a hard-gate fail outranks the score.",
  onReveal,
  onCounter,
  onBookCall,
  onWalkAway,
}: TargetCardProps) {
  const payGateFailed = gates.some((g) => g.label === "Pay" && g.result === "fail");
  const isTolerance = variant === "tolerance";
  const isHeld = variant === "held";
  const rarityStyle = RARITY_STYLES[rarity] ?? RARITY_STYLES.COMMON;

  return (
    <CardShell labelledBy="target-card-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span
            className="inline-block rounded-full px-2.5 py-1 text-xs font-bold tracking-wide"
            style={{ backgroundColor: rarityStyle.bg, color: rarityStyle.color }}
          >
            {rarity}
          </span>
          <h2 id="target-card-title" className="mt-2 text-2xl font-bold" style={{ color: "var(--jh-text)" }}>
            {role}
          </h2>
          <p className="text-sm" style={{ color: "var(--jh-muted-text)" }}>
            {client} · via {agency} ({recruiter}) · {remote} · {contract}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold" style={{ color: "var(--jh-text)" }}>
            {payBand}
          </p>
          {verified ? (
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: STATUS.pass }}>
              <Icon name="verified" size={14} /> Verified employer — domain + company page checked
            </p>
          ) : null}
          <p className="mt-1 text-xs" style={{ color: "var(--jh-muted-text)" }}>
            Rep Rating {repRating} from {repHunts} hunts · pay honesty, no ghosting
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="Hard gates">
        {gates.map((gate) => (
          <GateChip key={gate.label} gate={gate} />
        ))}
      </div>

      {isTolerance ? (
        <p
          className="mt-3 rounded-lg px-3 py-2 text-sm font-semibold"
          style={{ backgroundColor: "#FDF3E3", color: STATUS.amber }}
          role="status"
        >
          Below floor — within your tolerance. The floor, the gate result and the score are unchanged.
        </p>
      ) : null}

      {payGateFailed ? (
        <p
          className="mt-3 rounded-lg px-3 py-2 text-sm"
          style={{ backgroundColor: "#FDECEA", color: STATUS.fail }}
          role="alert"
        >
          <strong>PAY GATE: FAIL — Boss not beaten yet.</strong> $65/hr is $4.46/hr short of your $69.46/hr
          floor. At $65/hr the net is $85,403/yr vs the $91,919/yr you need — $543/mo short.
        </p>
      ) : null}

      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <div>
          <SectionTitle>Fit Score</SectionTitle>
          <div className="mt-2">
            <ScoreBreakdown parts={scoreParts} total={fitScore} />
          </div>
          {isHeld ? (
            <p className="mt-3 text-sm" style={{ color: "var(--jh-muted-text)" }}>
              {heldNote}
            </p>
          ) : null}
        </div>
        <div>
          <SectionTitle>Top gaps</SectionTitle>
          <ul className="mt-2 grid gap-1.5">
            {gaps.map((gap) => (
              <li key={gap} className="flex items-center gap-2 text-sm" style={{ color: "var(--jh-text)" }}>
                <Icon name="gps_fixed" size={16} /> {gap}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--jh-text)" }}>
            <Icon name="schedule" size={16} /> {clockLabel} — {clock}
          </p>
          <Muted>Reply in 2 hrs: +100 coins · in 24 hrs: +50 coins</Muted>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {isHeld ? (
          <HuntButton disabled ariaLabel="Reveal locked until review clears">
            Sealed — held for review
          </HuntButton>
        ) : (
          <HuntButton onClick={onReveal}>Reveal — 200 coins</HuntButton>
        )}
        <HuntButton variant="secondary" onClick={onCounter} disabled={payGateFailed && !isTolerance}>
          Ask for $70/hr · 100 coins
        </HuntButton>
        <HuntButton onClick={onBookCall} disabled={payGateFailed}>
          Book a first call · 100 coins
        </HuntButton>
        <HuntButton variant="ghost" onClick={onWalkAway}>
          Walk away · free
        </HuntButton>
      </div>
      {payGateFailed ? (
        <Muted>Accept match and Book a call stay locked while the pay gate fails.</Muted>
      ) : null}
    </CardShell>
  );
}
