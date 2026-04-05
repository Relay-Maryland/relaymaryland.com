const EXPECTED_TITLES: Record<string, string> = {
  "/": "Welcome to Relay, Maryland",
  "/about": "About",
  "/hall": "Town Hall",
  "/resources": "Community Resources",
  "/news": "News and Calendar",
  "/ria": "Relay Improvement Association",
};

describe("Page titles", () => {
  for (const [path, title] of Object.entries(EXPECTED_TITLES)) {
    it(`sets the document title to "${title}" on ${path}`, () => {
      cy.visit(path);
      cy.title().should("eq", title);
    });
  }

  const newsPostPaths =
    (Cypress.env("newsPostPaths") as string[] | undefined) ?? [];

  newsPostPaths.forEach((path) => {
    it(`gives the news post at ${path} a non-empty document title`, () => {
      cy.visit(path);
      cy.title().should((t) => {
        expect(t.trim().length, `title for ${path}`).to.be.greaterThan(0);
      });
    });
  });
});

describe("Main headings", () => {
  it("shows the hero headline on the home page", () => {
    cy.visit("/");
    cy.contains("h2", "Greetings from Relay and St. Denis!").should(
      "be.visible",
    );
  });

  it("shows a main heading on each primary inner page", () => {
    const paths = Object.keys(EXPECTED_TITLES).filter((p) => p !== "/");

    paths.forEach((path) => {
      cy.visit(path);
      cy.get("main h1").first().should("be.visible");
    });
  });
});

describe("News articles", () => {
  const newsPostPaths =
    (Cypress.env("newsPostPaths") as string[] | undefined) ?? [];

  for (const path of newsPostPaths) {
    it(`lets readers jump back to the news index from ${path}`, () => {
      cy.visit(path);
      cy.get('main header nav a[href="/news"]')
        .should("be.visible")
        .and("contain", "More news");
      cy.get("main time[datetime]").first().should("be.visible");
    });
  }
});

describe("Footer social links", () => {
  it("uses the expected Facebook, Instagram, and GitHub URLs in the footer", () => {
    const c = Cypress.env("contact") as {
      facebook: { full: string };
      instagram: { full: string };
      github: string;
    };

    cy.visit("/");
    cy.get(`footer a[href="${c.facebook.full}"]`).should("have.length", 1);
    cy.get(`footer a[href="${c.instagram.full}"]`).should("have.length", 1);
    cy.get(`footer a[href="${c.github}"]`).should("have.length", 1);
  });
});
