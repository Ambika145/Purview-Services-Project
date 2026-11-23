import type { MetadataRoute } from "next";
import { genericSlugs } from "@/lib/legacy";
import { getArticles } from "@/content/insights";
import { SITE_URL } from "@/lib/routes";

/** Every indexable route. No lastModified: we do not invent dates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const core: [string, number][] = [
    ["/", 1],
    ["/tech", 0.9],
    ["/data-centre", 0.9],
    ["/workforce", 0.9],
    ["/industries", 0.7],
    ["/our-work", 0.7],
    ["/company", 0.7],
    ["/contact", 0.7],
    ["/insights", 0.6],
    ["/locations", 0.5],
    ["/products", 0.6],
  ];
  return [
    ...core.map(([p, priority]) => ({ url: `${SITE_URL}${p === "/" ? "" : p}`, priority })),
    ...genericSlugs().map((s) => ({ url: `${SITE_URL}/${s}`, priority: 0.5 })),
    ...getArticles().map((a) => ({ url: `${SITE_URL}${a.href}`, priority: 0.5 })),
  ];
}
