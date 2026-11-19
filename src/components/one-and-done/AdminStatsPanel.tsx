import React from "react";

import { BIZ_STATS } from "./data";
import { Icon, Ood, Pill } from "./shared";

export type AdminStatsVariant = "overview" | "charts" | "supply" | "cards";

export interface AdminStatsPanelProps {
  variant?: AdminStatsVariant;
}

const REV_HEIGHT = (value: number) => Math.round((value / 1297) * 118);

/**
 * Admin Stats Panel — the Business Stats health dashboard, exactly as
 * in the Storybook Preview artifact (story "Business Stats"). Verdict
 * is evaluated danger-first from config thresholds; every stat is
 * computed from the ledger, never hand-typed. All figures shown here
 * are the mockup's labelled example/illustrative data, not actuals.
 */
export function AdminStatsPanel({ variant = "overview" }: AdminStatsPanelProps) {
  const s = BIZ_STATS;

  const verdictBanner = (
    <div className="verdict-banner" role="status" aria-label="Overall health verdict — in good shape, example">
      <div style={{ flex: 1, minWidth: 260 }}>
        <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 800, opacity: 0.9 }}>
          <Icon name="health_and_safety" /> Overall verdict · Right now · Example
        </div>
        <h4>
          <Icon name="check_circle" size={28} /> In good shape
        </h4>
        <p style={{ margin: 0, fontSize: 14, maxWidth: 620 }}>
          You can read this in 3 seconds: coin coverage is above target and MRR just hit its first milestone
          and is growing. Costs are still bigger than subscription revenue — that&apos;s the watch item below,
          not a danger sign yet at this stage.
        </p>
        <p style={{ margin: "8px 0 0", fontSize: 12.5, opacity: 0.95 }}>
          <b>Rule for green:</b> coverage ≥ 1.01 <b>and</b> MRR growing month-on-month. Both are true in this
          example. Thresholds are Admin config (<span className="mono">config.business_stats.*</span>), not
          hard-coded.
        </p>
        <div className="verdict-legend" aria-label="Other health states">
          <span>
            <i style={{ background: "#2e7d32" }} /> In good shape — green
          </span>
          <span>
            <i style={{ background: "#f2c94c" }} /> Covering costs, watch it — amber
          </span>
          <span>
            <i style={{ background: "#e57373" }} /> Under water — red
          </span>
          <span>
            <i style={{ background: "#b3261e" }} /> In danger — red
          </span>
        </div>
      </div>
      <div
        style={{
          background: "rgba(255,255,255,.14)",
          border: "1px solid rgba(255,255,255,.35)",
          borderRadius: 12,
          padding: 14,
          minWidth: 200,
        }}
      >
        <div style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 800, opacity: 0.9 }}>
          At a glance · Example
        </div>
        <div style={{ display: "grid", gap: 6, marginTop: 8, fontSize: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
            <span>Coverage</span>
            <b className="mono">1.04 ✓</b>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
            <span>MRR trend</span>
            <b className="mono">$0 → $5 ↑</b>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
            <span>MAU trend</span>
            <b className="mono">68 → 94 ↑</b>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
            <span>MRR vs total cost</span>
            <b className="mono" style={{ color: "#ffe082" }}>
              Watch
            </b>
          </div>
        </div>
      </div>
    </div>
  );

  const healthStrip = (
    <div className="health-strip" aria-label="Business health — traffic lights">
      <div className="health-item">
        <span className="health-dot red" aria-hidden="true" />
        <div>
          <b style={{ fontSize: 14 }}>MRR vs cost — needs attention</b>
          <p className="note" style={{ margin: "2px 0 0" }}>
            MRR <b className="mono">$5.00</b> vs operational cost <b className="mono">$1,247/mo</b> · Example
            figures. Revenue is at the first milestone; costs are ahead — normal at launch, red until MRR
            covers a growing share of cost.
          </p>
        </div>
        <Pill tone="red" icon="warning">
          Red
        </Pill>
      </div>
      <div className="health-item">
        <span className="health-dot green" aria-hidden="true" />
        <div>
          <b style={{ fontSize: 14 }}>Cost coverage — healthy</b>
          <p className="note" style={{ margin: "2px 0 0" }}>
            Coverage ratio <b className="mono">1.04</b> vs target <b className="mono">≥ 1.01</b> · Coins
            collected are covering measured cost + 1% margin.
          </p>
        </div>
        <Pill tone="green" icon="check_circle">
          Green
        </Pill>
      </div>
      <div className="health-item">
        <span className="health-dot green" aria-hidden="true" />
        <div>
          <b style={{ fontSize: 14 }}>Churn — healthy</b>
          <p className="note" style={{ margin: "2px 0 0" }}>
            Churn <b className="mono">0</b> this month · No paying employer lost. 1 paying customer, so one
            loss = 100% — watch closely.
          </p>
        </div>
        <Pill tone="green" icon="check_circle">
          Green
        </Pill>
      </div>
      <div className="health-item">
        <span className="health-dot amber" aria-hidden="true" />
        <div>
          <b style={{ fontSize: 14 }}>Ghosting — watch</b>
          <p className="note" style={{ margin: "2px 0 0" }}>
            Ghosting rate <b className="mono">4%</b> of matches · Inside tolerance but not zero. Amber if it
            climbs toward the strike-heavy zone.
          </p>
        </div>
        <Pill tone="gold" icon="warning">
          Amber
        </Pill>
      </div>
    </div>
  );

  const revenueCard = (
    <div className="viz-card">
      <h5>
        <Icon name="payments" /> Revenue vs cost — by month
      </h5>
      <p className="viz-q">Grouped bars · Last 3 months · Example / illustrative</p>
      <div className="viz-legend">
        <span>
          <i style={{ background: "var(--green)" }} /> Revenue — coins + MRR
        </span>
        <span>
          <i style={{ background: "#d99a00" }} /> Cost — operational
        </span>
      </div>
      <div className="grouped-chart" aria-hidden="true">
        {s.revenueByMonth.map((m) => (
          <div key={m.short} className="grouped-month">
            <div className="grouped-bars">
              <div className="vbar" style={{ height: REV_HEIGHT(m.revenue), background: "var(--green)" }}>
                <span>${m.revenue.toLocaleString()}</span>
              </div>
              <div className="vbar" style={{ height: REV_HEIGHT(m.cost), background: "#d99a00" }}>
                <span>${m.cost.toLocaleString()}</span>
              </div>
            </div>
            <label>{m.month}</label>
          </div>
        ))}
      </div>
      <p className="note" style={{ margin: "4px 0 0" }}>
        In words: Sep $1,146 vs $1,102 · Oct $1,237 vs $1,189 · Nov $1,297 vs $1,247 — revenue a nose ahead
        every month. Example.
      </p>
      <p className="viz-answer green">
        <b>Are we covering costs?</b> <b>Yes — on coins.</b> Revenue (coins collected + MRR) is ahead of
        measured cost all 3 months (coverage 1.04). <b>Not yet on MRR alone:</b> $5 of subscription revenue
        vs $1,247 cost is the pre-scale gap.
      </p>
    </div>
  );

  const gaugeCard = (
    <div className="viz-card">
      <h5>
        <Icon name="balance" /> Coverage gauge — are coin prices covering measured cost?
      </h5>
      <p className="viz-q">Gauge bar · Scale 0 to 1.30 · Target line at 1.01 · Example / illustrative</p>
      <div className="gauge-wrap" aria-hidden="true">
        <div className="gauge-track">
          <div className="gauge-fill" />
          <div className="gauge-target">
            <span>Target 1.01</span>
          </div>
        </div>
        <div className="gauge-labels">
          <span>0 — nothing covered</span>
          <span>1.00 — break-even</span>
          <span>
            <b style={{ color: "var(--green)" }}>Now: 1.04</b>
          </span>
          <span>1.30</span>
        </div>
      </div>
      <p className="viz-answer green" style={{ marginTop: 14 }}>
        <b>Coverage 1.04 — on track.</b> The green fill sits just past the black 1.01 target line: coins
        collected cover measured cost plus the 1% margin, with a small cushion. If the fill ever drops left
        of the line, this turns amber, then red. Example.
      </p>
      <h5 style={{ marginTop: 18 }}>
        <Icon name="flag" /> MRR milestones
      </h5>
      <div className="milestone-row" role="list">
        <div className="milestone reached" role="listitem">
          <Icon name="check_circle" size={28} />
          <b style={{ display: "block", fontSize: 22 }} className="mono">
            $5
          </b>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--green)" }}>Reached</span>
          <p className="note" style={{ margin: "4px 0 0" }}>
            1 paying employer
            <br />
            First revenue target hit
          </p>
        </div>
        <div className="milestone next" role="listitem">
          <Icon name="flag" size={28} />
          <b style={{ display: "block", fontSize: 22 }} className="mono">
            $25
          </b>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Next milestone</span>
          <p className="note" style={{ margin: "4px 0 0" }}>
            5 paying employers
            <br />
            4 to go
          </p>
        </div>
        <div className="milestone" role="listitem">
          <Icon name="flag" size={28} />
          <b style={{ display: "block", fontSize: 22 }} className="mono">
            $50
          </b>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)" }}>Locked</span>
          <p className="note" style={{ margin: "4px 0 0" }}>
            10 paying employers
            <br />
            9 to go
          </p>
        </div>
        <div className="milestone" role="listitem">
          <Icon name="emoji_events" size={28} />
          <b style={{ display: "block", fontSize: 22 }} className="mono">
            $100
          </b>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)" }}>Locked</span>
          <p className="note" style={{ margin: "4px 0 0" }}>
            20 paying employers
            <br />
            19 to go
          </p>
        </div>
      </div>
    </div>
  );

  const mrrStepCard = (
    <div className="viz-card">
      <h5>
        <Icon name="show_chart" /> MRR — step chart to the milestones
      </h5>
      <p className="viz-q">Monthly Recurring Revenue · Example / illustrative</p>
      <div className="step-chart" aria-hidden="true">
        <div className="step-line-mark" style={{ bottom: "88%" }}>
          <span>$100 milestone</span>
        </div>
        <div className="step-line-mark" style={{ bottom: "62%" }}>
          <span>$50 milestone</span>
        </div>
        <div className="step-line-mark" style={{ bottom: "38%" }}>
          <span>$25 milestone</span>
        </div>
        <div className="step-line-mark" style={{ bottom: "16%" }}>
          <span>$5 milestone ✓</span>
        </div>
        <div className="step-blocks">
          <div className="step-block" style={{ height: 14, background: "var(--line)" }}>
            <span>$0 · Sep</span>
          </div>
          <div className="step-block" style={{ height: 14, background: "var(--line)" }}>
            <span>$0 · Oct</span>
          </div>
          <div className="step-block" style={{ height: 30 }}>
            <span>$5 · Nov ✓</span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          fontWeight: 700,
          color: "var(--muted)",
          marginTop: 6,
        }}
      >
        <span>September</span>
        <span>October</span>
        <span>November</span>
      </div>
      <p className="viz-answer green">
        <b>Are we growing revenue?</b> <b>Yes — first step taken.</b> $0 → $0 → $5. The $5 line is crossed;
        $25 is the next dashed line (5 paying employers). Example.
      </p>
    </div>
  );

  const usersCard = (
    <div className="viz-card">
      <h5>
        <Icon name="group" /> Users — signups, active &amp; churned
      </h5>
      <p className="viz-q">Grouped bars · Per month · Example / illustrative</p>
      <div className="viz-legend">
        <span>
          <i style={{ background: "var(--moss)" }} /> MAU
        </span>
        <span>
          <i style={{ background: "var(--gold)" }} /> New signups
        </span>
        <span>
          <i style={{ background: "var(--red)" }} /> Churned (paying)
        </span>
      </div>
      <div className="grouped-chart" aria-hidden="true">
        {[
          { month: "September", mau: 68, mauH: 82, signups: 12, signH: 22, churned: 0, churnH: 3 },
          { month: "October", mau: 82, mauH: 99, signups: 22, signH: 38, churned: 1, churnH: 6 },
          { month: "November", mau: 94, mauH: 113, signups: 18, signH: 32, churned: 0, churnH: 3 },
        ].map((m) => (
          <div key={m.month} className="grouped-month">
            <div className="grouped-bars">
              <div className="vbar" style={{ height: m.mauH, background: m.month === "November" ? "var(--green)" : "var(--moss)" }}>
                <span>{m.mau}</span>
              </div>
              <div className="vbar" style={{ height: m.signH, background: "var(--gold)" }}>
                <span>{m.signups}</span>
              </div>
              <div className="vbar" style={{ height: m.churnH, background: "var(--red)" }}>
                <span>
                  {m.churned}
                  {m.month === "October" ? "*" : ""}
                </span>
              </div>
            </div>
            <label>{m.month}</label>
          </div>
        ))}
      </div>
      <p className="note" style={{ margin: "4px 0 0" }}>
        *October churn bar is a free-account closure in this example; paying churn is 0 in the stat cards.
        MAU 68 → 82 → 94 · Signups 12 → 22 → 18. Example.
      </p>
      <p className="viz-answer green">
        <b>Are we getting more users, or fewer?</b> <b>More.</b> MAU rose every month (+38% over 3 months)
        even though November signups dipped from 22 to 18 — existing hunters are staying active.
      </p>
    </div>
  );

  const activityCard = (
    <div className="viz-card" style={{ gridColumn: "1 / -1" }}>
      <h5>
        <Icon name="monitoring" /> Activity — what hunters did this week
      </h5>
      <p className="viz-q">Horizontal bars · This week · Example / illustrative</p>
      <div className="hbars" aria-hidden="true">
        {s.activityWeek.map((row) => (
          <div key={row.label} className="hbar-row">
            <span>{row.label}</span>
            <div className="hbar-track">
              <i style={{ width: `${row.pct}%`, background: row.color }} />
            </div>
            <b className="mono">{row.value}</b>
          </div>
        ))}
      </div>
      <p className="note" style={{ margin: "8px 0 0" }}>
        Check-ins keep signals fresh, reveals and posts are hunt actions, confirms are replies / actions taken
        (not ghosting). Example week.
      </p>
      <p className="viz-answer green">
        <b>How is their activity?</b> <b>Healthy and broad.</b> 61 check-ins means signals are fresh; 34
        reveals and 9 new Needs means both sides are hunting, not just lurking. Example.
      </p>
    </div>
  );

  const supplyCard = (
    <div className="viz-card" style={{ maxWidth: 1060, margin: "0 auto" }}>
      <h5>
        <Icon name="balance" /> Supply / demand balance — seekers vs employers vs hunts
      </h5>
      <p className="viz-q">
        Three bars, same ground · Are there enough hunts for the hunters waiting? · Example / illustrative
      </p>
      <div className="supply-bars" aria-hidden="true">
        <div className="supply-col">
          <div className="supply-bar" style={{ height: 118, background: "var(--moss)" }}>
            <span>132</span>
          </div>
          <label>
            <Icon name="travel_explore" /> Active seekers
          </label>
        </div>
        <div className="supply-col">
          <div className="supply-bar" style={{ height: 14, background: "var(--gold)" }}>
            <span>9</span>
          </div>
          <label>
            <Icon name="crisis_alert" /> Active employers
          </label>
        </div>
        <div className="supply-col">
          <div className="supply-bar" style={{ height: 18, background: "var(--earth)" }}>
            <span>12</span>
          </div>
          <label>
            <Icon name="crisis_alert" /> Open hunts
          </label>
        </div>
      </div>
      <p className="note" style={{ margin: "4px 0 0" }}>
        In words: Active seekers <b className="mono">132</b> · Active employers <b className="mono">9</b> ·
        Open hunts <b className="mono">12</b>. The tall green bar against two short bars is the whole story —
        lots of seekers, very few hunts. Example figures, illustrative.
      </p>
      <div className="ratio-row">
        <div className="ratio-chip">
          <Icon name="group" /> Seeker : employer &nbsp;<b>14.7 : 1</b>
          <br />
          <span className="note">132 ÷ 9 — for every employer hunting, nearly 15 seekers are hunting back.</span>
        </div>
        <div className="ratio-chip">
          <Icon name="crisis_alert" /> Seekers per open hunt &nbsp;<b>11 seekers per open hunt</b>
          <br />
          <span className="note">
            132 ÷ 12 — target is 5 per hunt (Admin config), so the ground is more than twice as crowded as it
            should be.
          </span>
        </div>
      </div>
      <h5 style={{ marginTop: 16, fontSize: 15 }}>
        <Icon name="handshake" /> Match stats — this month{" "}
        <Pill tone="gold" icon="flag">
          Example / illustrative
        </Pill>
      </h5>
      <div className="match-row" aria-label="Match stats — example figures">
        <div className="match-stat">
          <b>12</b>
          <span>Matches</span>
        </div>
        <div className="match-stat">
          <b>1.0</b>
          <span>Matches per hunt</span>
        </div>
        <div className="match-stat">
          <b>63%</b>
          <span>Match rate</span>
        </div>
        <div className="match-stat">
          <b>75%</b>
          <span>Card acceptance</span>
        </div>
        <div className="match-stat">
          <b>8</b>
          <span>First calls</span>
        </div>
        <div className="match-stat">
          <b>2</b>
          <span>Hired</span>
        </div>
        <div className="match-stat">
          <b>18 days</b>
          <span>Avg card-to-hire</span>
        </div>
        <div className="match-stat">
          <b>1</b>
          <span>Ghosted</span>
        </div>
      </div>
      <div className="hunts-callout" role="alert">
        <div
          style={{
            fontSize: 11,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            fontWeight: 800,
            color: "var(--red)",
          }}
        >
          <Icon name="warning" /> Hunts needed · The course-correct for this panel
        </div>
        <h6>132 seekers need 27 hunts — 12 open, 15 short</h6>
        <p style={{ margin: "6px 0 0", fontSize: 14 }}>
          At the target of <b>5 seekers per hunt</b> (Admin config:{" "}
          <span className="mono">config.business_stats.seekers_per_hunt = 5</span>), 132 seekers need{" "}
          <b className="mono">⌈132 ÷ 5⌉ = 27 hunts</b>. Only 12 are open.
        </p>
        <div className="hunts-progress" aria-hidden="true">
          <i />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            fontSize: 12,
            fontWeight: 700,
            marginTop: 5,
            flexWrap: "wrap",
          }}
        >
          <span>
            <b className="mono">12 of 27</b> hunts filled (44%)
          </span>
          <span style={{ color: "var(--red)" }}>
            <b className="mono">15 short</b>
          </span>
        </div>
        <p style={{ margin: "10px 0 0", fontSize: 14.5 }}>
          <b>
            <Icon name="explore" /> Course-correct: Recruit employers — 15 more hunts needed so seekers stop
            waiting.
          </b>{" "}
          The bottleneck is demand (employers / hunts), not supply (seekers) and not match quality.
          Suggestion only — nothing here recruits, posts, or changes config automatically.
        </p>
      </div>
      <p className="viz-answer amber">
        <b>Is supply / demand in balance?</b> <b>No — demand is short.</b> 14.7 seekers per employer and 11
        seekers per open hunt against a target of 5. Matching itself is healthy (75% card acceptance, only 1
        ghosted); the fix is more employers and more hunts, not tighter gates. Example.
      </p>
    </div>
  );

  const bizStats: {
    label: string;
    icon: string;
    value: string;
    valueStyle?: React.CSSProperties;
    cardStyle?: React.CSSProperties;
    text: React.ReactNode;
  }[] = [
    {
      label: "Monthly Recurring Revenue",
      icon: "payments",
      value: "$5.00",
      cardStyle: { border: "2px solid var(--gold)", background: "var(--goldbg)" },
      text: (
        <>
          <b>MRR</b> · 1 paying employer × $5/mo pilot tier · Formula: Σ active subscriptions × price ·
          Example figure, illustrative
        </>
      ),
    },
    {
      label: "Cost per user",
      icon: "person",
      value: "$13.27",
      text: <>Total operational cost ÷ MAU · $1,247 ÷ 94 · From Operational Costs · Example figure, illustrative</>,
    },
    {
      label: "Monthly Active Users",
      icon: "group",
      value: "94",
      text: (
        <>
          <b>MAU</b> · Seekers + employers active this month · Anyone who hunted, posted, revealed or messaged
          · Example figure, illustrative
        </>
      ),
    },
    {
      label: "Total users",
      icon: "groups",
      value: "132",
      text: <>All registered accounts, all time · Seekers + employers · 94 of 132 active this month (71%) · Example figure, illustrative</>,
    },
    {
      label: "Paying customers",
      icon: "paid",
      value: "1",
      text: <>Employers on a paid plan right now · The $5 MRR above is this one customer · Example figure, illustrative</>,
    },
    {
      label: "New signups — this month",
      icon: "person_add",
      value: "18",
      text: <>New accounts created in November · Seekers + employers combined · Example figure, illustrative</>,
    },
    {
      label: "Churn",
      icon: "trending_down",
      value: "0",
      valueStyle: { color: "var(--green)" },
      text: <>Paying customers lost this month · 0% churn rate · With n=1, treat % with care · Example figure, illustrative</>,
    },
    {
      label: "Avg coins per user",
      icon: "monetization_on",
      value: "2,410",
      text: <>Mean wallet balance across active users · Shows coin float building up (roll-over, never expire) · Example figure, illustrative</>,
    },
    {
      label: "Matches made",
      icon: "handshake",
      value: "12",
      text: <>Cards that passed review / sent this month · After 5 hard gates + Fit Score · Example figure, illustrative</>,
    },
    {
      label: "Hired / confirmed",
      icon: "verified",
      value: "2",
      text: <>Seeker-confirmed hires · Only a seeker confirmation counts — same rule as Hire Reward · Example figure, illustrative</>,
    },
    {
      label: "Avg time to hire",
      icon: "timer",
      value: "18 days",
      text: <>Need posted → seeker-confirmed hire, averaged · Inside the 30-day Hire Reward top tier · Example figure, illustrative</>,
    },
    {
      label: "Ghosting rate",
      icon: "visibility_off",
      value: "4%",
      text: <>Matches ghosted (no reply in 72 hrs) ÷ matches · Both sides counted · Example figure, illustrative</>,
    },
    {
      label: "Cost coverage ratio",
      icon: "balance",
      value: "1.04",
      valueStyle: { color: "var(--green)" },
      cardStyle: { border: "2px solid var(--green)", background: "var(--greenbg)" },
      text: (
        <>
          Coins collected × $0.001 ÷ measured cost · <b>Target ≥ 1.01</b> (cost + 1% margin) · Above target ·
          Example figure, illustrative
        </>
      ),
    },
    {
      label: "Conversion — signup → paying",
      icon: "conversion_path",
      value: "5.6%",
      text: <>1 paying ÷ 18 signups this month · Early signal only at this size · Example figure, illustrative</>,
    },
    {
      label: "Match → hire rate",
      icon: "target",
      value: "16.7%",
      text: <>2 hires ÷ 12 matches · The funnel number that proves matching works · Example figure, illustrative</>,
    },
    {
      label: "Runway signal",
      icon: "show_chart",
      value: "Costs > MRR",
      valueStyle: { fontSize: 20, paddingTop: 4 },
      text: <>$1,247/mo cost vs $5 MRR · Business is pre-scale — growth in paying employers is the lever · Example figures, illustrative</>,
    },
  ];

  const statCards = (
    <div style={{ maxWidth: 1060, margin: "0 auto" }}>
      <h4
        style={{
          margin: 0,
          textAlign: "left",
          fontSize: 13,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        <Icon name="monitoring" /> This month — all stats{" "}
        <Pill tone="gold" icon="flag">
          All figures example / illustrative
        </Pill>
      </h4>
      <div className="biz-grid" aria-label="Business stats — example figures">
        {bizStats.map((stat) => (
          <div key={stat.label} className="biz-stat" style={stat.cardStyle}>
            <div className="biz-top">
              <span className="biz-label">{stat.label}</span>
              <span className="biz-icon">
                <Icon name={stat.icon} />
              </span>
            </div>
            <b className="biz-val mono" style={stat.valueStyle}>
              {stat.value}
            </b>
            <p>{stat.text}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Ood>
      <div className="card">
        <h3>
          <Icon name="analytics" /> Business Stats — Admin Portal
        </h3>
        <p className="note">Example / illustrative data — not actuals. Every stat is computed from the ledger, never hand-typed.</p>
        {variant === "cards" ? (
          <>
            {statCards}
            <p className="note" style={{ marginTop: 12 }}>
              Definitions ride with the numbers: MRR = Σ active paid subscriptions (Stripe is the source of
              truth) · Cost per user = Operational Costs total ÷ MAU · Coverage = (coins collected × $0.001) ÷
              measured cost, target = margin config (default 1.01).
            </p>
          </>
        ) : variant === "supply" ? (
          supplyCard
        ) : variant === "charts" ? (
          <>
            <div className="viz-grid">
              {mrrStepCard}
              {usersCard}
              {activityCard}
            </div>
            <p className="note" style={{ marginTop: 12 }}>
              Plain CSS bars — no chart library. Every chart answers one plain question underneath it, so
              nobody has to do the maths in their head.
            </p>
          </>
        ) : (
          <>
            <div style={{ maxWidth: 1060, margin: "0 auto" }}>
              {verdictBanner}
              {healthStrip}
              <div className="viz-grid">
                {revenueCard}
                {gaugeCard}
              </div>
            </div>
            <p className="note" style={{ marginTop: 12 }}>
              All Business Stats figures are example / illustrative in the mockups; in the live portal every
              stat computes from the ledger with its formula shown. Course-correct actions are suggestions
              only — the dashboard never changes a price, threshold, or config value by itself.
            </p>
          </>
        )}
      </div>
    </Ood>
  );
}
