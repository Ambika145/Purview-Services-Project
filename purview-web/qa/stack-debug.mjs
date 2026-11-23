import { chromium } from "@playwright/test";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1900, height: 860 } });
await p.goto((process.argv[2] || "http://localhost:3000") + "/", { waitUntil: "networkidle" });
await p.waitForTimeout(3500);
const r = await p.evaluate(() => {
  const ol = document.querySelector("#what-we-do [data-stack] > ol");
  const cs = (e) => getComputedStyle(e);
  return { ol: { ts: cs(ol).transformStyle, persp: cs(ol).perspective, display: cs(ol).display },
    lis: [...ol.children].map((li) => ({ z: cs(li).zIndex, pos: cs(li).position, ts: cs(li).transformStyle, t: li.style.transform.slice(0, 90), inlineZ: li.style.zIndex })) };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
