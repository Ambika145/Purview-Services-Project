// node qa/eco-visual.mjs <outDir> [baseUrl]
import { chromium } from "@playwright/test";
const [out, base = "http://localhost:3100"] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
const errs = [];
for (const [w, h] of [[1900, 860], [1366, 768], [768, 1024], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  p.on("pageerror", (e) => errs.push(e.message));
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(2000);
  const stage = p.locator("#ecosystem .eco-stage");
  await stage.scrollIntoViewIfNeeded();
  await p.waitForTimeout(1500);
  await stage.screenshot({ path: `${out}/eco-${w}-a.png` });
  await p.waitForTimeout(3000);
  if (w >= 1024) {
    const box = await stage.boundingBox();
    await p.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.2);
    await p.waitForTimeout(900);
  }
  await stage.screenshot({ path: `${out}/eco-${w}-b.png` });
  if (w >= 1024) {
    await p.locator('[data-eco-li="genai"] a').hover();
    await p.waitForTimeout(700);
    await stage.screenshot({ path: `${out}/eco-${w}-hover.png` });
  }
  const m = await p.evaluate(() => ({ overflowX: document.documentElement.scrollWidth > innerWidth, cards: document.querySelectorAll("#ecosystem [data-eco-card]").length, lists: document.querySelectorAll("#ecosystem [data-eco-li]").length, heading: document.querySelector("#eco-title").textContent }));
  console.log(w, JSON.stringify(m));
  await p.close();
}
console.log("errors:", errs.length ? errs : "none");
await b.close();
