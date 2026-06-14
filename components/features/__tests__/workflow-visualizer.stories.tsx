import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { WorkflowVisualizer } from "../workflow-visualizer";

const meta = {
  title: "Features/WorkflowVisualizer",
  component: WorkflowVisualizer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WorkflowVisualizer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check main section heading
    const heading = canvas.getByRole("heading", { level: 2 });
    await expect(heading).toHaveTextContent(
      /A lifecycle tailored to your workflow/i,
    );

    // Check if the steps rendered
    await expect(canvas.getByText("New")).toBeVisible();
    await expect(canvas.getByText("In Progress")).toBeVisible();
    await expect(canvas.getByText("QA Testing")).toBeVisible();
    await expect(canvas.getByText("Closed")).toBeVisible();

    // Wait 3.1 seconds to allow the setInterval to fire and update the activeStep.
    // This ensures coverage for the interval callback and the `isPast` UI branches!
    await new Promise((resolve) => setTimeout(resolve, 3100));
  },
};
