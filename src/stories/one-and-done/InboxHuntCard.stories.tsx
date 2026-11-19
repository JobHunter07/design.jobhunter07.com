import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { InboxHuntCard } from '../../components/one-and-done/InboxHuntCard';

const meta = {
  title: 'OneAndDone/Inbox Hunts/Inbox Hunt Draft Card',
  component: InboxHuntCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Used on Screen 8 — Inbox Hunts. A draft card parsed from the seeker\'s own recruiter email. Parsed fields are exactly what the email stated; a field the email didn\'t state stays flagged until the employer confirms it. Creating a card costs 0 coins; Reveal sends the invite, also 0 coins.',
      },
    },
  },
} satisfies Meta<typeof InboxHuntCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** High-confidence parse: Emily Rotundo / Brooksource — Optumserve, every field stated. */
export const HighConfidence: Story = {
  args: { variant: 'high' },
};

/** Medium-confidence parse: Mondo — pay was never stated, so the card flags it instead of guessing. */
export const MediumPayFlagged: Story = {
  args: { variant: 'flagged' },
};

/** Confirmed draft — Reveal sends the invite for 0 coins. */
export const Confirmed: Story = {
  args: { variant: 'confirmed' },
};

/** Invite sent — waiting on employer. No clock runs, nobody can ghost. */
export const InviteSent: Story = {
  args: { variant: 'sent' },
};
