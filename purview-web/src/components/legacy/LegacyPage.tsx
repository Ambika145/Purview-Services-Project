import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Block, LegacyPage as Page } from "@/lib/legacy";
import { mapHref } from "@/lib/routes";
import { PageHero, StatRow, Faq } from "@/components/sections/PageKit";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { LogoMark } from "@/components/ui/LogoMark";
import { Button } from "@/components/ui/Button";
import { JsonLd, serviceJsonLd } from "@/lib/seo";

/**
 * Renders a page preserved from the current site. Copy comes verbatim from
 * the extracted content; this component only decides the layout. Blocks are
 * grouped into chapters at each H2: a sticky heading column and a content column.
 */
type Chapter = { heading?: Extract<Block, { type: "heading" }>; blocks: Block[] };

function chapters(blocks: Block[]): Chapter[] {
  const out: Chapter[] = [{ blocks: [] }];
  for (const b of blocks) {
    if (b.type === "heading" && b.level === 2) out.push({ heading: b, blocks: [] });
    else out[out.length - 1].blocks.push(b);
  }
  return out.filter((c) => c.heading || c.blocks.length);
}

const CTA_HEADINGS = /^(start a conversation|let’s discuss|project enquiries|ready to|tell us|talk to us)/i;

export function LegacyPage({ page, path }: { page: Page; path: string }) {
  const all = chapters(page.blocks);
  // The site's closing "talk to us" chapter becomes the shared CTA section.
  const last = all[all.length - 1];
  const closing = last?.heading && (CTA_HEADINGS.test(last.heading.text) || /enquir|conversation|contact/i.test(last.heading.eyebrow)) ? all.pop() : undefined;
  const crumbs = page.crumbs.length ? page.crumbs.map((c) => ({ label: c.label, href: c.href ? mapHref(c.href) : null })) : [{ label: "Home", href: "/" }, { label: page.h1 }];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow={page.eyebrow || crumbs[crumbs.length - 2]?.label}
        title={page.h1}
        lede={page.lede}
        actions={page.actions.slice(0, 2)}
        image={page.image ? `/img/${page.image}` : null}
      />

      <div className="bg-paper">
        {all.map((ch, i) => (
          <section key={i} className={`border-b border-line ${i === 0 && !ch.heading ? "pt-16 pb-6" : "py-[clamp(3.5rem,7vw,6rem)]"}`} aria-labelledby={ch.heading ? `ch-${i}` : undefined}>
            <div className="wrap grid gap-10 lg:grid-cols-12">
              {ch.heading ? (
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    {ch.heading.eyebrow && <p className="t-eyebrow text-accent-strong">{ch.heading.eyebrow}</p>}
                    <h2 id={`ch-${i}`} className="mt-4 text-[clamp(1.75rem,1.2rem+1.6vw,2.6rem)] leading-[1.08] font-extrabold tracking-[-0.03em] balance">
                      {ch.heading.text}
                    </h2>
                  </div>
                </div>
              ) : (
                <div className="hidden lg:col-span-4 lg:block" />
              )}
              <div className="min-w-0 space-y-8 lg:col-span-8">
                {ch.blocks.map((b, j) => (
                  <BlockView key={j} b={b} />
                ))}
              </div>
            </div>
          </section>
        ))}

        {page.related.length > 0 && (
          <section className="py-14" aria-labelledby="related-title">
            <div className="wrap grid gap-6 lg:grid-cols-12">
              <h2 id="related-title" className="t-eyebrow text-muted lg:col-span-4">
                Related
              </h2>
              <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8">
                {page.related.map((r) => (
                  <li key={r.href} className="border-b border-line">
                    <Link href={mapHref(r.href)} className="group flex items-center justify-between py-4 font-bold">
                      {r.label}
                      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>

      <ContactCTA
        eyebrow={closing?.heading?.eyebrow || "Start a conversation"}
        title={closing?.heading?.text || "Let’s discuss the outcome you need."}
        body={(closing?.blocks.find((b) => b.type === "text") as { text: string } | undefined)?.text || page.cta || "Talk to our team about the technical, commercial and operational requirements of your programme."}
        prompt={null}
        primary={{ label: "Contact Purview", href: "/contact" }}
        secondary={(() => {
          const ext = closing?.blocks.flatMap((b) => (b.type === "links" ? b.items : [])).find((l) => l.external);
          return ext ? { label: ext.label, href: ext.href! } : null;
        })()}
      />
      {page.template === "service" && <JsonLd data={serviceJsonLd({ name: page.h1, description: page.description, path })} />}
    </>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "heading":
      return (
        <div className="pt-4">
          {b.eyebrow && <p className="t-eyebrow text-accent-strong">{b.eyebrow}</p>}
          <h3 className="t-h3 mt-2">{b.text}</h3>
        </div>
      );
    case "text":
      return <p className="t-lead max-w-[62ch] text-fg/85 pretty">{b.text}</p>;
    case "stats":
      return <StatRow items={b.items} />;
    case "list":
      return (
        <ul className={`grid gap-x-8 border-t border-fg/80 ${b.items.length > 3 ? "sm:grid-cols-2" : ""}`}>
          {b.items.map((it) => (
            <li key={it.title} className="flex gap-4 border-b border-line py-3.5">
              <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent-ink" aria-hidden />
              <span>
                <span className="font-semibold">{it.title}</span>
                {it.body && <span className="block text-sm text-muted">{it.body}</span>}
              </span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="border-t border-fg/80">
          {b.items.map((it, i) => (
            <li key={it.title + i} className="grid grid-cols-[3rem_1fr] gap-2 border-b border-line py-5 sm:grid-cols-[3rem_minmax(0,14rem)_1fr] sm:gap-6">
              <span className="t-mono text-xs text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-bold">{it.title}</span>
              <span className="col-start-2 text-muted sm:col-start-auto">{it.body}</span>
            </li>
          ))}
        </ol>
      );
    case "cards":
      return (
        <ul className={`grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line ${b.items.length % 3 === 0 && b.items.length > 3 ? "md:grid-cols-3" : "sm:grid-cols-2"}`}>
          {b.items.map((c, i) => (
            <li key={c.title + i} className="flex flex-col bg-surface p-6">
              {c.eyebrow && <p className="t-eyebrow text-accent-strong">{c.eyebrow}</p>}
              {c.title && <p className="text-lg leading-snug font-bold">{c.title}</p>}
              {c.body && <p className="mt-2 text-[0.95rem] text-muted">{c.body}</p>}
              {c.links && c.links.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-4">
                  {c.links.map((l) =>
                    l.external ? (
                      <a key={l.label} href={l.href ?? "#"} target="_blank" rel="noopener" className="link-arrow text-sm">
                        {l.label} <ArrowUpRight aria-hidden className="size-3.5" />
                        <span className="sr-only">(opens external site)</span>
                      </a>
                    ) : (
                      <Link key={l.label} href={mapHref(l.href)} className="link-arrow text-sm">
                        {l.label} <ArrowRight aria-hidden className="size-3.5" />
                      </Link>
                    ),
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      );
    case "case":
      return (
        <div className="on-dark grid gap-6 overflow-hidden rounded-[var(--radius-m)] bg-ink p-7 sm:grid-cols-[1fr_auto] sm:p-9">
          <div>
            <p className="t-eyebrow text-sky">{b.eyebrow}</p>
            <p className="t-h3 mt-3">{b.title}</p>
            <p className="mt-3 max-w-[56ch] text-on-dark-muted">{b.body}</p>
            {b.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {b.links.slice(0, 2).map((l, i) => (
                  <Button key={l.label} href={mapHref(l.href)} external={l.external} variant={i === 0 ? "primary" : "ghost-dark"}>
                    {l.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
          {b.result && (
            <div className="self-end sm:text-right">
              <p className="text-5xl font-extrabold tracking-tight text-accent">{b.result.value}</p>
              <p className="mt-2 max-w-[18ch] text-sm text-on-dark-muted sm:ml-auto">{b.result.label}</p>
            </div>
          )}
        </div>
      );
    case "faq":
      return <Faq items={b.items} />;
    case "table":
      return (
        <div className="overflow-x-auto rounded-[var(--radius-m)] border border-line bg-surface">
          <table className="w-full min-w-[34rem] text-left text-[0.95rem]">
            <thead>
              <tr className="border-b border-line bg-mist">
                {b.rows[0].map((h) => (
                  <th key={h} scope="col" className="t-eyebrow px-5 py-3 font-medium text-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.slice(1).map((r, i) => (
                <tr key={i} className="border-b border-line last:border-0">
                  {r.map((c, j) => (
                    <td key={j} className={`px-5 py-4 align-top ${j === 0 ? "font-bold" : "text-muted"}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "logos":
      return (
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-6 rounded-[var(--radius-m)] border border-line bg-surface p-6">
          {b.items.map((n) => (
            <li key={n} className="logo-cell">
              <LogoMark name={n} height={28} />
            </li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote className="t-h3 max-w-[40ch] border-l-2 border-accent-ink pl-6">{b.text}</blockquote>;
    case "links":
      return (
        <div className="flex flex-wrap gap-3">
          {b.items.map((l, i) => (
            <Button key={l.label + i} href={mapHref(l.href)} external={l.external} variant={i === 0 ? "dark" : "ghost"}>
              {l.label}
            </Button>
          ))}
        </div>
      );
  }
}
