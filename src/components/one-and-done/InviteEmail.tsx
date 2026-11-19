import React from "react";

import { CardShell, HuntButton, Icon, Muted, SectionTitle } from "./shared";

export interface PrefilledField {
  label: string;
  value: string;
  /** True when the email never stated this — the employer is asked to add it. */
  missing?: boolean;
}

export interface InviteEmailProps {
  to: string;
  subject: string;
  /** The seeker's own first-person body (editable before sending). */
  body: string;
  prefilled: PrefilledField[];
  onBodyChange?: (body: string) => void;
  onSend?: () => void;
  onNotYet?: () => void;
  sent?: boolean;
}

/**
 * Invite Email — the Inbox Hunts invite, benefit first. A fixed banner
 * sits at the very top of every invite; the body below it is the
 * seeker's own first-person words, editable before sending. The banner
 * headline never changes, so the pitch is consistent.
 */
export function InviteEmail({
  to,
  subject,
  body,
  prefilled,
  onBodyChange,
  onSend,
  onNotYet,
  sent = false,
}: InviteEmailProps) {
  return (
    <CardShell labelledBy="invite-email-title">
      <SectionTitle id="invite-email-title">Invite email — preview before anything is sent</SectionTitle>
      <p className="mt-1 text-sm" style={{ color: "var(--jh-muted-text)" }}>
        To {to} · Sent from JobHunter07 in your name — your own email address is never shown. Replies land in the
        hunt, not your inbox.
      </p>
      <p className="mt-2 text-sm font-semibold" style={{ color: "var(--jh-text)" }}>
        Subject: {subject}
      </p>

      {/* Fixed benefit-first banner */}
      <div
        className="mt-4 rounded-2xl p-5 text-center"
        style={{ backgroundColor: "#16281C", color: "#FDFBF3" }}
        role="banner"
        aria-label="Why JobHunter07"
      >
        <p className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase" style={{ color: "#C9A227" }}>
          <Icon name="explore" size={18} label="Compass" /> JobHunter07 · One-and-Done Matching
        </p>
        <p className="mt-2 text-2xl font-bold">No more phone tag — the whole hunt, in one place.</p>
        <p className="mt-1 text-sm" style={{ color: "#E8EFE4" }}>
          One card, the full process, verified pay, and an answer in 48 hours. Free for this hunt.
        </p>
      </div>

      <label htmlFor="invite-body" className="mt-4 block text-sm font-semibold" style={{ color: "var(--jh-text)" }}>
        Your words — edit before sending
      </label>
      <textarea
        id="invite-body"
        className="mt-1 w-full rounded-xl p-3 text-sm ring-1 focus:outline-none focus-visible:ring-2"
        style={{ backgroundColor: "var(--jh-surface)", color: "var(--jh-text)", borderColor: "var(--jh-border)" }}
        rows={12}
        value={body}
        onChange={(event) => onBodyChange?.(event.target.value)}
      />

      <div className="mt-4">
        <h4 className="text-sm font-bold" style={{ color: "var(--jh-text)" }}>
          What&rsquo;s already filled in — saved from the email
        </h4>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {prefilled.map((field) => (
            <li key={field.label} className="flex items-start gap-2 rounded-lg p-2.5 text-sm ring-1" style={{ borderColor: "var(--jh-border)" }}>
              <Icon name={field.missing ? "close" : "check"} size={16} />
              <span>
                <strong>{field.label}:</strong> {field.value}{" "}
                <span style={{ color: "var(--jh-muted-text)" }}>
                  {field.missing ? "— not in the email, her form asks for it" : "— from your email"}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {sent ? (
        <p className="mt-4 rounded-lg px-3 py-2 text-sm font-semibold" style={{ backgroundColor: "#E6F4E6", color: "#2E7D32" }} role="status">
          Invite sent — waiting on employer
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          <HuntButton onClick={onSend}>Send invite — free</HuntButton>
          <HuntButton variant="ghost" onClick={onNotYet}>
            Not yet
          </HuntButton>
        </div>
      )}
      <Muted>The banner is fixed on every invite. The body is your words — the system never writes in its own voice here.</Muted>
    </CardShell>
  );
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
