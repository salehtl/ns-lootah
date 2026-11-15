// Checks the built site (dist/) for the SEO and metadata basics on every page.
//
//   bun .claude/skills/site-qa/scripts/seo-check.ts
//
// Prints one line per problem and exits 1 if there are any. Run `bun run build` first.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { siteUrl } from "../../../../src/site.config.ts";
import { localeCodes, locales } from "../../../../src/i18n/locales.ts";

const dist = resolve(import.meta.dir, "../../../../dist");
if (!existsSync(dist)) throw new Error("No dist/. Run `bun run build` first.");

const problems: string[] = [];
const flag = (page: string, msg: string) => problems.push(`${page}: ${msg}`);

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === "admin" || name === "_astro" ? [] : htmlFiles(p);
    return name.endsWith(".html") ? [p] : [];
  });
}

const attr = (html: string, re: RegExp) => html.match(re)?.[1];
const meta = (html: string, key: string) =>
  attr(html, new RegExp(`<meta (?:name|property)="${key}" content="([^"]*)"`));
const localFile = (url: string) => join(dist, new URL(url, siteUrl).pathname);

const sitemap = existsSync(join(dist, "sitemap-0.xml")) ? readFileSync(join(dist, "sitemap-0.xml"), "utf8") : "";
if (!sitemap) problems.push("sitemap-0.xml missing");
const robots = existsSync(join(dist, "robots.txt")) ? readFileSync(join(dist, "robots.txt"), "utf8") : "";
if (!robots.includes(`Sitemap: ${siteUrl}/sitemap-index.xml`)) problems.push("robots.txt has no Sitemap line for siteUrl");

for (const file of htmlFiles(dist)) {
  const page = "/" + relative(dist, file).replace(/index\.html$/, "");
  const html = readFileSync(file, "utf8");
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  const is404 = /404(\.html)?$/.test(page) || page.endsWith("/404/");

  const lang = attr(html, /<html[^>]* lang="([^"]+)"/);
  const dir = attr(html, /<html[^>]* dir="([^"]+)"/);
  if (!lang || !(lang in locales)) flag(page, `<html lang> is "${lang}"`);
  else if (dir !== locales[lang as keyof typeof locales].dir) flag(page, `<html dir> is "${dir}", expected ${locales[lang as keyof typeof locales].dir}`);

  const title = attr(html, /<title>([^<]*)<\/title>/);
  if (!title) flag(page, "no <title>");
  const desc = meta(html, "description");
  if (!desc) flag(page, "no meta description");
  // Arabic runs shorter in characters than English for the same meaning, hence the low floor.
  else if (!is404 && !noindex && (desc.length < 35 || desc.length > 170)) flag(page, `description is ${desc.length} characters (aim for 50–160)`);

  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) flag(page, `${h1s} <h1> elements`);

  for (const key of ["og:title", "og:description", "og:image", "og:url", "twitter:card", "twitter:image"]) {
    if (!meta(html, key)) flag(page, `no ${key}`);
  }
  for (const key of ["og:image", "twitter:image"]) {
    const url = meta(html, key);
    if (url && !existsSync(localFile(url))) flag(page, `${key} ${url} is not in dist/`);
  }

  if (is404 || noindex) {
    if (sitemap.includes(`<loc>${siteUrl}${page}</loc>`)) flag(page, "noindex or 404 page is in the sitemap");
    continue;
  }

  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  if (!canonical) flag(page, "no canonical");
  else if (!canonical.startsWith(siteUrl)) flag(page, `canonical ${canonical} is not on ${siteUrl}`);

  if (localeCodes.length > 1) {
    for (const code of [...localeCodes, "x-default"]) {
      if (!html.includes(`hreflang="${code}" href="${siteUrl}`)) flag(page, `no hreflang="${code}" alternate`);
    }
  }
  if (canonical && !sitemap.includes(`<loc>${canonical}</loc>`)) flag(page, "not in the sitemap");
}

if (problems.length) {
  console.log(problems.join("\n"));
  process.exit(1);
}
console.log(`OK: ${htmlFiles(dist).length} pages checked`);
