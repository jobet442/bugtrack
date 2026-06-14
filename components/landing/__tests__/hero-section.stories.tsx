import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { HeroSection } from "../hero-section";

const meta = {
  component: HeroSection,
  tags: ["ai-generated", "needs-work"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify core text is visible
    await expect(canvas.getByText(/ship software with/i)).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: /start for free/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: /book a demo/i }),
    ).toBeVisible();
  },
};
