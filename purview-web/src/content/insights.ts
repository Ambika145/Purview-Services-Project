import "server-only";
import { ARTICLES, articleSlug, getLegacy } from "@/lib/legacy";

/** Category labels and imagery for the published articles (purviewservices.com/blog.html). */
const META: Record<string, { category: string; image: string; imageNote: string }> = {
  "blog-why-the-agent-needs-the-floor": { category: "AI & Infrastructure", image: "/img/insights-hero.jpg", imageNote: "Illustrative imagery" },
  "blog-agentic-ai-governed-workflows": { category: "AI & Agents", image: "/img/innovation-hero.jpg", imageNote: "Illustrative imagery" },
  "blog-preparation-first-gpu-deployment": { category: "Data Centres", image: "/img/dc-receiving-staging.jpg", imageNote: "Receiving and staging, Purview DC" },
  "blog-managed-services-ai-era": { category: "Managed Services", image: "/img/managed-feature.jpg", imageNote: "Illustrative imagery" },
};

export function getArticles() {
  return ARTICLES.map((name) => {
    const p = getLegacy(name)!;
    return {
      legacy: name,
      slug: articleSlug(name),
      href: `/insights/${articleSlug(name)}`,
      title: p.h1,
      // The blog index uses longer titles; keep the article H1 as the canonical title.
      description: p.description,
      lede: p.lede,
      date: p.date ?? null,
      readTime: p.readTime ?? null,
      ...META[name],
    };
  });
}

export const LINKEDIN_ARTICLE = {
  title: "SD-WAN innovations: enhancing private network flexibility",
  category: "Networking",
  href: "https://www.linkedin.com/pulse/sd-wan-innovations-enhancing-flexibility-private-network-s016c/",
  note: "Published on LinkedIn",
};
