// Screenshots of the built site (dist/) with headless Chrome, for visual review.
//
//   bun .claude/skills/site-qa/scripts/shots.ts [--out DIR] [--pages /,/about/] [--widths 1440,390] [--port 4399]
//
// Serves dist/ itself on a port root (asset paths are absolute), injecting CSS that
// shows every scroll-triggered element at once, since a full-page capture never
// scrolls them into view, and loading lazy images up front. Each page is opened in
// every locale at each width in a real-sized viewport (900px tall, 844px on
// phones), so sections sized in vh/svh keep their true height, then captured in
// full over the DevTools protocol. Long pages are split into numbered parts for
// reading; the files to look at are printed. Console errors are printed too.
// Pages render with prefers-reduced-motion, so animations show their end state.
// Needs Chrome at $PUPPETEER_EXECUTABLE_PATH (or CHROME). Run `bun run build` first.
import sharp from "sharp";
import { existsSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { defaultLocale, localeCodes } from "../../../../src/i18n/locales.ts";

const args = process.argv.slice(2);
const opt = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const root = resolve(import.meta.dir, "../../../../dist");
const out = resolve(opt("out", join(process.env.TMPDIR ?? "/tmp", "site-shots")));
const pages = opt("pages", "/,/about/,/companies/,/companies/ns-lootah-motors/,/careers/,/news/,/contact/").split(",");
const widths = opt("widths", "1440,390").split(",").map(Number);
const port = Number(opt("port", "4399"));
const chrome = process.env.CHROME ?? process.env.PUPPETEER_EXECUTABLE_PATH;

if (!existsSync(root)) throw new Error("No dist/. Run `bun run build` first.");
if (!chrome) throw new Error("Set PUPPETEER_EXECUTABLE_PATH (or CHROME) to a Chrome binary.");
mkdirSync(out, { recursive: true });

const reveal = `<style>[data-enter],[data-reveal]{opacity:1!important;transform:none!important;transition:none!important}[data-reveal]::after{display:none!important}</style>`;

const server = Bun.serve({
  port,
  async fetch(req) {
    let path = decodeURIComponent(new URL(req.url).pathname);
    if (path.endsWith("/")) path += "index.html";
    let file = Bun.file(join(root, path));
    if (!(await file.exists())) file = Bun.file(join(root, path, "index.html"));
    if (!(await file.exists())) return new Response("Not found", { status: 404 });
    if (file.type.startsWith("text/html")) {
      const html = (await file.text()).replace("</head>", `${reveal}</head>`);
      return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }
    return new Response(file);
  },
});

// A minimal DevTools-protocol client for one page.
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const debugPort = port + 1000;
const profile = mkdtempSync(join(tmpdir(), "shots-"));
const browser = Bun.spawn(
  [chrome, "--headless", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"],
  { stdout: "ignore", stderr: "ignore" },
);
let targets: { type: string; webSocketDebuggerUrl: string }[] = [];
for (let i = 0; i < 100 && !targets.some((t) => t.type === "page"); i++) {
  try {
    targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  } catch {}
  await sleep(100);
}
const ws = new WebSocket(targets.find((t) => t.type === "page")!.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let seq = 0;
const pending = new Map<number, (v: any) => void>();
const errors: string[] = [];
ws.onmessage = (m) => {
  const msg = JSON.parse(String(m.data));
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)!(msg.result ?? msg.error);
    pending.delete(msg.id);
  } else if (msg.method === "Runtime.exceptionThrown") {
    errors.push(`[exception] ${msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text}`);
  } else if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") {
    errors.push(`[error] ${msg.params.entry.text} ${msg.params.entry.url ?? ""}`);
  }
};
const send = (method: string, params: object = {}) =>
  new Promise<any>((r) => {
    const id = ++seq;
    pending.set(id, r);
    ws.send(JSON.stringify({ id, method, params }));
  });
const evaluate = (expression: string) => send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
await send("Runtime.enable");
await send("Log.enable");
await send("Page.enable");
// Reduced motion: load animations finish at once and scroll-driven ones (which a
// capture never scrolls through) stay off, so every section shows its end state.
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });

/** Splits pages taller than PART into numbered parts (-1, -2…) small enough to read. */
const PART = 2400;
async function split(file: string, height: number): Promise<string[]> {
  if (height <= PART * 1.25) return [file];
  const parts: string[] = [];
  for (let top = 0, n = 1; top < height; top += PART, n++) {
    const part = file.replace(/\.png$/, `-${n}.png`);
    await sharp(file).extract({ left: 0, top, width: (await sharp(file).metadata()).width!, height: Math.min(PART, height - top) }).toFile(part);
    parts.push(part);
  }
  return parts;
}

const written: string[] = [];
try {
  for (const locale of localeCodes) {
    for (const page of pages) {
      const path = locale === defaultLocale ? page : `/${locale}${page}`;
      for (const width of widths) {
        const phone = width < 700;
        await send("Emulation.setDeviceMetricsOverride", { width, height: phone ? 844 : 900, deviceScaleFactor: 1, mobile: phone });
        await send("Page.navigate", { url: `http://localhost:${port}${path}` });
        await sleep(400);
        // Scroll through the page as a visitor would, so lazy images load and
        // observers fire, then back to the top; wait for images and fonts.
        await evaluate(`(async () => {
          const pause = (ms) => new Promise((r) => setTimeout(r, ms));
          for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.75) {
            scrollTo(0, y);
            await pause(120);
          }
          scrollTo(0, 0);
          await document.fonts.ready;
          await Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 5000); })));
        })()`);
        await sleep(1200);
        const { cssContentSize } = await send("Page.getLayoutMetrics");
        const height = Math.ceil(cssContentSize.height);
        const { data } = await send("Page.captureScreenshot", {
          format: "png",
          captureBeyondViewport: true,
          clip: { x: 0, y: 0, width, height, scale: 1 },
        });
        const slug = page.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "home";
        const file = join(out, `${locale}-${slug}-${width}.png`);
        await Bun.write(file, Buffer.from(data, "base64"));
        written.push(...(await split(file, height)));
      }
    }
  }
} finally {
  ws.close();
  browser.kill();
  server.stop(true);
  rmSync(profile, { recursive: true, force: true });
}
console.log(written.join("\n"));
console.log(errors.length ? errors.join("\n") : "no console errors");
