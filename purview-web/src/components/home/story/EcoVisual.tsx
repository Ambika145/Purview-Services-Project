import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { EcoNode } from "@/content/home";
import { ECO_EDGES } from "@/content/home";
import { EcoTilt } from "./EcoTilt";

/**
 * Twelve capabilities around one centre.
 *
 * Depth is real, not decorative: far ticks and particles drift slowly,
 * mid orbits and dependency lines run on their own clocks, nodes float on
 * independent paths at two Z depths, and the core sits nearest. Pointer
 * parallax moves each layer at a different rate. Hovering a node (or its
 * list item below) lifts that capability, lights its edges, and dims the rest.
 */

const VB = { w: 1200, h: 700, cx: 600, cy: 352 };
const OUTER_RX = 455;
const OUTER_RY = 250;
const INNER_RX = 288;
const INNER_RY = 164;

const INFRA = ["dc", "aiinfra", "edge", "embedded", "cloud", "cyber"];
const APPS = ["genai", "data", "dpe", "payments", "rpa", "managed"];

/** Compact two-column arrangement when the ellipse cannot fit twelve labels. */
const MOBILE: Record<string, { x: number; y: number }> = {
  dc: { x: 22, y: 16 },
  aiinfra: { x: 22, y: 30 },
  edge: { x: 22, y: 44 },
  embedded: { x: 22, y: 59 },
  cloud: { x: 22, y: 73 },
  cyber: { x: 22, y: 88 },
  genai: { x: 78, y: 16 },
  data: { x: 78, y: 30 },
  dpe: { x: 78, y: 44 },
  payments: { x: 78, y: 59 },
  rpa: { x: 78, y: 73 },
  managed: { x: 78, y: 88 },
};

type Spot = {
  id: string;
  x: number;
  y: number;
  depth: "far" | "near";
  ampX: number;
  ampY: number;
  dur: number;
  delay: number;
};

function ring(ids: string[], rx: number, ry: number, startDeg: number, depth: Spot["depth"]): Spot[] {
  return ids.map((id, i) => {
    const a = (i / ids.length) * Math.PI * 2 + (startDeg * Math.PI) / 180;
    const far = depth === "far";
    return {
      id,
      x: VB.cx + Math.cos(a) * rx,
      y: VB.cy + Math.sin(a) * ry,
      depth,
      ampX: far ? 5 + (i % 3) * 2 : 7 + (i % 3) * 2.5,
      ampY: far ? 8 + (i % 4) * 1.5 : 11 + (i % 4) * 2,
      dur: far ? 8.5 + i * 0.55 : 6.2 + i * 0.7,
      delay: -(i * 0.85 + (far ? 0 : 1.4)),
    };
  });
}

const OUTER = ring(INFRA, OUTER_RX, OUTER_RY, -90, "far");
const INNER = ring(APPS, INNER_RX, INNER_RY, -60, "near");
const SPOTS = [...OUTER, ...INNER];
const AT = new Map(SPOTS.map((s) => [s.id, s]));

function curve(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const cx = mx * 0.55 + VB.cx * 0.45;
  const cy = my * 0.55 + VB.cy * 0.45;
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

const LINKS = ECO_EDGES.filter(([a, b]) => AT.has(a) && AT.has(b)).map(([a, b]) => ({
  a,
  b,
  d: curve(AT.get(a)!, AT.get(b)!),
}));

const MOBILE_AT = new Map(Object.entries(MOBILE).map(([id, p]) => [id, { x: (p.x / 100) * VB.w, y: (p.y / 100) * VB.h }]));
const MOBILE_LINKS = ECO_EDGES.filter(([a, b]) => MOBILE_AT.has(a) && MOBILE_AT.has(b)).map(([a, b]) => ({
  a,
  b,
  d: curve(MOBILE_AT.get(a)!, MOBILE_AT.get(b)!),
}));

function arc(rx: number, ry: number) {
  return `M ${VB.cx - rx} ${VB.cy} A ${rx} ${ry} 0 1 1 ${VB.cx + rx} ${VB.cy} A ${rx} ${ry} 0 1 1 ${VB.cx - rx} ${VB.cy}`;
}

function ticks(r: number, count: number, len: number) {
  let d = "";
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const c = Math.cos(a);
    const s = Math.sin(a);
    d += `M ${(VB.cx + c * (r - len)).toFixed(1)} ${(VB.cy + s * (r - len)).toFixed(1)} L ${(VB.cx + c * r).toFixed(1)} ${(VB.cy + s * r).toFixed(1)}`;
  }
  return d;
}

function spoke(spot: Spot) {
  const dx = spot.x - VB.cx;
  const dy = spot.y - VB.cy;
  const len = Math.hypot(dx, dy) || 1;
  const inner = 118;
  return `M ${(VB.cx + (dx / len) * inner).toFixed(1)} ${(VB.cy + (dy / len) * inner).toFixed(1)} L ${spot.x.toFixed(1)} ${spot.y.toFixed(1)}`;
}

/** Soft dust field: fixed seeds so SSR and client match. */
const DUST = Array.from({ length: 28 }, (_, i) => {
  const t = (i * 137.5) % 360;
  const r = 90 + ((i * 47) % 380);
  const rad = (t * Math.PI) / 180;
  return {
    x: VB.cx + Math.cos(rad) * r * (0.55 + (i % 5) * 0.12),
    y: VB.cy + Math.sin(rad) * r * 0.58,
    s: 1.1 + (i % 4) * 0.55,
    o: 0.18 + (i % 5) * 0.08,
    dur: 10 + (i % 7) * 2.2,
    delay: -(i * 0.55),
  };
});

const AMBIENT = [
  { label: "Layer A", value: "Applications", x: 9, y: 78, dur: 11, delay: 0, depth: "far" as const },
  { label: "Layer B", value: "Infrastructure", x: 88, y: 22, dur: 13, delay: -2.4, depth: "mid" as const },
  { label: "Capacity", value: "~500 MW", x: 86, y: 74, dur: 9.5, delay: -1.1, depth: "near" as const },
];

function hoverCss(spots: Spot[]) {
  return spots
    .map((s) => {
      const friends = new Set([s.id]);
      for (const [a, b] of ECO_EDGES) {
        if (a === s.id && AT.has(b)) friends.add(b);
        if (b === s.id && AT.has(a)) friends.add(a);
      }
      const keep = [...friends].map((id) => `[data-eco-id="${id}"]`).join(",");
      const on = `#ecosystem:is(:has([data-eco-id="${s.id}"]:is(:hover,:focus-visible)),:has([data-eco-li="${s.id}"]:is(:hover,:focus-within)))`;
      return [
        `${on} .eco-node:not(${keep}){opacity:.22;filter:saturate(.7)}`,
        `${on} .eco-ambient{opacity:.18}`,
        `${on} .eco-link-group:not([data-ends~="${s.id}"]){opacity:.05}`,
        `${on} .eco-link-group[data-ends~="${s.id}"]{opacity:1}`,
        `${on} .eco-link-group[data-ends~="${s.id}"] .eco-link{stroke:var(--brand-sky);stroke-width:2;stroke-dasharray:1 7}`,
        `${on} .eco-link-group[data-ends~="${s.id}"] .eco-link-glow{stroke:rgba(143,179,255,.28);stroke-width:10}`,
        `${on} .eco-spoke:not([data-end="${s.id}"]){opacity:.03}`,
        `${on} .eco-spoke[data-end="${s.id}"]{opacity:1;stroke:var(--brand-sky);stroke-width:1.4}`,
        `${on} .eco-node[data-eco-id="${s.id}"]{z-index:8}`,
        `${on} .eco-node[data-eco-id="${s.id}"] .eco-node-face{border-color:var(--brand-sky);box-shadow:0 0 0 5px rgba(143,179,255,.18),0 28px 50px -16px rgba(6,13,38,.95),0 0 40px rgba(143,179,255,.2);transform:translateY(-6px) scale(1.07)}`,
        `${on} .eco-node:is(${keep}){opacity:1;filter:none}`,
        `${on} .eco-core{box-shadow:0 0 0 14px rgba(143,179,255,.14),0 0 80px 8px rgba(143,179,255,.36),0 28px 50px -24px rgba(6,13,38,.8);transform:translate(-50%,-50%) scale(1.05)}`,
        `${on} .eco-focus-ring{opacity:.9}`,
      ].join("");
    })
    .join("");
}

function Links({ links }: { links: { a: string; b: string; d: string }[] }) {
  return (
    <>
      {links.map((l, i) => (
        <g key={`${l.a}-${l.b}`} data-ends={`${l.a} ${l.b}`} className="eco-link-group">
          <path d={l.d} className="eco-link-glow" />
          <path d={l.d} className="eco-link eco-anim" style={{ animationDelay: `${-i * 0.45}s`, animationDuration: `${5.5 + (i % 5) * 0.9}s` }} />
        </g>
      ))}
    </>
  );
}

function Beads({ path, count, dur, tone }: { path: string; count: number; dur: number; tone: "a" | "b" }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <g key={i} className="eco-bead-group">
          <animateMotion dur={`${dur}s`} begin={`${-((dur / count) * i)}s`} repeatCount="indefinite" path={path} />
          <circle r={tone === "a" ? 8 : 9} className={`eco-bead-halo eco-bead-halo-${tone}`} />
          <circle r="2.4" className={`eco-bead eco-bead-${tone}`} />
        </g>
      ))}
    </>
  );
}

function Node({ n, spot, index }: { n: EcoNode; spot: Spot; index: number }) {
  const infra = n.layer === "B";
  const mobile = MOBILE[n.id];
  return (
    <Link
      href={n.href}
      data-eco-id={n.id}
      data-eco-card={n.id}
      data-depth={spot.depth}
      className={`eco-node eco-anim eco-node-${spot.depth} ${infra ? "eco-node-b" : "eco-node-a"}`}
      style={
        {
          "--x": `${(spot.x / VB.w) * 100}%`,
          "--y": `${(spot.y / VB.h) * 100}%`,
          "--mx": `${mobile.x}%`,
          "--my": `${mobile.y}%`,
          "--amp-x": `${spot.ampX}px`,
          "--amp-y": `${spot.ampY}px`,
          animationDuration: `${spot.dur}s`,
          animationDelay: `${spot.delay}s`,
        } as CSSProperties
      }
      aria-label={n.label}
    >
      <span className="eco-node-face">
        <span className="eco-node-index">{String(index).padStart(2, "0")}</span>
        <span className="eco-node-copy">
          <span className="eco-kicker">{infra ? "Infrastructure" : "Applications"}</span>
          <span className="eco-label">{n.label}</span>
        </span>
      </span>
    </Link>
  );
}

export function EcoVisual({ nodes }: { nodes: EcoNode[] }) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const outerArc = arc(OUTER_RX, OUTER_RY);
  const innerArc = arc(INNER_RX, INNER_RY);
  const midArc = arc(370, 210);

  return (
    <div className="eco-stage relative mt-14 overflow-hidden rounded-[22px] border border-sky/15 bg-abyss" aria-label="Capability map">
      <style>{hoverCss(SPOTS)}</style>
      <div className="eco-glow" aria-hidden />
      <div className="eco-vignette" aria-hidden />
      <div className="eco-grid" aria-hidden />

      <EcoTilt>
        {/* Far: atmosphere, ticks, dust — drifts against the pointer */}
        <div className="eco-layer eco-layer-far" aria-hidden>
          <svg className="eco-svg" viewBox={`0 0 ${VB.w} ${VB.h}`} preserveAspectRatio="none">
            <ellipse cx={VB.cx} cy={VB.cy} rx="540" ry="318" className="eco-orbit eco-orbit-far eco-anim" />
            <ellipse cx={VB.cx} cy={VB.cy} rx="370" ry="210" className="eco-orbit eco-orbit-ghost eco-anim" />
            <g className="eco-ticks eco-anim">
              <path d={ticks(516, 56, 9)} className="eco-tick" />
              <path d={ticks(496, 28, 15)} className="eco-tick eco-tick-long" />
            </g>
            <g className="eco-ticks eco-ticks-reverse eco-anim">
              <path d={ticks(352, 36, 7)} className="eco-tick eco-tick-dim" />
            </g>
            {DUST.map((d, i) => (
              <circle
                key={i}
                cx={d.x}
                cy={d.y}
                r={d.s}
                className="eco-dust eco-anim"
                style={{ opacity: d.o, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` } as CSSProperties}
              />
            ))}
          </svg>
        </div>

        {/* Mid-back: dependency graph and traveling signals */}
        <div className="eco-layer eco-layer-midback" aria-hidden>
          <svg className="eco-svg eco-geo-desk" viewBox={`0 0 ${VB.w} ${VB.h}`} preserveAspectRatio="none">
            {SPOTS.map((spot) => (
              <path key={spot.id} d={spoke(spot)} data-end={spot.id} className="eco-spoke" />
            ))}
            <path d={outerArc} className="eco-orbit eco-orbit-mid eco-anim" />
            <path d={midArc} className="eco-orbit eco-orbit-bridge eco-anim" />
            <path d={innerArc} className="eco-orbit eco-orbit-near eco-anim" />
            <Links links={LINKS} />
            <Beads path={outerArc} count={4} dur={38} tone="b" />
            <Beads path={innerArc} count={3} dur={24} tone="a" />
            <Beads path={midArc} count={2} dur={30} tone="b" />
          </svg>
          <svg className="eco-svg eco-geo-mobile" viewBox={`0 0 ${VB.w} ${VB.h}`} preserveAspectRatio="none">
            <ellipse cx={VB.cx} cy={VB.cy} rx="250" ry="300" className="eco-orbit eco-orbit-mid eco-anim" />
            <Links links={MOBILE_LINKS} />
          </svg>
        </div>

        {/* Mid: capability nodes at two depths */}
        <div className="eco-layer eco-layer-mid">
          {OUTER.map((spot) => {
            const n = byId.get(spot.id);
            return n ? <Node key={spot.id} n={n} spot={spot} index={INFRA.indexOf(spot.id) + 1} /> : null;
          })}
          {INNER.map((spot) => {
            const n = byId.get(spot.id);
            return n ? <Node key={spot.id} n={n} spot={spot} index={APPS.indexOf(spot.id) + 7} /> : null;
          })}
        </div>

        {/* Ambient glass panels — purposeful status chips, not decorative icons */}
        <div className="eco-layer eco-layer-ambient" aria-hidden>
          {AMBIENT.map((chip) => (
            <div
              key={chip.label}
              className={`eco-ambient eco-ambient-${chip.depth} eco-anim`}
              style={
                {
                  left: `${chip.x}%`,
                  top: `${chip.y}%`,
                  animationDuration: `${chip.dur}s`,
                  animationDelay: `${chip.delay}s`,
                } as CSSProperties
              }
            >
              <span className="eco-ambient-label">{chip.label}</span>
              <span className="eco-ambient-value">{chip.value}</span>
            </div>
          ))}
        </div>

        <div className="eco-layer eco-layer-glow" aria-hidden>
          <span className="eco-focus-ring" />
        </div>

        {/* Near: gravitational centre */}
        <div className="eco-layer eco-layer-near" aria-hidden>
          <div className="eco-core eco-anim">
            <span className="eco-core-ring eco-core-ring-a eco-anim" />
            <span className="eco-core-ring eco-core-ring-b eco-anim" />
            <span className="eco-core-ring eco-core-ring-c eco-anim" />
            <Image src="/brand/purview-icon-512.png" alt="" width={72} height={72} className="eco-core-mark" />
            <span className="eco-core-count">12</span>
            <span className="eco-core-sub">capabilities</span>
          </div>
        </div>
      </EcoTilt>

      <div className="eco-legend">
        <span>
          <i className="eco-key eco-key-b" /> AI infrastructure
        </span>
        <span>
          <i className="eco-key eco-key-a" /> Intelligent applications
        </span>
      </div>
    </div>
  );
}
