import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AvailabilityPanel } from '../../components/one-and-done/AvailabilityPanel';

const meta = {
  title: 'OneAndDone/Coins & Hunt Flow/Availability Panels',
  component: AvailabilityPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Used on Screens 1, 2 and 3 — both sides\' availability windows, side by side, with the overlap. Availability is a hard gate and a scheduling input only: it earns no score points. Booking offers only slots inside BOTH windows and both capacities.',
      },
    },
  },
} satisfies Meta<typeof AvailabilityPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Seeker panel — Mon–Fri 9am–12pm ET, available Dec 7, 2026, max 3 first calls/week. */
export const SeekerPanel: Story = {
  args: { variant: 'seeker' },
};

/** Employer panel — Mon–Fri 9am–5pm CT, 4 slots/week, 5-day decision, Dan covers for Emily. */
export const EmployerPanel: Story = {
  args: { variant: 'employer' },
};

/** Overlap + booking — Mon–Fri 10am–12pm ET, slots inside both windows only. */
export const OverlapAndBooking: Story = {
  args: { variant: 'overlap' },
};
