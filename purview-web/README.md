# Purview Services: website revamp

This is the production-minded rebuild of purviewservices.com. It's one integrated group site presenting three capabilities:

| Layer | Vertical | Route |
|---|---|---|
| **A · The applications** | Purview Tech | `/tech` |
| **B · The infrastructure** | Purview Data Centre | `/data-centre` |
| **C · The people** | Purview Workforce | `/workforce` |

> **Status:** local build, not deployed. Nothing has been published or pointed at the production domain.

## Run it

```bash
npm install
npm run dev           # http://localhost:3000
npm run build         # production build (89 routes, all prerendered)
npm run start         # serve the production build
npx eslint src        # lint (clean)
npx tsc --noEmit      # types (clean)
```

Requires Node 20.9+ (tested on Node 24). Chrome is used for the QA scripts (`channel: "chrome"`).

### Optional environment

| Variable | Purpose |
|---|---|
| `LEGACY_ORIGIN` | Origin of the current PHP site (for example `https://legacy.purviewservices.com`). When set, `/resources.php?doc=…` brochure downloads are proxied there until the gated brochure library is rebuilt. |

## Stack

- **Next.js 16.4** (App Router, Turbopack, Cache Components), **React 19.3**, **TypeScript**, **Tailwind CSS 4**
- **Three.js + React Three Fiber + Drei** for the two 3D scenes, lazy-loaded on desktop only
- **GSAP + ScrollTrigger** for the single pinned infrastructure sequence, loaded on demand
- CSS for every other animation; one shared `IntersectionObserver` for reveals
- **d3-geo / topojson / world-atlas** at build time only, to generate the static world map
- **Playwright, axe-core and Lighthouse** for QA
- `lucide-react` for a small set of UI icons

## Project structure

```
src/
  app/                    routes (bespoke pages, [slug] preserved pages, insights, sitemap, robots, 404)
  proxy.ts                true 404 status for unknown paths (before streaming starts)
  components/
    layout/               SiteHeader, MegaMenu, MobileNavigation, SiteFooter, Logo
    home/                 the homepage sections (Hero … InsightsSection)
    verticals/            DataHallVisual, StageExplorer, WorkflowExplorer, WorkforceJourney
    sections/             PageKit (PageHero, StatRow, Heading, NumberedList, Faq, StepsRail), ContactCTA, ContactForm
    legacy/LegacyPage     renders preserved pages from extracted content
    visuals/              SVG systems: AgentWorkflow, HallPlan, HallAnnotations, OperatingModel
    three/                HeroScene, DataHallScene, rackTextures, SceneGate (capability tiers)
    motion/               RevealObserver
    ui/                   Button, SectionHeading, Breadcrumbs, Counter, LogoMark
  content/                typed copy and facts (site, home, verticals, insights), legacy/*.json, logos.json
  lib/                    routes (URL map), seo (metadata + JSON-LD), legacy loader
scripts/
  extract-content.py      current site HTML → src/content/legacy/*.json (verbatim)
  build-map.mjs           Natural Earth → public/map/world-footprint.svg + marker positions
qa/                       links.mjs, axe.mjs, keyboard.mjs, sections.mjs, shoot.mjs
docs/                     design spec, content map, SEO + redirects, verification register, QA report
```

## Regenerating content

```bash
# 1. mirror the current site's pages (from its sitemap.xml) into a folder, then:
python scripts/extract-content.py <mirror-folder> src/content/legacy
# 2. world map (after editing footprint countries or locations):
node scripts/build-map.mjs
```

## QA

```bash
npm run build && npm run start -- -p 3200
node qa/links.mjs http://localhost:3200 <file listing old sitemap URLs>
node qa/axe.mjs http://localhost:3200
node qa/keyboard.mjs http://localhost:3200
node qa/sections.mjs /data-centre 390 844 out/dc     # section-by-section screenshots
```

See `docs/05-qa-report.md` for the latest results.

## Before launch

Read `docs/04-verification-register.md` (open factual items and asset licences) and the checklist in `docs/03-seo-and-redirects.md`.
