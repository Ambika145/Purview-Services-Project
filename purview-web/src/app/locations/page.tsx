import type { Metadata } from "next";
import Image from "next/image";
import { CONTACT } from "@/content/site";
import { PageHero, Section, Heading } from "@/components/sections/PageKit";
import { GlobalPresence } from "@/components/home/GlobalPresence";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Locations",
  description: "Purview Group entities in 21 countries, with delivery centres in Hyderabad, Pune, Bengaluru, Chennai, Edinburgh, Warsaw, Singapore and Sydney, and engineers deployed wherever the floor is.",
  path: "/locations",
});

// purviewservices.com/locations.html (city imagery is illustrative; it does not depict Purview premises)
const CITIES = [
  { city: "Edinburgh", role: "Scotland · Global headquarters", img: "/img/loc-edinburgh.jpg" },
  { city: "Hyderabad", role: "India · Operations headquarters", img: "/img/loc-hyderabad.jpg" },
  { city: "Bengaluru", role: "India · Delivery", img: "/img/loc-bengaluru.jpg" },
  { city: "Pune", role: "India · Delivery", img: "/img/loc-pune.jpg" },
  { city: "Poland", role: "Europe · Delivery", img: "/img/loc-warsaw.jpg" },
  { city: "Singapore", role: "Asia-Pacific", img: "/img/loc-singapore.jpg" },
];

export default function LocationsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "Locations" }]}
        eyebrow="Our global footprint"
        title="Where to find us."
        lede="Purview Group entities in 21 countries, with delivery centres in Hyderabad, Pune, Bengaluru, Chennai, Edinburgh, Warsaw, Singapore and Sydney, and engineers deployed wherever the floor is. Founded in Scotland, headquartered in Edinburgh."
      />
      <GlobalPresence />
      <Section tone="paper" labelledBy="loc-cities">
        <Heading eyebrow="Local presence. Connected delivery." title="Major operating and delivery locations." lead="City imagery is illustrative; it does not depict Purview premises." id="loc-cities" />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((c) => (
            <li key={c.city} className="group relative overflow-hidden rounded-[var(--radius-m)] bg-ink" data-reveal>
              <div className="relative aspect-[4/3]">
                <Image src={c.img} alt="" fill sizes="(min-width:1024px) 30vw, 50vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 to-transparent" />
              </div>
              <div className="absolute bottom-0 p-5 text-on-dark">
                <p className="text-2xl font-extrabold">{c.city}</p>
                <p className="t-mono mt-1 text-[0.7rem] text-on-dark-muted">{c.role}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {CONTACT.offices.map((o) => (
            <address key={o.id} className="rounded-[var(--radius-m)] border border-line bg-surface p-6 not-italic">
              <p className="t-eyebrow text-accent-strong">{o.label}</p>
              <p className="mt-3">
                {o.address.map((a) => (
                  <span key={a} className="block">
                    {a}
                  </span>
                ))}
              </p>
              <p className="mt-3 text-sm">
                {o.phone && <span className="mr-3 font-bold">{o.phone}</span>}
                <a href={`mailto:${o.email}`} className="font-bold hover:underline">
                  {o.email}
                </a>
              </p>
            </address>
          ))}
        </div>
      </Section>
      <ContactCTA eyebrow="Careers" title="If you are ambitious, curious and dedicated, there is a Purview team near you." body="Engineers who want to see their work installed, certified and running, in any of these cities." prompt={null} primary={{ label: "See open roles", href: "/careers" }} secondary={{ label: "Contact Purview", href: "/contact" }} />
    </>
  );
}
