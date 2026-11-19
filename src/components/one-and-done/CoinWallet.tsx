import React from "react";

import { EMPLOYER_WALLET, SEEKER_WALLET } from "./data";
import { Icon, Ood, Pill } from "./shared";

export type CoinWalletVariant = "seeker" | "employer" | "empty";

export interface CoinWalletProps {
  variant?: CoinWalletVariant;
}

/**
 * Coin Wallet — balance + ledger, exactly as in the Storybook Preview
 * artifact. $5 = 5,000 coins, 1 coin = $0.001. Coins roll over and never
 * expire, never buy a score, a gate, or a match, and can't be cashed
 * out. Top-up and Seeker Plus appear ONLY in the 0-coin empty-wallet
 * state, never as a paywall.
 */
export function CoinWallet({ variant = "seeker" }: CoinWalletProps) {
  if (variant === "empty") {
    return (
      <Ood>
        <div className="card" style={{ maxWidth: 900, margin: "0 auto", border: "2px dashed var(--gold)" }}>
          <div className="kicker" style={{ color: "var(--earth)" }}>
            State preview · Empty wallet · Seeker balance = 0 coins
          </div>
          <h3 style={{ marginTop: 4 }}>
            <Icon name="savings" /> When a seeker runs out — three choices, in order, side by side
          </h3>
          <p className="note" style={{ margin: "4px 0 0" }}>
            In the live product this panel <b>only</b> appears at exactly 0 coins. While a seeker has any
            coins, no cash price, no top-up, and no subscription is shown on any seeker screen — Seeker Plus
            is opt-in only and lives only on this empty-wallet state, never as a paywall.
          </p>
          <div className="empty-choices">
            <div className="empty-choice earn-choice">
              <h4 style={{ color: "var(--green)" }}>
                <Icon name="trending_up" /> A · Earn more coins — free path
              </h4>
              <p style={{ fontSize: 14, margin: 0 }}>
                Complete a profile (+500), verify a skill (+250), finish a hunt (+200), or check in (+100).
                No card needed, ever.
              </p>
              <Pill tone="green" icon="check_circle">
                Recommended · $0
              </Pill>
            </div>
            <div className="empty-choice">
              <h4>
                <Icon name="monetization_on" /> B · One-time top-up — fast path
              </h4>
              <p style={{ fontSize: 14, margin: 0 }}>
                One-time top-up — $5 = 5,000 coins. One-off, no monthly fee, no access fee. Paying is the
                fast path — earning is the free path.
              </p>
              <Pill tone="gold" icon="flag">
                Only shown at 0 coins
              </Pill>
            </div>
            <div className="empty-choice" style={{ borderColor: "var(--gold)", background: "var(--goldbg)" }}>
              <h4>
                <Icon name="workspace_premium" /> C · Seeker Plus — heavy hunters
              </h4>
              <p style={{ fontSize: 14, margin: 0 }}>
                Seeker Plus — $5/mo = +5,000 coins every month, on top of the 2,500 free (7,500/mo before
                earnings). The subscription for heavy hunters. Cancel anytime.
              </p>
              <Pill tone="gold" icon="flag">
                Opt-in only · Only at 0 coins · Cancel anytime
              </Pill>
            </div>
          </div>
        </div>
        <p className="note" style={{ marginTop: 12 }}>
          The empty-wallet state from Screens 1 and 4 — shown only at exactly 0 coins, with the free path
          first. Neither paying path ever buys a gate pass.
        </p>
      </Ood>
    );
  }

  const isSeeker = variant === "seeker";
  const wallet = isSeeker ? SEEKER_WALLET : EMPLOYER_WALLET;

  return (
    <Ood>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="wallet-bar" aria-label={isSeeker ? "Seeker coin wallet" : "Employer coin wallet"}>
          <div className="wallet-left">
            <div className="wallet-icon">
              <Icon name="monetization_on" />
            </div>
            <div>
              <div className="wallet-label">
                <Icon name="savings" />{" "}
                {isSeeker
                  ? "Seeker wallet · Free monthly coins + earned coins"
                  : "Employer coin wallet — employers pay, seekers don't"}
              </div>
              <div className="wallet-bal">{wallet.balance.toLocaleString()} coins</div>
              <div className="ledger-note">
                {isSeeker
                  ? "+2,500 free coins every month · Coins roll over, never expire · No monthly fee · No access fee · No payment taken"
                  : "$5 = 5,000 coins bought · −1,000 access on the 1st · Employer only — no seeker is ever charged this · Coins roll over, never expire"}
              </div>
            </div>
          </div>
          {isSeeker ? (
            <span className="free-badge">
              <Icon name="check_circle" /> FREE — 2,500/MO + EARN
            </span>
          ) : null}
          <button className="ledger-toggle" type="button">
            <Icon name="receipt_long" /> Ledger
          </button>
        </div>
        <div className="ledger">
          {wallet.lines.map((line) => {
            const isHireReward = line.label.startsWith("+570");
            const [head, tail] = isHireReward ? line.label.split(" — ") : [line.label, null];
            return (
              <div key={line.label} className="ledger-line">
                <span>
                  <Icon name={line.icon} /> {head}
                  {isHireReward ? (
                    <>
                      {" "}
                      <Pill tone="green" icon="check_circle">
                        Example
                      </Pill>{" "}
                      — {tail}
                    </>
                  ) : null}
                </span>
                <span className={`amt ${"kind" in line ? line.kind : line.coins >= 0 ? "earn" : "spend"}`}>
                  {line.coins > 0 ? "+" : ""}
                  {line.coins.toLocaleString()}
                </span>
              </div>
            );
          })}
          <div className="ledger-line">
            <span>
              <b>{isSeeker ? "Balance — 2,500 free + 800 earned" : "Employer balance"}</b>
            </span>
            <span className="amt">{wallet.balance.toLocaleString()} coins</span>
          </div>
          <p className="ledger-note" style={{ margin: "8px 0 4px" }}>
            {isSeeker ? (
              <>
                <b>+2,500 free coins every month</b> for every seeker, on top of anything you earn. Unspent
                coins <b>roll over and never expire</b> — 3,300 coins roll into next month, then next
                month&apos;s +2,500 free lands on top: 5,800 to start, before any earning. There is no fee in
                this wallet, ever. Coins never buy a score, a gate, or a match, and they can&apos;t be cashed
                out.
              </>
            ) : (
              <>
                This purchase and access fee are <b>employer-only</b>. Employer coins also{" "}
                <b>roll over and never expire</b>. Posting a Need costs 500 coins → 3,500 left after posting,
                still yours next month. Posting costs coins because it costs us: database writes, matching
                runs, and notifications. 1 coin = $0.001, so $5.00 = 5,000 coins.
              </>
            )}
          </p>
        </div>
      </div>
      <p className="note" style={{ marginTop: 12 }}>
        {isSeeker
          ? "The seeker balance after locking the range on Screen 1: 2,500 free + 800 earned (profile +500, hunt +200, check-in +100) = 3,300. Spend lines appear when value is taken out — Plaid run 300 · reveal 200 · counter / book a call 100."
          : "Employer wallet on Screen 2 before posting: 5,000 bought − 1,000 access fee = 4,000. Spend prices are system-set from measured cost: Post a Need 500 · Plaid run 300 · reveal 200 · COLA run 100."}
      </p>
    </Ood>
  );
}
