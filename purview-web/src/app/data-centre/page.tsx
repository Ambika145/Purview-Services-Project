import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DC } from "@/content/verticals";
import { CERTIFICATIONS } from "@/content/site";
import { PageHero, Section, Heading, StatRow, Faq } from "@/components/sections/PageKit";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { DataHallVisual } from "@/components/verticals/DataHallVisual";
import { StageExplorer } from "@/components/verticals/StageExplorer";
import { Button, TextLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";
import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const DESCRIPTION =
  "Purview DC designs, installs, commissions and operates AI data centres: GPU floors, modular facilities, structured cabling, networks and 24×7 operations. ~500 MW of AI capacity delivered.";

export const metadata: Metadata = pageMetadata({
  title: "AI Data Centre Design, GPU Deployment & Commissioning",
  description: DESCRIPTION,
  path: "/data-centre",
  image: "/img/dc-corridor-teal.jpg",
});

export default function DataCentrePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/data-centre" }, { label: "Purview Data Centre" }]}
        layer="B"
        eyebrow={DC.hero.eyebrow}
        title={DC.hero.title}
        lede={DC.hero.lede}
        actions={[
          { label: "Discuss a deployment", href: "/contact" },
          { label: "Visit purviewdc.com", href: "https://purviewdc.com/", external: true },
        ]}
        image="/img/dc-corridor-teal.jpg"
        stats={DC.hero.stats}
      />

      {/* 2 · Value proposition + signature 3D floor */}
      <Section tone="abyss" labelledBy="dc-value">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5">
            <Heading index="01" eyebrow="Why it matters" title={DC.value.title} dark id="dc-value" />
            <p className="t-lead mt-6 text-on-dark-muted pretty" data-reveal>
              {DC.value.body}
            </p>
            <ul className="mt-10 border-t border-sky/15">
              {DC.value.audiences.map((a) => (
                <li key={a.t} className="border-b border-sky/15 py-4" data-reveal>
                  <p className="font-bold">{a.t}</p>
                  <p className="mt-1 text-sm text-on-dark-muted">{a.d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-h-[420px] lg:col-span-7" data-reveal>
            <DataHallVisual />
          </div>
        </div>
      </Section>

      {/* 3 · End-to-end delivery: eight stages */}
      <Section tone="ink" labelledBy="dc-stages">
        <Heading
          index="02"
          eyebrow="End-to-end delivery"
          title="Eight stages. One documentation thread."
          lead="One accountable partner from purchase order to steady-state operations, from the first drawing to the last support ticket."
          dark
          id="dc-stages"
        />
        <div className="mt-14">
          <StageExplorer />
        </div>
      </Section>

      {/* 4–8 · Capability chapters */}
      <section className="bg-paper" aria-labelledby="dc-cap">
        <div className="wrap section">
          <Heading index="03" eyebrow="Capabilities" title="From facility to fleet operations." lead="Infrastructure engineering, GPU deployment, commissioning, networks and cabling, and 24×7 operations, delivered by the same teams." id="dc-cap" />
          <div className="mt-16 space-y-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line">
            {DC.chapters.map((c, i) => (
              <article key={c.id} id={c.id} className="grid gap-8 bg-surface p-7 sm:p-10 lg:grid-cols-12" aria-labelledby={`cap-${c.id}`} data-reveal>
                <div className="lg:col-span-3">
                  <p className="t-mono text-xs text-accent-strong">{String(i + 1).padStart(2, "0")}</p>
                  <p className="t-eyebrow mt-2 text-muted">{c.label}</p>
                </div>
                <div className="lg:col-span-5">
                  <h3 id={`cap-${c.id}`} className="t-h3">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-muted pretty">{c.body}</p>
                  <TextLink href={c.href} className="mt-6 text-fg">
                    {c.linkLabel}
                  </TextLink>
                </div>
                <dl className="self-start rounded-[var(--radius-s)] border border-line bg-paper lg:col-span-4">
                  {c.spec.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-3 border-b border-line px-4 py-3 text-sm last:border-0">
                      <dt className="t-mono text-[0.7rem] tracking-wider text-muted uppercase">{k}</dt>
                      <dd className="font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9 · Delivery methodology */}
      <Section tone="abyss" labelledBy="dc-method">
        <Heading
          index="04"
          eyebrow="Delivery methodology"
          title="Preparation-first, gated by quality."
          lead="Won on the bench, proven on the floor. Verification, assembly and labelling are completed in prestaging before installation reaches the data hall; infrastructure advances only after meeting each gate’s release criteria."
          dark
          id="dc-method"
        />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-sky/15 bg-sky/15 md:grid-cols-3 lg:grid-cols-6">
          {DC.phases.map((p, i) => (
            <li key={p.t} className="flex flex-col bg-abyss p-5" data-reveal style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
              <p className="t-mono text-xs text-on-dark-muted">PHASE {i + 1}</p>
              <p className="mt-3 font-bold leading-snug">{p.t}</p>
              <p className="mt-2 text-sm text-on-dark-muted">{p.d}</p>
              {p.gate && (
                <p className="mt-auto pt-5">
                  <span className="t-mono inline-flex items-center gap-2 rounded border border-accent/60 px-2 py-1 text-[0.65rem] text-accent">
                    <span className="size-1.5 rotate-45 bg-accent" /> GATE · {p.gate.toUpperCase()}
                  </span>
                </p>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-eyebrow text-sky">The India advantage</p>
            <h3 className="t-h3 mt-3">De-risking GPU hardware import, staging and deployment.</h3>
            <p className="mt-4 text-on-dark-muted">GigaPort in Hyderabad is India’s first end-to-end bonded AI hardware facility: import, integration, testing and last-mile delivery in one place, taking the route from months to weeks.</p>
            <TextLink href="/gigaport" className="mt-6 text-on-dark">
              GigaPort
            </TextLink>
          </div>
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            <span className="absolute top-3 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-sky/40 via-accent to-sky/40 lg:block" aria-hidden />
            {DC.india.map((s, i) => (
              <li key={s.t} className="relative" data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                <span className="relative z-10 grid size-6 place-items-center rounded-full border border-accent bg-abyss" aria-hidden>
                  <span className="size-2 rounded-full bg-accent" />
                </span>
                <p className="t-mono mt-4 text-[0.7rem] text-on-dark-muted">{s.t.toUpperCase()}</p>
                <p className="mt-1 font-bold">{s.place}</p>
                <p className="mt-1 text-sm text-on-dark-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 10 · Platforms and tools */}
      <Section tone="surface" labelledBy="dc-platforms">
        <Heading index="05" eyebrow="Platforms and tools" title="We built the software that runs our own deployments." lead="Every one of these started as a tool we needed on a live build. They are now available to clients and partners through Purview DC. Demonstrations on request." id="dc-platforms" />
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <figure className="overflow-hidden rounded-[var(--radius-m)] border border-line bg-ink lg:col-span-7" data-reveal>
            <Image src="/img/dc-dcd-digital-twin.jpg" alt="Data Center Deployer: rack inventory list beside a 3D view of a data hall with rack rows" width={1600} height={1000} className="h-auto w-full" sizes="(min-width:1024px) 55vw, 100vw" />
            <figcaption className="t-mono border-t border-line bg-surface px-4 py-2.5 text-[0.7rem] text-muted">Data Center Deployer: rack inventory and live 3D hall view, as used on AI factory projects. Source: purviewdc.com</figcaption>
          </figure>
          <ul className="border-t border-fg/80 lg:col-span-5">
            {DC.platforms.map((p) => (
              <li key={p.t} className="border-b border-line py-5" data-reveal>
                <p className="flex items-center gap-3">
                  <span className="t-mono rounded border border-line px-1.5 py-0.5 text-[0.65rem] text-muted uppercase">{p.tag}</span>
                  <span className="text-lg font-bold">{p.t}</span>
                </p>
                <p className="mt-2 text-muted">{p.d}</p>
              </li>
            ))}
            <li className="pt-6">
              <TextLink href="/dc-solutions" className="text-fg">
                The four platforms in detail
              </TextLink>
            </li>
          </ul>
        </div>
      </Section>

      {/* 11 · Proof points + development register */}
      <Section tone="paper" labelledBy="dc-proof">
        <Heading index="06" eyebrow="Proof points" title="Proven where execution certainty is non-negotiable." id="dc-proof" />
        <StatRow
          className="mt-14"
          items={[
            { value: "~500 MW", label: "AI data centre capacity delivered" },
            { value: "2,500+", label: "AI server racks deployed and validated" },
            { value: "185,000+", label: "copper and fibre links terminated, tested and certified" },
            { value: "55+", label: "countries served in networking and infrastructure delivery" },
          ]}
        />
        <div className="mt-16">
          <p className="t-eyebrow text-muted">Development register · purviewservices.com/dc-development</p>
          <ul className="mt-5 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {DC.projects.map((p) => (
              <li key={p.t} className="flex flex-col bg-surface p-6" data-reveal>
                <p className="flex items-center justify-between">
                  <span className={`t-mono text-[0.65rem] tracking-wider uppercase ${p.status.startsWith("Energised") || p.status.startsWith("Live") ? "text-accent-strong" : "text-muted"}`}>● {p.status}</span>
                </p>
                <p className="mt-4 text-3xl font-extrabold tracking-tight">{p.mw}</p>
                <p className="mt-2 font-bold">{p.t}</p>
                <p className="text-sm text-muted">{p.where}</p>
                <p className="mt-3 text-sm text-muted">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" aria-label="Certifications">
          {CERTIFICATIONS.map((c) => (
            <li key={c.name} className="bg-surface p-5">
              <p className="font-bold">{c.name}</p>
              <p className="mt-1 text-sm text-muted">{c.detail}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
          <span className="t-eyebrow text-muted">Certified installer</span>
          {["Panduit", "CommScope", "Systimax", "Corning"].map((n) => (
            <span key={n} className="logo-cell">
              <LogoMark name={n} height={26} />
            </span>
          ))}
        </div>
      </Section>

      {/* 12 · Case studies */}
      <Section tone="ink" labelledBy="dc-track">
        <Heading index="07" eyebrow="Track record" title="Delivered to date." lead="Client names are withheld; references are available under NDA." dark id="dc-track" />
        <div className="mt-12 overflow-x-auto rounded-[var(--radius-m)] border border-sky/15">
          <table className="w-full min-w-[44rem] text-left">
            <thead>
              <tr className="border-b border-sky/15 bg-abyss">
                {["Sector and region", "Engagement", "Outcome"].map((h) => (
                  <th key={h} scope="col" className="t-eyebrow px-6 py-4 font-medium text-on-dark-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DC.track.map(([a, b, c]) => (
                <tr key={a} className="border-b border-sky/10 last:border-0">
                  <th scope="row" className="px-6 py-5 align-top font-bold">
                    {a}
                  </th>
                  <td className="px-6 py-5 align-top text-on-dark-muted">{b}</td>
                  <td className="px-6 py-5 align-top">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 flex flex-wrap gap-6">
          <Button href="/dc-why" variant="ghost-dark">
            Why Purview DC
          </Button>
          <TextLink href="https://purviewdc.com/why-purview.html#track-record" className="text-on-dark">
            Full track record on purviewdc.com
          </TextLink>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="paper" labelledBy="dc-faq">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-eyebrow text-accent-strong">Questions</p>
            <h2 id="dc-faq" className="t-h2 mt-4">
              Common questions
            </h2>
            <ul className="mt-8 space-y-2 text-sm">
              {[
                ["Services: eight stages", "/dc-services"],
                ["Delivery model", "/dc-delivery"],
                ["Structured cabling", "/dc-cabling"],
                ["Network solutions", "/dc-networks"],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="link-arrow">
                    {l} <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <Faq items={DC.faq} />
          </div>
        </div>
      </Section>

      <ContactCTA
        eyebrow="Project enquiries"
        title="Planning an AI factory build, migration or refresh?"
        body="Send the platform, the site and the target go-live date. Planning, OEM alignment, import and staging can be scoped around your in-house team; installation, commissioning, handover and operations are delivered by Purview specialists."
        prompt={null}
        primary={{ label: "Discuss a deployment", href: "/contact" }}
        secondary={{ label: "Open the Purview DC enquiry form", href: "https://purviewdc.com/contact.html" }}
      />
      <JsonLd data={serviceJsonLd({ name: "AI data centre design, GPU deployment, commissioning and operations", description: DESCRIPTION, path: "/data-centre", serviceType: "AI data centre services" })} />
    </>
  );
}
