import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import Home from "../page";

const meta = {
  title: "Pages/Landing Page",
  component: Home,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify pieces from each section are present on the fully assembled page
    await expect(canvas.getByText(/ship software with/i)).toBeVisible();
    await expect(
      canvas.getByText(/everything you need to ship faster/i),
    ).toBeVisible();
    await expect(
      canvas.getByText(/trusted by innovative engineering teams/i),
    ).toBeVisible();
    await expect(
      canvas.getByText(/simple, transparent pricing/i),
    ).toBeVisible();
    await expect(
      canvas.getByText(/ready to eliminate software bugs/i),
    ).toBeVisible();
  },
};
