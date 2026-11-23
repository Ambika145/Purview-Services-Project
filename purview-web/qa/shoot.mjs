// Usage: node qa/shoot.mjs <path> <width> <height> <out.png> [fullPage] [scrollY]
import { chromium } from "@playwright/test";
const [path = "/", w = "1440", h = "900", out = "shot.png", full = "0", sy = "0", reduce = "0"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: +w, height: +h }, reducedMotion: reduce === "1" ? "reduce" : "no-preference" });
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(m.type() + ": " + m.text()); });
await page.goto("http://localhost:3100" + path, { waitUntil: "networkidle", timeout: 120000 });
if (+sy) { await page.evaluate((y) => window.scrollTo(0, y), +sy); }
if (full === "1") {
  // reveal everything for a full-page capture
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); document.querySelectorAll('[data-reveal]').forEach(e => e.classList.add('is-in')); });
}
await page.waitForTimeout(3500);
await page.screenshot({ path: out, fullPage: full === "1" });
console.log(JSON.stringify({ errors: errors.slice(0, 15), docH: await page.evaluate(() => document.documentElement.scrollHeight), overflowX: await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth) }));
await browser.close();
