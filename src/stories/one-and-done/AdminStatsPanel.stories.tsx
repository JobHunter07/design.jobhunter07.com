import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AdminStatsPanel } from '../../components/one-and-done/AdminStatsPanel';

const meta = {
  title: 'OneAndDone/AdminStatsPanel',
  component: AdminStatsPanel,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof AdminStatsPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Example / illustrative data: "In good shape" — coverage 1.04 vs target 1.01, MRR $5.00. */
export const Default: Story = {
  args: {},
};

/** Watch it: coverage at the 1.01 line, supply short 15 hunts. */
export const WatchIt: Story = {
  args: {
    verdict: 'watch',
    coverage: 1.01,
  },
};

/** Under water: costs exceed revenue. */
export const UnderWater: Story = {
  args: {
    verdict: 'underwater',
    coverage: 0.92,
    mrr: 5,
    monthlyCost: 1247,
  },
};
