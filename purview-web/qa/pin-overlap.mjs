// Detects the Tech/Data Centre pin conflict: one section pinned while the other is on screen.
import { chromium } from "@playwright/test";
const base = process.argv[2] || "http://localhost:3100";
const SIZES = [[1900, 860], [1920, 1080], [1440, 900], [1366, 768]];
const b = await chromium.launch({ channel: "chrome" });
const rows = [];
for (const [w, h] of SIZES) {
  for (const step of [120, 400]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(base + "/", { waitUntil: "networkidle" });
    await p.waitForTimeout(3000); // let idle-time scene setup and resync run
    const H = await p.evaluate(() => document.body.scrollHeight);
    let conflicts = 0, samples = 0, first = null;
    for (let y = 0; y < H * 0.6; y += step) {
      await p.mouse.wheel(0, step);
      await p.waitForTimeout(step > 200 ? 40 : 25);
      const r = await p.evaluate(() => {
        const tech = document.querySelector('section[aria-labelledby="tech-title"] [data-pin]');
        const dc = document.querySelector('section[aria-labelledby="dc-title"] [data-pin]');
        if (!tech || !dc) return null;
        const vh = innerHeight, t = tech.getBoundingClientRect(), d = dc.getBoundingClientRect();
        const vis = (q) => Math.max(0, Math.min(vh, q.bottom) - Math.max(0, q.top));
        const fixed = (el) => getComputedStyle(el).position === "fixed" || (el.style.transform || "").includes("translate");
        // overlap: both pin boxes visible and intersecting each other inside the viewport
        const inter = Math.max(0, Math.min(t.bottom, d.bottom, vh) - Math.max(t.top, d.top, 0));
        return { y: scrollY, inter, tVis: vis(t), dVis: vis(d), tFixed: fixed(tech) };
      });
      if (!r) continue;
      samples++;
      if (r.inter > 2) { conflicts++; first ??= r; }
    }
    rows.push({ size: `${w}x${h}`, wheelStep: step, samples, conflicts, firstConflict: first ? `y=${Math.round(first.y)} overlap=${Math.round(first.inter)}px` : "-" });
    await p.close();
  }
}
console.table(rows);
await b.close();
