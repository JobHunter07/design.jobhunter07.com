import React from "react";

import { Icon, Ood, Pill } from "./shared";

const CONTAINER: React.CSSProperties = {
  maxWidth: 820,
  margin: "0 auto",
  border: "2px solid var(--gold)",
  borderRadius: 12,
  padding: 16,
  background: "var(--card)",
  textAlign: "left",
};

const HEAD_ROW: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "flex-start",
};

const HEAD_H4: React.CSSProperties = {
  margin: 0,
  fontSize: 13,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: "var(--muted)",
};

/**
 * Total Comp Panel — cash rate vs total compensation, exactly as in the
 * Storybook Preview artifact. The pay gate judges total comp, not the
 * cash rate alone: cash + PTO value + insurance replacement (the
 * seeker's own $9,519/yr) + 401k + bonus. A benefit not stated is
 * valued at $0, never guessed.
 */
export function TotalCompPanel() {
  return (
    <Ood>
      <div style={CONTAINER}>
        <div style={HEAD_ROW}>
          <h4 style={HEAD_H4}>
            <Icon name="calculate" /> Total comp — cash rate is not the whole pay
          </h4>
          <Pill tone="gold" icon="redeem">
            Benefits counted in
          </Pill>
        </div>
        <p style={{ fontSize: 14, margin: "8px 0 0" }}>
          Benefits declared at intake are converted to dollars and judged as pay. Same maths on every card:{" "}
          <b>1,920 billable hrs/yr</b> · PTO at 8 hrs × rate · insurance at your real <b>$9,519/yr</b> health
          + dental cost — added when the employer pays it, subtracted when you&apos;d pay it alone. So which
          hunt actually pays more?
        </p>
        <div style={{ overflowX: "auto" }}>
          <table className="comp-table" aria-label="Worked comparison — Hunt 1 versus Hunt 2 total comp">
            <thead>
              <tr>
                <th>Line</th>
                <th>Hunt 1 — $50/hr + benefits</th>
                <th>Hunt 2 — $60/hr, thin benefits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Base cash (1,920 hrs)</td>
                <td className="num">$50 × 1,920 = $96,000</td>
                <td className="num">$60 × 1,920 = $115,200</td>
              </tr>
              <tr>
                <td>Paid PTO</td>
                <td className="num">10 days × 8 × $50 = +$4,000</td>
                <td className="num">1 day × 8 × $60 = +$480</td>
              </tr>
              <tr>
                <td>Health / dental / vision</td>
                <td className="num">Employer-paid = +$9,519</td>
                <td className="num">None — you pay = −$9,519</td>
              </tr>
              <tr className="winner">
                <td>
                  <b>Total comp / yr</b>
                </td>
                <td className="num">
                  <b>$109,519/yr</b>
                </td>
                <td className="num">$106,161/yr</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="proc-verdict straight" style={{ marginTop: 12 }}>
          <b>
            <Icon name="emoji_events" /> Hunt 1 wins by $3,358/yr
          </b>{" "}
          — the $50/hr hunt with 10 PTO days and insurance beats the $60/hr hunt with 1 PTO day and no
          insurance, once benefits are counted as pay. On cash alone Hunt 2 looks $19,200 ahead; on total
          comp it&apos;s behind. That&apos;s why the pay gate reads total comp, not the headline rate.
        </div>
        <p className="note" style={{ margin: "10px 0 0" }}>
          An unstated benefit counts as $0. On the Optumserve card the gate still fails on the cash floor;
          total comp is shown alongside it so a strong benefits package can be countered on honestly — never
          used to quietly paper over a below-floor rate. Both hunts in this example still sit below the
          $133,367/yr salary floor.
        </p>
      </div>
      <p className="note" style={{ marginTop: 12 }}>
        The pay gate judges total compensation — cash + PTO value + insurance replacement from the
        seeker&apos;s own Rate Calculator + 401k match + bonus — because that&apos;s the number a hunter
        actually lives on.
      </p>
    </Ood>
  );
}
