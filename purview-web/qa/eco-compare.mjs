// node qa/eco-compare.mjs <outDir>
import { chromium } from "@playwright/test";
const [out] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
for (const [w, h, t] of [[1440, 900, "d"], [820, 1180, "t"], [390, 844, "m"]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  await p.goto("http://localhost:3200/", { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  const r = {};
  r.defaultIsCurrent = await p.evaluate(() => !!document.querySelector("#ecosystem .eco-layer, #ecosystem [class*='eco-']") && !document.querySelector(".ecx"));
  await p.evaluate(() => document.querySelector(".ecc").scrollIntoView());
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `${out}/eco-cur-${t}.png` });
  await p.getByRole("radio", { name: "New concept" }).click();
  await p.waitForTimeout(300);
  await p.evaluate(() => document.querySelector(".ecc").scrollIntoView());
  await p.waitForTimeout(2600);
  await p.locator("#ecosystem").screenshot({ path: `${out}/eco-new-${t}.png` });
  r.ids = await p.evaluate(() => ({ ecosystem: document.querySelectorAll("#ecosystem").length, title: document.querySelectorAll("#eco-title").length, links: document.querySelectorAll("#ecosystem a.ecx-link").length, wires: document.querySelectorAll(".ecx-wire").length }));
  if (t === "d") {
    await p.locator(".ecx-link", { hasText: "Cybersecurity" }).hover();
    await p.waitForTimeout(700);
    await p.locator("#ecosystem").screenshot({ path: `${out}/eco-new-hover.png` });
    r.readout = await p.locator(".ecx-readout-title").innerText();
    // persistence + URL param
    await p.reload({ waitUntil: "networkidle" });
    await p.waitForTimeout(800);
    r.persisted = await p.evaluate(() => !!document.querySelector(".ecx"));
    await p.goto("http://localhost:3200/?eco=current", { waitUntil: "networkidle" });
    await p.waitForTimeout(800);
    r.urlCurrent = await p.evaluate(() => !document.querySelector(".ecx"));
  }
  r.overflowX = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  r.errs = errs.slice(0, 4);
  console.log(t, JSON.stringify(r));
  await p.close();
}
await b.close();
