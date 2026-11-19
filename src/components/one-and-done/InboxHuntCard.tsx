import React from "react";

import { Icon, Ood, Pill } from "./shared";

export type InboxHuntVariant = "high" | "flagged" | "confirmed" | "sent";

export interface InboxHuntCardProps {
  variant?: InboxHuntVariant;
}

function Field({ icon, label, children, mono = false }: { icon: string; label: string; children: React.ReactNode; mono?: boolean }) {
  return (
    <div className="inbox-field">
      <span className="k">
        <Icon name={icon} /> {label}
      </span>
      <span className={`v${mono ? " mono" : ""}`}>{children}</span>
    </div>
  );
}

function OptumserveFields() {
  return (
    <div>
      <Field icon="work" label="Role">
        Senior .NET Developer
      </Field>
      <Field icon="business" label="Company / via">
        Optumserve · Brooksource — Emily Rotundo
      </Field>
      <Field icon="payments" label="Pay" mono>
        $60–$65/hr
      </Field>
      <Field icon="public" label="Location">
        100% remote · Team works CST hours
      </Field>
      <Field icon="description" label="Type">
        W2 contract-to-hire · 6 months, then convert
      </Field>
      <Field icon="mail" label="Source email">
        <span style={{ color: "var(--moss)", fontWeight: 700 }}>Gmail · Nov 18, 2026, 9:14am — view email</span>
      </Field>
    </div>
  );
}

function DraftActions() {
  return (
    <div className="hunt-actions">
      <button type="button" className="btn btn-ghost" style={{ padding: "10px 14px", fontSize: 14 }}>
        <Icon name="edit_note" /> Edit fields
      </button>
      <button type="button" className="btn btn-primary" style={{ padding: "10px 14px", fontSize: 14, width: "auto" }}>
        <Icon name="fact_check" /> Confirm card
      </button>
      <button type="button" className="btn btn-ghost" style={{ padding: "10px 14px", fontSize: 14 }}>
        <Icon name="send" /> Reveal — send invite · 0 coins
      </button>
      <button type="button" className="btn btn-ghost" style={{ padding: "10px 14px", fontSize: 14 }}>
        <Icon name="directions_walk" /> Walk Away · free
      </button>
    </div>
  );
}

/**
 * Inbox Hunt Card — a draft card parsed from the seeker's own recruiter
 * email, exactly as in the Storybook Preview artifact. Parsed fields are
 * exactly what the email stated; a field the email didn't state stays
 * flagged until the employer confirms it. Creating a card costs 0 coins;
 * Reveal sends the invite, also 0 coins.
 */
export function InboxHuntCard({ variant = "high" }: InboxHuntCardProps) {
  if (variant === "flagged") {
    return (
      <Ood>
        <article className="hunt-card">
          <div className="hunt-card-head">
            <span className="pill pill-gold">DRAFT · Illustrative</span>{" "}
            <Pill tone="gold" icon="fact_check">
              Parse confidence: Medium
            </Pill>
            <h3>Senior Developer</h3>
            <p>Via Mondo (Savannah Correro)</p>
          </div>
          <div className="hunt-card-body">
            <div>
              <Field icon="work" label="Role">
                Senior Developer
              </Field>
              <Field icon="business" label="Company / via">
                Via Mondo — Savannah Correro
              </Field>
              <Field icon="public" label="Location">
                100% remote
              </Field>
              <Field icon="description" label="Type">
                Contract-to-hire
              </Field>
              <Field icon="mail" label="Source email">
                <span style={{ color: "var(--moss)", fontWeight: 700 }}>Gmail · Jun 24, 2026 — view email</span>
              </Field>
            </div>
            <div className="flag-field">
              <b>
                <Icon name="warning" /> 1 field needs confirming — Pay not stated — confirm
              </b>
              <p style={{ margin: "4px 0 0" }}>
                The email never named a rate, so the parse invents nothing. You can still confirm this card:
                when Savannah joins, confirming the pay band is her first step, and until she does the pay
                gate cannot pass — the card says so openly.
              </p>
            </div>
            <DraftActions />
          </div>
        </article>
        <p className="sb-note">
          A field the email didn&apos;t state stays flagged in amber until the employer confirms it on
          joining — and a gate that can&apos;t be checked yet can&apos;t pass. The Tulsi / SoftSages draft on
          Screen 8 uses this same state.
        </p>
      </Ood>
    );
  }

  if (variant === "confirmed") {
    return (
      <Ood>
        <article className="hunt-card">
          <div className="hunt-card-head">
            <span className="pill pill-gold">DRAFT · Illustrative</span>{" "}
            <Pill tone="green" icon="fact_check">
              Parse confidence: High
            </Pill>
            <h3>Senior .NET Developer</h3>
            <p>Optumserve · via Brooksource (Emily Rotundo)</p>
            <span className="conf-tag">
              <Icon name="check_circle" /> Card confirmed — ready to reveal
            </span>
          </div>
          <div className="hunt-card-body">
            <OptumserveFields />
            <div className="hunt-actions">
              <button type="button" className="btn btn-gold" style={{ padding: "10px 14px", fontSize: 14 }}>
                <Icon name="send" /> Reveal — send invite · 0 coins
              </button>
              <button type="button" className="btn btn-ghost" style={{ padding: "10px 14px", fontSize: 14 }}>
                <Icon name="directions_walk" /> Walk Away · free
              </button>
            </div>
          </div>
        </article>
        <p className="sb-note">
          Confirmed: the draft is locked as the seeker&apos;s hunt and Reveal is live. On an Inbox Hunt,
          Reveal doesn&apos;t open a profile — it opens the invite email preview (next story).
        </p>
      </Ood>
    );
  }

  if (variant === "sent") {
    return (
      <Ood>
        <article className="hunt-card">
          <div className="hunt-card-head">
            <span className="pill pill-gold">DRAFT · Illustrative</span>{" "}
            <Pill tone="green" icon="fact_check">
              Parse confidence: High
            </Pill>
            <h3>Senior .NET Developer</h3>
            <p>Optumserve · via Brooksource (Emily Rotundo)</p>
            <span className="invite-tag">
              <Icon name="send" /> Invite sent — waiting on employer
            </span>
          </div>
          <div className="hunt-card-body">
            <div>
              <Field icon="work" label="Role">
                Senior .NET Developer
              </Field>
              <Field icon="business" label="Company / via">
                Optumserve · Brooksource — Emily Rotundo
              </Field>
              <Field icon="payments" label="Pay" mono>
                $60–$65/hr
              </Field>
              <Field icon="public" label="Location">
                100% remote · Team works CST hours
              </Field>
              <Field icon="description" label="Type">
                W2 contract-to-hire · 6 months, then convert
              </Field>
            </div>
          </div>
          <div className="invite-sent" role="status">
            <b>
              <Icon name="mark_email_read" /> Invite sent — Thu, Nov 19, 2026
            </b>
            <p style={{ margin: "4px 0 0" }}>
              This card now sits on the <b>Waiting on employer</b> shelf. No response clock runs and nobody
              can ghost — the hunt only starts when both hunters are on the ground. Walk Away still cancels
              the invite. After 14 days with no join, the card rests on the “Employer didn&apos;t join” shelf
              with exactly one free re-send.
            </p>
          </div>
        </article>
        <p className="sb-note">
          Every field parsed from the email was saved onto the hunt when the invite was sent — Emily&apos;s
          form opens pre-filled and locked, and only asks for what the email never said.
        </p>
      </Ood>
    );
  }

  return (
    <Ood>
      <article className="hunt-card">
        <div className="hunt-card-head">
          <span className="pill pill-gold">DRAFT · Illustrative</span>{" "}
          <Pill tone="green" icon="fact_check">
            Parse confidence: High
          </Pill>
          <h3>Senior .NET Developer</h3>
          <p>Optumserve · via Brooksource (Emily Rotundo)</p>
        </div>
        <div className="hunt-card-body">
          <OptumserveFields />
          <p className="note" style={{ margin: 0 }}>
            <Icon name="gps_fixed" /> Against your floor: band top $65/hr is{" "}
            <b>6.4% below your $69.46/hr floor</b> — inside your 10% tolerance, so this hunt can be taken in
            and countered once Emily joins. The parse hid nothing: the shortfall is on the face of the card.
          </p>
          <DraftActions />
        </div>
      </article>
      <p className="sb-note">
        Parsed fields are exactly what the email stated — nothing filled in by guessing. <b>Edit</b> fixes a
        mis-parse, <b>Confirm card</b> locks the draft as your hunt, and only a confirmed card can be
        revealed. Creating and revealing an Inbox Hunt costs 0 coins.
      </p>
    </Ood>
  );
}
