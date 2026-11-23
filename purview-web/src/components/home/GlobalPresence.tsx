import Image from "next/image";
import { FACTS } from "@/content/site";
import { LOCATIONS } from "@/content/home";
import markerPos from "@/content/map-markers.json";
import { TextLink } from "@/components/ui/Button";

/**
 * Global footprint map. The map itself is a static SVG generated at build
 * time from Natural Earth 1:110m data (scripts/build-map.mjs); markers are
 * HTML positioned from projected real coordinates.
 */
const POS = markerPos as Record<string, { x: number; y: number }>;

export function GlobalPresence() {
  const markers = LOCATIONS.map((l) => ({ ...l, ...POS[l.city] }));
  const hqs = LOCATIONS.filter((l) => l.kind === "hq");
  const centres = LOCATIONS.filter((l) => l.kind === "dc");
  return (
    <section className="cv-auto on-dark section relative overflow-hidden bg-abyss" aria-labelledby="global-title">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4" data-reveal>
              <span className="t-eyebrow text-on-dark-muted">08</span>
              <span className="h-px w-10 bg-sky/40" aria-hidden />
              <span className="t-eyebrow text-sky">Global delivery</span>
            </div>
            <h2 id="global-title" className="t-h2 mt-6 max-w-[16ch] balance" data-reveal>
              Engineering expertise, wherever you need it.
            </h2>
          </div>
          <p className="t-lead text-on-dark-muted lg:col-span-5 pretty" data-reveal>
            Founded in Scotland, headquartered in Edinburgh. Delivery centres in the UK, Poland, Singapore, Australia and India, with engineers deployed wherever the floor is.
          </p>
        </div>

        <div className="relative mt-14" data-reveal>
          <div className="relative aspect-[2/1] w-full">
            <Image src="/map/world-footprint.svg" alt="" fill unoptimized loading="lazy" sizes="100vw" className="object-contain" />
            {markers.map((m) => (
              <div key={m.city} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${m.x}%`, top: `${m.y}%` }}>
                <span className={`relative grid place-items-center ${m.kind === "hq" ? "size-4" : "size-3"}`}>
                  <span className={`absolute inset-0 rounded-full ${m.kind === "hq" ? "bg-accent/40 motion-safe:animate-ping" : ""}`} />
                  <span className={`rounded-full ${m.kind === "hq" ? "size-2.5 bg-accent ring-2 ring-abyss" : "size-2 bg-sky ring-2 ring-abyss"}`} />
                </span>
                <span className={`pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 rounded border border-sky/20 bg-abyss/90 px-2 py-1 whitespace-nowrap backdrop-blur ${m.kind === "hq" ? "hidden md:block" : "hidden opacity-0 transition-opacity group-hover:opacity-100 md:block"}`}>
                  <span className="block text-[0.75rem] font-bold text-on-dark">{m.city}</span>
                  <span className="t-mono block text-[0.6rem] text-on-dark-muted">{m.role.split(" · ")[0]}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-sky/10 pt-10 lg:grid-cols-12">
          <dl className="grid grid-cols-3 gap-6 lg:col-span-5">
            {[
              [FACTS.countries.value, "countries with Purview entities"],
              ["8", "delivery centres in five countries"],
              ["24", "cities where you can reach a Purview team"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="text-4xl font-extrabold tracking-tight">{v}</dd>
                <dd className="mt-1 text-sm leading-snug text-on-dark-muted">{l}</dd>
              </div>
            ))}
          </dl>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            <div>
              <p className="t-eyebrow flex items-center gap-2 text-accent">
                <span className="size-2 rounded-full bg-accent" /> Headquarters
              </p>
              <ul className="mt-3 space-y-2">
                {hqs.map((l) => (
                  <li key={l.city} className="flex justify-between gap-4 border-b border-sky/10 pb-2 text-sm">
                    <span className="font-bold">{l.city}</span>
                    <span className="text-right text-on-dark-muted">{l.role.split(" · ")[0]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="t-eyebrow flex items-center gap-2 text-sky">
                <span className="size-2 rounded-full bg-sky" /> Delivery centres
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {["Edinburgh", "Hyderabad", ...centres.map((c) => c.city)].map((c) => (
                  <li key={c} className="border-b border-sky/10 pb-2">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <TextLink href="/locations" className="text-on-dark">
            Explore our locations
          </TextLink>
          <p className="t-mono text-[0.65rem] text-on-dark-muted">Shaded: countries listed in the group’s global footprint. Map data: Natural Earth.</p>
        </div>
      </div>
    </section>
  );
}
