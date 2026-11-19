import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Leaderboard } from '../../components/one-and-done/Leaderboard';

const meta = {
  title: 'OneAndDone/Community & Rewards/Leaderboard',
  component: Leaderboard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Used on Screen 4 — Top Seekers and Top Employers, side by side, ranked by value added (hunts completed, coins earned, response time, hires, streak). Never ranked by messages sent, cards revealed, or Fit Score. Boards reset monthly; a ghosting strike removes a hunter for 14 days. Top 3 per board earn 500 / 300 / 200 coins at season close (proposal).',
      },
    },
  },
} satisfies Meta<typeof Leaderboard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** November season, both boards, ranked by value added — never by messages or Fit Score. */
export const BothBoards: Story = {
  args: { variant: 'both' },
};

/** Seekers only. */
export const SeekersOnly: Story = {
  args: { variant: 'seekers' },
};

/** Employers only. */
export const EmployersOnly: Story = {
  args: { variant: 'employers' },
};
