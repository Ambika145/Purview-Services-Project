// node qa/ecomap.mjs <outDir>
import { chromium } from "@playwright/test";
const [out] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
const rep = {};
for (const [w, h, t] of [[1440, 900, "d"], [820, 1180, "t"], [390, 844, "m"]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  await p.goto("http://localhost:3200/", { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  // approach like a visitor
  const top = await p.evaluate(() => document.querySelector("#ecosystem").getBoundingClientRect().top + scrollY);
  let y = 0;
  while (y < top - h) { await p.mouse.wheel(0, 500); y += 500; await p.waitForTimeout(25); }
  const map = p.locator(".em");
  const armed = await p.evaluate(() => document.querySelector(".em").className);
  await map.scrollIntoViewIfNeeded();
  if (t === "d") {
    await p.waitForTimeout(700);
    await p.screenshot({ path: `${out}/em-${t}-mid.png` });
  }
  await p.waitForTimeout(2600);
  await map.screenshot({ path: `${out}/em-${t}.png` });
  const r = {
    errs,
    armedBefore: armed,
    classAfter: await p.evaluate(() => document.querySelector(".em").className),
    wires: await p.locator(".em-wire").count(),
    items: await p.locator(".em-item").count(),
    hidden: await p.evaluate(() => [...document.querySelectorAll(".em-li,.em-core,.em-colhead")].filter((e) => +getComputedStyle(e).opacity < 0.99).length),
    overflowX: await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
  };
  if (t === "d") {
    await p.locator(".em-item", { hasText: "Gen AI & agentic AI" }).hover();
    await p.waitForTimeout(600);
    await map.screenshot({ path: `${out}/em-d-hover.png` });
    r.caption = await p.locator(".em-caption").innerText();
    r.related = await p.locator(".em-item.is-related").count();
    // wire endpoints line up with their panels
    r.wireCheck = await p.evaluate(() => {
      const root = document.querySelector(".em").getBoundingClientRect();
      return [...document.querySelectorAll(".em-wire")].slice(0, 2).map((w) => { const bb = w.getBoundingClientRect(); return [Math.round(bb.left - root.left), Math.round(bb.right - root.left)]; });
    });
  }
  rep[t] = r;
  await p.close();
}
console.log(JSON.stringify(rep, null, 1));
await b.close();
