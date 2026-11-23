import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const base = process.argv[2] || "http://localhost:3200";
const b = await chromium.launch({ channel: "chrome" });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  await p.goto(base + "/", { waitUntil: "networkidle" });
  // scroll through so scroll-driven states settle as a visitor would see them
  for (let y = 0; y < (await p.evaluate(() => document.body.scrollHeight)); y += 500) { await p.evaluate((v) => window.scrollTo(0, v), y); await p.waitForTimeout(120); }
  await p.waitForTimeout(1200);
  const r = await new AxeBuilder({ page: p }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  console.log(`${w}x${h} violations:`, r.violations.length);
  for (const v of r.violations) console.log(" ", v.id, v.nodes.length, v.nodes.slice(0, 3).map((n) => n.target.join(" ") + " :: " + (n.failureSummary || "").split("\n")[1]).join("\n    "));
  await p.close();
}
await b.close();
