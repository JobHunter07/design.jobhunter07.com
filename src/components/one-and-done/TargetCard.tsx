import React from "react";

import {
  HEALTHBRIDGE,
  HEALTHBRIDGE_GATES,
  HEALTHBRIDGE_SCORE_PARTS,
  OPTUMSERVE,
  OPTUMSERVE_GATES,
  OPTUMSERVE_SCORE_PARTS,
} from "./data";
import {
  FitBand,
  Icon,
  Ood,
  Pill,
  RepStars,
  ScoreBreakdown,
  SysTag,
  VerifyChip,
  type Gate,
  type ScorePart,
} from "./shared";

export type TargetCardVariant = "fail" | "pass" | "tolerance" | "sealed";

export interface TargetCardProps {
  variant?: TargetCardVariant;
}

/**
 * Target Card — the RARE collectible card itself, exactly as in the
 * Storybook Preview artifact. Four states: Pay FAIL (held 78/100),
 * Pay PASS (sent 86/100), Tolerance amber, Sealed/held.
 */
export function TargetCard({ variant = "fail" }: TargetCardProps) {
  const isPass = variant === "pass";
  const data = isPass ? HEALTHBRIDGE : OPTUMSERVE;
  const gates: Gate[] = isPass ? HEALTHBRIDGE_GATES : OPTUMSERVE_GATES;
  const parts: ScorePart[] = isPass ? HEALTHBRIDGE_SCORE_PARTS : OPTUMSERVE_SCORE_PARTS;

  const gateIcons: Record<string, string> = {
    Pay: "payments",
    Remote: "public",
    "Contract type": "description",
    Authorization: "badge",
    Availability: "event_available",
  };

  const gatePill = (gate: Gate) => {
    if (gate.result === "pass") {
      return (
        <span className="pill pill-green">
          <Icon name="check_circle" />
          PASS{gate.detail ? ` — ${gate.detail}` : ""}
        </span>
      );
    }
    if (gate.result === "tolerance") {
      return (
        <span className="pill pill-gold">
          <Icon name="warning" />
          Below floor — within your 10% tolerance
        </span>
      );
    }
    return (
      <span className="pill pill-red">
        <Icon name="cancel" />
        FAIL — {gate.detail}
      </span>
    );
  };

  const gateClass = (gate: Gate) =>
    gate.result === "pass" ? "gate pass" : gate.result === "tolerance" ? "gate tol" : "gate fail";

  const shownGates =
    variant === "tolerance"
      ? gates.map((g) => (g.label === "Pay" ? { ...g, result: "tolerance" as const } : g))
      : gates;

  return (
    <Ood>
      <div className="target-wrap">
        <div
          className="target-card"
          style={
            variant === "sealed"
              ? { borderColor: "var(--line)", boxShadow: "none" }
              : variant === "tolerance"
                ? { borderColor: "var(--gold)" }
                : undefined
          }
        >
          <div className="target-top">
            <Pill tone="gold" icon="diamond">
              {data.rarity}
            </Pill>
            {variant === "tolerance" ? (
              <span className="tol-flag">
                <Icon name="tune" />
                Within your 10% tolerance
              </span>
            ) : null}
            <h3 style={{ color: "#fff", fontSize: 26, margin: "8px 60px 4px 0" }}>{data.role}</h3>
            <p style={{ margin: 0, color: "#cfe0c8", fontSize: 14 }}>
              {isPass
                ? `${data.client} · Direct employer · 100% remote · W2 contract`
                : `${data.client} · via ${OPTUMSERVE.agency} (${OPTUMSERVE.recruiter}) · 100% remote · W2 contract`}
            </p>
            <VerifyChip>
              {variant === "sealed"
                ? "Verified employer"
                : "Verified employer — domain + company page checked"}
            </VerifyChip>
            {variant !== "sealed" ? (
              <RepStars
                rating={data.repRating}
                hunts={data.repHunts}
                note={isPass ? "fast decisions, honest pay" : "pay honesty, no ghosting"}
              />
            ) : null}
            <div className="reticle" aria-hidden="true">
              <Icon name={variant === "sealed" ? "lock" : "gps_fixed"} />
            </div>
            <p className="mono" style={{ margin: "12px 0 0", fontSize: 15 }}>
              Bounty: {data.payBand} ·{" "}
              {variant === "sealed"
                ? `Fit band ${data.fitScore} — held for review`
                : `Fit Score ${data.fitScore}/100`}
            </p>
            {variant !== "sealed" && variant !== "tolerance" ? (
              <p style={{ margin: "6px 0 0", fontSize: 13 }}>
                <Icon name="monetization_on" /> Reveal cost paid: 200 coins from balance · $0 cash billed{" "}
                <SysTag />
              </p>
            ) : null}
          </div>

          {variant === "sealed" ? (
            <div className="target-body" style={{ textAlign: "center", padding: "26px 18px" }}>
              <Icon name="lock" size={40} />
              <h3 style={{ fontSize: 22, marginTop: 6 }}>Sealed — held for review</h3>
              <p className="note" style={{ maxWidth: 440, margin: "6px auto 0" }}>
                {data.fitScore} lands in the 65–79 held band, so the full read — gate detail, Fit
                breakdown, both availability windows — stays sealed until you reveal. The face of the
                card already told you the band, the gates, and the clock; the breakdown is what the
                reveal buys.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginTop: 14,
                }}
              >
                <FitBand score={data.fitScore} label="strong · held for review" />
                <Pill tone="gold" icon="timer">
                  {data.clock}
                </Pill>
              </div>
              <button className="btn btn-gold" type="button" style={{ marginTop: 16 }}>
                <Icon name="lock_open" />
                Reveal — 200 coins <SysTag light />
              </button>
              <p className="note" style={{ margin: "8px 0 0" }}>
                Charged once per card — re-opening is free. Walking away and saving are always free.
              </p>
            </div>
          ) : (
            <div className="target-body">
              {variant === "tolerance" ? (
                <div
                  style={{
                    background: "var(--amberbg)",
                    border: "1.5px solid var(--gold)",
                    borderRadius: 12,
                    padding: "12px 14px",
                    marginBottom: 14,
                    fontSize: 14,
                  }}
                >
                  <b>
                    <Icon name="tune" /> Below floor — within your tolerance.
                  </b>{" "}
                  $65/hr is 6.4% below your $69.46/hr floor, inside the 10% tolerance you set. You chose
                  to see this card — your floor has not moved, the score has not changed, and the pay
                  gate below still reads as it scored.
                </div>
              ) : (
                <div className="clock-box" aria-label="Response clock — anti-ghosting">
                  <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                    <Icon name="timer" size={32} />
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <b style={{ fontSize: 16 }}>
                        <Icon name="schedule" /> Respond within 2 days — {data.clock}
                      </b>
                      <p style={{ margin: "4px 0 0", fontSize: 14, fontWeight: 700, color: "var(--green)" }}>
                        <Icon name="bolt" /> Reply in 2 hrs: +100 coins • in 24 hrs: +50 coins
                      </p>
                      {variant === "fail" ? (
                        <p className="note" style={{ margin: "4px 0 0" }}>
                          The clock is running for both hunters. Act fast and the ground pays you for it
                          — reply, counter, or walk away with a reason. Silence is the only thing that
                          counts as ghosting.
                        </p>
                      ) : null}
                    </div>
                    <Pill tone="gold" icon="timer">
                      {data.clock}
                    </Pill>
                  </div>
                  <div
                    style={{
                      height: 8,
                      background: "var(--sage)",
                      borderRadius: 999,
                      overflow: "hidden",
                      marginTop: 10,
                    }}
                    aria-hidden="true"
                  >
                    <i
                      style={{
                        display: "block",
                        height: "100%",
                        width: isPass ? "92%" : "71%",
                        background: "var(--gold)",
                      }}
                    />
                  </div>
                  {variant === "fail" ? (
                    <p className="note" style={{ margin: "6px 0 0" }}>
                      Clock started when this card was revealed. At 72 hrs with no reply the match
                      expires — see No Ghosting.
                    </p>
                  ) : null}
                </div>
              )}

              <h4>
                <Icon name="fact_check" /> The 5 hard gates — all must pass
              </h4>
              {shownGates.map((gate) => (
                <div key={gate.label} className={gateClass(gate)}>
                  <span>
                    <Icon name={gateIcons[gate.label] ?? "fact_check"} /> {gate.label}
                    {gate.label === "Availability" ? " — both sides marked & live" : ""}
                  </span>
                  {gatePill(gate)}
                </div>
              ))}

              <h4 style={{ marginTop: 16 }}>
                <Icon name="analytics" /> Fit Score breakdown — {data.fitScore} / 100
              </h4>
              <ScoreBreakdown parts={parts} total={data.fitScore} />
              {variant === "fail" ? (
                <p className="note">
                  78 lands in the 65–79 “held for review” band — but a hard-gate fail outranks the score.
                  No score, however high, turns a fail into a match.
                </p>
              ) : null}
              {variant === "pass" ? (
                <p className="note">
                  86 is at or above the 80+ send threshold — this card arrived as a sent match, not a held
                  one. Top gaps: <b>Azure Functions</b> · <b>Terraform</b>.
                </p>
              ) : null}
              {variant === "tolerance" ? (
                <p className="note">
                  Tolerance never passes a gate, never changes a Fit Score, and never moves a floor — it
                  only controls what you see. Take this hunt in by countering to your floor; the gate
                  passes only when the pay actually clears.
                </p>
              ) : null}

              {variant === "fail" ? (
                <div className="fail-banner">
                  <h3>
                    <Icon name="block" /> PAY GATE: FAIL — Boss not beaten yet
                  </h3>
                  <p style={{ margin: 0, fontSize: 14 }}>
                    $65/hr is <b>$4.46/hr short</b> of your $69.46/hr floor. At $65/hr the net is{" "}
                    <b>$85,403/yr</b> vs the <b>$91,919/yr</b> you need — $543/mo short, every month. The
                    honest move is to counter at your target, or walk.
                  </p>
                </div>
              ) : null}
              {variant === "pass" ? (
                <div className="pass-banner">
                  <h3>
                    <Icon name="check_circle" /> ALL 5 GATES PASS — target in range
                  </h3>
                  <p style={{ margin: 0, fontSize: 14 }}>
                    The whole band clears your floor — the top is <b>$8.54/hr above</b> it. Accept the
                    match or book the first call; both are unlocked.
                  </p>
                </div>
              ) : null}

              {variant === "fail" ? (
                <>
                  <div className="actions">
                    <button className="btn btn-ghost" type="button" disabled>
                      <Icon name="check_circle" /> Accept match — locked
                    </button>
                    <button className="btn btn-ghost" type="button" disabled>
                      <Icon name="call" /> Book a call — locked
                    </button>
                  </div>
                  <p className="note" style={{ textAlign: "center", margin: "8px 0 0" }}>
                    Locked while any hard gate fails. That&apos;s the rule that keeps the game honest —
                    coins can&apos;t buy past a fail either.
                  </p>
                  <div className="actions">
                    <button className="btn btn-gold" type="button">
                      <Icon name="chat" /> Ask for $70/hr{" "}
                      <span className="cost-chip light">100 coins • system-set</span>
                    </button>
                    <button
                      className="btn"
                      type="button"
                      style={{ background: "var(--sage)", color: "var(--ink)", border: "1.5px solid var(--line)" }}
                    >
                      <Icon name="directions_walk" /> Walk away · 0 coins
                    </button>
                  </div>
                  <p className="note" style={{ textAlign: "center", margin: "8px 0 0" }}>
                    Counter costs 100 coins from your balance — a message write + a fresh gate re-check.{" "}
                    <b>−100 • system-set</b> price. Book a call is also <b>100 coins • system-set</b>{" "}
                    when unlocked. Walk away is always free.
                  </p>
                </>
              ) : null}
              {variant === "pass" ? (
                <div className="actions">
                  <button className="btn btn-primary" type="button" style={{ width: "auto" }}>
                    <Icon name="check_circle" /> Accept match
                  </button>
                  <button className="btn btn-gold" type="button">
                    <Icon name="call" /> Book a first call{" "}
                    <span className="cost-chip light">100 coins • system-set</span>
                  </button>
                </div>
              ) : null}
              {variant === "tolerance" ? (
                <div className="actions">
                  <button className="btn btn-gold" type="button">
                    <Icon name="crisis_alert" /> Take this hunt in — counter at $70/hr{" "}
                    <span className="cost-chip light">100 coins</span>
                  </button>
                  <button
                    className="btn"
                    type="button"
                    style={{ background: "var(--sage)", color: "var(--ink)", border: "1.5px solid var(--line)" }}
                  >
                    <Icon name="directions_walk" /> Walk away · 0 coins
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </Ood>
  );
}
