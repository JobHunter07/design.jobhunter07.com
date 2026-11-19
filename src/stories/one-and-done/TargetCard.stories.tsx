import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TargetCard } from '../../components/one-and-done/TargetCard';

const meta = {
  title: 'OneAndDone/Cards/Target Card',
  component: TargetCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Used on Screen 3 — the revealed Target Card. The RARE collectible card itself: dark-green header, gold RARE pill, verified-employer chip, gold Rep Rating stars, response-clock card, the five hard gates, and the Fit Score breakdown. A hard-gate fail outranks any Fit Score.',
      },
    },
  },
} satisfies Meta<typeof TargetCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Pay FAIL — held 78/100. Accept and Book stay locked while the pay gate fails. */
export const PayFailHeld: Story = {
  args: { variant: 'fail' },
};

/** Pay PASS — sent 86/100. All five gates pass; Accept and Book are live. */
export const PayPassSent: Story = {
  args: { variant: 'pass' },
};

/** Tolerance amber — 6.4% below the floor, inside the seeker's 10% tolerance. */
export const ToleranceAmber: Story = {
  args: { variant: 'tolerance' },
};

/** Sealed — held for review (65–79 band). The full read stays sealed until reveal. */
export const SealedHeld: Story = {
  args: { variant: 'sealed' },
};
