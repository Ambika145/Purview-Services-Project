"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Plus, X } from "lucide-react";
import { Logo } from "./Logo";
import { COMPANY_LINKS, INDUSTRY_LINKS, MEGA, VERTICALS } from "@/content/site";

/**
 * Mobile navigation is designed as its own surface rather than a collapsed
 * desktop menu: three vertical "layers" first, then plain accordions.
 */
export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        // keep focus inside the open sheet
        const f = panelRef.current.querySelectorAll<HTMLElement>("a,button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-abyss text-on-dark motion-safe:animate-[fadeUp_.3s_cubic-bezier(.22,1,.36,1)_both] lg:hidden"
        >
          <div className="wrap flex h-[76px] shrink-0 items-center justify-between">
            <Logo />
            <button ref={closeRef} type="button" onClick={onClose} className="inline-flex size-11 items-center justify-center rounded border border-sky/25">
              <X aria-hidden className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="wrap flex-1 pb-10 pt-4">
            <p className="t-eyebrow text-on-dark-muted">Solutions</p>
            <ul className="mt-3 space-y-2">
              {VERTICALS.map((v) => (
                <li key={v.id}>
                  <Accordion
                    label={
                      <span className="flex items-center gap-4">
                        <span className="layer-chip border-sky/40 text-sky">{v.layer}</span>
                        <span className="text-left">
                          <span className="block text-lg font-bold">{v.name}</span>
                          <span className="block text-sm text-on-dark-muted">{v.role}</span>
                        </span>
                      </span>
                    }
                  >
                    <Link href={v.href} onClick={onClose} className="mb-2 flex items-center justify-between rounded bg-ink px-4 py-3 font-semibold">
                      {v.name} overview <ArrowRight aria-hidden className="size-4" />
                    </Link>
                    {MEGA[v.id].flatMap((g) => g.links).map((l) =>
                      l.external ? (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener" onClick={onClose} className="block border-b border-sky/10 px-1 py-3 text-on-dark-muted">
                          {l.label} ↗<span className="sr-only"> (opens external site)</span>
                        </a>
                      ) : (
                        <Link key={l.href} href={l.href} onClick={onClose} className="block border-b border-sky/10 px-1 py-3 text-on-dark-muted">
                          {l.label}
                        </Link>
                      ),
                    )}
                  </Accordion>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-sky/10">
              <Accordion label={<span className="text-lg font-bold">Industries</span>} flat>
                <Link href="/industries" onClick={onClose} className="block py-3 font-semibold">
                  All industries
                </Link>
                {INDUSTRY_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} onClick={onClose} className="block border-b border-sky/10 py-3 text-on-dark-muted">
                    {l.label}
                  </Link>
                ))}
              </Accordion>
              <Accordion label={<span className="text-lg font-bold">Company</span>} flat>
                {COMPANY_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} onClick={onClose} className="block border-b border-sky/10 py-3 text-on-dark-muted">
                    {l.label}
                  </Link>
                ))}
              </Accordion>
              {[
                { label: "Our Work", href: "/our-work" },
                { label: "Insights", href: "/insights" },
                { label: "Careers", href: "/careers" },
              ].map((l) => (
                <Link key={l.href} href={l.href} onClick={onClose} className="flex min-h-14 items-center border-b border-sky/10 text-lg font-bold">
                  {l.label}
                </Link>
              ))}
            </div>

            <Link href="/contact" onClick={onClose} className="btn btn-primary mt-8 w-full justify-between">
              Talk to our experts <ArrowRight aria-hidden className="size-4" />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

function Accordion({ label, children, flat = false }: { label: React.ReactNode; children: React.ReactNode; flat?: boolean }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={flat ? "border-b border-sky/10" : "rounded-[var(--radius-m)] border border-sky/15 bg-ink/40"}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-4 text-left ${flat ? "min-h-14" : "p-4"}`}
      >
        {label}
        <Plus aria-hidden className={`size-5 shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
      </button>
      <div id={id} hidden={!open} className={flat ? "pb-3" : "px-4 pb-4"}>
        {children}
      </div>
    </div>
  );
}
