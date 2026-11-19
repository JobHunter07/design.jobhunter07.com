import React from "react";

import { PROCESS_STAGES, PROCESS_STAGES_INTAKE } from "./data";
import { Icon, Ood, Pill } from "./shared";

export type ProcessTrailVariant = "tracker" | "intake";

export interface ProcessTrailProps {
  variant?: ProcessTrailVariant;
}

const TSTEP_ICONS = ["call", "badge", "handshake", "code", "description", "rocket_launch"];
const TSTEP_SHORT = ["Screen call", "HR", "Fit", "Tech", "Offer", "Onboarding"];
const TSTEP_LABELS = ["You are here · Day 0", "+3 days", "+4 days", "+5 days", "+6 days · Day 18", "After offer"];
const TRACKER_DAYS = ["Day 0", "Day 3", "Day 7", "Day 12", "Day 18", "After offer"];
const TRACKER_META = [
  "Phone · 30 min · Booked from the slots below",
  "Video · 45 min · Background, comp expectations, timeline",
  "Video · 45 min · Team fit and working style",
  "Video · 90 min · Live .NET problem-solving — no take-home",
  "Written offer · Inside the declared 5-business-day decision window",
  "After acceptance · Laptop shipped, accounts ready day 1",
];

const CONTAINER: React.CSSProperties = {
  maxWidth: 820,
  margin: "0 auto",
  border: "2px solid var(--moss)",
  borderRadius: 12,
  padding: 16,
  background: "var(--card)",
  textAlign: "left",
};

const HEAD_ROW: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "flex-start",
};

const HEAD_H4: React.CSSProperties = {
  margin: 0,
  fontSize: 13,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: "var(--muted)",
};

/**
 * Process Trail — the whole hunt, up front, exactly as in the Storybook
 * Preview artifact. Screen call → HR → Fit → Tech → Offer → Onboarding,
 * with day offsets and who runs each stage. The seeker sees the full
 * trail before revealing, so they know whether the hunt is a wild goose
 * chase or straight to the hunt.
 */
export function ProcessTrail({ variant = "tracker" }: ProcessTrailProps) {
  if (variant === "intake") {
    return (
      <Ood>
        <div style={CONTAINER}>
          <div style={HEAD_ROW}>
            <h4 style={HEAD_H4}>
              <Icon name="conversion_path" /> Need intake · Declared stages, in order
            </h4>
            <Pill tone="gold" icon="route">
              6 stages · 18 days to offer
            </Pill>
          </div>
          <p style={{ fontSize: 14, margin: "8px 0 0" }}>
            Declare every stage before this Need can post — in order, with who runs it, how, how long, and
            how many days after the stage before it. Seekers see this exact trail on the Target Card and
            score it against their own hunt limits. You can&apos;t add a surprise stage later without the
            seeker re-confirming.
          </p>
          <div className="stage-list" aria-label="Declared hunt stages, in order">
            {PROCESS_STAGES_INTAKE.map((stage, i) => (
              <div key={stage.name} className="stage-row">
                <span className="stage-num">{i + 1}</span>
                <div>
                  <b>{stage.name}</b> — {stage.owner}
                  <span className="stage-meta">{stage.format}</span>
                </div>
                <span className="stage-days">{stage.days}</span>
              </div>
            ))}
          </div>
          <div className="proc-verdict straight">
            <b>
              <Icon name="check_circle" /> Against the seeker&apos;s limits — Optumserve: 6 stages · 18 days
              to offer · no take-home → Straight to the hunt.
            </b>
            <p style={{ margin: "4px 0 0" }}>
              Inside all three limits, so its process scores full marks. A 9-stage, 45-day process — or any
              unpaid take-home while the seeker is set to No — would arrive flagged <b>Wild goose chase</b>,
              with the process score cut before a Fit Score is ever shown.
            </p>
          </div>
        </div>
        <p className="note" style={{ marginTop: 12 }}>
          Stage types cover the full trail: screen call, HR, fit, tech, panel, final, take-home, offer,
          onboarding. Adding a take-home stage asks whether it&apos;s paid — unpaid take-homes are shown to
          seekers in red, exactly as declared.
        </p>
      </Ood>
    );
  }

  return (
    <Ood>
      <div style={CONTAINER}>
        <div style={HEAD_ROW}>
          <h4 style={HEAD_H4}>
            <Icon name="conversion_path" /> The hunt trail — every stage, declared up front
          </h4>
          <Pill tone="green" icon="check_circle">
            Straight to the hunt
          </Pill>
        </div>
        <p style={{ fontSize: 14, margin: "8px 0 0" }}>
          This employer declared the whole process at intake — nothing can be added later without you
          re-confirming. <b>6 stages · 18 days to offer · no unpaid take-home.</b> Against your limits (max
          6 stages · max 21 days · no take-home) the process scores full marks. A 9-stage, 45-day trail
          would be flagged <b>Wild goose chase</b> here instead — before you spent the reveal.
        </p>
        <div className="tracker-steps" aria-label="Stage tracker — current stage: screen call">
          {PROCESS_STAGES.map((stage, i) => (
            <div key={stage.name} className={`tstep${i === 0 ? " now" : ""}`}>
              <span className="tdot">
                <Icon name={TSTEP_ICONS[i]} />
              </span>
              <b>{TSTEP_SHORT[i]}</b>
              <span>{TSTEP_LABELS[i]}</span>
            </div>
          ))}
        </div>
        <div className="stage-list">
          {PROCESS_STAGES.map((stage, i) => (
            <div key={stage.name} className="stage-row">
              <span className="stage-num">{i + 1}</span>
              <div>
                <b>{stage.name}</b> — {stage.owner}
                <span className="stage-meta">{TRACKER_META[i]}</span>
              </div>
              <span className="stage-days">{TRACKER_DAYS[i]}</span>
            </div>
          ))}
        </div>
        <p className="note" style={{ margin: "10px 0 0" }}>
          <Icon name="route" /> The tracker moves as you clear each stage — both hunters see the same trail,
          and a stage that slips past its declared day counts toward the employer&apos;s Rep Rating. A
          mid-hunt added stage is flagged, with a free Walk Away.
        </p>
      </div>
      <p className="note" style={{ marginTop: 12 }}>
        Process length scores inside the timing points of the Fit Score — never a hard gate. The seeker sets
        their own limits on Screen 1 (max 6 stages · max 21 days · no unpaid take-home).
      </p>
    </Ood>
  );
}
