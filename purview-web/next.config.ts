import type { NextConfig } from "next";
import legacyIndex from "./src/content/legacy/_index.json";
import { LEGACY_TO_NEW } from "./src/lib/routes";

/**
 * Permanent (308) redirects from every URL on the current purviewservices.com
 * (as listed in its sitemap.xml) to the revamped route. Generic pages keep
 * their slug: /cloud.html → /cloud. Consolidated pages map via LEGACY_TO_NEW.
 * The full table is documented in docs/03-seo-and-redirects.md.
 */
function legacyRedirects() {
  const out: { source: string; destination: string; permanent: true; missing?: { type: "query"; key: string }[] }[] = [];
  const slugs = new Set([...Object.keys(legacyIndex), "index"]);
  for (const slug of slugs) {
    const destination = LEGACY_TO_NEW[slug] ?? `/${slug}`;
    const ext = slug === "resources" ? "php" : "html";
    // Brochure downloads (resources.php?doc=…) are served by the legacy PHP
    // backend; they are proxied (see rewrites) rather than redirected.
    out.push({ source: `/${slug}.${ext}`, destination, permanent: true, ...(slug === "resources" ? { missing: [{ type: "query" as const, key: "doc" }] } : {}) });
    // extensionless variants of consolidated pages (e.g. /purview-dc)
    if (slug in LEGACY_TO_NEW && slug !== "index" && destination !== `/${slug}`) {
      out.push({ source: `/${slug}`, destination, permanent: true });
    }
  }
  return out;
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async redirects() {
    return legacyRedirects();
  },
  /**
   * LEGACY_ORIGIN (e.g. https://legacy.purviewservices.com) keeps the gated
   * brochure library working until it is rebuilt. Unset = no proxy.
   */
  async rewrites() {
    const origin = process.env.LEGACY_ORIGIN;
    return origin ? [{ source: "/resources.php", has: [{ type: "query", key: "doc" }], destination: `${origin}/resources.php` }] : [];
  },
};

export default nextConfig;
