import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { SocialProof } from "../social-proof";

const meta = {
  component: SocialProof,
  tags: ["ai-generated", "needs-work"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SocialProof>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(/trusted by innovative engineering teams/i),
    ).toBeVisible();
    await expect(canvas.getByText("Sarah Jenkins")).toBeVisible();
    await expect(canvas.getByText("David Chen")).toBeVisible();
  },
};
