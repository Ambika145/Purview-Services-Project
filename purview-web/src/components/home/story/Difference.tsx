import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Choreo } from "@/components/home/motion/Choreo";

const STATEMENT =
  "Most technology companies build the software or the infrastructure. Purview builds the intelligent applications, the AI-ready data centres they run on, and the teams that deliver both.";

const LAYERS = [
  { k: "A", name: "Purview Tech", role: "The applications", body: "GenAI and agentic systems that pass security review and keep working in production.", href: "/tech" },
  { k: "B", name: "Purview Data Centre", role: "The infrastructure", body: "GPU floors designed, installed, commissioned and operated: powered shell to production.", href: "/data-centre" },
  { k: "C", name: "Purview Workforce", role: "The people", body: "Engineers hired by our own agentic AI platform, certified in our labs, deployed where the work is.", href: "/workforce" },
];

/**
 * 02 · The Purview difference.
 * The statement fills word by word with scroll (scrubbed, no pin), then the
 * three layers connect along one drawn system line.
 */
export function Difference() {
  return (
    <Choreo scene="difference" id="difference" className="on-dark relative bg-abyss pt-[clamp(6rem,14vw,12rem)] pb-[clamp(5rem,10vw,9rem)]" labelledBy="diff-title">
      <div className="wrap-wide">
        <div className="flex items-center gap-4">
          <span className="t-eyebrow text-on-dark-muted">01</span>
          <span className="h-px w-10 bg-sky/40" aria-hidden />
          <h2 id="diff-title" className="t-eyebrow text-sky">
            The Purview difference
          </h2>
        </div>
        <p data-statement className="mt-10 max-w-[24ch] text-[clamp(2rem,1.2rem+3.4vw,4.6rem)] leading-[1.04] font-extrabold tracking-[-0.035em] balance">
          {STATEMENT.split(" ").map((w, i) => (
            <span key={i} data-word>
              {w}{" "}
            </span>
          ))}
        </p>

        <div data-system className="relative mt-[clamp(4rem,9vw,8rem)]">
          {/* the system line joining A → B → C */}
          <svg className="pointer-events-none absolute top-7 left-0 hidden h-6 w-full md:block" viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden>
            <path data-system-line d="M0 12 H1000" pathLength={1} strokeDasharray="1" strokeDashoffset="0" stroke="url(#sysgrad)" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
            <defs>
              <linearGradient id="sysgrad" x1="0" x2="1">
                <stop offset="0" stopColor="#8fb3ff" />
                <stop offset=".5" stopColor="#ff8a3d" />
                <stop offset="1" stopColor="#5ef0c8" />
              </linearGradient>
            </defs>
          </svg>
          <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
            {LAYERS.map((l) => (
              <li key={l.k} data-layer className="relative">
                <span data-node className="relative z-10 grid size-14 place-items-center rounded-full border border-sky/30 bg-abyss text-lg font-bold text-accent">
                  {l.k}
                </span>
                <p className="t-eyebrow mt-8 text-on-dark-muted">{l.role}</p>
                <h3 className="mt-2 text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] font-extrabold tracking-[-0.025em]">{l.name}</h3>
                <p className="mt-3 max-w-[34ch] text-on-dark-muted">{l.body}</p>
                <Link href={l.href} className="link-arrow mt-6 text-on-dark">
                  Explore {l.name} <ArrowRight aria-hidden className="size-4" />
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-16 max-w-[60ch] border-l-2 border-accent pl-5 text-on-dark-muted">
            Each capability exists because the one next to it needs it: the models need the compute, the compute needs the data centre, and the data centre needs certified people to build and run it.
          </p>
        </div>
      </div>
    </Choreo>
  );
}
