import { CERTIFICATIONS } from "@/content/site";
import { Choreo } from "@/components/home/motion/Choreo";
import { WorldOrb } from "./WorldOrb";

/** Figures as published on purviewservices.com (company.html, index.html). */
const METRICS = [
  { to: 17, pre: "", unit: "years", label: "of delivery since Purview was founded in Edinburgh" },
  { to: 2500, pre: "", unit: "professionals", label: "across the group, in 14 focused companies" },
  { to: 21, pre: "", unit: "countries", label: "with Purview entities, and delivery centres in five" },
  { to: 500, pre: "~", unit: "MW", label: "of AI infrastructure capacity delivered" },
];

/** Delivery centres and HQs from purviewservices.com/locations.html + contact.html */
const CITIES = ["Edinburgh", "Hyderabad", "Warsaw", "Singapore", "Sydney", "Pune", "Bengaluru", "Chennai", "Dallas"];

/**
 * 02 · Our world in motion.
 * Brand-story block — same published copy. Layout/motion adapted from Details
 * refs: Ethnocare (dark split + cyan contour object), Optikka (abstract object
 * presence), Radian (oversized editorial type + asymmetric visual stage).
 */
export function WorldInMotion() {
  return (
    <Choreo scene="world" id="world" className="world-section on-dark relative overflow-hidden bg-abyss" labelledBy="world-title">
      <div className="world-bg" aria-hidden>
        <div className="world-bg-grid" />
        <div className="world-bg-glow world-bg-glow-a" />
        <div className="world-bg-glow world-bg-glow-b" />
        <div className="world-bg-vignette" />
      </div>

      <div className="wrap-wide relative pt-[clamp(5.5rem,11vw,9.5rem)] pb-[clamp(1rem,2vw,2rem)]">
        {/* Radian-inspired asymmetric split: oversized type left, visual stage right */}
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <div className="relative z-[1] lg:col-span-5 xl:col-span-5">
            <div data-world-kicker className="world-kicker flex items-center gap-4">
              <span className="t-eyebrow text-on-dark-muted">02</span>
              <span className="world-kicker-rule" aria-hidden />
              <span className="t-eyebrow world-accent-cyan">Our world in motion</span>
            </div>

            <h2 id="world-title" className="world-heading mt-9 max-w-[13ch] text-[clamp(2.4rem,1.2rem+3.6vw,4.5rem)] leading-[1.0] font-extrabold tracking-[-0.038em] text-on-dark">
              <span data-world-line className="block overflow-hidden pb-[0.1em]">
                <span className="block">Founded in Scotland.</span>
              </span>
              <span data-world-line className="mt-1.5 block overflow-hidden pb-[0.1em]">
                <span className="block world-accent-cyan">Built for the AI era.</span>
              </span>
            </h2>

            {/* Ethnocare-like body opacity for calm premium hierarchy */}
            <p data-world-lead className="t-lead mt-9 max-w-[38ch] text-on-dark-muted/90 pretty">
              Purview started in Edinburgh as an IT services firm with one rule: say yes only to work we can be proud of, then finish it. Long relationships with banks, carriers and governments pulled the group into AI, payments, networks and the data centres AI runs in.
            </p>
          </div>

          <div data-world-visual className="world-visual relative flex items-center justify-center lg:col-span-7 xl:col-span-7">
            <div className="world-visual-halo" aria-hidden />
            <WorldOrb />
          </div>
        </div>

        <dl data-metrics className="world-metrics mt-[clamp(3.75rem,8vw,6.75rem)] grid gap-px overflow-hidden rounded-[20px] sm:grid-cols-2 xl:grid-cols-4">
          {METRICS.map((m, i) => (
            <div key={m.unit} data-metric className="world-metric relative px-6 py-8 sm:px-7 sm:py-9">
              <span className="t-mono absolute top-5 right-5 text-[0.65rem] text-on-dark-muted" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="sr-only">
                {m.unit} {m.label}
              </dt>
              <dd className="flex items-baseline gap-2.5 leading-none">
                <span className="text-[clamp(2.6rem,1.6rem+3.5vw,4.25rem)] font-extrabold tracking-[-0.05em] text-on-dark tabular-nums">
                  {m.pre}
                  <span data-count={m.to}>{m.to.toLocaleString("en-GB")}</span>
                </span>
                <span className="text-[clamp(0.95rem,0.8rem+0.5vw,1.15rem)] font-bold tracking-tight world-accent-cyan">{m.unit}</span>
              </dd>
              <dd className="mt-4 max-w-[26ch] text-sm leading-relaxed text-on-dark-muted">{m.label}</dd>
            </div>
          ))}
        </dl>

        <ul className="world-certs mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t py-8 text-sm" aria-label="Certifications">
          {CERTIFICATIONS.map((c) => (
            <li key={c.name}>
              <span className="font-bold text-on-dark">{c.name}</span> <span className="text-on-dark-muted">· {c.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="world-band relative py-[clamp(1.5rem,3vw,2.5rem)]" aria-label="Delivery centres and headquarters">
        <p data-band className="world-band-track flex w-max gap-[0.4em] text-[clamp(2.6rem,1.6rem+5vw,7.5rem)] leading-none font-extrabold tracking-[-0.04em] whitespace-nowrap">
          {[...CITIES, ...CITIES].map((c, i) => (
            <span key={i} aria-hidden={i >= CITIES.length ? true : undefined}>
              {c}
              <span className="world-band-dot"> · </span>
            </span>
          ))}
        </p>
      </div>
    </Choreo>
  );
}
