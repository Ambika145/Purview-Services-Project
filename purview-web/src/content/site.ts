/**
 * Group-level facts. Every figure carries the official source it was taken
 * from, verified on 19 November 2026. Do not edit a value without updating
 * its source; see docs/04-verification-register.md for open discrepancies.
 */

export type Fact = {
  value: string;
  /** numeric part used for the count-up animation; omit for non-numeric values */
  count?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  source: string;
};

export const FACTS = {
  years: {
    value: "17",
    count: 17,
    suffix: " yrs",
    label: "of delivery since Purview was founded in Edinburgh",
    source: "https://purviewservices.com/company.html",
  },
  people: {
    value: "2,500",
    count: 2500,
    label: "professionals across the group",
    source: "https://purviewservices.com/company.html",
  },
  countries: {
    value: "21",
    count: 21,
    label: "countries with Purview entities",
    source: "https://purviewservices.com/company.html",
  },
  capacity: {
    value: "~500 MW",
    count: 500,
    prefix: "~",
    suffix: " MW",
    label: "of AI infrastructure capacity delivered",
    source: "https://purviewservices.com/",
  },
  deliveryCentres: {
    value: "5",
    count: 5,
    label: "countries with delivery centres: UK, Poland, Singapore, Australia, India",
    source: "https://purviewservices.com/company.html",
  },
  companies: {
    value: "14",
    count: 14,
    label: "focused companies in the group",
    source: "https://purviewservices.com/company.html",
  },
  clients: {
    value: "50+",
    count: 50,
    suffix: "+",
    label: "clients, with 90% repeat business",
    source: "https://purviewservices.com/",
  },
  languages: {
    value: "30+",
    count: 30,
    suffix: "+",
    label: "languages for AI voice screening and voice agents",
    source: "https://purviewservices.com/callohm.html",
  },
  agentSuccess: {
    value: "98%",
    count: 98,
    suffix: "%",
    label: "task success in a live agentic proof of concept at a major US financial institution, against a client-defined evaluation set",
    source: "https://purviewservices.com/ai-solutions.html",
  },
} satisfies Record<string, Fact>;

export const CONTACT = {
  offices: [
    {
      id: "edinburgh",
      city: "Edinburgh",
      label: "Global headquarters",
      region: "Scotland, United Kingdom",
      address: ["4 Redheughs Rigg, South Gyle", "Edinburgh EH12 9DQ, Scotland"],
      phone: "+44 131 524 0958",
      email: "support@purviewservices.com",
    },
    {
      id: "hyderabad",
      city: "Hyderabad",
      label: "Operations headquarters",
      region: "Telangana, India",
      address: ["Building H03, Gachibowli Rd, HITEC City", "Hyderabad 500081, India"],
      phone: "+91 40 4854 9120",
      email: "contact@purviewservices.com",
    },
    {
      id: "dallas",
      city: "Dallas",
      label: "US headquarters",
      region: "Texas, United States",
      address: ["8080 N Central Expressway, Suite 1701", "Dallas, Texas 75206"],
      phone: null,
      email: "sales@purviewservices.com",
    },
  ],
  purviewDc: { email: "contact@purviewdc.com", url: "https://purviewdc.com/" },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/purviewservices" },
    { label: "X (Twitter)", href: "https://twitter.com/purviewservices" },
    { label: "Facebook", href: "https://www.facebook.com/purviewservices" },
    { label: "Instagram", href: "https://www.instagram.com/purviewservices/" },
  ],
} as const;

export const CERTIFICATIONS = [
  { name: "CMMi Level 5", detail: "Appraised at Maturity Level 5" },
  { name: "ISO 27001 · 20000 · 14001 · 9001", detail: "Information security, IT service management, environmental and quality" },
  { name: "Crown Commercial Service", detail: "UK Government supplier" },
  { name: "MSDUK", detail: "Diversity-owned, premier member" },
] as const;

/** Primary navigation. Hrefs are new routes; see src/lib/routes.ts for redirects. */
export type NavLink = { label: string; href: string; note?: string; external?: boolean };
export type NavGroup = { title: string; links: NavLink[] };

export const VERTICALS = [
  {
    id: "tech",
    layer: "A",
    name: "Purview Tech",
    role: "The applications",
    href: "/tech",
    summary: "Gen AI and agentic applications, enterprise software, data, cloud, security and managed technology.",
  },
  {
    id: "data-centre",
    layer: "B",
    name: "Purview Data Centre",
    role: "The infrastructure",
    href: "/data-centre",
    summary: "Design, build, commission and operate AI-ready data centres and GPU floors, through Purview DC.",
  },
  {
    id: "workforce",
    layer: "C",
    name: "Purview Workforce",
    role: "The people",
    href: "/workforce",
    summary: "Agentic AI recruitment and certified engineers, recruited, trained and deployed where the work is.",
  },
] as const;

export const MEGA: Record<string, NavGroup[]> = {
  tech: [
    {
      title: "AI applications",
      links: [
        { label: "AI Solutions", href: "/ai-solutions", note: "Gen AI, agentic, vision, voice, XR" },
        { label: "Edge & Vision AI", href: "/edge-vision" },
        { label: "Automation & RPA", href: "/rpa" },
        { label: "Payments & Digital Assets", href: "/payments" },
      ],
    },
    {
      title: "Engineering & platforms",
      links: [
        { label: "Digital Product Engineering", href: "/digital-engineering" },
        { label: "Data & Analytics", href: "/data-analytics" },
        { label: "Cloud Services", href: "/cloud" },
        { label: "Cybersecurity", href: "/cybersecurity" },
        { label: "Embedded Engineering & IoT", href: "/embedded" },
        { label: "Audio Visual & Collaboration", href: "/av" },
      ],
    },
    {
      title: "Managed technology",
      links: [
        { label: "Managed IT Services", href: "/managed" },
        { label: "Infrastructure Managed Services", href: "/infra-managed" },
        { label: "Managed Security Services", href: "/security-managed" },
        { label: "Help Desk Services", href: "/helpdesk" },
        { label: "Consulting & Advisory", href: "/advisory" },
      ],
    },
  ],
  "data-centre": [
    {
      title: "Purview DC",
      links: [
        { label: "Services: eight stages", href: "/dc-services" },
        { label: "Delivery model", href: "/dc-delivery" },
        { label: "Solutions & platforms", href: "/dc-solutions" },
        { label: "Why Purview DC", href: "/dc-why" },
      ],
    },
    {
      title: "Capabilities",
      links: [
        { label: "AI Infrastructure", href: "/ai-infrastructure" },
        { label: "Data Centre Development", href: "/dc-development" },
        { label: "Structured Cabling & Smart Hands", href: "/dc-cabling" },
        { label: "Network Solutions", href: "/dc-networks" },
        { label: "GigaPort", href: "/gigaport", note: "Bonded AI hardware hub, Hyderabad" },
      ],
    },
    {
      title: "Go direct",
      links: [{ label: "purviewdc.com", href: "https://purviewdc.com/", external: true, note: "The Purview DC website" }],
    },
  ],
  workforce: [
    {
      title: "Platforms",
      links: [
        { label: "RabbiT AI Recruitment", href: "/rabbit", note: "Agentic voice screening, 30+ languages" },
        { label: "BeeRef Referral Hiring", href: "/beeref" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Recruit, Train, Deploy", href: "/rtd" },
        { label: "Volume, Contract & Perm Recruitment", href: "/volume-recruitment" },
        { label: "Offshore & Nearshore Solutions", href: "/offshore" },
        { label: "Time-based & SOW Delivery", href: "/sow" },
        { label: "Contract Payroll", href: "/payroll" },
      ],
    },
    {
      title: "Insight",
      links: [
        { label: "Discovery Audits", href: "/audits" },
        { label: "Market Insights", href: "/market-insights" },
      ],
    },
  ],
};

export const PRIMARY_NAV: { label: string; href: string; mega?: "solutions" | "company" }[] = [
  { label: "Solutions", href: "/tech", mega: "solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Our Work", href: "/our-work" },
  { label: "Company", href: "/company", mega: "company" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

export const COMPANY_LINKS: NavLink[] = [
  { label: "About & leadership", href: "/company" },
  { label: "Products & platforms", href: "/products" },
  { label: "Platforms & IP", href: "/platforms-ip" },
  { label: "Engineering & innovation", href: "/innovation" },
  { label: "Global delivery", href: "/global-delivery" },
  { label: "Locations", href: "/locations" },
  { label: "Trust, security & compliance", href: "/trust" },
  { label: "Brochures & resources", href: "/resources" },
  { label: "Carbon Reduction Plan", href: "/carbon-reduction-plan" },
  { label: "Technology partners", href: "/company#partners" },
];

export const INDUSTRY_LINKS: NavLink[] = [
  { label: "Banking & Financial Services", href: "/bfsi" },
  { label: "Government & Public Sector", href: "/public-sector" },
  { label: "Healthcare & Life Sciences", href: "/healthcare" },
  { label: "Wireless & Telecommunications", href: "/telecom" },
  { label: "FMCG & Manufacturing", href: "/manufacturing" },
  { label: "Media & Entertainment", href: "/media" },
  { label: "Retail & Distribution", href: "/retail" },
  { label: "Travel, Transportation & Facilities", href: "/travel" },
];

/**
 * The group companies — names, sectors, one-liners, links and logos exactly as
 * published in "The companies." on purviewservices.vercel.app. Companies with
 * no `href` have no public website listed there.
 */
export const GROUP_COMPANIES: { name: string; sector: string; line: string; href?: string; logo: string; w: number; h: number }[] = [
  { name: "Purview Technologies", sector: "Technology", line: "Transforming reality.", href: "https://www.purviewtech.ai/", logo: "/logos/companies/tech-pur.png", w: 64, h: 64 },
  { name: "Purview Data Centers", sector: "Data centres", line: "AI-ready data centres, designed, built and operated.", href: "https://purviewdc.com/", logo: "/logos/companies/purview-dc.png", w: 56, h: 64 },
  { name: "Purview Healthcare", sector: "Healthcare", line: "Revenue cycle management.", href: "https://purviewhealthcare.com/", logo: "/logos/companies/healthcare-icon.png", w: 62, h: 64 },
  { name: "Purview Lifesciences", sector: "Deep services", line: "Manufacturer of solvent distillation and intermediates.", href: "https://purviewlifesciences.com/", logo: "/logos/companies/lifesciences-icon.png", w: 59, h: 64 },
  { name: "Edgeflex", sector: "Deeptech", line: "Design and manufacture of your products.", logo: "/logos/companies/edge.png", w: 64, h: 64 },
  { name: "Castlematic", sector: "IoT", line: "Real-time GPS fleet tracking software.", href: "https://castlematic.com/", logo: "/logos/companies/castlematic-icon.png", w: 48, h: 64 },
  { name: "Simple I8", sector: "Deeptech", line: "Cloud-based SaaS solution.", href: "http://simplei8.com/", logo: "/logos/companies/simplei8-icon.png", w: 64, h: 64 },
  { name: "EFUNDZZ", sector: "Deeptech", line: "SME lending marketplace.", href: "https://efundzz.com/", logo: "/logos/companies/efundzz-icon.png", w: 44, h: 64 },
  { name: "Benepay", sector: "Deeptech", line: "Simplifying your payments.", href: "https://www.benepay.io/", logo: "/logos/companies/benepay.png", w: 64, h: 64 },
  { name: "iPhysicianHub", sector: "Deeptech", line: "The healthcare hub.", href: "https://www.iphysicianhub.com/", logo: "/logos/companies/iphysicianhub-icon.png", w: 62, h: 64 },
  { name: "Telehealth Center", sector: "Deeptech", line: "A comprehensive digital clinic.", logo: "/logos/companies/telehealthcenter-icon.png", w: 40, h: 64 },
  { name: "Purview Digital", sector: "Marketing", line: "Marketing and advertising agency.", href: "https://www.purviewdigital.com/", logo: "/logos/companies/purview-digital-icon.png", w: 62, h: 64 },
  { name: "2080", sector: "Marketing", line: "Full-stack marketing agency.", logo: "/logos/companies/2080.png", w: 45, h: 64 },
];
