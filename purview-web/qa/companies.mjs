// node qa/companies.mjs <outDir>
import { chromium } from "@playwright/test";
const [out] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
const rep = {};
for (const path of ["/", "/company"]) {
  for (const [w, h, t] of [[1440, 900, "d"], [820, 1180, "t"], [390, 844, "m"]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    const errs = [];
    p.on("pageerror", (e) => errs.push(e.message));
    p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    await p.goto("http://localhost:3200" + path, { waitUntil: "networkidle" });
    await p.waitForTimeout(1000);
    const grid = p.locator(".gc-grid");
    await grid.scrollIntoViewIfNeeded();
    // let reveal observers fire for every row
    await p.evaluate(async () => { const g = document.querySelector(".gc-grid"); const r = g.getBoundingClientRect(); for (let y = r.top + scrollY - 200; y < r.bottom + scrollY; y += 250) { scrollTo(0, y); await new Promise((q) => setTimeout(q, 120)); } });
    await p.waitForTimeout(1200);
    const sec = path === "/" ? p.locator("#companies") : p.locator("section#companies");
    const tag = (path === "/" ? "home" : "company") + "-" + t;
    await sec.screenshot({ path: `${out}/gc-${tag}.png` });
    rep[tag] = {
      errs,
      cards: await p.locator(".gc-cell").count(),
      links: await p.locator("a.gc-card").count(),
      logosBroken: await p.evaluate(() => [...document.querySelectorAll(".gc-logo-img")].filter((i) => !i.complete || i.naturalWidth === 0).length),
      hidden: await p.evaluate(() => [...document.querySelectorAll(".gc-cell")].filter((e) => +getComputedStyle(e).opacity < 0.99).length),
      overflowX: await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      newTab: await p.evaluate(() => [...document.querySelectorAll("a.gc-card")].every((a) => a.target === "_blank" && a.rel.includes("noopener"))),
    };
    await p.close();
  }
}
console.log(JSON.stringify(rep));
await b.close();
