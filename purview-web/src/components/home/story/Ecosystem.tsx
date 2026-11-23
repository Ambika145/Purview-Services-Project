import { ECO_EDGES, ECO_NODES } from "@/content/home";
import { EcoMap } from "./EcoMap";
import { EcoSwitch } from "./EcoSwitch";
import { EcoVisual } from "./EcoVisual";

/** Display order matches the published twelve-capability map. */
const ORDER = ["dc", "aiinfra", "edge", "embedded", "cloud", "cyber", "genai", "data", "dpe", "payments", "rpa", "managed"];

/**
 * Twelve capabilities. Applications and infrastructure as one system:
 * every node is a real page, not a label.
 */
export function Ecosystem() {
  const nodes = ORDER.map((id) => ECO_NODES.find((n) => n.id === id)!);
  // two families of six, in each family's published order
  const apps = nodes.filter((n) => n.layer === "A");
  const infra = nodes.filter((n) => n.layer === "B");

  return (
    <section id="ecosystem" className="cv-auto relative scroll-mt-24 bg-mist py-[clamp(4.5rem,9vw,8rem)]" aria-labelledby="eco-title">
      <div className="wrap-wide">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-navy/30" aria-hidden />
              <span className="t-eyebrow text-accent-strong">The ecosystem</span>
            </div>
            <h2 id="eco-title" className="mt-6 max-w-[18ch] text-[clamp(2rem,1.2rem+2.9vw,3.75rem)] leading-[1.04] font-extrabold tracking-[-0.03em] balance">
              Twelve capabilities, one gravitational centre.
            </h2>
          </div>
          <p className="t-lead text-muted lg:col-span-5 pretty">
            Purview is not a stack of unrelated service lines. Each capability exists because the one next to it needs it: the models need the silicon, the silicon needs the data centre, the data centre needs the network, and the applications need all of it to be true at once. Select any capability to open its page.
          </p>
        </div>

        {/* A = previous map, B = current map; switch shown above the map */}
        <EcoSwitch a={<EcoVisual nodes={nodes} />} b={<EcoMap apps={apps} infra={infra} edges={ECO_EDGES} />} />
      </div>
    </section>
  );
}
