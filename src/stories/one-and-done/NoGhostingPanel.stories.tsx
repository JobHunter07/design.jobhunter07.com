import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { NoGhostingPanel } from '../../components/one-and-done/HuntRewards';

const meta = {
  title: 'OneAndDone/NoGhostingPanel',
  component: NoGhostingPanel,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof NoGhostingPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Clean record: 0 strikes, average reply 3 hours. */
export const CleanRecord: Story = {
  args: {
    strikes: 0,
    avgReply: '3 hrs',
  },
};

/** One strike: reply was late once; two more in 90 days means a 14-day hunting pause. */
export const OneStrike: Story = {
  args: {
    strikes: 1,
    avgReply: '5 hrs',
  },
};
