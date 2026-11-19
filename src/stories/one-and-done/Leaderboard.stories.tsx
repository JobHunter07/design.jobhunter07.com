import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Leaderboard } from '../../components/one-and-done/Leaderboard';
import { LEADERBOARD_EMPLOYERS, LEADERBOARD_SEEKERS } from '../../components/one-and-done/data';

const meta = {
  title: 'OneAndDone/Leaderboard',
  component: Leaderboard,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Leaderboard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** November season, both boards, ranked by value added — never by messages or Fit Score. */
export const Default: Story = {
  args: {
    seekers: [...LEADERBOARD_SEEKERS],
    employers: [...LEADERBOARD_EMPLOYERS],
    season: 'November season',
  },
};

/** The seeker chose "Hide me" — their row dims and earns no season rewards while hidden. */
export const HiddenMe: Story = {
  args: {
    seekers: [...LEADERBOARD_SEEKERS],
    employers: [...LEADERBOARD_EMPLOYERS],
    season: 'November season',
    hidden: true,
  },
};
