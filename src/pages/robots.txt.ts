// robots.txt, built from `site` in astro.config.mjs so the domain lives in one place.
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) =>
  new Response(
    ["User-agent: *", "Disallow: /admin/", "Disallow: /api/", "", `Sitemap: ${new URL("sitemap-index.xml", site)}`, ""].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
