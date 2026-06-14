import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { Footer } from "../footer";

const meta = {
  component: Footer,
  tags: ["ai-generated", "needs-work"],
  parameters: {
    // Footer looks best when it spans the full width of the screen
    layout: "fullscreen",
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Footer State
export const Default: Story = {
  play: async ({ canvas }) => {
    // Verify BugTrackerX brand is visible
    await expect(
      canvas.getByRole("link", { name: /bugtrackerx/i }),
    ).toBeVisible();

    // Verify key columns exist
    await expect(canvas.getByText("Product")).toBeVisible();
    await expect(canvas.getByText("Company")).toBeVisible();
    await expect(canvas.getByText("Legal")).toBeVisible();

    // Verify a link from each section
    await expect(canvas.getByRole("link", { name: /pricing/i })).toBeVisible();
    await expect(canvas.getByRole("link", { name: /careers/i })).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: /privacy policy/i }),
    ).toBeVisible();
  },
};
