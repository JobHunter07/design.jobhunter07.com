import React from "react";

import { Icon, Ood, Pill } from "./shared";

export type HuntCardVariant = "seeker-pass" | "seeker-tolerance" | "employer" | "employer-tolerance";

export interface HuntCardProps {
  variant?: HuntCardVariant;
}

function HuntLine({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="hunt-line">
      <Icon name={icon} />
      <span>{children}</span>
    </div>
  );
}

function GateChips({ pay, payLabel }: { pay: "pass" | "tolerance"; payLabel: string }) {
  return (
    <div className="gate-chips" aria-label="Five hard gates">
      {pay === "pass" ? (
        <span className="gate-chip pass">
          <Icon name="check_circle" /> Pay
        </span>
      ) : (
        <span className="gate-chip tolerance">
          <Icon name="warning" /> {payLabel}
        </span>
      )}
      <span className="gate-chip pass">
        <Icon name="check_circle" /> Remote
      </span>
      <span className="gate-chip pass">
        <Icon name="check_circle" /> Contract
      </span>
      <span className="gate-chip pass">
        <Icon name="check_circle" /> Auth
      </span>
      <span className="gate-chip pass">
        <Icon name="check_circle" /> Availability
      </span>
    </div>
  );
}

function FitRow({ score, label, clock, clockTone = "gold" }: { score: number; label: string; clock: string; clockTone?: "gold" | "red" }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <span className="fit-band">
        <Icon name="analytics" /> Fit <span className="mono">{score}</span> — {label}
      </span>
      <Pill tone={clockTone} icon="timer">
        {clock}
      </Pill>
    </div>
  );
}

function Actions({ takeLabel }: { takeLabel: string }) {
  return (
    <div className="hunt-actions">
      <button type="button" className="btn btn-gold" style={{ padding: "10px 14px", fontSize: 14 }}>
        <Icon name="crisis_alert" /> {takeLabel}
      </button>
      <button type="button" className="btn btn-ghost" style={{ padding: "10px 14px", fontSize: 14 }}>
        <Icon name="directions_walk" /> Walk Away · free
      </button>
      <button type="button" className="btn btn-ghost" style={{ padding: "10px 14px", fontSize: 14 }}>
        <Icon name="bookmark" /> Save for later · free
      </button>
      <span className="note" style={{ alignSelf: "center" }}>
        <Icon name="touch_app" /> Tap card to reveal · 200 coins
      </span>
    </div>
  );
}

function TolFlag() {
  return (
    <span className="tol-flag">
      <Icon name="tune" /> Within your 10% tolerance
    </span>
  );
}

/**
 * Hunt Card — the Hunts board listing card, exactly as in the Storybook
 * Preview artifact. Board face, either side: just enough to take it or
 * leave it — pay vs floor, the five gates as chips, the Fit band (never
 * the breakdown), top gaps, and the clock. The full read stays sealed
 * until the reveal.
 */
export function HuntCard({ variant = "seeker-pass" }: HuntCardProps) {
  if (variant === "seeker-tolerance") {
    return (
      <Ood>
        <article className="hunt-card tolerance-card">
          <div className="hunt-card-head">
            <span className="pill pill-gold">RARE · Illustrative</span>
            <TolFlag />
            <h3>Senior .NET Developer</h3>
            <p>Optumserve · via Brooksource (Emily Rotundo)</p>
            <span className="verify-chip">
              <Icon name="verified_user" /> Verified employer
            </span>
          </div>
          <div className="hunt-card-body">
            <HuntLine icon="payments">
              <b className="mono">$60–$65/hr</b> — <b>6.4% below your floor ($4.46/hr short)</b> — you chose to
              see these
            </HuntLine>
            <HuntLine icon="public">100% remote · Must live in the U.S. · Team works CST hours</HuntLine>
            <HuntLine icon="description">W2 contract-to-hire · 6 months, then convert</HuntLine>
            <GateChips pay="tolerance" payLabel="Below floor — within your 10% tolerance" />
            <FitRow score={78} label="strong · held for review" clock="1 day 14 hrs left" />
            <HuntLine icon="warning">
              Top gaps: <b>Kubernetes</b> · <b>CI/CD pipelines</b>
            </HuntLine>
            <HuntLine icon="star">
              Rep Rating <b>4.6</b> from 11 hunts — pay honesty, no ghosting
            </HuntLine>
            <Actions takeLabel="Take this hunt in" />
          </div>
        </article>
        <p className="sb-note">
          Board face, seeker side: just enough to take it or leave it — pay vs floor, the five gates as
          chips, the Fit band (never the breakdown), top gaps, and the clock. The full read stays sealed
          until the reveal.
        </p>
      </Ood>
    );
  }

  if (variant === "employer") {
    return (
      <Ood>
        <article className="hunt-card">
          <div className="hunt-card-head bark">
            <span className="pill pill-gold">RARE · Illustrative · Name hidden</span>
            <h3>Seeker • .NET, 8 yrs</h3>
            <p>Senior .NET Developer fit · Identity sealed until reveal</p>
            <span className="verify-chip">
              <Icon name="verified_user" /> Verified seeker — identity + skills checked
            </span>
          </div>
          <div className="hunt-card-body">
            <HuntLine icon="payments">
              Floor <b className="mono">$69.46/hr</b> — <b style={{ color: "var(--green)" }}>inside</b> your
              $60–$75 band
            </HuntLine>
            <HuntLine icon="public">100% remote · Lives in the U.S. (PA) · Works ET</HuntLine>
            <HuntLine icon="description">W2 contract-to-hire — matches your Need&apos;s shape</HuntLine>
            <GateChips pay="pass" payLabel="" />
            <FitRow score={78} label="strong · held for review" clock="1 day 14 hrs left" />
            <HuntLine icon="verified">
              Top verified skills: <b>C# / .NET APIs</b> · <b>SQL Server</b>
            </HuntLine>
            <HuntLine icon="star">
              Reliability Rep Rating <b>4.9</b> — responds fast, shows up (rated on reliability only, never
              skill)
            </HuntLine>
            <HuntLine icon="event_available">
              Available from <b>Dec 7</b> · Calls Mon–Fri 9am–12pm ET · Live — checked in 2 days ago
            </HuntLine>
            <div className="hunt-actions">
              <button type="button" className="btn btn-ghost" style={{ padding: "10px 14px", fontSize: 14 }}>
                <Icon name="directions_walk" /> Walk Away · free
              </button>
              <button type="button" className="btn btn-ghost" style={{ padding: "10px 14px", fontSize: 14 }}>
                <Icon name="bookmark" /> Save for later · free
              </button>
              <span className="note" style={{ alignSelf: "center" }}>
                <Icon name="touch_app" /> Tap card to reveal · 200 coins
              </span>
            </div>
          </div>
        </article>
        <p className="sb-note">
          The mirror card: employers judge verified signals first — the name stays sealed until the 200-coin
          reveal, and no seeker cost or expense detail ever crosses to this side.
        </p>
      </Ood>
    );
  }

  if (variant === "employer-tolerance") {
    return (
      <Ood>
        <article className="hunt-card tolerance-card">
          <div className="hunt-card-head bark">
            <span className="pill pill-gold">COMMON · Illustrative · Name hidden</span>
            <TolFlag />
            <h3>Seeker • .NET, 9 yrs</h3>
            <p>Senior .NET fit · Identity sealed until reveal</p>
            <span className="verify-chip">
              <Icon name="verified_user" /> Verified seeker — identity + skills checked
            </span>
          </div>
          <div className="hunt-card-body">
            <HuntLine icon="payments">
              Floor <b className="mono">$78.00/hr</b> — <b>4.0% above your band top ($3.00/hr over)</b> — you
              chose to see these
            </HuntLine>
            <HuntLine icon="public">100% remote · Lives in the U.S. (WA) · Works PT</HuntLine>
            <HuntLine icon="description">W2 contract-to-hire — matches your Need&apos;s shape</HuntLine>
            <GateChips pay="tolerance" payLabel="Above band — within your 10% tolerance" />
            <FitRow
              score={66}
              label="held · pay gate blocks the send · shown by your tolerance"
              clock="12 hrs left"
              clockTone="red"
            />
            <HuntLine icon="verified">
              Top verified skills: <b>Kubernetes</b> · <b>CI/CD pipelines</b>
            </HuntLine>
            <HuntLine icon="star">
              Reliability Rep Rating <b>4.7</b> — reliable, slower to reply (inside 24 hrs)
            </HuntLine>
            <HuntLine icon="event_available">
              Available from <b>Dec 14</b> · Calls Mon–Wed 9am–11am PT · Live — checked in 3 days ago
            </HuntLine>
            <Actions takeLabel="Take this hunter in" />
          </div>
        </article>
        <p className="sb-note">
          Employer-side tolerance: the $78/hr hunter is the only one on the board who closes the Kubernetes
          and CI/CD gaps — shown inside the employer&apos;s 10% tolerance, with Book locked until the band
          moves or the hunter counters down into it.
        </p>
      </Ood>
    );
  }

  return (
    <Ood>
      <article className="hunt-card">
        <div className="hunt-card-head">
          <span className="pill pill-gold">EPIC · Illustrative</span>
          <h3>Senior .NET API Developer</h3>
          <p>HealthBridge · Direct employer</p>
          <span className="verify-chip">
            <Icon name="verified_user" /> Verified employer
          </span>
        </div>
        <div className="hunt-card-body">
          <HuntLine icon="payments">
            <b className="mono">$72–$78/hr</b> — whole band{" "}
            <b style={{ color: "var(--green)" }}>above</b> your $69.46/hr floor (top +$8.54/hr)
          </HuntLine>
          <HuntLine icon="public">100% remote · Anywhere in the U.S. (national average COLA) · Team ET</HuntLine>
          <HuntLine icon="description">W2 contract · 12 months, extension likely</HuntLine>
          <GateChips pay="pass" payLabel="" />
          <FitRow score={86} label="excellent · card sent" clock="1 day 22 hrs left" />
          <HuntLine icon="warning">
            Top gaps: <b>Azure Functions</b> · <b>Terraform</b>
          </HuntLine>
          <HuntLine icon="star">
            Rep Rating <b>4.8</b> from 23 hunts — fast decisions, honest pay
          </HuntLine>
          <Actions takeLabel="Take this hunt in" />
        </div>
      </article>
      <p className="sb-note">
        Board face, seeker side: just enough to take it or leave it — pay vs floor, the five gates as
        chips, the Fit band (never the breakdown), top gaps, and the clock. The full read stays sealed until
        the reveal.
      </p>
    </Ood>
  );
}
