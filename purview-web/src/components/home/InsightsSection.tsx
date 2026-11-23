import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getArticles, LINKEDIN_ARTICLE } from "@/content/insights";
import { TextLink } from "@/components/ui/Button";
import { toIsoDate } from "@/lib/seo";

export function InsightCard({ a, size = "s" }: { a: ReturnType<typeof getArticles>[number]; size?: "l" | "s" }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className={`relative overflow-hidden rounded-[var(--radius-m)] bg-ink ${size === "l" ? "aspect-[16/10]" : "aspect-[3/2]"}`}>
        <Image src={a.image} alt="" fill sizes={size === "l" ? "(min-width:1024px) 55vw, 100vw" : "(min-width:1024px) 25vw, 100vw"} className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
      </div>
      <div className="mt-5 flex items-center gap-3 text-sm text-muted">
        <span className="t-eyebrow text-accent-strong">{a.category}</span>
        {a.date && <time dateTime={toIsoDate(a.date)}>{a.date}</time>}
        {a.readTime && <span aria-hidden>·</span>}
        {a.readTime && <span>{a.readTime}</span>}
      </div>
      <h3 className={`mt-3 font-bold tracking-[-0.02em] text-balance ${size === "l" ? "text-[clamp(1.6rem,1.1rem+1.6vw,2.5rem)] leading-[1.1]" : "text-xl leading-snug"}`}>
        <Link href={a.href} className="after:absolute after:inset-0 hover:underline hover:decoration-1 hover:underline-offset-4">
          {a.title}
        </Link>
      </h3>
      {size === "l" && a.lede && <p className="mt-4 max-w-[56ch] text-muted">{a.lede}</p>}
    </article>
  );
}

export function InsightsSection() {
  const [lead, ...rest] = getArticles();
  return (
    <section className="cv-auto section bg-paper" aria-labelledby="insights-title">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4" data-reveal>
              <span className="t-eyebrow text-muted">10</span>
              <span className="h-px w-10 bg-line" aria-hidden />
              <span className="t-eyebrow text-accent-strong">Insights from the floor</span>
            </div>
            <h2 id="insights-title" className="t-h2 mt-6 max-w-[16ch] balance" data-reveal>
              Written by the teams who build and operate.
            </h2>
          </div>
          <TextLink href="/insights" className="text-fg">
            All insights
          </TextLink>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <InsightCard a={lead} size="l" />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-8">
            {rest.slice(0, 2).map((a, i) => (
              <div key={a.slug} data-reveal style={{ "--d": `${(i + 1) * 90}ms` } as React.CSSProperties}>
                <InsightCard a={a} />
              </div>
            ))}
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-12" data-reveal>
            <div className="flex items-center gap-6 border-t border-fg/80 pt-6">
              <span className="t-mono text-xs text-muted">04</span>
              <Link href={rest[2].href} className="group flex-1">
                <span className="t-eyebrow block text-accent-strong">{rest[2].category}</span>
                <span className="mt-1 block text-lg font-bold group-hover:underline group-hover:underline-offset-4">{rest[2].title}</span>
              </Link>
            </div>
            <div className="flex items-center gap-6 border-t border-fg/80 pt-6">
              <span className="t-mono text-xs text-muted">05</span>
              <a href={LINKEDIN_ARTICLE.href} target="_blank" rel="noopener" className="group flex-1">
                <span className="t-eyebrow block text-accent-strong">
                  {LINKEDIN_ARTICLE.category} · {LINKEDIN_ARTICLE.note}
                </span>
                <span className="mt-1 flex items-center gap-2 text-lg font-bold group-hover:underline group-hover:underline-offset-4">
                  {LINKEDIN_ARTICLE.title} <ArrowUpRight aria-hidden className="size-4 shrink-0" />
                  <span className="sr-only">(opens LinkedIn)</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
