import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Choreo } from "@/components/home/motion/Choreo";
import { FINAL_CTA } from "@/content/home";
import { LetsTalkForm } from "./LetsTalkForm";

type Article = { href: string; title: string; category: string; date: string | null; external?: boolean; note?: string };

/**
 * Closing experience — insights + CTA copy from purviewservices.com/index.html.
 */
export function FinalCta({ articles }: { articles: Article[] }) {
  return (
    <Choreo scene="finalCta" className="on-dark relative bg-abyss" labelledBy="final-title">
      {/* insights strip */}
      <div className="wrap-wide border-b border-sky/15 py-[clamp(3.5rem,7vw,5.5rem)]" aria-labelledby="insights-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="t-eyebrow text-sky">Insights</p>
            <h2 id="insights-title" className="mt-3 text-[clamp(1.7rem,1.2rem+1.4vw,2.4rem)] font-extrabold tracking-[-0.03em]">
              Latest from the group
            </h2>
          </div>
          <Link href="/insights" className="text-sm font-bold text-on-dark hover:underline hover:underline-offset-4">
            All insights
          </Link>
        </div>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {articles.map((a) => (
            <li key={a.href} className="border-t border-sky/15 pt-5">
              <p className="t-mono text-[0.7rem] text-on-dark-muted">
                {a.category.toUpperCase()}
                {a.date ? ` · ${a.date}` : ""}
                {a.note ? ` · ${a.note}` : ""}
              </p>
              {a.external ? (
                <a href={a.href} target="_blank" rel="noopener" className="mt-2 flex items-start gap-2 text-lg leading-snug font-bold hover:text-accent">
                  {a.title}
                  <ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0" />
                  <span className="sr-only">(opens external site)</span>
                </a>
              ) : (
                <Link href={a.href} className="mt-2 block text-lg leading-snug font-bold hover:text-accent">
                  {a.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/*
        Closing enquiry — layout adapted from Revelatio's contact page (Details f195c308483944bc8a7aaa9bf52283d6):
        a sticky statement column beside an editorial form with underlined fields and chip choices.
      */}
      <div data-cta className="lt">
        <span data-lt-rule className="lt-rule" aria-hidden />
        <div className="lt-grid wrap-wide">
          <div className="lt-statement">
            <div className="lt-sticky">
              <h2 id="final-title" className="lt-title">
                <span className="lt-mask">
                  <span data-lt-line>Bring us the problem.</span>
                </span>
                <span className="lt-mask lt-accent">
                  <span data-lt-line>We will bring the applications and the infrastructure.</span>
                </span>
              </h2>
              <p data-lt-fade className="lt-lead">
                {FINAL_CTA.body}
              </p>
              {/* direct routes: the same inboxes the form addresses */}
              <dl data-lt-fade className="lt-direct">
                <div>
                  <dt>Applications, managed services and workforce</dt>
                  <dd>
                    <a href="mailto:contact@purviewservices.com">contact@purviewservices.com</a>
                  </dd>
                </div>
                <div>
                  <dt>Data centres and GPU deployment</dt>
                  <dd>
                    <a href="mailto:contact@purviewdc.com">contact@purviewdc.com</a>
                  </dd>
                </div>
              </dl>
              <Link data-lt-fade href="/contact" className="lt-offices">
                Offices and contacts worldwide <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>

          <div data-lt-panel className="lt-panel" aria-labelledby="lt-form-title">
            <div className="lt-panel-head">
              <h3 id="lt-form-title" className="lt-panel-title">
                Let’s talk
              </h3>
              <p className="lt-panel-sub">One conversation, routed to the team that can own it.</p>
            </div>
            <LetsTalkForm />
          </div>
        </div>
      </div>
    </Choreo>
  );
}
