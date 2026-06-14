describe("Home Page", () => {
  it("successfully loads the home page", () => {
    // Visit the Next.js local server
    cy.visit("/");

    // Add a basic assertion to verify the page renders
    // Update this to match text actually on your page!
    cy.get("body").should("be.visible");
  });
});
