# Verification register: facts, sources and open items

Everything on the new site comes from these official sources, read on 19 November 2026:
- purviewservices.com (all 83 URLs in its sitemap)
- purviewdc.com (homepage)
- purviewtech.ai (homepage)

**Nothing has been invented, rounded or embellished.** Items below need sign-off before launch.

## 1. Headline figures used on the site

| Figure | Wording used | Source |
|---|---|---|
| 17 years | "Backed by 17 years of experience"; founded in Edinburgh "over seventeen years ago" | purviewservices.com/, /company.html |
| 2,500 | "2,500 professionals / people across 21 countries" | /company.html, /workforce.html |
| 21 countries | "21 countries with Purview entities" | /locations.html, /company.html |
| ~500 MW | "approximately 500 MW of AI infrastructure capacity delivered" | purviewservices.com/, purviewdc.com |
| 98% | "98% task success against the agreed evaluation set" (major US financial institution, live agentic POC) | /, /ai-solutions.html |
| 30+ languages | Voice screening and voice agents | /rabbit.html, /callohm.html |
| 50+ clients, 90% repeat | "Trusted by 50+ clients, with 90% repeat business" | purviewservices.com/ |
| 2,500+ racks, 185,000+ cables, 55+ countries, 300 MW+ pipeline | As published | /dc-why.html, purviewdc.com |
| 8 delivery centres, 5 countries, 24 cities | As published | /locations.html |
| Service-page measures (for example 20–40% cloud spend reduction, 2-week release cadence, 40–60% offshore cost reduction) | Shown with each page's own wording ("typical", "target") | Each service page |

## 2. Discrepancies to resolve

| # | Item | Conflict | What the new site does |
|---|---|---|---|
| D1 | **AI devices installed** | purviewdc.com: **48,500+**. purviewservices.com/dc-why.html: **28,500+**. Brief: 48,500+ | Left off all new bespoke sections. `/dc-why` still shows 28,500+ verbatim, as currently published. **Confirm the correct figure.** |
| D2 | **Years of experience** | purviewservices.com: **17 years**. purviewdc.com: **"more than 16 years" / "16+ yrs"** | Uses 17 (the group site's approved wording). Align purviewdc.com. |
| D3 | **CEO quote attribution** | purviewdc.com: the image alt says "Reddy Punna, Founder and Group Chairman", but the caption says "James Hatcher, CEO, Purview Data Centres". /dc-why.html attributes a similar quote to Reddy Punna, "Founder and Group CEO" | The quote isn't used in new sections. `/dc-why` keeps its published attribution. **Confirm the speaker and title.** |
| D4 | **Reddy Punna's title** | "Founder and Group CEO" (company.html) vs "Founder and Group Chairman" (purviewdc.com alt text). Company page also lists "Sai — Group Chairman" | Uses company.html wording. |
| D5 | **Footprint country list** | Company page lists 22 places across regions (including Hong Kong) against the headline "21 countries" | The map shades the listed places and is captioned "countries listed in the group's global footprint". |
| D6 | **"Dr Hem"** | Photo present in company.html markup with no visible name or title card | Not shown. Confirm whether he should appear. |
| D7 | **"Purview Tech" naming** | The brief's vertical name "Purview Tech" collides with **Purview Technologies** (purviewtech.ai), the group's AI XR company. purviewtech.ai claims "50+ Global Clients, 99% Uptime SLA, 30% Faster Resolution", which aren't used | The vertical is labelled "Purview Tech · the applications" and links to purviewtech.ai only for XR. **Brand should confirm the vertical name.** |
| D8 | **Testimonial** | The RabbiT page carries an unattributed quote ("Head of Talent, high-growth SaaS client") | Not reused in new sections. The `/rabbit` preserved page keeps it as published. |

## 3. Illustrative and third-party assets

| Asset | Origin | Status |
|---|---|---|
| `public/img/*.jpg` (industry, service, location, workforce imagery) | purviewservices.com `/assets/gen/`: generated artwork the current site already labels as illustrative | Labelled "Illustrative imagery" on every placement. Confirm licence and terms for generated assets. |
| `dc-corridor-*.jpg`, `dc-campus-city.jpg`, `signal-wave.jpg` | Supplied in the project `Assets/` folder (WhatsApp exports) | **Licence unknown.** Confirm the source and licence before launch, or replace. Labelled illustrative. |
| Assets folder: Hypercubic, Floava, globe UI, network graph, NVIDIA GB200 render | Screenshots of third-party sites or vendor marketing | **Not used**: reference only, or third-party brand. |
| `dc-receiving-staging.jpg`, `dc-dcd-digital-twin.jpg` | purviewdc.com: real Purview DC photo and product screenshot | Captioned with source. |
| `public/logos/*.png` (132 client, partner and certification logos) | Exactly as displayed on purviewservices.com | Reused as published. Confirm logo-usage permissions are still current. |
| `public/team/*.jpg` | purviewservices.com/company.html | Reused as published. |
| Purview logo (white, navy) | Official white PNG; navy is a recolour of the same alpha mask | Supply SVG master artwork if available. |
| World map | Natural Earth 1:110m (public domain) via the `world-atlas` package | Free to use. |
| 3D scenes, interface mock-ups, hall plan, workflow schematic | Original to this project | Labelled "Illustrative" or "Schematic"; not product screenshots. |

## 4. Claims deliberately not made

- No invented client logos, names, endorsements, ratings or review stars.
- No publication dates other than the published "10 November 2026" on the four blog posts.
- No `lastModified` dates in the sitemap.
- Interface mock-ups for SAIE, CallOHM, RabbiT and T-Wallet carry "Illustrative interface · not a product screenshot".
- Engineering arrangements in 3D and diagrams are captioned "illustrative model" or "schematic · not to scale".
