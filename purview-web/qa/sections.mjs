// node qa/sections.mjs <path> <width> <height> <outPrefix> [reduce 0|1] [baseUrl]
import { chromium } from "@playwright/test";
const [path = "/", w = "1440", h = "900", prefix = "sec", reduce = "0", base = "http://localhost:3100"] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: +w, height: +h }, reducedMotion: reduce === "1" ? "reduce" : "no-preference", deviceScaleFactor: 1 });
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));
p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await p.goto(base + path, { waitUntil: "networkidle", timeout: 120000 });
await p.waitForTimeout(1500);
const tops = await p.$$eval("main > section, main > div > section, footer", (els) => els.map((e) => ({ y: e.getBoundingClientRect().top + window.scrollY, h: e.offsetHeight, id: e.getAttribute("aria-labelledby") || e.id || e.tagName })));
let i = 0;
for (const t of tops) {
  const steps = Math.max(1, Math.min(3, Math.ceil(t.h / +h)));
  for (let s = 0; s < steps; s++) {
    await p.evaluate((y) => window.scrollTo(0, y), t.y + s * +h);
    await p.waitForTimeout(900);
    await p.screenshot({ path: `${prefix}-${String(i).padStart(2, "0")}.png`, scale: "css" });
    i++;
  }
}
const ov = await p.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
console.log(JSON.stringify({ frames: i, sections: tops.map((t) => t.id + ":" + t.h), overflow: ov, errs: errs.slice(0, 10) }));
await b.close();
