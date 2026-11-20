import React from "react";

import { Icon, Ood } from "./shared";

export type InviteEmailVariant = "emily" | "savannah";

export interface InviteEmailProps {
  variant?: InviteEmailVariant;
}

export const EMILY_INVITE_BODY = `Hi Emily,

I'm Brian — you emailed me about the Senior .NET Developer role at Optumserve ($60–$65/hr, 100% remote, W2 contract-to-hire). I'm interested.

What I'm not doing is losing another role to phone tag and a thread of "just checking in" emails — so I've put this role on JobHunter07.

No more "just checking in."
No missed calls, no voicemail tag.
No surprise stages halfway through.
No pay surprise at the offer. Pay and benefits are judged together, as one total number, against the floor I set from my own bills.

Everything from your email is already filled in. You only add what your email didn't say: your availability, and anything about the process that wasn't in it.

One rule protects us both: each side answers within 48 hours, or the hunt moves on. No ghosting.

Join free for this hunt, confirm what's pre-filled, and the hunt completes for me only — it won't be shown to anyone else unless you post it.

— Brian, Seeker · JobHunter07`;

const SAVANNAH_INVITE_BODY = `Hi Savannah,

I'm Brian — you emailed me about the Senior Developer role at RetailWorks ($50–$69/hr, remote, W2 contract-to-hire). I'm interested.

What I'm not doing is losing another role to phone tag and a thread of "just checking in" emails — so I've put this role on JobHunter07.

No more "just checking in."
No missed calls, no voicemail tag.
No surprise stages halfway through.
No pay surprise at the offer. Pay and benefits are judged together, as one total number, against the floor I set from my own bills.

Everything from your email is already filled in. You only add what your email didn't say: the pay band, your availability, and anything about the process that wasn't in it.

One rule protects us both: each side answers within 48 hours, or the hunt moves on. No ghosting.

Join free for this hunt, confirm what's pre-filled, and the hunt completes for me only — it won't be shown to anyone else unless you post it.

— Brian, Seeker · JobHunter07`;

interface PrefillRow {
  label: string;
  value: string;
  missing?: boolean;
}

/**
 * Invite Email — the Inbox Hunts invite, benefit first, exactly as in
 * the Storybook Preview artifact. A fixed banner sits at the very top of
 * every invite; the body below it is the seeker's own first-person
 * words, editable before sending. The banner headline never changes, so
 * the pitch is consistent.
 */
export function InviteEmail({ variant = "emily" }: InviteEmailProps) {
  const isEmily = variant === "emily";
  const to = isEmily ? "Emily Rotundo · erotundo@brooksource.com" : "Savannah Correro · savannah@mondo.com";
  const subject = isEmily
    ? "Optumserve .NET role — one card, whole process, 48-hour answer"
    : "Senior Developer role — one card, whole process, 48-hour answer";
  const body = isEmily ? EMILY_INVITE_BODY : SAVANNAH_INVITE_BODY;
  const rows: PrefillRow[] = isEmily
    ? [
        { label: "Role", value: "Senior .NET Developer — Optumserve" },
        { label: "Pay", value: "$60–$65/hr · W2 contract-to-hire" },
        { label: "Remote", value: "100% remote · CST hours" },
        { label: "Contract", value: "W2 contract-to-hire, converts after 1–2 yrs" },
        { label: "Top gaps", value: "Kubernetes · CI/CD" },
        { label: "Availability", value: "Not in the email — her form asks for it", missing: true },
      ]
    : [
        { label: "Role", value: "Senior Developer — RetailWorks" },
        { label: "Pay", value: "Not stated — her form asks for it", missing: true },
        { label: "Remote", value: "100% remote · Charlotte preferred" },
        { label: "Contract", value: "W2 contract-to-hire · 12 mo" },
        { label: "Top gaps", value: ".NET Core · Azure" },
        { label: "Availability", value: "Not in the email — her form asks for it", missing: true },
      ];

  return (
    <Ood>
      <article className="card invite-preview">
        <div className="invite-banner">
          <div className="invite-banner-eyebrow">JobHunter07 · One-and-Done Matching</div>
          <h3>No more phone tag — the whole hunt, in one place.</h3>
          <p>One card, the full process, verified pay, and an answer in 48 hours. Free for this hunt.</p>
        </div>
        <div style={{ padding: "16px 18px" }}>
          <p style={{ margin: "0 0 6px" }}>
            <b>To:</b> {to}
          </p>
          <p style={{ margin: "0 0 6px" }}>
            <b>Subject:</b> {subject}
          </p>
          <p className="note">From: JobHunter07, in Brian&apos;s name · Replies land in the hunt, not your inbox.</p>
          <p className="invite-edit-note">
            Your words — edit before sending. The banner above is fixed on every invite; the body below is yours.
          </p>
          <div className="invite-body-edit">{body}</div>
          <div className="prefilled-box">
            <h4>What&apos;s already filled in — saved from the email</h4>
            {rows.map((row) => (
              <div key={row.label} className="prefill-row">
                <Icon name={row.missing ? "warning" : "check_circle"} />
                <span>
                  <b>{row.label}:</b> {row.value}
                </span>
                <span className="src-tag">{row.missing ? "not in the email" : "from your email"}</span>
              </div>
            ))}
          </div>
          <div className="actions">
            <button className="btn btn-gold" type="button">
              <Icon name="send" /> Send invite — free for this hunt
            </button>
            <button className="btn btn-ghost" type="button">
              <Icon name="drafts" /> Not yet — keep as draft
            </button>
          </div>
        </div>
      </article>
    </Ood>
  );
}
