import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { Hero } from "../hero";

const meta = {
  title: "Features/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check main heading
    const heading = canvas.getByRole("heading", { level: 1 });
    await expect(heading).toHaveTextContent(/Tracking beyond limits/i);

    // Check CTA links
    const startLink = canvas.getByRole("link", {
      name: /start building free/i,
    });
    await expect(startLink).toBeVisible();
    await expect(startLink).toHaveAttribute("href", "/dashboard");

    const exploreLink = canvas.getByRole("link", { name: /explore features/i });
    await expect(exploreLink).toBeVisible();
    await expect(exploreLink).toHaveAttribute("href", "#features-grid");
  },
};
