import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AvailabilityPanel } from '../../components/one-and-done/AvailabilityPanel';
import { EMPLOYER_AVAILABILITY, OVERLAP, SEEKER_AVAILABILITY } from '../../components/one-and-done/data';

const meta = {
  title: 'OneAndDone/AvailabilityPanel',
  component: AvailabilityPanel,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof AvailabilityPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Optumserve pair: seeker Mon–Fri 9am–12pm ET, employer Mon–Fri 9am–5pm CT — overlap 10am–12pm ET. */
export const Default: Story = {
  args: {
    seekerWindows: SEEKER_AVAILABILITY.windows,
    seekerAvailableFrom: SEEKER_AVAILABILITY.availableFrom,
    seekerNotice: SEEKER_AVAILABILITY.notice,
    seekerMaxCalls: SEEKER_AVAILABILITY.maxCallsPerWeek,
    seekerCheckedIn: SEEKER_AVAILABILITY.checkedIn,
    employerWindows: EMPLOYER_AVAILABILITY.windows,
    employerWindowsEt: EMPLOYER_AVAILABILITY.windowsEt,
    employerSlots: EMPLOYER_AVAILABILITY.slotsPerWeek,
    employerDecision: EMPLOYER_AVAILABILITY.decisionTimeline,
    employerCover: EMPLOYER_AVAILABILITY.cover,
    overlap: OVERLAP,
  },
};

/** Tight overlap: only one shared hour a week. */
export const TightOverlap: Story = {
  args: {
    seekerWindows: 'Mon–Wed · 9am–10am ET',
    seekerAvailableFrom: 'Mon, Dec 14, 2026',
    seekerNotice: '1 week',
    seekerMaxCalls: 2,
    seekerCheckedIn: 'Live — checked in 1 day ago',
    employerWindows: 'Tue–Thu · 2pm–4pm PT',
    employerWindowsEt: '5pm–7pm ET',
    employerSlots: 2,
    employerDecision: '7 business days after the final call',
    employerCover: 'Hiring manager covers all slots',
    overlap: 'Tue–Wed 5pm–6pm ET — 2 hours a week',
  },
};
