import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { CTASection } from "../cta-section";

const meta = {
  component: CTASection,
  tags: ["ai-generated", "needs-work"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CTASection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(/ready to eliminate software bugs/i),
    ).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: /get started for free/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: /contact sales/i }),
    ).toBeVisible();
  },
};
