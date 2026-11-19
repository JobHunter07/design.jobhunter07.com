import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CostChip, FitBand, Icon, Ood, Pill, ScoreBreakdown, SysTag, Tracker } from '../../components/one-and-done/shared';

function Foundations() {
  return (
    <Ood>
      <div className="found-block">
        <h4>
          <Icon name="smart_button" /> Buttons
        </h4>
        <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
          <button className="btn btn-primary" type="button">
            <Icon name="lock" /> Lock in my range · Earn +500 coins
          </button>
          <button className="btn btn-gold" type="button">
            <Icon name="chat" /> Ask for $70/hr <CostChip light>100 coins • system-set</CostChip>
          </button>
          <button className="btn btn-ghost" type="button">
            <Icon name="directions_walk" /> Walk away · 0 coins
          </button>
          <button className="btn btn-ghost" type="button" disabled>
            <Icon name="call" /> Book a call — locked while a gate fails
          </button>
        </div>
        <div className="swatch-row" style={{ marginTop: 12 }}>
          <button className="ledger-toggle" type="button">
            <Icon name="receipt_long" /> Ledger
          </button>
          <button className="mini-btn" type="button">
            <Icon name="tune" /> Change on Screen 1
          </button>
          <button className="mini-btn" type="button">
            <Icon name="check_circle" /> Keep both
          </button>
          <CostChip>
            <Icon name="push_pin" /> −500 → 3,500 left
          </CostChip>
          <CostChip light>100 coins • system-set</CostChip>
        </div>
        <p className="note" style={{ marginTop: 10 }}>
          Primary = forest, Gold = the strike action, Ghost = the quiet action, disabled = locked by a failed
          gate. Coin costs ride on the button itself as a cost chip — never discovered afterwards.
        </p>
      </div>

      <div className="found-block">
        <h4>
          <Icon name="label" /> Pills, chips &amp; tags
        </h4>
        <div className="swatch-row">
          <Pill tone="green" icon="check_circle">PASS — 100% remote</Pill>
          <Pill tone="red" icon="cancel">FAIL — $65/hr top vs $69.46/hr floor</Pill>
          <Pill tone="gold" icon="timer">1 day 14 hrs left</Pill>
          <Pill tone="gold" icon="diamond">RARE</Pill>
          <span className="free-badge">
            <Icon name="check_circle" /> FREE — 2,500/MO + EARN
          </span>
          <span className="season-pill">
            <Icon name="calendar_month" /> This season — November (example)
          </span>
          <span className="gmail-chip">
            <Icon name="mark_email_read" /> Gmail connected · Read-only
          </span>
          <span className="avail-live">
            <Icon name="check_circle" /> Availability live — checked in 2 days ago
          </span>
        </div>
        <div className="swatch-row" style={{ marginTop: 10 }}>
          <span className="gate-chip pass">
            <Icon name="check_circle" /> Pay
          </span>
          <span className="gate-chip fail">
            <Icon name="cancel" /> Pay FAIL
          </span>
          <span className="gate-chip tolerance">
            <Icon name="warning" /> Below floor — within your 10% tolerance
          </span>
          <FitBand score={78} label="strong · held for review" />
          <span className="tol-flag">
            <Icon name="tune" /> Within your 10% tolerance
          </span>
        </div>
        <div className="swatch-row" style={{ marginTop: 10 }}>
          <span className="source-chip source-plaid">
            <Icon name="account_balance" /> Plaid
          </span>
          <span className="source-chip source-manual">
            <Icon name="edit_note" /> Manual
          </span>
          <SysTag />
          <SysTag light />
          <span className="src-tag email">
            <Icon name="mail" /> from your email
          </span>
          <span className="src-tag added">
            <Icon name="edit" /> added by employer
          </span>
          <span className="src-tag changed">
            <Icon name="compare_arrows" /> changed by employer
          </span>
          <span className="conf-tag">
            <Icon name="check_circle" /> Card confirmed — ready to reveal
          </span>
          <span className="invite-tag">
            <Icon name="send" /> Invite sent — waiting on employer
          </span>
          <span className="revealed-tag">
            <Icon name="lock_open" /> Revealed — no charge again
          </span>
        </div>
        <div className="swatch-row" style={{ marginTop: 12 }}>
          <span className="day-chip on">
            <Icon name="check_circle" /> Mon
          </span>
          <span className="day-chip">
            <Icon name="radio_button_unchecked" /> Sat
          </span>
          <span className="time-chip on">
            <Icon name="check_circle" /> 9am–12pm ET
          </span>
          <span className="time-chip">
            <Icon name="radio_button_unchecked" /> Evenings ET
          </span>
        </div>
      </div>

      <div className="found-block">
        <h4>
          <Icon name="route" /> Quest stepper
        </h4>
        <div className="stepper" aria-label="Progress — seeker hunt">
          <div className="step now">
            <span className="dot">1</span> Know your range
          </div>
          <div className="step-line" />
          <div className="step">
            <span className="dot">2</span> Set traps &amp; signals
          </div>
          <div className="step-line" />
          <div className="step">
            <span className="dot">3</span> Track targets
          </div>
          <div className="step-line" />
          <div className="step">
            <span className="dot">4</span> Strike / walk away
          </div>
        </div>
        <div className="stepper" aria-label="Progress — employer hunt" style={{ marginTop: 14 }}>
          <div className="step done">
            <span className="dot">
              <Icon name="check" />
            </span>{" "}
            Post the need
          </div>
          <div className="step-line" />
          <div className="step now">
            <span className="dot">2</span> Set the bounty
          </div>
          <div className="step-line" />
          <div className="step">
            <span className="dot">3</span> Gates + score
          </div>
          <div className="step-line" />
          <div className="step">
            <span className="dot">4</span> Meet &amp; hire
          </div>
        </div>
      </div>

      <div className="found-block">
        <h4>
          <Icon name="emoji_events" /> Trophy badges — trophies only, no points
        </h4>
        <div className="grid3">
          <div className="badge">
            <div className="icon">
              <Icon name="gps_fixed" />
            </div>
            <b>Floor Finder</b>
            <p className="note" style={{ margin: "2px 0 0" }}>
              Range locked from real numbers
            </p>
            <Pill tone="green" icon="check_circle">Unlocked</Pill>
          </div>
          <div className="badge">
            <div className="icon">
              <Icon name="swords" />
            </div>
            <b>Debt Slayer</b>
            <p className="note" style={{ margin: "2px 0 0" }}>
              $6,925 hunt in progress — ~7 months
            </p>
            <Pill tone="green" icon="check_circle">Unlocked</Pill>
          </div>
          <div className="badge locked">
            <div className="icon">
              <Icon name="handshake" />
            </div>
            <b>First Match</b>
            <p className="note" style={{ margin: "2px 0 0" }}>
              All 5 gates pass on one card
            </p>
            <Pill tone="gold" icon="lock">Locked</Pill>
          </div>
        </div>
        <p className="note" style={{ marginTop: 10 }}>
          Trophies mark what happened. They don&apos;t spend, they don&apos;t rank you, and they never stand
          in for coins. First Match stays locked until a card passes every gate.
        </p>
      </div>

      <div className="found-block">
        <h4>
          <Icon name="hiking" /> Tracker guide bubble
        </h4>
        <Tracker>
          “Every hunter who skips this step ends up chasing targets that can&apos;t feed them. Finish this
          profile and the ground pays you back — +500 earned coins, because a verified range saves the whole
          system work on every hunt after it. And seekers never pay to be here: no monthly fee, no access
          fee, not a cent.”
        </Tracker>
        <div style={{ marginTop: 12 }}>
          <Tracker>
            “On this ground nobody disappears. Say yes, say no with a reason, counter — any real answer keeps
            you clean and can even earn you coins. Go silent for 72 hours or skip a booked call and it costs
            you coins and a strike. Three strikes and you sit out 14 days while honest hunters keep moving.”
          </Tracker>
        </div>
        <p className="note" style={{ marginTop: 10 }}>
          The Tracker is the guide voice on every screen — one bubble, plain words, always tied to the numbers
          on that screen. It never hides a fail and never talks a hunter past a gate.
        </p>
      </div>

      <div className="found-block">
        <h4>
          <Icon name="analytics" /> Score breakdown — always with the score
        </h4>
        <ScoreBreakdown
          total={78}
          parts={[
            { label: "Gap coverage", points: 28, max: 40 },
            { label: "Skill depth + recency", points: 20, max: 25 },
            { label: "Seniority", points: 13, max: 15 },
            { label: "Preferences", points: 8, max: 10 },
            { label: "Timing fit + interview speed", points: 9, max: 10 },
          ]}
        />
        <p className="note" style={{ marginTop: 10 }}>
          A score is never shown without its breakdown. Palette: forest #16281C, moss #2F5D3A, gold #C9A227,
          cream paper #FDFAF3. DM Serif Display headings, DM Sans body, JetBrains Mono for figures, Material
          Symbols Rounded for icons — one icon style, no emoji.
        </p>
      </div>
    </Ood>
  );
}

const meta = {
  title: 'OneAndDone/Foundations/Buttons, Chips, Badges & Tracker',
  component: Foundations,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Foundations — the primitives every One-and-Done surface is built from: buttons, pills, chips and tags, the quest stepper, trophy badges, the Tracker guide bubble, and the Fit Score breakdown. Palette: forest #16281C, moss #2F5D3A, gold #C9A227, cream paper #FDFAF3.',
      },
    },
  },
} satisfies Meta<typeof Foundations>;

export default meta;

type Story = StoryObj<typeof meta>;

/** All primitives on one canvas. */
export const AllPrimitives: Story = {};
