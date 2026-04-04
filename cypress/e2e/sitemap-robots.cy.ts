const SITE = "https://relaymaryland.com";

/**
 * Only meaningful against a production build due to how the sitemap works.
 * Skipped for `test:dev` via `CYPRESS_TEST_MODE=dev`.
 */
const describeRobots =
  Cypress.env("TEST_MODE") === "dev" ? describe.skip : describe;

describeRobots("Robots.txt and sitemap", () => {
  it("lists the sitemap URL in robots.txt", () => {
    cy.request("/robots.txt").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include(`Sitemap: ${SITE}/sitemap-index.xml`);
    });
  });

  it("returns a valid sitemap index document", () => {
    cy.request("/sitemap-index.xml").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include("<?xml");
      expect(res.body.toLowerCase()).to.include("sitemap");
    });
  });
});
