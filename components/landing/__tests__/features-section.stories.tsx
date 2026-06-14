import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { FeaturesSection } from "../features-section";

const meta = {
  component: FeaturesSection,
  tags: ["ai-generated", "needs-work"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FeaturesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/everything you need to ship faster/i),
    ).toBeVisible();
    await expect(canvas.getByText(/role-based access control/i)).toBeVisible();
    await expect(canvas.getByText(/real-time traceability/i)).toBeVisible();
  },
};
