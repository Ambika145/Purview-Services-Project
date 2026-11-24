import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GROUP_COMPANIES } from "@/content/site";

/**
 * The group companies as a hairline grid: logo tile, sector, name, one-liner.
 * Companies with a public website link out (new tab); the rest are plain cards.
 * Shared by the homepage and the Company page so both stay in sync.
 */
export function GroupCompaniesGrid() {
  return (
    <ul className="gc-grid">
      {GROUP_COMPANIES.map((c, i) => {
        const body = (
          <>
            <span className="gc-logo">
              <Image src={c.logo} alt="" width={c.w} height={c.h} className="gc-logo-img" />
            </span>
            <span className="gc-sector t-mono">{c.sector}</span>
            <span className="gc-name">{c.name}</span>
            <span className="gc-line">{c.line}</span>
            {c.href && <ArrowUpRight aria-hidden className="gc-arrow" />}
          </>
        );
        return (
          <li key={c.name} className="gc-cell" data-reveal style={{ "--d": `${(i % 3) * 70}ms` } as React.CSSProperties}>
            {c.href ? (
              <a href={c.href} target="_blank" rel="noopener" className="gc-card">
                {body}
                <span className="sr-only"> (opens the {c.name} website)</span>
              </a>
            ) : (
              <div className="gc-card">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Header used on both pages: the dimmed lead-in, the claim, and the count. */
export function GroupCompaniesTitle({ id, as: Tag = "h2" }: { id: string; as?: "h2" | "h3" }) {
  return (
    <div className="gc-head">
      <Tag id={id} className="gc-title" data-reveal>
        <span className="gc-dim">The companies.</span> Each led by specialists in its own market.
      </Tag>
      <p className="gc-count t-mono" data-reveal>
        {GROUP_COMPANIES.length} companies
      </p>
    </div>
  );
}
