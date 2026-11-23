// Verifies (1) every legacy URL 308-redirects to a live page, (2) every internal link on every sitemap page resolves.
import fs from "node:fs";
const BASE = process.argv[2] || "http://localhost:3200";
const legacy = fs.readFileSync(process.argv[3], "utf8").trim().split(/\s+/).map((u) => new URL(u).pathname);
const bad = [];
let ok = 0;
for (const p of legacy) {
  const r = await fetch(BASE + (p === "/" ? "/index.html" : p), { redirect: "manual" });
  const loc = r.headers.get("location");
  if (r.status !== 308 || !loc) { bad.push(`legacy ${p} -> ${r.status}`); continue; }
  const f = await fetch(new URL(loc, BASE));
  if (f.status !== 200) bad.push(`legacy ${p} -> ${loc} -> ${f.status}`); else ok++;
}
console.log(`legacy redirects OK: ${ok}/${legacy.length}`);
const sm = await (await fetch(BASE + "/sitemap.xml")).text();
const pages = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const seen = new Map();
for (const p of pages) {
  const html = await (await fetch(BASE + p)).text();
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const h = m[1];
    if (h.startsWith("/_next") || /\.(png|jpg|svg|ico|xml|txt)$/.test(h)) continue;
    if (!seen.has(h)) seen.set(h, p);
  }
}
for (const [h, from] of seen) {
  const r = await fetch(BASE + h, { redirect: "manual" });
  if (r.status !== 200) bad.push(`link ${h} (on ${from}) -> ${r.status} ${r.headers.get("location") ?? ""}`);
}
console.log(`sitemap pages: ${pages.length}; unique internal links checked: ${seen.size}`);
console.log(bad.length ? "PROBLEMS:\n" + bad.join("\n") : "no broken links");
