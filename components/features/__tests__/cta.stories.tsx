import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { CTA } from "../cta";

const meta = {
  title: "Features/CTA",
  component: CTA,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check main heading
    const heading = canvas.getByRole("heading", { level: 2 });
    await expect(heading).toHaveTextContent(/Ready to redefine your workflow/i);

    // Check CTA links
    const registerLink = canvas.getByRole("link", {
      name: /get started for free/i,
    });
    await expect(registerLink).toBeVisible();
    await expect(registerLink).toHaveAttribute("href", "/auth/register");

    const pricingLink = canvas.getByRole("link", { name: /view pricing/i });
    await expect(pricingLink).toBeVisible();
    await expect(pricingLink).toHaveAttribute("href", "/pricing");
  },
};
