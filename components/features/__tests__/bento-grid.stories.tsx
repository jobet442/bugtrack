import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { BentoGrid } from "../bento-grid";

const meta = {
  title: "Features/BentoGrid",
  component: BentoGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BentoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check main section heading
    const heading = canvas.getByRole("heading", { level: 2 });
    await expect(heading).toHaveTextContent(
      /Everything you need to ship quality software/i,
    );

    // Check if the individual feature cards rendered
    await expect(canvas.getByText(/Advanced Issue Tracking/i)).toBeVisible();
    await expect(canvas.getByText(/Strict RBAC/i)).toBeVisible();
    await expect(canvas.getByText(/Test Case Management/i)).toBeVisible();
    await expect(canvas.getByText(/Powerful APIs/i)).toBeVisible();
    await expect(canvas.getByText(/Real-time Analytics/i)).toBeVisible();
  },
};
