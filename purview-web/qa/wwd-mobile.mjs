import { chromium } from "@playwright/test";
const [out, base = "http://localhost:3100"] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
for (const [w, h, rm] of [[390, 844, "no-preference"], [1440, 900, "reduce"]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, reducedMotion: rm });
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  await p.locator("#what-we-do").scrollIntoViewIfNeeded();
  const info = await p.evaluate(() => ({ stacked: document.querySelector("#what-we-do [data-stack]").classList.contains("is-stacked"), visibleCards: [...document.querySelectorAll("#what-we-do [data-card]")].filter((c) => c.getBoundingClientRect().height > 100).length, overflow: document.documentElement.scrollWidth > innerWidth }));
  await p.locator("#what-we-do").screenshot({ path: `${out}/wwd-${w}-${rm}.png` });
  console.log(w, rm, JSON.stringify(info));
  await p.close();
}
await b.close();
