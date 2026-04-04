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

  it("embeds the current newsletter PDF under the Newsletter heading", () => {
    const { url } = Cypress.env("latestNewsletter") as { url: string };

    cy.contains("h2", "Newsletter").should("be.visible");
    cy.get(`iframe[src="${url}"]`).should("have.length", 1);
  });
});
