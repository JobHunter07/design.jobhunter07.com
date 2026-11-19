import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { HireRewardPanel, NoGhostingPanel } from '../../components/one-and-done/HuntRewards';

const meta = {
  title: 'OneAndDone/Community & Rewards/Hire Reward + No Ghosting',
  component: HireRewardPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Used on Screen 4 — the Hire Reward (a coin rebate on a seeker-confirmed hire only: fee back plus a time bonus on total hunt spend) and No Ghosting (fast action rewarded, silence punished, both sides the same rules).',
      },
    },
  },
} satisfies Meta<typeof HireRewardPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Coin rebate on a seeker-confirmed hire only: fee back plus a time bonus on total hunt spend. */
export const HireReward: Story = {};

/** Clean record: 0 strikes, average reply 3 hours. */
export const NoGhostingClean: Story = {
  render: () => <NoGhostingPanel strikes={0} avgReply="3 hrs" />,
};

/** One strike: reply was late once; two more in 90 days means a 14-day hunting pause. */
export const NoGhostingOneStrike: Story = {
  render: () => <NoGhostingPanel strikes={1} avgReply="5 hrs" />,
};
