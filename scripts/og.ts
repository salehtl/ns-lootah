// Builds the share cards (public/og.jpg and og-<locale>.jpg, 1200×630): the
// towers as a pale print, the Group emblem and the home page's headline set in
// the site's own fonts. Run with `bun run og` after the headline, the emblem or
// the fonts change. Renders an HTML card per language with headless Chrome
// ($PUPPETEER_EXECUTABLE_PATH, from the flake) and converts it with sharp.
import sharp from "sharp";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { defaultLocale, locales } from "../src/i18n/locales.ts";

const root = resolve(import.meta.dir, "..");
const url = (path: string) => `file://${join(root, path)}`;
const chrome = process.env.CHROME ?? process.env.PUPPETEER_EXECUTABLE_PATH;
if (!chrome) throw new Error("Set PUPPETEER_EXECUTABLE_PATH (or CHROME) to a Chrome binary.");

const fonts = `
@font-face{font-family:Lora;src:url('${url("public/fonts/lora-variable.woff2")}');font-weight:400 700}
@font-face{font-family:Lora;src:url('${url("public/fonts/lora-italic-variable.woff2")}');font-style:italic;font-weight:400 700}
@font-face{font-family:'DM Sans';src:url('${url("public/fonts/dm-sans-medium.woff2")}');font-weight:500}
@font-face{font-family:Almarai;src:url('${url("public/fonts/almarai-arabic-700.woff2")}');font-weight:700}
@font-face{font-family:'IBM Plex Sans Arabic';src:url('${url("public/fonts/IBMPlexSansArabic-arabic-500.woff2")}');font-weight:500}`;

const work = mkdtempSync(join(tmpdir(), "og-"));
for (const [code, { dir }] of Object.entries(locales)) {
  const rtl = dir === "rtl";
  const home = JSON.parse(readFileSync(join(root, `src/content/copy/${code}/home.json`), "utf8"));
  const site = JSON.parse(readFileSync(join(root, `src/content/copy/${code}/site.json`), "utf8"));
  const html = `<!doctype html><html lang="${code}" dir="${dir}"><head><meta charset="utf-8"><style>${fonts}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px;overflow:hidden}
body{position:relative;background:#f5f5f4;color:#0a0a0a;font-family:${rtl ? "Almarai" : "Lora"}}
.bg{position:absolute;inset:0;background:url('${url("src/assets/images/profile/towers.webp")}') center/cover;filter:grayscale(1)}
.bg::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at ${rtl ? 66 : 34}% 50%,rgba(245,245,244,.6),transparent 70%),linear-gradient(rgba(245,245,244,.8),rgba(245,245,244,.8))}
.in{position:absolute;inset:0;display:flex;align-items:center;gap:72px;padding:0 88px}
.mark{width:200px;height:auto;flex:none}
h1{max-width:${rtl ? 640 : 600}px;font-weight:${rtl ? 700 : 400};font-size:${rtl ? 86 : 84}px;line-height:${rtl ? 1.3 : 1};letter-spacing:${rtl ? "normal" : "-.025em"}}
h1 em{display:block;color:#af6a03;font-style:${rtl ? "normal" : "italic"}}
p{margin-top:30px;padding-top:22px;border-top:1px solid #d7d7d2;color:#8c5502;${
    rtl
      ? "font-family:'IBM Plex Sans Arabic';font-weight:500;font-size:22px"
      : "font-family:'DM Sans';font-weight:500;font-size:15px;letter-spacing:.18em;text-transform:uppercase"
  }}
</style></head><body><div class="bg"></div><div class="in"><img class="mark" src="${url("src/assets/logos/ns-lootah-group-bronze.svg")}" alt="">
<div><h1>${home.hero.lead} <em>${home.hero.accent}</em></h1><p>${site.name} · ${rtl ? "دبي، الإمارات" : "Dubai, UAE"}</p></div></div></body></html>`;

  const page = join(work, `${code}.html`);
  const shot = join(work, `${code}.png`);
  writeFileSync(page, html);
  const run = Bun.spawnSync([
    chrome,
    "--headless",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    "--virtual-time-budget=5000",
    "--allow-file-access-from-files",
    `--screenshot=${shot}`,
    `file://${page}`,
  ]);
  if (run.exitCode !== 0) throw new Error(`Chrome failed for ${code}: ${run.stderr.toString()}`);

  const out = join(root, "public", code === defaultLocale ? "og.jpg" : `og-${code}.jpg`);
  await sharp(shot).resize(1200, 630).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log("wrote", out.split("/public/")[1]);
}
rmSync(work, { recursive: true, force: true });
