import { chromium } from "@playwright/test";
const [base = "http://localhost:3200", w = "390", h = "844"] = process.argv.slice(2);
const VARIANTS = {
  baseline: "",
  "no-backdrop-blur": "*{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}",
  "no-css-animations": "*{animation:none!important}",
  "no-logo-blend": ".logo-img{mix-blend-mode:normal!important;filter:none!important}",
  "no-text-stroke": "[data-band]{-webkit-text-stroke:0!important;color:#ccc!important}",
  "no-will-change": "*{will-change:auto!important}",
};
const b = await chromium.launch({ channel: "chrome" });
const out = [];
for (const [name, css] of Object.entries(VARIANTS)) {
  const runs = [];
  for (let r = 0; r < 3; r++) {
    const p = await b.newPage({ viewport: { width: +w, height: +h } });
    const cdp = await p.context().newCDPSession(p);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await p.addInitScript((c) => {
      window.__long = [];
      new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__long.push(e.duration))).observe({ type: "longtask", buffered: true });
      if (c) document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = c; document.head.appendChild(s); });
    }, css);
    await p.goto(base + "/", { waitUntil: "networkidle" });
    await p.waitForTimeout(5000);
    const l = await p.evaluate(() => window.__long);
    runs.push(Math.round(l.reduce((a, x) => a + Math.max(0, x - 50), 0))); // TBT-like
    await p.close();
  }
  runs.sort((a, b) => a - b);
  out.push({ variant: name, blockingMs_median: runs[1], runs: runs.join(" / ") });
}
console.table(out);
await b.close();
