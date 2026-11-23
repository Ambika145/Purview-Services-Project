// Usage: node qa/clients.mjs <width> <outPrefix>
import { chromium } from "@playwright/test";
const [w = "1440", out = "clients"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: +w, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
await page.goto("http://localhost:3200/", { waitUntil: "networkidle", timeout: 120000 });
const top = await page.evaluate(() => document.querySelector("#clients").getBoundingClientRect().top + scrollY);
const h = await page.evaluate(() => document.querySelector("#clients").offsetHeight);
// mid-animation frame
await page.evaluate((y) => window.scrollTo(0, y), top - 500);
await page.waitForTimeout(2500);
await page.evaluate((y) => window.scrollTo(0, y), top - 200);
await page.waitForTimeout(350);
await page.screenshot({ path: `${out}-mid.png` });
for (let y = top - 600; y < top + h; y += 300) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
await page.waitForTimeout(2000);
await page.locator("#clients").screenshot({ path: `${out}-full.png` });
const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
const hidden = await page.evaluate(() => [...document.querySelectorAll("#clients [data-gtc-fact],#clients [data-gtp-tab],#clients .gtp-stage,#clients [data-gtc-cred],#clients [data-gtc-band]")].filter(e => +getComputedStyle(e).opacity < 0.99).length);
if (+w >= 1024) { await page.hover("#clients [data-gtp-tab]:nth-child(2)"); await page.waitForTimeout(900); await page.locator("#clients .gtp").screenshot({ path: `${out}-tab2.png` }); }
const nums = await page.evaluate(() => [...document.querySelectorAll("[data-gt-num]")].map(e => e.textContent));
console.log(JSON.stringify({ errors, overflowX, hidden, nums, h }));
await browser.close();
