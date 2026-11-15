// Sets a new client's identity everywhere the template keeps it. Run once, right
// after creating the repo from the template:
//
//   bun run setup --name "Sahel Dental" --domain saheldental.ae --repo salehtl/saheldental.ae \
//     [--name-ar "عيادة ساحل"] [--description "One line about the firm."] [--og-locale en_AE,ar_AE] \
//     [--city 24.4539,54.3773] [--worker saheldental]
//
// It edits: src/site.config.ts, package.json, wrangler.jsonc, public/site.webmanifest,
// public/admin/index.html, src/content/copy/<locale>/site.json (name, legal-entity
// placeholder untouched), src/i18n/locales.ts (Open Graph locales) and
// src/lib/office-map.ts (default map centre). Then run `bun run cms` and `bun run build`.
// Brand colours, mark, fonts and copy are separate steps (see the site-brand and
// site-content skills).
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const opt = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const name = opt("name");
const domain = opt("domain")?.replace(/^https?:\/\//, "").replace(/\/$/, "");
const repo = opt("repo");
if (!name || !domain || !repo) {
  console.error('Usage: bun run setup --name "Client" --domain client.com --repo owner/name [--name-ar …] [--description …] [--og-locale en_AE,ar_AE] [--city lat,lon] [--worker name]');
  process.exit(1);
}
const nameAr = opt("name-ar");
const description = opt("description");
const ogLocales = opt("og-locale")?.split(",");
const city = opt("city")?.split(",").map(Number);
const worker = opt("worker") ?? domain.replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase();

const changed: string[] = [];
function edit(path: string, fn: (text: string) => string) {
  if (!existsSync(path)) return;
  const before = readFileSync(path, "utf8");
  const after = fn(before);
  if (after !== before) {
    writeFileSync(path, after);
    changed.push(path);
  }
}
const jsonString = (s: string) => JSON.stringify(s);

edit("src/site.config.ts", (t) =>
  t
    .replace(/export const siteUrl = "[^"]*";/, `export const siteUrl = "https://${domain}";`)
    .replace(/export const repo = "[^"]*";/, `export const repo = "${repo}";`),
);

edit("package.json", (t) => t.replace(/"name": "[^"]*"/, `"name": ${jsonString(worker)}`));

edit("wrangler.jsonc", (t) =>
  t
    .replace(/"name": "[^"]*"/, `"name": ${jsonString(worker)}`)
    .replace(/"SITE_NAME": "[^"]*"/, `"SITE_NAME": ${jsonString(name)}`)
    .replace(/"CONTACT_FROM": "[^"]*"/, `"CONTACT_FROM": "website@${domain}"`),
);

edit("public/site.webmanifest", (t) => {
  const m = JSON.parse(t);
  m.name = name;
  m.short_name = name;
  if (description) m.description = description;
  return JSON.stringify(m, null, 2) + "\n";
});

edit("public/admin/index.html", (t) =>
  t.replace(/<title>Edit the site · [^<]*<\/title>/, `<title>Edit the site · ${name.replace(/&/g, "&amp;")}</title>`),
);

edit("src/content/copy/en/site.json", (t) => {
  const s = JSON.parse(t);
  s.name = name;
  if (description) s.description = description;
  return JSON.stringify(s, null, 2) + "\n";
});
if (nameAr) {
  edit("src/content/copy/ar/site.json", (t) => {
    const s = JSON.parse(t);
    s.name = nameAr;
    return JSON.stringify(s, null, 2) + "\n";
  });
}

if (ogLocales) {
  edit("src/i18n/locales.ts", (t) => {
    let i = 0;
    return t.replace(/ogLocale: "[^"]*"/g, (m) => (ogLocales[i] ? `ogLocale: "${ogLocales[i++]}"` : m));
  });
}

if (city && city.length === 2 && city.every(Number.isFinite)) {
  edit("src/lib/office-map.ts", (t) => t.replace(/const city: LatLon = \[[^\]]*\];/, `const city: LatLon = [${city[0]}, ${city[1]}];`));
}

console.log(changed.length ? `updated:\n  ${changed.join("\n  ")}` : "nothing to change");
console.log("next: bun run cms && bun run build. Still to do by hand: brand (tokens, mark, fonts), copy, photos, theme-color in Base.astro if the page background isn't white.");
