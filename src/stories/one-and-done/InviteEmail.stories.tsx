import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { InviteEmail, EMILY_INVITE_BODY } from '../../components/one-and-done/InviteEmail';

const meta = {
  title: 'OneAndDone/InviteEmail',
  component: InviteEmail,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof InviteEmail>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Emily Rotundo / Brooksource — Optumserve. Benefit-first banner, then Brian's own words. */
export const EmilyOptumserve: Story = {
  args: {
    to: 'Emily Rotundo · Brooksource (for Optumserve)',
    subject: 'Your .NET role is already a hunt on JobHunter07 — join free to finish it',
    body: EMILY_INVITE_BODY,
    prefilled: [
      { label: 'Role', value: 'Senior .NET Developer' },
      { label: 'Company', value: 'Optumserve · Brooksource — Emily Rotundo' },
      { label: 'Pay', value: '$60–$65/hr' },
      { label: 'Location', value: '100% remote · Team works CST hours' },
      { label: 'Type', value: 'W2 contract-to-hire' },
      { label: 'Availability', value: 'Not in the email', missing: true },
    ],
  },
};

/** Savannah Correro / Mondo — pay not stated, so the invite asks her to add it. */
export const SavannahPayMissing: Story = {
  args: {
    to: 'Savannah Correro · Mondo',
    subject: 'Your Senior Developer role is already a hunt on JobHunter07 — join free to finish it',
    body: `Hi Savannah,

I'm Brian — you emailed me about the Senior Developer role. I'm interested.

What I'm not doing is losing another role to phone tag and a thread of "just checking in" emails — so I've put this role on JobHunter07.

No more "just checking in."
No missed calls, no voicemail tag.
No surprise stages halfway through.
No pay surprise at the offer. Pay and benefits are judged together, as one total number, against the floor I set from my own bills.

One honest gap: your email didn't state a rate, so the card says so — pay not stated, to confirm. Everything else from your email is already filled in. You only add what's missing: the pay band, your availability, and anything about the process that wasn't in the email.

One rule protects us both: each side answers within 48 hours, or the hunt moves on. No ghosting.

— Brian, Seeker · JobHunter07`,
    prefilled: [
      { label: 'Role', value: 'Senior Developer' },
      { label: 'Company', value: 'Via Mondo — Savannah Correro' },
      { label: 'Pay', value: 'Not stated in the email', missing: true },
      { label: 'Location', value: '100% remote' },
      { label: 'Type', value: 'Contract-to-hire' },
      { label: 'Availability', value: 'Not in the email', missing: true },
    ],
  },
};

/** Invite sent — waiting on employer. */
export const Sent: Story = {
  args: {
    to: 'Emily Rotundo · Brooksource (for Optumserve)',
    subject: 'Your .NET role is already a hunt on JobHunter07 — join free to finish it',
    body: EMILY_INVITE_BODY,
    prefilled: [
      { label: 'Role', value: 'Senior .NET Developer' },
      { label: 'Company', value: 'Optumserve · Brooksource — Emily Rotundo' },
      { label: 'Pay', value: '$60–$65/hr' },
      { label: 'Location', value: '100% remote · Team works CST hours' },
      { label: 'Type', value: 'W2 contract-to-hire' },
      { label: 'Availability', value: 'Not in the email', missing: true },
    ],
    sent: true,
  },
};
