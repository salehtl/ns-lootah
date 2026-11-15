import { defineConfig } from "astro/config";

// Cloudflare Pages preview builds (any branch but master) point canonical,
// hreflang and Open Graph URLs at the preview deployment itself, so a shared
// preview link unfurls with its own share image. Production stays on nslootah.com.
const { CF_PAGES, CF_PAGES_BRANCH, CF_PAGES_URL } = process.env;
const isPreview = CF_PAGES === "1" && CF_PAGES_BRANCH !== "master" && Boolean(CF_PAGES_URL);

export default defineConfig({
  site: isPreview ? CF_PAGES_URL : "https://nslootah.com",
  output: "static",
});
