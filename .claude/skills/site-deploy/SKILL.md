---
name: site-deploy
description: Ship and operate a site made from the client-site template on Cloudflare — pushing to production, first-time Workers Builds setup, custom domain and www redirect, the contact form's Email Sending and secrets, the CMS's Cloudflare Access app and GitHub token, checking a deploy went live, and debugging a live site that looks broken. Use whenever the user says push, deploy, go live, launch, connect the domain, set up the CMS or contact form, rotate a token, or reports the live site misbehaving.
---

# Deploy and operate

## Everyday: push and verify

`master` is production; Workers Builds deploys every push in a minute or two.

1. Push only when the user asked to push in this request. Otherwise ask, saying what will go live.
   From a worktree branch: `git push origin HEAD:master` (rebase on `origin/master` first if it's moved; the CMS
   commits to master too).
2. Verify the change is live before saying so. Poll for something only the new build has:

   ```sh
   for i in $(seq 1 24); do curl -s "https://<domain>/?v=$RANDOM" | grep -q "<new string or asset hash>" && echo live && break; sleep 10; done
   ```

   Run long polls in the background. If it never appears, check the build: `gh api repos/<owner>/<repo>/commits/<sha>/check-runs`
   (the "Workers Builds: <name>" run) or the Cloudflare dashboard.
3. Tell the user it's live, and how to see it (a hard refresh if a CSS or font file name changed).

## First-time setup

Read `references/cloudflare-setup.md` and work through it in order. It covers:

- Workers Builds (connect the repo, build and deploy commands, `BUN_VERSION`).
- The custom domain, and a 301 Redirect Rule from `www` to the apex.
- Email Sending for the contact form, and the `CONTACT_TO` secret.
- The Cloudflare Access application and `CMS_GITHUB_TOKEN` for `/admin`.
- Search Console and the sitemap.

Use the Cloudflare MCP or `wrangler` (`nix shell nixpkgs#wrangler -c wrangler …`, or `bunx wrangler`) for API work.
Account-level actions (creating an Access app, a Redirect Rule, onboarding a domain to Email Sending, setting a
secret) change the client's live setup. Say what you will do and get a yes first.

## When the live site looks broken

- **Stale DNS on this machine.** A recently moved domain can still resolve to the old host locally. Test with
  `curl --resolve <domain>:443:<cloudflare-ip>` or a public resolver before debugging the site.
- **`www` returns 522.** It has a DNS record but nothing serving it: add the Redirect Rule.
- **A secret is missing.** A secret set before the first deploy that included the Worker can be lost. Re-set it
  after that deploy and confirm with `wrangler secret list`.
- **The build failed on Bun or Node version.** The build image's default Bun can be too old for Astro. Set
  `BUN_VERSION` on the build trigger to the flake's Bun version.
- **robots.txt has extra rules at the top.** Cloudflare's managed robots.txt prepends its AI-crawler block; the
  site's own rules follow it. That's expected.
- **The contact form errors.** Check `wrangler tail` while submitting. Test the error paths first; send a real
  enquiry only with the user's OK, since it lands in the client's inbox.

## Local Worker testing

`bun run build`, then `nix shell nixpkgs#wrangler -c wrangler dev --port 8788` serves `dist/` plus the Worker.
Put local secrets in `.dev.vars` (gitignored), for example `CONTACT_TO=you@example.com`. Local Email Sending
writes messages to a simulator instead of sending them. The `compatibility_date` must not be newer than local
workerd; keep it a little in the past.
