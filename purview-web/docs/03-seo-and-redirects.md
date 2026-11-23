# SEO: baseline, architecture, keyword mapping and redirects

## 1. Baseline (current site, 19 Nov 2026)

- 83 URLs in `sitemap.xml`, all `.html` (plus `resources.php`).
- Every page has a unique `<title>` (`<Page> | Purview Services`), a meta description and a self-referencing canonical.
- Homepage: `Purview Services | AI Applications and AI Infrastructure`. The `en-GB` locale and Open Graph and Twitter cards are present.
- Strengths: clear H1s, descriptive service pages with FAQs, and strong internal "Related" links.
- Gaps found:
  - Two near-duplicate Purview DC pages (`purview-dc.html`, `purviewdc.html`) compete with each other and with purviewdc.com.
  - `blog.html` and `insights.html` overlap.
  - `technologies.html` and the vertical story overlap.
  - Some pages have no H1 (`purview-dc.html`).
  - Brochures sit behind JS and email gates.

## 2. What the new build implements

| Item | Implementation |
|---|---|
| Server-rendered, crawlable content | All 88 routes prerendered as static HTML (`next build`). Copy is never inside a canvas |
| Titles and descriptions | Unique per route. Preserved pages keep their exact current title and description |
| Canonicals | `alternates.canonical` on every route, using the `metadataBase` https://purviewservices.com |
| Open Graph / Twitter | Per page, with a default `/og/purview-og.jpg` (1200×630) |
| Sitemap | `/sitemap.xml`: 81 indexable URLs, no invented `lastModified` |
| robots | `/robots.txt`: allow all, sitemap reference |
| Structured data | `Organization` and `WebSite` (site-wide); `BreadcrumbList` (every inner page); `Service` (verticals and preserved service pages); `Article` (insights, with published date). No ratings or reviews |
| Breadcrumbs | Visible and in JSON-LD |
| Headings | One H1 per page; sections are H2, items H3 |
| Images | `next/image` (AVIF/WebP), descriptive alt text or `alt=""` for decorative images, explicit dimensions (CLS 0) |
| Redirects | 308 permanent for all 83 legacy URLs, plus extensionless aliases for consolidated pages (table below) |

## 3. Architecture and cannibalisation

- **purviewservices.com** is the group site and the hub for all three verticals.
- **/data-centre** is the group-level summary of Purview DC. It links to **purviewdc.com** for the full catalogue and enquiries. This keeps transactional "AI data centre services" intent pointed at purviewdc.com. **Recommendation:** cross-canonical policy and anchor text agreed between the two domains, and purviewdc.com linking back to `/data-centre` for group context.
- purviewtech.ai (Purview Technologies, AI XR) is linked from the XR and Nexable contexts only.

## 4. Keyword-to-page mapping (research seeds, not validated)

No keyword-volume tool with access to these terms was available in this session; the connected Ahrefs MCP only serves demo domains. **Validate these before treating them as targets.**

| Topic cluster (seed) | Primary page | Supporting pages |
|---|---|---|
| AI data centre services / AI data centre design and build | /data-centre | /dc-services, /dc-development, purviewdc.com |
| GPU deployment services / GPU rack and stack | /data-centre (#gpu) | /ai-infrastructure, /dc-delivery |
| Data centre commissioning (L2–L5, IST) | /data-centre (#commission) | /dc-delivery, /insights/preparation-first-gpu-deployment |
| AI infrastructure engineering | /ai-infrastructure | /data-centre, /dc-networks, /dc-cabling |
| Enterprise agentic AI solutions | /tech | /ai-solutions, /insights/agentic-ai-governed-workflows |
| Generative AI development / enterprise AI applications | /ai-solutions | /tech |
| AI voice agents | /callohm | /tech |
| AI-powered recruitment / AI voice screening | /rabbit | /workforce |
| Engineering workforce solutions / certified data centre technicians | /workforce | /rtd, /volume-recruitment |
| Offshore and nearshore delivery | /offshore | /workforce |
| IT managed services | /managed | /infra-managed, /helpdesk, /insights/managed-services-ai-era |

## 5. Suggested metadata (implemented)

| Route | Title | Description (abridged) |
|---|---|---|
| / | Purview Services \| AI Applications and AI Infrastructure | Unchanged from current site |
| /tech | Enterprise Agentic AI, Gen AI & Technology Services \| Purview Services | Enterprise Gen AI and agentic applications that run inside your data boundary… |
| /data-centre | AI Data Centre Design, GPU Deployment & Commissioning \| Purview Services | Purview DC designs, installs, commissions and operates AI data centres… |
| /workforce | Workforce Solutions: AI Recruitment & Certified Engineers \| Purview Services | 2,500 professionals across 21 countries, hired by our own agentic AI platform… |

## 6. Internal linking strategy

- **Hub and spoke:** each vertical links to every one of its service pages (mega menu, footer and in-page). Every preserved page keeps its original "Related" links, remapped to the new URLs.
- **Cross-layer links** express the dependencies that differentiate Purview: the ecosystem map (A↔B↔C), Recruit-Train-Deploy → Purview DC, AI Solutions → AI Infrastructure, and the insights articles linked from their vertical.
- **Descriptive anchors only.** Lighthouse's link-text audit passes on all pages tested.

## 7. Content gap recommendations

1. Dedicated case-study pages, one per featured engagement, with the fields challenge, scope, outcome and capability. Today they exist only as short panels.
2. Glossary or explainer content for commissioning levels (L2–L5, IST), GPU platform generations and liquid cooling. This is high informational intent and naturally supports /data-centre.
3. A "How we work" page for agentic AI evaluation methodology (referenced, but not public).
4. Location pages per delivery centre: local intent for careers and engagements.
5. Ungated summaries of the brochures in `/resources` (currently email-gated PDFs).

## 8. Technical SEO checklist before launch

- [ ] Confirm production domain and `SITE_URL` (`src/lib/routes.ts`).
- [ ] Deploy redirects; spot-check with `node qa/links.mjs`.
- [ ] Set `LEGACY_ORIGIN` (or rebuild the brochure library) so `/resources.php?doc=…` keeps working.
- [ ] Submit the new sitemap in Google Search Console; monitor coverage and 404s for 4–6 weeks.
- [ ] Keep the old `/sitemap.xml` URLs redirecting for at least 12 months.
- [ ] Re-run Lighthouse on the production CDN; field-check Core Web Vitals in CrUX and Search Console.
- [ ] Align purviewdc.com canonicals and figures (see verification register D1–D3).

## 9. Redirect table (all 308 permanent)

Generated from `src/content/legacy/_index.json`. `next.config.ts` builds the same table at build time. Extensionless aliases also redirect: `/purview-dc`, `/purviewdc`, `/technologies`, `/customer-success`, `/divisions`, `/blog`, `/blog-*`.

| Old URL | New URL | Treatment | Old title |
|---|---|---|---|
| /index.html | / | Bespoke | Purview Services · AI Applications and AI Infrastructure |
| /advisory.html | /advisory | Preserved content, new template | Consulting & Advisory · Purview Services |
| /ai-infrastructure.html | /ai-infrastructure | Preserved content, new template | AI Infrastructure · Purview Services |
| /ai-solutions.html | /ai-solutions | Preserved content, new template | AI Solutions · Purview Services |
| /app-managed.html | /app-managed | Preserved content, new template | Managed Application Services · Purview Services |
| /audits.html | /audits | Preserved content, new template | Discovery Audits · Purview Services |
| /av.html | /av | Preserved content, new template | Audio Visual & Collaboration · Purview Services |
| /beeref.html | /beeref | Preserved content, new template | BeeRef Referral Hiring · Purview Services |
| /benepay.html | /benepay | Preserved content, new template | BenePay · Purview Services |
| /bfsi.html | /bfsi | Preserved content, new template | Banking & Financial Services · Purview Services |
| /blog-agentic-ai-governed-workflows.html | /insights/agentic-ai-governed-workflows | Consolidated (bespoke) | Running Agentic AI in Production · Purview Services |
| /blog-managed-services-ai-era.html | /insights/managed-services-ai-era | Consolidated (bespoke) | Managed Services for the AI Era · Purview Services |
| /blog-preparation-first-gpu-deployment.html | /insights/preparation-first-gpu-deployment | Consolidated (bespoke) | Preparation-First GPU Deployment · Purview Services |
| /blog-why-the-agent-needs-the-floor.html | /insights/why-the-agent-needs-the-floor | Consolidated (bespoke) | Why the AI Agent Needs the Floor · Purview Services |
| /blog.html | /insights | Consolidated (bespoke) | Blog: AI and Data Centre Insights · Purview Services |
| /callohm.html | /callohm | Preserved content, new template | CallOHM · Purview Services |
| /carbon-reduction-plan.html | /carbon-reduction-plan | Preserved content, new template | Carbon Reduction Plan · Purview Services |
| /careers.html | /careers | Preserved content, new template | Careers · Purview Services |
| /castlematic.html | /castlematic | Preserved content, new template | Castlematic · Purview Services |
| /cloud.html | /cloud | Preserved content, new template | Cloud Services · Purview Services |
| /company.html | /company | Bespoke redesign | About Us & Leadership · Purview Services |
| /contact.html | /contact | Bespoke redesign | Contact Us · Purview Services |
| /customer-success.html | /our-work | Consolidated (bespoke) | Customer Success · Purview Services |
| /cybersecurity.html | /cybersecurity | Preserved content, new template | Cybersecurity · Purview Services |
| /data-analytics.html | /data-analytics | Preserved content, new template | Data & Analytics · Purview Services |
| /dc-cabling.html | /dc-cabling | Preserved content, new template | Structured Cabling & Smart Hands · Purview Services |
| /dc-delivery.html | /dc-delivery | Preserved content, new template | Purview DC Delivery Model · Purview Services |
| /dc-development.html | /dc-development | Preserved content, new template | Data Centre Development · Purview Services |
| /dc-networks.html | /dc-networks | Preserved content, new template | Network Solutions · Purview Services |
| /dc-services.html | /dc-services | Preserved content, new template | Purview DC Services · Purview Services |
| /dc-solutions.html | /dc-solutions | Preserved content, new template | Purview DC Solutions · Purview Services |
| /dc-why.html | /dc-why | Preserved content, new template | Why Purview DC · Purview Services |
| /dev-managed.html | /dev-managed | Preserved content, new template | Managed Software Development · Purview Services |
| /digital-engineering.html | /digital-engineering | Preserved content, new template | Digital Product Engineering · Purview Services |
| /divisions.html | /products | Consolidated (bespoke) | Products · Purview Services |
| /edge-vision.html | /edge-vision | Preserved content, new template | Edge & Vision AI · Purview Services |
| /efundzz.html | /efundzz | Preserved content, new template | EFUNDZZ · Purview Services |
| /embedded.html | /embedded | Preserved content, new template | Embedded Engineering & IoT · Purview Services |
| /gigaport.html | /gigaport | Preserved content, new template | GigaPort · Purview Services |
| /global-delivery.html | /global-delivery | Preserved content, new template | Global Delivery & Operations · Purview Services |
| /healthcare.html | /healthcare | Preserved content, new template | Healthcare & Life Sciences · Purview Services |
| /helpdesk.html | /helpdesk | Preserved content, new template | Help Desk Services · Purview Services |
| /industries.html | /industries | Bespoke redesign | Industries · Purview Services |
| /infra-managed.html | /infra-managed | Preserved content, new template | Infrastructure Managed Services · Purview Services |
| /innovation.html | /innovation | Preserved content, new template | Engineering & Innovation · Purview Services |
| /insights.html | /insights | Bespoke redesign | Insights & Perspectives · Purview Services |
| /it-support.html | /it-support | Preserved content, new template | Managed IT Support · Purview Services |
| /locations.html | /locations | Bespoke redesign | Locations · Purview Services |
| /managed.html | /managed | Preserved content, new template | Managed IT Services · Purview Services |
| /manufacturing.html | /manufacturing | Preserved content, new template | FMCG & Manufacturing · Purview Services |
| /market-insights.html | /market-insights | Preserved content, new template | Market Insights · Purview Services |
| /media.html | /media | Preserved content, new template | Media & Entertainment · Purview Services |
| /nexable.html | /nexable | Preserved content, new template | Nexable · Purview Services |
| /offshore.html | /offshore | Preserved content, new template | Offshore & Nearshore Solutions · Purview Services |
| /payments.html | /payments | Preserved content, new template | Payments & Digital Assets · Purview Services |
| /payroll.html | /payroll | Preserved content, new template | Contract Payroll · Purview Services |
| /platforms-ip.html | /platforms-ip | Preserved content, new template | Platforms & IP · Purview Services |
| /privacy-policy.html | /privacy-policy | Preserved content, new template | Privacy Policy · Purview Services |
| /public-sector.html | /public-sector | Preserved content, new template | Government & Public Sector · Purview Services |
| /purview-dc.html | /data-centre | Consolidated (bespoke) | Purview DC · Purview Services |
| /purviewdc.html | /data-centre | Consolidated (bespoke) | Purview DC AI Data Centres · Purview Services |
| /purviewdigital.html | /purviewdigital | Preserved content, new template | Purview Digital · Purview Services |
| /purviewhealthcare.html | /purviewhealthcare | Preserved content, new template | Purview Healthcare · Purview Services |
| /purviewlifesciences.html | /purviewlifesciences | Preserved content, new template | Purview Lifesciences · Purview Services |
| /qa-managed.html | /qa-managed | Preserved content, new template | Managed QA Services · Purview Services |
| /rabbit.html | /rabbit | Preserved content, new template | RabbiT AI Recruitment · Purview Services |
| /resources.php | /resources | Preserved content, new template | Brochures & Resources · Purview Services |
| /retail.html | /retail | Preserved content, new template | Retail & Distribution · Purview Services |
| /rpa.html | /rpa | Preserved content, new template | Automation & RPA · Purview Services |
| /rtd.html | /rtd | Preserved content, new template | Recruit, Train, Deploy · Purview Services |
| /security-managed.html | /security-managed | Preserved content, new template | Managed Security Services · Purview Services |
| /smartcare.html | /smartcare | Preserved content, new template | SmartCare · Purview Services |
| /smartinspect.html | /smartinspect | Preserved content, new template | SmartInspect · Purview Services |
| /smartpick.html | /smartpick | Preserved content, new template | SmartPick · Purview Services |
| /smartsurveillance.html | /smartsurveillance | Preserved content, new template | SmartSurveillance · Purview Services |
| /sow.html | /sow | Preserved content, new template | Time-based & SOW Delivery · Purview Services |
| /technologies.html | /tech | Consolidated (bespoke) | Technologies · Purview Services |
| /telecom.html | /telecom | Preserved content, new template | Wireless & Telecommunications · Purview Services |
| /travel.html | /travel | Preserved content, new template | Travel, Transportation & Facilities · Purview Services |
| /trust.html | /trust | Preserved content, new template | Trust, Security & Compliance · Purview Services |
| /twallet.html | /twallet | Preserved content, new template | T-Wallet · Purview Services |
| /volume-recruitment.html | /volume-recruitment | Preserved content, new template | Volume, Contract & Perm Recruitment · Purview Services |
| /workforce.html | /workforce | Bespoke redesign | Workforce Solutions · Purview Services |
