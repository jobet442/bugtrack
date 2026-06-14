import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import MockDate from "mockdate";
import { initialize, mswLoader } from "msw-storybook-addon";
import { mswHandlers } from "./msw-handlers";

initialize({ onUnhandledRequest: "bypass" });

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    msw: { handlers: mswHandlers },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },
  async beforeEach() {
    localStorage.setItem("theme", "dark");
    MockDate.set("2024-04-01T12:00:00Z");
  },
};

export default preview;
