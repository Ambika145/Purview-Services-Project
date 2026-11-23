"use client";

import { useId, useState } from "react";
import { LogoMark } from "@/components/ui/LogoMark";

type Group = { title: string; logos: readonly string[] };

/**
 * Technology partners as an editorial index: categories on the left, the
 * active category's partners on the right. Desktop reacts to hover, focus and
 * arrow keys; below 1024px every category is shown in sequence instead.
 */
export function PartnerIndex({ groups }: { groups: readonly Group[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const total = String(groups.length).padStart(2, "0");

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + groups.length) % groups.length;
    setActive(n);
    document.getElementById(`${uid}-tab-${n}`)?.focus();
  };

  return (
    <div className="gtp grid lg:grid-cols-12 lg:gap-16">
      <div role="tablist" aria-orientation="vertical" aria-label="Partner categories" className="gtp-list hidden lg:col-span-5 lg:block">
        {groups.map((g, i) => (
          <button
            key={g.title}
            id={`${uid}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls={`${uid}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            data-gtp-tab
            className="gtp-tab"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="gtp-tab-no t-mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="gtp-tab-title">{g.title}</span>
            <span className="gtp-tab-count t-mono">{g.logos.length}</span>
          </button>
        ))}
      </div>

      <div className="gtp-stage lg:col-span-7">
        {groups.map((g, i) => (
          <div
            key={g.title}
            id={`${uid}-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${i}`}
            data-gtp-panel
            data-active={active === i}
            className="gtp-panel"
          >
            <span className="gtp-ghost" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="gtp-panel-head">
              <span className="t-mono text-[0.68rem] text-accent-strong">
                {String(i + 1).padStart(2, "0")} / {total}
              </span>
              <h4 className="text-[1.15rem] leading-snug font-extrabold tracking-[-0.015em] lg:text-[1.35rem]">{g.title}</h4>
              <span className="t-mono text-[0.68rem] text-muted">{g.logos.length} partners</span>
            </div>
            <ul className="gtp-logos">
              {g.logos.map((n, j) => (
                <li key={n} className="gtp-logo logo-cell" style={{ "--i": j } as React.CSSProperties}>
                  <LogoMark name={n} height={34} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
