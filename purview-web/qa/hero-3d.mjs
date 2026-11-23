// node qa/hero-3d.mjs <outPrefix> [width] [height] [dpr]
import { chromium } from "@playwright/test";
const [out = "h", w = "1440", h = "900", dpr = "1"] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome", args: ["--enable-gpu", "--use-angle=d3d11", "--ignore-gpu-blocklist"] });
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: +dpr });
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));
p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await p.goto("http://localhost:3200/", { waitUntil: "networkidle" });
await p.waitForTimeout(4000);
const links = p.locator('nav[aria-label="Purview capabilities"]:visible a');
for (const i of [0, 1, 2]) {
  await links.nth(i).hover();
  await p.waitForTimeout(4500);
  await p.screenshot({ path: `${out}-${i + 1}.png` });
}
console.log(JSON.stringify({ errs: errs.slice(0, 6) }));
await b.close();
