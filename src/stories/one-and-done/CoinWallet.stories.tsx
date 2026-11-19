import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CoinWallet } from '../../components/one-and-done/CoinWallet';

const meta = {
  title: 'OneAndDone/Coins & Hunt Flow/Coin Wallet + Ledger',
  component: CoinWallet,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Used on Screens 1, 2 and 4 — the coin wallet. $5 = 5,000 coins, 1 coin = $0.001. Coins roll over and never expire, never buy a score, a gate, or a match, and can\'t be cashed out. Top-up and Seeker Plus appear ONLY in the 0-coin empty-wallet state, never as a paywall.',
      },
    },
  },
} satisfies Meta<typeof CoinWallet>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Seeker wallet: 3,300 coins (2,500 free + 800 earned). Coins roll over, never expire. */
export const Seeker3300: Story = {
  args: { variant: 'seeker' },
};

/** Employer wallet: 4,000 coins ($5 = 5,000 bought, −1,000 access on the 1st, +570 Hire Reward day 18). */
export const Employer4000: Story = {
  args: { variant: 'employer' },
};

/** Empty wallet (0 coins) — the ONLY place top-up and Seeker Plus appear. */
export const EmptyWallet: Story = {
  args: { variant: 'empty' },
};
