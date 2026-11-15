# nslootah.com

The N S Lootah Group website: a fast, static, bilingual (English and Arabic) site built with
[Astro](https://astro.build) on [Bun](https://bun.sh), made from the `salehtl/client-site-template` stack. There's
no Node and no client-side framework.

What's in it:

- Home, About, Companies (an index and one page per company), Careers, News (an index and one page per article),
  Contact (with a form and a thank-you page) and 404 pages, in English at the root and Arabic under `/ar/`, right
  to left.
- SEO basics: canonical URLs, `hreflang` alternates with `x-default`, Open Graph and Twitter tags with a share card
  per language, JSON-LD (Organization on the home page, BreadcrumbList on interior pages), a sitemap with language
  alternates, `robots.txt`, a web manifest and a full icon set.
- Sveltia CMS at `/admin`, behind Cloudflare Access, so the Group edits copy, companies and news without a GitHub
  account.
- A contact form handled by a small Worker: Cloudflare Email Sending, rate limiting, a honeypot, no JavaScript.
- Design tokens in the [DTCG](https://www.designtokens.org/tr/2025.10/format/) format, generated into CSS.
- Self-hosted fonts under the SIL Open Font License, split by script.
- Responsive AVIF and WebP photos with average-colour placeholders.

Claude Code skills for working on the site are in `.claude/skills/` (brand, content, images, deploy, QA).
`CLAUDE.md` holds the house rules, the client's rules and the design language.

## Setup

Tools come from `flake.nix`. Run `direnv allow` once, or prefix commands with `nix develop -c`.

```sh
bun install
bun run dev       # dev server (runs in the background; see below)
bun run build     # static output in dist/
bun run preview   # serve dist/
bun run tokens    # regenerate src/styles/tokens.css after editing the token file
bun run cms       # regenerate public/admin/config.yml after changing copy keys or the collections
bun run icons     # regenerate the favicon and app icons from src/assets/brand/mark.svg
bun run og        # regenerate the share cards from the home headline (needs headless Chrome)
```

The build doesn't type-check. For a type check, run `bunx astro check` (it installs `@astrojs/check` on first run).

Astro 7's dev and preview servers run in the background. Use `bun --bun astro dev logs` to see the output and
`bun --bun astro dev stop` (or `preview stop`) to stop them. Run the Astro CLI as `bun --bun astro <cmd>`; don't
add an `"astro"` script to `package.json` (it shadows the CLI and loops).

## Layout

- `src/site.config.ts`: the production URL, the GitHub repo and branch. Preview builds on Cloudflare point canonical
  and share URLs at the preview itself.
- `src/layouts/Base.astro`: the page shell (head, meta, share and hreflang tags, skip link, header, footer, the
  motion script).
- `src/views/`: one component per page. Each takes a `locale` and holds the page's markup once for every language.
  Larger pages split their sections into `src/components/<page>/`.
- `src/pages/`: thin route files. English at the root, Arabic under `src/pages/ar/`; each renders a view.
- `src/content/copy/<locale>/`: the words on every page, one JSON file per page plus `site.json` (header, footer,
  Group details), editable in the CMS. The English files define the shape; TypeScript checks the Arabic matches.
- `src/content/companies/<locale>/`: one Markdown file per company (its chapter on the home page, its row in lists
  and its own page). `src/content/news/<locale>/`: one file per article. Schemas in `src/content.config.ts`; read
  them with `getCompanies(locale)` and `getNews(locale)` from `src/lib/`, which fail the build if the languages
  don't have the same entries.
- `src/lib/media.ts`: photos and logos by key. Content names a photo as its path under `src/assets/images/` without
  the extension (`profile/motors`) and a logo as its file name in `src/assets/logos/` (`ns-lootah-motors`), so the
  key is the same in both languages. A missing file fails the build.
- `src/i18n/`: the languages (`locales.ts`), path helpers (`paths.ts`) and UI strings (`ui/en.ts`, `ui/ar.ts`),
  assembled by `ui/build.ts` from the copy files plus the labels that stay in code.
- `src/components/`: `.astro` components, each with its own scoped `<style>`: `Photo`, `PageHero`,
  `SectionHeading`, `CtaLink`, `CompanyIndex`, `ContactBand`, `Header`, `Footer`.
- `src/styles/site.tokens.json`: the design tokens, the source of truth. `src/styles/tokens.css` is generated from
  it. `src/styles/global.css` is the one global stylesheet: fonts, the language-aware type roles, primitives and
  motion.
- `src/assets/images/`: photographs, resized and converted to AVIF and WebP at build time (`profile/` holds the
  2026 Company Profile photography; `careers-team.jpg` is a generated stand-in). `src/assets/logos/`: the Group's
  and companies' logos (SVG, served as they are). `src/assets/brand/mark.svg`: the emblem the icons are built from.
- `public/fonts/`: self-hosted fonts, each with its licence. Lora and DM Sans set English; Almarai (headings) and
  IBM Plex Sans Arabic (text) set Arabic, split into Arabic and Latin files by `unicode-range`.
- `public/_redirects`: the old URLs (`/en/…`, `/ar/<company>`, `souo-moto`) redirect permanently to the new ones.
- `worker/`: the Worker for `/api/*`: the contact form (`index.ts`) and the CMS sign-in (`cms-auth.ts`).

## Languages

English lives at the root (`/about/`) and Arabic under `/ar/` (`/ar/about/`), using Astro's i18n routing
(`prefixDefaultLocale: false`). Every page exists in every language and links to its counterparts with `hreflang`
tags. Each language has its own 404 page (`ar/404.html`), moved into place by a small integration in
`astro.config.mjs`.

Layout CSS uses logical properties, so it mirrors on its own. Arabic type rules: no tracking or capitals, looser
line height, Almarai Bold for headings. Directional arrows are mirrored; photographs are not.

## Deploy

Cloudflare Workers Builds deploys every push to `master` to the Worker `nslootah`, served at **https://nslootah.com**
(a Custom Domain on the Worker): build command `bun run build`, deploy command `bunx wrangler deploy`, build variable
`BUN_VERSION`. Pages are served as static assets; only `/api/*` runs the Worker (the contact form and the CMS
sign-in). Check a deploy with the Worker's build log, then curl the live site for the change.

The site launched on 15 November 2026, when nslootah.com moved from the old Cloudflare Pages project (`ns-lootah`) to
the Worker. That project still builds `master` at ns-lootah.pages.dev, detached from the domain, as a fallback: to
roll back, remove the Worker's Custom Domain and re-add nslootah.com to the Pages project. Delete the Pages project
once that is no longer needed.

Builds of any branch but `master` count as previews (`src/site.config.ts`): canonical and share URLs point at the
preview, every page is `noindex` and `robots.txt` disallows everything.

Worker secrets (Settings → Variables and Secrets, or `wrangler secret put <NAME> --name nslootah`):

- `CONTACT_TO`: where contact enquiries go (contact@nslootah.com). Sent from `website@nslootah.com`, on
  nslootah.com's Email Sending setup.
- `CMS_GITHUB_TOKEN`: a fine-grained GitHub token for this repo only, with Contents read and write. Note its expiry:
  the CMS can't save once it lapses.

Still open: `www.nslootah.com` has no DNS record. Add one with a Redirect Rule to the apex (see the `site-deploy`
skill), and submit `sitemap-index.xml` in Google Search Console.

## Editing the copy (CMS)

The Group edits the site at `/admin`, in [Sveltia CMS](https://sveltiacms.app), with the languages side by side:

- **Site copy:** the words on every page, and each page's photos (image pickers).
- **Companies:** every company's text, logo and photos. Editors can add and remove companies; a new one needs
  both languages, an SVG logo and its photos.
- **News:** articles, with their card and article photos.

Uploaded photos are committed to `src/assets/images/` (Sveltia converts them to WebP, at most 3840px), so the build
resizes and compresses them like the rest; logos go to `src/assets/logos/`. Content stores them as `/images/…` and
`/logos/…` paths, resolved by `src/lib/media.ts`; a missing file fails the build, so the live site keeps its last
good version. The Group's own logos and the share cards stay in code (`bun run og` after the home headline or hero
photo changes).

Publishing commits to `master` (the branch the live site was built from), so the site redeploys within a minute or
two. Editors don't need a GitHub account: `/admin` and `/api/cms` sit
behind a Cloudflare Access application (email one-time code; add or remove editors in its "Site editors" policy),
and `worker/cms-auth.ts` checks the Access token and hands the CMS the `CMS_GITHUB_TOKEN` secret. If that hand-over
fails, `/admin` shows a plain message instead of a GitHub sign-in.

`public/admin/config.yml` is generated: run `bun run cms` after adding, renaming or removing a copy key or a
collection field. After a change to the copy's shape, editors must reload `/admin` before saving, or an open tab
can save the old shape.

## Keeping it light

- Use plain `.astro` components and CSS. Don't add a UI framework (React, Vue, Svelte) or Tailwind.
- Ship no client-side JS by default. The site has two small scripts: the entrance and reveal observer in
  `Base.astro`, and the chapter index on the home page.
- Add an Astro integration or npm package only for a specific need, and note why in the commit.
- Put repeated content (companies, articles) in content collections, not in page code.
