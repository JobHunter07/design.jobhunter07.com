import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { ToolsSection } from '../../components/tools/ToolsSection';
import { tools } from '../../data/landing';

const meta = {
  title: 'Landing/ToolsSection',
  component: ToolsSection,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[#2b2622] px-4 py-10 text-[#f4f1e6]">
        <div className="mx-auto max-w-5xl">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ToolsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { tools },
};
