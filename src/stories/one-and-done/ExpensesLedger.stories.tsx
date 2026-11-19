import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ExpensesLedger } from '../../components/one-and-done/ExpensesLedger';
import { EXPENSE_CATEGORIES, EXPENSE_LINES, FLOORS } from '../../components/one-and-done/data';

const meta = {
  title: 'OneAndDone/ExpensesLedger',
  component: ExpensesLedger,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ExpensesLedger>;

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs = {
  burnPerMonth: FLOORS.burnPerMonth,
  burnPerYear: FLOORS.burnPerYear,
  medianMonth: FLOORS.burnMedianMonth,
  runRate: FLOORS.burnRunRate,
  categories: [...EXPENSE_CATEGORIES],
  lines: [...EXPENSE_LINES],
};

/** Full ledger: Plaid + manual, duplicate warning, one excluded line. */
export const Default: Story = {
  args: { ...baseArgs, filter: 'All' as const },
};

/** Plaid lines only — read-only auto-import. */
export const PlaidOnly: Story = {
  args: { ...baseArgs, filter: 'Plaid' as const },
};

/** Manual lines only — cash, checks, bills paid outside the bank. */
export const ManualOnly: Story = {
  args: { ...baseArgs, filter: 'Manual' as const },
};
