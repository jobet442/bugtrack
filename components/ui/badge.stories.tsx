import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { Badge } from "./badge";

const meta = {
  component: Badge,
  tags: ["ai-generated", "needs-work"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Smoke check
export const Default: Story = {
  args: { children: "New" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/new/i)).toBeVisible();
  },
};

// Variant-only stories: no play needed
export const Secondary: Story = {
  args: { children: "InProgress", variant: "secondary" },
};
export const Destructive: Story = {
  args: { children: "Failed", variant: "destructive" },
};
export const Outline: Story = {
  args: { children: "Draft", variant: "outline" },
};
