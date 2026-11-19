import React from "react";

import { Icon, Ood } from "./shared";

export type AvailabilityVariant = "seeker" | "employer" | "overlap";

export interface AvailabilityPanelProps {
  variant?: AvailabilityVariant;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function DayChips({ on = 5 }: { on?: number }) {
  return (
    <div className="day-chips" aria-hidden="true">
      {DAYS.map((day, i) => (
        <span key={day} className={`day-chip${i < on ? " on" : ""}`}>
          <Icon name={i < on ? "check_circle" : "radio_button_unchecked"} /> {day}
        </span>
      ))}
    </div>
  );
}

function TimeChips({ options, selected = 0 }: { options: string[]; selected?: number }) {
  return (
    <div className="time-chips" aria-hidden="true">
      {options.map((option, i) => (
        <span key={option} className={`time-chip${i === selected ? " on" : ""}`}>
          <Icon name={i === selected ? "check_circle" : "radio_button_unchecked"} /> {option}
        </span>
      ))}
    </div>
  );
}

function Stepper({ value, unit }: { value: number; unit: string }) {
  return (
    <div className="avail-stepper">
      <span className="stepbtn">
        <Icon name="remove" />
      </span>
      <b>{value}</b>
      <span className="stepbtn">
        <Icon name="add" />
      </span>
      <span style={{ fontSize: 14, fontWeight: 700 }}>{unit}</span>
    </div>
  );
}

/**
 * Availability Panel — both sides' windows, exactly as in the Storybook
 * Preview artifact. Availability is a hard gate and a scheduling input
 * only: it earns no score points. Booking offers only slots inside BOTH
 * windows and both capacities.
 */
export function AvailabilityPanel({ variant = "overlap" }: AvailabilityPanelProps) {
  if (variant === "seeker") {
    return (
      <Ood>
        <div className="avail-card" aria-label="Seeker availability">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <div className="kicker" style={{ color: "var(--earth)" }}>
                <Icon name="event_available" /> Seeker · Set your trap — mark your availability
              </div>
              <h3 style={{ fontSize: 24, marginTop: 4 }}>
                <Icon name="calendar_month" /> When can you start — and when can you talk?
              </h3>
              <p className="note" style={{ margin: "6px 0 0" }}>
                Matching reads this live. If your availability goes stale, you stop getting cards — no
                employer ever books outside the windows you set here.
              </p>
            </div>
            <span className="avail-live">
              <Icon name="check_circle" /> Availability live — checked in 2 days ago
            </span>
          </div>
          <div className="avail-grid">
            <div className="avail-field">
              <label>
                <Icon name="event" /> Available from
              </label>
              <p style={{ fontSize: 15, margin: 0 }}>
                <b>Mon, Dec 7, 2026</b>
              </p>
              <p className="note" style={{ margin: "6px 0 0" }}>
                The first day you could start. Employers see this date, not a vague “soon.”
              </p>
              <label style={{ marginTop: 12 }}>
                <Icon name="hourglass_top" /> Notice period
              </label>
              <p style={{ fontSize: 15, margin: 0 }}>
                <b>2 weeks</b>
              </p>
              <p className="note" style={{ margin: "6px 0 0" }}>
                Counted from an offer, so the start date above already includes it.
              </p>
            </div>
            <div className="avail-field">
              <label>
                <Icon name="call" /> Weekly call windows — when employers may book a first call
              </label>
              <p style={{ fontSize: 14, margin: 0 }}>
                <b>Mon–Fri · 9am–12pm ET</b>
              </p>
              <DayChips />
              <TimeChips options={["9am–12pm ET", "12pm–3pm ET", "3pm–6pm ET", "Evenings ET"]} />
              <p className="note" style={{ margin: "8px 0 0" }}>
                <b>Your window:</b> Mon, Tue, Wed, Thu, Fri · 9am–12pm ET. Only slots inside this window
                are ever offered on a Target Card.
              </p>
            </div>
            <div className="avail-field">
              <label>
                <Icon name="groups" /> Max first calls per week
              </label>
              <Stepper value={3} unit="first calls / week" />
              <p className="note" style={{ margin: "6px 0 0" }}>
                Once 3 first calls are booked in a week, the picker stops offering you that week. You control
                the pace of the hunt.
              </p>
            </div>
            <div className="avail-field" style={{ background: "var(--greenbg)", borderColor: "var(--green)" }}>
              <label style={{ color: "var(--green)" }}>
                <Icon name="verified" /> Keep it live — weekly check-in
              </label>
              <p style={{ fontSize: 14, margin: "0 0 10px" }}>
                <b>Availability live — checked in 2 days ago.</b> Your stamp stays live for <b>7 days</b>{" "}
                from your last check-in; availability expires 14 days without one and matching pauses you —
                an expired signal never produces a card.
              </p>
              <button className="btn btn-primary" type="button">
                <Icon name="event_available" /> Check in — I&apos;m still available
              </button>
              <p className="note" style={{ margin: "8px 0 0", textAlign: "center" }}>
                Checking in also earns <b>+100 coins</b> (weekly check-in) and re-triggers matching.
              </p>
            </div>
          </div>
        </div>
        <p className="note" style={{ marginTop: 12 }}>
          Seeker Availability is a hard gate: available-from, notice, call windows, max calls/week, and the
          check-in stamp. It earns no score points of its own beyond the availability + speed line.
        </p>
      </Ood>
    );
  }

  if (variant === "employer") {
    return (
      <Ood>
        <div className="avail-card employer" aria-label="Employer availability">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <div className="kicker" style={{ color: "var(--earth)" }}>
                <Icon name="event_available" /> Employer · The mirror gate
              </div>
              <h3 style={{ fontSize: 24, marginTop: 4 }}>
                <Icon name="calendar_month" /> When will you answer — and decide?
              </h3>
              <p className="note" style={{ margin: "6px 0 0" }}>
                A Need with no availability cannot send cards. The same rule seekers follow, mirrored:
                response hours, slots held, a decision timeline, and named cover.
              </p>
            </div>
            <span className="avail-live">
              <Icon name="check_circle" /> Availability live — Optumserve
            </span>
          </div>
          <div className="avail-grid">
            <div className="avail-field">
              <label>
                <Icon name="reply" /> Response hours
              </label>
              <p style={{ fontSize: 15, margin: 0 }}>
                <b>Mon–Fri · 9am–5pm CT</b>
              </p>
              <DayChips />
              <p className="note" style={{ margin: "8px 0 0" }}>
                The 24h / 48h ghosting reminders and the response clock are judged against these hours —
                nobody is penalised for silence at 2am on a Sunday. 9am–5pm CT = <b>10am–6pm ET</b> in the
                seeker&apos;s timezone — the Target Card shows both, converted.
              </p>
            </div>
            <div className="avail-field">
              <label>
                <Icon name="event" /> Interview slots held per week
              </label>
              <Stepper value={4} unit="slots held / week" />
              <p className="note" style={{ margin: "6px 0 0" }}>
                4 slots are held open on the hiring team&apos;s calendar each week for first calls from this
                Need. When they&apos;re full, the picker offers next week — it never double-books.
              </p>
            </div>
            <div className="avail-field">
              <label>
                <Icon name="gavel" /> Decision timeline
              </label>
              <p style={{ fontSize: 15, margin: 0 }}>
                <b>5 business days</b> after the final call
              </p>
              <p className="note" style={{ margin: "6px 0 0" }}>
                Seekers see this on the card before they spend a reveal. A decision that slips past 5
                business days without a word counts toward the employer&apos;s Rep Rating.
              </p>
            </div>
            <div className="avail-field">
              <label>
                <Icon name="swap_horiz" /> Hiring-manager cover
              </label>
              <p style={{ fontSize: 15, margin: 0 }}>
                <b>If Emily is away, Dan covers</b>
              </p>
              <p className="note" style={{ margin: "6px 0 0" }}>
                Emily Rotundo (Brooksource, for Optumserve) is the named owner. If Emily is away, Dan covers
                — responses, first calls, and decisions keep moving, and the cover name is shown to the
                seeker so a holiday never looks like ghosting.
              </p>
            </div>
          </div>
        </div>
        <p className="note" style={{ marginTop: 12 }}>
          Employer verification mirrors seeker verification (domain email + company page), and the Rep Rating
          seekers give covers ghosting, pay honesty, and contract-to-hire conversion.
        </p>
      </Ood>
    );
  }

  return (
    <Ood>
      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          border: "1.5px solid var(--line)",
          borderRadius: 12,
          padding: 16,
          background: "var(--card)",
          textAlign: "left",
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: 13,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          <Icon name="calendar_month" /> Both hunters&apos; availability — in your timezone (ET)
        </h4>
        <p className="note" style={{ margin: "6px 0 0" }}>
          You&apos;re viewing as the seeker in <b>Eastern (ET)</b>, so every window below is converted to
          ET. The employer set theirs in Central — you never do timezone maths in your head.
        </p>
        <div className="avail-overlap">
          <div className="avail-side seeker">
            <b>
              <Icon name="travel_explore" /> You — Seeker
            </b>
            <p style={{ fontSize: 14, margin: "6px 0 0" }}>
              <Icon name="call" /> <b>Mon–Fri · 9am–12pm ET</b> for first calls
              <br />
              <Icon name="event_available" /> Available from <b>Mon, Dec 7, 2026</b> · Notice <b>2 weeks</b>
              <br />
              <Icon name="groups" /> Max <b>3</b> first calls / week · <Icon name="check_circle" /> Live —
              checked in 2 days ago
            </p>
          </div>
          <div className="avail-side employer">
            <b>
              <Icon name="crisis_alert" /> Optumserve — Employer
            </b>
            <p style={{ fontSize: 14, margin: "6px 0 0" }}>
              <Icon name="reply" /> Responds <b>Mon–Fri · 9am–5pm CT</b> = <b>10am–6pm ET</b> for you
              <br />
              <Icon name="event" /> <b>4</b> interview slots held / week · Decision in <b>5 business days</b>
              <br />
              <Icon name="swap_horiz" /> Owner: Emily · <b>If Emily is away, Dan covers</b>
            </p>
          </div>
        </div>
        <div
          style={{
            background: "var(--sage)",
            border: "1px solid var(--line)",
            borderRadius: 10,
            padding: "11px 13px",
            marginTop: 10,
            fontSize: 14,
          }}
          role="note"
        >
          <b>
            <Icon name="filter_alt" /> Overlap — the only times that can be booked: Mon–Fri · 10am–12pm ET.
          </b>{" "}
          That&apos;s where your 9am–12pm ET window crosses their 10am–6pm ET window. The picker below{" "}
          <b>only offers slots inside BOTH windows</b> — a 2:30pm slot (outside your window) and a 9:00am ET
          slot (8:00am CT, before they start) are never offered at all.
        </div>
        <p style={{ fontSize: 14, margin: "12px 0 0" }}>
          <b>Pick a slot inside both windows:</b>{" "}
          <span className="cost-chip light">Book a call · 100 coins • system-set</span>
        </p>
        <div className="slot-grid" role="group" aria-label="First call time slots — only inside both availability windows">
          <button type="button" className="slot-btn">
            <Icon name="event" /> Fri, Nov 20 · 10:00 AM
            <small>10:00 AM ET · 9:00 AM CT · Inside both windows · 30 min · Meet</small>
          </button>
          <button type="button" className="slot-btn selected">
            <Icon name="event" /> Fri, Nov 20 · 11:00 AM
            <small>11:00 AM ET · 10:00 AM CT · Inside both windows · 30 min · Meet</small>
          </button>
          <button type="button" className="slot-btn">
            <Icon name="event" /> Mon, Nov 23 · 10:30 AM
            <small>10:30 AM ET · 9:30 AM CT · Inside both windows · 30 min · Meet</small>
          </button>
        </div>
        <p className="note" style={{ margin: "8px 0 0" }}>
          <Icon name="info" /> Booking sends the invite with a Meet link to both hunters. The 48-hour
          response clock pauses while a call is booked.
        </p>
      </div>
    </Ood>
  );
}
