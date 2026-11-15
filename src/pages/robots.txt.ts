// robots.txt, built from `site` in astro.config.mjs so the domain lives in one place.
// Preview builds ask every crawler to stay out.
import type { APIRoute } from "astro";
import { isPreview } from "../site.config";

export const GET: APIRoute = ({ site }) =>
  new Response(
    (isPreview
      ? ["User-agent: *", "Disallow: /", ""]
      : ["User-agent: *", "Disallow: /admin/", "Disallow: /api/", "", `Sitemap: ${new URL("sitemap-index.xml", site)}`, ""]
    ).join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
