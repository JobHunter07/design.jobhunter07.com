import React, { useState } from "react";

import { ADMIN_AUDIT_LOG, ADMIN_CONFIG_GROUPS } from "./data";
import { Icon, Ood, Pill } from "./shared";

/**
 * Admin Config Table — every rate, fee, threshold, tier, and limit is
 * set here, DB-driven, exactly as in the Storybook Preview artifact.
 * One group at a time, switched from the segmented control. No
 * hard-coded values in code; changes are audited, versioned,
 * previewable, and never retroactive. Spend prices are system-set by
 * the cost + margin formula — never hand-typed.
 */
export function AdminConfigTable() {
  const [activeId, setActiveId] = useState(ADMIN_CONFIG_GROUPS[0].id);
  const group = ADMIN_CONFIG_GROUPS.find((g) => g.id === activeId) ?? ADMIN_CONFIG_GROUPS[0];

  return (
    <Ood>
      <div className="card" style={{ maxWidth: 900, margin: "0 auto", textAlign: "left" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "start",
          }}
        >
          <div>
            <h3 style={{ fontSize: 24 }}>{group.title}</h3>
            <p className="note" style={{ margin: "4px 0 0", maxWidth: 560 }}>
              {group.desc}
            </p>
          </div>
          <Pill tone="gold" icon="tune">
            {group.key}
          </Pill>
        </div>

        <div className="seg" role="group" aria-label="Config groups" style={{ marginTop: 14 }}>
          {ADMIN_CONFIG_GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              className={g.id === activeId ? "active" : ""}
              aria-pressed={g.id === activeId}
              onClick={() => setActiveId(g.id)}
            >
              {g.title}
            </button>
          ))}
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="config-table" aria-label="Config settings">
            <thead>
              <tr>
                <th style={{ minWidth: 180 }}>Setting</th>
                <th>Current value</th>
                <th>Default value</th>
                <th>Edit value</th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((row) => {
                // Spend prices are set by the cost + margin formula — never hand-typed.
                const systemSet = row.setting.includes("(spend)");
                return (
                  <tr key={row.setting}>
                    <td>
                      <b>{row.setting}</b>
                      {systemSet ? (
                        <span className="sys-tag" style={{ marginLeft: 6 }}>
                          system-set
                        </span>
                      ) : null}
                    </td>
                    <td className="mono">{row.current}</td>
                    <td className="mono">{row.def}</td>
                    <td>
                      {systemSet ? (
                        <span className="note">Set by formula — not hand-editable</span>
                      ) : (
                        <input className="config-input" defaultValue={row.edit} aria-label={`Change ${row.setting}`} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div
          role="status"
          style={{
            background: "var(--sage)",
            border: "1px solid var(--line)",
            borderRadius: 10,
            padding: "12px 14px",
            marginTop: 16,
            fontSize: 14,
          }}
        >
          <b>
            <Icon name="visibility" /> Preview — impact before you save:
          </b>
          <span>
            {" "}
            Employer month: 2,600 spent → 2,400 left — unchanged · Seeker month: 2,500 free + 850 earned −
            600 spent = 2,750 left — unchanged
          </span>
          <p className="note" style={{ margin: "6px 0 0" }}>
            Preview uses the edited values against last month&apos;s typical activity. Nothing is written until
            you tap Save changes. Saved changes apply forward only — never retroactive.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <button className="btn btn-gold" type="button" style={{ flex: 1, minWidth: 180 }}>
            <Icon name="settings" /> Save changes
          </button>
          <button className="btn btn-ghost" type="button" style={{ flex: 1, minWidth: 180 }}>
            <Icon name="restore" /> Restore defaults
          </button>
        </div>

        <p className="note" style={{ margin: "14px 0 6px" }}>
          <b>
            <Icon name="history" /> Audit Log — who changed what, old → new, when.
          </b>{" "}
          Immutable history; restore also writes a row.
        </p>
        <div>
          {ADMIN_AUDIT_LOG.map((entry) => {
            const sep = /^(changed|restored)/.test(entry.what) ? " " : " — ";
            return (
              <div key={`${entry.date}-${entry.what}`} className="audit-row">
                <span className="mono" style={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                  {entry.date}
                </span>
                <span>
                  <b>{entry.who}</b>
                  {sep}
                  {entry.what}
                </span>
                <span className="mono" style={{ marginLeft: "auto", fontWeight: 700 }}>
                  {entry.change}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="note" style={{ marginTop: 12 }}>
        Every rate, fee, threshold, tier and limit is DB-driven config with defaults — no hard-coded values in
        code. Changes are audited (who / what / old / new / when), versioned (live config v14), previewable,
        restorable to defaults, and never retroactive. Coin spend prices are system-set from measured cost
        backstage: price = (measured cost ÷ $0.001) × (1 + margin), rounded up to the nearest 10 — margin
        default 1% is the one editable lever.
      </p>
    </Ood>
  );
}
