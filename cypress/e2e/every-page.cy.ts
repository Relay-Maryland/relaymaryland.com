const headerNav = () => cy.get("nav.container").first();

describe("Every page", () => {
  const allPagePaths =
    (Cypress.env("allPagePaths") as string[] | undefined) ?? [];
  const expectedLabelByPath =
    (Cypress.env("expectedLabelByPath") as
      | Record<string, string | null>
      | undefined) ?? {};

  for (const pathname of allPagePaths) {
    const label = pathname === "/" ? "the home page" : pathname;

    it(`serves ${label} with header, footer, and the right active nav tab`, () => {
      cy.request({ url: pathname || "/", failOnStatusCode: false }).then(
        (res) => {
          expect(res.status).to.eq(200);
        },
      );

      cy.visit(pathname || "/");

      headerNav().should("be.visible");
      headerNav().find("a.btn, span.btn").should("have.length", 5);
      cy.get("footer").should("be.visible").and("contain", "Relay, Maryland");

      const active = headerNav().find(".btn.active");

      if (pathname === "/") {
        active.should("have.length", 0);
      } else {
        const expected = expectedLabelByPath[pathname];

        expect(expected, `label for ${pathname}`).not.to.be.null;
        active.should("have.length", 1).and("contain.text", expected!);
      }
    });
  }
});
