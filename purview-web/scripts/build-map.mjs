/**
 * Build-time world map: Natural Earth 1:110m (public domain, via world-atlas),
 * projected with Natural Earth I. Writes a static SVG to public/map/ and the
 * projected marker positions to src/content/map-markers.json, so the page
 * ships an image instead of ~200 KB of inline path data.
 *
 *   node scripts/build-map.mjs
 */
import fs from "node:fs";
import { geoNaturalEarth1, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";

const world = JSON.parse(fs.readFileSync(new URL("../node_modules/world-atlas/countries-110m.json", import.meta.url)));
// Keep in sync with FOOTPRINT_COUNTRIES and LOCATIONS in src/content/home.ts
const FOOTPRINT = ["826", "372", "616", "752", "246", "276", "528", "756", "840", "124", "484", "356", "702", "784", "344", "512", "458", "608", "392", "036", "554", "710"];
const LOCATIONS = [
  ["Edinburgh", -3.19, 55.95], ["Hyderabad", 78.49, 17.39], ["Dallas", -96.8, 32.78], ["Warsaw", 21.01, 52.23], ["Singapore", 103.82, 1.35],
  ["Sydney", 151.21, -33.87], ["Pune", 73.86, 18.52], ["Bengaluru", 77.59, 12.97], ["Chennai", 80.27, 13.08],
];

const W = 1000, H = 500;
const fc = feature(world, world.objects.countries);
const land = { ...fc, features: fc.features.filter((f) => f.id !== "010") };
const projection = geoNaturalEarth1().fitExtent([[8, 8], [W - 8, H - 8]], land);
const path = geoPath(projection).digits(1);

const on = land.features.filter((f) => FOOTPRINT.includes(String(f.id))).map((f) => path(f)).join("");
const off = land.features.filter((f) => !FOOTPRINT.includes(String(f.id))).map((f) => path(f)).join("");
const pos = Object.fromEntries(LOCATIONS.map(([c, lon, lat]) => { const [x, y] = projection([lon, lat]); return [c, { x: +((x / W) * 100).toFixed(2), y: +((y / H) * 100).toFixed(2) }]; }));

const px = (c) => [(pos[c].x / 100) * W, (pos[c].y / 100) * H].map((v) => v.toFixed(1));
const arc = (a, b, lift = 0.18) => {
  const [x1, y1] = px(a).map(Number), [x2, y2] = px(b).map(Number);
  const mx = (x1 + x2) / 2, my = Math.min(y1, y2) - Math.abs(x2 - x1) * lift - 10;
  return `M${x1} ${y1}Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2} ${y2}`;
};
const dashed = ["Warsaw"].map((c) => arc("Edinburgh", c)).concat(["Pune", "Bengaluru", "Chennai", "Singapore", "Sydney"].map((c) => arc("Hyderabad", c))).join("");
const solid = [arc("Edinburgh", "Hyderabad", 0.25), arc("Edinburgh", "Dallas", 0.2)].join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<path d="${geoPath(projection).digits(1)(geoGraticule10())}" fill="none" stroke="rgba(143,179,255,.07)" stroke-width=".6"/>
<path d="${off}" fill="rgba(143,179,255,.09)" stroke="rgba(143,179,255,.16)" stroke-width=".5"/>
<path d="${on}" fill="rgba(47,91,214,.55)" stroke="rgba(143,179,255,.7)" stroke-width=".5"/>
<path d="${dashed}" fill="none" stroke="#ff8a3d" stroke-opacity=".55" stroke-dasharray="3 4"/>
<path d="${solid}" fill="none" stroke="#ff8a3d" stroke-width="1.2"/>
</svg>`;

fs.mkdirSync(new URL("../public/map/", import.meta.url), { recursive: true });
fs.writeFileSync(new URL("../public/map/world-footprint.svg", import.meta.url), svg);
fs.writeFileSync(new URL("../src/content/map-markers.json", import.meta.url), JSON.stringify(pos, null, 1));
console.log("map written:", (svg.length / 1024).toFixed(1), "KB");
