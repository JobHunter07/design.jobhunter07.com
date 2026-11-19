import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { HuntCard } from '../../components/one-and-done/HuntCard';

const meta = {
  title: 'OneAndDone/Cards/Hunt Card',
  component: HuntCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Used on Screen 7 — the Hunts board listing card. Shows just enough on the face to take it or leave it; the full read stays sealed until reveal (200 coins). Walking away and saving are always free. Both sides: seeker hunts roles, employer hunts talent.',
      },
    },
  },
} satisfies Meta<typeof HuntCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Seeker view — HealthBridge, $72–$78/hr, Fit 86, excellent, card sent. */
export const SeekerAllGatesPass: Story = {
  args: { variant: 'seeker-pass' },
};

/** Seeker view — Optumserve as a tolerance card: 6.4% below the floor, inside 10% tolerance. */
export const SeekerTolerance: Story = {
  args: { variant: 'seeker-tolerance' },
};

/** Employer view — name hidden until reveal. Floor $69.46/hr inside the $60–$75 band, Fit 78. */
export const EmployerNameHidden: Story = {
  args: { variant: 'employer' },
};

/** Employer view — tolerance: floor $78/hr, 4.0% above the band top, inside 10% tolerance. */
export const EmployerTolerance: Story = {
  args: { variant: 'employer-tolerance' },
};
