import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getArticles, LINKEDIN_ARTICLE } from "@/content/insights";
import { InsightCard } from "@/components/home/InsightsSection";
import { PageHero, Section } from "@/components/sections/PageKit";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights: AI and Data Centre Perspectives",
  description: "Perspectives from Purview engineers on enterprise AI, AI data centres and the managed services that keep both running, written by the teams who build and operate them.",
  path: "/insights",
});

export default function InsightsPage() {
  const [lead, ...rest] = getArticles();
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        eyebrow="Insights from the floor"
        title="Ideas grounded in engineering practice."
        lede="Perspectives from Purview engineers on enterprise AI, AI data centres and the managed services that keep both running, written by the teams who build and operate them."
      />
      <Section tone="paper" labelledBy="ins-list">
        <h2 id="ins-list" className="sr-only">
          Articles
        </h2>
        <div className="grid gap-x-8 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-8" data-reveal>
            <InsightCard a={lead} size="l" />
          </div>
          <div className="lg:col-span-4" data-reveal>
            <InsightCard a={rest[0]} />
          </div>
          {rest.slice(1).map((a) => (
            <div key={a.slug} className="lg:col-span-4" data-reveal>
              <InsightCard a={a} />
            </div>
          ))}
          <div className="flex flex-col justify-end border-t border-fg/80 pt-6 lg:col-span-4" data-reveal>
            <p className="t-eyebrow text-accent-strong">
              {LINKEDIN_ARTICLE.category} · {LINKEDIN_ARTICLE.note}
            </p>
            <a href={LINKEDIN_ARTICLE.href} target="_blank" rel="noopener" className="mt-3 flex items-start gap-2 text-xl font-bold hover:underline hover:underline-offset-4">
              {LINKEDIN_ARTICLE.title} <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0" />
              <span className="sr-only">(opens LinkedIn)</span>
            </a>
          </div>
        </div>
      </Section>
      <ContactCTA />
    </>
  );
}
