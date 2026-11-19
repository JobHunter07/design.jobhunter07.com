import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AdminConfigTable } from '../../components/one-and-done/AdminConfigTable';

const meta = {
  title: 'OneAndDone/Admin & Money/Admin Config Table',
  component: AdminConfigTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Used on Screen 5 — the Admin Portal config tables. Every rate, fee, threshold, tier, and limit is set here, DB-driven, with defaults, audit log, dry-run preview, and restore to defaults. Spend prices are system-set by the cost + margin formula — never hand-typed.',
      },
    },
  },
} satisfies Meta<typeof AdminConfigTable>;

export default meta;

type Story = StoryObj<typeof meta>;

/** All six config groups plus the audit log. */
export const ConfigAndAuditLog: Story = {};
