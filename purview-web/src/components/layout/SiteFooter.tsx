import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowUpRight, Plus } from "lucide-react";
import { CONTACT, COMPANY_LINKS, INDUSTRY_LINKS, MEGA, VERTICALS } from "@/content/site";

type FLink = { label: string; href: string; external?: boolean };

const PRODUCT_LINKS: FLink[] = [
  { label: "RabbiT AI recruitment", href: "/rabbit" },
  { label: "CallOHM", href: "/callohm" },
  { label: "BeeRef referral hiring", href: "/beeref" },
  { label: "T-Wallet", href: "/twallet" },
  { label: "GigaPort", href: "/gigaport" },
  { label: "Nexable", href: "/nexable" },
  { label: "All products & platforms", href: "/products" },
];

const GROUPS: { id: string; title: string; links: FLink[]; wide?: boolean }[] = [
  { id: "tech", title: "Purview Tech", links: [{ label: "Overview", href: "/tech" }, ...MEGA.tech.flatMap((g) => g.links)], wide: true },
  { id: "dc", title: "Purview Data Centre", links: [{ label: "Overview", href: "/data-centre" }, ...MEGA["data-centre"].flatMap((g) => g.links)] },
  { id: "workforce", title: "Purview Workforce", links: [{ label: "Overview", href: "/workforce" }, ...MEGA.workforce.flatMap((g) => g.links)] },
  { id: "products", title: "Products", links: PRODUCT_LINKS },
  { id: "industries", title: "Industries", links: [{ label: "All industries", href: "/industries" }, ...INDUSTRY_LINKS] },
  {
    id: "company",
    title: "Company",
    links: [
      ...COMPANY_LINKS.slice(0, 7),
      { label: "Technology partners", href: "/company#partners" },
      { label: "Our work", href: "/our-work" },
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const LEGAL: FLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Carbon Reduction Plan", href: "/carbon-reduction-plan" },
  { label: "Trust & compliance", href: "/trust" },
  { label: "Sitemap", href: "/sitemap.xml", external: true },
];

/** Simple line marks in the site's icon style (lucide 1.x ships no brand icons). */
function SocialIcon({ name }: { name: string }) {
  const p = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name.startsWith("LinkedIn"))
    return (
      <svg {...p}>
        <rect x="2" y="2" width="20" height="20" rx="4" />
        <path d="M7 10v7M11 17v-7M11 13a3 3 0 0 1 6 0v4" />
        <circle cx="7" cy="6.8" r=".6" fill="currentColor" />
      </svg>
    );
  if (name.startsWith("X"))
    return (
      <svg {...p}>
        <path d="M4 4l11.5 16H20L8.5 4z" />
        <path d="M20 4l-6.6 7.4M4 20l6.6-7.4" />
      </svg>
    );
  if (name.startsWith("Facebook"))
    return (
      <svg {...p}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  return (
    <svg {...p}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
    </svg>
  );
}

function FootLink({ l }: { l: FLink }) {
  return l.external ? (
    <a href={l.href} target="_blank" rel="noopener" className="ft-link">
      {l.label}
      <ArrowUpRight aria-hidden className="ft-ext" />
      <span className="sr-only"> (opens external site)</span>
    </a>
  ) : (
    <Link href={l.href} className="ft-link">
      {l.label}
    </Link>
  );
}

export function SiteFooter() {
  const contact = CONTACT.offices.find((o) => o.id === "hyderabad")?.email ?? "contact@purviewservices.com";
  return (
    <footer className="ft cv-auto on-dark" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="ft-glow" aria-hidden />

      <div className="wrap-wide relative">
        {/* 1 · closing statement + direct contact */}
        <div className="ft-top">
          <div>
            <Image src="/brand/purview-logo-white.png" alt="Purview" width={365} height={132} className="h-10 w-auto" />
            <p className="ft-statement">
              We build intelligent applications. <span>And the infrastructure they run on.</span>
            </p>
          </div>
          <div className="ft-contact">
            <p className="ft-contact-line">One technology partner, from application to infrastructure.</p>
            <Link href="/contact" className="btn btn-primary">
              Contact Purview <ArrowUpRight aria-hidden className="btn-arrow size-4" />
            </Link>
            <a href={`mailto:${contact}`} className="ft-mail">
              {contact}
            </a>
          </div>
        </div>

        {/* 2 · the three verticals */}
        <ol className="ft-verticals" aria-label="Purview companies">
          {VERTICALS.map((v) => (
            <li key={v.id}>
              <Link href={v.href} className="ft-vertical">
                <span className="ft-vertical-meta t-mono">
                  <span className="ft-layer">{v.layer}</span>
                  {v.role}
                </span>
                <span className="ft-vertical-name">
                  {v.name}
                  <ArrowUpRight aria-hidden className="ft-vertical-arrow" />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {/* 3 · directory: columns on desktop, accordions below */}
        <nav aria-label="Footer" className="ft-dir">
          {GROUPS.map((g) => (
            <div key={g.id} className={`ft-col ${g.wide ? "ft-col-wide" : ""}`}>
              <details className="ft-acc">
                <summary>
                  <span>{g.title}</span>
                  <span className="ft-count t-mono">{g.links.length}</span>
                  <Plus aria-hidden className="ft-plus" />
                </summary>
                <ul>
                  {g.links.map((l) => (
                    <li key={l.href + l.label}>
                      <FootLink l={l} />
                    </li>
                  ))}
                </ul>
              </details>
              <div className="ft-colbody">
                <h3 className="ft-coltitle">{g.title}</h3>
                <ul>
                  {g.links.map((l) => (
                    <li key={l.href + l.label}>
                      <FootLink l={l} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </nav>

        {/* 4 · offices */}
        <div className="ft-offices">
          {CONTACT.offices.map((o) => (
            <address key={o.id} className="ft-office">
              <p className="ft-office-city">{o.city}</p>
              <p className="ft-office-label t-mono">{o.label}</p>
              <p className="ft-office-addr">
                {o.address.map((a) => (
                  <span key={a} className="block">
                    {a}
                  </span>
                ))}
              </p>
              <p className="ft-office-links">
                {o.phone && <a href={`tel:${o.phone.replace(/\s/g, "")}`}>{o.phone}</a>}
                <a href={`mailto:${o.email}`}>{o.email}</a>
              </p>
            </address>
          ))}
        </div>

        {/* 5 · legal, social, back to top */}
        <div className="ft-bottom">
          <p className="ft-copy">© Purview Group 2026. All rights reserved. Purview Services Limited · Founded in Scotland</p>
          <ul className="ft-legal">
            {LEGAL.map((l) => (
              <li key={l.href}>
                {l.external ? (
                  <a href={l.href}>{l.label}</a>
                ) : (
                  <Link href={l.href}>{l.label}</Link>
                )}
              </li>
            ))}
          </ul>
          <div className="ft-end">
            <ul className="ft-social" aria-label="Purview on social media">
              {CONTACT.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener" aria-label={`${s.label} (opens external site)`} title={s.label}>
                    <SocialIcon name={s.label} />
                  </a>
                </li>
              ))}
            </ul>
            <a href="#" className="ft-top-link" aria-label="Back to top">
              <ArrowUp aria-hidden className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
