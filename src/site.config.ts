// The few per-client settings that code and scripts share. astro.config.mjs,
// scripts/cms-config.ts, the robots.txt route and Base.astro read them from here.
// (The Worker's settings live in wrangler.jsonc vars.)

/** The production origin, no trailing slash. */
export const productionUrl = "https://nslootah.com";

/** The address a Workers build of any other branch is described as (it served the site before
 *  launch; no domain points at it now). Pages branch previews use their own pages.dev URL. */
export const previewUrl = "https://preview.nslootah.com";

/** The GitHub repository the CMS commits to, as "owner/name". */
export const repo = "salehtl/ns-lootah";

/** The branch that deploys to production. */
export const branch = "master";

// Which build this is. Cloudflare sets these during builds: Workers Builds the
// WORKERS_CI_* variables, Pages the CF_PAGES_* ones. A local build is production.
const env = globalThis.process?.env ?? {};
const builtBranch = env.WORKERS_CI_BRANCH || env.CF_PAGES_BRANCH || branch;
const pagesPreviewUrl = env.CF_PAGES === "1" && builtBranch !== branch ? env.CF_PAGES_URL : undefined;

/** True for a build of any branch but production: kept out of search engines. */
export const isPreview = builtBranch !== branch;

/** The origin this build is served from. Canonical URLs, sitemap and share tags use it,
 *  so a shared preview link unfurls with its own share card. */
export const siteUrl = isPreview ? pagesPreviewUrl || previewUrl : productionUrl;

/** The branch the CMS commits to: the one this build came from, so edits made on the
 *  preview land on the preview's branch and redeploy it. */
export const editBranch = builtBranch;
