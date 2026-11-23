import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TECH } from "@/content/verticals";
import { CASES, INDUSTRIES, PARTNER_GROUPS } from "@/content/home";
import { PageHero, Section, Heading, NumberedList, StepsRail, Faq } from "@/components/sections/PageKit";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { WorkflowExplorer } from "@/components/verticals/WorkflowExplorer";
import { TextLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";
import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const DESCRIPTION =
  "Enterprise Gen AI and agentic applications that run inside your data boundary, plus digital product engineering, data, cloud, cybersecurity and managed technology services.";

export const metadata: Metadata = pageMetadata({
  title: "Enterprise Agentic AI, Gen AI & Technology Services",
  description: DESCRIPTION,
  path: "/tech",
  image: "/img/insights-hero.jpg",
});

export default function TechPage() {
  const models = PARTNER_GROUPS.find((g) => g.title === "AI Platforms & Models")!.logos;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/tech" }, { label: "Purview Tech" }]}
        layer="A"
        eyebrow={TECH.hero.eyebrow}
        title={TECH.hero.title}
        lede={TECH.hero.lede}
        actions={[
          { label: "Start a proof of value", href: "/contact" },
          { label: "purviewtech.ai", href: "https://www.purviewtech.ai/", external: true },
        ]}
        stats={TECH.hero.stats}
      />

      {/* 2 · AI-first positioning + signature workflow */}
      <Section tone="abyss" labelledBy="t-how">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading index="01" eyebrow="From the demo to the floor" title="How enterprise AI works in practice." dark id="t-how" />
            <p className="t-lead mt-6 text-on-dark-muted pretty" data-reveal>
              Most enterprise AI stalls between the demo and the floor. SAIE, the Secure AI Engine, is the design, orchestration and workflow layer that sits above frontier models rather than depending on any one of them.
            </p>
            <p className="mt-5 text-on-dark-muted" data-reveal>
              Every capability ships with the same four things: an evaluation set agreed with you, guardrails and audit, cost controls, and a managed run option. The same group installs the GPU floors these systems run on, so every design decision is made with the real cost of inference in view.
            </p>
            <div className="mt-10" data-reveal>
              <p className="t-eyebrow text-on-dark-muted">Model-agnostic by design</p>
              <ul className="mt-4 flex flex-wrap items-center gap-2">
                {models.map((m) => (
                  <li key={m} className="grid h-12 place-items-center rounded bg-surface px-3">
                    <LogoMark name={m} height={22} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <WorkflowExplorer />
          </div>
        </div>
      </Section>

      {/* 3 · Enterprise AI: ten capabilities */}
      <Section tone="paper" labelledBy="t-cap">
        <Heading index="02" eyebrow="Enterprise AI" title="Ten capabilities, one engineering standard." lead="Gen AI applications and copilots, agentic workflows, edge and vision, conversational AI, XR, RAG, machine learning, hyperautomation, modernisation and multi-modal AI." id="t-cap" />
        <div className="mt-14">
          <NumberedList items={TECH.capabilities} cols={2} />
        </div>
      </Section>

      {/* 4 · Agentic workflows: the method */}
      <Section tone="surface" labelledBy="t-method">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Heading index="03" eyebrow="Agentic workflows" title="Problem first, proof in weeks, then harden and run." id="t-method" />
          </div>
          <div className="lg:col-span-8">
            <StepsRail items={TECH.method} />
            <div className="on-dark mt-14 grid gap-6 rounded-[var(--radius-m)] bg-ink p-8 sm:grid-cols-[1fr_auto] sm:p-10" data-reveal>
              <div>
                <p className="t-eyebrow text-sky">Case in point · major US financial institution</p>
                <p className="t-h3 mt-3">Workflow modernisation on the Secure AI Engine</p>
                <p className="mt-3 max-w-[54ch] text-on-dark-muted">A live operations workflow was re-run through SAIE agents inside the bank’s boundary, with human review on exceptions and a full audit trail. Scored against an evaluation set the client defined.</p>
              </div>
              <div className="self-end sm:text-right">
                <p className="text-6xl font-extrabold tracking-tight text-accent">98%</p>
                <p className="mt-1 text-sm text-on-dark-muted">task success rate</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5 · Voice and vision AI */}
      <Section tone="abyss" labelledBy="t-vv">
        <Heading index="04" eyebrow="Voice, vision and XR" title="AI where the work happens." dark id="t-vv" />
        <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-sky/15 bg-sky/15 lg:grid-cols-3">
          {[
            { t: "Conversational AI · CallOHM", d: "Inbound and outbound voice agents, WhatsApp and web chat, with LLM-driven dialogue, telephony and CRM integration and call analytics, in 30+ languages.", img: "/img/helpdesk.jpg", href: "/callohm" },
            { t: "Edge & Vision AI", d: "Industrial inspection, safety-zone monitoring, crowd and footfall analytics, ANPR and asset tracking, deployed on edge hardware so decisions happen on site.", img: "/img/edge-vision.jpg", href: "/edge-vision" },
            { t: "AI XR · Purview Technologies", d: "Hands-free guidance for field engineers, remote expert sessions with AR annotation, AI assistive wearables (SEVA for low-vision users) and training in XR.", img: "/img/embedded.jpg", href: "/nexable" },
          ].map((c) => (
            <article key={c.t} className="group flex flex-col bg-abyss" data-reveal>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={c.img} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover opacity-85 transition-transform duration-[1200ms] group-hover:scale-105" />
                <span className="t-mono absolute right-2 bottom-2 rounded bg-abyss/75 px-1.5 py-0.5 text-[0.6rem] text-on-dark-muted">Illustrative</span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl font-bold">{c.t}</h3>
                <p className="mt-3 text-on-dark-muted">{c.d}</p>
                <TextLink href={c.href} className="mt-auto pt-6 text-on-dark">
                  Explore
                </TextLink>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 6–9 · Engineering, data, cloud, security, managed services */}
      <Section tone="paper" labelledBy="t-platform">
        <Heading index="05" eyebrow="The estate beneath the AI" title="Engineering, data, cloud, security and managed technology." lead="AI is only as good as the data under it, the platform it ships on and the people who run it at 3 a.m. Each practice publishes the measures it works to." id="t-platform" />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {TECH.platform.map((p) => (
            <li key={p.id} className="group relative flex flex-col bg-surface" data-reveal>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={p.image} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl font-bold">
                  <Link href={p.href} className="after:absolute after:inset-0 group-hover:text-accent-strong">
                    {p.t}
                  </Link>
                </h3>
                <p className="mt-3 text-muted">{p.d}</p>
                <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
                  <p>
                    <span className="block text-2xl font-extrabold tracking-tight">{p.stat}</span>
                    <span className="block text-xs text-muted">{p.statLabel}</span>
                  </p>
                  <ArrowRight aria-hidden className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="t-mono mt-4 text-[0.7rem] text-muted">Figures as published on each practice page; imagery illustrative.</p>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {[
            ["Embedded Engineering & IoT", "/embedded"],
            ["Automation & RPA", "/rpa"],
            ["Audio Visual & Collaboration", "/av"],
            ["Managed Security Services", "/security-managed"],
            ["Help Desk Services", "/helpdesk"],
            ["Consulting & Advisory", "/advisory"],
          ].map(([l, h]) => (
            <Link key={h} href={h} className="link-arrow">
              {l} <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          ))}
        </div>
      </Section>

      {/* 10 · Products and platforms */}
      <Section tone="ink" labelledBy="t-products">
        <Heading index="06" eyebrow="Products and platforms" title="Products clients run on today." lead="Purview is structured as 14 focused companies, each led by subject-matter experts, assembled into one delivery organisation when a problem crosses domains." dark id="t-products" />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-sky/15 bg-sky/15 sm:grid-cols-2 lg:grid-cols-4">
          {TECH.products.map((p) => (
            <li key={p.t} className="group relative flex flex-col bg-ink p-6 transition-colors hover:bg-abyss" data-reveal>
              <p className="t-eyebrow text-on-dark-muted">{p.kind}</p>
              <h3 className="mt-3 text-lg font-bold">
                <Link href={p.href} className="after:absolute after:inset-0 group-hover:text-accent">
                  {p.t}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-on-dark-muted">{p.d}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <TextLink href="/products" className="text-on-dark">
            All products & platforms
          </TextLink>
        </div>
      </Section>

      {/* 11 · Industry applications */}
      <Section tone="paper" labelledBy="t-ind">
        <Heading index="07" eyebrow="Industry applications" title="Where this work lands." id="t-ind" />
        <ul className="mt-12 grid gap-x-10 border-t border-fg/80 md:grid-cols-2">
          {INDUSTRIES.map((ind) => (
            <li key={ind.id} className="border-b border-line">
              <Link href={ind.href} className="group grid grid-cols-[1fr_auto] gap-4 py-5">
                <span>
                  <span className="block text-lg font-bold group-hover:text-accent-strong">{ind.name}</span>
                  <span className="mt-1 block text-sm text-muted">{ind.body}</span>
                </span>
                <ArrowRight aria-hidden className="mt-1 size-5 text-muted transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 12 · Real outcomes */}
      <Section tone="surface" labelledBy="t-out">
        <Heading index="08" eyebrow="Outcomes" title="Agents, platforms and payments in operation." id="t-out" />
        <ul className="mt-12 grid gap-8 lg:grid-cols-3">
          {CASES.filter((c) => ["us-fi", "twallet", "national-payments"].includes(c.id)).map((c) => (
            <li key={c.id} className="flex flex-col border-t border-fg/80 pt-6" data-reveal>
              <p className="t-eyebrow text-muted">
                {c.client} · {c.capability}
              </p>
              <p className="mt-6 text-5xl font-extrabold tracking-tight text-accent-strong">{c.resultValue}</p>
              <h3 className="mt-4 text-xl font-bold">{c.title}</h3>
              <p className="mt-3 text-muted">{c.engagement}</p>
              <p className="mt-3 font-semibold">{c.result}</p>
              <TextLink href={c.link.href} className="mt-auto pt-6 text-fg">
                {c.link.label}
              </TextLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" labelledBy="t-faq">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-eyebrow text-accent-strong">FAQ</p>
            <h2 id="t-faq" className="t-h2 mt-4">
              Questions we are asked
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={TECH.faq} />
          </div>
        </div>
      </Section>

      <ContactCTA
        eyebrow="AI Solutions"
        title="Tell us the decision that has to be made."
        body="How fast, under what constraints, and what success looks like. We will come back with a four-to-six-week proof of value."
        prompt={null}
        primary={{ label: "Start a proof of value", href: "/contact" }}
        secondary={{ label: "AI Infrastructure", href: "/ai-infrastructure" }}
      />
      <JsonLd data={serviceJsonLd({ name: "Enterprise agentic AI and Gen AI applications", description: DESCRIPTION, path: "/tech", serviceType: "Enterprise AI application development" })} />
    </>
  );
}
