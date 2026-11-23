"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileNavigation } from "./MobileNavigation";
import { PRIMARY_NAV } from "@/content/site";

type Panel = "solutions" | "company" | null;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const headerRef = useRef<HTMLElement>(null);

  // Scroll state: solid after 24px, tuck away on scroll down, return on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 480 && y > last + 4);
        if (y < last - 4) setHidden(false);
        last = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Close everything on route change (adjust state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setPanel(null);
    setMobileOpen(false);
  }

  // Escape closes the open panel and returns focus to its trigger.
  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const trigger = headerRef.current?.querySelector<HTMLButtonElement>(`[data-panel-trigger="${panel}"]`);
        setPanel(null);
        trigger?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setPanel(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [panel]);

  const open = useCallback((p: Panel) => {
    window.clearTimeout(closeTimer.current);
    setPanel(p);
  }, []);
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPanel(null), 160);
  }, []);

  const isActive = (href: string, mega?: string) => {
    if (mega === "solutions") return ["/tech", "/data-centre", "/workforce"].some((p) => pathname.startsWith(p));
    return href !== "/" && pathname.startsWith(href);
  };

  const solid = scrolled || panel !== null;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 text-on-dark transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
        hidden && !panel && !mobileOpen ? "-translate-y-full" : ""
      }`}
      onMouseLeave={scheduleClose}
    >
      <div
        className={`absolute inset-0 -z-10 transition-[background-color,backdrop-filter,border-color] duration-500 border-b ${
          solid ? "bg-abyss/85 backdrop-blur-xl border-sky/10" : "bg-gradient-to-b from-abyss/70 to-transparent border-transparent"
        }`}
        aria-hidden
      />
      <div className="wrap-wide flex h-[76px] items-center gap-6">
        <Logo />
        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {PRIMARY_NAV.map((item) => {
              const active = isActive(item.href, item.mega);
              if (item.mega) {
                const expanded = panel === item.mega;
                return (
                  <li key={item.label} onMouseEnter={() => open(item.mega!)}>
                    <button
                      type="button"
                      data-panel-trigger={item.mega}
                      aria-expanded={expanded}
                      aria-controls={`mega-${item.mega}`}
                      onClick={() => setPanel(expanded ? null : item.mega!)}
                      className={`group relative flex h-11 items-center gap-1.5 rounded px-3.5 text-[0.95rem] font-semibold transition-colors ${
                        expanded || active ? "text-on-dark" : "text-on-dark-muted hover:text-on-dark"
                      }`}
                    >
                      {item.label}
                      <ChevronDown aria-hidden className={`size-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
                      {active && <span className="absolute inset-x-3.5 bottom-1.5 h-px bg-accent" aria-hidden />}
                    </button>
                  </li>
                );
              }
              return (
                <li key={item.label} onMouseEnter={() => panel && scheduleClose()}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex h-11 items-center rounded px-3.5 text-[0.95rem] font-semibold transition-colors ${
                      active ? "text-on-dark" : "text-on-dark-muted hover:text-on-dark"
                    }`}
                  >
                    {item.label}
                    {active && <span className="absolute inset-x-3.5 bottom-1.5 h-px bg-accent" aria-hidden />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Link href="/contact" className="btn btn-primary ml-2 hidden !min-h-11 !px-4 lg:inline-flex">
          Contact
        </Link>
        <button
          type="button"
          className="ml-auto inline-flex size-11 items-center justify-center rounded border border-sky/25 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(true)}
        >
          <Menu aria-hidden className="size-5" />
          <span className="sr-only">Open menu</span>
        </button>
      </div>

      {panel && (
        <div
          key={panel}
          id={`mega-${panel}`}
          onMouseEnter={() => open(panel)}
          className="absolute inset-x-0 top-full hidden motion-safe:animate-[fadeUp_.28s_cubic-bezier(.22,1,.36,1)_both] lg:block"
        >
          <MegaMenu panel={panel} onNavigate={() => setPanel(null)} />
        </div>
      )}

      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
