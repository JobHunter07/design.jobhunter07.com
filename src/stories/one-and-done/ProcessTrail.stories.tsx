import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ProcessTrail } from '../../components/one-and-done/ProcessTrail';
import { PROCESS_STAGES } from '../../components/one-and-done/data';

const meta = {
  title: 'OneAndDone/ProcessTrail',
  component: ProcessTrail,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ProcessTrail>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Optumserve: 6 stages, 18 days to offer, no unpaid take-home — straight to the hunt. */
export const Optumserve: Story = {
  args: {
    stages: [...PROCESS_STAGES],
    currentStage: 0,
    totalDaysToOffer: 18,
    verdict: 'Straight to the hunt — 6 stages, 18 days to offer, no unpaid take-home.',
  },
};

/** Mid-hunt: the Tech interview is the current stage. */
export const MidHunt: Story = {
  args: {
    stages: [...PROCESS_STAGES],
    currentStage: 3,
    totalDaysToOffer: 18,
    verdict: 'Straight to the hunt — 6 stages, 18 days to offer, no unpaid take-home.',
  },
};

/** A long trail: 6 stages over 35 days, against the seeker's 21-day limit. */
export const LongTrail: Story = {
  args: {
    stages: [
      { name: 'Screen call', owner: 'Recruiter', format: 'Phone · 30 min', dayOffset: 0, dayLabel: 'Day 0' },
      { name: 'HR interview', owner: 'HR partner', format: 'Video · 45 min', dayOffset: 4, dayLabel: 'Day 4' },
      { name: 'Fit interview', owner: 'Hiring manager', format: 'Video · 45 min', dayOffset: 6, dayLabel: 'Day 10' },
      { name: 'Take-home', owner: 'Senior engineers', format: 'Unpaid · 4 hrs expected', dayOffset: 7, dayLabel: 'Day 17' },
      { name: 'Tech interview', owner: 'Senior engineers ×2', format: 'Video · 90 min', dayOffset: 6, dayLabel: 'Day 23' },
      { name: 'Panel', owner: 'Team + manager', format: 'Video · 2 hrs', dayOffset: 5, dayLabel: 'Day 28' },
      { name: 'Final', owner: 'Director', format: 'Video · 60 min', dayOffset: 4, dayLabel: 'Day 32' },
      { name: 'Offer', owner: 'Hiring manager + HR', format: 'Written offer', dayOffset: 3, dayLabel: 'Day 35' },
      { name: 'Onboarding', owner: 'Team lead', format: 'After acceptance', dayOffset: null, dayLabel: 'After offer' },
    ],
    currentStage: 0,
    totalDaysToOffer: 35,
    verdict: 'Wild goose chase — 9 stages, 35 days to offer, unpaid take-home. Scores low on timing.',
  },
};
