import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "@/content/home";
import { PageHero } from "@/components/sections/PageKit";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { LogoMark } from "@/components/ui/LogoMark";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description: "Each sector is served by a focused Purview company led by people from that market. When a problem crosses domains, those teams become one delivery organisation with one accountable owner.",
  path: "/industries",
});

// Client lists as published on purviewservices.com/industries.html
const CLIENTS: Record<string, string[]> = {
  bfsi: ["HSBC", "SBI", "IDFC FIRST Bank", "UBS", "Al Masraf", "Khan Bank", "FAB", "JPMorgan Chase", "AIG", "FIS", "Prudential", "Bank of India", "Northern Trust", "Fidelity", "Metro Bank"],
  gov: ["Government of Telangana", "NMDC", "ONGC", "Government of Andhra Pradesh", "Government of Bihar", "High Commission of India, London", "Métis Nation British Columbia"],
  health: ["NHS", "AIIMS"],
  telecom: ["AT&T", "Nokia", "Verizon", "T-Mobile", "Comcast", "Virgin Media", "World Wide Technology", "HPE", "Oracle", "Wipro", "Capgemini", "Cognizant", "Accenture", "Deloitte", "EY", "PwC", "SThree", "Park Place Technologies", "TÜV India", "Onch & Company"],
  mfg: ["Ford", "DuPont", "Aggreko", "AAJ", "Allied Vehicles", "Nilfisk", "William Grant & Sons", "Cremica", "Valvoline", "Ajinomoto", "Bata", "Vahdam Teas", "Rasasi", "JK Paper", "Indofil", "MCPI", "Hyundai Mobis", "Hyundai Kefico", "JLL", "CapitaLand", "Engie", "Ambuja Cement", "Captain Fresh", "BidAir Cargo"],
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        eyebrow="Industries"
        title="Regulated, national-scale and unforgiving. That is where we work."
        lede="Each sector is served by a focused Purview company led by people from that market. When a problem crosses domains, those teams become one delivery organisation with one accountable owner."
        image="/img/industries-feature.jpg"
      />
      <div className="bg-paper">
        {INDUSTRIES.map((ind, i) => (
          <section key={ind.id} className="border-b border-line py-[clamp(3rem,6vw,5rem)]" aria-labelledby={`ind-${ind.id}`}>
            <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className={`relative aspect-[16/10] overflow-hidden rounded-[var(--radius-m)] lg:col-span-5 ${i % 2 ? "lg:order-2" : ""}`} data-reveal>
                <Image src={ind.image} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
                <p className="t-mono absolute right-2 bottom-2 rounded bg-abyss/70 px-1.5 py-0.5 text-[0.6rem] text-on-dark">Illustrative</p>
              </div>
              <div className="lg:col-span-7">
                <p className="t-mono text-xs text-accent-strong">{String(i + 1).padStart(2, "0")}</p>
                <h2 id={`ind-${ind.id}`} className="mt-2 text-[clamp(1.8rem,1.2rem+1.8vw,2.8rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
                  {ind.name}
                </h2>
                <p className="t-lead mt-4 max-w-[52ch] text-muted">{ind.body}</p>
                {(CLIENTS[ind.id] ?? ind.clients).length > 0 && (
                  <ul className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4" aria-label={`${ind.name} clients`}>
                    {(CLIENTS[ind.id] ?? ind.clients).slice(0, 12).map((n) => (
                      <li key={n} className="logo-cell">
                        <LogoMark name={n} height={24} />
                      </li>
                    ))}
                  </ul>
                )}
                <Link href={ind.href} className="link-arrow mt-7 text-fg">
                  {ind.name} <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
      <ContactCTA />
    </>
  );
}
