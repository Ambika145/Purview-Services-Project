import Image from "next/image";
import { Button, TextLink } from "@/components/ui/Button";
import { Choreo } from "@/components/home/motion/Choreo";
import { INVESTING } from "@/content/home";

/** One photograph per published capability (illustrative imagery, /public/img). */
const SHOTS = [
  { src: "/img/dc-invest-hall.jpg", alt: "Illustrative AI data hall with rows of illuminated racks" },
  { src: "/img/dc-invest-cabling.jpg", alt: "Illustrative data centre aisle with structured cabling above the racks" },
  { src: "/img/dc-invest-systems.jpg", alt: "Illustrative systems view of monitoring and test dashboards" },
  { src: "/img/dc-invest-network.jpg", alt: "Illustrative city view of connected sites under operational monitoring" },
] as const;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "Where we are investing hardest" — copy matches purviewservices.com/index.html.
 *
 * Desktop: a tall section with a sticky split stage. Scroll progress picks
 * the active capability; its row expands on the left while the right-hand
 * photograph shutters to match, under fixed circular line-work. Leaving the
 * section softly blurs the stage. Below 1024px it is a stacked sequence.
 */
export function DataCentreFeature() {
  const n = INVESTING.points.length;
  return (
    <Choreo scene="dataCentre" eager className="dcx on-dark relative bg-abyss" labelledBy="dc-title">
      <div data-dcx-scroll className="dcx-scroll" style={{ "--dcx-n": n } as React.CSSProperties}>
        <div data-dcx-stage data-pin className="dcx-stage">
          {/* ambient: blurred copy of the active photograph behind the copy column */}
          <div className="dcx-ambient" aria-hidden>
            {SHOTS.map((s, i) => (
              <span key={s.src} data-dcx-amb={i} className={i === 0 ? "is-on" : ""}>
                <Image src={s.src} alt="" fill sizes="40vw" className="object-cover" />
              </span>
            ))}
          </div>

          <div className="dcx-grid wrap-wide">
            {/* Copy column */}
            <div className="dcx-copy">
              <div>
                <p data-dcx-in className="flex items-center gap-4">
                  <span className="h-px w-10 bg-accent" aria-hidden />
                  <span className="t-eyebrow text-sky">Purview DC</span>
                </p>
                <h2 id="dc-title" data-dcx-in className="dcx-h2">
                  {INVESTING.title}
                </h2>
                <p data-dcx-in className="dcx-body">
                  {INVESTING.body}
                </p>
              </div>

              <ol data-dcx-list className="dcx-list">
                {INVESTING.points.map((p, i) => (
                  <li key={p} data-dcx-row={i} className={`dcx-row ${i === 0 ? "is-on" : ""}`}>
                    <span className="dcx-row-rule" aria-hidden />
                    <span className="dcx-row-no t-mono">{pad(i + 1)}</span>
                    <span className="dcx-row-text">{p}</span>
                    <span className="dcx-row-media" aria-hidden>
                      <Image src={SHOTS[i]!.src} alt="" fill sizes="92vw" className="object-cover" />
                    </span>
                  </li>
                ))}
              </ol>
              <p className="t-mono text-[0.62rem] text-on-dark-muted lg:hidden">Illustrative imagery</p>

              <div data-dcx-in className="dcx-ctas">
                <Button href={INVESTING.primaryCta.href}>{INVESTING.primaryCta.label}</Button>
                <TextLink href={INVESTING.secondaryCta.href} className="text-on-dark">
                  {INVESTING.secondaryCta.label}
                </TextLink>
              </div>
            </div>

            {/* Image stage (desktop) */}
            <figure data-dcx-fig className="dcx-fig" aria-hidden>
              <div className="dcx-frame">
                {SHOTS.map((s, i) => (
                  <div key={s.src} data-dcx-shot={i} className={`dcx-shot ${i === 0 ? "is-on" : "is-after"}`}>
                    <Image src={s.src} alt="" fill sizes="50vw" className="object-cover" />
                  </div>
                ))}
                <span className="dcx-shade" />
              </div>

              {/* circular line-work */}
              <svg data-dcx-hud className="dcx-hud" viewBox="0 0 600 600" fill="none">
                <g className="dcx-hud-a">
                  <circle cx="300" cy="300" r="250" />
                  {[0, 90, 180, 270].map((a) => (
                    <g key={a} transform={`rotate(${a} 300 300)`}>
                      <path d="M300 44v12M294 50h12" className="dcx-tick" />
                    </g>
                  ))}
                </g>
                <g className="dcx-hud-b">
                  <circle cx="300" cy="300" r="170" />
                  {[45, 135, 225, 315].map((a) => (
                    <g key={a} transform={`rotate(${a} 300 300)`}>
                      <path d="M300 124v12M294 130h12" className="dcx-tick" />
                    </g>
                  ))}
                </g>
              </svg>

              <figcaption className="dcx-cap">
                <span className="dcx-cap-no t-mono">
                  <span className="dcx-roll">
                    {INVESTING.points.map((_, i) => (
                      <span key={i}>{pad(i + 1)}</span>
                    ))}
                  </span>
                  <span>/ {pad(n)}</span>
                </span>
                <span className="dcx-meter">
                  <span className="dcx-meter-fill" />
                </span>
                <span className="t-mono text-[0.62rem] text-on-dark-muted">Illustrative imagery</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </Choreo>
  );
}
