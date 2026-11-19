import React from "react";

import { Icon, Ood, Pill } from "./shared";

const TIER_CELL: React.CSSProperties = {
  borderRadius: 12,
  padding: 14,
  textAlign: "center",
};

const TIER_BIG: React.CSSProperties = { fontSize: 24 };
const TIER_TITLE: React.CSSProperties = { display: "block", marginTop: 6 };

/**
 * Hire Reward — a coin rebate, never a cash refund, fired ONLY on a
 * seeker-confirmed hire, exactly as in the Storybook Preview artifact.
 * The employer gets the 500-coin posting fee back plus a time adjustment
 * on total hunt spend.
 */
export function HireRewardPanel() {
  return (
    <Ood>
      <div className="card" style={{ maxWidth: 900, margin: "0 auto", border: "2px solid var(--gold)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "start",
            textAlign: "left",
          }}
        >
          <div>
            <div className="kicker" style={{ color: "var(--earth)" }}>
              Employer reward · Completing the hunt
            </div>
            <h3 style={{ fontSize: 26, marginTop: 4 }}>
              <Icon name="emoji_events" /> Hire Reward — hire fast, get rewarded. Hire slow, it costs you.
            </h3>
            <p className="note" style={{ margin: "6px 0 0", maxWidth: 680 }}>
              When an employer actually hires — and the seeker confirms it — the employer gets the posting
              fee back plus a percent bonus on the total coins spent on that hunt. The faster the hire, the
              bigger the reward. The reward only fires on a <b>seeker-confirmed hire</b>: the seeker taps
              Confirm hire on the Target Card and earns <b>+2,000 coins</b> for confirming.{" "}
              <b>No confirmation, no reward for either side.</b>
            </p>
          </div>
          <Pill tone="gold" icon="timer">
            Time is one of the factors
          </Pill>
        </div>
        <p style={{ fontSize: 15, fontWeight: 700, margin: "16px 0 0", lineHeight: 1.6, textAlign: "left" }}>
          Hired within 30 days: posting fee back + 5% bonus • Within 60 days: + 2.5% • Within 120 days: −
          2.5% • After 120 days: no refund
        </p>
        <div
          className="grid3"
          style={{ gridTemplateColumns: "repeat(4, 1fr)", marginTop: 14 }}
          role="group"
          aria-label="Hire Reward time tiers"
        >
          <div style={{ ...TIER_CELL, background: "var(--greenbg)", border: "1.5px solid var(--green)" }}>
            <span style={{ color: "var(--green)" }}><Icon name="bolt" size={28} /></span>
            <b style={TIER_TITLE}>Within 30 days</b>
            <div className="big-num" style={{ ...TIER_BIG, color: "var(--green)" }}>
              Fee back + 5%
            </div>
            <p className="note" style={{ margin: "4px 0 0" }}>
              Fast strike — full posting fee back, plus 5% of total hunt spend as a bonus.
            </p>
          </div>
          <div style={{ ...TIER_CELL, background: "var(--sage)", border: "1.5px solid var(--line)" }}>
            <Icon name="schedule" size={28} />
            <b style={TIER_TITLE}>Within 60 days</b>
            <div className="big-num" style={TIER_BIG}>
              Fee back + 2.5%
            </div>
            <p className="note" style={{ margin: "4px 0 0" }}>
              Still rewarded — fee back, plus 2.5% of total hunt spend.
            </p>
          </div>
          <div style={{ ...TIER_CELL, background: "var(--amberbg)", border: "1.5px solid var(--amber)" }}>
            <span style={{ color: "var(--amber)" }}><Icon name="hourglass_bottom" size={28} /></span>
            <b style={TIER_TITLE}>Within 120 days</b>
            <div className="big-num" style={{ ...TIER_BIG, color: "var(--amber)" }}>
              Fee back − 2.5%
            </div>
            <p className="note" style={{ margin: "4px 0 0" }}>
              Slow hunt penalty — fee back, minus 2.5% of total hunt spend. Taking too long costs you.
            </p>
          </div>
          <div style={{ ...TIER_CELL, background: "var(--redbg)", border: "1.5px solid var(--red)" }}>
            <span style={{ color: "var(--red)" }}><Icon name="block" size={28} /></span>
            <b style={TIER_TITLE}>After 120 days</b>
            <div className="big-num" style={{ ...TIER_BIG, color: "var(--red)" }}>
              No refund
            </div>
            <p className="note" style={{ margin: "4px 0 0" }}>
              No fee back, no bonus. The ground went cold — the hunt pays nothing back.
            </p>
          </div>
        </div>
        <div
          style={{
            background: "var(--goldbg)",
            border: "1.5px solid var(--gold)",
            borderRadius: 12,
            padding: 16,
            marginTop: 14,
            textAlign: "left",
          }}
        >
          <h4
            style={{
              margin: "0 0 6px",
              fontSize: 13,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            <Icon name="calculate" /> Worked example — a fast, confirmed hire
          </h4>
          <p style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>
            Spent 1,400 coins on this hunt → hired day 18: +570 coins back (500 fee + 70 bonus)
          </p>
          <p className="note" style={{ margin: "8px 0 0" }}>
            How it breaks down: <b>500</b> = the posting fee, returned in full. <b>70</b> = the 5% bonus —
            5% of the 1,400 coins spent on the whole hunt (posting, reveals, calls, runs), because day 18 is
            inside the 30-day window. Same hunt hired on day 45 would return 535 (500 + 35 at 2.5%); on day
            90 it would return 465 (500 − 35 at −2.5%); after day 120 it returns 0. The seeker who confirms
            this hire earns <b>+2,000 coins</b> on top.
          </p>
        </div>
      </div>
      <p className="note" style={{ marginTop: 12 }}>
        The Hire Reward is a coin rebate, never cash, and it only fires on a seeker-confirmed hire. No
        confirmation, no reward for either side.
      </p>
    </Ood>
  );
}

/**
 * No Ghosting — ghosting is punished on both ends, fast action is
 * rewarded in coins, exactly as in the Storybook Preview artifact.
 * Declining with a reason counts as acting.
 */
export function NoGhostingPanel({ strikes = 0, avgReply = "3 hrs" }: { strikes?: number; avgReply?: string }) {
  const used = Math.max(0, Math.min(3, strikes));
  return (
    <Ood>
      <div className="card" style={{ maxWidth: 900, margin: "0 auto", border: "2px solid var(--red)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "start",
            textAlign: "left",
          }}
        >
          <div>
            <div className="kicker" style={{ color: "var(--red)" }}>
              Both sides · No silent hunts
            </div>
            <h3 style={{ fontSize: 26, marginTop: 4 }}>
              <Icon name="visibility_off" /> No Ghosting — silence costs, acting is free
            </h3>
            <p className="note" style={{ margin: "6px 0 0", maxWidth: 680 }}>
              Ghosting is punished on <b>both ends</b> — seeker and employer alike. Fast action is rewarded
              in coins, and declining honestly is never punished: Respond and Walk away with reason both
              count as acting, neither is ghosting. Only silence and no-shows cost you.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Pill tone="green" icon="schedule">
              Avg reply: {avgReply}
            </Pill>
            <Pill tone="green" icon="shield">
              {used} {used === 1 ? "strike" : "strikes"}
            </Pill>
          </div>
        </div>
        <p style={{ fontSize: 15, fontWeight: 700, margin: "16px 0 0", lineHeight: 1.6, textAlign: "left" }}>
          No reply in 72 hrs: −250 coins, match expires, 1 strike • No-show for a booked call: −500 coins,
          1 strike • 3 strikes in 90 days: 14-day hunting pause
        </p>
        <div className="grid3" style={{ marginTop: 14 }} role="group" aria-label="No Ghosting penalties">
          <div style={{ ...TIER_CELL, background: "var(--redbg)", border: "1.5px solid var(--red)" }}>
            <span style={{ color: "var(--red)" }}><Icon name="timer_off" size={28} /></span>
            <b style={TIER_TITLE}>No reply in 72 hrs</b>
            <div className="big-num" style={{ ...TIER_BIG, color: "var(--red)" }}>
              −250 coins
            </div>
            <p className="note" style={{ margin: "4px 0 0" }}>
              Match expires and <b>1 strike</b> is recorded. The other hunter is released to hunt on —
              nobody waits in silence.
            </p>
          </div>
          <div style={{ ...TIER_CELL, background: "var(--redbg)", border: "1.5px solid var(--red)" }}>
            <span style={{ color: "var(--red)" }}><Icon name="event_busy" size={28} /></span>
            <b style={TIER_TITLE}>No-show for a booked call</b>
            <div className="big-num" style={{ ...TIER_BIG, color: "var(--red)" }}>
              −500 coins
            </div>
            <p className="note" style={{ margin: "4px 0 0" }}>
              Plus <b>1 strike</b>. Booking a call and not showing wastes the other hunter&apos;s time — so
              it costs double a ghost.
            </p>
          </div>
          <div style={{ ...TIER_CELL, background: "var(--amberbg)", border: "1.5px solid var(--amber)" }}>
            <span style={{ color: "var(--amber)" }}><Icon name="pause_circle" size={28} /></span>
            <b style={TIER_TITLE}>3 strikes in 90 days</b>
            <div className="big-num" style={{ ...TIER_BIG, color: "var(--amber)" }}>
              14-day hunting pause
            </div>
            <p className="note" style={{ margin: "4px 0 0" }}>
              Three strikes and hunting pauses for 14 days. Strikes age out after 90 days — a clean run
              clears the trail.
            </p>
          </div>
        </div>
        <div className="grid2" style={{ marginTop: 14, textAlign: "left" }}>
          <div style={{ background: "var(--sage)", borderRadius: 12, padding: 16 }}>
            <h4
              style={{
                margin: "0 0 8px",
                fontSize: 13,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              <Icon name="shield" /> Strike counter — your record
            </h4>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginTop: 8 }}>
              {[0, 1, 2].map((i) =>
                i < used ? (
                  <span
                    key={i}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "2px solid var(--red)",
                      background: "var(--redbg)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Icon name="close" />
                  </span>
                ) : i === 0 && used === 0 ? (
                  <span
                    key={i}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "2px solid var(--green)",
                      background: "var(--greenbg)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Icon name="check" />
                  </span>
                ) : (
                  <span
                    key={i}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "2px dashed var(--line)",
                      background: "var(--card)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Icon name="remove" />
                  </span>
                ),
              )}
              <b style={{ fontSize: 20 }}>
                {used} {used === 1 ? "strike" : "strikes"}
              </b>
            </div>
            <p className="note" style={{ margin: "8px 0 0" }}>
              {used} of 3 strikes used in the last 90 days.{" "}
              {used === 0 ? "No ghosts, no no-shows — clean record. " : ""}
              Every strike gets <b>one human review</b> on appeal — the same process, the same standard, for
              seekers and employers.
            </p>
          </div>
          <div style={{ background: "var(--greenbg)", borderRadius: 12, padding: 16 }}>
            <h4
              style={{
                margin: "0 0 8px",
                fontSize: 13,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "var(--green)",
              }}
            >
              <Icon name="bolt" /> Response time — fast pays
            </h4>
            <p style={{ margin: "8px 0 0" }}>
              <Pill tone="green" icon="schedule">
                Avg reply: {avgReply}
              </Pill>
            </p>
            <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: 14, display: "grid", gap: 5 }}>
              <li>
                <b>Reply in 2 hrs: +100 coins</b> — fastest hunters earn the most
              </li>
              <li>
                <b>Reply in 24 hrs: +50 coins</b>
              </li>
              <li>Reply within 48 hrs: on time — no bonus, no penalty</li>
              <li>
                <b>Respond</b> and <b>Walk away with reason</b> both stop the clock — both count as acting,
                neither is ghosting
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="note" style={{ marginTop: 12 }}>
        Ghosting is punished on both ends — seeker and employer alike — and fast action is rewarded in
        coins. Declining with a reason counts as acting, not ghosting.
      </p>
    </Ood>
  );
}
