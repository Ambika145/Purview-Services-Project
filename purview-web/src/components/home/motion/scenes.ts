"use client";

import type { SceneSetup } from "./useScrollScene";

/**
 * Homepage scroll choreographies, keyed by section. Each runs lazily (see
 * useScrollScene) against server-rendered markup using data-* hooks.
 */

const difference: SceneSetup = ({ gsap, root }) => {
  const words = root.querySelectorAll("[data-word]");
  // start state stays ≥ 3:1 contrast so unfilled words remain legible
  gsap.fromTo(words, { opacity: 0.42 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-statement]"), start: "top 78%", end: "bottom 42%", scrub: true } });
  const line = root.querySelector("[data-system-line]");
  if (line) gsap.fromTo(line, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-system]"), start: "top 80%", end: "bottom 60%", scrub: true } });
  gsap.from(root.querySelectorAll("[data-layer]"), { y: 60, opacity: 0, stagger: 0.12, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: root.querySelector("[data-system]"), start: "top 78%" } });
  gsap.from(root.querySelectorAll("[data-node]"), { scale: 0, transformOrigin: "center", stagger: 0.18, duration: 0.8, ease: "back.out(2)", scrollTrigger: { trigger: root.querySelector("[data-system]"), start: "top 70%" } });
};

const world: SceneSetup = ({ gsap, root, desktop }) => {
  // Ethnocare-inspired copy reveal: ~0.9s ease-out with staggered heading/body delays
  const worldEase = "expo.out";
  gsap.from(root.querySelector("[data-world-kicker]"), { y: 20, opacity: 0, duration: 0.9, ease: worldEase, scrollTrigger: { trigger: root, start: "top 78%" } });
  gsap.from(root.querySelectorAll("[data-world-line] > span"), { yPercent: 110, duration: 1.05, stagger: 0.1, delay: 0.1, ease: worldEase, scrollTrigger: { trigger: root, start: "top 72%" } });
  gsap.from(root.querySelector("[data-world-lead]"), { y: 28, opacity: 0, duration: 0.9, delay: 0.15, ease: worldEase, scrollTrigger: { trigger: root, start: "top 70%" } });
  // Optikka-inspired object presence: scale into the stage rather than a frame sequence
  gsap.from(root.querySelector("[data-world-visual]"), { y: 44, opacity: 0, scale: 0.9, duration: 1.25, ease: worldEase, scrollTrigger: { trigger: root, start: "top 75%" } });
  if (desktop) {
    gsap.fromTo(root.querySelector("[data-world-visual]"), { y: 32 }, { y: -24, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
  }
  root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const to = Number(el.dataset.count);
    const obj = { v: 0 };
    gsap.to(obj, { v: to, duration: 2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" }, onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString("en-GB")) });
  });
  gsap.from(root.querySelectorAll("[data-metric]"), { y: 48, opacity: 0, duration: 1, ease: worldEase, stagger: 0.08, scrollTrigger: { trigger: root.querySelector("[data-metrics]"), start: "top 85%" } });
  gsap.fromTo(root.querySelector("[data-band]"), { xPercent: 0 }, { xPercent: -38, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
};

/**
 * Purview DC (adapted from the 21 TSI "Our Focus" mechanism, Details
 * JGe9LDi3hImI3zRq88DBjp): a tall section with a CSS-sticky split stage.
 * Scroll progress × count, floored, picks the active capability; CSS does
 * the row expansion and photo shutter. Line-work rotates with scroll and the
 * stage blurs softly on exit. No GSAP pin, so no pin-spacer reflow.
 */
const dataCentre: SceneSetup = ({ gsap, ScrollTrigger, root }) => {
  const q = (s: string) => root.querySelector(s);
  const qa = (s: string) => root.querySelectorAll(s);
  const soft = "power3.out";
  const n = qa("[data-dcx-row]").length;
  if (!n) return;

  const desktop = window.matchMedia("(min-width: 1024px)").matches;
  if (!desktop) {
    gsap.from(qa("[data-dcx-in]"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.09, ease: soft, scrollTrigger: { trigger: root, start: "top 80%" } });
    root.querySelectorAll<HTMLElement>("[data-dcx-row]").forEach((row) => {
      gsap.from(row.querySelectorAll(".dcx-row-no, .dcx-row-text"), { y: 18, opacity: 0, duration: 0.8, stagger: 0.06, ease: soft, scrollTrigger: { trigger: row, start: "top 88%" } });
      const media = row.querySelector(".dcx-row-media");
      if (media) {
        gsap.from(media, { clipPath: "inset(18% 0 0 0)", opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: media, start: "top 90%" } });
        gsap.fromTo(media.querySelector("img"), { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: true } });
      }
    });
    return;
  }

  // Entrance: copy rises, the stage opens from the right edge.
  gsap.from(qa("[data-dcx-in]"), { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: soft, scrollTrigger: { trigger: root, start: "top 70%" } });
  gsap.from(qa("[data-dcx-row]"), { x: -20, opacity: 0, duration: 0.8, stagger: 0.07, delay: 0.2, ease: soft, scrollTrigger: { trigger: root, start: "top 65%" } });
  gsap.fromTo(q(".dcx-frame"), { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", ease: "none", scrollTrigger: { trigger: root, start: "top 90%", end: "top top", scrub: 0.6 } });
  gsap.from(q("[data-dcx-hud]"), { scale: 0.85, opacity: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: root, start: "top 40%" } });

  const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-dcx-row]"));
  const shots = Array.from(root.querySelectorAll<HTMLElement>("[data-dcx-shot]"));
  const amb = Array.from(root.querySelectorAll<HTMLElement>("[data-dcx-amb]"));
  let current = -1;
  const setActive = (i: number) => {
    if (i === current) return;
    current = i;
    rows.forEach((r, k) => r.classList.toggle("is-on", k === i));
    amb.forEach((a, k) => a.classList.toggle("is-on", k === i));
    shots.forEach((s, k) => {
      s.classList.toggle("is-on", k === i);
      s.classList.toggle("is-before", k < i);
      s.classList.toggle("is-after", k > i);
    });
    root.style.setProperty("--dcx-i", String(i));
  };
  setActive(0);

  const st = ScrollTrigger.create({
    trigger: q("[data-dcx-scroll]"),
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const x = Math.min(self.progress * n, n - 0.0001);
      const i = Math.floor(x);
      setActive(i);
      root.style.setProperty("--dcx-p", (x - i).toFixed(3));
      root.style.setProperty("--dcx-r", `${(self.progress * 90).toFixed(2)}deg`);
    },
  });

  // Exit: the imagery softens as the next section arrives (copy and links stay crisp).
  gsap.fromTo(qa("[data-dcx-fig], .dcx-ambient"), { filter: "blur(0px)", opacity: 1 }, { filter: "blur(8px)", opacity: 0.4, ease: "none", immediateRender: false, scrollTrigger: { trigger: q("[data-dcx-scroll]"), start: "bottom 70%", end: "bottom top", scrub: true } });

  // Clicking a row jumps to its step.
  const offs = rows.map((row, i) => {
    const go = () => window.scrollTo({ top: st.start + ((i + 0.4) / n) * (st.end - st.start), behavior: "smooth" });
    row.addEventListener("click", go);
    row.style.cursor = "pointer";
    return () => {
      row.removeEventListener("click", go);
      row.style.cursor = "";
    };
  });

  return () => {
    offs.forEach((off) => off());
    ["--dcx-i", "--dcx-p", "--dcx-r"].forEach((p) => root.style.removeProperty(p));
  };
};

const workforce: SceneSetup = ({ gsap, root, desktop }) => {
  const path = root.querySelector("[data-path]");
  if (path) gsap.fromTo(path, { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: root.querySelector("[data-journey]"), start: "top 70%", end: "bottom 70%", scrub: true } });
  root.querySelectorAll<HTMLElement>("[data-step]").forEach((el) => {
    const mask = el.querySelector("[data-mask]");
    if (mask) gsap.fromTo(mask, { clipPath: "inset(18% 12% 18% 12%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", end: "top 35%", scrub: true } });
    // parallax is a desktop refinement; on phones the mask reveal is enough
    const img = el.querySelector("[data-img]");
    if (img && desktop) gsap.fromTo(img, { yPercent: -8, scale: 1.12 }, { yPercent: 8, scale: 1.12, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    gsap.from(el.querySelectorAll("[data-copy] > *"), { y: 40, opacity: 0, stagger: 0.08, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 70%" } });
  });
};

const outcomes: SceneSetup = ({ gsap, root }) => {
  const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-case]"));
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    // dim with brightness (stays opaque) so earlier panels never show through
    if (next) gsap.to(card.querySelector("[data-inner]"), { scale: 0.94, filter: "brightness(0.45)", ease: "none", scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true } });
    gsap.fromTo(card.querySelector("[data-photo]"), { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top 20%", scrub: true } });
  });
};

const globalTrust: SceneSetup = ({ gsap, root }) => {
  const q = <T extends Element = HTMLElement>(s: string) => root.querySelector<T>(s);
  const qa = <T extends Element = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));
  const expo = "expo.out";
  const soft = "power3.out";
  // Entrance tweens only for content the visitor has not reached yet. If the
  // scene is created while something is already on screen (anchor jump,
  // late idle), it stays as rendered: no hide-then-replay flicker.
  const ahead = (el: Element | null) => !!el && el.getBoundingClientRect().top > innerHeight * 0.92;
  const enter = (targets: Element[], trigger: Element | null, vars: gsap.TweenVars, start = "top 80%") => {
    const t = targets.filter(ahead);
    if (t.length && trigger) gsap.from(t, { clearProps: "transform,opacity,filter", ...vars, scrollTrigger: { trigger, start } });
  };

  /* ── atmosphere: grid and glows drift at different depths ── */
  gsap.fromTo(q(".gt-bg-grid"), { yPercent: -4 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 } });
  gsap.fromTo(q(".gt-bg-glow-a"), { "--gt-py": "-60px" }, { "--gt-py": "120px", ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 } });
  gsap.fromTo(q(".gt-bg-glow-b"), { "--gt-py": "80px" }, { "--gt-py": "-80px", ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 } });

  /* ── headline block ── */
  const kicker = q("[data-gt-kicker]");
  if (ahead(kicker)) {
    gsap.from(q(".gt-kicker-rule"), { scaleX: 0, transformOrigin: "left center", duration: 1.1, ease: expo, scrollTrigger: { trigger: root, start: "top 80%" } });
    gsap.from(kicker!.querySelector(".t-eyebrow"), { x: -14, opacity: 0, duration: 0.9, delay: 0.15, ease: soft, scrollTrigger: { trigger: root, start: "top 80%" } });
  }
  enter(qa("[data-gt-line] > span"), root, { yPercent: 115, rotate: 2.5, transformOrigin: "0% 100%", duration: 1.25, stagger: 0.12, ease: expo, clearProps: "transform" }, "top 74%");
  enter([q("[data-gt-lead]")!].filter(Boolean), root, { y: 28, opacity: 0, filter: "blur(6px)", duration: 1.1, delay: 0.25, ease: soft, clearProps: "filter" }, "top 72%");
  // gentle counter-drift between the two headline lines while the block is on screen
  const lines = qa("[data-gt-line]");
  // symmetric, so the lines are aligned while the heading sits mid-screen
  if (lines[1]) gsap.fromTo(lines[1], { x: () => -Math.min(16, innerWidth * 0.012) }, { x: () => Math.min(16, innerWidth * 0.012), ease: "none", scrollTrigger: { trigger: q("#gt-title"), start: "top bottom", end: "bottom top", scrub: 0.8 } });

  /* ── map: frame opens, image settles, markers light up ── */
  const map = q("[data-map]");
  const mapImg = q("[data-map-img]");
  if (map) {
    if (ahead(map)) {
      gsap.fromTo(map, { clipPath: "inset(10% 6% 10% 6% round 22px)", y: 40 }, { clipPath: "inset(0% 0% 0% 0% round 22px)", y: 0, duration: 1.4, ease: expo, clearProps: "clipPath", scrollTrigger: { trigger: map, start: "top 85%" } });
      const markers = qa("[data-marker]");
      // clearProps: a leftover transform would give each marker its own stacking context and trap HQ labels under later markers
      gsap.from(markers, { scale: 0, opacity: 0, duration: 0.7, stagger: 0.09, delay: 0.45, ease: "back.out(2.2)", clearProps: "transform,opacity", scrollTrigger: { trigger: map, start: "top 75%" } });
    }
    gsap.fromTo(mapImg, { scale: 1.07, yPercent: -2 }, { scale: 1, yPercent: 2, ease: "none", scrollTrigger: { trigger: map, start: "top bottom", end: "bottom top", scrub: 0.8 } });
  }

  /* ── footprint stats: cells rise in turn, numbers count from zero ── */
  const stats = q("[data-gt-stats]");
  if (stats && ahead(stats)) {
    gsap.from(qa("[data-gt-stat]"), { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: expo, clearProps: "transform,opacity", scrollTrigger: { trigger: stats, start: "top 88%" } });
    qa("[data-gt-stats] [data-count]").forEach((el, i) => {
      const to = Number(el.dataset.count);
      const obj = { v: 0 };
      el.textContent = "0"; // set while off screen, so the count never flashes the final value first
      gsap.to(obj, {
        v: to,
        duration: 1.8,
        delay: 0.15 + i * 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: stats, start: "top 88%" },
        onUpdate: () => (el.textContent = String(Math.round(obj.v))),
      });
    });
  }

  /* ── industries: heading lifts, rows stagger in reading order ── */
  const industries = q("[data-industries]");
  enter([q("[data-gt-ind-head]")!].filter(Boolean), industries, { y: 30, opacity: 0, duration: 1, ease: soft }, "top 85%");
  enter(qa("[data-ind]"), industries, { y: 22, opacity: 0, duration: 0.85, stagger: 0.06, ease: soft }, "top 82%");

  // Clients + partners: lines rise, the band settles in, the bridge draws,
  // then the partner sheet slides up over the paper like a page turning.
  const clients = root.querySelector<HTMLElement>("#clients");
  if (clients) {
    const soft = "power3.out";
    const q = (s: string) => clients.querySelector(s);
    const qa = (s: string) => clients.querySelectorAll(s);
    const headST = { trigger: clients, start: "top 75%" };

    gsap.from(qa("[data-gtc-line]"), { yPercent: 110, duration: 1.1, stagger: 0.09, ease: "expo.out", scrollTrigger: headST });
    gsap.from(qa("[data-gtc-fade]"), { y: 22, opacity: 0, duration: 0.9, stagger: 0.1, delay: 0.1, ease: soft, scrollTrigger: headST });
    gsap.from(q("[data-gtc-rule]"), { scaleX: 0, duration: 0.9, delay: 0.15, ease: soft, scrollTrigger: headST });
    gsap.fromTo(q("[data-gtc-ghost]"), { yPercent: 18, opacity: 0 }, { yPercent: -12, opacity: 1, ease: "none", scrollTrigger: { trigger: clients, start: "top bottom", end: "top 10%", scrub: 0.8 } });

    const proof = q("[data-gtc-proof]");
    gsap.from(qa("[data-gtc-fact]"), { y: 18, opacity: 0, duration: 0.8, stagger: 0.1, ease: soft, scrollTrigger: { trigger: proof, start: "top 90%" } });
    clients.querySelectorAll<HTMLElement>("[data-gt-num]").forEach((el, i) => {
      const to = Number(el.dataset.gtNum);
      const obj = { v: 0 };
      gsap.to(obj, { v: to, duration: 1.4, delay: 0.1 + i * 0.12, ease: "power2.out", scrollTrigger: { trigger: proof, start: "top 90%" }, onUpdate: () => (el.textContent = String(Math.round(obj.v))) });
    });

    gsap.from(q("[data-gtc-band]"), { opacity: 0, y: 30, duration: 1.1, ease: soft, scrollTrigger: { trigger: q("[data-gtc-band]"), start: "top 88%" } });
    gsap.from(qa("[data-gtc-cred]"), { y: 14, opacity: 0, duration: 0.7, stagger: 0.08, ease: soft, scrollTrigger: { trigger: q("[data-gtc-creds]"), start: "top 92%" } });

    const bridgeST = { trigger: q("[data-gtc-bridge]"), start: "top 85%" };
    gsap.from(qa("[data-gtc-wire]"), { scaleX: 0, duration: 1.2, delay: 0.2, ease: "expo.inOut", scrollTrigger: bridgeST });
    gsap.from(q("[data-gtc-hub]"), { scale: 0.85, opacity: 0, duration: 0.8, ease: "back.out(1.6)", scrollTrigger: bridgeST });
    gsap.from(qa(".gtc-node"), { y: 12, opacity: 0, duration: 0.7, stagger: 0.1, delay: 0.35, ease: soft, scrollTrigger: bridgeST });

    const sheet = q("[data-gtc-sheet]");
    gsap.fromTo(sheet, { y: 80 }, { y: 0, ease: "none", scrollTrigger: { trigger: sheet, start: "top bottom", end: "top 55%", scrub: 0.6 } });
    gsap.from(q("[data-gtc-phead]"), { y: 24, opacity: 0, duration: 0.9, ease: soft, scrollTrigger: { trigger: sheet, start: "top 75%" } });
    const indexST = { trigger: q("[data-gtc-index]"), start: "top 82%" };
    gsap.from(qa("[data-gtp-tab]"), { x: -18, opacity: 0, duration: 0.7, stagger: 0.06, ease: soft, scrollTrigger: indexST });
    gsap.from(q(".gtp-stage"), { y: 24, opacity: 0, duration: 0.9, delay: 0.2, ease: soft, scrollTrigger: indexST });
  }
};

/**
 * Beyond capabilities: the headline rises word by word and its last word
 * fills with ink as you scroll; column lines draw down the section. On
 * desktop the row nearest the reading line becomes active, and the sticky
 * aperture shutters to that row's photograph (CSS does the transitions).
 */
const beyond: SceneSetup = ({ gsap, root }) => {
  const q = (s: string) => root.querySelector(s);
  const qa = (s: string) => root.querySelectorAll(s);
  const soft = "power3.out";

  gsap.from(qa("[data-by-col]"), { scaleY: 0, duration: 1.6, stagger: 0.08, ease: "expo.inOut", scrollTrigger: { trigger: root, start: "top 80%" } });
  gsap.from(q("[data-by-eyebrow]"), { y: 16, opacity: 0, duration: 0.8, ease: soft, scrollTrigger: { trigger: root, start: "top 72%" } });
  gsap.from(qa("[data-by-word]"), { yPercent: 115, rotate: 4, transformOrigin: "0% 100%", duration: 1.1, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: root, start: "top 70%" } });
  gsap.fromTo(q(".by-word-last"), { backgroundPosition: "100% 0" }, { backgroundPosition: "0% 0", ease: "none", scrollTrigger: { trigger: q("#beyond-title"), start: "top 70%", end: "bottom 30%", scrub: 0.6 } });
  gsap.from(q("[data-by-lead]"), { y: 30, opacity: 0, duration: 1, delay: 0.35, ease: soft, scrollTrigger: { trigger: root, start: "top 70%" } });
  // gentle counter-drift between headline and lead
  gsap.to(q("#beyond-title"), { yPercent: -8, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "top top", scrub: true } });

  const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-by-row]"));
  rows.forEach((row) => {
    gsap.from(row.querySelectorAll(".by-row-meta, .by-title, .by-shot-inline, .by-copy"), {
      y: 28,
      opacity: 0,
      duration: 0.9,
      stagger: 0.07,
      ease: soft,
      clearProps: "transform,opacity",
      scrollTrigger: { trigger: row, start: "top 85%" },
    });
  });

  const desktop = window.matchMedia("(min-width: 1024px)").matches;
  if (!desktop) {
    root.querySelectorAll<HTMLElement>(".by-shot-inline img").forEach((img) => {
      gsap.fromTo(img, { yPercent: -8, scale: 1.12 }, { yPercent: 8, scale: 1.12, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
    return;
  }

  const shots = Array.from(root.querySelectorAll<HTMLElement>("[data-by-shot]"));
  const ticks = Array.from(root.querySelectorAll<HTMLElement>("[data-by-tick]"));
  const roll = q("[data-by-roll]") as HTMLElement | null;
  let current = -1;
  const setActive = (i: number) => {
    if (i === current) return;
    current = i;
    rows.forEach((r, k) => r.classList.toggle("is-active", k === i));
    shots.forEach((s, k) => {
      s.classList.toggle("is-active", k === i);
      s.classList.toggle("is-before", k < i);
      s.classList.toggle("is-after", k > i);
    });
    ticks.forEach((t, k) => t.classList.toggle("is-on", k <= i));
    roll?.style.setProperty("--by-i", String(i));
  };
  setActive(0);

  rows.forEach((row, i) => {
    gsap.timeline({ scrollTrigger: { trigger: row, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && setActive(i) } });
  });
  const offs = rows.map((row, i) => {
    const on = () => setActive(i);
    row.addEventListener("pointerenter", on);
    row.addEventListener("focusin", on);
    return () => {
      row.removeEventListener("pointerenter", on);
      row.removeEventListener("focusin", on);
    };
  });

  // aperture drifts slightly against the scroll for depth
  gsap.fromTo(q("[data-by-fig] .by-frame"), { y: 40 }, { y: -40, ease: "none", scrollTrigger: { trigger: q("[data-by-list]"), start: "top bottom", end: "bottom top", scrub: true } });

  return () => offs.forEach((off) => off());
};

/**
 * Closing enquiry — entrance adapted from Revelatio's contact page
 * (Details f195c308483944bc8a7aaa9bf52283d6): elements enter with autoAlpha
 * 0→1 and y .75em→0 over .9s power3.out, .18s apart. Here it is scroll-
 * triggered, the statement lines rise out of masks first and the form fields
 * follow in reading order. The statement column is CSS-sticky on desktop.
 * Content already on screen when the scene starts is left as rendered.
 */
const finalCta: SceneSetup = ({ gsap, root }) => {
  const section = root.querySelector<HTMLElement>("[data-cta]");
  if (!section) return;
  const ahead = (el: Element | null) => !!el && el.getBoundingClientRect().top > innerHeight * 0.92;
  const ease = "power3.out";

  const rule = section.querySelector("[data-lt-rule]");
  if (ahead(section)) gsap.from(rule, { scaleX: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: section, start: "top 85%" } });

  const lines = Array.from(section.querySelectorAll("[data-lt-line]"));
  if (ahead(lines[0] ?? null)) {
    gsap.from(lines, { yPercent: 110, duration: 1.15, stagger: 0.12, ease: "expo.out", clearProps: "transform", scrollTrigger: { trigger: lines[0], start: "top 88%" } });
    gsap.from(section.querySelectorAll("[data-lt-fade]"), { autoAlpha: 0, y: "0.75em", duration: 0.9, delay: 0.38, stagger: 0.18, ease, clearProps: "transform,opacity,visibility", scrollTrigger: { trigger: lines[0], start: "top 88%" } });
  }

  const panel = section.querySelector("[data-lt-panel]");
  if (ahead(panel)) {
    gsap.from(panel, { autoAlpha: 0, y: 36, duration: 1, ease, clearProps: "transform,opacity,visibility", scrollTrigger: { trigger: panel, start: "top 88%" } });
    gsap.from(section.querySelectorAll("[data-lt-in]"), { autoAlpha: 0, y: "0.75em", duration: 0.9, delay: 0.2, stagger: 0.09, ease, clearProps: "transform,opacity,visibility", scrollTrigger: { trigger: panel, start: "top 82%" } });
  }
};

/**
 * What we do: five doors on one sticky stage (desktop). Scroll position picks
 * the open door; --wwd-p carries progress within the step for the bar and
 * the photographs' parallax. Clicking or focusing a closed door scrolls to
 * it. Below 1024px the doors are a stacked sequence with simple reveals.
 */
const whatWeDo: SceneSetup = ({ gsap, ScrollTrigger, root }) => {
  const q = (s: string) => root.querySelector(s);
  const soft = "power3.out";
  const doors = Array.from(root.querySelectorAll<HTMLElement>("[data-wwd-door]"));
  const n = doors.length;
  if (!n) return;

  gsap.from(q("[data-wwd-h2]"), { yPercent: 110, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: root, start: "top 78%" } });
  gsap.from(q("[data-wwd-eyebrow]"), { y: 14, opacity: 0, duration: 0.8, ease: soft, scrollTrigger: { trigger: root, start: "top 80%" } });
  gsap.from(q(".wwd-eyebrow-rule"), { scaleX: 0, duration: 1, delay: 0.2, ease: soft, scrollTrigger: { trigger: root, start: "top 80%" } });

  const desktop = window.matchMedia("(min-width: 1024px)").matches;
  if (!desktop) {
    doors.forEach((door) => {
      gsap.from(door.querySelector(".wwd-media"), { clipPath: "inset(12% 0 0 0)", opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: door, start: "top 88%" } });
      gsap.from(door.querySelectorAll(".wwd-copy > *"), { y: 22, opacity: 0, duration: 0.8, stagger: 0.07, ease: soft, scrollTrigger: { trigger: door, start: "top 70%" } });
      gsap.fromTo(door.querySelector(".wwd-main"), { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: door, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(door.querySelector(".wwd-inset-a"), { y: 30 }, { y: -30, ease: "none", scrollTrigger: { trigger: door, start: "top bottom", end: "bottom top", scrub: true } });
    });
    return;
  }

  // Doors rise in as the stage arrives.
  gsap.from(doors, { y: 80, opacity: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: q("[data-wwd-doors]"), start: "top 92%" } });
  gsap.from(q("[data-wwd-meter]"), { y: 16, opacity: 0, duration: 0.8, delay: 0.3, ease: soft, scrollTrigger: { trigger: root, start: "top 70%" } });

  let current = -1;
  const open = (i: number) => {
    if (i === current) return;
    current = i;
    doors.forEach((d, k) => d.classList.toggle("is-open", k === i));
    root.style.setProperty("--wwd-i", String(i));
  };
  open(0);

  const st = ScrollTrigger.create({
    trigger: q("[data-wwd-scroll]"),
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const x = self.progress * n;
      const i = Math.min(n - 1, Math.floor(x));
      open(i);
      root.style.setProperty("--wwd-p", String(i === n - 1 ? Math.min(1, (x - i) * 1.25) : x - i).slice(0, 5));
    },
  });

  // jump to a door: centre of its scroll step
  const go = (i: number, smooth: boolean) => {
    const y = st.start + ((i + 0.35) / n) * (st.end - st.start);
    window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
  };
  const offs = doors.map((door, i) => {
    const spine = door.querySelector<HTMLElement>("[data-wwd-open]");
    const click = () => go(i, !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const focus = () => {
      if (current !== i) go(i, false);
      open(i);
    };
    spine?.addEventListener("click", click);
    door.addEventListener("focusin", focus);
    return () => {
      spine?.removeEventListener("click", click);
      door.removeEventListener("focusin", focus);
    };
  });

  return () => {
    offs.forEach((off) => off());
    root.style.removeProperty("--wwd-i");
    root.style.removeProperty("--wwd-p");
  };
};

export const SCENES = { whatWeDo, difference, world, dataCentre, workforce, outcomes, globalTrust, beyond, finalCta } satisfies Record<string, SceneSetup>;
export type SceneName = keyof typeof SCENES;
