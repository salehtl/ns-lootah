// The site is static. This Worker only handles POST /api/contact and the CMS
// sign-in at /api/cms/auth (see cms-auth.ts), routed here by
// `assets.run_worker_first` in wrangler.jsonc; every other request is served
// from the static assets.
//
// The contact form posts as a plain HTML form (no JavaScript). On success the
// visitor is redirected to /contact/sent/; on a problem, back to the form with
// a #fragment that reveals the matching message (see the :target styles in
// src/views/ContactPage.astro).

import { handleCmsAuth, handleCmsToken, type CmsEnv } from "./cms-auth";

interface Env extends CmsEnv {
  ASSETS: { fetch(request: Request | string): Promise<Response> };
  EMAIL: {
    send(message: {
      to: string | { email: string; name?: string };
      from: string | { email: string; name?: string };
      replyTo?: string | { email: string; name?: string };
      subject: string;
      text?: string;
      html?: string;
    }): Promise<{ messageId: string }>;
  };
  CONTACT_LIMIT: { limit(options: { key: string }): Promise<{ success: boolean }> };
  /** Where enquiries go. Set as a Worker secret, not in the repo. */
  CONTACT_TO: string;
  /** The sender, on a domain onboarded to Cloudflare Email Sending (wrangler.jsonc vars). */
  CONTACT_FROM: string;
  /** The site's name, for the sender name and the email text (wrangler.jsonc vars). */
  SITE_NAME: string;
}

const LIMITS = { name: 120, email: 254, phone: 40, company: 80, message: 5000 };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact" || url.pathname === "/api/contact/") {
      return handleContact(request, env, url);
    }
    if (url.pathname === "/api/cms/auth") {
      return handleCmsAuth(request, env, url);
    }
    if (url.pathname === "/api/cms/token") {
      return handleCmsToken(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request: Request, env: Env, url: URL): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });
  }

  const form = await request.formData().catch(() => null);
  const field = (name: string) => String(form?.get(name) ?? "").trim();

  // Arabic pages post lang=ar so the visitor lands back on Arabic pages.
  const base = field("lang") === "ar" ? "/ar" : "";
  const back = (fragment: string) => redirect(url, `${base}/contact/#${fragment}`);

  // Only accept posts from this site's own pages.
  const origin = request.headers.get("Origin");
  if (origin && origin !== url.origin) {
    return new Response("Forbidden", { status: 403 });
  }

  // Honeypot: a field hidden from people. Bots that fill it get a quiet "success".
  // (Not named "company": that is the form's real Company field.)
  if (field("website")) {
    return redirect(url, `${base}/contact/sent/`);
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const { success: allowed } = await env.CONTACT_LIMIT.limit({ key: `contact:${ip}` });
  if (!allowed) return back("error-limit");

  const data = {
    name: field("name"),
    email: field("email"),
    phone: field("phone"),
    company: field("company"),
    message: field("message"),
    consent: field("consent"),
  };

  const tooLong = (Object.keys(LIMITS) as (keyof typeof LIMITS)[]).some((k) => data[k].length > LIMITS[k]);
  const validEmail = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]+$/.test(data.email);
  if (!data.name || !validEmail || !data.message || !data.consent || tooLong) {
    return back("error-invalid");
  }
  if (!env.CONTACT_TO) {
    console.error("contact: CONTACT_TO secret is not set");
    return back("error-send");
  }

  const company = data.company || "Not specified";
  const lines = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "Not given"],
    ["Company", company],
    ["Page language", base ? "Arabic" : "English"],
  ];

  const text = [
    `New enquiry from the ${env.SITE_NAME} website.`,
    "",
    ...lines.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    data.message,
    "",
    "Reply to this email to answer the sender directly.",
  ].join("\n");

  const html = `<!doctype html><html><body style="font-family: Arial, sans-serif; color: #000000; line-height: 1.5">
<p>New enquiry from the ${esc(env.SITE_NAME)} website.</p>
<table cellpadding="6" style="border-collapse: collapse">${lines
    .map(([k, v]) => `<tr><td style="color:#6b6b6b">${esc(k)}</td><td>${esc(v)}</td></tr>`)
    .join("")}</table>
<p style="color:#6b6b6b; margin-top: 16px">Message</p>
<p style="white-space: pre-wrap">${esc(data.message)}</p>
<p style="color:#6b6b6b; font-size: 13px">Reply to this email to answer the sender directly.</p>
</body></html>`;

  try {
    await env.EMAIL.send({
      to: env.CONTACT_TO,
      from: { email: env.CONTACT_FROM, name: `${env.SITE_NAME} website` },
      replyTo: { email: data.email, name: data.name },
      subject: `Website enquiry: ${company} · ${data.name}`.slice(0, 200),
      text,
      html,
    });
  } catch (error) {
    const e = error as { code?: string; message?: string };
    console.error("contact: send failed", e.code, e.message);
    return back("error-send");
  }

  return redirect(url, `${base}/contact/sent/`);
}

function redirect(url: URL, path: string): Response {
  return Response.redirect(new URL(path, url.origin).toString(), 303);
}

function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
