"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pointer parallax for the ecosystem field. Lerps --px/--py in rAF so far,
 * mid and near layers travel at different CSS speeds without jitter. Pauses
 * CSS and SVG motion while the stage is off screen. Off for touch and
 * reduced motion.
 */
export function EcoTilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stage = el.parentElement;
    if (!stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;
    let tracking = false;

    const write = () => {
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;
      el.style.setProperty("--px", curX.toFixed(3));
      el.style.setProperty("--py", curY.toFixed(3));
      if (Math.abs(targetX - curX) > 0.001 || Math.abs(targetY - curY) > 0.001) {
        raf = requestAnimationFrame(write);
      } else {
        tracking = false;
      }
    };
    const kick = () => {
      if (tracking) return;
      tracking = true;
      raf = requestAnimationFrame(write);
    };

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      targetX = (e.clientX - r.left) / r.width - 0.5;
      targetY = (e.clientY - r.top) / r.height - 0.5;
      kick();
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    if (!reduced && !coarse) {
      stage.addEventListener("pointermove", onMove, { passive: true });
      stage.addEventListener("pointerleave", onLeave);
    }

    const svgs = () => [...stage.querySelectorAll("svg")];
    const setRunning = (run: boolean) => {
      for (const svg of svgs()) {
        if (run) svg.unpauseAnimations();
        else svg.pauseAnimations();
      }
    };
    if (reduced) setRunning(false);

    const io = new IntersectionObserver(
      ([entry]) => {
        const paused = reduced || !entry.isIntersecting;
        stage.toggleAttribute("data-paused", paused);
        setRunning(!paused);
      },
      { rootMargin: "80px" },
    );
    io.observe(stage);

    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="eco-field">
      {children}
    </div>
  );
}
