"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export type Capability = { webgl: boolean; tier: "high" | "low"; mobile: boolean; reduced: boolean };

let cached: Capability | null = null;

function detect(): Capability {
  if (cached) return cached;
  let webgl = false;
  try {
    const c = document.createElement("canvas");
    webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    webgl = false;
  }
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  // The 3D compositions are designed for wide layouts; below 1024px the static composition is used.
  const mobile = window.matchMedia("(max-width: 1023px)").matches || window.matchMedia("(pointer: coarse) and (max-width: 1366px)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const weak = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4 || nav.connection?.saveData === true;
  cached = { webgl, tier: weak ? "low" : "high", mobile, reduced };
  return cached;
}
const noopSubscribe = () => () => {};

/** Detect, once on the client, whether and how heavily to render WebGL. `null` during SSR. */
export function useSceneCapability(): Capability | null {
  return useSyncExternalStore(noopSubscribe, detect, () => null);
}

/** True while the element is on screen; used to stop render loops off-screen. */
export function useInView<T extends Element>(ref: React.RefObject<T | null>, rootMargin = "100px") {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}
