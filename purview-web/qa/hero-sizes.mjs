// node qa/hero-sizes.mjs <outDir> [baseUrl]: first-viewport capture at each size + checks
import { chromium } from "@playwright/test";
const [out, base = "http://localhost:3100"] = process.argv.slice(2);
const SIZES = [[1920, 1080], [1440, 900], [1366, 768], [1024, 768], [768, 1024], [430, 932], [390, 844], [375, 667]];
const b = await chromium.launch({ channel: "chrome", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const res = [];
for (const [w, h] of SIZES) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(3500);
  await p.screenshot({ path: `${out}/size-${String(w).padStart(4, "0")}x${h}.png` });
  const info = await p.evaluate(() => {
    const links = [...document.querySelectorAll('nav[aria-label="Purview capabilities"] a')].filter((a) => a.offsetParent !== null);
    const inView = links.filter((a) => { const r = a.getBoundingClientRect(); return r.top >= 0 && r.bottom <= window.innerHeight + 1; });
    const h1 = document.querySelector("h1").getBoundingClientRect();
    return { visibleSelectors: links.length, fullyInViewport: inView.length, h1Bottom: Math.round(h1.bottom), overflowX: document.documentElement.scrollWidth > innerWidth, canvas: !!document.querySelector("canvas") };
  });
  res.push({ size: `${w}x${h}`, ...info });
  await p.close();
}
console.table(res);
await b.close();
