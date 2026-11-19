import React from "react";

import { CardShell, Icon, Muted, SectionTitle } from "./shared";

export interface LeaderboardRow {
  rank: number;
  name: string;
  hunts: number;
  coins: number;
  response: string;
  hires: number;
  streak: string;
}

export interface LeaderboardProps {
  seekers: LeaderboardRow[];
  employers: LeaderboardRow[];
  season?: string;
  hidden?: boolean;
  onToggleHidden?: () => void;
}

function Board({ title, rows, hidden }: { title: string; rows: LeaderboardRow[]; hidden: boolean }) {
  return (
    <div className="rounded-xl p-4 ring-1" style={{ borderColor: "var(--jh-border)", opacity: hidden ? 0.45 : 1 }}>
      <h4 className="flex items-center gap-2 text-base font-bold" style={{ color: "var(--jh-text)" }}>
        <Icon name="emoji_events" size={18} /> {title}
      </h4>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr className="text-left" style={{ color: "var(--jh-muted-text)" }}>
              <th scope="col" className="pb-2 pr-2 font-semibold">#</th>
              <th scope="col" className="pb-2 pr-2 font-semibold">Hunter</th>
              <th scope="col" className="pb-2 pr-2 font-semibold">Hunts</th>
              <th scope="col" className="pb-2 pr-2 font-semibold">Coins earned</th>
              <th scope="col" className="pb-2 pr-2 font-semibold">Avg response</th>
              <th scope="col" className="pb-2 pr-2 font-semibold">Hires</th>
              <th scope="col" className="pb-2 font-semibold">Streak</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t" style={{ borderColor: "var(--jh-border)" }}>
                <td className="py-2 pr-2 font-bold" style={{ color: "var(--jh-text)" }}>{row.rank}</td>
                <td className="py-2 pr-2 font-semibold" style={{ color: "var(--jh-text)" }}>{row.name}</td>
                <td className="py-2 pr-2" style={{ color: "var(--jh-text)" }}>{row.hunts}</td>
                <td className="py-2 pr-2 font-mono" style={{ color: "var(--jh-text)" }}>{row.coins.toLocaleString()}</td>
                <td className="py-2 pr-2" style={{ color: "var(--jh-text)" }}>{row.response}</td>
                <td className="py-2 pr-2" style={{ color: "var(--jh-text)" }}>{row.hires}</td>
                <td className="py-2" style={{ color: "var(--jh-text)" }}>{row.streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Leaderboard — Top Seekers and Top Employers, side by side, ranked by
 * value added (hunts completed, coins earned, response time, hires,
 * streak). Never ranked by messages sent, cards revealed, or Fit Score.
 * Boards reset monthly; a ghosting strike removes a hunter for 14 days.
 * Top 3 per board earn 500 / 300 / 200 coins at season close (proposal).
 */
export function Leaderboard({ seekers, employers, season = "November season", hidden = false, onToggleHidden }: LeaderboardProps) {
  return (
    <CardShell labelledBy="leaderboard-title">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <SectionTitle id="leaderboard-title">Leaderboard</SectionTitle>
        <span className="text-sm" style={{ color: "var(--jh-muted-text)" }}>
          {season} · Resets monthly on the 1st · Season rewards (proposal): 1st 500 · 2nd 300 · 3rd 200 coins
        </span>
      </div>
      <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold" style={{ color: "var(--jh-text)" }}>
        <input type="checkbox" checked={hidden} onChange={onToggleHidden} className="h-4 w-4 accent-[#4E6D4F]" />
        Hide me from the boards
      </label>
      {hidden ? <Muted>You are hidden — your row is dimmed and you earn no season rewards while hidden.</Muted> : null}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Board title="Top Seekers" rows={seekers} hidden={hidden} />
        <Board title="Top Employers" rows={employers} hidden={hidden} />
      </div>
      <Muted>Ranked by value added — never by messages, cards revealed, or Fit Score. A ghosting strike removes you for 14 days.</Muted>
    </CardShell>
  );
}
