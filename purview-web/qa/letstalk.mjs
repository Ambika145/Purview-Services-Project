// node qa/letstalk.mjs <outDir>
import { chromium } from "@playwright/test";
const [out] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
const report = {};
for (const [w, h, tag] of [[1440, 900, "d"], [820, 1180, "t"], [390, 844, "m"]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  await p.goto("http://localhost:3200/", { waitUntil: "networkidle" });
  await p.waitForTimeout(2000);
  let y = 0;
  const H = await p.evaluate(() => document.body.scrollHeight);
  while (y < H) { await p.mouse.wheel(0, 700); y += 700; await p.waitForTimeout(20); }
  await p.evaluate(() => document.querySelector("[data-cta]").scrollIntoView());
  await p.waitForTimeout(2500);
  await p.locator("[data-cta]").screenshot({ path: `${out}/lt-${tag}.png` });
  const r = { errs, overflowX: await p.evaluate(() => document.documentElement.scrollWidth > innerWidth), startHere: await p.evaluate(() => /start here/i.test(document.querySelector("[data-cta]").innerText)) };
  if (tag === "d") {
    // validation: empty submit
    await p.locator("[data-cta] button[type=submit]").click();
    await p.waitForTimeout(400);
    r.errorsShown = await p.locator("[data-cta] .lt-err").allInnerTexts();
    r.focused = await p.evaluate(() => document.activeElement?.getAttribute("name"));
    await p.locator("[data-cta] form").screenshot({ path: `${out}/lt-invalid.png` });
    // valid submit: block the mailto navigation so the page stays, then observe states
    await p.evaluate(() => { window.__href = null; const d = Object.getOwnPropertyDescriptor(Location.prototype, "href"); });
    await p.fill('[data-cta] input[name="name"]', "Test Person");
    await p.fill('[data-cta] input[name="email"]', "test@example.com");
    await p.fill('[data-cta] textarea[name="problem"]', "We need a GPU floor live by quarter end with operations.");
    await p.locator("[data-cta] button[type=submit]").click();
    await p.waitForTimeout(150);
    r.sendingLabel = await p.locator("[data-cta] button[type=submit]").innerText().catch(() => null);
    await p.locator("[data-cta]").screenshot({ path: `${out}/lt-sending.png` });
    await p.waitForTimeout(2600);
    r.resultTitle = await p.locator("[data-cta] .lt-result-title").innerText().catch(() => null);
    await p.locator("[data-cta]").screenshot({ path: `${out}/lt-result.png` });
  }
  report[tag] = r;
  await p.close();
}
console.log(JSON.stringify(report, null, 1));
await b.close();
