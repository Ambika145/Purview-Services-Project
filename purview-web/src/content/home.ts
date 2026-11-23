/**
 * Homepage content. Copy is taken or condensed from the published pages on
 * purviewservices.com (source noted per item). Imagery marked `illustrative`
 * is the generated artwork already used on the current site, or stock
 * supplied in the project Assets folder; it does not depict real projects.
 */

export const HERO = {
  eyebrow: "AI applications · AI infrastructure",
  // Verbatim from purviewservices.com/index.html
  line1: { before: "We build ", em: "intelligent applications", after: "." },
  line2: { before: "And the ", em: "infrastructure", after: " they run on." },
  body: "Most technology companies do one or the other. Purview does both: delivering GenAI and agentic applications for enterprises and governments, while designing, building and operating the AI-ready data centres, networks and devices that power them.",
  proof: "Backed by 17 years of experience and approximately 500 MW of AI infrastructure capacity delivered, we bring application and infrastructure expertise together in one team.",
  tagline: "One technology partner. From application to infrastructure.",
};

export type Vertical = {
  id: "tech" | "data-centre" | "workforce";
  layer: "A" | "B" | "C";
  name: string;
  role: string;
  headline: string;
  body: string;
  points: string[];
  stats: { value: string; label: string }[];
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
  source: string;
};

export const VERTICAL_STORY: Vertical[] = [
  {
    id: "tech",
    layer: "A",
    name: "Purview Tech",
    role: "The applications",
    headline: "AI that passes security review and keeps working in production.",
    body: "Gen AI, agentic, vision, voice and XR systems that run inside your data boundary, log every action and survive the next model change, alongside the enterprise software, data, cloud and security estates they depend on.",
    points: [
      "Gen AI and agentic applications on SAIE, the Secure AI Engine",
      "Voice agents in 30+ languages through CallOHM",
      "Edge & vision AI, embedded and XR",
      "Digital product engineering, data & analytics",
      "Cloud, cybersecurity and managed technology services",
    ],
    stats: [
      { value: "98%", label: "task success in a live agentic POC at a major US financial institution" },
      { value: "4–6 wks", label: "from problem statement to a working slice on your data" },
    ],
    cta: { label: "Explore Purview Tech", href: "/tech" },
    source: "https://purviewservices.com/ai-solutions.html",
  },
  {
    id: "data-centre",
    layer: "B",
    name: "Purview Data Centre",
    role: "The infrastructure",
    headline: "Powered shell to production. One accountable partner.",
    body: "Purview DC designs, builds and operates AI-ready capacity, and deploys GPU floors for hyperscalers, neoclouds, sovereign programmes and enterprises. The density, cooling and power decisions are made by people who know what the workload actually does.",
    points: [
      "AI data centre parks and facilities: design, build, power",
      "GPU rack and stack, cabling and optics, HGX and GB-class clusters",
      "L2 to L5 commissioning and integrated systems testing",
      "24×7 smart hands, NOC and hyperscaler-grade operations",
    ],
    stats: [
      { value: "~500 MW", label: "AI data centre capacity delivered" },
      { value: "8 stages", label: "from powered shell to steady-state operations" },
    ],
    cta: { label: "Explore Data Centre Solutions", href: "/data-centre" },
    secondary: { label: "purviewdc.com", href: "https://purviewdc.com/" },
    source: "https://purviewservices.com/",
  },
  {
    id: "workforce",
    layer: "C",
    name: "Purview Workforce",
    role: "The people",
    headline: "The people side of delivery.",
    body: "2,500 professionals across 21 countries, hired by our own agentic AI platform, certified in our labs and deployed on our floors and yours.",
    points: [
      "RabbiT: agentic AI recruitment, voice screening in 30+ languages",
      "BeeRef: referral hiring from first share to final reward",
      "Recruit, Train, Deploy: certified engineers, floor-ready",
      "Volume, contract and permanent recruitment",
      "Offshore & nearshore delivery, SOW teams and contract payroll",
    ],
    stats: [
      { value: "10–12", label: "technicians per certified lead engineer" },
      { value: "4–12 wks", label: "lab training on real racks before deployment" },
    ],
    cta: { label: "Explore Workforce Solutions", href: "/workforce" },
    source: "https://purviewservices.com/workforce.html",
  },
];

/* ---------------------------------------------------------------------
   Ecosystem map: "Each capability exists because the one next to it needs it."
   Nodes are the capabilities listed on the current homepage and Workforce
   page. Edges express dependencies described in the published copy.
   --------------------------------------------------------------------- */
export type EcoNode = { id: string; layer: "A" | "B" | "C"; label: string; href: string; blurb: string };

export const ECO_NODES: EcoNode[] = [
  { id: "genai", layer: "A", label: "Gen AI & agentic AI", href: "/ai-solutions", blurb: "Agents that complete multi-step work with human review where it matters, on the Secure AI Engine." },
  { id: "data", layer: "A", label: "Data & analytics", href: "/data-analytics", blurb: "Governed, AI-ready data platforms: AI is only as good as the data under it." },
  { id: "dpe", layer: "A", label: "Digital product engineering", href: "/digital-engineering", blurb: "Cloud-native applications, experience design and quality engineering for products that ship every week." },
  { id: "payments", layer: "A", label: "Payments & digital assets", href: "/payments", blurb: "Payment platforms, wallets and digital asset systems for regulated, national-scale volumes." },
  { id: "rpa", layer: "A", label: "Automation & RPA", href: "/rpa", blurb: "From scripted bots to agentic workflows, on the platforms you already own." },
  { id: "managed", layer: "A", label: "Managed IT services", href: "/managed", blurb: "Run, support and secure critical technology, 24×7, against SLAs we sign." },

  { id: "dc", layer: "B", label: "Purview DC", href: "/data-centre", blurb: "AI data centres: design, build, commission and operate, from powered shell to production." },
  { id: "aiinfra", layer: "B", label: "AI infrastructure", href: "/ai-infrastructure", blurb: "GPU floors, networks and cloud, engineered for the workload rather than sized after it." },
  { id: "cloud", layer: "B", label: "Cloud & hybrid", href: "/cloud", blurb: "Workloads placed by latency, residency and cost: hyperscaler, sovereign and on-premise." },
  { id: "cyber", layer: "B", label: "Cybersecurity", href: "/cybersecurity", blurb: "Security for the estate you have and the AI estate you are building: models, prompts, data." },
  { id: "edge", layer: "B", label: "Edge & vision AI", href: "/edge-vision", blurb: "Models that hold real-time latency inside a fanless box on your floor, your road or your gate." },
  { id: "embedded", layer: "B", label: "Embedded & silicon", href: "/embedded", blurb: "From SoC selection to a fleet of devices you can update in the field." },

  { id: "rabbit", layer: "C", label: "RabbiT AI recruitment", href: "/rabbit", blurb: "Calls, qualifies and schedules every applicant in their own language, 30+ languages." },
  { id: "rtd", layer: "C", label: "Recruit, Train, Deploy", href: "/rtd", blurb: "How Purview staffs its own GPU floors and client sites: certified engineers, floor-ready." },
  { id: "volume", layer: "C", label: "Volume & specialist hiring", href: "/volume-recruitment", blurb: "High-volume campaigns and specialist placements across 21 countries." },
  { id: "offshore", layer: "C", label: "Offshore & nearshore", href: "/offshore", blurb: "Delivery centres in India, Poland, Singapore and Australia with UK and US account leadership." },
];

export const ECO_EDGES: [string, string][] = [
  ["genai", "aiinfra"],
  ["genai", "data"],
  ["genai", "cyber"],
  ["genai", "cloud"],
  ["genai", "rabbit"],
  ["data", "cloud"],
  ["payments", "cyber"],
  ["payments", "cloud"],
  ["rpa", "genai"],
  ["managed", "cloud"],
  ["managed", "cyber"],
  ["dpe", "cloud"],
  ["aiinfra", "dc"],
  ["edge", "embedded"],
  ["edge", "genai"],
  ["rtd", "dc"],
  ["rtd", "aiinfra"],
  ["volume", "managed"],
  ["offshore", "dpe"],
  ["offshore", "managed"],
  ["rabbit", "volume"],
];

/* ---------------------------------------------------------------------
   Infrastructure sequence. Condensed from the Purview DC six-phase
   delivery model and eight-stage service model (purviewdc.com).
   --------------------------------------------------------------------- */
export const INFRA_STEPS = [
  {
    id: "shell",
    label: "Prepare",
    title: "Powered shell, prepared first",
    body: "Scope, drawings, bill of materials and method statements agreed before anything ships. Rack elevations, power and thermal density planned against the reference architecture.",
  },
  {
    id: "rack",
    label: "Install",
    title: "Racks received, staged and installed",
    body: "Dock-to-rack logistics, asset tagging and prestaging, then racks, power and network fabric installed by certified lead engineers with technician teams under them.",
  },
  {
    id: "cable",
    label: "Connect",
    title: "Cabling and optics, certified to the link",
    body: "Structured and point-to-point cabling to the cluster topology. Every fibre link OTDR and insertion-loss tested; copper certified to Level VI.",
  },
  {
    id: "commission",
    label: "Commission",
    title: "L2 to L5 commissioning",
    body: "Power-on, burn-in and cluster validation, including Integrated Systems Test and NCCL/HPL burn-in, with every result captured as acceptance evidence.",
  },
  {
    id: "operate",
    label: "Operate",
    title: "24×7 operations",
    body: "Handover into smart hands, NOC, incident and change management against signed SLAs, measured on cluster availability and GPU-hours delivered.",
  },
];

/* ---------------------------------------------------------------------
   Applications in action. Product facts from the respective product pages.
   Interfaces rendered beside them are illustrative, not product screenshots.
   --------------------------------------------------------------------- */
export const APPS = [
  {
    id: "saie",
    tab: "Agentic workflows",
    product: "SAIE · Secure AI Engine",
    title: "Agents that run operations, not demos.",
    body: "SAIE is the design, orchestration and workflow layer that sits above frontier and open models: tools, guardrails, evaluation and audit, inside your boundary. Reconciliation, claims, KYC, onboarding and back-office flows re-engineered as agent workflows, with exceptions routed to humans.",
    facts: ["Model-agnostic: Anthropic, OpenAI, Azure AI, Bedrock and open models", "Every agent action logged for audit", "Runs on your cloud, sovereign cloud or Purview-built GPU infrastructure"],
    href: "/ai-solutions",
    source: "https://purviewservices.com/ai-solutions.html",
  },
  {
    id: "callohm",
    tab: "Voice AI",
    product: "CallOHM",
    title: "Voice agents that do the work of the call.",
    body: "AI voice bots and calling agents that answer, qualify, book, remind and follow up in 30+ languages, with LLM-driven workflows and call analytics behind every conversation. Offered as pay-as-you-go SaaS.",
    facts: ["30+ languages, including Telugu, Hindi and English", "Telephony, CRM, calendar and ticketing connectors", "Per-minute pricing on prepaid credits"],
    href: "/callohm",
    source: "https://purviewservices.com/callohm.html",
  },
  {
    id: "rabbit",
    tab: "Recruitment AI",
    product: "RabbiT by CallOHM",
    title: "Stop screening. Start hiring.",
    body: "RabbiT calls, qualifies and schedules every applicant in their own language, scores every conversation against the role and keeps the whole pipeline on one board. It is how Purview staffs its own 2,500-person workforce.",
    facts: ["Seven steps from job description to hire", "Always-on screening, any time zone", "Recruiters make the decisions; agents do the repetitive work"],
    href: "/rabbit",
    source: "https://purviewservices.com/rabbit.html",
  },
  {
    id: "vision",
    tab: "Vision & edge AI",
    product: "Edge & Vision AI",
    title: "Intelligence at the edge.",
    body: "Industrial inspection, safety-zone monitoring, crowd and footfall analytics, ANPR and asset tracking, deployed on edge hardware so decisions happen on site, with models tuned to your line, floor or road.",
    facts: ["<100 ms decisions at the edge on fanless devices", "Fleet OTA updates across hundreds of endpoints in hours", "We tune the model and design the box it runs on"],
    href: "/edge-vision",
    source: "https://purviewservices.com/edge-vision.html",
  },
  {
    id: "twallet",
    tab: "Citizen platforms",
    product: "T-Wallet",
    title: "A citizen wallet at state scale.",
    body: "T-Wallet, the official digital wallet of Telangana State, is powered and operated by Purview: bills, recharges and government services for citizens, with or without a smartphone. Launched on 1 June 2017 by the Government of Telangana’s ITE&C Department.",
    facts: ["Operated day to day by Purview", "Assisted channels for citizens without a smartphone", "Government and non-government bills in one wallet"],
    href: "/twallet",
    source: "https://purviewservices.com/twallet.html",
  },
] as const;

/* ---------------------------------------------------------------------
   Featured work. Verbatim from the homepage "Outcomes, not effort".
   Client names withheld where engagements are under NDA.
   --------------------------------------------------------------------- */
/** Featured work — verbatim from homepage "Outcomes, not effort". */
export const CASES = [
  {
    id: "us-fi",
    client: "Major US financial institution",
    capability: "Agentic AI",
    title: "Workflow modernisation with the Secure AI Engine",
    engagement: "Proof of concept on live operations workflows, run inside the client's boundary on the SAIE orchestration layer.",
    result: "98% task success against the agreed evaluation set, with every agent action logged for audit.",
    resultValue: "98%",
    link: { label: "AI Solutions", href: "/ai-solutions" },
    image: "/img/bfsi.jpg",
  },
  {
    id: "twallet",
    client: "State government",
    capability: "Payments",
    title: "A citizen wallet at state scale",
    engagement: "T-Wallet, the official digital wallet of Telangana State, powered and operated by Purview: bills, recharges and government services for citizens, with or without a smartphone.",
    result: "",
    resultValue: "02",
    link: { label: "T-Wallet", href: "/twallet" },
    image: "/img/payments.jpg",
  },
  {
    id: "au-gpu",
    client: "Sovereign AI operator, Australia",
    capability: "Data centre",
    title: "GPU floor, dock to live",
    engagement: "Rack and stack, cabling, optics and L2 to L5 commissioning for an AI data centre, delivered by Purview DC with engineers deployed from India.",
    result: "",
    resultValue: "03",
    link: { label: "AI Infrastructure", href: "/ai-infrastructure" },
    image: "/img/dc-corridor-blue.jpg",
  },
  {
    id: "national-payments",
    client: "National payments institution",
    capability: "Digital engineering",
    title: "A public platform built to national standard",
    engagement: "Design, build and accessibility for the public web presence of a national payments body, won through open RFP.",
    result: "",
    resultValue: "04",
    link: { label: "Digital Product Engineering", href: "/digital-engineering" },
    image: "/img/digital-engineering.jpg",
  },
  {
    id: "skilling",
    client: "Industrial cluster, Telangana",
    capability: "Public programme",
    title: "Skilling infrastructure for an industrial cluster",
    engagement: "Consortium delivery of a ₹241 crore government training infrastructure programme, awarded in 2026.",
    result: "",
    resultValue: "05",
    link: { label: "Government & Public Sector", href: "/public-sector" },
    image: "/img/rtd.jpg",
  },
];

/** DC investment block — verbatim from "Where we are investing hardest". */
export const INVESTING = {
  eyebrow: "Where we are investing hardest",
  title: "Where we are investing hardest",
  body: "Purview DC designs, builds and operates AI-ready capacity, and deploys GPU floors for hyperscalers, neoclouds, sovereign programmes and enterprises. The density, cooling and power decisions are made by people who know what the workload actually does.",
  points: [
    "AI data centre parks and facilities: design, build, power",
    "GPU rack and stack, cabling and optics, HGX and GB-class clusters",
    "L2 to L5 commissioning and integrated systems testing",
    "24×7 smart hands, NOC and hyperscaler-grade operations",
  ],
  primaryCta: { label: "Purview DC overview", href: "/data-centre" },
  secondaryCta: { label: "Visit purviewdc.com", href: "https://purviewdc.com/" },
};

/* Industries: descriptions and client names from purviewservices.com/industries.html */
export const INDUSTRIES = [
  { id: "bfsi", name: "Banking & Financial Services", href: "/bfsi", image: "/img/bfsi.jpg", body: "Core banking integration, payments, wallets, trading platforms (Murex, Calypso, Finastra) and AI-driven operations for global banks and national-scale schemes.", clients: ["HSBC", "SBI", "UBS", "JPMorgan Chase", "Northern Trust", "Fidelity", "Prudential", "Metro Bank"] },
  { id: "gov", name: "Government & Public Sector", href: "/public-sector", image: "/img/public-sector.jpg", body: "State data centres, sovereign cloud, citizen wallets and mission systems. Crown Commercial Service supplier in the UK.", clients: ["Government of Telangana", "Government of Andhra Pradesh", "Government of Bihar", "NMDC", "ONGC"] },
  { id: "health", name: "Healthcare & Life Sciences", href: "/healthcare", image: "/img/healthcare.jpg", body: "Clinical systems, telehealth, revenue cycle management and the manufacturing and compliance engineering around them.", clients: ["NHS", "AIIMS", "Purview Healthcare", "iPhysicianHub"] },
  { id: "telecom", name: "Wireless & Telecommunications", href: "/telecom", image: "/img/telecom.jpg", body: "Network engineering, 5G and ORAN, platform engineering and managed operations for carriers, OEMs and technology majors.", clients: ["AT&T", "Verizon", "T-Mobile", "Nokia", "Comcast", "Virgin Media"] },
  { id: "mfg", name: "FMCG & Manufacturing", href: "/manufacturing", image: "/img/manufacturing.jpg", body: "Industrial vision AI, supply chain platforms, fleet telematics and enterprise systems for plants and distribution networks.", clients: ["Ford", "DuPont", "Hyundai Mobis", "Ambuja Cement", "William Grant & Sons"] },
  { id: "media", name: "Media & Entertainment", href: "/media", image: "/img/media.jpg", body: "Content platforms, digital marketing engineering and audience analytics, delivered with Purview Digital and 2080.", clients: [] },
  { id: "retail", name: "Retail & Distribution", href: "/retail", image: "/img/retail.jpg", body: "Footfall and crowd analytics, payments and loyalty, supply chain visibility and store systems.", clients: ["Bata", "Captain Fresh"] },
  { id: "travel", name: "Travel, Transportation & Facilities", href: "/travel", image: "/img/travel.jpg", body: "Passenger and cargo platforms, AIoT safety, ANPR and traffic analytics for airports, operators and smart city programmes.", clients: ["BidAir Cargo", "JLL", "CapitaLand"] },
];

/* Client logos shown on the current homepage, in the same order */
export const CLIENT_LOGOS = ["HSBC", "JPMorgan Chase", "UBS", "SBI", "NHS", "Government of Telangana", "AT&T", "Verizon", "Nokia", "Ford", "DuPont", "Hyundai Mobis", "Accenture", "Deloitte", "World Wide Technology", "HPE", "Oracle", "Engie", "JLL", "Prudential"];

/* Technology partners as grouped on the current homepage */
export const PARTNER_GROUPS = [
  { title: "AI Compute & Infrastructure", logos: ["NVIDIA", "AMD", "Supermicro", "HPE", "Dell Technologies", "DeepX", "Vertiv", "Schneider Electric", "Hitachi", "Corning", "Panduit", "CommScope", "Avnet Silica", "Systimax", "Grinn", "Kaynes Technology"] },
  { title: "AI Platforms & Models", logos: ["Anthropic", "OpenAI", "Google Cloud", "Azure AI", "AWS Bedrock", "Databricks", "Videam"] },
  { title: "Data, Integration & Observability", logos: ["Snowflake", "Informatica", "Tableau", "Power BI", "MuleSoft", "Kong", "Dynatrace", "AppDynamics", "Splunk", "Wintag", "CAEN RFID", "BitRip"] },
  { title: "Enterprise Platforms & Automation", logos: ["Salesforce", "SAP", "ServiceNow", "Pega", "Dynamics 365", "UiPath", "Automation Anywhere", "Appian", "Bosch", "TeleVU"] },
  { title: "Security & Networks", logos: ["Cisco Partner", "Palo Alto Networks", "Fortinet", "F5", "IBM Security", "Dragos", "Pelco", "Motorola Solutions", "Avigilon"] },
  { title: "Financial Services Platforms", logos: ["Murex", "Calypso", "Finastra", "OpenLink"] },
];

/* Locations: purviewservices.com/locations.html, company.html, contact.html */
export const LOCATIONS = [
  { city: "Edinburgh", country: "United Kingdom", role: "Global headquarters · Delivery centre", lon: -3.19, lat: 55.95, kind: "hq" },
  { city: "Hyderabad", country: "India", role: "Operations headquarters · Delivery centre", lon: 78.49, lat: 17.39, kind: "hq" },
  { city: "Dallas", country: "United States", role: "US headquarters", lon: -96.8, lat: 32.78, kind: "hq" },
  { city: "Warsaw", country: "Poland", role: "Delivery centre", lon: 21.01, lat: 52.23, kind: "dc" },
  { city: "Singapore", country: "Singapore", role: "Delivery centre", lon: 103.82, lat: 1.35, kind: "dc" },
  { city: "Sydney", country: "Australia", role: "Delivery centre · Data centre delivery across ANZ", lon: 151.21, lat: -33.87, kind: "dc" },
  { city: "Pune", country: "India", role: "Delivery centre", lon: 73.86, lat: 18.52, kind: "dc" },
  { city: "Bengaluru", country: "India", role: "Delivery centre", lon: 77.59, lat: 12.97, kind: "dc" },
  { city: "Chennai", country: "India", role: "Delivery centre", lon: 80.27, lat: 13.08, kind: "dc" },
] as const;

/* Regions and countries as listed under "Global footprint" on company.html (ISO 3166 numeric) */
export const FOOTPRINT_COUNTRIES: Record<string, string> = {
  "826": "United Kingdom", "372": "Ireland", "616": "Poland", "752": "Sweden", "246": "Finland", "276": "Germany", "528": "Netherlands", "756": "Switzerland",
  "840": "United States", "124": "Canada", "484": "Mexico", "356": "India", "702": "Singapore", "784": "United Arab Emirates", "344": "Hong Kong", "512": "Oman",
  "458": "Malaysia", "608": "Philippines", "392": "Japan", "036": "Australia", "554": "New Zealand", "710": "South Africa",
};

/** Five service lines published under "What we do" on the homepage. */
export const WHAT_WE_DO = [
  {
    href: "/ai-solutions",
    name: "AI Solutions",
    body: "Gen AI, agentic workflows, vision, voice and XR, built to run in production.",
  },
  {
    href: "/products",
    name: "AI Platforms",
    body: "SAIE, CallOHM, Smart Solutions and Nexable: products we run, not just build.",
  },
  {
    href: "/data-centre",
    name: "Data Centres",
    body: "Purview DC: design, build, commission and operate AI-ready infrastructure.",
  },
  {
    href: "/managed",
    name: "Managed Services",
    body: "Run, support and secure critical technology, 24×7.",
  },
  {
    href: "/workforce",
    name: "Workforce Solutions",
    body: "Agentic AI recruitment and certified engineers, deployed where the work is.",
  },
] as const;

/** Paths that sit beside the service lines: work, engineering, delivery, trust. */
export const BEYOND = [
  {
    href: "/our-work",
    title: "Customer Success",
    body: "Evidence-led delivery stories and confidential project references.",
    cta: "Explore our work",
  },
  {
    href: "/innovation",
    title: "Engineering & Innovation",
    body: "From enterprise applications to compute-ready infrastructure.",
    cta: "Explore engineering",
  },
  {
    href: "/global-delivery",
    title: "Global Delivery",
    body: "Local accountability and coordinated international operations.",
    cta: "Explore delivery",
  },
  {
    href: "/trust",
    title: "Trust & Assurance",
    body: "Quality, security and governance built into execution.",
    cta: "Explore trust",
  },
] as const;

/** Closing CTA — verbatim from purviewservices.com/index.html */
export const FINAL_CTA = {
  eyebrow: "Start here",
  title: "Bring us the problem. We will bring the applications and the infrastructure.",
  body: "An agentic workflow for operations, a sovereign cloud, a GPU floor that has to be live by quarter end, or all three. Start with one conversation.",
  primaryCta: { label: "Contact Purview", href: "/contact" },
  secondaryCta: { label: "Purview DC for data centre builds", href: "https://purviewdc.com/" },
};

/** Clients / partners intro — verbatim from homepage. */
export const RELATIONSHIPS = {
  title: "Built on relationships. Proven through delivery.",
  lead: "Explore the original client references, technology partner logos and industry relationships retained throughout the website.",
  clientsLabel: "Our clients",
  clientsCount: "50+",
  partnersLabel: "Technology partners",
  partnersCount: "58",
  trustTitle: "Trusted by 50+ clients, with 90% repeat business",
  trustBody: "Global banks, national governments, carriers and manufacturers. Most relationships started with one engagement and grew into many.",
};
