import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { HuntCard } from '../../components/one-and-done/HuntCard';
import { OPTUMSERVE_GATES } from '../../components/one-and-done/data';

const meta = {
  title: 'OneAndDone/HuntCard',
  component: HuntCard,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof HuntCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Seeker view — Optumserve as a tolerance card: 6.4% below the floor, inside 10% tolerance. */
export const SeekerTolerance: Story = {
  args: {
    view: 'seeker',
    rarity: 'RARE',
    title: 'Senior .NET Developer',
    subtitle: 'Optumserve · via Brooksource (Emily Rotundo)',
    payLine: '$60–$65/hr',
    payNote: '6.4% below floor ($4.46/hr short)',
    remote: '100% remote · Must live in the U.S. · Team CST',
    contract: 'W2 contract-to-hire · 6 months then convert',
    gates: OPTUMSERVE_GATES.map((gate) =>
      gate.label === 'Pay' ? { ...gate, result: 'tolerance' as const } : gate,
    ),
    fitScore: 78,
    fitLabel: 'strong · held for review',
    clock: '1 day 14 hrs',
    gaps: ['Kubernetes', 'CI/CD pipelines'],
    repRating: 4.6,
    repHunts: 11,
    tolerance: true,
    toleranceNote: 'Below floor — within your 10% tolerance',
  },
};

/** Seeker view — a passing EPIC card, all five gates pass, Fit 86. */
export const SeekerPassing: Story = {
  args: {
    view: 'seeker',
    rarity: 'EPIC',
    title: 'Senior .NET API Developer',
    subtitle: 'HealthBridge · Direct employer',
    payLine: '$72–$78/hr',
    payNote: 'Whole band above floor (top +$8.54/hr)',
    remote: '100% remote · Anywhere in the U.S. (national average COLA) · Team ET',
    contract: 'W2 contract · 12 months, extension likely',
    gates: OPTUMSERVE_GATES.map((gate) =>
      gate.label === 'Pay' ? { ...gate, result: 'pass' as const, detail: 'Whole band above floor' } : gate,
    ),
    fitScore: 86,
    fitLabel: 'excellent · card sent',
    clock: '1 day 22 hrs',
    gaps: ['Azure Functions', 'Terraform'],
    repRating: 4.8,
    repHunts: 23,
  },
};

/** Seeker view — RetailWorks: Pay FAIL and Contract FAIL (1099 only), Fit 62 below the send band. */
export const SeekerFailing: Story = {
  args: {
    view: 'seeker',
    rarity: 'COMMON',
    title: '.NET Developer',
    subtitle: 'RetailWorks · via Mondo',
    payLine: '$55–$60/hr',
    payNote: 'Top $9.46/hr below floor',
    remote: '100% remote · 48 contiguous states only (CONUS) · Team PT',
    contract: '1099 only · 3-month contract, no conversion',
    gates: [
      { label: 'Pay', result: 'fail', detail: '$60/hr top vs $69.46/hr floor' },
      { label: 'Remote', result: 'pass', detail: '100% remote' },
      { label: 'Contract type', result: 'fail', detail: '1099 only' },
      { label: 'Authorization', result: 'pass' },
      { label: 'Availability', result: 'pass' },
    ],
    fitScore: 62,
    fitLabel: 'below the send band',
    clock: '9 hrs',
    gaps: ['Microservices at scale', 'SQL tuning'],
    repRating: 3.9,
    repHunts: 14,
  },
};

/** Employer view — a hunter for your Need. Name hidden until reveal. */
export const EmployerHidden: Story = {
  args: {
    view: 'employer',
    rarity: 'RARE',
    title: 'Seeker · .NET, 8 yrs',
    subtitle: 'Floor $69.46/hr — inside $60–$75 band · Lives in U.S. (PA) · Works ET',
    payLine: 'Floor $69.46/hr — inside band',
    payNote: 'W2 contract-to-hire · Available from Dec 7 · Mon–Fri 9am–12pm ET',
    remote: '100% remote',
    contract: 'W2 contract-to-hire',
    gates: OPTUMSERVE_GATES.map((gate) =>
      gate.label === 'Pay' ? { ...gate, result: 'pass' as const, detail: 'Floor inside band' } : gate,
    ),
    fitScore: 78,
    fitLabel: 'held for review',
    clock: '1 day 14 hrs',
    gaps: ['C#/.NET APIs', 'SQL Server'],
    repRating: 4.9,
    repHunts: 11,
  },
};

/** Employer view — revealed: Brian D., skills verified, Kubernetes gap. */
export const EmployerRevealed: Story = {
  args: {
    view: 'employer',
    rarity: 'RARE',
    title: 'Brian D.',
    subtitle: 'Floor $69.46/hr — inside $60–$75 band · Lives in U.S. (PA) · Works ET',
    payLine: 'Floor $69.46/hr — inside band',
    payNote: 'C#/.NET APIs verified · SQL Server verified · Azure verified · Kubernetes gap',
    remote: '100% remote',
    contract: 'W2 contract-to-hire',
    gates: OPTUMSERVE_GATES.map((gate) =>
      gate.label === 'Pay' ? { ...gate, result: 'pass' as const, detail: 'Floor inside band' } : gate,
    ),
    fitScore: 78,
    fitLabel: 'held for review',
    clock: '1 day 14 hrs',
    gaps: ['Kubernetes', 'CI/CD (basic use claimed, not yet verified)'],
    repRating: 4.9,
    repHunts: 11,
    revealed: true,
  },
};

/** Employer view — tolerance: floor 4.0% above the band top, inside 10% tolerance. */
export const EmployerTolerance: Story = {
  args: {
    view: 'employer',
    rarity: 'COMMON',
    title: 'Seeker · .NET, 9 yrs',
    subtitle: 'Floor $78.00/hr — 4.0% above band top ($3.00/hr over) · Lives in U.S. (WA) · Works PT',
    payLine: 'Floor $78.00/hr — above band',
    payNote: 'W2 contract-to-hire · Available from Dec 14 · Mon–Wed 9am–11am PT',
    remote: '100% remote',
    contract: 'W2 contract-to-hire',
    gates: OPTUMSERVE_GATES.map((gate) =>
      gate.label === 'Pay' ? { ...gate, result: 'tolerance' as const, detail: '4.0% above band top' } : gate,
    ),
    fitScore: 66,
    fitLabel: 'held · pay gate blocks the send',
    clock: '12 hrs',
    gaps: ['Kubernetes', 'CI/CD pipelines'],
    repRating: 4.7,
    repHunts: 9,
    tolerance: true,
    toleranceNote: 'Above band — within your 10% tolerance',
  },
};
