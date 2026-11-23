import { chromium } from "@playwright/test";
const BASE = process.argv[2] || "http://localhost:3200";
const b = await chromium.launch({ channel: "chrome" });
const out = [];
const check = (name, cond) => out.push(`${cond ? "PASS" : "FAIL"}  ${name}`);
// Desktop: mega menu
let p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(BASE + "/", { waitUntil: "networkidle" });
await p.keyboard.press("Tab"); // skip link
check("skip link is first focus", (await p.evaluate(() => document.activeElement?.textContent)) === "Skip to content");
await p.focus('[data-panel-trigger="solutions"]');
await p.keyboard.press("Enter");
check("Solutions opens with Enter (aria-expanded)", (await p.getAttribute('[data-panel-trigger="solutions"]', "aria-expanded")) === "true");
check("mega menu lists all three verticals", (await p.locator("#mega-solutions a", { hasText: /Purview (Tech|Data Centre|Workforce)/ }).count()) >= 3);
await p.keyboard.press("Escape");
check("Escape closes menu", (await p.getAttribute('[data-panel-trigger="solutions"]', "aria-expanded")) === "false");
check("focus returns to trigger", await p.evaluate(() => document.activeElement?.getAttribute("data-panel-trigger") === "solutions"));
// Hero verticals: keyboard focus activates a vertical, Enter navigates
const rail = p.locator('nav[aria-label="Purview capabilities"]:visible a');
check("hero shows all three verticals", (await rail.count()) === 3);
check("hero verticals link to /tech, /data-centre, /workforce", JSON.stringify(await rail.evaluateAll((x) => x.map((a) => a.getAttribute("href")))) === JSON.stringify(["/tech", "/data-centre", "/workforce"]));
await rail.nth(1).focus();
await p.waitForTimeout(400);
check("focusing Data Centre updates the live caption", ((await p.locator('#hero-title ~ * [aria-live="polite"], [aria-live="polite"]').first().textContent()) || "").includes("THE INFRASTRUCTURE"));
await p.keyboard.press("Enter");
await p.waitForURL("**/data-centre", { timeout: 15000 });
check("Enter on a vertical navigates to its page", p.url().endsWith("/data-centre"));
await p.close();
// Mobile nav
p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto(BASE + "/", { waitUntil: "networkidle" });
check("desktop Contact button hidden on mobile", !(await p.locator("header a.btn", { hasText: "Contact" }).isVisible()));
await p.click('button[aria-controls="mobile-nav"]');
check("mobile menu opens as dialog", await p.locator('#mobile-nav[role="dialog"]').isVisible());
check("focus moves into dialog", await p.evaluate(() => !!document.activeElement?.closest("#mobile-nav")));
await p.keyboard.press("Escape");
check("Escape closes mobile menu", !(await p.locator("#mobile-nav").isVisible().catch(() => false)));
await p.close();
// Reduced motion: hero uses static composition, content visible
p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await p.goto(BASE + "/", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
check("reduced motion: no WebGL canvas in hero", (await p.locator('section[aria-labelledby="hero-title"] canvas').count()) === 0);
await p.locator("#dc-title").scrollIntoViewIfNeeded();
await p.waitForTimeout(800);
check("reduced motion: Data Centre copy visible without pin", await p.locator("#dc-title").isVisible());
check("reduced motion: Tech steps all readable", (await p.locator('section[aria-labelledby="tech-title"] ol li').count()) === 4);
await p.close();
// No-JS: content visible
const ctx = await b.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
p = await ctx.newPage();
await p.goto(BASE + "/data-centre");
const op = await p.evaluate(() => getComputedStyle(document.querySelector("[data-reveal]")).opacity);
check("no-JS: reveal content is visible (opacity 1)", op === "1");
check("no-JS: H1 present", (await p.locator("h1").textContent())?.includes("Powered shell"));
await b.close();
console.log(out.join("\n"));
