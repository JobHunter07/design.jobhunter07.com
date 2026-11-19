import React from "react";

import { CardShell, Icon, SectionTitle, STATUS } from "./shared";

export interface AvailabilityPanelProps {
  seekerWindows: string;
  seekerAvailableFrom: string;
  seekerNotice: string;
  seekerMaxCalls: number;
  seekerCheckedIn: string;
  employerWindows: string;
  employerWindowsEt: string;
  employerSlots: number;
  employerDecision: string;
  employerCover: string;
  overlap: string;
}

/**
 * Availability Panel — both sides' windows, side by side, with the
 * overlap. Availability is a hard gate and a scheduling input only:
 * it earns no score points. Booking offers only slots inside BOTH
 * windows and both capacities.
 */
export function AvailabilityPanel({
  seekerWindows,
  seekerAvailableFrom,
  seekerNotice,
  seekerMaxCalls,
  seekerCheckedIn,
  employerWindows,
  employerWindowsEt,
  employerSlots,
  employerDecision,
  employerCover,
  overlap,
}: AvailabilityPanelProps) {
  return (
    <CardShell labelledBy="availability-title">
      <SectionTitle id="availability-title">Availability — both sides</SectionTitle>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl p-4 ring-1" style={{ borderColor: "var(--jh-border)" }}>
          <h4 className="flex items-center gap-2 text-sm font-bold" style={{ color: "var(--jh-text)" }}>
            <Icon name="gps_fixed" size={16} /> Seeker
          </h4>
          <dl className="mt-2 grid gap-1 text-sm">
            <div className="flex justify-between gap-2"><dt style={{ color: "var(--jh-muted-text)" }}>Call windows</dt><dd className="font-semibold" style={{ color: "var(--jh-text)" }}>{seekerWindows}</dd></div>
            <div className="flex justify-between gap-2"><dt style={{ color: "var(--jh-muted-text)" }}>Available from</dt><dd className="font-semibold" style={{ color: "var(--jh-text)" }}>{seekerAvailableFrom}</dd></div>
            <div className="flex justify-between gap-2"><dt style={{ color: "var(--jh-muted-text)" }}>Notice</dt><dd className="font-semibold" style={{ color: "var(--jh-text)" }}>{seekerNotice}</dd></div>
            <div className="flex justify-between gap-2"><dt style={{ color: "var(--jh-muted-text)" }}>Max first calls/week</dt><dd className="font-semibold" style={{ color: "var(--jh-text)" }}>{seekerMaxCalls}</dd></div>
          </dl>
          <p className="mt-2 text-xs font-semibold" style={{ color: STATUS.pass }}>{seekerCheckedIn}</p>
        </div>

        <div className="rounded-xl p-4 ring-1" style={{ borderColor: "var(--jh-border)" }}>
          <h4 className="flex items-center gap-2 text-sm font-bold" style={{ color: "var(--jh-text)" }}>
            <Icon name="groups" size={16} /> Employer
          </h4>
          <dl className="mt-2 grid gap-1 text-sm">
            <div className="flex justify-between gap-2"><dt style={{ color: "var(--jh-muted-text)" }}>Response hours</dt><dd className="font-semibold" style={{ color: "var(--jh-text)" }}>{employerWindows}</dd></div>
            <div className="flex justify-between gap-2"><dt style={{ color: "var(--jh-muted-text)" }}>In your time</dt><dd className="font-semibold" style={{ color: "var(--jh-text)" }}>{employerWindowsEt}</dd></div>
            <div className="flex justify-between gap-2"><dt style={{ color: "var(--jh-muted-text)" }}>Interview slots/week</dt><dd className="font-semibold" style={{ color: "var(--jh-text)" }}>{employerSlots}</dd></div>
            <div className="flex justify-between gap-2"><dt style={{ color: "var(--jh-muted-text)" }}>Decision timeline</dt><dd className="font-semibold" style={{ color: "var(--jh-text)" }}>{employerDecision}</dd></div>
          </dl>
          <p className="mt-2 text-xs" style={{ color: "var(--jh-muted-text)" }}>{employerCover}</p>
        </div>
      </div>

      <p className="mt-4 rounded-lg px-3 py-2 text-sm font-semibold" style={{ backgroundColor: "#E6F4E6", color: STATUS.pass }} role="status">
        Overlap: {overlap} — booking only offers slots inside both windows.
      </p>
    </CardShell>
  );
}
