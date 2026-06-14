import "./commands";
import { mount } from "cypress/react";

// Import Next.js global CSS so components look right in tests
import "../../app/globals.css";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);
