import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticles } from "@/content/insights";
import { getLegacy } from "@/lib/legacy";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InsightCard } from "@/components/home/InsightsSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { JsonLd, articleJsonLd, pageMetadata, toIsoDate } from "@/lib/seo";

// All four published articles are prerendered; unknown slugs 404.
export const instant = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

function find(slug: string) {
  const a = getArticles().find((x) => x.slug === slug);
  return a ? { a, page: getLegacy(a.legacy)! } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const f = find(slug);
  if (!f) return {};
  return pageMetadata({ title: f.page.title.replace(/\s*\|\s*Purview Services$/, ""), description: f.page.description, path: `/insights/${slug}`, image: f.a.image, type: "article" });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const f = find(slug);
  if (!f) notFound();
  const { a, page } = f;
  const others = getArticles().filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="on-dark relative overflow-hidden bg-abyss">
          <div className="blueprint absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
          <div className="wrap relative pt-36 pb-14 sm:pt-40">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: a.category }]} />
            <p className="t-eyebrow mt-10 text-sky">{a.category}</p>
            <h1 className="t-h1 mt-5 max-w-[20ch] balance">{page.h1}</h1>
            {page.lede && <p className="t-lead mt-7 max-w-[44rem] text-on-dark-muted">{page.lede}</p>}
            <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-on-dark-muted">
              {page.byline && <span className="font-bold text-on-dark">{page.byline}</span>}
              {a.date && <time dateTime={toIsoDate(a.date)}>{a.date}</time>}
              {a.readTime && <span>{a.readTime}</span>}
            </p>
          </div>
        </header>
        <div className="bg-paper">
          <div className="wrap">
            <figure className="relative -mb-4 aspect-[21/9] translate-y-[-1px] overflow-hidden rounded-b-[var(--radius-m)] bg-ink">
              <Image src={a.image} alt="" fill loading="eager" sizes="100vw" className="object-cover" />
              <figcaption className="t-mono absolute right-3 bottom-3 rounded bg-abyss/70 px-2 py-1 text-[0.6rem] text-on-dark">{a.imageNote}</figcaption>
            </figure>
          </div>
          <div className="wrap grid gap-10 py-16 lg:grid-cols-12">
            <div className="prose-pv t-lead text-fg/90 lg:col-span-7 lg:col-start-3">
              {page.blocks
                .filter((b) => !(b.type === "text" && /^(Purview Editorial Team|\d{1,2} \w+ 20\d\d)/.test(b.text)))
                .map((b, i) => {
                  if (b.type === "heading") return <h2 key={i}>{b.text}</h2>;
                  if (b.type === "text") return <p key={i}>{b.text}</p>;
                  if (b.type === "list" || b.type === "steps")
                    return (
                      <ul key={i}>
                        {b.items.map((it) => (
                          <li key={it.title}>
                            <strong>{it.title}</strong>
                            {it.body ? ` ${it.body}` : ""}
                          </li>
                        ))}
                      </ul>
                    );
                  if (b.type === "quote") return <blockquote key={i} className="my-8 border-l-2 border-accent-ink pl-6 font-semibold">{b.text}</blockquote>;
                  return null;
                })}
            </div>
          </div>
        </div>
      </article>
      <section className="bg-surface py-16" aria-labelledby="more-title">
        <div className="wrap">
          <h2 id="more-title" className="t-eyebrow text-muted">
            More insights
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {others.map((o) => (
              <InsightCard key={o.slug} a={o} />
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
      <JsonLd data={articleJsonLd({ title: page.h1, description: page.description, path: `/insights/${slug}`, date: a.date, image: a.image })} />
    </>
  );
}
