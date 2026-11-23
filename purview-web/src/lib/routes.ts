/**
 * URL architecture for the revamp.
 *
 * Every page on the current site (purviewservices.com/*.html) keeps its slug
 * with the `.html` suffix removed, and is permanently redirected (308) from
 * the old URL. A small number of pages are consolidated into the new
 * vertical landing pages; those are listed in LEGACY_TO_NEW.
 */

/** Legacy slugs (without .html) whose content moves to a different route. */
export const LEGACY_TO_NEW: Record<string, string> = {
  index: "/",
  "purview-dc": "/data-centre",
  purviewdc: "/data-centre",
  technologies: "/tech",
  "customer-success": "/our-work",
  divisions: "/products",
  blog: "/insights",
  "blog-why-the-agent-needs-the-floor": "/insights/why-the-agent-needs-the-floor",
  "blog-preparation-first-gpu-deployment": "/insights/preparation-first-gpu-deployment",
  "blog-agentic-ai-governed-workflows": "/insights/agentic-ai-governed-workflows",
  "blog-managed-services-ai-era": "/insights/managed-services-ai-era",
};

/** Routes with a bespoke page component (not rendered by the legacy template). */
export const BESPOKE = new Set([
  "index",
  "purview-dc",
  "purviewdc",
  "technologies",
  "workforce",
  "company",
  "contact",
  "industries",
  "customer-success",
  "insights",
  "blog",
  "locations",
]);

/** Map any href found in legacy content to its new route. */
export function mapHref(href: string | null | undefined): string {
  if (!href) return "#";
  if (/^(https?:|mailto:|tel:)/.test(href)) return href;
  const [path, hash] = href.split("#");
  const slug = path.replace(/^\//, "").replace(/\.(html|php)$/, "");
  const target = slug === "" ? "/" : LEGACY_TO_NEW[slug] ?? `/${slug}`;
  return hash ? `${target}#${hash}` : target;
}

export const SITE_URL = "https://purviewservices.com";
