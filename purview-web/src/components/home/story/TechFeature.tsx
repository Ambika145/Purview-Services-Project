"use client";

import { useRef, useState } from "react";
import { useScrollScene } from "@/components/home/motion/useScrollScene";
import { Button } from "@/components/ui/Button";

const STEPS = [
  { t: "A request arrives", d: "A claim, a KYC file, a reconciliation or a service ticket enters the Secure AI Engine, inside your data boundary." },
  { t: "Agents plan and act", d: "Agents classify, reason and call your tools and knowledge, under guardrails and an evaluation set agreed with you." },
  { t: "People review the exceptions", d: "Anything outside policy is routed to a human reviewer. People make the decisions that matter." },
  { t: "The outcome, with an audit trail", d: "The system of record is updated and every agent action is logged, so it can be explained to a regulator." },
];

/**
 * 03 · Purview Tech. Desktop: the section pins and the workflow assembles
 * step by step with scroll. Otherwise the finished schematic and all steps
 * are shown statically.
 */
export function TechFeature() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(3);

  useScrollScene(
    ref,
    ({ gsap, root }) => {
      setStep(0);
      const q = (s: string) => root.querySelectorAll(s);
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root.querySelector("[data-pin]"),
          start: "top top",
          end: "+=230%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => setStep(Math.min(3, Math.floor(self.progress * 4 * 0.999))),
        },
      });
      gsap.set(q("[data-s]"), { opacity: 0.08 });
      gsap.set(q("[data-wire]"), { strokeDashoffset: 1 });
      tl.to(q('[data-s="1"]'), { opacity: 1, duration: 1 })
        .to(q('[data-wire="1"]'), { strokeDashoffset: 0, duration: 1 }, "<0.3")
        .to(q('[data-s="2"]'), { opacity: 1, stagger: 0.15, duration: 1 })
        .to(q('[data-wire="2"]'), { strokeDashoffset: 0, duration: 1 }, "<")
        .to(q('[data-s="3"]'), { opacity: 1, duration: 1 })
        .to(q('[data-wire="3"]'), { strokeDashoffset: 0, duration: 1 }, "<")
        .to(q('[data-s="4"]'), { opacity: 1, duration: 1 })
        .to(q('[data-wire="4"]'), { strokeDashoffset: 0, duration: 1 }, "<")
        .to(q("[data-signal]"), { strokeDashoffset: -560, duration: 2, ease: "none" });
    },
    { desktopOnly: true, eager: true },
  );

  const wire = "stroke-[rgba(143,179,255,.45)]";
  return (
    <section ref={ref} className="on-dark relative bg-ink" aria-labelledby="tech-title">
      <div data-pin className="relative overflow-hidden lg:flex lg:h-[100svh] lg:min-h-[700px] lg:items-center">
        <div className="blueprint absolute inset-0 opacity-50" aria-hidden />
        <div className="wrap-wide relative grid gap-12 py-24 lg:grid-cols-12 lg:py-0">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="t-eyebrow text-on-dark-muted">03</span>
              <span className="h-px w-10 bg-sky/40" aria-hidden />
              <span className="t-eyebrow text-sky">A · Purview Tech</span>
            </div>
            <h2 id="tech-title" className="mt-6 max-w-[14ch] text-[clamp(2.1rem,1.3rem+3vw,4.25rem)] leading-[1] font-extrabold tracking-[-0.035em] balance">
              AI that runs operations, not demos.
            </h2>
            <ol className="mt-10 border-t border-sky/15" aria-label="How an agentic workflow runs">
              {STEPS.map((s, i) => (
                <li key={s.t} className={`grid grid-cols-[2.5rem_1fr] gap-2 border-b border-sky/15 py-4 transition-opacity duration-500 ${i <= step ? "opacity-100" : "opacity-40"}`} aria-current={i === step ? "step" : undefined}>
                  <span className={`t-mono pt-1 text-xs ${i === step ? "text-accent" : "text-on-dark-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-bold">{s.t}</span>
                    <span className={`grid transition-[grid-template-rows] duration-500 ${i === step ? "grid-rows-[1fr]" : "grid-rows-[1fr] lg:grid-rows-[0fr]"}`}>
                      <span className="overflow-hidden">
                        <span className="mt-1 block text-sm text-on-dark-muted">{s.d}</span>
                      </span>
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap items-end gap-8">
              <p>
                <span className="block text-5xl font-extrabold tracking-tight text-accent">98%</span>
                <span className="mt-1 block max-w-[26ch] text-sm text-on-dark-muted">task success in a live agentic POC at a major US financial institution</span>
              </p>
              <Button href="/tech">Explore Purview Tech</Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <figure className="relative rounded-[var(--radius-m)] border border-sky/15 bg-abyss/70 p-4 backdrop-blur-sm sm:p-8">
              <svg viewBox="0 0 640 430" className="h-auto w-full" role="img" aria-label="Illustrative agentic workflow: request, agents and tools inside the Secure AI Engine, human review of exceptions, and the system of record updated with an audit log.">
                {/* boundary + input */}
                <g data-s="1">
                  <rect x="170" y="30" width="300" height="300" rx="10" fill="none" stroke="#ff8a3d" strokeOpacity=".6" strokeDasharray="4 5" />
                  <text x="186" y="54" fill="#ff8a3d" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1.5">SAIE · SECURE AI ENGINE</text>
                  <text x="186" y="70" fill="#b8c6ea" fontFamily="var(--font-mono)" fontSize="10">inside your data boundary</text>
                  <rect x="12" y="160" width="128" height="76" rx="8" fill="#0a1538" stroke="rgba(143,179,255,.35)" />
                  <text x="26" y="184" fill="#b8c6ea" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1">INPUT</text>
                  <text x="26" y="205" fill="#f3f6ff" fontSize="14" fontWeight="700">Business request</text>
                  <text x="26" y="223" fill="#b8c6ea" fontSize="11">claim · KYC · ticket</text>
                </g>
                {/* agents + tools */}
                {[
                  { y: 96, a: "Intake agent", s: "classify, extract", t: "Tools & APIs" },
                  { y: 170, a: "Reasoning agent", s: "plan, decide", t: "Knowledge · RAG" },
                  { y: 244, a: "Action agent", s: "execute, draft", t: "Guardrails · eval" },
                ].map((r) => (
                  <g key={r.a} data-s="2">
                    <rect x="194" y={r.y} width="134" height="56" rx="8" fill="#0a1538" stroke="rgba(143,179,255,.35)" />
                    <circle cx="210" cy={r.y + 18} r="4" fill="#8fb3ff" />
                    <text x="222" y={r.y + 22} fill="#f3f6ff" fontSize="13" fontWeight="700">{r.a}</text>
                    <text x="210" y={r.y + 42} fill="#b8c6ea" fontSize="11">{r.s}</text>
                    <rect x="350" y={r.y + 10} width="104" height="36" rx="6" fill="none" stroke="rgba(143,179,255,.3)" />
                    <text x="362" y={r.y + 33} fill="#b8c6ea" fontSize="11.5">{r.t}</text>
                  </g>
                ))}
                {/* human review */}
                <g data-s="3">
                  <rect x="498" y="90" width="132" height="72" rx="8" fill="#0a1538" stroke="#ff8a3d" strokeOpacity=".8" />
                  <text x="512" y="114" fill="#ff8a3d" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1">EXCEPTIONS</text>
                  <text x="512" y="135" fill="#f3f6ff" fontSize="13.5" fontWeight="700">Human review</text>
                  <text x="512" y="152" fill="#b8c6ea" fontSize="11">approve or correct</text>
                </g>
                {/* output */}
                <g data-s="4">
                  <rect x="498" y="214" width="132" height="92" rx="8" fill="#0a1538" stroke="#5ef0c8" strokeOpacity=".7" />
                  <text x="512" y="238" fill="#5ef0c8" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1">OUTPUT</text>
                  <text x="512" y="258" fill="#f3f6ff" fontSize="13.5" fontWeight="700">System of record</text>
                  <text x="512" y="276" fill="#b8c6ea" fontSize="11">updated, with an</text>
                  <text x="512" y="291" fill="#b8c6ea" fontSize="11">audit log per action</text>
                  {[0, 1, 2, 3, 4].map((k) => (
                    <g key={k}>
                      <rect x={176 + k * 58} y="354" width="50" height="22" rx="4" fill="none" stroke="rgba(94,240,200,.45)" />
                      <text x={184 + k * 58} y="369" fill="#5ef0c8" fontFamily="var(--font-mono)" fontSize="9">LOG {String(k + 1).padStart(2, "0")}</text>
                    </g>
                  ))}
                  <text x="12" y="369" fill="#b8c6ea" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1">AUDIT TRAIL</text>
                </g>
                {/* wires */}
                <g fill="none" strokeWidth="1.3" className={wire}>
                  <path data-wire="1" pathLength={1} strokeDasharray="1" d="M140 198 C166 198 168 124 194 124 M140 198 L194 198 M140 198 C166 198 168 272 194 272" />
                  <path data-wire="2" pathLength={1} strokeDasharray="1" d="M328 124 L350 124 M328 198 L350 198 M328 272 L350 272 M261 152 L261 170 M261 226 L261 244" />
                  <path data-wire="3" pathLength={1} strokeDasharray="1" d="M454 142 C478 142 478 126 498 126" />
                  <path data-wire="4" pathLength={1} strokeDasharray="1" d="M454 272 L498 262 M564 162 L564 214 M564 306 C564 340 420 340 420 354" />
                </g>
                <path data-signal d="M140 198 L194 198 L261 198 L261 244 L261 272 L328 272 L454 272 L498 262" fill="none" stroke="#ff8a3d" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="24 600" strokeDashoffset="24" />
                <text x="12" y="418" fill="#b8c6ea" fontFamily="var(--font-mono)" fontSize="9.5" opacity=".8">ILLUSTRATIVE SCHEMATIC · NOT A PRODUCT SCREENSHOT</text>
              </svg>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
