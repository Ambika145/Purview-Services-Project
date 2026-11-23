"use client";

import { useEffect, type RefObject } from "react";

type Gsap = typeof import("gsap").default;
type ST = typeof import("gsap/ScrollTrigger").ScrollTrigger;
export type SceneApi = { gsap: Gsap; ScrollTrigger: ST; root: HTMLElement; desktop: boolean };
/** A setup may return a cleanup, run when the scene is reverted (gsap.context). */
export type SceneSetup = (api: SceneApi) => void | (() => void);

let loader: Promise<{ gsap: Gsap; ScrollTrigger: ST }> | null = null;

/** Load GSAP + ScrollTrigger once, on demand (never part of the first-load bundle). */
export function loadGsap() {
  loader ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
    g.default.registerPlugin(s.ScrollTrigger);
    return { gsap: g.default, ScrollTrigger: s.ScrollTrigger };
  });
  return loader;
}

/*
 * Pinned scenes add scroll length (pin spacers). If a later scene is measured
 * before an earlier pin exists, it starts too early and overlaps. So after
 * any scene is created: sort triggers into page order and run one coalesced
 * refresh, which re-measures everything below every pin.
 */
let refreshTimer = 0;
function resync(ST: ST) {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => {
    ST.sort();
    ST.refresh();
  }, 100);
}

/** Defer work to browser idle time so it never competes with load or input. */
function whenIdle(cb: () => void) {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(cb, { timeout: 1500 });
    return () => w.cancelIdleCallback?.(id);
  }
  const t = window.setTimeout(cb, 200);
  return () => window.clearTimeout(t);
}

/**
 * Run a GSAP/ScrollTrigger setup scoped to a section, lazily.
 *
 * - The setup is created only when the section comes within one viewport of
 *   the screen, so page load does no animation work.
 * - Content is fully visible in the server HTML. GSAP only applies start
 *   states when it runs, so no-JS and failed loads still show everything.
 * - Skipped entirely for prefers-reduced-motion.
 * - `desktopOnly` setups (pins, stacking) only run at ≥ 1024 px.
 * - `eager` (used for pinned scenes) creates the scene at idle time on load,
 *   in document order, so every pin spacer exists before the visitor
 *   reaches it and nothing below can start early.
 * - Everything is reverted on unmount via gsap.context().
 */
export function useScrollScene(ref: RefObject<HTMLElement | null>, setup: SceneSetup, { desktopOnly = false, eager = false }: { desktopOnly?: boolean; eager?: boolean } = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    if (desktopOnly && !desktop) return;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    let io: IntersectionObserver | null = null;

    let cancelIdle = () => {};
    const start = () => {
      io?.disconnect();
      cancelIdle = whenIdle(() =>
        loadGsap().then(({ gsap, ScrollTrigger }) => {
          if (cancelled) return;
          ctx = gsap.context(() => setup({ gsap, ScrollTrigger, root, desktop }), root);
          resync(ScrollTrigger);
        }),
      );
    };

    if (eager || !("IntersectionObserver" in window)) start();
    else {
      io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && start(), { rootMargin: "100% 0px 100% 0px" });
      io.observe(root);
    }
    return () => {
      cancelled = true;
      cancelIdle();
      io?.disconnect();
      ctx?.revert();
    };
    // setup is intentionally captured once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, desktopOnly, eager]);
}
