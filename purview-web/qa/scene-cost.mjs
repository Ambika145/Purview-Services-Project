// Measures the real cost of scroll-scene setup + ScrollTrigger refreshes under 4x CPU throttle.
import { chromium } from "@playwright/test";
const base = process.argv[2] || "http://localhost:3200";
const b = await chromium.launch({ channel: "chrome", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const cdp = await p.context().newCDPSession(p);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await p.addInitScript(() => {
    window.__long = [];
    new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__long.push(Math.round(e.duration)))).observe({ type: "longtask", buffered: true });
  });
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(6000);
  const atLoad = await p.evaluate(() => ({ long: window.__long.slice(), triggers: window.ScrollTrigger?.getAll?.().length }));
  // scroll the page like a visitor and record long tasks during scrolling
  await p.evaluate(() => (window.__long = []));
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 300) { await p.mouse.wheel(0, 300); await p.waitForTimeout(60); }
  await p.waitForTimeout(1500);
  const scroll = await p.evaluate(() => window.__long.slice());
  const sum = (a) => a.reduce((x, y) => x + y, 0);
  console.log(`${w}x${h}  load: ${atLoad.long.length} long tasks, ${sum(atLoad.long)} ms, max ${Math.max(0, ...atLoad.long)} | scroll: ${scroll.length} long tasks, ${sum(scroll)} ms, max ${Math.max(0, ...scroll)}`);
  await p.close();
}
await b.close();
