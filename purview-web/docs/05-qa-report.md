# QA report (19 November 2026)

**Environment:**
- Production build (`next build` + `next start`) on Windows 11, Node 24.17.
- Playwright driving locally installed Chrome; Lighthouse 12 (npm) in headless Chrome.

These are lab results on a developer machine, not field data. Re-run on the production CDN before launch.

## Build and code

| Check | Result |
|---|---|
| `next build` | Pass: 89 routes, all prerendered (static or partial-prerender shells) |
| TypeScript (`tsc --noEmit`) | Pass, 0 errors |
| ESLint (`eslint src`, Next and React-hooks rules) | Pass, 0 problems (8 hooks findings fixed properly, no rules disabled) |

## URLs, links and status codes (`qa/links.mjs`)

| Check | Result |
|---|---|
| All 83 legacy URLs from the current sitemap | 83/83 redirect with **308** to a page returning **200** |
| Unique internal links across all 81 sitemap pages | 81 checked, all resolve. Known exception: brochure links `/resources.php?doc=…` need `LEGACY_ORIGIN` or a rebuilt library |
| Unknown URL (`/does-not-exist`, `/insights/nope`, `/cloud/extra`) | **404**, with the designed not-found page and `noindex` |
| `/sitemap.xml`, `/robots.txt` | 200, valid |

## Accessibility

**axe-core** (WCAG 2.0/2.1/2.2 A and AA rule sets), 14 pages:
- Pages: home, three verticals, company, contact, industries, our work, insights, an article, cloud, dc-why, callohm, locations.
- **0 violations on all 14.**
- The first run found: orange small text at 4.22:1, invalid tablist markup on Workforce, and link text. All fixed.

**Keyboard and interaction** (`qa/keyboard.mjs`), all 15 checks pass:
- Skip link is the first focus stop.
- Mega menu opens with Enter, closes with Escape, and returns focus to its trigger.
- The tablist supports arrow keys; the ecosystem map updates its detail.
- The mobile menu is a modal dialog with focus moved inside and Escape to close.
- Reduced motion: no WebGL and no scroll pin.
- No JavaScript: all content visible.

Not yet done: screen-reader passes (NVDA, VoiceOver) by a human tester.

## Responsive (Playwright screenshots, section by section)

| Width | Pages | Result |
|---|---|---|
| 1440 | Home, Data Centre, Tech, Workforce, cloud, dc-why, callohm | No overflow. Issues found and fixed: hero composition, rack materials, narrow headings in side columns, blank Tech page after hydration (`RevealObserver` hardened) |
| 768 | Home | No overflow. 3D replaced by the static composition below 1024 px (was overlapping text) |
| 390 | Home, Data Centre, Workforce | No overflow. Header CTA hiding fixed (CSS layer order), infra plan opens on final stage |

Not yet captured: 320 px and 1920 px.

## Lighthouse (lab, final build)

Mobile uses Lighthouse's default simulated slow 4G and 4× CPU throttling; desktop uses the desktop preset. Where runs varied, two runs are shown.

| Page | Performance | A11y | Best practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| / (mobile) | 85 / 88 | 100 | 100 | 100 | 3.1–3.2 s | 240–370 ms | 0 |
| /data-centre (mobile) | 82 / 87 | 100 | 100 | 100 | 3.0–3.1 s | 300–490 ms | 0 |
| /tech (mobile) | 86 / 88 | 100 | 100 | 100 | 2.9 s | 320–370 ms | 0 |
| /workforce (mobile) | 88 / 91 | 100 | 100 | 100 | 3.0 s | 200–300 ms | 0 |
| /contact (mobile) | 95 / 96 | 100 | 100 | 100 | 0.9 s | 210–250 ms | 0 |
| / (desktop, WebGL hero) | 73 / 76 | 100 | 100 | 100 | 0.3 s | 560–650 ms | 0 |

**Against targets:**
- **CLS ≤ 0.1:** met everywhere (0).
- **LCP ≤ 2.5 s:** not met in simulated mobile (2.9–3.2 s). The LCP element is the 2 KB header logo; the observed, unthrottled LCP breakdown is under 0.5 s. Verify with field data.
- **INP ≤ 200 ms:** not measurable in the lab. TBT is the closest proxy.

**Optimisations applied:**
- World map moved from inline SVG to a static asset. Homepage HTML went from 811 KB to 362 KB.
- GSAP loaded on demand.
- Motion removed in favour of CSS.
- `content-visibility: auto` on below-the-fold sections.
- Reflector floor replaced with a glossy material.
- WebGL mounts only when the browser is idle.
- Homepage mobile performance went from 57 to 85–88.

**Remaining:** desktop TBT comes from WebGL shader compilation. Headless Chrome on this machine probably renders WebGL on the CPU, which inflates it; this is unconfirmed. Re-measure on real hardware.

## Known console output

- `THREE.Clock: This module has been deprecated`: emitted inside `@react-three/fiber` 9.8 with three 0.187. Harmless; it'll resolve with a future fiber release.

---

## Homepage V2 QA (20 Nov 2026, production build)

| Check | Result |
|---|---|
| Build / TypeScript / ESLint | Pass / 0 errors / 0 problems |
| Scope | Only homepage files changed (`src/app/page.tsx`, `src/components/home/**`) plus QA scripts. Old homepage-only components removed. No shared component, subpage, route, form or SEO helper modified |
| Hero verticals in first viewport (`qa/hero-sizes.mjs`) | 3/3 fully visible at 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 430×932, 390×844, 375×667; no horizontal overflow |
| Hero interactions (`qa/hero-states.mjs`) | 3 selectors → `/tech`, `/data-centre`, `/workforce`; WebGL canvas mounted; each hover changes the scene state; 0 console errors |
| Keyboard / fallbacks (`qa/keyboard.mjs`) | 18/18 pass: focus activates a vertical and updates the live caption; Enter navigates; mega menu; mobile dialog; reduced motion (no WebGL, pinned content visible); no-JS |
| Links / redirects | 83/83 legacy redirects; all internal links resolve (brochure `resources.php?doc=` exception unchanged) |
| axe-core | Homepage 0 violations, including after scrolling through at 1440 and 390 (`qa/axe-home.mjs`). All 13 other audited pages still 0. Fixed: scroll-fill start state raised to ≥ 3:1 |
| Lighthouse homepage | A11y / Best practices / SEO **100 / 100 / 100**; **CLS 0**. Performance varied widely between identical runs on this machine (mobile 41–76, desktop ~50), while the unchanged `/tech` control scored a steady 86 |
| In-page measurement (`qa/scene-cost.mjs`, 4× CPU) | Mobile load ≈ 460 ms median blocking time (A/B runs), comparable to `/tech`. Desktop numbers include WebGL that headless Chrome renders on the CPU (SwiftShader), so they overstate real-GPU cost |

**Performance work done in this round:**
- GSAP is no longer created at load. Scenes are lazy and idle-deferred, with no forced `ScrollTrigger.refresh()`.
- Seven story sections are server components; motion attaches through a small client `Choreo` wrapper.
- The hero recede effect uses a `requestAnimationFrame` transform instead of GSAP.
- The reflective floor uses a glossy material instead of a reflector pass, and WebGL mounts only when the browser is idle.

**Open:** desktop Lighthouse performance is held back by WebGL start-up. Measure on real GPU hardware and in field data (CrUX) before deciding whether to simplify the hero scene further. Options: lower DPR, fewer lines, or the static hero on lower-tier devices.
