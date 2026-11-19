import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TotalCompPanel } from '../../components/one-and-done/TotalCompPanel';
import { TOTAL_COMP } from '../../components/one-and-done/data';

const meta = {
  title: 'OneAndDone/TotalCompPanel',
  component: TotalCompPanel,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TotalCompPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Hunt 1 ($50/hr + 10 PTO + insurance = $109,519/yr) beats Hunt 2 ($60/hr + 1 PTO, no insurance = $106,161/yr). */
export const Default: Story = {
  args: {
    hunt1: {
      label: 'Hunt 1',
      rate: '$50/hr + benefits',
      base: TOTAL_COMP.hunt1.base,
      baseLabel: 'Base $96,000 (1,920 × $50)',
      pto: TOTAL_COMP.hunt1.pto,
      ptoLabel: TOTAL_COMP.hunt1.ptoLabel,
      health: TOTAL_COMP.hunt1.health,
      healthLabel: TOTAL_COMP.hunt1.healthLabel,
      total: TOTAL_COMP.hunt1.total,
    },
    hunt2: {
      label: 'Hunt 2',
      rate: '$60/hr, thin benefits',
      base: TOTAL_COMP.hunt2.base,
      baseLabel: 'Base $115,200 (1,920 × $60)',
      pto: TOTAL_COMP.hunt2.pto,
      ptoLabel: TOTAL_COMP.hunt2.ptoLabel,
      health: TOTAL_COMP.hunt2.health,
      healthLabel: TOTAL_COMP.hunt2.healthLabel,
      total: TOTAL_COMP.hunt2.total,
    },
    difference: TOTAL_COMP.difference,
    basis: TOTAL_COMP.basis,
  },
};
