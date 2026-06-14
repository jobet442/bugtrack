import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import FeaturesPage from "../page";

const meta = {
  title: "Pages/FeaturesPage",
  component: FeaturesPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FeaturesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check if the Hero component rendered
    const heroHeading = canvas.getByRole("heading", {
      name: /Tracking beyond limits/i,
    });
    await expect(heroHeading).toBeVisible();

    // Check if the BentoGrid rendered
    const bentoHeading = canvas.getByRole("heading", {
      name: /Everything you need to ship quality software/i,
    });
    await expect(bentoHeading).toBeVisible();

    // Check if the WorkflowVisualizer rendered
    const workflowHeading = canvas.getByRole("heading", {
      name: /A lifecycle tailored to your workflow/i,
    });
    await expect(workflowHeading).toBeVisible();

    // Check if the CTA rendered
    const ctaHeading = canvas.getByRole("heading", {
      name: /Ready to redefine your workflow/i,
    });
    await expect(ctaHeading).toBeVisible();
  },
};
