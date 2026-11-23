"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useInView, useSceneCapability } from "@/components/three/SceneGate";
import type { Focus } from "./TrinityScene";

const TrinityScene = dynamic(() => import("./TrinityScene"), { ssr: false });

/** The three verticals: the centre of the homepage. Copy and figures from purviewservices.com. */
const TRINITY = [
  {
    href: "/tech",
    index: "01",
    role: "The applications",
    name: "Purview Tech",
    line: "Gen AI and agentic applications, enterprise software, data, cloud and security, built to run in production.",
    proof: "98% task success · live agentic POC, major US financial institution",
    image: "/img/hero-seva.jpg",
    tone: "sky",
  },
  {
    href: "/data-centre",
    index: "02",
    role: "The infrastructure",
    name: "Purview Data Centre",
    line: "AI-ready data centres and GPU floors: designed, installed, commissioned and operated by Purview DC.",
    proof: "~500 MW of AI infrastructure capacity delivered",
    image: "/img/dc-corridor-blue.jpg",
    tone: "accent",
  },
  {
    href: "/workforce",
    index: "03",
    role: "The people",
    name: "Purview Workforce",
    line: "Agentic AI recruitment and certified engineers, recruited, trained and deployed where the work is.",
    proof: "2,500 professionals across 21 countries",
    image: "/img/workforce-professionals.jpg",
    tone: "mint",
  },
] as const;

const CYCLE_MS = 6500;

export function HeroTrinity() {
  const cap = useSceneCapability();
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const focus = useRef<Focus>(-1);
  const progress = useRef(0);
  const inView = useInView(section);
  const [active, setActive] = useState<number>(-1);
  const [autoplay, setAutoplay] = useState(true);
  const [ready, setReady] = useState(false);
  const [idle, setIdle] = useState(false);

  const motionOK = !!cap && !cap.reduced;
  const use3D = !!cap && cap.webgl && !cap.mobile && !cap.reduced && idle;

  // Mount WebGL when the browser is idle; the photographic layer is already on screen.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setIdle(true), { timeout: 2000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setIdle(true), 1000);
    return () => window.clearTimeout(t);
  }, []);

  // Keep the scene's focus ref in sync (the scene reads it every frame).
  useEffect(() => {
    focus.current = active as Focus;
  }, [active]);

  // Start the showcase cycle after the intro (motion only).
  useEffect(() => {
    if (!motionOK) return;
    const t = window.setTimeout(() => setActive((a) => (a === -1 ? 0 : a)), 2600);
    return () => window.clearTimeout(t);
  }, [motionOK]);

  useEffect(() => {
    const onScroll = () => {
      const h = section.current?.offsetHeight || window.innerHeight;
      progress.current = Math.min(1, Math.max(0, window.scrollY / h));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const next = useCallback(() => setActive((a) => (a + 1) % 3), []);
  const take = (i: number) => {
    setActive(i);
    setAutoplay(false);
  };
  const release = () => setAutoplay(true);

  // Hero → next section: the stage recedes into a framed panel as you scroll on.
  // A scroll-linked transform in rAF (no animation library needed at load).
  useEffect(() => {
    if (!motionOK) return;
    const copy = section.current?.querySelector<HTMLElement>("[data-hero-copy]");
    let raf = 0;
    const apply = () => {
      const p = progress.current;
      if (stage.current) {
        stage.current.style.transform = `scale(${1 - p * 0.08})`;
        stage.current.style.borderRadius = `${p * 28}px`;
        stage.current.style.opacity = String(1 - p * 0.65);
      }
      if (copy) {
        const c = Math.min(1, p / 0.6);
        copy.style.transform = `translateY(${-c * 18}%)`;
        copy.style.opacity = String(1 - c);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [motionOK]);

  const a = active < 0 ? null : TRINITY[active];

  return (
    <section ref={section} className="on-dark relative isolate overflow-hidden bg-abyss" aria-labelledby="hero-title">
      {/* ---------- stage: photography + WebGL ---------- */}
      <div ref={stage} className="absolute inset-0 -z-10 origin-top overflow-hidden will-change-transform" aria-hidden>
        {TRINITY.map((t, i) => (
          <Image
            key={t.href}
            src={t.image}
            alt=""
            fill
            loading={i === 1 ? "eager" : "lazy"}
            sizes="100vw"
            className={`object-cover transition-[opacity,transform] duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] ${
              (active === -1 ? i === 1 : active === i) && !(use3D && ready) ? "scale-100 opacity-45" : "scale-105 opacity-0"
            }`}
          />
        ))}
        {use3D && (
          <div className={`absolute inset-0 transition-opacity duration-[1600ms] lg:left-[38%] lg:[mask-image:linear-gradient(to_right,transparent,black_22%)] ${ready ? "opacity-100" : "opacity-0"}`}>
            <TrinityScene focus={focus} animate={motionOK} active={inView} progress={progress} low={cap?.tier === "low"} onReady={() => setReady(true)} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/75 to-abyss/0 lg:via-abyss/40" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-abyss via-abyss/70 to-transparent" />
        <div className="blueprint absolute inset-0 opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      </div>

      <div className="relative flex min-h-[100svh] flex-col [@media(min-height:860px)]:h-[100svh]">
        {/* ---------- headline ---------- */}
        <div data-hero-copy className="wrap-wide relative flex flex-1 flex-col justify-center pt-24 pb-5 md:min-h-0 md:pt-[max(5.5rem,11vh)]">
          <p className="t-eyebrow flex items-center gap-3 text-[0.68rem] text-sky sm:text-xs" data-hero-fade style={{ "--d": "80ms" } as React.CSSProperties}>
            <span className="h-px w-10 bg-accent" aria-hidden />
            Intelligence · Infrastructure · People
          </p>
          <h1 id="hero-title" className="mt-4 md:mt-[min(1.5rem,2.4vh)] max-w-[15ch] text-[clamp(2.15rem,min(7.2vw,8.4vh),6.6rem)] leading-[0.94] font-extrabold tracking-[-0.045em] lg:max-w-[16ch]">
            <span className="mask-line">
              <span style={{ "--d": "150ms" } as React.CSSProperties}>
                We build{" "}
                <em className={`not-italic transition-colors duration-700 ${active === 0 ? "text-sky" : "text-on-dark"}`}>intelligent applications</em>.
              </span>
            </span>
            <span className="mask-line">
              <span style={{ "--d": "300ms" } as React.CSSProperties}>
                <span className="text-on-dark/55">And the </span>
                <em className={`relative not-italic transition-colors duration-700 ${active === 1 ? "text-accent" : "text-on-dark"}`}>infrastructure</em>
                <span className="text-on-dark/55"> they run&nbsp;on.</span>
              </span>
            </span>
          </h1>
          {/* mobile: the three verticals sit directly under the headline */}
          <nav aria-label="Purview capabilities" className="md:hidden" data-hero-fade style={{ "--d": "450ms" } as React.CSSProperties}>
          <ul className="mt-6 grid gap-2">
            {TRINITY.map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="group flex items-center gap-4 rounded-[var(--radius-m)] border border-sky/20 bg-abyss/70 p-2 pr-4 backdrop-blur-md active:bg-ink">
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-[8px]">
                    <Image src={t.image} alt="" fill sizes="48px" className="object-cover" />
                    <span className={`absolute inset-x-0 bottom-0 h-0.5 ${t.tone === "sky" ? "bg-sky" : t.tone === "accent" ? "bg-accent" : "bg-[#5ef0c8]"}`} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="t-mono block text-[0.65rem] text-on-dark-muted">
                      {t.index} / {t.role.toUpperCase()}
                    </span>
                    <span className="block text-[1.05rem] leading-tight font-extrabold">{t.name}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="size-5 shrink-0 text-accent" />
                </Link>
              </li>
            ))}
          </ul>
          </nav>
          <div className="mt-7 flex flex-col gap-6 md:mt-[min(1.75rem,3vh)] lg:flex-row lg:items-end lg:gap-14" data-hero-fade style={{ "--d": "500ms" } as React.CSSProperties}>
            <div className="max-w-[40rem] space-y-4 md:[@media(max-height:700px)]:hidden">
              <p className="t-lead text-on-dark-muted pretty">
                Most technology companies do one or the other. Purview does both: delivering GenAI and agentic applications for enterprises and governments, while designing, building and operating the AI-ready data centres, networks and devices that power them.
              </p>
              <p className="text-sm leading-relaxed text-on-dark-muted pretty [@media(max-height:760px)]:hidden">
                Backed by 17 years of experience and approximately 500 MW of AI infrastructure capacity delivered, we bring application and infrastructure expertise together in one team.
              </p>
              <p className="text-sm font-semibold text-sky">One technology partner. From application to infrastructure.</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-5">
              <Link href="/contact" className="btn btn-primary">
                Bring us a problem statement <ArrowUpRight aria-hidden className="btn-arrow size-4" />
              </Link>
              <a href="#what-we-do" className="link-arrow inline-flex text-on-dark">
                Explore our capabilities <ArrowDown aria-hidden className="size-4" />
              </a>
            </div>
          </div>
          {/* live state caption: what the scene is showing */}
          <p className="t-mono mt-5 hidden min-h-5 text-xs text-on-dark-muted lg:block [@media(max-height:820px)]:!hidden" aria-live="polite">
            {a ? (
              <>
                <span className="text-accent">{a.index}</span> · {a.role.toUpperCase()} — {a.proof}
              </>
            ) : (
              "One group · three capabilities · one accountable partner"
            )}
          </p>
        </div>

        {/* ---------- the three verticals ---------- */}
        <nav aria-label="Purview capabilities" className="relative hidden md:block" data-hero-fade style={{ "--d": "700ms" } as React.CSSProperties} onMouseLeave={release} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && release()}>
          {/* desktop / tablet rail */}
          <ul className="hidden border-t border-sky/15 bg-abyss/55 backdrop-blur-md md:grid md:grid-cols-3">
            {TRINITY.map((t, i) => {
              const on = active === i;
              return (
                <li key={t.href} className={`relative ${i > 0 ? "border-l border-sky/15" : ""}`}>
                  {/* progress / active bar */}
                  <span className="absolute inset-x-0 top-0 h-[2px] bg-sky/10" aria-hidden>
                    <span
                      key={`${active}-${autoplay}`}
                      className={`block h-full origin-left ${t.tone === "sky" ? "bg-sky" : t.tone === "accent" ? "bg-accent" : "bg-[#5ef0c8]"} ${
                        on ? (autoplay && motionOK ? "animate-[trinity-progress_linear_forwards]" : "scale-x-100") : "scale-x-0"
                      }`}
                      style={{ animationDuration: `${CYCLE_MS}ms` }}
                      onAnimationEnd={on && autoplay ? next : undefined}
                    />
                  </span>
                  <Link
                    href={t.href}
                    onMouseEnter={() => take(i)}
                    onFocus={() => take(i)}
                    className={`group relative flex h-full flex-col px-[clamp(1.25rem,2.4vw,2.5rem)] pt-[min(1.5rem,2.6vh)] pb-[min(1.75rem,3vh)] transition-colors duration-500 ${on ? "bg-ink/80" : "hover:bg-ink/50"}`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="t-mono text-xs text-on-dark-muted">
                        <span className={on ? "text-accent" : ""}>{t.index}</span> / {t.role.toUpperCase()}
                      </span>
                      <span className={`grid size-9 place-items-center rounded-full border transition-all duration-500 ${on ? "rotate-0 border-accent bg-accent text-[#1a0d04]" : "-rotate-45 border-sky/30 text-on-dark"}`}>
                        <ArrowUpRight aria-hidden className="size-4" />
                      </span>
                    </span>
                    <span className={`mt-[min(1rem,1.6vh)] text-[clamp(1.35rem,min(2.3vw,4vh),2.4rem)] leading-[1.02] font-extrabold tracking-[-0.03em] transition-colors duration-500 ${on || active === -1 ? "text-on-dark" : "text-on-dark/60"}`}>
                      {t.name}
                    </span>
                    {/* fixed space: revealing the line never shifts the layout */}
                    <span className={`mt-3 block max-w-[34ch] text-sm leading-relaxed text-on-dark-muted transition-[opacity,transform] [@media(max-height:820px)]:hidden duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${on || active === -1 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-35"}`}>
                      {t.line}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

        </nav>
      </div>
      <style>{`@keyframes trinity-progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </section>
  );
}
