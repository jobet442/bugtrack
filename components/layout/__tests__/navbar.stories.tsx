import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { Navbar } from "../navbar";

const meta = {
  component: Navbar,
  tags: ["ai-generated", "needs-work"],
  parameters: {
    // Navbar looks best when it spans the full width of the screen
    layout: "fullscreen",
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Guest State
export const Guest: Story = {
  args: {
    isAuthenticated: false,
  },
  play: async ({ canvas }) => {
    // Verify guest links are visible
    await expect(canvas.getByRole("link", { name: /features/i })).toBeVisible();
    await expect(canvas.getByRole("link", { name: /pricing/i })).toBeVisible();
    // Verify auth buttons are visible
    await expect(canvas.getByRole("link", { name: /sign in/i })).toBeVisible();
  },
};

// 2. Authenticated Admin (RBAC check)
export const AuthenticatedAdmin: Story = {
  args: {
    isAuthenticated: true,
    userRole: "ADMIN",
    userName: "Jane Admin",
    userEmail: "jane@bugtrackerx.com",
    orgName: "Acme Corp",
  },
  play: async ({ canvas }) => {
    // Admins should see the "Audit Logs" route
    await expect(
      canvas.getByRole("link", { name: /audit logs/i }),
    ).toBeVisible();
    // Verify Org Name is rendered
    await expect(canvas.getByText("Acme Corp")).toBeVisible();
  },
};

// 3. Authenticated Developer (RBAC check)
export const AuthenticatedDeveloper: Story = {
  args: {
    isAuthenticated: true,
    userRole: "DEV",
    userName: "John Dev",
    userEmail: "john@bugtrackerx.com",
  },
  play: async ({ canvas }) => {
    // Developers should see Projects and Issues
    await expect(canvas.getByRole("link", { name: /projects/i })).toBeVisible();
    await expect(canvas.getByRole("link", { name: /issues/i })).toBeVisible();

    // Ensure "Audit Logs" is NOT in the document for DEV role
    const auditLogLink = canvas.queryByRole("link", { name: /audit logs/i });
    expect(auditLogLink).toBeNull();
  },
};
