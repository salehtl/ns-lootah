// The few per-client settings that code and scripts share. astro.config.mjs,
// scripts/cms-config.ts and the robots.txt route read them from here.
// (The Worker's settings live in wrangler.jsonc vars.)

/** The production origin, no trailing slash. */
export const productionUrl = "https://nslootah.com";

/** The GitHub repository the CMS commits to, as "owner/name". */
export const repo = "salehtl/ns-lootah";

/** The branch that deploys to production, and that the CMS commits to. */
export const branch = "master";

// Cloudflare preview builds (any other branch) point canonical, hreflang and
// share URLs at the preview deployment itself, so a shared preview link
// unfurls with its own share card. Pages sets CF_PAGES_*; production is unchanged.
const env = globalThis.process?.env ?? {};
const previewUrl = env.CF_PAGES === "1" && env.CF_PAGES_BRANCH !== branch ? env.CF_PAGES_URL : undefined;

/** The origin this build is served from. Canonical URLs, sitemap and share tags use it. */
export const siteUrl = previewUrl || productionUrl;
