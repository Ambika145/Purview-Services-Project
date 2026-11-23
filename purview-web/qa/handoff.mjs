// node qa/handoff.mjs <outDir> [baseUrl] [width] [height]
// Steps naturally through the Tech → Data Centre hand-off and screenshots each step.
import { chromium } from "@playwright/test";
const [out, base = "http://localhost:3100", w = "1900", h = "860"] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
await p.goto(base + "/", { waitUntil: "networkidle" });
await p.waitForTimeout(3000);
const techTop = await p.evaluate(() => document.querySelector('section[aria-labelledby="tech-title"]').getBoundingClientRect().top + scrollY);
let y = 0;
while (y < techTop - 200) {
  await p.mouse.wheel(0, 200);
  y += 200;
  await p.waitForTimeout(20);
}
for (let i = 0; i < 16; i++) {
  await p.mouse.wheel(0, +h * 0.42);
  await p.waitForTimeout(450);
  await p.screenshot({ path: `${out}/handoff-${String(i).padStart(2, "0")}.png` });
}
await b.close();
