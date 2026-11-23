"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { EcoNode } from "@/content/home";

/**
 * The ecosystem as an architectural schematic: one core, two families of six.
 *
 * Diagram language adapted from Applied Compute's custom-models diagram
 * (Details 977092a10e624e56841dc2b9c5f7f82a): thin outlined panels on guide
 * lines, one element at a time taking the accent "active" state. Here the
 * active state shows a capability's wire to the core and the capabilities it
 * depends on (ECO_EDGES), so the relationships are read, not guessed.
 *
 * Reveal (once, when the map enters view): the core settles first, the wires
 * draw outward, then capabilities appear in pairs, A1/B1, A2/B2 … Content is
 * fully visible without JS and under prefers-reduced-motion.
 */

type Props = { apps: EcoNode[]; infra: EcoNode[]; edges: [string, string][] };
type Wire = { id: string; d: string; side: "A" | "B"; i: number };

export function EcoMap({ apps, infra, edges }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const core = useRef<HTMLDivElement>(null);
  const items = useRef(new Map<string, HTMLElement>());
  const [wires, setWires] = useState<Wire[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState<string | null>(null);
  const [phase, setPhase] = useState<"static" | "armed" | "in">("static");

  const all = useMemo(() => [...apps, ...infra], [apps, infra]);
  const byId = useMemo(() => new Map(all.map((n) => [n.id, n])), [all]);

  // Dependencies among these twelve only (edges are undirected).
  const related = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const [a, b] of edges) {
      if (!byId.has(a) || !byId.has(b)) continue;
      if (!m.has(a)) m.set(a, new Set());
      if (!m.has(b)) m.set(b, new Set());
      m.get(a)!.add(b);
      m.get(b)!.add(a);
    }
    return m;
  }, [edges, byId]);

  // Wires: from each capability's inner edge to the core's facing edge (desktop layout only).
  const measure = useCallback(() => {
    const r = root.current;
    const c = core.current;
    if (!r || !c) return;
    setBox({ w: r.offsetWidth, h: r.offsetHeight });
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      setWires([]);
      return;
    }
    // layout offsets, not client rects: reveal transforms must not skew the wires
    const pos = (el: HTMLElement) => {
      let x = 0;
      let y = 0;
      let n: HTMLElement | null = el;
      while (n && n !== r) {
        x += n.offsetLeft;
        y += n.offsetTop;
        n = n.offsetParent as HTMLElement | null;
      }
      return { x, y, w: el.offsetWidth, h: el.offsetHeight };
    };
    const cb = pos(c);
    const cy = cb.y + cb.h / 2;
    const out: Wire[] = [];
    const add = (list: EcoNode[], side: "A" | "B") =>
      list.forEach((n, i) => {
        const el = items.current.get(n.id);
        if (!el) return;
        const b = pos(el);
        const y = b.y + b.h / 2;
        const x0 = side === "A" ? b.x + b.w : b.x;
        const x1 = side === "A" ? cb.x : cb.x + cb.w;
        // fan in to a short spread on the core edge so lines stay legible
        const ty = cy + (i - (list.length - 1) / 2) * 10;
        const mx = (x0 + x1) / 2;
        out.push({ id: n.id, side, i, d: `M${x0} ${y} C${mx} ${y} ${mx} ${ty} ${x1} ${ty}` });
      });
    add(apps, "A");
    add(infra, "B");
    setWires(out);
  }, [apps, infra]);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (root.current) ro.observe(root.current);
    return () => ro.disconnect();
  }, [measure]);

  // Reveal once. Arm only if the map is still below the fold, so nothing visible ever blinks out.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;
    setPhase("armed");
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setPhase("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const deps = active ? related.get(active) ?? new Set<string>() : null;
  const state = (id: string) => (!active ? "" : id === active ? "is-active" : deps?.has(id) ? "is-related" : "is-muted");
  const activeNode = active ? byId.get(active) : null;
  const caption = activeNode
    ? deps && deps.size
      ? { lead: activeNode.label, rest: [...deps].map((d) => byId.get(d)!.label) }
      : { lead: activeNode.label, rest: [] as string[] }
    : null;

  // a render function, not a component: hover re-renders must not remount the links
  const column = (list: EcoNode[], side: "A" | "B") => (
    <div className={`em-col em-col-${side.toLowerCase()}`}>
      <div className="em-colhead" style={{ "--i": 0 } as React.CSSProperties}>
        <span className="em-layer">{side}</span>
        <span className="em-colname">{side === "A" ? "Applications" : "Infrastructure"}</span>
        <span className="em-colcount t-mono">{list.length} capabilities</span>
      </div>
      <ul className="em-list">
        {list.map((n, i) => (
          <li key={n.id} className="em-li" style={{ "--i": i } as React.CSSProperties}>
            <Link
              href={n.href}
              ref={(el) => {
                if (el) items.current.set(n.id, el);
                else items.current.delete(n.id);
              }}
              className={`em-item ${state(n.id)}`}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(n.id)}
              onBlur={() => setActive(null)}
            >
              <span className="em-code t-mono">
                {side}
                {i + 1}
              </span>
              <span className="em-text">
                <span className="em-label">{n.label}</span>
                <span className="em-blurb">{n.blurb}</span>
              </span>
              <ArrowUpRight aria-hidden className="em-arrow" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div ref={root} className={`em ${phase === "armed" ? "is-armed" : ""} ${phase === "in" ? "is-armed is-in" : ""} ${active ? "has-active" : ""}`}>
      {/* wires (desktop) */}
      <svg className="em-wires" width={box.w} height={box.h} viewBox={`0 0 ${box.w || 1} ${box.h || 1}`} aria-hidden>
        {wires.map((w) => (
          <path key={w.id} d={w.d} pathLength={1} className={`em-wire ${state(w.id)}`} style={{ "--i": w.i } as React.CSSProperties} />
        ))}
      </svg>

      {column(apps, "A")}

      {/* the core */}
      <div className="em-core-wrap">
        <div ref={core} className="em-core">
          <span className="em-core-ring" aria-hidden />
          <Image src="/brand/purview-logo-white.png" alt="Purview" width={365} height={132} className="em-core-logo" />
          <p className="em-core-count">
            <b>12</b> capabilities
          </p>
          <p className="em-core-line">One technology partner. From application to infrastructure.</p>
        </div>
        <p className="em-caption" aria-live="polite">
          {caption ? (
            caption.rest.length ? (
              <>
                <b>{caption.lead}</b> works with {caption.rest.slice(0, -1).join(", ")}
                {caption.rest.length > 1 ? " and " : ""}
                {caption.rest[caption.rest.length - 1]}.
              </>
            ) : (
              <>
                <b>{caption.lead}</b> connects through the core.
              </>
            )
          ) : (
            <span className="em-hint">Hover over a capability to see what it works with.</span>
          )}
        </p>
      </div>

      {column(infra, "B")}
    </div>
  );
}
