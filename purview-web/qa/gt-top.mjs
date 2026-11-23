// Usage: node qa/gt-top.mjs <width> <height> <outPrefix>
import { chromium } from "@playwright/test";
const [w = "1440", hgt = "900", out = "gt"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: +w, height: +hgt } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
await page.goto("http://localhost:3200/", { waitUntil: "networkidle", timeout: 120000 });
await page.evaluate(() => { window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: false }); });
const topOf = () => page.evaluate(() => document.querySelector("section[aria-labelledby=gt-title]").getBoundingClientRect().top + scrollY);
let top = await topOf();
// approach with wheel like a visitor
while ((await page.evaluate(() => scrollY)) < top - +hgt * 1.1) { await page.mouse.wheel(0, 300); await page.waitForTimeout(35); }
await page.waitForTimeout(2200);
top = await topOf();
const countsBefore = await page.evaluate(() => [...document.querySelectorAll("[data-gt-stats] [data-count]")].map((e) => e.textContent));
for (let i = 0; i < 8; i++) { await page.mouse.wheel(0, 120); await page.waitForTimeout(30); }
await page.waitForTimeout(450);
await page.screenshot({ path: `${out}-mid.png` });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${out}-head.png` });
const mapTop = await page.evaluate(() => document.querySelector("[data-map]").getBoundingClientRect().top + scrollY);
for (let y = await page.evaluate(() => scrollY); y < mapTop - 120; y += 140) { await page.mouse.wheel(0, 140); await page.waitForTimeout(30); }
await page.waitForTimeout(500);
await page.screenshot({ path: `${out}-map-mid.png` });
await page.waitForTimeout(2200);
await page.screenshot({ path: `${out}-map.png` });
const indTop = await page.evaluate(() => document.querySelector("[data-industries]").getBoundingClientRect().top + scrollY);
for (let y = await page.evaluate(() => scrollY); y < indTop - +hgt * 0.4; y += 140) { await page.mouse.wheel(0, 140); await page.waitForTimeout(30); }
await page.waitForTimeout(2500);
await page.screenshot({ path: `${out}-ind.png` });
const countsAfter = await page.evaluate(() => [...document.querySelectorAll("[data-gt-stats] [data-count]")].map((e) => e.textContent));
const hidden = await page.evaluate(() => [...document.querySelectorAll("section[aria-labelledby=gt-title] [data-gt-line] > span, [data-gt-lead], [data-map], [data-marker], [data-gt-stat], [data-ind], [data-gt-ind-head]")].filter((e) => +getComputedStyle(e).opacity < 0.99).length);
const cls = await page.evaluate(() => window.__cls);
const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
console.log(JSON.stringify({ errors, overflowX, cls: +cls.toFixed(4), countsBefore, countsAfter, hidden }));
await browser.close();
