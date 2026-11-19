import React from "react";

import {
  CardShell,
  GateChip,
  HuntButton,
  Icon,
  Muted,
  STATUS,
  type Gate,
} from "./shared";

export type HuntCardView = "seeker" | "employer";

export interface HuntCardProps {
  view: HuntCardView;
  rarity: string;
  /** Seeker view: role title. Employer view: "Seeker · .NET, N yrs". */
  title: string;
  subtitle: string;
  payLine: string;
  payNote: string;
  remote: string;
  contract: string;
  gates: Gate[];
  fitScore: number;
  fitLabel: string;
  clock: string;
  gaps: string[];
  repRating: number;
  repHunts: number;
  /** "tolerance" shows the amber below-floor / above-band chip instead of a Pay PASS. */
  tolerance?: boolean;
  toleranceNote?: string;
  revealed?: boolean;
  saved?: boolean;
  onReveal?: () => void;
  onWalkAway?: () => void;
  onSave?: () => void;
  onBookCall?: () => void;
  onCounter?: () => void;
}

const RARITY_STYLES: Record<string, { bg: string; color: string }> = {
  RARE: { bg: "#E8EEF9", color: "#1D4ED8" },
  EPIC: { bg: "#F3E8FF", color: "#7E22CE" },
  UNCOMMON: { bg: "#E6F4E6", color: "#2E7D32" },
  COMMON: { bg: "#F5F5F4", color: "#57534E" },
};

/**
 * Hunt Card — one listing card on the Hunts board. Shows just enough on
 * the face to take it or leave it; the full read stays sealed until the
 * seeker reveals it for 200 coins (once per card, re-opening is free).
 * Walking away and saving are always free.
 */
export function HuntCard({
  view,
  rarity,
  title,
  subtitle,
  payLine,
  payNote,
  remote,
  contract,
  gates,
  fitScore,
  fitLabel,
  clock,
  gaps,
  repRating,
  repHunts,
  tolerance = false,
  toleranceNote,
  revealed = false,
  saved = false,
  onReveal,
  onWalkAway,
  onSave,
  onBookCall,
  onCounter,
}: HuntCardProps) {
  const rarityStyle = RARITY_STYLES[rarity] ?? RARITY_STYLES.COMMON;
  const payGateFailed = gates.some((g) => g.label === "Pay" && g.result === "fail");

  return (
    <CardShell labelledBy={`hunt-card-${title.replace(/[^a-z0-9]+/gi, "-")}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <span
          className="inline-block rounded-full px-2.5 py-1 text-xs font-bold tracking-wide"
          style={{ backgroundColor: rarityStyle.bg, color: rarityStyle.color }}
        >
          {rarity}
        </span>
        <span className="flex gap-2">
          {revealed ? (
            <span className="rounded-full px-2 py-1 text-xs font-semibold" style={{ backgroundColor: "#E6F4E6", color: STATUS.pass }}>
              Revealed
            </span>
          ) : null}
          {saved ? (
            <span className="rounded-full px-2 py-1 text-xs font-semibold" style={{ backgroundColor: "#FDF3C8", color: "#8A6D3B" }}>
              Saved for later
            </span>
          ) : null}
        </span>
      </div>

      <h3 className="mt-3 text-xl font-bold" style={{ color: "var(--jh-text)" }}>
        {title}
      </h3>
      <p className="text-sm" style={{ color: "var(--jh-muted-text)" }}>
        {subtitle}
      </p>

      <p className="mt-3 text-base font-semibold" style={{ color: "var(--jh-text)" }}>
        {payLine}
      </p>
      <p className="text-sm" style={{ color: tolerance ? STATUS.amber : "var(--jh-muted-text)" }}>
        {payNote}
      </p>
      <p className="mt-1 text-sm" style={{ color: "var(--jh-muted-text)" }}>
        {remote} · {contract}
      </p>

      <div className="mt-3 flex flex-wrap gap-2" aria-label="Hard gates">
        {gates.map((gate) => (
          <GateChip key={gate.label} gate={gate} />
        ))}
      </div>
      {tolerance && toleranceNote ? (
        <p className="mt-2 text-sm font-semibold" style={{ color: STATUS.amber }}>
          {toleranceNote}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <span style={{ color: "var(--jh-text)" }}>
          <strong>Fit {fitScore}</strong> — {fitLabel}
        </span>
        <span className="inline-flex items-center gap-1" style={{ color: "var(--jh-muted-text)" }}>
          <Icon name="schedule" size={14} /> {clock} left
        </span>
        <span style={{ color: "var(--jh-muted-text)" }}>
          Rep {repRating} from {repHunts} hunts
        </span>
      </div>

      <p className="mt-2 text-sm" style={{ color: "var(--jh-muted-text)" }}>
        Top gaps: {gaps.join(" · ")}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {revealed ? (
          <>
            <HuntButton onClick={onBookCall} disabled={payGateFailed}>
              Book a first call · 100 coins
            </HuntButton>
            <HuntButton variant="secondary" onClick={onCounter}>
              Counter · 100 coins
            </HuntButton>
          </>
        ) : (
          <HuntButton onClick={onReveal}>Reveal for 200 coins</HuntButton>
        )}
        <HuntButton variant="ghost" onClick={onWalkAway}>
          Walk away · free
        </HuntButton>
        <HuntButton variant="ghost" onClick={onSave}>
          {saved ? "Saved" : "Save for later · free"}
        </HuntButton>
      </div>
      {view === "employer" && !revealed ? (
        <Muted>Names stay hidden until you reveal — you judge the verified signals first. No seeker cost or expense detail is ever shown on this side.</Muted>
      ) : null}
    </CardShell>
  );
}
