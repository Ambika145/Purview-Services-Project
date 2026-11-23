// node qa/hero-states.mjs <outDir> [width] [height]
import { chromium } from "@playwright/test";
const [out, w = "1440", h = "900", base = "http://localhost:3100"] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));
p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await p.goto(base + "/", { waitUntil: "networkidle" });
await p.waitForTimeout(4500);
await p.screenshot({ path: `${out}/hero-0-overview.png` });
const links = p.locator('nav[aria-label="Purview capabilities"]:visible a');
const n = await links.count();
for (let i = 0; i < n; i++) {
  await links.nth(i).hover();
  await p.waitForTimeout(2600);
  await p.screenshot({ path: `${out}/hero-${i + 1}.png` });
}
console.log(JSON.stringify({ selectors: n, canvas: await p.locator("canvas").count(), hrefs: await links.evaluateAll((a) => a.map((x) => x.getAttribute("href"))), errs: errs.slice(0, 8) }));
await b.close();
