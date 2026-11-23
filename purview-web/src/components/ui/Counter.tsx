"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to a published figure when it enters view. The server renders
 * the final value, so crawlers, no-JS and reduced-motion users always see
 * the real number; the count-up only runs when motion is allowed.
 */
export function Counter({ to, prefix = "", suffix = "", duration = 1600, className = "" }: { to: number; prefix?: string; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) return; // already visible on load: leave as is
    setVal(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {val.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}
