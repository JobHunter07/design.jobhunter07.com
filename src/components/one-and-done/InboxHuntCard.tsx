import React from "react";

import { CardShell, HuntButton, Icon, Muted, STATUS } from "./shared";

export type ParseConfidence = "High" | "Medium" | "Low";

export interface ParsedField {
  label: string;
  value: string;
  /** True when the email never stated this — flagged, never guessed. */
  missing?: boolean;
}

export interface InboxHuntCardProps {
  role: string;
  company: string;
  recruiter: string;
  confidence: ParseConfidence;
  fields: ParsedField[];
  sourceEmail: string;
  floorNote?: string;
  confirmed?: boolean;
  inviteSent?: boolean;
  onEdit?: () => void;
  onConfirm?: () => void;
  onReveal?: () => void;
  onWalkAway?: () => void;
}

const CONFIDENCE_STYLES: Record<ParseConfidence, { bg: string; color: string }> = {
  High: { bg: "#E6F4E6", color: STATUS.pass },
  Medium: { bg: "#FDF3E3", color: STATUS.amber },
  Low: { bg: "#FDECEA", color: STATUS.fail },
};

/**
 * Inbox Hunt Card — a draft card parsed from the seeker's own recruiter
 * email. Parsed fields are exactly what the email stated; a field the
 * email didn't state stays flagged until the employer confirms it.
 * Creating a card costs 0 coins; Reveal sends the invite, also 0 coins.
 */
export function InboxHuntCard({
  role,
  company,
  recruiter,
  confidence,
  fields,
  sourceEmail,
  floorNote,
  confirmed = false,
  inviteSent = false,
  onEdit,
  onConfirm,
  onReveal,
  onWalkAway,
}: InboxHuntCardProps) {
  const confidenceStyle = CONFIDENCE_STYLES[confidence];
  const missingFields = fields.filter((f) => f.missing);

  return (
    <CardShell labelledBy={`inbox-hunt-${role.replace(/[^a-z0-9]+/gi, "-")}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <span className="rounded-full px-2.5 py-1 text-xs font-bold tracking-wide" style={{ backgroundColor: "#F5F5F4", color: "#57534E" }}>
          DRAFT · Illustrative
        </span>
        <span
          className="rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{ backgroundColor: confidenceStyle.bg, color: confidenceStyle.color }}
        >
          Parse confidence: {confidence}
        </span>
      </div>

      <h3 className="mt-3 text-xl font-bold" style={{ color: "var(--jh-text)" }}>
        {role}
      </h3>
      <p className="text-sm" style={{ color: "var(--jh-muted-text)" }}>
        {company} · {recruiter}
      </p>

      <dl className="mt-4 grid gap-2 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label} className="rounded-lg p-2.5 ring-1" style={{ borderColor: "var(--jh-border)" }}>
            <dt className="text-xs font-semibold" style={{ color: "var(--jh-muted-text)" }}>
              {field.label}
            </dt>
            <dd className="mt-0.5 text-sm font-semibold" style={{ color: field.missing ? STATUS.amber : "var(--jh-text)" }}>
              {field.missing ? (
                <span className="inline-flex items-center gap-1">
                  <Icon name="close" size={14} /> {field.value} — confirm
                </span>
              ) : (
                field.value
              )}
            </dd>
          </div>
        ))}
      </dl>

      {missingFields.length > 0 ? (
        <p className="mt-3 rounded-lg px-3 py-2 text-sm font-semibold" style={{ backgroundColor: "#FDF3E3", color: STATUS.amber }} role="status">
          {missingFields.length} field{missingFields.length > 1 ? "s" : ""} need{missingFields.length > 1 ? "" : "s"} confirming —{" "}
          {missingFields.map((f) => f.label).join(", ")}. The email never named {missingFields.length > 1 ? "them" : "it"}, so the parse invents nothing.
        </p>
      ) : null}

      {floorNote ? <Muted>{floorNote}</Muted> : null}
      <p className="mt-2 text-xs" style={{ color: "var(--jh-muted-text)" }}>
        Source: {sourceEmail}
      </p>

      {inviteSent ? (
        <p className="mt-3 rounded-lg px-3 py-2 text-sm font-semibold" style={{ backgroundColor: "#E6F4E6", color: STATUS.pass }} role="status">
          Invite sent — waiting on employer. No response clock runs here and nobody can ghost.
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <HuntButton variant="ghost" onClick={onEdit}>
          <Icon name="edit" size={16} /> Edit fields
        </HuntButton>
        {!confirmed ? (
          <HuntButton onClick={onConfirm}>Confirm card</HuntButton>
        ) : (
          <HuntButton onClick={onReveal} disabled={inviteSent}>
            Reveal — send invite · 0 coins
          </HuntButton>
        )}
        <HuntButton variant="ghost" onClick={onWalkAway}>
          Walk away · free
        </HuntButton>
      </div>
      <Muted>Only a confirmed card can be revealed. Inbox Hunts never charge coins and never invent data.</Muted>
    </CardShell>
  );
}
