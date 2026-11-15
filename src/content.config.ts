import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Repeated content, one Markdown file per entry and language:
// src/content/<collection>/<locale>/<slug>.md. Entry ids are "<locale>/<slug>".
// Read them through src/lib/companies.ts and src/lib/news.ts, which filter by
// language and fail the build if the languages don't have the same entries.
//
// Photos and logos are named by key, not path: "profile/motors" is
// src/assets/images/profile/motors.(webp|jpg…), "ns-lootah-motors" is
// src/assets/logos/ns-lootah-motors.svg (see src/lib/media.ts). Keys are the same
// in every language; alt text is per language.

/** A heading that ends in the gold accent: `{lead} <span class="gi">{accent}</span>`. */
const accentTitle = z.object({ lead: z.string(), accent: z.string() });

/** A link: a site path without the language ("/contact/"), an in-page anchor ("#…") or a full URL. */
const action = z.object({ label: z.string(), href: z.string(), external: z.boolean().default(false) });

const extra = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("lists"),
    id: z.string(),
    label: z.string(),
    title: accentTitle,
    lede: z.string().optional(),
    lists: z.array(z.object({ title: z.string(), items: z.array(z.string()), note: z.string().optional() })),
  }),
  z.object({
    kind: z.literal("features"),
    id: z.string(),
    label: z.string(),
    title: accentTitle,
    lede: z.string().optional(),
    items: z.array(
      z.object({ title: z.string(), text: z.string(), photo: z.string().optional(), photoAlt: z.string().optional() }),
    ),
    action: action.optional(),
  }),
  z.object({
    kind: z.literal("contact"),
    id: z.string(),
    label: z.string(),
    title: accentTitle,
    lede: z.string().optional(),
    address: z.string(),
    phone: z.string(),
    email: z.string(),
    website: z.object({ label: z.string(), href: z.string() }).optional(),
  }),
]);

// One file per Group company. The Markdown body is the "development" story on
// the company's page, under its statement.
const companies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/companies" }),
  schema: z.object({
    /** Position in every list and the chapter number (1 is first). */
    order: z.number(),
    name: z.string(),
    /** Short name for the home page's chapter index. */
    shortName: z.string(),
    legalName: z.string(),
    sector: z.string(),
    /** Logo key, a file in src/assets/logos/ (without .svg). */
    logo: z.string(),
    /** One line, set in the display face under the name. */
    tagline: z.string(),
    /** Two lines for lists, and the page's lede. */
    summary: z.string(),
    /** The company's focus in a sentence (company index). */
    focus: z.string(),
    /** Three short points for the home page chapter. */
    points: z.array(z.string()).min(1),
    /** The chapter's link label ("Discover N S Lootah Motors"). */
    cta: z.string(),
    /** Photo keys and alt text: cover (chapters, heroes) and detail (cards). */
    cover: z.string(),
    coverAlt: z.string(),
    detail: z.string(),
    detailAlt: z.string(),
    /** Search and share description for the company's page. */
    description: z.string(),
    heroTitle: accentTitle,
    actions: z.array(action).default([]),
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    /** The "company focus" paragraphs on its page. */
    about: z.array(z.string()).default([]),
    development: z.object({
      label: z.string(),
      statement: accentTitle,
      photo: z.string().optional(),
      photoAlt: z.string().optional(),
    }),
    portfolio: z.object({
      title: accentTitle,
      intro: z.string(),
      items: z.array(z.object({ title: z.string(), text: z.string() })),
    }),
    extras: z.array(extra).default([]),
  }),
});

// News articles. The Markdown body is the article; a > blockquote with a
// final "— Name, Role" line is set as a pull quote.
const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    /** The last words of the title, set in gold on the article's page ("in Dubai"). Optional. */
    accent: z.string().optional(),
    /** Topic label above the title ("Sustainable mobility"). */
    topic: z.string(),
    /** Shown on cards and as the article's lede. */
    summary: z.string(),
    /** Search and share description. */
    description: z.string(),
    /** Publication date, if known (YYYY-MM-DD). Articles without one sort by `order`. */
    date: z.coerce.date().optional(),
    /** Newest first among undated articles: higher comes first. */
    order: z.number().default(0),
    /** Card photo (lists, home page) and the article's own photo. */
    card: z.string(),
    cardAlt: z.string(),
    photo: z.string(),
    photoAlt: z.string(),
    caption: z.string().optional(),
  }),
});

export const collections = { companies, news };
