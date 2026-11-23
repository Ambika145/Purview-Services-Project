import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const BASE = process.argv[2] || "http://localhost:3200";
const pages = ["/", "/data-centre", "/tech", "/workforce", "/company", "/contact", "/industries", "/our-work", "/insights", "/insights/why-the-agent-needs-the-floor", "/cloud", "/dc-why", "/callohm", "/locations"];
const b = await chromium.launch({ channel: "chrome" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const summary = {};
for (const p of pages) {
  const page = await ctx.newPage();
  await page.goto(BASE + p, { waitUntil: "networkidle" });
  // reveal all animated content so contrast is measured on final states
  await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((e) => e.classList.add("is-in")));
  await page.waitForTimeout(1200);
  const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  for (const v of r.violations) {
    summary[v.id] ??= { impact: v.impact, help: v.help, pages: new Set(), samples: [] };
    summary[v.id].pages.add(p);
    if (summary[v.id].samples.length < 4) summary[v.id].samples.push(v.nodes[0].target.join(" ") + " :: " + (v.nodes[0].failureSummary || "").split("\n").slice(1, 2).join(""));
  }
  console.log(p, "violations:", r.violations.length, r.violations.map((v) => `${v.id}(${v.nodes.length})`).join(", "));
  await page.close();
}
for (const [k, v] of Object.entries(summary)) console.log(`\n## ${k} [${v.impact}] ${v.help}\n pages: ${[...v.pages].join(" ")}\n ${v.samples.join("\n ")}`);
await b.close();
