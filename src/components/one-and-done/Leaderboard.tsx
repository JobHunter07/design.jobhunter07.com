import React from "react";

import { LEADERBOARD_EMPLOYERS, LEADERBOARD_SEEKERS } from "./data";
import { Icon, Ood, Pill } from "./shared";

export interface LeaderboardRow {
  rank: number;
  name: string;
  hunts: number;
  coins: number;
  response: string;
  hires: number;
  streak: string;
}

export type LeaderboardVariant = "both" | "seekers" | "employers";

export interface LeaderboardProps {
  variant?: LeaderboardVariant;
}

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <>
        <span className="material-symbols-rounded rank-gold" aria-hidden="true">
          emoji_events
        </span>
        <b>1</b>
      </>
    );
  }
  if (rank === 2 || rank === 3) {
    return (
      <>
        <span
          className={`material-symbols-rounded ${rank === 2 ? "rank-silver" : "rank-bronze"}`}
          aria-hidden="true"
        >
          military_tech
        </span>
        <b>{rank}</b>
      </>
    );
  }
  return <b style={{ marginLeft: 6 }}>{rank}</b>;
}

function Board({
  board,
  title,
  icon,
  sub,
  hiresLabel,
  rows,
  footNote,
}: {
  board: "seekers" | "employers";
  title: string;
  icon: string;
  sub: string;
  hiresLabel: string;
  rows: readonly LeaderboardRow[];
  footNote: React.ReactNode;
}) {
  const isSeeker = board === "seekers";
  return (
    <div className="leader-board" data-board={board} aria-label={`${title} leaderboard — example`}>
      <div className={`leader-board-head ${isSeeker ? "seeker" : "employer"}`}>
        <div>
          <h4>
            <Icon name={icon} /> {title}
          </h4>
          <span className="sub">{sub}</span>
        </div>
        <Pill tone="gold" icon="calendar_month">
          This season
        </Pill>
      </div>
      <div className="leader-cols" aria-hidden="true">
        <span>Rank</span>
        <span>Hunter</span>
        <span>Hunts</span>
        <span>Coins earned</span>
        <span>Avg reply</span>
        <span>{hiresLabel}</span>
        <span>Streak</span>
      </div>
      {rows.map((row) => {
        const isYou = row.name.startsWith("Brian D.");
        return (
          <div key={row.name} className={`leader-row${row.rank === 1 ? " top1" : ""}${isYou ? " you-row" : ""}`}>
            <span className="rank">
              <RankIcon rank={row.rank} />
            </span>
            <span className="lname">
              {isYou ? (
                <>
                  Brian D.{" "}
                  <Pill tone="gold" icon="star">
                    You · example
                  </Pill>
                  <small>Example seeker — your row</small>
                </>
              ) : (
                <>
                  {row.name}
                  <small>Example {isSeeker ? "seeker" : "employer"}</small>
                </>
              )}
            </span>
            <span className="leader-stats">
              <span className="num">
                <small>Hunts </small>
                {row.hunts}
              </span>
              <span className="num">
                <small>Coins </small>
                {row.coins.toLocaleString()}
              </span>
              <span className="num">
                <small>Reply </small>
                {row.response}
              </span>
              <span className="num">
                <small>Hires </small>
                {row.hires}
              </span>
            </span>
            <span className="num streak-cell">{row.streak}</span>
          </div>
        );
      })}
      <p className="note" style={{ padding: "10px 14px", margin: 0, borderTop: "1px solid var(--line)" }}>
        {footNote}
      </p>
    </div>
  );
}

/**
 * Leaderboard — Top Seekers and Top Employers, side by side, exactly as
 * in the Storybook Preview artifact. Ranked by value added (hunts
 * completed, coins earned, response time, hires, streak). Never ranked
 * by messages sent, cards revealed, or Fit Score. Boards reset monthly;
 * a ghosting strike removes a hunter for 14 days. Top 3 per board earn
 * 500 / 300 / 200 coins at season close (proposal).
 */
export function Leaderboard({ variant = "both" }: LeaderboardProps) {
  return (
    <Ood>
      <div className="leader-grid">
        {variant !== "employers" ? (
          <Board
            board="seekers"
            title="Top Seekers"
            icon="travel_explore"
            sub="Hunting roles · Example names, illustrative figures"
            hiresLabel="Hires conf."
            rows={LEADERBOARD_SEEKERS}
            footNote={
              <>
                Seeker “Hires” = <b>hires confirmed</b> by the seeker. Coins earned counts earn-back only —
                free monthly coins don&apos;t rank you.
              </>
            }
          />
        ) : null}
        {variant !== "seekers" ? (
          <Board
            board="employers"
            title="Top Employers"
            icon="crisis_alert"
            sub="Hunting talent · Example names, illustrative figures"
            hiresLabel="Hires made"
            rows={LEADERBOARD_EMPLOYERS}
            footNote={
              <>
                Employer “Hires” = <b>hires made</b> and confirmed by the seeker. Coins earned counts Hire
                Rewards and earn-back — coins bought don&apos;t rank you.
              </>
            }
          />
        ) : null}
      </div>
      <p className="note" style={{ marginTop: 12 }}>
        Use the variant control to isolate one board. The “You” row is outlined in gold dashes; hiding
        yourself is instant and reversible, and never affects hunts or coins. Ranked by value added — never by
        messages, cards revealed, or Fit Score. A ghosting strike removes you for 14 days. Season rewards
        (proposal): 1st 500 · 2nd 300 · 3rd 200 coins.
      </p>
    </Ood>
  );
}
