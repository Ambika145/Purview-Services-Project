import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WORKFORCE } from "@/content/verticals";
import { LOCATIONS } from "@/content/home";
import { PageHero, Section, Heading, StatRow, Faq } from "@/components/sections/PageKit";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { WorkforceJourney } from "@/components/verticals/WorkforceJourney";
import { Button, TextLink } from "@/components/ui/Button";
import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const DESCRIPTION =
  "2,500 professionals across 21 countries, hired by our own agentic AI platform, certified in our labs and deployed on our floors and yours. AI-powered recruitment, certified engineers and workforce solutions.";

export const metadata: Metadata = pageMetadata({
  title: "Workforce Solutions: AI Recruitment & Certified Engineers",
  description: DESCRIPTION,
  path: "/workforce",
  image: "/img/workforce-professionals.jpg",
});

export default function WorkforcePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/workforce" }, { label: "Purview Workforce" }]}
        layer="C"
        eyebrow={WORKFORCE.hero.eyebrow}
        title={WORKFORCE.hero.title}
        lede={WORKFORCE.hero.lede}
        actions={[
          { label: "Talk to Workforce Solutions", href: "/contact" },
          { label: "See how RabbiT works", href: "/rabbit" },
        ]}
        image="/img/workforce-professionals.jpg"
        stats={WORKFORCE.hero.stats}
      />

      {/* Signature: Recruit → Train → Deploy → Operate */}
      <Section tone="abyss" labelledBy="w-model">
        <Heading
          index="01"
          eyebrow="Technology enabled. People delivered."
          title="Recruit. Train. Deploy. Operate."
          lead="This is how Purview staffs its own GPU floors, service desks and client sites: recruit for aptitude, train in labs with real racks, deploy lead engineers each with their own team, then carry the work into operations. The same programme is available to clients and partners."
          dark
          id="w-model"
        />
        <div className="mt-16">
          <WorkforceJourney />
        </div>
      </Section>

      {/* AI-powered recruitment: RabbiT */}
      <Section tone="paper" labelledBy="w-rabbit">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading index="02" eyebrow="Our USP · RabbiT by CallOHM" title="Stop screening. Start hiring." id="w-rabbit" />
            <p className="t-lead mt-6 text-muted pretty" data-reveal>
              RabbiT is Purview’s agentic AI recruitment platform. It calls, qualifies and schedules every applicant in their own language (30+ languages), scores every conversation against the role and keeps the whole pipeline on one board.
            </p>
            <p className="mt-5 text-muted" data-reveal>
              Most recruitment AI is built by software companies that have never run a volume hiring campaign. RabbiT was built to staff Purview’s own delivery centres, service desks and data centre floors, and is now offered to clients who hire at scale.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5" data-reveal>
              <Button href="/rabbit" variant="dark">
                See how RabbiT works
              </Button>
              <TextLink href="https://talentrabbit.callohm.com/" className="text-fg">
                talentrabbit.callohm.com
              </TextLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-[var(--radius-m)] border border-line bg-surface p-6 sm:p-8" data-reveal>
              <p className="t-eyebrow text-muted">From JD to hire · Recruitment Auto Flow</p>
              <ol className="mt-6 grid gap-px overflow-hidden rounded-[var(--radius-s)] border border-line bg-line sm:grid-cols-7">
                {WORKFORCE.rabbitFlow.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 bg-paper p-3 sm:flex-col sm:items-start sm:gap-2">
                    <span className="t-mono text-[0.7rem] text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.8rem] leading-tight font-semibold">{s}</span>
                  </li>
                ))}
              </ol>
              <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                {WORKFORCE.rabbitFeatures.map((f) => (
                  <li key={f.t} className="border-t border-line py-4">
                    <p className="font-bold">{f.t}</p>
                    <p className="mt-1 text-sm text-muted">{f.d}</p>
                  </li>
                ))}
              </ul>
              <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-6 sm:grid-cols-4">
                {WORKFORCE.rabbitTrust.map(([k, v]) => (
                  <div key={k}>
                    <dt className="t-mono text-[0.7rem] font-medium">{k}</dt>
                    <dd className="mt-1 text-xs text-muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Section>

      {/* BeeRef */}
      <Section tone="ink" labelledBy="w-beeref">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Heading index="03" eyebrow="Platform · built and run by Purview" title="BeeRef: hire through the people you trust." dark id="w-beeref" />
            <p className="t-lead mt-6 text-on-dark-muted pretty" data-reveal>
              {WORKFORCE.beeref.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5" data-reveal>
              <Button href="/beeref">Explore BeeRef</Button>
              <TextLink href="https://beeref.com/" className="text-on-dark">
                beeref.com
              </TextLink>
            </div>
          </div>
          <div className="lg:col-span-6" data-reveal>
            <ol className="flex items-center justify-between gap-2 rounded-[var(--radius-m)] border border-sky/15 bg-abyss p-5">
              {WORKFORCE.beeref.flow.map((s, i) => (
                <li key={s} className="flex flex-1 items-center gap-2">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-accent text-sm font-bold text-accent">{i + 1}</span>
                  <span className="font-bold">{s}</span>
                  {i < 3 && <span className="hidden h-px flex-1 bg-sky/30 sm:block" aria-hidden />}
                </li>
              ))}
            </ol>
            <dl className="mt-6 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-sky/15 bg-sky/15 sm:grid-cols-3">
              {WORKFORCE.beeref.stats.map((s) => (
                <div key={s.label} className="bg-ink p-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-4xl font-extrabold text-accent">{s.value}</dd>
                  <dd className="mt-2 text-sm text-on-dark-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Certified engineering workforce */}
      <Section tone="surface" labelledBy="w-rtd">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-m)] lg:col-span-6" data-reveal>
            <Image src="/img/rtd.jpg" alt="Illustrative image of engineers in high-visibility vests being briefed at a server rack" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            <p className="t-mono absolute right-3 bottom-3 rounded bg-abyss/70 px-2 py-1 text-[0.6rem] text-on-dark">Illustrative imagery</p>
          </div>
          <div className="lg:col-span-6">
            <Heading index="04" eyebrow="Certified engineering workforce" title="Trained in our labs, deployed floor-ready." id="w-rtd" />
            <p className="mt-6 text-muted" data-reveal>
              Certified lead engineers and technicians trained with tooling, AR/VR and real racks, then deployed wherever the work is: for data centre operators, OEMs and partners, enterprises, and government skilling programmes.
            </p>
            <div className="mt-8 rounded-[var(--radius-m)] border border-line bg-paper p-6" data-reveal>
              <p className="t-eyebrow text-accent-strong">Case in point · Purview DC, Australia</p>
              <p className="mt-2 font-bold">Engineers deployed from India</p>
              <p className="mt-2 text-sm text-muted">Lead engineers and technicians trained in Hyderabad labs, certified and deployed on visas to a sovereign AI data centre build.</p>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-accent-strong">12–15 engineers deployed</p>
            </div>
            <TextLink href="/rtd" className="mt-8 text-fg">
              Recruit, Train, Deploy
            </TextLink>
          </div>
        </div>
      </Section>

      {/* Services and delivery models */}
      <Section tone="paper" labelledBy="w-services">
        <Heading index="05" eyebrow="Specialist staffing and delivery" title="Hiring, offshore delivery and payroll, under one owner." id="w-services" />
        <ul className="mt-14 grid gap-x-10 border-t border-fg/80 md:grid-cols-2 lg:grid-cols-3">
          {WORKFORCE.services.map((s, i) => (
            <li key={s.t} className="border-b border-line" data-reveal>
              <Link href={s.href} className="group block py-6">
                <span className="t-mono text-xs text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-2 flex items-center justify-between gap-4 text-lg font-bold group-hover:text-accent-strong">
                  {s.t}
                  <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-2 block text-muted">{s.d}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-eyebrow text-accent-strong">Delivery models</p>
            <h3 className="t-h3 mt-3">The right mix of cost, time zone and language.</h3>
            <p className="mt-4 text-muted">All delivery centres run on the same CMMi Level 5 processes, in ISO 27001 secure delivery environments.</p>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {WORKFORCE.models.map((m) => (
              <div key={m.t} className="bg-surface p-6">
                <dt className="font-bold">{m.t}</dt>
                <dd className="mt-2 text-sm text-muted">{m.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Global deployment + proof */}
      <Section tone="abyss" labelledBy="w-global">
        <Heading
          index="06"
          eyebrow="Global deployment"
          title="Hired in 21 countries. Deployed wherever the floor is."
          lead="Recruitment campaigns run across India, Poland, the Gulf and ANZ, with a visa-ready bench in each operating country and UK and US account leadership."
          dark
          id="w-global"
        />
        <ul className="mt-12 flex flex-wrap gap-2">
          {LOCATIONS.filter((l) => l.kind === "dc" || l.city === "Edinburgh" || l.city === "Hyderabad").map((l) => (
            <li key={l.city} className="rounded border border-sky/20 px-3 py-2 text-sm">
              <span className="font-bold">{l.city}</span> <span className="text-on-dark-muted">· {l.country}</span>
            </li>
          ))}
        </ul>
        <StatRow dark className="mt-16" items={WORKFORCE.proof} />
        <p className="t-mono mt-3 text-[0.7rem] text-on-dark-muted">Figures as published on the Offshore, Recruit-Train-Deploy and Contract Payroll pages.</p>
      </Section>

      <Section tone="paper" labelledBy="w-faq">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-eyebrow text-accent-strong">FAQ</p>
            <h2 id="w-faq" className="t-h2 mt-4">
              Questions we are asked
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={WORKFORCE.faq} />
          </div>
        </div>
      </Section>

      <ContactCTA
        eyebrow="Workforce Solutions"
        title="Ready to hire faster than you can call?"
        body="Spin up your first AI recruiting campaign in minutes, or let Purview Workforce Solutions run it for you: from campaign set-up to certified engineers on the floor."
        prompt={null}
        primary={{ label: "Talk to Workforce Solutions", href: "/contact" }}
        secondary={{ label: "Get started on talentrabbit.callohm.com", href: "https://talentrabbit.callohm.com/" }}
      />
      <JsonLd data={serviceJsonLd({ name: "Workforce solutions: AI-powered recruitment and certified engineers", description: DESCRIPTION, path: "/workforce", serviceType: "Engineering workforce solutions" })} />
    </>
  );
}
