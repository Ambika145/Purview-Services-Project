import type { Metadata } from "next";
import Image from "next/image";
import { CERTIFICATIONS, FACTS } from "@/content/site";
import { PARTNER_GROUPS } from "@/content/home";
import { PageHero, Section, Heading, StatRow } from "@/components/sections/PageKit";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { LogoMark } from "@/components/ui/LogoMark";
import { TextLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us & Leadership",
  description: "Purview Services Limited is a UK-headquartered technology group of 14 companies and 2,500 people across 21 countries, held together by one engineering standard.",
  path: "/company",
});

// Names and titles as published on purviewservices.com/company.html
const LEADERS = [
  ["Reddy Punna", "Founder and Group CEO, Purview Group", "reddy-punna"],
  ["Sai", "Group Chairman", "sai"],
  ["Chiranjeevi Mareddy", "Chief Operating Officer", "chiranjeevi-mareddy"],
  ["James Hatcher", "CEO, Purview DC · Director and Head of Data Centres", "james-hatcher"],
  ["Mani Gupta", "Managing Director", "mani-gupta"],
  ["Stephen Tulloch", "Head of the CEO Office", "stephen-tulloch"],
  ["Mihir Mehta", "Chief Executive Officer, Purview Healthcare", "mihir-mehta"],
  ["Goverdhan", "Head of Workforce Solutions", "goverdhan"],
  ["Joseph Varghese", "Head Products and Technology Delivery - AI/XR", "joseph-varghese"],
  ["Sheshagiri", "Vice President, Client Partner", "sheshagiri"],
  ["Radhika", "Client Engagement Manager", "radhika"],
] as const;

const FOOTPRINT = [
  ["UK & Ireland", "Edinburgh, London, Dublin"],
  ["Europe", "Poland, Sweden, Finland, Germany, Netherlands, Switzerland"],
  ["North America", "USA, Canada, Mexico"],
  ["India", "Hyderabad, Pune, Bengaluru, Chennai"],
  ["Asia & Middle East", "Singapore, UAE, Hong Kong, Oman, Malaysia, Philippines, Japan"],
  ["Australia, New Zealand & South Africa", "Sydney-led data centre delivery across ANZ"],
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Company" }]}
        eyebrow="About us"
        title="Founded in Scotland. Built for the AI era."
        lede="Purview Services Limited is a UK-headquartered technology group of 14 companies and 2,500 people across 21 countries, held together by one engineering standard."
        actions={[
          { label: "Talk to the leadership team", href: "/contact" },
          { label: "Careers", href: "/careers" },
        ]}
        image="/img/loc-edinburgh.jpg"
        imageNote="Edinburgh · illustrative imagery"
        stats={[
          { value: "17 yrs", label: "since Purview started in Edinburgh" },
          { value: FACTS.people.value, label: FACTS.people.label },
          { value: FACTS.countries.value, label: FACTS.countries.label },
          { value: FACTS.companies.value, label: FACTS.companies.label },
        ]}
      />

      <Section tone="paper" labelledBy="c-story">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading index="01" eyebrow="Our story" title="Say yes only to work we can be proud of, then finish it." id="c-story" />
          </div>
          <div className="space-y-6 lg:col-span-7 lg:pt-14">
            <p className="t-lead text-fg/85" data-reveal>
              Purview started in Edinburgh over seventeen years ago as an IT services firm with that one rule. It earned long relationships with some of the world’s largest banks, carriers and governments, and those relationships pulled the group into AI, payments, healthcare, networks and, most recently, the data centres that AI runs in.
            </p>
            <p className="text-muted" data-reveal>
              Today the group builds the intelligent applications enterprises and governments run their business on, and the AI infrastructure those applications run on. Most technology companies do one or the other. Purview does both: one technology partner, from application to infrastructure.
            </p>
            <blockquote className="border-l-2 border-accent-ink pl-6" data-reveal>
              <p className="t-h3">“A Purview engagement starts with a problem nobody has solved cleanly and ends with something installed, certified and operating at your site.”</p>
              <footer className="mt-3 text-sm text-muted">Purview Group</footer>
            </blockquote>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="c-lead">
        <Heading index="02" eyebrow="Leadership" title="Focused team, big results." lead="Senior leadership is involved from kick-off to handover on every engagement. These are the people accountable for the group’s six verticals and fourteen companies." id="c-lead" />
        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {LEADERS.map(([n, t, img], i) => (
            <li key={n} data-reveal style={{ "--d": `${(i % 6) * 50}ms` } as React.CSSProperties}>
              <div className="relative aspect-square overflow-hidden rounded-[var(--radius-m)] bg-mist">
                <Image src={`/team/${img}.jpg`} alt={n} fill sizes="(min-width:1280px) 15vw, (min-width:640px) 30vw, 45vw" className="object-cover grayscale transition duration-500 hover:grayscale-0" />
              </div>
              <p className="mt-4 font-bold">{n}</p>
              <p className="mt-1 text-sm leading-snug text-muted">{t}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="ink" labelledBy="c-cert">
        <Heading index="03" eyebrow="Certifications" title="Appraised, audited and accredited." dark id="c-cert" />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-sky/15 bg-sky/15 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATIONS.map((c) => (
            <li key={c.name} className="bg-ink p-7">
              <p className="text-xl font-bold">{c.name}</p>
              <p className="mt-2 text-on-dark-muted">{c.detail}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-8">
          <TextLink href="/trust" className="text-on-dark">
            Trust, security & compliance
          </TextLink>
          <TextLink href="/carbon-reduction-plan" className="text-on-dark">
            Carbon Reduction Plan
          </TextLink>
        </div>
      </Section>

      <Section tone="paper" labelledBy="c-foot">
        <Heading index="04" eyebrow="Global footprint" title="Delivery centres in five countries. 21 countries, one standard." lead="Delivery centres in the UK, Poland, Singapore, Australia and India. Engineers deployed wherever the floor is." id="c-foot" />
        <dl className="mt-12 grid gap-x-10 border-t border-fg/80 md:grid-cols-2 lg:grid-cols-3">
          {FOOTPRINT.map(([r, c]) => (
            <div key={r} className="border-b border-line py-5">
              <dt className="font-bold">{r}</dt>
              <dd className="mt-1 text-muted">{c}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8">
          <TextLink href="/locations" className="text-fg">
            Explore our locations
          </TextLink>
        </div>
        <StatRow className="mt-16" items={[{ value: "8", label: "delivery centres in five countries" }, { value: "24", label: "cities where you can reach a Purview team" }, { value: "21", label: "countries with Purview entities" }]} />
      </Section>

      <Section tone="surface" id="partners" labelledBy="c-partners">
        <Heading index="05" eyebrow="Technology partners" title="Platform-flexible by design." lead="We are not a reseller of one stack. We certify on the platforms our clients already run and the ones they are moving to." id="c-partners" />
        <div className="mt-14 space-y-12">
          {PARTNER_GROUPS.map((g) => (
            <div key={g.title} className="grid gap-6 lg:grid-cols-12">
              <h3 className="t-eyebrow text-muted lg:col-span-3">{g.title}</h3>
              <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-m)] border border-line bg-line sm:grid-cols-4 lg:col-span-9 lg:grid-cols-6">
                {g.logos.map((n) => (
                  <li key={n} className="logo-cell grid h-20 place-items-center bg-surface px-3">
                    <LogoMark name={n} height={26} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <ContactCTA eyebrow="Talk to us" title="Bring us a problem statement." body="Tell us the decision that has to be made, how fast, under what constraints and at what cost. We will come back with the team that can own it." prompt={null} primary={{ label: "Contact Purview", href: "/contact" }} secondary={{ label: "See open roles", href: "/careers" }} />
    </>
  );
}
