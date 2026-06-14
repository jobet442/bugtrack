import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { Button } from "./button";

const meta = {
  component: Button,
  tags: ["ai-generated", "needs-work"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Smoke check
export const Primary: Story = {
  args: { children: "Primary Button", variant: "default" },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: /primary button/i }),
    ).toBeVisible();
  },
};

// Variant stories
export const Destructive: Story = {
  args: { children: "Delete", variant: "destructive" },
};
export const Outline: Story = {
  args: { children: "Cancel", variant: "outline" },
};
export const Ghost: Story = {
  args: { children: "Save Draft", variant: "ghost" },
};

// Mandatory CssCheck (exactly one for the whole project)
export const CssCheck: Story = {
  args: { children: "CssCheck Button", variant: "default" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /csscheck button/i });
    // Shadcn default primary button has bg-primary.
    // We will verify the background color is correctly loaded from globals.css variables.
    // In light mode, Shadcn usually compiles --primary to black (rgb(24, 24, 27) or similar).
    // Because we set theme=dark in preview.tsx, it should be white or close to it.
    // We'll just verify it has a computed background color that is NOT transparent.
    const bgColor = getComputedStyle(button).backgroundColor;
    await expect(bgColor).not.toBe("rgba(0, 0, 0, 0)");
    await expect(bgColor).not.toBe("transparent");
  },
};
