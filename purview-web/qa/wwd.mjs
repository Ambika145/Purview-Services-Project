// Usage: node qa/wwd.mjs <width> <outPrefix>
import { chromium } from "@playwright/test";
const [w = "1440", out = "wwd"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: +w, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
await page.goto("http://localhost:3200/", { waitUntil: "networkidle", timeout: 120000 });
const pos = () => page.evaluate(() => { const s = document.querySelector("[data-wwd-scroll]"); const r = s.getBoundingClientRect(); return { top: r.top + scrollY, h: s.offsetHeight }; });
let { top, h } = await pos();
for (let y = 0; y < top; y += 300) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(50); }
await page.waitForTimeout(2500);
({ top, h } = await pos());
const open = [];
if (+w >= 1024) {
  const span = h - 900;
  for (let i = 0; i < 5; i++) {
    const target = top + ((i + 0.5) / 5) * span;
    for (let k = 3; k >= 0; k--) { await page.evaluate((v) => scrollTo(0, v), target - k * 60); await page.waitForTimeout(80); }
    await page.waitForTimeout(2600);
    open.push(await page.evaluate(() => [...document.querySelectorAll("[data-wwd-door]")].findIndex((d) => d.classList.contains("is-open"))));
    await page.screenshot({ path: `${out}-door${i}.png` });
  }
  // click test: open door 1 via its spine
  await page.evaluate((v) => scrollTo(0, v), top + 0.1 * span); await page.waitForTimeout(1200);
  await page.click("[data-wwd-door='3'] .wwd-spine"); await page.waitForTimeout(2500);
  open.push("click3:" + (await page.evaluate(() => [...document.querySelectorAll("[data-wwd-door]")].findIndex((d) => d.classList.contains("is-open")))));
  // after section: next section not overlapped
  await page.evaluate((v) => scrollTo(0, v), top + h - 300); await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}-exit.png` });
} else {
  for (let y = top - 900; y < top + h; y += 250) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(90); }
  await page.waitForTimeout(2000);
  await page.locator("#what-we-do").screenshot({ path: `${out}-full.png` });
}
const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
console.log(JSON.stringify({ errors, overflowX, open, h }));
await browser.close();
