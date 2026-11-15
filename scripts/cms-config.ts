// Writes public/admin/config.yml, the Sveltia CMS configuration, from the
// English copy files in src/content/copy/en/ and the companies and news
// schemas below (keep them in step with src/content.config.ts). Run with
// `bun run cms` after adding, removing or renaming a key. (JSON is valid YAML.)
// `bun run build` runs it first too, so each deployment's CMS signs in on its own
// origin and commits to the branch it was built from (see src/site.config.ts).
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { editBranch, repo, siteUrl } from "../src/site.config.ts";
import { defaultLocale, localeCodes } from "../src/i18n/locales.ts";

const COPY = "src/content/copy";

/** Editor-facing names for the copy files, in menu order. */
const pages: Record<string, string> = {
  site: "Site-wide (header, footer, Group details)",
  home: "Home page",
  about: "About page",
  companies: "Companies page and company page labels",
  careers: "Careers page",
  contact: "Contact page and thank-you page",
  news: "News page",
  "not-found": "Page not found",
};

/** Nicer labels than the key names give. */
const labels: Record<string, string> = {
  nav: "Header",
  firm: "Group details",
  shareImageAlt: "Share image description",
  description: "Search and share description",
  tagline: "Tagline",
  legalName: "Legal entity name",
  contactBand: "Contact section (bottom of pages)",
  lead: "Heading",
  accent: "Gold accent",
  lede: "Introduction",
  label: "Small label above",
  sent: "Thank-you page (after sending)",
  imageAlt: "Photo description",
  photoAlt: "Photo description",
  portraitAlt: "Portrait description",
  markAlt: "Logo description",
  homeCrumb: "Home (in the page trail)",
  direct: "Companies' own contact lines (by company file name)",
  form: "Enquiry form",
  mapsUrl: "Google Maps link",
};

const hints: Record<string, string> = {
  name: "The Group's name, as shown in the header, footer and page titles.",
  accent: "The end of the heading, set in gold italic.",
};

const humanize = (key: string) =>
  labels[key] ?? key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).replace(/ (\w)/g, (m) => m.toLowerCase());

type Field = Record<string, unknown>;

/** Fields set once (in English) and copied to every language, by path. */
const shared: Record<string, string> = {
  "firm.phone": "Shown in both languages.",
  "firm.email": "Shown in both languages.",
  "apply.email": "Shown in both languages.",
  "office.mapsUrl": "The Google Maps link for the Group office, in both languages.",
  "direct.real-fresh.phone": "Shown in both languages.",
  "direct.real-fresh.email": "Shown in both languages.",
};

/** Hints for a field at a given path. */
const pathHints: Record<string, string> = {};

/** Photos: uploaded into src/assets/images/ and resized and compressed at build time. */
const imageHint = "Upload a JPG, PNG or WebP, ideally 2,500 pixels wide or more, or pick one already in the library.";

function field(name: string, value: unknown, path: string): Field {
  if (path in shared) return { name, label: humanize(name), widget: "string", i18n: "duplicate", hint: shared[path] };
  // A photo path ("/images/…"): an image picker, the same photo in every language.
  if (typeof value === "string" && value.startsWith("/images/")) {
    return { name, label: humanize(name), widget: "image", i18n: "duplicate", choose_url: false, hint: imageHint };
  }
  const base: Field = { name, label: humanize(name), i18n: true };
  if (path in pathHints) base.hint = pathHints[path];
  const hint = hints[name];
  if (hint && typeof value === "string") base.hint = hint;
  if (Array.isArray(value)) {
    const first = value[0];
    if (first && typeof first === "object") {
      return { ...base, widget: "list", fields: Object.entries(first).map(([k, v]) => field(k, v, `${path}.${k}`)) };
    }
    return { ...base, widget: "list", field: { name: "item", label: humanize(name), widget: "text", i18n: true } };
  }
  if (value && typeof value === "object") {
    return { ...base, widget: "object", collapsed: false, fields: Object.entries(value).map(([k, v]) => field(k, v, `${path}.${k}`)) };
  }
  if (typeof value === "boolean") return { ...base, widget: "boolean", required: false };
  const long = String(value).length > 70 || String(value).includes("\n");
  return { ...base, widget: long ? "text" : "string" };
}

const files = Object.keys(pages).map((page) => {
  const data = JSON.parse(readFileSync(`${COPY}/en/${page}.json`, "utf8"));
  return {
    name: page,
    label: pages[page],
    file: `${COPY}/{{locale}}/${page}.json`,
    format: "json",
    i18n: true,
    fields: Object.entries(data).map(([k, v]) => field(k, v, k)),
  };
});

const leftover = readdirSync(`${COPY}/en`).filter((f) => !(f.replace(".json", "") in pages));
if (leftover.length) throw new Error(`Add these copy files to \`pages\` in scripts/cms-config.ts: ${leftover.join(", ")}`);

// Building blocks for the collections.
const str = (name: string, label: string, extra: Field = {}): Field => ({ name, label, widget: "string", i18n: true, ...extra });
const text = (name: string, label: string, extra: Field = {}): Field => ({ name, label, widget: "text", i18n: true, ...extra });
const optional = { required: false };
/** A photo: an image picker uploading into src/assets/images/, the same photo in every language. */
const image = (name: string, label: string, extra: Field = {}): Field => ({
  name,
  label,
  widget: "image",
  i18n: "duplicate",
  choose_url: false,
  hint: imageHint,
  ...extra,
});
/** A company logo: an SVG uploaded into src/assets/logos/ and served as it is. */
const logoField: Field = {
  name: "logo",
  label: "Logo",
  widget: "image",
  i18n: "duplicate",
  choose_url: false,
  media_folder: "/src/assets/logos",
  public_folder: "/logos",
  accept: ".svg,image/svg+xml",
  hint: "An SVG file, ideally with no empty margin around the logo.",
};
const heading = (name: string, label: string): Field => ({
  name,
  label,
  widget: "object",
  i18n: true,
  fields: [str("lead", "Heading"), str("accent", "Gold accent", { hint: hints.accent })],
});
const link = (name: string, label: string, extra: Field = {}): Field => ({
  name,
  label,
  widget: "object",
  i18n: true,
  ...extra,
  fields: [
    str("label", "Link text"),
    str("href", "Link", { hint: "A page on this site (/contact/) or a full address (https://…)." }),
    { name: "external", label: "Opens another website", widget: "boolean", i18n: true, required: false },
  ],
});
const strings = (name: string, label: string, extra: Field = {}): Field => ({
  name,
  label,
  widget: "list",
  i18n: true,
  ...extra,
  field: { name: "item", label, widget: "text", i18n: true },
});
const sectionHead = [str("id", "Anchor", { hint: "Lowercase, no spaces; used in links to this section." }), str("label", "Small label above"), heading("title", "Heading"), text("lede", "Introduction", optional)];

const config = {
  backend: {
    name: "github",
    repo,
    branch: editBranch,
    // Sign-in goes through the site's own Worker (worker/index.ts), behind
    // Cloudflare Access, instead of GitHub's sign-in.
    base_url: siteUrl,
    auth_endpoint: "api/cms/auth",
    commit_messages: {
      update: "Edit {{collection}} “{{slug}}” in the CMS",
      create: "Add {{collection}} “{{slug}}” in the CMS",
      delete: "Delete {{collection}} “{{slug}}” in the CMS",
    },
  },
  site_url: siteUrl,
  display_url: siteUrl,
  // Uploads go where the site's photos live, so the build optimises them like the
  // rest. Sveltia converts uploads to WebP and caps their size before committing.
  media_folder: "src/assets/images",
  public_folder: "/images",
  media_libraries: {
    default: {
      config: {
        max_file_size: 25_000_000,
        transformations: { raster_image: { format: "webp", quality: 90, width: 3840, height: 3840 } },
      },
    },
  },
  i18n: { structure: "multiple_folders", locales: localeCodes, default_locale: defaultLocale },
  collections: [
    {
      name: "copy",
      label: "Site copy",
      description: "The words on every page, in English and Arabic.",
      i18n: true,
      files,
    },
    {
      name: "companies",
      label: "Companies",
      label_singular: "Company",
      description:
        "One entry per Group company: its home page chapter, its place in lists and its own page. A new company needs both languages, its logo and its photos.",
      folder: "src/content/companies",
      extension: "md",
      format: "frontmatter",
      i18n: true,
      create: true,
      delete: true,
      identifier_field: "name",
      slug: "{{slug}}",
      sortable_fields: ["order", "name"],
      fields: [
        str("name", "Name"),
        str("shortName", "Short name", { hint: "For the home page's chapter index." }),
        str("legalName", "Legal entity name"),
        str("sector", "Sector"),
        str("tagline", "Tagline", { hint: "One line under the name." }),
        text("summary", "Summary", { hint: "Two lines for lists, and the page's introduction." }),
        text("focus", "Focus in a sentence"),
        strings("points", "Three points (home page)", { min: 1 }),
        str("cta", "Home page link text"),
        text("description", "Search and share description"),
        heading("heroTitle", "Page heading"),
        { name: "actions", label: "Page buttons", widget: "list", i18n: true, required: false, fields: link("action", "Button").fields },
        {
          name: "facts",
          label: "Facts",
          widget: "list",
          i18n: true,
          required: false,
          fields: [str("label", "Label"), str("value", "Value")],
        },
        strings("about", "The company focus (paragraphs)", optional),
        {
          name: "development",
          label: "Development",
          widget: "object",
          i18n: true,
          fields: [
            str("label", "Small label above"),
            heading("statement", "Statement"),
            image("photo", "Photo", optional),
            str("photoAlt", "Photo description", optional),
          ],
        },
        { name: "body", label: "Development story", widget: "markdown", i18n: true, buttons: ["bold", "italic", "link"], editor_components: [] },
        {
          name: "portfolio",
          label: "Current portfolio",
          widget: "object",
          i18n: true,
          fields: [
            heading("title", "Heading"),
            text("intro", "Introduction"),
            { name: "items", label: "Items", widget: "list", i18n: true, fields: [str("title", "Title"), text("text", "Text")] },
          ],
        },
        {
          name: "extras",
          label: "Extra sections",
          widget: "list",
          i18n: true,
          required: false,
          typeKey: "kind",
          types: [
            {
              name: "lists",
              label: "Lists",
              widget: "object",
              fields: [
                ...sectionHead,
                {
                  name: "lists",
                  label: "Lists",
                  widget: "list",
                  i18n: true,
                  fields: [str("title", "Title"), strings("items", "Items"), str("note", "Note", optional)],
                },
              ],
            },
            {
              name: "features",
              label: "Features",
              widget: "object",
              fields: [
                ...sectionHead,
                {
                  name: "items",
                  label: "Items",
                  widget: "list",
                  i18n: true,
                  fields: [str("title", "Title"), text("text", "Text"), image("photo", "Photo", optional), str("photoAlt", "Photo description", optional)],
                },
                link("action", "Button", optional),
              ],
            },
            {
              name: "contact",
              label: "Contact details",
              widget: "object",
              fields: [
                ...sectionHead,
                str("address", "Address"),
                str("phone", "Telephone"),
                str("email", "Email"),
                { name: "website", label: "Website", widget: "object", i18n: true, required: false, fields: [str("label", "Link text"), str("href", "Address")] },
              ],
            },
          ],
        },
        { name: "order", label: "Order", widget: "number", value_type: "int", i18n: "duplicate", hint: "Position in every list (1 is first)." },
        logoField,
        image("cover", "Cover photo"),
        str("coverAlt", "Cover photo description"),
        image("detail", "Detail photo"),
        str("detailAlt", "Detail photo description"),
      ],
    },
    {
      name: "news",
      label: "News",
      label_singular: "Article",
      folder: "src/content/news",
      extension: "md",
      format: "frontmatter",
      i18n: true,
      create: true,
      delete: true,
      identifier_field: "title",
      sortable_fields: ["date", "title"],
      fields: [
        str("title", "Title"),
        str("accent", "Gold ending", { required: false, hint: "Optional: the title's last words, set in gold on the article's page." }),
        str("topic", "Topic", { hint: "A short label above the title." }),
        text("summary", "Summary", { hint: "Shown on cards and as the article's introduction." }),
        text("description", "Search and share description"),
        {
          name: "date",
          label: "Date",
          widget: "datetime",
          i18n: "duplicate",
          required: false,
          time_format: false,
          date_format: "YYYY-MM-DD",
          format: "YYYY-MM-DD",
        },
        { name: "order", label: "Order (undated articles)", widget: "number", value_type: "int", i18n: "duplicate", required: false, hint: "Higher comes first." },
        image("card", "Card photo"),
        str("cardAlt", "Card photo description"),
        image("photo", "Article photo"),
        str("photoAlt", "Article photo description"),
        str("caption", "Photo caption", optional),
        { name: "body", label: "Article", widget: "markdown", i18n: true },
      ],
    },
  ],
};

writeFileSync(
  "public/admin/config.yml",
  "# Generated by scripts/cms-config.ts from src/content/copy/en/. Don't edit by hand.\n" +
    JSON.stringify(config, null, 2) +
    "\n",
);
console.log(`wrote public/admin/config.yml (${files.length} copy files)`);
