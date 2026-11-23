import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Choreo } from "@/components/home/motion/Choreo";

/** Operating model and figures from purviewservices.com/workforce.html, rtd.html, rabbit.html. */
const JOURNEY = [
  { k: "Recruit", stat: "30+", statL: "languages: RabbiT voice-screens every applicant", d: "Our own agentic AI platform calls, qualifies and schedules every applicant in their own language, and scores each answer against the role.", img: "/img/volume-recruitment.jpg" },
  { k: "Train", stat: "4–12 wks", statL: "lab training on real racks before deployment", d: "Engineers train in Purview labs with real equipment, AR/VR guidance and OEM certification, assessed against the real task.", img: "/img/rtd.jpg" },
  { k: "Deploy", stat: "10–12", statL: "technicians per certified lead engineer", d: "Pods arrive floor-ready with tooling and procedures, from a visa-ready bench in each operating country, at two weeks’ notice.", img: "/img/ai-infrastructure.jpg" },
  { k: "Operate", stat: "21", statL: "countries Purview hires in", d: "Time-based or outcome-priced teams, compliant contract payroll and managed services carry the work into steady state.", img: "/img/infra-managed.jpg" },
];

export function WorkforceFeature() {
  return (
    <Choreo scene="workforce" className="relative overflow-hidden bg-paper py-[clamp(5rem,10vw,9rem)]" labelledBy="wf-title">
      <div className="wrap-wide">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="t-eyebrow text-muted">05</span>
              <span className="h-px w-10 bg-line" aria-hidden />
              <span className="t-eyebrow text-accent-strong">C · Purview Workforce</span>
            </div>
            <h2 id="wf-title" className="mt-6 max-w-[15ch] text-[clamp(2.1rem,1.3rem+3vw,4.25rem)] leading-[1] font-extrabold tracking-[-0.035em] balance">
              The people side of delivery.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="t-lead text-muted pretty">2,500 professionals across 21 countries, hired by our own agentic AI platform, certified in our labs and deployed on our floors and yours.</p>
            <Button href="/workforce" variant="dark" className="mt-7">
              Explore Workforce Solutions
            </Button>
          </div>
        </div>

        <ol data-journey className="relative mt-[clamp(4rem,8vw,7rem)] space-y-[clamp(4rem,9vw,8rem)]">
          <span className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-line lg:block" aria-hidden />
          <span data-path className="absolute top-0 bottom-0 left-1/2 hidden w-[2px] -translate-x-1/2 bg-gradient-to-b from-accent via-accent to-[#5ef0c8] lg:block" aria-hidden />
          {JOURNEY.map((j, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={j.k} data-step className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-24">
                <span className="absolute top-1/2 left-1/2 z-10 hidden size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-paper lg:block" aria-hidden />
                <div className={flip ? "lg:order-2" : ""}>
                  <div data-mask className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-m)] bg-ink">
                    <div data-img className="absolute inset-0 will-change-transform">
                      <Image src={j.img} alt="" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
                    </div>
                    <span className="t-mono absolute right-3 bottom-3 rounded bg-abyss/70 px-2 py-1 text-[0.6rem] text-on-dark">Illustrative imagery</span>
                  </div>
                </div>
                <div data-copy className={flip ? "lg:order-1 lg:text-right" : ""}>
                  <p data-num className="text-[clamp(4rem,2rem+7vw,9rem)] leading-[0.8] font-extrabold tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(23,48,111,.45)]" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-[clamp(1.8rem,1.2rem+1.8vw,3rem)] font-extrabold tracking-[-0.03em]">{j.k}</h3>
                  <p className={`mt-3 max-w-[42ch] text-muted ${flip ? "lg:ml-auto" : ""}`}>{j.d}</p>
                  <p className={`mt-6 flex items-baseline gap-3 border-t border-line pt-4 ${flip ? "lg:justify-end" : ""}`}>
                    <span className="text-3xl font-extrabold tracking-tight text-accent-strong">{j.stat}</span>
                    <span className="max-w-[26ch] text-sm text-muted">{j.statL}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Choreo>
  );
}
