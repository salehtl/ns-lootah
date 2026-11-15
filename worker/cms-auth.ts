// Sign-in for the CMS at /admin, without a GitHub account for the editor.
//
// /admin and /api/cms/* sit behind a Cloudflare Access application, which asks
// for an allowed email address and a one-time code. Sveltia CMS then opens
// /api/cms/auth in a popup, as it would for GitHub's OAuth. This handler checks
// the Access token on the request and hands the CMS a fine-grained GitHub token
// (CMS_GITHUB_TOKEN, a Worker secret) that can only read and write this repo's
// contents. Every edit becomes a commit on master, which Workers Builds deploys.
//
// The popup protocol is the one Decap and Sveltia CMS use for external OAuth
// clients: the popup posts "authorizing:github" to the opener, waits for the
// same message back, then posts "authorization:github:success:{token}" to it.

export interface CmsEnv {
  /** Fine-grained GitHub token: this repo only, Contents read and write. */
  CMS_GITHUB_TOKEN?: string;
  /** The Zero Trust team domain, e.g. grey-pigeon.cloudflareaccess.com. */
  ACCESS_TEAM_DOMAIN?: string;
  /** The Access application's audience (AUD) tag. */
  ACCESS_AUD?: string;
}

type Check = { token: string } | { error: string; status: number };

/** The GitHub token, if the request carries a valid Access sign-in for the editor app. */
async function check(request: Request, env: CmsEnv): Promise<Check> {
  if (!env.CMS_GITHUB_TOKEN || !env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) {
    console.error("cms-auth: CMS_GITHUB_TOKEN, ACCESS_TEAM_DOMAIN or ACCESS_AUD is not set");
    return { error: "The editor isn't set up yet. Please contact the site's developer.", status: 503 };
  }
  const jwt = request.headers.get("Cf-Access-Jwt-Assertion");
  const email = jwt && (await verifyAccessJwt(jwt, env.ACCESS_TEAM_DOMAIN, env.ACCESS_AUD));
  if (!email) {
    return { error: "Your sign-in couldn't be confirmed. Reload the page and sign in again.", status: 403 };
  }
  console.log("cms-auth: signed in", email);
  return { token: env.CMS_GITHUB_TOKEN };
}

/** GET /api/cms/token: the token as JSON. public/admin/index.html calls this so the
 *  CMS starts signed in, without its own sign-in screen. */
export async function handleCmsToken(request: Request, env: CmsEnv): Promise<Response> {
  const result = await check(request, env);
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store" };
  if ("error" in result) return new Response(JSON.stringify({ error: result.error }), { status: result.status, headers });
  return new Response(JSON.stringify({ token: result.token }), { headers });
}

/** GET /api/cms/auth: the popup behind the CMS's "Sign In with GitHub" button, as a fallback. */
export async function handleCmsAuth(request: Request, env: CmsEnv, url: URL): Promise<Response> {
  const result = await check(request, env);
  return "error" in result ? page(url, { error: result.error }, result.status) : page(url, { token: result.token });
}

/** The popup page that passes the result to the CMS window, on this site's origin only. */
function page(url: URL, result: { token?: string; error?: string }, status = 200): Response {
  const state = result.token ? "success" : "error";
  const content = result.token ? { provider: "github", token: result.token } : { provider: "github", error: result.error };
  const message = `authorization:github:${state}:${JSON.stringify(content)}`;
  const js = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
  return new Response(
    `<!doctype html><html><body><script>
      (() => {
        const origin = ${js(url.origin)};
        const handshake = "authorizing:github";
        window.addEventListener("message", (event) => {
          if (event.origin !== origin || event.data !== handshake) return;
          window.opener?.postMessage(${js(message)}, origin);
        });
        window.opener?.postMessage(handshake, origin);
      })();
    </script></body></html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
      },
    },
  );
}

// Access signs its token with RS256; the public keys are published per team.
let certs: { keys: (JsonWebKey & { kid: string })[]; fetched: number } | undefined;

async function accessKeys(team: string, refresh = false) {
  if (!certs || refresh || Date.now() - certs.fetched > 60 * 60 * 1000) {
    const response = await fetch(`https://${team}/cdn-cgi/access/certs`);
    const body = (await response.json()) as { keys: (JsonWebKey & { kid: string })[] };
    certs = { keys: body.keys, fetched: Date.now() };
  }
  return certs.keys;
}

const b64url = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));
const decode = (s: string) => JSON.parse(new TextDecoder().decode(b64url(s)));

/** Returns the signed-in email when the token is valid for this application, otherwise null. */
async function verifyAccessJwt(jwt: string, team: string, aud: string): Promise<string | null> {
  try {
    const [h, p, sig] = jwt.split(".");
    const header = decode(h) as { alg: string; kid: string };
    const payload = decode(p) as { aud: string | string[]; exp: number; iss: string; email?: string };
    if (header.alg !== "RS256") return null;

    let jwk = (await accessKeys(team)).find((k) => k.kid === header.kid);
    if (!jwk) jwk = (await accessKeys(team, true)).find((k) => k.kid === header.kid);
    if (!jwk) return null;

    const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
    const valid = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64url(sig), new TextEncoder().encode(`${h}.${p}`));
    const auds = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    const now = Date.now() / 1000;
    if (!valid || !auds.includes(aud) || payload.exp < now || payload.iss !== `https://${team}`) return null;
    return payload.email ?? "unknown";
  } catch {
    return null;
  }
}
