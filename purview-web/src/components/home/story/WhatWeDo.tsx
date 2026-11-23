import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WHAT_WE_DO } from "@/content/home";
import { Choreo } from "@/components/home/motion/Choreo";

/**
 * What we do. Five service lines — names and bodies match
 * purviewservices.com/index.html. Layout/animation are local.
 *
 * Desktop: five "doors" share one sticky stage. Scrolling opens them in
 * turn; the open door shows its photographs, copy and link, the others
 * keep a vertical title. Below 1024px the doors become a stacked sequence.
 */
const CARD_IMAGES: Record<string, { src: string; alt: string }[]> = {
  "/ai-solutions": [
    { src: "/img/insights-hero.jpg", alt: "" },
    { src: "/img/edge-vision.jpg", alt: "" },
    { src: "/img/helpdesk.jpg", alt: "" },
  ],
  "/products": [
    { src: "/img/dc-dcd-digital-twin.jpg", alt: "Data Center Deployer: rack inventory and live 3D hall view" },
    { src: "/img/home-ai-platforms.jpg", alt: "" },
    { src: "/img/payments.jpg", alt: "" },
  ],
  "/data-centre": [
    { src: "/img/dc-receiving-staging.jpg", alt: "Receiving and staging at Purview DC" },
    { src: "/img/dc-corridor-blue.jpg", alt: "" },
    { src: "/img/dc-campus-city.jpg", alt: "" },
  ],
  "/managed": [
    { src: "/img/infra-managed.jpg", alt: "" },
    { src: "/img/security-managed.jpg", alt: "" },
    { src: "/img/it-support.jpg", alt: "" },
  ],
  "/workforce": [
    { src: "/img/rtd.jpg", alt: "" },
    { src: "/img/volume-recruitment.jpg", alt: "" },
    { src: "/img/offshore.jpg", alt: "" },
  ],
};

const pad = (n: number) => String(n).padStart(2, "0");

export function WhatWeDo() {
  const total = pad(WHAT_WE_DO.length);

  return (
    <Choreo scene="whatWeDo" eager id="what-we-do" className="wwd relative scroll-mt-24 bg-paper" labelledBy="what-title">
      <div data-wwd-scroll className="wwd-scroll" style={{ "--wwd-n": WHAT_WE_DO.length } as React.CSSProperties}>
        <div className="wwd-stage">
          {/* Masthead */}
          <header className="wwd-head wrap-wide">
            <div>
              <p data-wwd-eyebrow className="flex items-center gap-4">
                <span className="wwd-eyebrow-rule" aria-hidden />
                <span className="t-eyebrow text-navy">What we do</span>
              </p>
              <h2 id="what-title" className="wwd-h2">
                <span className="wwd-h2-mask">
                  <span data-wwd-h2>What we do</span>
                </span>
              </h2>
            </div>
            <div data-wwd-meter className="wwd-meter" aria-hidden>
              <span className="wwd-count t-mono">
                <span className="wwd-count-roll">
                  {WHAT_WE_DO.map((_, i) => (
                    <span key={i}>{pad(i + 1)}</span>
                  ))}
                </span>
                <span className="text-muted">/ {total}</span>
              </span>
              <span className="wwd-track">
                <span className="wwd-track-fill" />
                {WHAT_WE_DO.map((_, i) => (
                  <span key={i} className="wwd-node" style={{ left: `${(i / (WHAT_WE_DO.length - 1)) * 100}%` }} />
                ))}
              </span>
            </div>
          </header>

          {/* Doors */}
          <ol data-wwd-doors className="wwd-doors wrap-wide">
            {WHAT_WE_DO.map((s, i) => {
              const [main, a, b] = CARD_IMAGES[s.href] ?? [];
              return (
                <li key={s.href} data-wwd-door={i} className={`wwd-door ${i === 0 ? "is-open" : ""}`}>
                  <div className="wwd-media">
                    {main && <Image src={main.src} alt={main.alt} fill sizes="(min-width: 1024px) 62vw, 100vw" className="wwd-main object-cover" />}
                    <span className="wwd-veil" aria-hidden />
                    {a && (
                      <span className="wwd-inset wwd-inset-a">
                        <Image src={a.src} alt={a.alt} fill sizes="(min-width: 1024px) 18vw, 34vw" className="object-cover" />
                      </span>
                    )}
                    {b && (
                      <span className="wwd-inset wwd-inset-b">
                        <Image src={b.src} alt={b.alt} fill sizes="(min-width: 1024px) 14vw, 28vw" className="object-cover" />
                      </span>
                    )}
                  </div>

                  {/* closed state: vertical spine */}
                  <button type="button" data-wwd-open={i} className="wwd-spine" tabIndex={-1} aria-hidden>
                    <span className="t-mono wwd-spine-no">{pad(i + 1)}</span>
                    <span className="wwd-spine-name">{s.name}</span>
                    <span className="wwd-spine-plus" />
                  </button>

                  {/* open state: copy */}
                  <div className="wwd-copy">
                    <span className="wwd-copy-no t-mono">
                      <span className="wwd-copy-rule" aria-hidden /> {pad(i + 1)} / {total}
                    </span>
                    <h3 id={`wwd-${i}`} className="wwd-name">
                      {s.name}
                    </h3>
                    <p className="wwd-body">{s.body}</p>
                    <Link href={s.href} className="wwd-cta">
                      Explore {s.name}
                      <ArrowUpRight aria-hidden className="size-4" />
                    </Link>
                  </div>
                  <span className="wwd-bar" aria-hidden />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Choreo>
  );
}
