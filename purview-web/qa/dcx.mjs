// Usage: node qa/dcx.mjs <width> <height> <outPrefix>
import { chromium } from "@playwright/test";
const [w = "1440", hgt = "900", out = "dcx"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: +w, height: +hgt } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
await page.goto("http://localhost:3200/", { waitUntil: "networkidle", timeout: 120000 });
const pos = () => page.evaluate(() => { const s = document.querySelector("[data-dcx-scroll]"); const r = s.getBoundingClientRect(); return { top: r.top + scrollY, h: s.offsetHeight }; });
let { top } = await pos();
for (let y = 0; y < top; y += 350) { await page.mouse.wheel(0, 350); await page.waitForTimeout(40); }
await page.waitForTimeout(2500);
let h; ({ top, h } = await pos());
const act = [];
const overflow = [];
if (+w >= 1024) {
  const span = h - +hgt;
  for (let i = 0; i < 4; i++) {
    const target = top + ((i + 0.55) / 4) * span;
    for (let k = 3; k >= 0; k--) { await page.evaluate((v) => scrollTo(0, v), target - k * 50); await page.waitForTimeout(80); }
    await page.waitForTimeout(2400);
    act.push(await page.evaluate(() => [...document.querySelectorAll("[data-dcx-row]")].findIndex((d) => d.classList.contains("is-on"))));
    overflow.push(await page.evaluate(() => { const c = document.querySelector(".dcx-copy"); const ct = document.querySelector(".dcx-ctas").getBoundingClientRect(); return Math.round(ct.bottom - innerHeight); }));
    await page.screenshot({ path: `${out}-s${i}.png` });
  }
  await page.evaluate((v) => scrollTo(0, v), top + h - +hgt * 0.4); await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}-exit.png` });
} else {
  for (let y = top - 800; y < top + h; y += 250) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(90); }
  await page.waitForTimeout(2000);
  await page.locator("section[aria-labelledby=dc-title]").screenshot({ path: `${out}-full.png` });
}
const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
console.log(JSON.stringify({ errors, overflowX, act, ctaBelowViewport: overflow, h }));
await browser.close();
