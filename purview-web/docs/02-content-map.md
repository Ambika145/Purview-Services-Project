# Content map: current site → revamp

Every one of the 83 URLs in purviewservices.com/sitemap.xml has a home on the new site.

## Approach

There are three treatments:

1. **Bespoke redesign:** new layout and condensed copy, with all claims kept.
2. **Consolidated:** content merged into a new bespoke page.
3. **Preserved:** content extracted verbatim and rendered in the new editorial template.

`scripts/extract-content.py` produces the preserved content as typed JSON in `src/content/legacy/`. "Sample" dashboard mock-ups on the old pages are dropped because their numbers are illustrative. Generic filler lines are removed. Everything else is kept: headings, paragraphs, stats, lists, steps, cases, FAQs, partner logos and related links.

## Bespoke and consolidated pages

| New route | Built from (old pages) | Sections and source content |
|---|---|---|
| `/` | index.html (+ customer-success, industries, company, locations, blog) | Approved headline unchanged. Intro condensed. "What we do" → three verticals. "Twelve capabilities, one gravitational centre" → ecosystem dependency map. Purview DC investment block → infrastructure sequence (purviewdc.com six phases and eight stages). Products → applications showcase (ai-solutions, callohm, rabbit, edge-vision, twallet). "Outcomes, not effort" five cases → featured work, verbatim. Industries copy and clients → industries. Locations → map. Partner groups → partners. Blog → insights. "Start here" → closing CTA. |
| `/tech` (Purview Tech) | technologies.html (consolidated), ai-solutions.html, callohm, nexable, service pages | AI-first positioning (ai-solutions); ten capabilities, verbatim titles and summaries; four-step method; 98% case; voice, vision and XR; practice cards with each page's published measure; products (divisions.html); industries; outcomes; FAQ (ai-solutions) |
| `/data-centre` (Purview Data Centre) | purview-dc.html and purviewdc.html (both consolidated), dc-services, dc-delivery, dc-why, dc-development, dc-cabling, dc-networks, purviewdc.com | Value proposition and audiences (purviewdc.html); eight stages (dc-services); capability chapters (facility, GPU, commissioning, network and cabling, operations); six phases and four gates and the India route (dc-delivery); four platforms (dc-solutions); proof points and development register (dc-why, dc-development); track record table (dc-why); FAQ (purviewdc.com) |
| `/workforce` (Purview Workforce) | workforce.html, rtd, rabbit, beeref, volume-recruitment, offshore, sow, payroll, audits, market-insights | Operating model: Recruit, Train, Deploy, Operate (rtd plus workforce); RabbiT flow, features and security (rabbit); BeeRef (beeref); certified workforce case (rtd); services; delivery models (offshore, payroll); proof (offshore, rtd, payroll); FAQ (rtd, rabbit) |
| `/company` | company.html | Story, quote, 11 leaders (names and titles verbatim), certifications, footprint, all partner groups (`#partners` anchor kept) |
| `/contact` | contact.html | Same form fields and three offices. Purview DC panel |
| `/industries` | industries.html | Eight sectors, descriptions and client lists verbatim |
| `/our-work` | customer-success.html (consolidated) | Five featured cases plus five "selected delivery stories", verbatim; NDA wording kept |
| `/insights` | blog.html and insights.html (consolidated) | Four published articles plus the LinkedIn article |
| `/insights/<slug>` | blog-*.html (4) | Full article text, byline, date and read time as published |
| `/locations` | locations.html | Map, cities (imagery labelled as on the current site), offices |
| `/products` | divisions.html (consolidated) | Preserved verbatim |

## Preserved pages (new template, content unchanged)

| Group | Routes |
|---|---|
| Technologies | /ai-solutions /ai-infrastructure /digital-engineering /data-analytics /cloud /cybersecurity /edge-vision /embedded /payments /rpa /av |
| Managed IT | /managed /infra-managed /app-managed /dev-managed /qa-managed /security-managed /helpdesk /it-support |
| Workforce | /rabbit /beeref /rtd /volume-recruitment /offshore /sow /payroll /audits /market-insights |
| Purview DC | /dc-services /dc-delivery /dc-solutions /dc-why /dc-development /dc-cabling /dc-networks /gigaport |
| Industries | /bfsi /public-sector /healthcare /telecom /manufacturing /media /retail /travel |
| Products | /callohm /nexable /twallet /benepay /efundzz /castlematic /smartcare /smartinspect /smartpick /smartsurveillance /purviewdigital /purviewhealthcare /purviewlifesciences |
| Company | /careers /trust /global-delivery /innovation /platforms-ip /advisory /resources /carbon-reduction-plan /privacy-policy |

**Next step:** promote high-value preserved pages (for example `/ai-solutions`, `/rabbit`, `/callohm`, `/gigaport`) to bespoke designs using the same page kit.
