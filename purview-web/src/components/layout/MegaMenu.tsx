"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { COMPANY_LINKS, CONTACT, INDUSTRY_LINKS, MEGA, VERTICALS } from "@/content/site";

/**
 * Solutions panel: the three verticals are drawn as a stacked system
 * (A applications / B infrastructure / C people). Hover or focus a layer to
 * see its services; every link is also reachable by Tab in reading order.
 */
export function MegaMenu({ panel, onNavigate }: { panel: "solutions" | "company"; onNavigate: () => void }) {
  const [active, setActive] = useState<(typeof VERTICALS)[number]["id"]>("tech");

  if (panel === "company") {
    return (
      <div className="border-b border-sky/10 bg-abyss/95 backdrop-blur-xl">
        <div className="wrap-wide grid grid-cols-12 gap-8 py-10">
          <div className="col-span-3">
            <p className="t-eyebrow text-sky">Company</p>
            <p className="t-h3 mt-4 max-w-[14ch] text-on-dark">Founded in Scotland. Built for the AI era.</p>
          </div>
          <ul className="col-span-5 grid grid-cols-2 gap-x-8">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={onNavigate} className="group flex items-center justify-between border-b border-sky/10 py-3 text-on-dark-muted transition-colors hover:text-on-dark">
                  {l.label}
                  <ArrowRight aria-hidden className="size-4 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="col-span-4 rounded-[var(--radius-m)] border border-sky/15 bg-ink p-6">
            <p className="t-eyebrow text-on-dark-muted">Offices</p>
            <ul className="mt-4 space-y-3">
              {CONTACT.offices.map((o) => (
                <li key={o.id} className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-on-dark">{o.city}</span>
                  <span className="t-mono text-xs text-on-dark-muted">{o.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/locations" onClick={onNavigate} className="link-arrow text-sm text-on-dark">
                All locations <ArrowRight aria-hidden className="size-4" />
              </Link>
              <Link href="/careers" onClick={onNavigate} className="link-arrow text-sm text-on-dark">
                Careers <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const groups = MEGA[active];
  const v = VERTICALS.find((x) => x.id === active)!;

  return (
    <div className="border-b border-sky/10 bg-abyss/95 backdrop-blur-xl">
      <div className="wrap-wide grid grid-cols-12 gap-10 py-10">
        <div className="col-span-4">
          <p className="t-eyebrow text-on-dark-muted">One group, three capabilities</p>
          <ul className="relative mt-5">
            {/* the vertical signal line that ties the three layers together */}
            <span className="absolute bottom-6 left-[0.85rem] top-6 w-px bg-gradient-to-b from-sky/60 via-accent to-sky/60" aria-hidden />
            {VERTICALS.map((x) => {
              const on = x.id === active;
              return (
                <li key={x.id}>
                  <Link
                    href={x.href}
                    onMouseEnter={() => setActive(x.id)}
                    onFocus={() => setActive(x.id)}
                    onClick={onNavigate}
                    className={`relative flex gap-5 rounded-[var(--radius-m)] p-3 pr-4 transition-colors ${on ? "bg-ink" : "hover:bg-ink/60"}`}
                  >
                    <span className={`layer-chip relative z-10 shrink-0 bg-abyss ${on ? "border-accent text-accent" : "border-sky/40 text-sky"}`}>{x.layer}</span>
                    <span>
                      <span className="block t-eyebrow text-on-dark-muted">{x.role}</span>
                      <span className="mt-1 block text-lg font-bold text-on-dark">{x.name}</span>
                      <span className="mt-1 block text-sm leading-snug text-on-dark-muted">{x.summary}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-span-8 border-l border-sky/10 pl-10">
          <div className="flex items-baseline justify-between">
            <p className="t-eyebrow text-sky">{v.name}</p>
            <Link href={v.href} onClick={onNavigate} className="link-arrow text-sm text-on-dark">
              {v.name} overview <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-8">
            {groups.map((g) => (
              <div key={g.title}>
                <p className="t-eyebrow text-on-dark-muted">{g.title}</p>
                <ul className="mt-3">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      {l.external ? (
                        <a href={l.href} target="_blank" rel="noopener" className="group block border-b border-sky/10 py-2.5 text-on-dark-muted transition-colors hover:text-on-dark">
                          <span className="flex items-center gap-2 text-[0.95rem] text-on-dark">
                            {l.label} <ArrowUpRight aria-hidden className="size-3.5" />
                            <span className="sr-only">(opens external site)</span>
                          </span>
                          {l.note && <span className="block text-xs">{l.note}</span>}
                        </a>
                      ) : (
                        <Link href={l.href} onClick={onNavigate} className="group block border-b border-sky/10 py-2.5 text-on-dark-muted transition-colors hover:text-on-dark">
                          <span className="block text-[0.95rem] text-on-dark/90 group-hover:text-on-dark">{l.label}</span>
                          {l.note && <span className="block text-xs">{l.note}</span>}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-6 border-t border-sky/10 pt-5 text-sm text-on-dark-muted">
            <span className="t-eyebrow">By industry</span>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {INDUSTRY_LINKS.slice(0, 5).map((l) => (
                <Link key={l.href} href={l.href} onClick={onNavigate} className="hover:text-on-dark">
                  {l.label.split(" & ")[0].split(",")[0]}
                </Link>
              ))}
              <Link href="/industries" onClick={onNavigate} className="text-on-dark">
                All industries
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
