import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TotalCompPanel } from '../../components/one-and-done/TotalCompPanel';

const meta = {
  title: 'OneAndDone/Coins & Hunt Flow/Total-Comp Panel',
  component: TotalCompPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Used on Screen 3 — cash rate vs total compensation. The pay gate judges total comp, not the cash rate alone: cash + PTO value + insurance replacement (the seeker\'s own $9,519/yr) + 401k + bonus. A benefit not stated is valued at $0, never guessed.',
      },
    },
  },
} satisfies Meta<typeof TotalCompPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Hunt 1 ($50/hr + 10 PTO + insurance = $109,519/yr) beats Hunt 2 ($60/hr + 1 PTO, no insurance = $106,161/yr). */
export const Hunt1VsHunt2: Story = {};
