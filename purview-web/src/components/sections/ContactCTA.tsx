import { Button, TextLink } from "@/components/ui/Button";
import { FINAL_CTA } from "@/content/home";

/**
 * Closing call to action. The visual returns to the hero's idea: three
 * layers (applications, infrastructure, people) converging into one signal.
 */
export function ContactCTA({
  eyebrow = FINAL_CTA.eyebrow,
  title = FINAL_CTA.title,
  body = FINAL_CTA.body,
  prompt = null,
  primary = { label: FINAL_CTA.primaryCta.label, href: FINAL_CTA.primaryCta.href },
  secondary = { label: FINAL_CTA.secondaryCta.label, href: FINAL_CTA.secondaryCta.href },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  prompt?: string | null;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="cv-auto on-dark relative isolate overflow-hidden bg-abyss" aria-labelledby="cta-title">
      <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <radialGradient id="cta-glow" cx="78%" cy="50%" r="40%">
            <stop offset="0" stopColor="#ff8a3d" stopOpacity=".22" />
            <stop offset="1" stopColor="#ff8a3d" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="720" fill="url(#cta-glow)" />
        {[
          { y: 170, c: "#8fb3ff", l: "A" },
          { y: 360, c: "#2f5bd6", l: "B" },
          { y: 550, c: "#8fb3ff", l: "C" },
        ].map((r, i) => (
          <g key={r.l}>
            <path
              d={`M-20 ${r.y} L760 ${r.y} C960 ${r.y} 1000 360 1120 360`}
              fill="none"
              stroke={r.c}
              strokeOpacity=".55"
              strokeWidth="1.2"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="1"
              className="motion-safe:animate-[dash_2.4s_cubic-bezier(.65,0,.35,1)_forwards] motion-reduce:[stroke-dashoffset:0]"
              style={{ animationDelay: `${i * 220}ms` }}
            />
            <text x="40" y={r.y - 14} fill="#b8c6ea" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="2" opacity=".7">
              {r.l} · {["APPLICATIONS", "INFRASTRUCTURE", "PEOPLE"][i]}
            </text>
          </g>
        ))}
        <line x1="1120" y1="360" x2="1460" y2="360" stroke="#ff8a3d" strokeWidth="2" />
        <circle cx="1120" cy="360" r="7" fill="#ff8a3d" />
        <circle cx="1120" cy="360" r="22" fill="none" stroke="#ff8a3d" strokeOpacity=".4" className="motion-safe:animate-[pulse-dot_2.4s_ease-in-out_infinite]" />
      </svg>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-abyss via-abyss/80 to-transparent" aria-hidden />

      <div className="wrap py-[clamp(6rem,12vw,11rem)]">
        <div className="max-w-[48rem]">
          <p className="t-eyebrow flex items-center gap-3 text-sky" data-reveal>
            <span className="h-px w-10 bg-accent" aria-hidden />
            {eyebrow}
          </p>
          <h2 id="cta-title" className="t-h1 mt-7 balance" data-reveal>
            {title}
          </h2>
          <p className="t-lead mt-7 max-w-[44rem] text-on-dark-muted pretty" data-reveal>
            {body}
          </p>
          {prompt && (
            <p className="mt-4 max-w-[44rem] text-on-dark-muted pretty" data-reveal>
              {prompt}
            </p>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-6" data-reveal>
            <Button href={primary.href}>{primary.label}</Button>
            {secondary && (
              <TextLink href={secondary.href} className="text-on-dark">
                {secondary.label}
              </TextLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
