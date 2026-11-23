import type { Metadata } from "next";
import Image from "next/image";
import { CASES } from "@/content/home";
import { PageHero, Section, Heading, NumberedList } from "@/components/sections/PageKit";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { TextLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Customer Success",
  description: "Selected delivery stories across AI, banking, public services, networks and high-density compute. Engagement-specific evidence can be shared with qualified clients under NDA.",
  path: "/our-work",
});

// purviewservices.com/customer-success.html
const STORIES = [
  { title: "Approximately 500 MW of AI data centre capacity delivered", body: "Engineering and delivery teams have supported AI data centre programmes spanning GPU installation, cabling, integration, commissioning and operational readiness. Evidence pack available under NDA, organised by geography, customer, scope and project phase." },
  { title: "T-Wallet: digital public services at scale", body: "Citizen payments, recharges and government services through a statewide digital wallet programme.", href: "/twallet" },
  { title: "Technology delivery for regulated financial institutions", body: "Engineering and managed delivery for banking environments where security, reliability and governance are essential. Client-specific references available through an approved NDA process.", href: "/bfsi" },
  { title: "Agentic AI: from proof of concept to governed workflow", body: "Secure AI orchestration, measurable evaluations and human oversight for enterprise processes. Ask for a solution demonstration and documented evaluation methodology.", href: "/ai-solutions" },
  { title: "Networks & field engineering: installation to managed operations", body: "Multi-location deployment, testing, certification and handover supported by field and service operations. Scope and regional delivery records available on request.", href: "/dc-networks" },
];

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Work" }]}
        eyebrow="Customer success"
        title="Engineering outcomes, not just promises."
        lede="Selected delivery stories across AI, banking, public services, networks and high-density compute. Engagement-specific references and detailed evidence can be shared with qualified clients under NDA."
        actions={[{ label: "Request a confidential capability briefing", href: "/contact" }]}
        image="/img/customer-success-hero.jpg"
      />
      <div className="bg-paper">
        {CASES.map((c, i) => (
          <article key={c.id} className="border-b border-line py-[clamp(3rem,6vw,5rem)]" aria-labelledby={`case-${c.id}`}>
            <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className={`relative aspect-[16/10] overflow-hidden rounded-[var(--radius-m)] bg-ink lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`} data-reveal>
                <Image src={c.image} alt="" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 to-transparent" />
                <p className="absolute bottom-5 left-6 text-[clamp(2.5rem,1.6rem+3vw,4.5rem)] leading-none font-extrabold tracking-tight text-accent">{c.resultValue}</p>
                <p className="t-mono absolute top-3 right-3 text-[0.6rem] text-on-dark-muted">Illustrative imagery</p>
              </div>
              <div className="lg:col-span-6">
                <p className="t-eyebrow text-accent-strong">
                  {String(i + 1).padStart(2, "0")} · {c.capability}
                </p>
                <h2 id={`case-${c.id}`} className="t-h3 mt-3">
                  {c.title}
                </h2>
                <dl className="mt-6 grid gap-5 border-t border-fg/80 pt-6 sm:grid-cols-3">
                  <div>
                    <dt className="t-eyebrow text-muted">Client</dt>
                    <dd className="mt-1 font-bold">{c.client}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="t-eyebrow text-muted">Engagement</dt>
                    <dd className="mt-1 text-muted">{c.engagement}</dd>
                  </div>
                  <div className="sm:col-span-3">
                    <dt className="t-eyebrow text-muted">Result</dt>
                    <dd className="mt-1 text-lg font-semibold">{c.result}</dd>
                  </div>
                </dl>
                <TextLink href={c.link.href} className="mt-7 text-fg">
                  {c.link.label}
                </TextLink>
              </div>
            </div>
          </article>
        ))}
      </div>
      <Section tone="surface" labelledBy="ow-more">
        <Heading index="—" eyebrow="Selected delivery stories" title="~500 MW delivered. Detailed project evidence available under NDA." lead="For qualified customers, Purview can provide a controlled evidence pack by location, customer, delivery scope, phase and supporting documentation, subject to contractual confidentiality obligations." id="ow-more" />
        <div className="mt-14">
          <NumberedList items={STORIES} />
        </div>
      </Section>
      <ContactCTA eyebrow="Evidence on request" title="Request a confidential capability briefing." body="Talk to our team about the technical, commercial and operational requirements of your programme." prompt={null} primary={{ label: "Contact Purview", href: "/contact" }} secondary={{ label: "Purview DC track record", href: "/dc-why" }} />
    </>
  );
}
