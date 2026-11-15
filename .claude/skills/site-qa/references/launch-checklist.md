# Launch checklist

Go through it with the user; report "done and checked" and "still open (who acts)".

## Content

- [ ] No `[bracketed]` placeholders left: `grep -rn "\[" src/content` (Arabic uses the same brackets).
- [ ] Names, address, phone, email, hours, licence or registration line, registered company name: confirmed by the
      client, in every language.
- [ ] Wording the client is particular about (titles, regulated terms, place names) checked against what they said.
- [ ] Office address and the Google Maps link in `src/content/copy/<locale>/contact.json` are right.
- [ ] The phone number in `site.json` is real, so the "Call" button links to it (it has no link while it's a
      placeholder).
- [ ] Facts and numbers on the home page confirmed.
- [ ] Privacy notice linked from the contact form's consent line, if the client has one.

## Brand and images

- [ ] Every font's licence allows self-hosted web use; licence files are in `public/fonts/`.
- [ ] Photos are licensed or the client's own. Generated stand-ins (especially of real places or people) are replaced
      or the client has accepted them.
- [ ] Icons and share cards regenerated from the final mark and hero (`bun run icons`, `bun run og`).

## SEO

- [ ] `src/site.config.ts` `siteUrl` is the production domain.
- [ ] `seo-check.ts` passes.
- [ ] `ogLocale` values in `src/i18n/locales.ts` match the client's market (the template uses `en_AE` / `ar_AE`).
- [ ] Search Console verified, `sitemap-index.xml` submitted.

## Platform

- [ ] Custom domain serves the site over HTTPS; `www` 301s to the apex with path and query.
- [ ] `workers_dev` turned off if the workers.dev URL shouldn't stay public.
- [ ] Contact form: error paths tested live; one real enquiry sent with the user's OK and received in the client's
      inbox (check spam); `CONTACT_TO` is the client's address.
- [ ] `/admin`: an editor can sign in with a one-time code and save; the save deploys. The GitHub token's expiry is
      written down for the user.
- [ ] Email DNS sane: SPF, DKIM for Email Sending; the client's own MX untouched; no stray MX records.

## Quality

- [ ] Screenshots of every page in every language at 1440 and 390 reviewed.
- [ ] Checked in Safari (or say it wasn't).
- [ ] Lighthouse or PageSpeed Insights on the live home page in both languages (performance, accessibility, SEO);
      note the scores.
- [ ] Keyboard: tab through header, menu, form; focus is visible.
