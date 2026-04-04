import { readFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "cypress";
import {
  getAllPagePaths,
  getExpectedActiveLabel,
  getNewsPostPaths,
} from "./cypress/support/helpers/page-paths";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4321",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.ts",
    video: false,
    env: buildE2eEnv(),
  },
});

/**
 * Builds the `env` object merged into `Cypress.env()` in the browser. Specs
 * cannot use Node `fs`, so all page paths, expected nav labels, and JSON fixtures
 * are computed here (Node-only) at config load.
 *
 * @returns Cypress `env` payload: `allPagePaths`, per-path expected nav
 *   labels, and parsed JSON for `contact.json` and `latest-newsletter.json`.
 *   If `dist/news` is missing (no prior `astro build`), `allPagePaths` may be
 *   empty and `expectedLabelByPath` may be incomplete; `contact` and
 *   `latestNewsletter` still load when those files exist.
 */
function buildE2eEnv() {
  let allPagePaths: string[] = [];
  let newsPostPaths: string[] = [];
  const expectedLabelByPath: Record<string, string | null> = {};

  try {
    allPagePaths = getAllPagePaths();
    newsPostPaths = getNewsPostPaths();

    for (const p of allPagePaths) {
      expectedLabelByPath[p] = getExpectedActiveLabel(p);
    }
  } catch (e) {
    console.warn(
      "[cypress] Run `npm run build` before E2E so dist/news exists.",
      e,
    );
  }

  return {
    allPagePaths,
    newsPostPaths,
    expectedLabelByPath,
    contact: loadJson("src/data/contact.json"),
    latestNewsletter: loadJson<{ url: string }>(
      "src/data/latest-newsletter.json",
    ),
  };
}

/**
 * Reads a JSON file from the repo root and parses it. Used for shared data
 * files that tests assert against (e.g. contact.json, latest-newsletter.json).
 *
 * @param relativePath - Path under the project root (e.g. `src/data/contact.json`),
 *   not a `file://` URL.
 * @returns The parsed JSON value, asserted as type `T` (call site chooses `T`).
 */
function loadJson<T>(relativePath: string): T {
  const raw = readFileSync(join(process.cwd(), relativePath), "utf8");

  return JSON.parse(raw) as T;
}
