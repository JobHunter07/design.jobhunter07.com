import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { InviteEmail } from '../../components/one-and-done/InviteEmail';

const meta = {
  title: 'OneAndDone/Inbox Hunts/Invite Email',
  component: InviteEmail,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Used on Screen 8 — Inbox Hunts. The invite email, benefit first. A fixed banner sits at the very top of every invite; the body below it is the seeker\'s own first-person words, editable before sending. The banner headline never changes, so the pitch is consistent.',
      },
    },
  },
} satisfies Meta<typeof InviteEmail>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Emily Rotundo / Brooksource — Optumserve, pay stated. Benefit-first banner, then Brian's own words. */
export const EmilyPayStated: Story = {
  args: { variant: 'emily' },
};

/** Savannah Correro / Mondo — pay not stated, so the invite asks her to add it. */
export const SavannahPayMissing: Story = {
  args: { variant: 'savannah' },
};
