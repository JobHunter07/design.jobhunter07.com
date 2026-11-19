import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ExpensesLedger } from '../../components/one-and-done/ExpensesLedger';

const meta = {
  title: 'OneAndDone/Admin & Money/Expenses Ledger',
  component: ExpensesLedger,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Used on Screen 6 — Expenses Tracking. One ledger, two sources: Plaid pulls the bank trail in automatically (read-only, categorised); manual entries cover cash, checks, and bills paid outside the account. Every line is labelled by where it came from. The burn feeds Know Your Range — floor $69.46/hr.',
      },
    },
  },
} satisfies Meta<typeof ExpensesLedger>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Full ledger: Plaid + manual, duplicate warning, one excluded line. */
export const LedgerAndDuplicateWarning: Story = {
  args: { filter: 'All' },
};

/** Plaid lines only — read-only auto-import. */
export const PlaidOnly: Story = {
  args: { filter: 'Plaid' },
};

/** Manual lines only — cash, checks, bills paid outside the bank. */
export const ManualOnly: Story = {
  args: { filter: 'Manual' },
};
