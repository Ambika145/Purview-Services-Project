// node qa/hero-carousel.mjs <outPrefix>
import { chromium } from "@playwright/test";
const [out = "c"] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome", args: ["--enable-gpu", "--use-angle=d3d11", "--ignore-gpu-blocklist"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));
p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await p.goto("http://localhost:3200/", { waitUntil: "networkidle" });
await p.waitForTimeout(4500);
await p.locator('nav[aria-label="Purview capabilities"]:visible a').nth(2).hover();
await p.waitForTimeout(3000);
// park the pointer where it doesn't steer the camera much, still over the rail (keeps the slide)
await p.screenshot({ path: `${out}-rest.png` });
// capture a sequence through one auto-advance to catch the glide + blur
const frames = [];
for (let i = 0; i < 14; i++) {
  await p.waitForTimeout(160);
  frames.push(await p.screenshot({ path: `${out}-seq${String(i).padStart(2, "0")}.png`, clip: { x: 560, y: 60, width: 880, height: 600 } }));
}
// frame pacing while the carousel moves
const pacing = await p.evaluate(() => new Promise((r) => { const f = []; let last = performance.now(); const tick = () => { const n = performance.now(); f.push(n - last); last = n; if (f.length < 240) requestAnimationFrame(tick); else { f.sort((a, b) => b - a); r({ worst: f.slice(0, 3).map(Math.round), over34: f.filter((x) => x > 34).length, avgFps: Math.round(1000 / (f.reduce((a, b) => a + b, 0) / f.length)) }); } }; requestAnimationFrame(tick); }));
// scroll part-way: the arc should travel with the page
await p.mouse.wheel(0, 260);
await p.waitForTimeout(1400);
await p.screenshot({ path: `${out}-scrolled.png` });
console.log(JSON.stringify({ errs: errs.slice(0, 5), pacing }));
await b.close();
