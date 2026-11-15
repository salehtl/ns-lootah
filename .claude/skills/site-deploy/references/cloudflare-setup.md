# First-time Cloudflare setup

Do these in order. Each step that changes the client's account needs the user's go-ahead first. Record IDs you
create (Access AUD, team domain) in `wrangler.jsonc` vars; never commit secrets.

## 0. Before you start

- `src/site.config.ts`: `siteUrl` is the apex (`https://client.com`), `repo` is `owner/name`.
- `wrangler.jsonc`: `name` (the Worker), `SITE_NAME`, `CONTACT_FROM` (an address on the client's domain).
- The domain's zone is on Cloudflare (nameservers moved). If not, the user moves it first.
- Dry run: `bun run build && bunx wrangler deploy --dry-run`.

## 1. Workers Builds

Use Workers (static assets + a Worker), not Pages.

1. Create the Worker once (dashboard, or a first `wrangler deploy`) so a build trigger can attach to it.
2. Connect the GitHub repo (Workers → the Worker → Settings → Build). Through the API, the builds endpoints need
   the account's GitHub installation and a build token; reuse an existing build token if one exists.
3. Build command `bun run build`; deploy command `bunx wrangler deploy`; production branch `master`; non-production
   branch builds off (they would publish preview URLs).
4. Build variable `BUN_VERSION` = the Bun version from the flake (`nix develop -c bun --version`).
5. Push, and watch the first build.

## 2. Domain and www

1. Add the apex as a Custom Domain on the Worker (Settings → Domains & Routes).
2. `www`: a proxied DNS record (CNAME `www` → apex, or an `AAAA 100::`), plus a zone Redirect Rule: when the host is
   `www.<domain>`, 301 to `https://<domain>${path}`, keeping the query string. Without the rule, `www` returns 522.
3. Once the domain works, consider `workers_dev: false` in `wrangler.jsonc`.
4. Check: `curl -sI https://www.<domain>/about/` gives `301` to the apex with the path.

## 3. Contact form email

1. Onboard the domain to Email Sending (dashboard → Email → Email Sending, or `wrangler email sending enable <domain>`).
   It adds SPF and DKIM records. If the domain's mail is on Google Workspace or another provider, keep their MX
   records; leftover Email Routing MX records (route1–3.mx.cloudflare.net) beside them should be removed with the
   user's OK.
2. Deploy once with the Worker code, then set the recipient: `wrangler secret put CONTACT_TO`. (Setting it before the
   first Worker deploy can lose it.)
3. Test the error paths live (submit with an invalid email, expect `/contact/#error-invalid`). Ask before sending a
   real enquiry.

## 4. CMS: Access app and GitHub token

Editors sign in with an emailed one-time code; they never need GitHub.

1. Zero Trust → Access → Applications → Self-hosted. Name it "<Client> site editor". Domains: `<domain>/admin` and
   `<domain>/api/cms`. Identity: One-time PIN. Policy "Site editors": Allow, emails = the editors the user lists.
2. Copy the application's AUD tag and the team domain (`<team>.cloudflareaccess.com`) into `ACCESS_AUD` and
   `ACCESS_TEAM_DOMAIN` in `wrangler.jsonc`.
3. The user creates a fine-grained GitHub token: this repo only, Contents read and write, with an expiry. They set it
   with `wrangler secret put CMS_GITHUB_TOKEN`. Note the expiry date somewhere they'll see it.
4. Deploy, open `/admin`, sign in with a code, and make a trivial edit to check commits land on `master`.
5. To add or remove an editor later, edit the Access policy. Nothing in the repo changes.

## 5. Search

1. Check `https://<domain>/robots.txt` ends with the sitemap line, and `/sitemap-index.xml` lists every page in every
   language.
2. The user adds the domain to Google Search Console (DNS verification is easiest on Cloudflare) and submits
   `sitemap-index.xml`.

## 6. Hand-over notes for the user

- Who can edit (the Access policy), how to add someone.
- The token's expiry and how to replace it.
- Where enquiries go and how to change it (`CONTACT_TO`).
- What is still placeholder (`grep -rn "\[" src/content`).
