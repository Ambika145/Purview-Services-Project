import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { LOCATIONS, CLIENT_LOGOS, PARTNER_GROUPS, RELATIONSHIPS } from "@/content/home";
import { CERTIFICATIONS, INDUSTRY_LINKS } from "@/content/site";
import markerPos from "@/content/map-markers.json";
import { LogoMark } from "@/components/ui/LogoMark";
import { TextLink } from "@/components/ui/Button";
import { Choreo } from "@/components/home/motion/Choreo";
import { PartnerIndex } from "./PartnerIndex";

const POS = markerPos as Record<string, { x: number; y: number }>;

const FOOTPRINT = [
  { to: 21, label: "countries with Purview entities" },
  { to: 8, label: "delivery centres in five countries" },
  { to: 24, label: "cities where you can reach a Purview team" },
] as const;

const PROOF = [
  { to: 50, suf: "+", label: "clients" },
  { to: 58, suf: "", label: "technology partners" },
  { to: 90, suf: "%", label: "repeat business" },
] as const;

/**
 * Clients, technology and delivery ecosystem.
 * Copy matches the live homepage relationships block; UI/motion are local.
 */
export function GlobalTrust() {
  const partners = PARTNER_GROUPS.reduce((n, g) => n + g.logos.length, 0);
  const titleParts = RELATIONSHIPS.title.split(". ");

  return (
    <Choreo scene="globalTrust" className="gt-section cv-auto on-dark relative overflow-hidden bg-abyss" labelledBy="gt-title">
      <div className="gt-bg" aria-hidden>
        <div className="gt-bg-grid" />
        <div className="gt-bg-glow gt-bg-glow-a" />
        <div className="gt-bg-glow gt-bg-glow-b" />
      </div>

      <div className="wrap-wide relative pt-[clamp(5rem,10vw,9rem)]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <div data-gt-kicker className="flex items-center gap-4">
              <span className="gt-kicker-rule" aria-hidden />
              <span className="t-eyebrow text-sky">Clients, technology and delivery ecosystem</span>
            </div>
            <h2 id="gt-title" className="mt-8 max-w-[16ch] text-[clamp(2.2rem,1.3rem+3.2vw,4.5rem)] leading-[1.0] font-extrabold tracking-[-0.038em]">
              {titleParts.map((part, i) => (
                <span key={part} data-gt-line className={`block overflow-hidden pb-[0.08em] ${i > 0 ? "mt-1" : ""}`}>
                  <span className={`block ${i > 0 ? "text-sky" : "text-on-dark"}`}>
                    {part}
                    {i < titleParts.length - 1 ? "." : ""}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <p data-gt-lead className="t-lead text-on-dark-muted lg:col-span-5 pretty">
            {RELATIONSHIPS.lead}
          </p>
        </div>

        {/* Map stage */}
        <div data-map className="gt-map relative mt-14 overflow-hidden rounded-[22px] border border-sky/15 bg-ink/40">
          <div className="gt-map-glow" aria-hidden />
          <div data-map-img className="relative aspect-[2/1] w-full p-4 sm:p-6 lg:p-8">
            <Image src="/map/world-footprint.svg" alt="" fill unoptimized loading="lazy" sizes="100vw" className="object-contain opacity-90" />
            {LOCATIONS.map((l) => {
              const p = POS[l.city];
              const hq = l.kind === "hq";
              return (
                <div key={l.city} data-marker className={`group absolute -translate-x-1/2 -translate-y-1/2 hover:z-30 ${hq ? "z-[2]" : "z-[1]"}`} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                  <span className={`gt-marker relative grid place-items-center ${hq ? "size-5" : "size-3.5"}`}>
                    {hq && <span className="gt-marker-ping absolute inset-0 rounded-full bg-accent/45" />}
                    <span className={`relative rounded-full ring-2 ring-abyss ${hq ? "size-2.5 bg-accent shadow-[0_0_16px_rgba(255,138,61,.55)]" : "size-2 bg-sky shadow-[0_0_12px_rgba(143,179,255,.45)]"}`} />
                  </span>
                  <span
                    className={`pointer-events-none absolute top-1/2 left-5 z-10 hidden -translate-y-1/2 rounded-[8px] border border-sky/20 bg-abyss/95 px-2.5 py-1.5 whitespace-nowrap shadow-[0_12px_30px_-12px_rgba(0,0,0,.55)] backdrop-blur md:block ${
                      hq ? "" : "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    }`}
                  >
                    <span className="block text-[0.78rem] font-bold">{l.city}</span>
                    <span className="t-mono block text-[0.6rem] text-on-dark-muted">{l.role.split(" · ")[0]}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <dl data-gt-stats className="mt-4 grid gap-px overflow-hidden rounded-[18px] border border-sky/15 bg-sky/10 sm:grid-cols-3">
          {FOOTPRINT.map((s, i) => (
            <div key={s.label} data-gt-stat className="bg-ink/90 px-6 py-8 sm:px-7">
              <dt className="sr-only">{s.label}</dt>
              <dd className="flex items-baseline gap-1">
                <span data-count={s.to} className="text-[clamp(2.6rem,1.6rem+3.2vw,4.25rem)] leading-none font-extrabold tracking-[-0.05em] tabular-nums">
                  {s.to}
                </span>
              </dd>
              <dd className="mt-3 max-w-[24ch] text-sm leading-relaxed text-on-dark-muted">{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-12 border-t border-sky/15 py-[clamp(3.5rem,7vw,5.5rem)] lg:grid-cols-12">
          <div data-gt-ind-head className="lg:col-span-4">
            <p className="t-eyebrow text-sky">Industries</p>
            <p className="mt-4 max-w-[26ch] text-[clamp(1.5rem,1.1rem+1.2vw,2.2rem)] leading-[1.1] font-extrabold tracking-[-0.025em]">
              Regulated, national-scale and unforgiving. That is where we work.
            </p>
            <TextLink href="/industries" className="mt-6 text-on-dark">
              See clients by industry
            </TextLink>
          </div>
          <ul data-industries className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {INDUSTRY_LINKS.map((l, i) => (
              <li key={l.href} data-ind className="border-b border-sky/15">
                <Link href={l.href} className="group flex items-center justify-between gap-4 py-4">
                  <span className="flex items-baseline gap-4">
                    <span className="t-mono text-xs text-on-dark-muted transition-colors group-hover:text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-lg font-bold transition-colors group-hover:text-accent">{l.label}</span>
                  </span>
                  <ArrowRight aria-hidden className="size-4 shrink-0 -translate-x-2 text-accent opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Clients + technology partners — two sides of one relationship */}
      <div id="clients" className="gtc relative scroll-mt-24 bg-paper text-fg">
        <span data-gtc-ghost className="gtc-ghost" aria-hidden>
          90%
        </span>

        {/* Claim */}
        <div className="wrap-wide relative pt-[clamp(5rem,10vw,8.5rem)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <p data-gtc-fade className="t-eyebrow flex items-center gap-3 text-accent-strong">
                <span data-gtc-rule className="h-px w-10 origin-left bg-accent" aria-hidden />
                Our clients · Technology partners
              </p>
              <h3 className="gtc-title mt-7">
                {["Trusted by", "50+ clients, with", "90% repeat business"].map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.06em]">
                    <span data-gtc-line className="block">
                      {i === 1 ? (
                        <>
                          <em className="gtc-em">50+ clients</em>, with
                        </>
                      ) : i === 2 ? (
                        <>
                          <span className="gtc-mark">90%</span> repeat business
                        </>
                      ) : (
                        line
                      )}
                    </span>
                  </span>
                ))}
              </h3>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4">
              <p data-gtc-fade className="max-w-[40ch] text-[1.05rem] leading-relaxed text-muted pretty">
                {RELATIONSHIPS.trustBody}
              </p>
              <dl data-gtc-proof className="gtc-proof mt-8">
                {PROOF.map((p) => (
                  <div key={p.label} data-gtc-fact className="gtc-fact">
                    <dd className="text-[clamp(1.6rem,1.2rem+1.1vw,2.2rem)] leading-none font-extrabold tracking-[-0.045em] text-navy tabular-nums">
                      <span data-gt-num={p.to}>{p.to}</span>
                      <span className="text-accent">{p.suf}</span>
                    </dd>
                    <dt className="mt-2 text-[0.75rem] leading-snug text-muted">{p.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Clients: two drifting rows, opposite directions */}
        <div className="mt-[clamp(4rem,8vw,6.5rem)]" aria-labelledby="gtc-clients-title">
          <div data-gtc-fade className="wrap-wide flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h4 id="gtc-clients-title" className="t-eyebrow text-fg">
              Selected clients
            </h4>
            <p className="t-mono text-[0.68rem] tracking-[0.08em] text-muted uppercase">
              {CLIENT_LOGOS.length} of {RELATIONSHIPS.clientsCount} · banking, government, telecoms, industry
            </p>
          </div>
          <div data-gtc-band className="gtc-band mt-6">
            {[CLIENT_LOGOS.slice(0, 10), CLIENT_LOGOS.slice(10)].map((row, r) => (
              <div key={r} className={`gtc-row ${r ? "gtc-row-rev" : ""}`}>
                {[0, 1].map((copy) => (
                  <ul key={copy} className="gtc-track" aria-hidden={copy === 1 || undefined} aria-label={copy ? undefined : r ? "Selected clients, continued" : "Selected clients"}>
                    {row.map((n) => (
                      <li key={n} className="gtc-logo logo-cell">
                        <LogoMark name={n} height={46} />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            ))}
          </div>
          <ul data-gtc-creds className="wrap-wide gtc-creds mt-8" aria-label="Certifications">
            {CERTIFICATIONS.map((c) => (
              <li key={c.name} data-gtc-cred>
                <span className="block text-[0.82rem] font-bold text-fg">{c.name}</span>
                <span className="mt-1 block text-[0.75rem] leading-snug text-muted">{c.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bridge: clients and partners meet at Purview */}
        <div data-gtc-bridge className="wrap-wide relative mt-[clamp(4rem,8vw,6rem)]" aria-hidden>
          <div className="gtc-bridge">
            <span className="gtc-node">
              <span className="t-mono">Our clients</span>
              <b>{RELATIONSHIPS.clientsCount}</b>
            </span>
            <span data-gtc-wire className="gtc-wire gtc-wire-l" />
            <span data-gtc-hub className="gtc-hub">
              <Image src="/brand/purview-logo-navy.png" alt="" width={365} height={132} className="h-6 w-auto sm:h-7" />
              <span className="t-mono">One accountable partner</span>
            </span>
            <span data-gtc-wire className="gtc-wire gtc-wire-r" />
            <span className="gtc-node gtc-node-r">
              <span className="t-mono">Technology partners</span>
              <b>{partners}</b>
            </span>
          </div>
        </div>

        {/* Partners: a raised sheet with an editorial index */}
        <div data-gtc-sheet className="gtc-sheet relative mt-[clamp(2.5rem,5vw,4rem)]">
          <div className="wrap-wide py-[clamp(4rem,8vw,6.5rem)]">
            <div data-gtc-phead className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
              <div className="lg:col-span-5">
                <p className="t-eyebrow text-accent-strong">Technology partners</p>
                <h3 className="mt-4 max-w-[15ch] text-[clamp(1.85rem,1.2rem+1.8vw,2.8rem)] leading-[1.05] font-extrabold tracking-[-0.032em]">
                  Platform-flexible by design.
                </h3>
              </div>
              <p className="max-w-[52ch] text-muted lg:col-span-7 pretty">
                We are not a reseller of one stack. We certify on the platforms our clients already run, and on the ones they are moving to: {partners} partners across {PARTNER_GROUPS.length} categories.
              </p>
            </div>

            <div data-gtc-index className="mt-[clamp(2.5rem,5vw,4rem)]">
              <PartnerIndex groups={PARTNER_GROUPS} />
            </div>

            <Link href="/company#partners" className="group mt-10 inline-flex items-center gap-2 font-bold text-fg">
              All technology partners
              <ArrowUpRight aria-hidden className="size-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </Choreo>
  );
}
