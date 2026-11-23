import type { Metadata } from "next";
import { CONTACT } from "@/content/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/sections/ContactForm";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: "Tell us the decision that has to be made, how fast, under what constraints and at what cost. We will come back with the team that can own it.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="on-dark relative overflow-hidden bg-abyss" aria-labelledby="page-title">
        <div className="blueprint absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <div className="wrap relative pt-36 pb-16 sm:pt-40">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <h1 id="page-title" className="t-h1 mt-10 max-w-[16ch] balance">
            Bring us a problem statement.
          </h1>
          <p className="t-lead mt-7 max-w-[44rem] text-on-dark-muted">Tell us the decision that has to be made, how fast, under what constraints and at what cost. We will come back with the team that can own it.</p>
        </div>
      </section>
      <section className="bg-paper py-[clamp(3.5rem,7vw,6rem)]">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="t-h3">Send an enquiry</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
          <aside className="space-y-4 lg:col-span-5" aria-label="Offices">
            {CONTACT.offices.map((o) => (
              <address key={o.id} className="rounded-[var(--radius-m)] border border-line bg-surface p-6 not-italic">
                <p className="t-eyebrow text-accent-strong">{o.label}</p>
                <p className="mt-1 text-sm text-muted">{o.region}</p>
                <p className="mt-4">
                  {o.address.map((a) => (
                    <span key={a} className="block">
                      {a}
                    </span>
                  ))}
                </p>
                <p className="mt-4 flex flex-col gap-1 text-sm">
                  {o.phone && (
                    <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="font-bold hover:underline">
                      {o.phone}
                    </a>
                  )}
                  <a href={`mailto:${o.email}`} className="font-bold hover:underline">
                    {o.email}
                  </a>
                </p>
              </address>
            ))}
            <div className="on-dark rounded-[var(--radius-m)] bg-ink p-6">
              <p className="t-eyebrow text-sky">Data centres · Purview DC</p>
              <p className="mt-3">For GPU floors, modular DCs and operations, go direct to purviewdc.com.</p>
              <Button href={CONTACT.purviewDc.url} className="mt-5">
                Visit purviewdc.com
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
