import React from "react";
import { Button } from "../../components/ui/button";

describe("<Button />", () => {
  it("renders correctly", () => {
    // Mount the React component
    cy.mount(<Button>Click me</Button>);

    // Assert that it exists and contains the correct text
    cy.get("button").should("exist").and("have.text", "Click me");
  });
});
