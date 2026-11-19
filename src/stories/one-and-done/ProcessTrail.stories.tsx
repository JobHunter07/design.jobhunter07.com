import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ProcessTrail } from '../../components/one-and-done/ProcessTrail';

const meta = {
  title: 'OneAndDone/Coins & Hunt Flow/Process Trail + Stage Tracker',
  component: ProcessTrail,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Used on Screens 2 and 3 — the whole hunt, up front. Screen call → HR → Fit → Tech → Offer → Onboarding, with day offsets and who runs each stage. The seeker sees the full trail before revealing, so they know whether the hunt is a wild goose chase or straight to the hunt.',
      },
    },
  },
} satisfies Meta<typeof ProcessTrail>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Stage tracker — Optumserve: 6 stages, 18 days to offer, Screen call is current. */
export const StageTrackerScreen3: Story = {
  args: { variant: 'tracker' },
};

/** Process intake — Screen 2. Every stage declared before the Need goes live. */
export const IntakeListScreen2: Story = {
  args: { variant: 'intake' },
};
