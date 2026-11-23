import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CASES } from "@/content/home";
import { TextLink } from "@/components/ui/Button";
import { Choreo } from "@/components/home/motion/Choreo";

/**
 * 06 · Proven outcomes. Full-width editorial panels that stack (CSS sticky),
 * each stepping back as the next arrives (GSAP scrub). Cases are the
 * homepage's published "Outcomes, not effort"; names withheld under NDA.
 */
export function Outcomes() {
  return (
    <Choreo scene="outcomes" desktopOnly className="relative bg-paper pb-[clamp(5rem,10vw,9rem)]" labelledBy="out-title">
      <div className="wrap-wide">
        <div className="grid gap-8 border-t border-line pt-[clamp(4rem,8vw,7rem)] lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-line" aria-hidden />
              <span className="t-eyebrow text-accent-strong">Featured work</span>
            </div>
            <h2 id="out-title" className="mt-6 max-w-[15ch] text-[clamp(2.1rem,1.3rem+3vw,4.25rem)] leading-[1] font-extrabold tracking-[-0.035em] balance">
              Outcomes, not effort
            </h2>
          </div>
          <p className="t-lead text-muted lg:col-span-5 pretty">
            Agents, platforms, payments and GPU floors for banks, governments and carriers. Client names withheld where engagements are under NDA.
          </p>
        </div>

        <ol className="mt-14 space-y-6 lg:space-y-[10vh]">
          {CASES.map((c, i) => (
            <li key={c.id} data-case className="lg:sticky" style={{ top: `calc(96px + ${i * 14}px)` }}>
              <article data-inner className="on-dark grid origin-top overflow-hidden rounded-[18px] bg-ink shadow-[0_40px_80px_-40px_rgba(6,13,38,.6)] lg:min-h-[min(70vh,620px)] lg:grid-cols-12" aria-labelledby={`oc-${c.id}`}>
                <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto">
                  <div data-photo className="absolute inset-0 will-change-transform">
                    <Image src={c.image} alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink" />
                  {c.result ? (
                    <p className="absolute bottom-6 left-6 text-[clamp(3rem,2rem+4.5vw,7rem)] leading-none font-extrabold tracking-[-0.05em] text-accent">{c.resultValue}</p>
                  ) : null}
                  <p className="t-mono absolute top-4 left-4 rounded bg-abyss/70 px-2 py-1 text-[0.6rem] text-on-dark-muted">Illustrative imagery</p>
                </div>
                <div className="flex flex-col p-7 sm:p-10 lg:col-span-5">
                  <p className="t-mono text-xs text-on-dark-muted">
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> · {c.link.label}
                  </p>
                  <p className="t-eyebrow mt-8 text-sky">{c.client}</p>
                  <p className="mt-1 text-sm text-on-dark-muted">{c.capability}</p>
                  <h3 id={`oc-${c.id}`} className="mt-3 text-[clamp(1.6rem,1.1rem+1.4vw,2.5rem)] leading-[1.08] font-extrabold tracking-[-0.03em]">
                    {c.title}
                  </h3>
                  <p className="mt-5 text-on-dark-muted">{c.engagement}</p>
                  {c.result ? <p className="mt-5 border-l-2 border-accent pl-4 text-lg font-semibold">{c.result}</p> : null}
                  <Link href={c.link.href} className="group mt-auto flex items-center justify-between gap-4 border-t border-sky/15 pt-6 font-bold">
                    <span>{c.link.label}</span>
                    <span className="grid size-10 place-items-center rounded-full border border-sky/30 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-[#1a0d04]">
                      <ArrowUpRight aria-hidden className="size-4" />
                    </span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap gap-8">
          <TextLink href="/our-work" className="text-fg">
            Explore our work
          </TextLink>
          <TextLink href="/contact" className="text-fg">
            Request a confidential capability briefing
          </TextLink>
        </div>
      </div>
    </Choreo>
  );
}
