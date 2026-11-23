import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { mapHref } from "@/lib/routes";

/* ------------------------------------------------------------------ */
/* Inner-page hero                                                      */
/* ------------------------------------------------------------------ */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lede,
  actions = [],
  layer,
  image,
  imageNote = "Illustrative imagery",
  visual,
  stats,
  tall = false,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: { label: string; href: string | null; external?: boolean }[];
  layer?: string;
  image?: string | null;
  imageNote?: string;
  visual?: ReactNode;
  stats?: { value: string; label: string }[];
  tall?: boolean;
}) {
  return (
    <section className={`on-dark relative isolate overflow-hidden bg-abyss ${tall ? "lg:min-h-[100svh]" : ""}`} aria-labelledby="page-title">
      {image && !visual && (
        <>
          <Image src={image} alt="" fill loading="eager" sizes="100vw" className="-z-20 object-cover opacity-45" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-abyss via-abyss/85 to-abyss/30" aria-hidden />
          <p className="t-mono absolute right-4 bottom-4 text-[0.65rem] text-on-dark-muted">{imageNote}</p>
        </>
      )}
      {!image && !visual && <div className="blueprint absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />}
      {visual}
      <div className={`wrap relative pt-36 pb-16 sm:pt-40 lg:pb-24 ${tall ? "lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-end" : ""}`}>
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 max-w-[52rem]">
          {(eyebrow || layer) && (
            <p className="t-eyebrow flex items-center gap-3 text-sky" data-hero-fade>
              {layer ? <span className="layer-chip border-accent text-accent">{layer}</span> : <span className="h-px w-10 bg-accent" aria-hidden />}
              {eyebrow}
            </p>
          )}
          <h1 id="page-title" className="t-h1 mt-6 balance" data-hero-fade style={{ "--d": "80ms" } as React.CSSProperties}>
            {title}
          </h1>
          {lede && (
            <div className="t-lead mt-7 max-w-[44rem] text-on-dark-muted pretty" data-hero-fade style={{ "--d": "160ms" } as React.CSSProperties}>
              {lede}
            </div>
          )}
          {actions.length > 0 && (
            <div className="mt-9 flex flex-wrap gap-3" data-hero-fade style={{ "--d": "240ms" } as React.CSSProperties}>
              {actions.map((a, i) => (
                <Button key={a.label} href={mapHref(a.href)} variant={i === 0 ? "primary" : "ghost-dark"} external={a.external}>
                  {a.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        {stats && stats.length > 0 && <StatRow items={stats} dark className="mt-16" />}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stat row: dimensioned figures on a hairline                          */
/* ------------------------------------------------------------------ */
export function StatRow({ items, dark = false, className = "" }: { items: { value: string; label: string }[]; dark?: boolean; className?: string }) {
  return (
    <dl className={`grid grid-cols-2 border-t ${dark ? "border-sky/25" : "border-fg/80"} ${items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} ${className}`}>
      {items.map((s, i) => (
        <div key={s.label + i} className={`relative py-6 pr-4 ${i % 2 ? "pl-5" : ""} ${i > 0 ? "lg:pl-6" : ""} ${i % 2 || i > 0 ? `${dark ? "border-sky/15" : "border-line"}` : ""} ${i % 2 ? "border-l" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
          <span className={`absolute -top-px left-0 h-2.5 w-px ${dark ? "bg-sky/60" : "bg-fg"}`} aria-hidden />
          <dt className="sr-only">{s.label}</dt>
          <dd className="text-[clamp(1.9rem,1.3rem+1.8vw,3rem)] leading-none font-extrabold tracking-[-0.035em]">{s.value}</dd>
          <dd className={`mt-3 max-w-[26ch] text-sm leading-snug ${dark ? "text-on-dark-muted" : "text-muted"}`}>{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Section shell                                                        */
/* ------------------------------------------------------------------ */
export function Section({
  tone = "paper",
  id,
  children,
  className = "",
  labelledBy,
}: {
  tone?: "paper" | "surface" | "mist" | "ink" | "abyss";
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  const bg = { paper: "bg-paper", surface: "bg-surface", mist: "bg-mist", ink: "on-dark bg-ink", abyss: "on-dark bg-abyss" }[tone];
  return (
    <section id={id} className={`section relative overflow-hidden ${bg} ${className}`} aria-labelledby={labelledBy}>
      <div className="wrap relative">{children}</div>
    </section>
  );
}

export function Heading({ index, eyebrow, title, lead, dark = false, id }: { index?: string; eyebrow: string; title: ReactNode; lead?: ReactNode; dark?: boolean; id?: string }) {
  // Without a lead the heading fills its container (used inside side columns).
  return (
    <div className={lead ? "grid gap-8 lg:grid-cols-12 lg:items-end" : ""}>
      <div className={lead ? "lg:col-span-7" : ""}>
        <div className="flex items-center gap-4" data-reveal>
          {index && <span className={`t-eyebrow ${dark ? "text-on-dark-muted" : "text-muted"}`}>{index}</span>}
          <span className={`h-px w-10 ${dark ? "bg-sky/40" : "bg-line"}`} aria-hidden />
          <span className={`t-eyebrow ${dark ? "text-sky" : "text-accent-strong"}`}>{eyebrow}</span>
        </div>
        <h2 id={id} className={`t-h2 mt-6 balance ${lead ? "max-w-[18ch]" : "max-w-[22ch]"}`} data-reveal>
          {title}
        </h2>
      </div>
      {lead && (
        <div className={`t-lead lg:col-span-5 pretty ${dark ? "text-on-dark-muted" : "text-muted"}`} data-reveal>
          {lead}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Numbered editorial list (instead of card grids)                      */
/* ------------------------------------------------------------------ */
export function NumberedList({ items, dark = false, cols = 2 }: { items: { title: string; body?: string; href?: string }[]; dark?: boolean; cols?: 2 | 3 }) {
  return (
    <ol className={`grid gap-x-10 border-t ${dark ? "border-sky/20" : "border-fg/80"} ${cols === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
      {items.map((it, i) => {
        const inner = (
          <>
            <span className={`t-mono text-xs ${dark ? "text-accent" : "text-accent-strong"}`}>{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span className="block text-lg leading-snug font-bold">{it.title}</span>
              {it.body && <span className={`mt-2 block ${dark ? "text-on-dark-muted" : "text-muted"}`}>{it.body}</span>}
            </span>
          </>
        );
        return (
          <li key={it.title + i} className={`border-b ${dark ? "border-sky/15" : "border-line"}`} data-reveal style={{ "--d": `${(i % 6) * 50}ms` } as React.CSSProperties}>
            {it.href ? (
              <Link href={mapHref(it.href)} className="group grid grid-cols-[2.5rem_1fr] gap-2 py-6 hover:text-accent-strong">
                {inner}
              </Link>
            ) : (
              <div className="grid grid-cols-[2.5rem_1fr] gap-2 py-6">{inner}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ (native details: accessible, no JS)                              */
/* ------------------------------------------------------------------ */
export function Faq({ items, dark = false }: { items: { q: string; a: string }[]; dark?: boolean }) {
  return (
    <div className={`border-t ${dark ? "border-sky/20" : "border-fg/80"}`}>
      {items.map((f) => (
        <details key={f.q} className={`group border-b ${dark ? "border-sky/15" : "border-line"}`}>
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden className={`grid size-7 shrink-0 place-items-center rounded border text-base transition-transform group-open:rotate-45 ${dark ? "border-sky/30" : "border-line"}`}>
              +
            </span>
          </summary>
          <p className={`max-w-[70ch] pb-6 ${dark ? "text-on-dark-muted" : "text-muted"}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* Steps rail: horizontal on desktop, vertical on mobile */
export function StepsRail({ items, dark = false }: { items: { title: string; body: string; tag?: string }[]; dark?: boolean }) {
  return (
    <ol className={`relative grid gap-8 md:gap-6 ${items.length >= 5 ? "md:grid-cols-3 lg:grid-cols-6" : items.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
      {items.map((s, i) => (
        <li key={s.title} className="relative pl-8 md:pl-0 md:pt-8" data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
          <span className={`absolute top-0 left-0 grid size-5 place-items-center rounded-full border ${dark ? "border-accent bg-abyss" : "border-accent-ink bg-surface"} md:-top-2.5`} aria-hidden>
            <span className={`size-1.5 rounded-full ${dark ? "bg-accent" : "bg-accent-ink"}`} />
          </span>
          {i < items.length - 1 && <span className={`absolute top-6 bottom-[-2rem] left-2.5 w-px md:top-0 md:right-[-1.5rem] md:bottom-auto md:left-6 md:h-px md:w-auto ${dark ? "bg-sky/25" : "bg-line"}`} aria-hidden />}
          <p className={`t-mono text-xs ${dark ? "text-on-dark-muted" : "text-muted"}`}>
            {String(i + 1).padStart(2, "0")}
            {s.tag ? ` · ${s.tag}` : ""}
          </p>
          <p className="mt-2 text-lg font-bold">{s.title}</p>
          <p className={`mt-2 text-[0.95rem] ${dark ? "text-on-dark-muted" : "text-muted"}`}>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
