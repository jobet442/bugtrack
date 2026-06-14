import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { PricingSection } from "../pricing-section";

const meta = {
  component: PricingSection,
  tags: ["ai-generated", "needs-work"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PricingSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/simple, transparent pricing/i),
    ).toBeVisible();
    await expect(canvas.getByText("Starter")).toBeVisible();
    await expect(canvas.getByText("Pro")).toBeVisible();
    await expect(canvas.getByText("Enterprise")).toBeVisible();

    // Verify the "Most Popular" badge is visible on the Pro tier
    await expect(canvas.getByText("Most Popular")).toBeVisible();
  },
};
