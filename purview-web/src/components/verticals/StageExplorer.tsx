"use client";

import { useState } from "react";
import { DC } from "@/content/verticals";

/** Eight stages from powered shell to production, as an accessible tablist. */
export function StageExplorer() {
  const [i, setI] = useState(4);
  const s = DC.stages[i];
  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const n = (i + map[e.key] + 8) % 8;
    setI(n);
    document.getElementById(`stage-tab-${n}`)?.focus();
  };
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div role="tablist" aria-label="Eight delivery stages" aria-orientation="vertical" onKeyDown={onKey} className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-m)] border border-sky/15 bg-sky/15 sm:grid-cols-4 lg:grid-cols-2">
          {DC.stages.map((x, k) => (
            <button
              key={x.n}
              id={`stage-tab-${k}`}
              role="tab"
              aria-selected={k === i}
              aria-controls="stage-panel"
              tabIndex={k === i ? 0 : -1}
              onClick={() => setI(k)}
              className={`flex min-h-24 flex-col justify-between p-4 text-left transition-colors ${k === i ? "bg-accent text-[#1a0d04]" : "bg-abyss text-on-dark hover:bg-ink"}`}
            >
              <span className={`t-mono text-[0.7rem] ${k === i ? "text-[#1a0d04]/75" : "text-on-dark-muted"}`}>
                {String(x.n).padStart(2, "0")} · {x.scope}
              </span>
              <span className="font-bold leading-tight">{x.t}</span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-on-dark-muted">
          <span className="font-semibold text-on-dark">Stages 1–4</span> are extended scope, taken on as needed around your in-house capability. <span className="font-semibold text-on-dark">Stages 5–8</span> are core delivery by Purview installation specialists.
        </p>
      </div>
      <div id="stage-panel" role="tabpanel" aria-labelledby={`stage-tab-${i}`} tabIndex={0} className="lg:col-span-7">
        <div key={s.n} className="motion-safe:animate-[fadeUp_.5s_cubic-bezier(.22,1,.36,1)_both]">
          <p className="t-mono text-xs text-accent">
            STAGE {String(s.n).padStart(2, "0")} / 08 · {s.scope.toUpperCase()} {s.scope === "Core" ? "DELIVERY" : "SCOPE"}
          </p>
          <h3 className="mt-3 text-[clamp(2rem,1.4rem+2vw,3.25rem)] leading-none font-extrabold tracking-[-0.03em]">{s.t}</h3>
          <p className="t-lead mt-5 max-w-[48ch] text-on-dark-muted">{s.d}</p>
          <ul className="mt-8 border-t border-sky/15">
            {s.items.map((it) => (
              <li key={it} className="flex gap-4 border-b border-sky/15 py-3.5">
                <span className="mt-[0.7rem] h-px w-4 shrink-0 bg-accent" aria-hidden />
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
