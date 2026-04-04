import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * One entry from `topLevelRoutes.json`: a single path string key mapped to
 * its nav label.
 */
export type RouteEntry = Record<string, string>;

/**
 * Loads the site’s top-level route list (home + main sections), same source as `Nav.astro`.
 *
 * @returns Parsed contents of `src/data/topLevelRoutes.json`.
 */
function loadTopLevelRoutes(): RouteEntry[] {
  const raw = readFileSync(
    join(process.cwd(), "src/data/topLevelRoutes.json"),
    "utf8",
  );

  return JSON.parse(raw) as RouteEntry[];
}

/**
 * Lists `/news/<slug>` pathnames using **built** output under `dist/news/<slug>/`, so slugs match
 * Astro’s routing (filenames in `src/content/news` are slugified).
 *
 * @returns Sorted path strings, e.g. `["/news/covered-dish-2024-03-05", ...]`.
 * @throws If `dist/news` is missing (run `astro build` before relying on this).
 */
export function getNewsPostPaths(): string[] {
  const distNewsPath = join(process.cwd(), "dist/news");

  if (!existsSync(distNewsPath)) {
    throw new Error(
      "dist/news not found — run `npm run build` before E2E so slugs match the site.",
    );
  }

  return readdirSync(distNewsPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => `/news/${d.name}`)
    .sort((a, b) => a.localeCompare(b));
}

/**
 * Every pathname used by the every-page spec: top-level routes from `topLevelRoutes.json` plus
 * each news post path from the build output.
 *
 * @returns Sorted unique pathnames (e.g. `/`, `/about`, …, `/news`, `/news/foo`, …).
 */
export function getAllPagePaths(): string[] {
  const routes = loadTopLevelRoutes();
  const paths = new Set<string>();

  for (const route of routes) {
    const [path] = Object.entries(route)[0];

    paths.add(path);
  }

  for (const p of getNewsPostPaths()) {
    paths.add(p);
  }

  return [...paths].sort((a, b) => a.localeCompare(b));
}

/**
 * For a given URL path, determine the expected single active nav link label.
 * Home has no active nav link (`null`). Tie-breaking when two (or more) configured
 * routes could both claim the same page: pick the most specific one (longest matching path).
 *
 * @param pathname - URL pathname (e.g. `/news/some-slug`).
 * @returns Nav label string (`"About"`, `"News"`, …) or `null` for `/` or unmatched paths.
 */
export function getExpectedActiveLabel(pathname: string): string | null {
  if (pathname === "/") return null;

  const routes = loadTopLevelRoutes();
  const matches: { path: string; label: string }[] = [];

  for (const route of routes) {
    const [path, label] = Object.entries(route)[0];

    if (path === "/") continue;

    if (pathname === path || pathname.startsWith(`${path}/`)) {
      matches.push({ path, label });
    }
  }

  if (matches.length === 0) return null;

  matches.sort((a, b) => b.path.length - a.path.length);

  return matches[0].label;
}
