import type { Metadata } from "next";
import { getLegacy } from "@/lib/legacy";
import { LegacyPage } from "@/components/legacy/LegacyPage";
import { pageMetadata } from "@/lib/seo";

/** Products & Platforms (was /divisions.html). Content preserved verbatim. */
export const metadata: Metadata = pageMetadata({
  title: "Products & Platforms",
  description: getLegacy("divisions")!.description,
  path: "/products",
});

export default function ProductsPage() {
  const page = getLegacy("divisions")!;
  return <LegacyPage page={{ ...page, crumbs: [{ label: "Home", href: "/" }, { label: "Products & Platforms", href: null }] }} path="/products" />;
}
