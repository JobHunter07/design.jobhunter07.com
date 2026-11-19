import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { HireRewardPanel } from '../../components/one-and-done/HuntRewards';

const meta = {
  title: 'OneAndDone/HireRewardPanel',
  component: HireRewardPanel,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof HireRewardPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Coin rebate on a seeker-confirmed hire only: fee back plus a time bonus on total hunt spend. */
export const Default: Story = {};
