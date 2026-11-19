import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TargetCard } from '../../components/one-and-done/TargetCard';
import {
  OPTUMSERVE,
  OPTUMSERVE_GATES,
  OPTUMSERVE_SCORE_PARTS,
} from '../../components/one-and-done/data';

const meta = {
  title: 'OneAndDone/TargetCard',
  component: TargetCard,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TargetCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs = {
  role: OPTUMSERVE.role,
  client: OPTUMSERVE.client,
  agency: OPTUMSERVE.agency,
  recruiter: OPTUMSERVE.recruiter,
  payBand: OPTUMSERVE.payBand,
  remote: OPTUMSERVE.remote,
  contract: OPTUMSERVE.contract,
  rarity: OPTUMSERVE.rarity,
  repRating: OPTUMSERVE.repRating,
  repHunts: OPTUMSERVE.repHunts,
  fitScore: OPTUMSERVE.fitScore,
  scoreParts: OPTUMSERVE_SCORE_PARTS,
  gates: OPTUMSERVE_GATES,
  clock: OPTUMSERVE.clock,
  clockLabel: OPTUMSERVE.clockLabel,
  gaps: [...OPTUMSERVE.gaps],
};

/** Optumserve as it appears on the Hunts board: pay gate FAILS by $4.46/hr, so Accept and Book stay locked. */
export const Default: Story = {
  args: { ...baseArgs },
};

/** The same card as a tolerance card: 6.4% below the floor, inside the seeker's 10% tolerance. */
export const Tolerance: Story = {
  args: {
    ...baseArgs,
    variant: 'tolerance',
    gates: OPTUMSERVE_GATES.map((gate) =>
      gate.label === 'Pay' ? { ...gate, result: 'tolerance' as const, detail: '$65/hr top is 6.4% below your floor — inside your 10% tolerance' } : gate,
    ),
  },
};

/** Sealed — held for review (65–79 band). Cannot be revealed until review clears. */
export const Held: Story = {
  args: {
    ...baseArgs,
    variant: 'held',
  },
};

/** A passing card: all five gates pass, Book and Counter are live. */
export const Passing: Story = {
  args: {
    ...baseArgs,
    role: 'Senior .NET API Developer',
    client: 'HealthBridge',
    agency: 'Direct employer',
    recruiter: '—',
    payBand: '$72–$78/hr',
    fitScore: 86,
    scoreParts: [
      { label: 'Gap coverage', points: 34, max: 40 },
      { label: 'Skill depth + recency', points: 22, max: 25 },
      { label: 'Seniority', points: 14, max: 15 },
      { label: 'Preferences', points: 9, max: 10 },
      { label: 'Availability + speed', points: 7, max: 10 },
    ],
    gates: OPTUMSERVE_GATES.map((gate) =>
      gate.label === 'Pay' ? { ...gate, result: 'pass' as const, detail: 'Whole band above floor (top +$8.54/hr)' } : gate,
    ),
    gaps: ['Azure Functions', 'Terraform'],
    clock: '1 day 22 hrs left',
    heldNote: '',
  },
};
