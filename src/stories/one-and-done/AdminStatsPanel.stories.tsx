import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AdminStatsPanel } from '../../components/one-and-done/AdminStatsPanel';

const meta = {
  title: 'OneAndDone/Admin & Money/Business Stats Charts',
  component: AdminStatsPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Used on Screen 5 — the Business Stats health dashboard. Verdict is evaluated danger-first from config thresholds; every stat is computed from the ledger, never hand-typed. All figures shown here are the mockup\'s labelled example/illustrative data, not actuals.',
      },
    },
  },
} satisfies Meta<typeof AdminStatsPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Full dashboard: verdict banner + health strip + all six charts. */
export const VerdictAndHealth: Story = {
  args: { variant: 'overview' },
};

/** The six charts: revenue vs cost, MRR steps, users, activity, coverage gauge, supply/demand. */
export const MrrUsersActivity: Story = {
  args: { variant: 'charts' },
};

/** Supply / demand: 132 seekers need 27 hunts — 12 open, 15 short. */
export const SupplyDemand: Story = {
  args: { variant: 'supply' },
};

/** Stat cards: MRR, coverage, MAU, cost per user, matches, hires, and the rest. */
export const StatCards: Story = {
  args: { variant: 'cards' },
};
