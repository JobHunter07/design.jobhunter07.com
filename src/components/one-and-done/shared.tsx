import React from "react";

/**
 * Shared primitives for the One-and-Done Matching components.
 *
 * Ported EXACTLY from the JobHunter07 Storybook Preview artifact
 * (slug `jobhunter07-storybook-preview`). Every class below comes from
 * `src/design/one-and-done.css` — the preview's own stylesheet, scoped
 * under `.ood`. There are NO Tailwind utility classes anywhere in
 * these components: the live site rendered unstyled because no Tailwind
 * stylesheet is loaded in Storybook.
 *
 * Icons are Material Symbols Rounded ligatures (the self-hosted subset
 * inlined as data URIs) rendered as <span class="material-symbols-rounded">,
 * exactly as in the preview — never emoji, never inline SVG paths.
 */

export const STATUS = {
  pass: "#2E7D32",
  fail: "#B3261E",
  amber: "#B45309",
  gold: "#F59E0B",
} as const;

/** Icon ligature names — the preview's font subset covers exactly these. */
export type IconName = string;

/** A Material Symbols Rounded glyph, exactly as the preview renders it. */
export function Icon({
  name,
  size,
  label,
  className,
}: {
  name: IconName;
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-rounded${className ? ` ${className}` : ""}`}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      style={size ? { fontSize: size } : undefined}
    >
      {name}
    </span>
  );
}

/** Every One-and-Done component renders inside this scope wrapper. */
export function Ood({ children }: { children: React.ReactNode }) {
  return <div className="ood">{children}</div>;
}

export type PillTone = "green" | "gold" | "red";

export function Pill({
  tone,
  icon,
  children,
}: {
  tone: PillTone;
  icon?: IconName;
  children: React.ReactNode;
}) {
  return (
    <span className={`pill pill-${tone}`}>
      {icon ? <Icon name={icon} /> : null}
      {children}
    </span>
  );
}

export type GateResult = "pass" | "fail" | "tolerance";

export interface Gate {
  label: string;
  result: GateResult;
  detail?: string;
}

/** A single hard-gate chip. Status is always labelled in text, never colour alone. */
export function GateChip({ gate }: { gate: Gate }) {
  const map: Record<GateResult, { cls: string; icon: IconName; text: string }> = {
    pass: { cls: "pass", icon: "check_circle", text: "PASS" },
    fail: { cls: "fail", icon: "cancel", text: "FAIL" },
    tolerance: { cls: "tolerance", icon: "warning", text: "Below floor — within your tolerance" },
  };
  const s = map[gate.result];
  return (
    <span className={`gate-chip ${s.cls}`}>
      <Icon name={s.icon} />
      {gate.label}: {s.text}
      {gate.detail ? <span> · {gate.detail}</span> : null}
    </span>
  );
}

export interface ScorePart {
  label: string;
  points: number;
  max: number;
}

/** Fit Score breakdown bars: 40 / 25 / 15 / 10 / 10, always shown with the score. */
export function ScoreBreakdown({ parts, total }: { parts: ScorePart[]; total: number }) {
  return (
    <div aria-label={`Fit Score ${total} out of 100`}>
      {parts.map((part) => (
        <div key={part.label} className="score-row">
          <span>{part.label}</span>
          <div
            className="score-bar"
            role="progressbar"
            aria-valuenow={part.points}
            aria-valuemin={0}
            aria-valuemax={part.max}
            aria-label={`${part.label}: ${part.points} of ${part.max}`}
          >
            <i style={{ width: `${(part.points / part.max) * 100}%` }} />
          </div>
          <b className="mono">
            {part.points}/{part.max}
          </b>
        </div>
      ))}
    </div>
  );
}

/** Shared card shell — the preview's `.card`. */
export function CardShell({
  children,
  labelledBy,
  className = "",
  style,
}: {
  children: React.ReactNode;
  labelledBy?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section aria-labelledby={labelledBy} className={`card ${className}`} style={style}>
      {children}
    </section>
  );
}

export function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3 id={id} style={{ fontSize: 20, marginBottom: 8 }}>
      {children}
    </h3>
  );
}

/** Uppercase muted section label — the preview's `h4` inside cards. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h4>{children}</h4>;
}

export function Muted({ children }: { children: React.ReactNode }) {
  return <p className="note">{children}</p>;
}

/** Primary / gold / ghost buttons, exactly as the preview renders them. */
export function HuntButton({
  children,
  variant = "primary",
  onClick,
  disabled,
  ariaLabel,
  style,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  style?: React.CSSProperties;
}) {
  const cls =
    variant === "primary" ? "btn btn-primary" : variant === "secondary" ? "btn btn-gold" : "btn btn-ghost";
  return (
    <button type="button" className={cls} style={style} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

/** The verified-employer chip on the dark card header. */
export function VerifyChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="verify-chip">
      <Icon name="verified_user" />
      {children}
    </span>
  );
}

/** Gold Rep Rating stars — filled, with the rating text beside them. */
export function RepStars({ rating, hunts, note }: { rating: number; hunts: number; note: string }) {
  return (
    <div className="rep-row" aria-label="Employer Rep Rating">
      <span className="rep-stars" aria-hidden="true">
        <Icon name="star" />
        <Icon name="star" />
        <Icon name="star" />
        <Icon name="star" />
        <Icon name="star" />
      </span>
      <span>
        <b>Rep Rating {rating.toFixed(1)}</b> from {hunts} hunts — {note}
      </span>
    </div>
  );
}

/** Fit band pill — band only, never the breakdown (that stays sealed). */
export function FitBand({ score, label }: { score: number; label: string }) {
  return (
    <span className="fit-band">
      <Icon name="analytics" />
      Fit <span className="mono">{score}</span> — {label}
    </span>
  );
}

/** "System-set price" tag, dark or light. */
export function SysTag({ light }: { light?: boolean }) {
  return (
    <span className={`sys-tag${light ? " light" : ""}`}>
      <Icon name="lock" />
      System-set price
    </span>
  );
}

/** Coin cost chip that rides on a button. */
export function CostChip({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`cost-chip${light ? " light" : ""}`}>{children}</span>;
}

/** The Tracker guide bubble — one bubble, plain words, tied to the numbers. */
export function Tracker({ children }: { children: React.ReactNode }) {
  return (
    <div className="tracker">
      <div className="avatar">
        <Icon name="hiking" />
      </div>
      <div>
        <strong>Your Tracker says</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}
