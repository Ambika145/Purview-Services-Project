// Usage: node qa/beyond.mjs <width> <outPrefix>
import { chromium } from "@playwright/test";
const [w = "1440", out = "beyond"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: +w, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
await page.goto("http://localhost:3200/", { waitUntil: "networkidle", timeout: 120000 });
const sec = "section[aria-labelledby=beyond-title]";
const top = await page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY, sec);
const h = await page.evaluate((s) => document.querySelector(s).offsetHeight, sec);
for (let y = 0; y < top + 2000; y += 400) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(60); }
const t2 = await page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY, sec);
await page.evaluate((v) => scrollTo(0, v), t2 - 100);
await page.waitForTimeout(4000);
await page.screenshot({ path: `${out}-head.png` });
const active = [];
for (let i = 0; i < 4; i++) {
  const ry = await page.evaluate((k) => document.querySelectorAll("[data-by-row]")[k].getBoundingClientRect().top + scrollY, i);
  for (let k = 0; k < 4; k++) { await page.evaluate((v) => scrollTo(0, v), ry - 300 - (3 - k) * 80); await page.waitForTimeout(90); }
  await page.waitForTimeout(3500);
  active.push(await page.evaluate(() => [...document.querySelectorAll("[data-by-row]")].findIndex((r) => r.classList.contains("is-active"))));
  await page.screenshot({ path: `${out}-row${i}.png` });
}
const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
const body = await page.evaluate(() => [...document.querySelectorAll(".by-body")].map((b) => getComputedStyle(b).opacity + "|" + Math.round(b.getBoundingClientRect().height)));
console.log(JSON.stringify({ body, errors, overflowX, active, h }));
await browser.close();
