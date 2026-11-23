// node qa/stack-frames.mjs <outDir> [baseUrl] [w] [h] : steps through the What we do card stack
import { chromium } from "@playwright/test";
const [out, base = "http://localhost:3100", w = "1900", h = "860"] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));
await p.goto(base + "/", { waitUntil: "networkidle" });
await p.waitForTimeout(3500);
const top = await p.evaluate(() => document.querySelector("#what-we-do [data-stack]").getBoundingClientRect().top + scrollY);
let y = 0;
while (y < top - 300) { await p.mouse.wheel(0, 200); y += 200; await p.waitForTimeout(20); }
for (let i = 0; i < 12; i++) {
  await p.mouse.wheel(0, +h * 0.38);
  await p.waitForTimeout(500);
  await p.screenshot({ path: `${out}/stack-${w}-${String(i).padStart(2, "0")}.png` });
}
console.log(JSON.stringify({ stacked: await p.evaluate(() => document.querySelector("#what-we-do [data-stack]").classList.contains("is-stacked")), errs }));
await b.close();
