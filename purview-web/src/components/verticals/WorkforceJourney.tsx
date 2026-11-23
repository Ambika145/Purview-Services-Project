"use client";

import Image from "next/image";
import { useState } from "react";
import { WORKFORCE } from "@/content/verticals";
import { TextLink } from "@/components/ui/Button";

const IMG: Record<string, string> = {
  recruit: "/img/volume-recruitment.jpg",
  train: "/img/rtd.jpg",
  deploy: "/img/ai-infrastructure.jpg",
  operate: "/img/infra-managed.jpg",
};

/**
 * The operating model as one connected track. Selecting a stage shows how
 * it is delivered and which Purview platforms and services carry it.
 */
export function WorkforceJourney() {
  const [i, setI] = useState(0);
  const s = WORKFORCE.journey[i];
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-12">
        <div className="relative grid grid-cols-4 gap-2" role="tablist" aria-label="Operating model">
          <span className="absolute top-5 right-[12.5%] left-[12.5%] h-px bg-sky/25" aria-hidden />
          <span className="absolute top-5 left-[12.5%] h-px bg-accent transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ width: `${(i / 3) * 75}%` }} aria-hidden />
          {WORKFORCE.journey.map((x, k) => (
            <div key={x.id} className="relative flex justify-center">
              <button
                type="button"
                role="tab"
                id={`wj-${x.id}`}
                aria-selected={k === i}
                aria-controls="wj-panel"
                onClick={() => setI(k)}
                className="group flex flex-col items-center gap-3 text-center"
              >
                <span className={`relative z-10 grid size-10 place-items-center rounded-full border transition-colors ${k <= i ? "border-accent bg-accent text-[#1a0d04]" : "border-sky/40 bg-abyss text-on-dark-muted group-hover:border-sky"}`}>
                  <span className="t-mono text-xs font-medium">{String(k + 1).padStart(2, "0")}</span>
                </span>
                <span className={`text-sm font-bold sm:text-lg ${k === i ? "text-on-dark" : "text-on-dark-muted group-hover:text-on-dark"}`}>{x.t}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div id="wj-panel" role="tabpanel" aria-labelledby={`wj-${s.id}`} className="grid gap-8 lg:col-span-12 lg:grid-cols-12" aria-live="polite">
        <div key={s.id + "i"} className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-m)] lg:col-span-6 motion-safe:animate-[fadeUp_.6s_cubic-bezier(.22,1,.36,1)_both]">
          <Image src={IMG[s.id]} alt="" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/10 to-transparent" />
          <p className="absolute bottom-5 left-6 text-[clamp(2.25rem,1.5rem+2.5vw,3.75rem)] leading-none font-extrabold tracking-tight text-accent">{s.stat.v}</p>
          <p className="t-mono absolute top-3 right-3 text-[0.6rem] text-on-dark-muted">Illustrative imagery</p>
        </div>
        <div key={s.id + "c"} className="lg:col-span-6 motion-safe:animate-[fadeUp_.6s_.06s_cubic-bezier(.22,1,.36,1)_both]">
          <p className="t-mono text-xs text-accent">
            {String(i + 1).padStart(2, "0")} / 04 · {s.t.toUpperCase()}
          </p>
          <h3 className="t-h3 mt-3">{s.head}</h3>
          <p className="mt-4 text-on-dark-muted">{s.d}</p>
          <p className="mt-6 text-sm text-on-dark-muted">
            <span className="font-bold text-on-dark">{s.stat.v}</span> {s.stat.l}
          </p>
          <p className="t-eyebrow mt-8 text-sky">Delivered through</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {s.tools.map((t) => (
              <li key={t} className="rounded border border-sky/25 px-3 py-1.5 text-sm">
                {t}
              </li>
            ))}
          </ul>
          <TextLink href={s.href} className="mt-8 text-on-dark">
            More on {s.t.toLowerCase()}: {s.tools[0]}
          </TextLink>
        </div>
      </div>
    </div>
  );
}
