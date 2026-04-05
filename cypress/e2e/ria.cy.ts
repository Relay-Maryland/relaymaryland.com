const GOOGLE_DRIVE_FILE_RE = /^https:\/\/drive\.google\.com\/file\/d\/[^/]+\//;

describe("RIA membership page", () => {
  beforeEach(() => {
    cy.visit("/ria");
  });

  it("shows mailing address, email, and social links in the contact block", () => {
    const c = Cypress.env("contact") as {
      email: string;
      address: {
        street: string;
        city: string;
        state: { long: string };
        zip: string;
      };
      facebook: { full: string; id: string };
      instagram: { full: string; id: string };
    };

    cy.contains(c.address.street).should("be.visible");
    cy.contains(
      new RegExp(
        `${c.address.city},\\s+${c.address.state.long}[\\s\u00a0]+${c.address.zip}`,
      ),
    ).should("be.visible");

    cy.get("address")
      .find(`a[href="mailto:${c.email}"]`)
      .should("have.length", 1);

    cy.get("address")
      .find(`a[href="${c.facebook.full}"]`)
      .should("have.length", 1)
      .and("contain", `facebook.com/${c.facebook.id}`);

    cy.get("address")
      .find(`a[href="${c.instagram.full}"]`)
      .should("have.length", 1)
      .and("contain", `instagram.com/${c.instagram.id}`);
  });

  it("opens the Cheddar Up membership dues page in a new tab", () => {
    cy.get('a[href="https://my.cheddarup.com/c/ria-yearly-membership-dues"]')
      .should("be.visible")
      .and("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noopener noreferrer");
  });

  it("shows the downloadable membership form and opens a valid Google Drive document", () => {
    cy.contains("h3", "Membership form").should("be.visible");

    cy.contains("a", "RIA membership form")
      .should("be.visible")
      .should(($a) => {
        expect($a.attr("href"), "membership form href").to.match(
          GOOGLE_DRIVE_FILE_RE,
        );
      })
      // Alias so we can refer to this same link again without repeating cy.contains (use @name with cy.get).
      .as("membershipForm");

    // cy.get("@alias") re-queries the element saved by .as("alias") above.
    cy.get("@membershipForm")
      .invoke("attr", "href")
      .then((href) => {
        expect(href, "membership form href").to.be.a("string").and.not.be.empty;
        cy.request(href as string).then((response) => {
          expect(response.status, "membership form URL responds").to.eq(200);
          expect(
            response.body.length,
            "membership form URL returns a non-empty document",
          ).to.be.greaterThan(500);
        });
      });

    cy.get("@membershipForm").click(); // same aliased link

    // After the click, the browser is on drive.google.com (different origin than localhost). Commands
    // that run on that page must live inside cy.origin with that site’s origin.
    cy.origin("https://drive.google.com", () => {
      cy.url().should("match", /drive\.google\.com\/file\/d\/[^/?]+/);
      cy.get("body").should("be.visible");
      cy.title().should("not.be.empty");
    });
  });

  it("embeds the current newsletter PDF under the Newsletter heading", () => {
    const { url } = Cypress.env("latestNewsletter") as { url: string };

    cy.contains("h2", "Newsletter").should("be.visible");
    cy.get(`iframe[src="${url}"]`).should("have.length", 1);
  });
});
