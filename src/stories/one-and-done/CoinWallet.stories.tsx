import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CoinWallet } from '../../components/one-and-done/CoinWallet';
import { EMPLOYER_LEDGER, SEEKER_LEDGER } from '../../components/one-and-done/data';

const meta = {
  title: 'OneAndDone/CoinWallet',
  component: CoinWallet,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CoinWallet>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Seeker wallet: 3,300 coins (2,500 free + 800 earned). Coins roll over, never expire. */
export const Seeker: Story = {
  args: {
    side: 'seeker',
    balance: 3300,
    freeCoins: 2500,
    earnedCoins: 800,
    ledger: [...SEEKER_LEDGER],
  },
};

/** Employer wallet: 4,000 coins ($5 = 5,000 bought, −1,000 access on the 1st). */
export const Employer: Story = {
  args: {
    side: 'employer',
    balance: 4000,
    ledger: [...EMPLOYER_LEDGER],
  },
};

/** Employer wallet after posting: 3,500 coins, Hire Reward +570 on a day-18 hire. */
export const EmployerAfterPost: Story = {
  args: {
    side: 'employer',
    balance: 3500,
    ledger: [
      ...EMPLOYER_LEDGER,
      { label: 'Hire reward — day 18', coins: 570 },
    ],
  },
};

/** Empty wallet (0 coins) — the ONLY place top-up and Seeker Plus appear. */
export const EmptySeeker: Story = {
  args: {
    side: 'seeker',
    balance: 0,
    freeCoins: 0,
    earnedCoins: 0,
    ledger: [],
    empty: true,
  },
};
