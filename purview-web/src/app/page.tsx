import type { Metadata } from "next";
import { HeroTrinity } from "@/components/home/trinity/HeroTrinity";
import { WhatWeDo } from "@/components/home/story/WhatWeDo";
import { Ecosystem } from "@/components/home/story/Ecosystem";
import { DataCentreFeature } from "@/components/home/story/DataCentreFeature";
import { Outcomes } from "@/components/home/story/Outcomes";
import { GlobalTrust } from "@/components/home/story/GlobalTrust";
import { Beyond } from "@/components/home/story/Beyond";
import { FinalCta } from "@/components/home/story/FinalCta";
import { getArticles, LINKEDIN_ARTICLE } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Purview Services | AI Applications and AI Infrastructure",
    description: "Purview builds Gen AI and agentic applications and designs, builds and operates the AI data centres, networks and devices they run on.",
    path: "/",
  }),
  title: { absolute: "Purview Services | AI Applications and AI Infrastructure" },
};

/**
 * Homepage — section order and copy aligned with purviewservices.com/index.html:
 * Hero → What we do → Twelve capabilities → Where we are investing hardest →
 * Outcomes → Built on relationships → Beyond capabilities → Insights + CTA.
 */
export default function HomePage() {
  const published = getArticles();
  const pick = (slug: string) => {
    const a = published.find((x) => x.slug === slug);
    if (!a) return null;
    return { href: a.href, title: a.title, category: a.category, date: a.date };
  };
  const articles = [
    pick("why-the-agent-needs-the-floor"),
    pick("preparation-first-gpu-deployment"),
    {
      href: LINKEDIN_ARTICLE.href,
      title: LINKEDIN_ARTICLE.title,
      category: LINKEDIN_ARTICLE.category,
      date: null,
      external: true,
      note: LINKEDIN_ARTICLE.note,
    },
  ].filter((a): a is NonNullable<typeof a> => a !== null);

  return (
    <>
      <HeroTrinity />
      <WhatWeDo />
      <Ecosystem />
      <DataCentreFeature />
      <Outcomes />
      <GlobalTrust />
      <Beyond />
      <FinalCta articles={articles} />
    </>
  );
}
