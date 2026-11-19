import React from "react";

import { CardShell, Icon, Muted, SectionTitle } from "./shared";

export interface LedgerLine {
  label: string;
  coins: number;
}

export interface CoinWalletProps {
  side: "seeker" | "employer";
  balance: number;
  freeCoins?: number;
  earnedCoins?: number;
  ledger: LedgerLine[];
  /** Shown when the balance is 0 — the only place top-up / Seeker Plus appear. */
  empty?: boolean;
}

function formatCoins(coins: number): string {
  return `${coins > 0 ? "+" : ""}${coins.toLocaleString()} coins`;
}

/**
 * Coin Wallet — balance + ledger. $5 = 5,000 coins, 1 coin = $0.001.
 * Coins roll over and never expire, never buy a score, a gate, or a
 * match, and can't be cashed out. Top-up and Seeker Plus appear ONLY
 * in the 0-coin empty-wallet state, never as a paywall.
 */
export function CoinWallet({ side, balance, freeCoins, earnedCoins, ledger, empty = false }: CoinWalletProps) {
  return (
    <CardShell labelledBy={`coin-wallet-${side}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <SectionTitle id={`coin-wallet-${side}`}>{side === "seeker" ? "Seeker wallet" : "Employer wallet"}</SectionTitle>
          <p className="mt-1 text-3xl font-bold" style={{ color: "var(--jh-text)" }}>
            {balance.toLocaleString()} <span className="text-base font-semibold">coins</span>
          </p>
          {side === "seeker" ? (
            <Muted>
              {freeCoins !== undefined ? `${freeCoins.toLocaleString()} free` : "2,500 free"} every month
              {earnedCoins !== undefined ? ` + ${earnedCoins.toLocaleString()} earned` : ""} · Coins roll over, never
              expire · No fee, no access fee
            </Muted>
          ) : (
            <Muted>$5 = 5,000 coins · 1,000-coin access fee on the 1st of the month</Muted>
          )}
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{ backgroundColor: "#E6F4E6", color: "#2E7D32" }}
        >
          <Icon name="savings" size={14} /> Rollover · never expires
        </span>
      </div>

      <ul className="mt-4 grid gap-1.5" aria-label="Coin ledger">
        {ledger.map((line) => (
          <li key={line.label} className="flex items-center justify-between gap-2 text-sm">
            <span style={{ color: "var(--jh-text)" }}>{line.label}</span>
            <span className="font-mono font-semibold" style={{ color: line.coins >= 0 ? "#2E7D32" : "#B3261E" }}>
              {formatCoins(line.coins)}
            </span>
          </li>
        ))}
      </ul>

      {empty ? (
        <div className="mt-4 rounded-xl p-4 ring-1" style={{ borderColor: "var(--jh-border)" }}>
          <p className="text-sm font-bold" style={{ color: "var(--jh-text)" }}>
            You&apos;re at 0 coins — three ways back in:
          </p>
          <ol className="mt-2 grid gap-1.5 text-sm" style={{ color: "var(--jh-text)" }}>
            <li><strong>A. Earn more — free.</strong> Profile +500 · verify a skill +250 · hunt +200 · check-in +100.</li>
            <li><strong>B. One-time top-up $5 = 5,000 coins.</strong></li>
            <li><strong>C. Seeker Plus $5/mo = +5,000 coins/month extra</strong> (7,500/mo before earnings), cancel anytime.</li>
          </ol>
        </div>
      ) : (
        <Muted>Coins never buy a score, a gate, or a match, and they can&apos;t be cashed out.</Muted>
      )}
    </CardShell>
  );
}
