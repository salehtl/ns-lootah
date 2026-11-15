// @ts-check
import { rename, rmdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { defaultLocale, localeCodes } from "./src/i18n/locales.ts";
import { siteUrl } from "./src/site.config.ts";

// Pages that shouldn't be in search results: the thank-you page after the
// contact form, and the 404 pages.
const unlisted = /\/(contact\/sent|404)\/?$/;

// Cloudflare serves the nearest 404.html above a missing path ("404-page" in
// wrangler.jsonc). Astro writes src/pages/ar/404.astro to ar/404/index.html,
// so this moves each language's 404 page to <locale>/404.html.
/** @type {import("astro").AstroIntegration} */
const localized404 = {
  name: "localized-404",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      const out = fileURLToPath(dir);
      for (const locale of localeCodes.filter((l) => l !== defaultLocale)) {
        await rename(`${out}${locale}/404/index.html`, `${out}${locale}/404.html`);
        await rmdir(`${out}${locale}/404`);
      }
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  // English at the root (/about/), every other language under its code (/ar/about/).
  i18n: {
    defaultLocale,
    locales: localeCodes,
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    localized404,
    // sitemap-index.xml and sitemap-0.xml, with each page's other-language
    // versions listed as hreflang alternates.
    sitemap({
      filter: (page) => !unlisted.test(new URL(page).pathname),
      i18n: {
        defaultLocale,
        locales: Object.fromEntries(localeCodes.map((code) => [code, code])),
      },
    }),
  ],
});
