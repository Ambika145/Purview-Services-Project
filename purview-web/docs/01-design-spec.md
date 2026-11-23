# Design specification: Purview Services revamp

## Concept: Applications + Infrastructure + People

The site's visual identity comes from one idea: **one group, three layers, one signal.**

| Layer | Capability | Vertical | Visual language |
|---|---|---|---|
| **A** | The applications | Purview Tech | Schematic workflows, sky-blue nodes, blueprint grid |
| **B** | The infrastructure | Purview Data Centre | GPU racks, data halls, precision callouts |
| **C** | The people | Purview Workforce | Operating-model tracks, workforce photography |

An **orange signal line** (the brand accent) ties the layers together. It travels from the agent workflow down into the racks in the hero. It's the rail in the mega menu, the progress line in the Recruit → Train → Deploy model, and the convergence point in the closing CTA. The A/B/C chips appear in the hero key, the navigation, the vertical heroes and the footer, so visitors always know which layer they're in.

Quality benchmark: Globant's hierarchy (very tight display type, one product-like object, short subline, primary button plus a text link, credibility strip near the top). Nothing was copied: the layouts, motion, imagery and type treatment are original.

## Palette (verified)

All values come from the `:root` block in force in `purviewservices.com/css/site.css`, read on 19 November 2026.

| Token | Value | Site variable | Use |
|---|---|---|---|
| `--brand-primary` | `#17306f` | `--navy` | Brand navy |
| `--brand-secondary` | `#2f5bd6` | `--blue` | Interactive blue, map shading |
| `--brand-accent` | `#ff8a3d` | `--accent` | Signal, CTAs, emphasis on dark |
| `--brand-dark` | `#0a1538` | `--navy-ink` | Dark sections |
| `--brand-light` | `#f5f7fc` | `--bg` | Light sections |
| `--surface-primary` | `#ffffff` | `--surface` | Cards, panels |
| `--surface-secondary` | `#eaeff9` | `--surface-2` | Alternate light sections |
| `--text-primary` | `#14203f` | `--fg` | Body text on light |
| `--text-secondary` | `#5a6788` | `--muted` | Secondary text (5.25:1 on light) |
| `--border-subtle` | `#d6ddee` | `--line` | Hairlines |
| `--brand-sky` | `#8fb3ff` | `--sky` | Eyebrows and nodes on dark |
| `--brand-accent-ink` | `#c2561a` | `--accent-ink` | Orange borders on light |
| `--on-dark` / `--on-dark-muted` | `#f3f6ff` / `#b8c6ea` | `--on-navy*` | Text on dark (10.45:1) |

**Derived tones** (lightness shifts only): `--brand-abyss #060d26` for the deepest hero background, and `--accent-ink-strong #a8451a` for small orange text on light surfaces (5.95:1). Verified accent `#c2561a` is only 4.22:1 on `#f5f7fc`, so it's used for borders, never for small text.

**Contrast rules:**
- Orange text appears only on dark surfaces or as `accent-strong`.
- Orange buttons carry `#1a0d04` text (8.12:1).

## Typography

The existing brand typefaces are retained:
- **Manrope** (400–800) for display and body.
- **IBM Plex Mono** (400–500) for technical labels.

Both load through `next/font`, self-hosted with `display: swap`.

| Style | Size (fluid) | Weight / tracking |
|---|---|---|
| Display (hero) | 2.4 → 5.1 rem | 800 / −0.035em, leading 0.98 |
| H1 | 2.4 → 5 rem | 800 / −0.03em |
| H2 | 2 → 3.75 rem | 750 / −0.028em |
| H3 | 1.35 → 1.9 rem | 700 |
| Lead | 1.1 → 1.35 rem | 400, leading 1.55 |
| Body | 1.0625 rem | 400, leading 1.65 |
| Eyebrow | 0.75 rem mono, uppercase, +0.14em | 500 |

Measure is capped at 62ch for body text and 46ch for leads. Headings use `text-wrap: balance`.

## Layout, grid and spacing

- **Grid:** 12 columns, gutter `clamp(1rem, 2vw, 2rem)`, container 1440 px (wide 1680 px), side padding `clamp(1rem, 4vw, 3.5rem)`.
- **Section rhythm:** `clamp(4.5rem, 10vw, 9.5rem)`.
- **Section heading pattern:** mono index → hairline → eyebrow → headline (7 columns) with the lead in the remaining 5. This gives the long homepage a readable spine (01–10).
- **No generic card grids.** Repeated items use hairline-ruled editorial lists, dimensioned stat rows (tick marks like an engineering drawing), spec sheets, or 1 px gap "tiled" grids with no shadows.
- **Radius:** 6 px (controls), 12 px (panels). Buttons are rectangular with a soft radius, deliberately not pills.
- **Light and dark alternate** with purpose. Dark marks cinematic and infrastructure moments; light marks evidence, editorial and partner content.

## Material and lighting

- **3D:** generic hardware, not a specific OEM product. Rack faceplates are procedural canvas textures. Lighting comes from in-scene `Lightformer` environments, so no HDR files are downloaded.
- **ACES tone mapping.** Emissive LEDs and signals, fog in the abyss colour, a reflective floor on high-tier devices.
- **Photography** is darkened with brand-colour gradients rather than filters. A blueprint grid texture marks technical surfaces.

## Motion system

| Category | Used for | Implementation |
|---|---|---|
| Cinematic | Hero camera reveal and pointer parallax, data hall commissioning wave | React Three Fiber `useFrame` |
| Editorial | Masked headline lines, section entrances, image clip transitions | CSS animations, one shared `IntersectionObserver` (`RevealObserver`) |
| Functional | Menus, tabs, accordions, button arrows | CSS transitions |
| Technical | Signal paths, SVG line drawing, hall plan stages | SVG and CSS; GSAP ScrollTrigger for the pinned infrastructure sequence only, loaded on demand |

Rules:
- Content is visible without JavaScript (hidden start states require `html.js`).
- Reveals never gate content. A `MutationObserver` and a timer act as safety nets.
- No scroll-jacking: only one pinned section (desktop, motion allowed).
- `prefers-reduced-motion` disables reveals, loops, the pin and the 3D intro.
- Render loops pause off-screen.

## 3D strategy

| Context | Behaviour |
|---|---|
| Desktop ≥ 1024 px, WebGL, motion allowed | Full interactive scene, lazy-loaded after first paint |
| Weak device (≤ 4 cores, ≤ 4 GB, or Save-Data) | Same scene, fewer racks, no reflector, lower DPR |
| Under 1024 px or touch tablet | Static photographic composition |
| Reduced motion | Static image in hero; data hall renders a still frame, fully commissioned |
| No WebGL | Static image. All copy is HTML outside the canvas |

There are two scenes:
- **Hero, "The connected AI world":** an agent workflow (layer A) floats over a GPU aisle (layer B), with work positions on the floor (layer C). Signals travel from the workflow input through the agents, drop into the racks and run along the fibre trays.
- **Data Centre page, "GPU floor, going live":** a 48-rack hall where a commissioning wave lights racks as they pass L5. You can drag to orbit, and pointing at a rack reports its row, rack and status in an accessible live region.

## Content hierarchy (homepage)

| # | Section |
|---|---|
| Hero | Approved headline, condensed supporting copy, two CTAs, A/B/C key |
| 01 | Trust and scale: 17 yrs, 2,500, 21, ~500 MW; certifications; client rail |
| 02 | Three capabilities, one connected advantage: sticky storytelling |
| 03 | Ecosystem dependency map (interactive) |
| 04 | Powered shell to production: pinned hall-plan sequence |
| 05 | Applications in action: tabbed, with illustrative interfaces |
| 06 | Featured work |
| 07 | Industries |
| 08 | Global delivery map |
| 09 | Technology partners |
| 10 | Insights |
| CTA → footer | |

---

## Homepage V2: "The Purview Trinity" (20 Nov 2026)

The homepage was rebuilt around the three verticals. Other routes are unchanged.

### References (Detail.so)

Reference choice was delegated in the brief ("do not stop after planning"). Two references were retrieved and combined as **details only**:

- **PAVE** (details.so/inspo/pave-3ec2bb): a full-bleed, image-led cinematic hero with the headline anchored low and the background changing state.
- **Paradigm** (details.so/inspo/paradigmai-fe0a99): a segmented tab rail on the hero's lower edge that switches the visual above it. Its mechanism file shows an 8.6 s linear progress fill on the active tab, with click switching immediately.

Nothing was copied: the layout, scene, copy and motion are original. Globant remained a quality benchmark only.

### Hero

- **One WebGL context (`TrinityScene`) with four camera and emphasis states:** overview, A applications (camera rises to the agent-workflow layer), B infrastructure (camera dives into the GPU aisle), C people (overhead view where crew routes and engineer positions light up). Transitions are per-frame easing on refs, so no React re-renders.
- **Three-way rail** (`/tech`, `/data-centre`, `/workforce`): auto-cycles every 6.5 s with a progress fill. Hover or focus takes over immediately and pauses the cycle. Click or tap navigates. Each vertical has its own accent (sky, orange, mint) and a verified proof line in a live region.
- **Fits one viewport at every tested size** (1920×1080 → 375×667). On phones the verticals sit directly under the headline as image-led tappable rows.
- **Fallbacks:** under 1024 px, touch tablets, reduced motion or no WebGL → per-vertical photographic layers. The 3D mounts only when the browser is idle.

### Scroll choreography

GSAP loads on demand. Each scene is created lazily within one viewport of the screen, during idle time.

| # | Section | Move |
|---|---|---|
| Hero | Trinity | Stage recedes into a framed panel (rAF transform) |
| 01 | Difference | Statement fills word by word (scrub); A–B–C system line draws |
| 02 | World in motion | Oversized metrics count up on drawn rules; real delivery-centre cities move with scroll |
| 03 | Purview Tech | **Pinned**: workflow assembles (request → agents → human review → output with audit log) with synced captions |
| 04 | Purview Data Centre | **Pinned**: inset rooftop-campus frame opens and pushes into the GPU aisle; callouts arrive |
| 05 | Purview Workforce | Recruit → Train → Deploy → Operate: masked image reveals, parallax, drawn path |
| 06 | Outcomes | Sticky stacked case panels; earlier panels step back (brightness, stays opaque) |
| 07 | Global trust | Map markers pop in sequence; industries index; client rail |
| 08 | Close | "Let's build what's next." The A/B/C lines converge into one signal |

Only two sections pin, both on desktop only. Mobile and reduced motion show finished static compositions. All copy is server-rendered HTML.
