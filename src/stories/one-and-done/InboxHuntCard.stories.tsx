import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { InboxHuntCard } from '../../components/one-and-done/InboxHuntCard';

const meta = {
  title: 'OneAndDone/InboxHuntCard',
  component: InboxHuntCard,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof InboxHuntCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** High-confidence parse: Emily Rotundo / Brooksource — Optumserve, every field stated. */
export const HighConfidence: Story = {
  args: {
    role: 'Senior .NET Developer',
    company: 'Optumserve · Brooksource',
    recruiter: 'Emily Rotundo',
    confidence: 'High',
    fields: [
      { label: 'Role', value: 'Senior .NET Developer' },
      { label: 'Company', value: 'Optumserve · Brooksource — Emily Rotundo' },
      { label: 'Pay', value: '$60–$65/hr' },
      { label: 'Location', value: '100% remote · Team works CST hours' },
      { label: 'Type', value: 'W2 contract-to-hire · 6 months, then convert' },
    ],
    sourceEmail: 'Gmail · Nov 18, 2026, 9:14am — view email',
    floorNote:
      'Against your floor: band top $65/hr is 6.4% below your $69.46/hr floor — inside your 10% tolerance.',
  },
};

/** Medium-confidence parse: Mondo — pay was never stated, so the card flags it instead of guessing. */
export const PayNotStated: Story = {
  args: {
    role: 'Senior Developer',
    company: 'Via Mondo',
    recruiter: 'Savannah Correro',
    confidence: 'Medium',
    fields: [
      { label: 'Role', value: 'Senior Developer' },
      { label: 'Company', value: 'Via Mondo — Savannah Correro' },
      { label: 'Pay', value: 'Pay not stated', missing: true },
      { label: 'Location', value: '100% remote' },
      { label: 'Type', value: 'Contract-to-hire' },
    ],
    sourceEmail: 'Gmail · Jun 24, 2026 — view email',
    floorNote: 'Until the pay is confirmed, the pay gate cannot pass.',
  },
};

/** Confirmed draft — Reveal sends the invite for 0 coins. */
export const Confirmed: Story = {
  args: {
    role: 'Senior .NET Developer',
    company: 'Via SoftSages',
    recruiter: 'Tulsi',
    confidence: 'Medium',
    fields: [
      { label: 'Role', value: 'Senior .NET Developer' },
      { label: 'Company', value: 'Via SoftSages — Tulsi' },
      { label: 'Pay', value: 'Pay not stated', missing: true },
      { label: 'Location', value: '100% remote' },
      { label: 'Type', value: 'Contract-to-hire' },
    ],
    sourceEmail: 'Gmail · Jun 24, 2026 — view email',
    confirmed: true,
  },
};

/** Invite sent — waiting on employer. No clock runs, nobody can ghost. */
export const InviteSent: Story = {
  args: {
    role: '.NET Full Stack Developer',
    company: 'via CSI Tech',
    recruiter: 'Emily Wheeler',
    confidence: 'High',
    fields: [
      { label: 'Role', value: '.NET Full Stack Developer' },
      { label: 'Company', value: 'via CSI Tech — Emily Wheeler' },
      { label: 'Pay', value: '$50/hr W2' },
      { label: 'Location', value: '100% remote' },
      { label: 'Type', value: 'Contract-to-hire · 6 months' },
    ],
    sourceEmail: 'Gmail · Jun 4, 2021 — view email',
    confirmed: true,
    inviteSent: true,
  },
};
