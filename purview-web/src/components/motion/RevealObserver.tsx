"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One IntersectionObserver for every [data-reveal] element on the page.
 * CSS owns the animation (globals.css); this only toggles .is-in, so there
 * is no per-element React state. A MutationObserver also picks up nodes that
 * React adds or replaces later (client re-renders, tab panels), so content
 * can never be left in its hidden start state. Without JS nothing is hidden.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-in");
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const watch = (root: ParentNode) => {
      root.querySelectorAll?.("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    };
    watch(document);
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          if (n.matches("[data-reveal]:not(.is-in)")) io.observe(n);
          watch(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    // Safety net: anything already on screen after load is shown.
    const t = window.setTimeout(() => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
      });
    }, 2500);
    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(t);
    };
  }, [pathname]);
  return null;
}
