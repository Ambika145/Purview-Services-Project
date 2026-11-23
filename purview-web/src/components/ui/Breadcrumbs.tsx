import Link from "next/link";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export type Crumb = { label: string; href?: string | null };

export function Breadcrumbs({ items, dark = true }: { items: Crumb[]; dark?: boolean }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="t-eyebrow">
        <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${dark ? "text-on-dark-muted" : "text-muted"}`}>
          {items.map((c, i) => (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {c.href && i < items.length - 1 ? (
                <Link href={c.href} className={`hover:underline underline-offset-4 ${dark ? "hover:text-on-dark" : "hover:text-fg"}`}>
                  {c.label}
                </Link>
              ) : (
                <span aria-current={i === items.length - 1 ? "page" : undefined} className={dark ? "text-on-dark" : "text-fg"}>
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
