import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { genericSlugs, getLegacy } from "@/lib/legacy";
import { LegacyPage } from "@/components/legacy/LegacyPage";
import { pageMetadata } from "@/lib/seo";

/**
 * Every page preserved from purviewservices.com that does not have a bespoke
 * design yet: services, industries, products, Purview DC sub-pages, company
 * pages. Old /<slug>.html URLs 308-redirect here (next.config.ts).
 */
// All valid slugs are prerendered below; unknown slugs 404. Navigation never waits on data.
export const instant = false;

export function generateStaticParams() {
  return genericSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = genericSlugs().includes(slug) ? getLegacy(slug) : null;
  if (!page) return {};
  const title = page.title.replace(/\s*\|\s*Purview Services$/, "");
  return pageMetadata({
    title,
    description: page.description,
    path: `/${slug}`,
    image: page.image ? `/img/${page.image}` : undefined,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!genericSlugs().includes(slug)) notFound();
  const page = getLegacy(slug);
  if (!page) notFound();
  return <LegacyPage page={page} path={`/${slug}`} />;
}
