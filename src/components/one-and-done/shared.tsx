import React from "react";

/**
 * Shared primitives for the One-and-Done Matching components.
 *
 * All colours come from the design tokens in src/design/tokens/theme.ts,
 * exposed by the Storybook preview decorator as CSS variables
 * (--jh-bg, --jh-surface, --jh-text, --jh-muted-text, --jh-primary,
 * --jh-primary-hover, --jh-secondary, --jh-secondary-hover, --jh-border,
 * --jh-focus). Components use `var(--jh-*)` so they follow the active
 * light/dark theme. Status colours (pass/fail/amber) are the only
 * non-token colours and are used semantically, never alone: every status
 * is also labelled in text.
 */

export const STATUS = {
  pass: "#2E7D32",
  fail: "#B3261E",
  amber: "#B45309",
  gold: "#F59E0B",
} as const;

export type IconName =
  | "explore"
  | "gps_fixed"
  | "check"
  | "close"
  | "verified"
  | "account_balance"
  | "receipt_long"
  | "health_and_safety"
  | "emoji_events"
  | "map"
  | "place"
  | "mail"
  | "edit"
  | "savings"
  | "credit_card_off"
  | "schedule"
  | "groups"
  | "trending_up";

/** Minimal inline SVG icons in the Material Symbols spirit (no emoji). */
const ICON_PATHS: Record<IconName, React.ReactNode> = {
  explore: (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.2 6.3-2.5 6.9a.9.9 0 0 1-.57.57l-6.9 2.5a.5.5 0 0 1-.63-.63l2.5-6.9c.14-.4.34-.6.57-.57l6.9-2.5a.5.5 0 0 1 .63.63zM14.5 9.5l-2.4 2.4-2.6-2.6 2.4-2.4 2.6 2.6z" />
  ),
  gps_fixed: (
    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm8.9 3h-2.5a7.4 7.4 0 0 0-6.4-6.4V2.1a1 1 0 0 0-2 0v2.5A7.4 7.4 0 0 0 3.6 11H1.1a1 1 0 0 0 0 2h2.5a7.4 7.4 0 0 0 6.4 6.4v2.5a1 1 0 0 0 2 0v-2.5a7.4 7.4 0 0 0 6.4-6.4h2.5a1 1 0 0 0 0-2zM12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />
  ),
  check: <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />,
  close: (
    <path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" />
  ),
  verified: (
    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  ),
  account_balance: (
    <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 19h20v3H2zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h20V6l-9.5-4z" />
  ),
  receipt_long: (
    <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM9 9h6v2H9V9zm0 4h6v2H9v-2zm0 4h4v2H9v-2z" />
  ),
  health_and_safety: (
    <path d="M12 2 4 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-8-3zm-1 14h-2v-3H6v-2h3V8h2v3h3v2h-3v3zm4 0h-2v-2h2v2z" />
  ),
  emoji_events: (
    <path d="M19 5h-2V3H7v2H5a2 2 0 0 0-2 2v1a5 5 0 0 0 5 5h.42A6 6 0 0 1 11 15.92V19H7v2h10v-2h-4v-3.08A6 6 0 0 1 15.58 13H16a5 5 0 0 0 5-5V7a2 2 0 0 0-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
  ),
  map: (
    <path d="m20.5 3-8.5 3-8-3-2.5 1v15.5l2.5-1 8 3 8-3 2.5 1V4.5L20.5 3zM6 5.4l6 2.25v11.6l-6-2.25V5.4zm8 0 4.5-1.6v11.6L14 17.05V5.4z" />
  ),
  place: (
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  ),
  mail: (
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  ),
  edit: (
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  ),
  savings: (
    <path d="M19.5 7.5 12 2 4.5 7.5h15zM4 9.5v8A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5v-8h-3v2.5h-2V9.5h-4V12H9V9.5H4zM12 13.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5z" />
  ),
  credit_card_off: (
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4v-6h16v6zM4 8V6h16v2H4z" />
  ),
  schedule: (
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
  ),
  groups: (
    <path d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm-8 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h9v-2.5c0-.85.33-1.63.88-2.2A10.6 10.6 0 0 0 8 13zm8 0c-.29 0-.62.02-.97.05A4.22 4.22 0 0 1 17 16.5V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  ),
  trending_up: (
    <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
  ),
};

export function Icon({
  name,
  size = 20,
  label,
  className,
}: {
  name: IconName;
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      className={className}
      focusable="false"
    >
      {ICON_PATHS[name]}
    </svg>
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
  const styles: Record<GateResult, { color: string; bg: string; icon: IconName; text: string }> = {
    pass: { color: STATUS.pass, bg: "#E6F2E6", icon: "check", text: "PASS" },
    fail: { color: STATUS.fail, bg: "#FDECEA", icon: "close", text: "FAIL" },
    tolerance: { color: STATUS.amber, bg: "#FDF3E3", icon: "check", text: "Below floor — within your tolerance" },
  };
  const s = styles[gate.result];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ color: s.color, backgroundColor: s.bg }}
    >
      <Icon name={s.icon} size={14} />
      {gate.label}: {s.text}
      {gate.detail ? <span className="font-normal">· {gate.detail}</span> : null}
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
    <div className="grid gap-2" aria-label={`Fit Score ${total} out of 100`}>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold" style={{ color: "var(--jh-text)" }}>
          {total}
        </span>
        <span className="text-sm" style={{ color: "var(--jh-muted-text)" }}>
          / 100 Fit Score
        </span>
      </div>
      {parts.map((part) => (
        <div key={part.label} className="grid grid-cols-[1fr_auto] items-center gap-2">
          <span className="text-xs" style={{ color: "var(--jh-muted-text)" }}>
            {part.label}
          </span>
          <span className="text-xs font-semibold" style={{ color: "var(--jh-text)" }}>
            {part.points}/{part.max}
          </span>
          <div
            className="col-span-2 h-2 overflow-hidden rounded-full"
            style={{ backgroundColor: "var(--jh-border)" }}
            role="progressbar"
            aria-valuenow={part.points}
            aria-valuemin={0}
            aria-valuemax={part.max}
            aria-label={`${part.label}: ${part.points} of ${part.max}`}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${(part.points / part.max) * 100}%`,
                backgroundColor: "var(--jh-primary)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Shared card shell using theme tokens. */
export function CardShell({
  children,
  labelledBy,
  className = "",
}: {
  children: React.ReactNode;
  labelledBy?: string;
  className?: string;
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={`rounded-2xl p-5 shadow-sm ring-1 sm:p-6 ${className}`}
      style={{ backgroundColor: "var(--jh-surface)", borderColor: "var(--jh-border)" }}
    >
      {children}
    </section>
  );
}

export function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3 id={id} className="text-lg font-bold" style={{ color: "var(--jh-text)" }}>
      {children}
    </h3>
  );
}

export function Muted({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm" style={{ color: "var(--jh-muted-text)" }}>
      {children}
    </p>
  );
}

/** Primary / secondary buttons with visible focus rings. */
export function HuntButton({
  children,
  variant = "primary",
  onClick,
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const styles =
    variant === "primary"
      ? { backgroundColor: "var(--jh-primary)", color: "#fff" }
      : variant === "secondary"
        ? { backgroundColor: "var(--jh-secondary)", color: "#1B1F1A" }
        : { backgroundColor: "transparent", color: "var(--jh-text)", border: "1px solid var(--jh-border)" };
  return (
    <button
      type="button"
      className={base}
      style={{ ...styles, ["--tw-ring-color" as string]: "var(--jh-focus)" }}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
