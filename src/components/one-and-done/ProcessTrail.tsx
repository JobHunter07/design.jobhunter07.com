import React from "react";

import { CardShell, Icon, Muted, SectionTitle, STATUS } from "./shared";

export interface ProcessStage {
  name: string;
  owner: string;
  format: string;
  dayOffset: number | null;
  dayLabel: string;
}

export interface ProcessTrailProps {
  stages: ProcessStage[];
  /** Index of the stage the hunt is currently on (0-based). */
  currentStage?: number;
  totalDaysToOffer?: number;
  verdict?: string;
}

/**
 * Process Trail — the whole hunt, up front: Screen call → HR → Fit →
 * Tech → Offer → Onboarding, with day offsets and who runs each stage.
 * The seeker sees the full trail before revealing, so they know whether
 * the hunt is a wild goose chase or straight to the hunt.
 */
export function ProcessTrail({ stages, currentStage = 0, totalDaysToOffer, verdict }: ProcessTrailProps) {
  return (
    <CardShell labelledBy="process-trail-title">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <SectionTitle id="process-trail-title">The hunt trail</SectionTitle>
        {totalDaysToOffer !== undefined ? (
          <span className="text-sm font-semibold" style={{ color: "var(--jh-text)" }}>
            {stages.length} stages · {totalDaysToOffer} days to offer
          </span>
        ) : null}
      </div>
      {verdict ? (
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ backgroundColor: "#E6F4E6", color: STATUS.pass }}>
          <Icon name="gps_fixed" size={14} /> {verdict}
        </p>
      ) : null}

      <ol className="mt-4 grid gap-0">
        {stages.map((stage, index) => {
          const isCurrent = index === currentStage;
          const isDone = index < currentStage;
          return (
            <li key={stage.name} className="relative flex gap-3 pb-4 last:pb-0">
              {index < stages.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute left-[11px] top-6 h-full w-0.5"
                  style={{ backgroundColor: "var(--jh-border)" }}
                />
              ) : null}
              <span
                className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: isCurrent ? "var(--jh-secondary)" : isDone ? "var(--jh-primary)" : "var(--jh-border)",
                  color: isCurrent ? "#1B1F1A" : isDone ? "#fff" : "var(--jh-muted-text)",
                }}
                aria-label={isCurrent ? `Current stage: ${stage.name}` : isDone ? `Completed: ${stage.name}` : stage.name}
              >
                {isDone ? <Icon name="check" size={14} /> : index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold" style={{ color: "var(--jh-text)" }}>
                  {stage.name} <span className="font-semibold" style={{ color: "var(--jh-muted-text)" }}>· {stage.dayLabel}</span>
                  {isCurrent ? (
                    <span className="ml-2 rounded-full px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: "#FDF3C8", color: "#8A6D3B" }}>
                      You are here
                    </span>
                  ) : null}
                </p>
                <p className="text-sm" style={{ color: "var(--jh-muted-text)" }}>
                  {stage.owner} · {stage.format}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      <Muted>The 48-hour response clock runs at every stage, not just the first call. A stage added mid-hunt that wasn&apos;t in the intake is flagged, and you can walk away free.</Muted>
    </CardShell>
  );
}
