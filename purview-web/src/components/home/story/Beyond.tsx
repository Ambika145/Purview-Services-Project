import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BEYOND } from "@/content/home";
import { Choreo } from "@/components/home/motion/Choreo";

/** Photography already in /public/img, matched to each destination page. */
const SHOTS: Record<string, string> = {
  "/our-work": "/img/customer-success-hero.jpg",
  "/innovation": "/img/innovation-hero.jpg",
  "/global-delivery": "/img/global-delivery-hero.jpg",
  "/trust": "/img/audits.jpg",
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Beyond capabilities: an engineering dossier. Four oversized titles are read
 * one at a time; the active one fills with ink while a sticky aperture on the
 * right shutters to its photograph. Below 1024px each entry carries its own
 * image and the sticky aperture is not rendered.
 */
export function Beyond() {
  const total = pad(BEYOND.length);
  const headline = "Explore what makes Purview different.".split(" ");

  return (
    <Choreo
      scene="beyond"
      className="by on-dark relative isolate overflow-clip"
      labelledBy="beyond-title"
    >
      <div className="by-columns wrap-wide" aria-hidden>
        <span data-by-col />
        <span data-by-col />
        <span data-by-col />
        <span data-by-col />
        <span data-by-col />
      </div>

      <div className="wrap-wide relative pt-[clamp(5rem,11vw,9.5rem)]">
        {/* Header: asymmetric — title hangs left, lead drops to the right */}
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <p data-by-eyebrow className="by-eyebrow">
              <span className="by-reg" aria-hidden />
              <span className="t-eyebrow text-sky">Beyond capabilities</span>
              <span className="t-mono text-[0.68rem] text-on-dark-muted">
                {total} paths
              </span>
            </p>
            <h2 id="beyond-title" className="by-h2 mt-8">
              {headline.map((w, i) => (
                <Fragment key={i}>
                  <span className="by-word-mask">
                    <span
                      data-by-word
                      className={`by-word ${i === headline.length - 1 ? "by-word-last" : ""}`}
                    >
                      {w}
                    </span>
                  </span>{" "}
                </Fragment>
              ))}
            </h2>
          </div>
          <p
            data-by-lead
            className="by-lead t-lead text-on-dark-muted pretty lg:col-span-3 lg:col-start-10"
          >
            Real engineering depth, global delivery, proprietary platforms and
            customer outcomes.
          </p>
        </div>

        {/* Dossier */}
        <div className="mt-[clamp(4rem,9vw,7rem)] grid lg:grid-cols-12 lg:gap-12">
          <ol data-by-list className="lg:col-span-7">
            {BEYOND.map((item, i) => (
              <li
                key={item.href}
                data-by-row={i}
                className={`by-row ${i === 0 ? "is-active" : ""}`}
              >
                <span className="by-row-rule" aria-hidden />
                <div className="by-row-meta">
                  <span className="t-mono">{pad(i + 1)}</span>
                  <span className="by-row-tick" aria-hidden />
                </div>
                <h3 className="by-title">
                  <span className="by-title-ink">{item.title}</span>
                </h3>
                <div className="by-shot-inline lg:hidden" aria-hidden>
                  <Image
                    src={SHOTS[item.href]}
                    alt=""
                    fill
                    sizes="92vw"
                    className="object-cover"
                  />
                </div>
                <div className="by-copy">
                  <p className="by-body">{item.body}</p>
                  <Link href={item.href} className="by-cta">
                    {item.cta}
                    <ArrowUpRight aria-hidden className="size-4" />
                  </Link>
                </div>
              </li>
            ))}
          </ol>

          {/* Sticky aperture (desktop) */}
          <div className="hidden lg:col-span-5 lg:block" aria-hidden>
            <figure data-by-fig className="by-fig">
              <div className="by-frame">
                {BEYOND.map((item, i) => (
                  <div
                    key={item.href}
                    data-by-shot={i}
                    className={`by-shot ${i === 0 ? "is-active" : "is-after"}`}
                  >
                    <Image
                      src={SHOTS[item.href]}
                      alt=""
                      fill
                      sizes="36vw"
                      className="object-cover"
                    />
                  </div>
                ))}
                <span className="by-crop by-crop-tl" />
                <span className="by-crop by-crop-tr" />
                <span className="by-crop by-crop-bl" />
                <span className="by-crop by-crop-br" />
              </div>
              <figcaption className="by-cap">
                <span className="by-count t-mono">
                  <span className="by-count-roll" data-by-roll>
                    {BEYOND.map((_, i) => (
                      <span key={i}>{pad(i + 1)}</span>
                    ))}
                  </span>
                  <span className="text-on-dark-muted">/ {total}</span>
                </span>
                <span className="by-ticks">
                  {BEYOND.map((_, i) => (
                    <span
                      key={i}
                      data-by-tick={i}
                      className={i === 0 ? "is-on" : ""}
                    />
                  ))}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <div className="h-[clamp(4rem,9vw,7rem)]" aria-hidden />
    </Choreo>
  );
}
