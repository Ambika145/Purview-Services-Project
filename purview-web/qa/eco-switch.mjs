// node qa/eco-switch.mjs <outDir>
import { chromium } from "@playwright/test";
const [out] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
const rep = {};
for (const [w, h, t] of [[1440, 900, "d"], [820, 1180, "t"], [390, 844, "m"]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  await p.goto("http://localhost:3200/", { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  const sw = p.locator(".eco-switch");
  await sw.scrollIntoViewIfNeeded();
  await p.waitForTimeout(2500);
  const r = { errs, defaultShows: await p.evaluate(() => (document.querySelector("#ecosystem .em") ? "B" : document.querySelector("#ecosystem .eco-stage") ? "A" : "?")) };
  await p.getByRole("button", { name: /^A/ }).click();
  await p.waitForTimeout(2500);
  r.afterClickA = await p.evaluate(() => (document.querySelector("#ecosystem .eco-stage") ? "A" : "B"));
  r.pressedA = await p.getByRole("button", { name: /^A/ }).getAttribute("aria-pressed");
  // frame it like the original captures: switch + start of the map
  await p.evaluate(() => { const s = document.querySelector(".eco-switch"); scrollTo(0, s.getBoundingClientRect().top + scrollY - 120); });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${out}/swA-${t}-view.png` });
  await p.locator(".eco-stage").screenshot({ path: `${out}/swA-${t}.png` });
  r.stage = await p.evaluate(() => { const s = document.querySelector(".eco-stage").getBoundingClientRect(); return [Math.round(s.width), Math.round(s.height)]; });
  r.nodes = await p.locator(".eco-node").count();
  r.overflowX = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  if (t === "d") {
    await p.locator('.eco-node[data-eco-id="genai"]').hover({ force: true });
    await p.waitForTimeout(900);
    await p.locator(".eco-stage").screenshot({ path: `${out}/swA-d-hover.png` });
  }
  // persistence across reload
  await p.reload({ waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  r.afterReload = await p.evaluate(() => (document.querySelector("#ecosystem .eco-stage") ? "A" : "B"));
  await p.locator(".eco-switch").scrollIntoViewIfNeeded();
  await p.getByRole("button", { name: /^B/ }).click();
  await p.waitForTimeout(800);
  r.backToB = await p.evaluate(() => (document.querySelector("#ecosystem .em") ? "B" : "A"));
  rep[t] = r;
  await ctx.close();
}
console.log(JSON.stringify(rep, null, 1));
await b.close();
