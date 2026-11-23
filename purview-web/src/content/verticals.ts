/**
 * Content for the three vertical landing pages. Every statement is taken or
 * condensed from purviewservices.com and purviewdc.com (sources inline).
 * Figures with conflicting published values are excluded; see
 * docs/04-verification-register.md.
 */

/* =====================================================================
   PURVIEW DATA CENTRE
   ===================================================================== */
export const DC = {
  hero: {
    eyebrow: "Purview Data Centre · delivered by Purview DC",
    title: "Powered shell to production. One accountable partner.",
    lede: "Purview DC designs, installs, commissions and operates AI data centres: GPU floors, modular facilities, structured cabling, networks and 24×7 operations, for hyperscalers, neoclouds, sovereign programmes and enterprises.",
    // purviewdc.com, purviewservices.com/dc-why.html
    stats: [
      { value: "~500 MW", label: "AI data centre capacity delivered" },
      { value: "2,500+", label: "AI server racks deployed and validated" },
      { value: "185,000+", label: "cables terminated and certified" },
      { value: "300 MW+", label: "hyperscale development pipeline" },
    ],
  },
  value: {
    title: "The IA half of AI.",
    body: "Purview DC is where the group’s infrastructure story lives: the GPU floors, networks and facilities that intelligent applications run on. It gives Purview’s AI practice an installation and operations partner under the same roof, and gives operators one accountable team from purchase order to steady state.",
    audiences: [
      { t: "Hyperscalers and neoclouds", d: "Installation and operations capacity in India, Australia, the Gulf, the UK and Europe, on OEM standards." },
      { t: "Sovereign and state programmes", d: "State data centres and sovereign cloud builds with evidence-led acceptance." },
      { t: "Enterprise AI factories", d: "GPU clusters for enterprises standing up their own AI capacity." },
      { t: "Colocation operators", d: "White-space fit-out, cabling and smart hands for operators scaling floors." },
      { t: "OEMs and system integrators", d: "A certified delivery partner for hardware programmes across regions." },
      { t: "Land and power partners", d: "Development partnerships through Purview’s data centre park ventures." },
    ],
  },
  // purviewdc.com eight stages; purviewservices.com/dc-services.html
  stages: [
    { n: 1, scope: "Extended", t: "Plan & Specify", d: "NVIDIA Reference Architecture and Design Guide turned into a site-specific build before hardware ships.", items: ["Rack elevations, digital twin, power and thermal density", "MEP interface and clash control", "First-cut Rack Build Instructions (RBI)"] },
    { n: 2, scope: "Extended", t: "OEM Alignment", d: "OEM selection and negotiation support, and collaboration on the reference architecture.", items: ["BOM and specification engineering", "Vendor SLAs and warranty terms"] },
    { n: 3, scope: "Extended", t: "Import & Clear", d: "Export control, HS classification and bonded custody through GigaPort Hyderabad.", items: ["Duty optimisation", "Chain-of-custody freight to site", "BIS and DGFT filings for India, end to end"] },
    { n: 4, scope: "Extended", t: "Stage & Integrate", d: "Cluster planning and P2P/topology documentation with NVIDIA, then prestaging.", items: ["Pre-staging and burn-in", "Firmware and BIOS baselining", "Asset tagging and serialisation", "Finalised Rack Build Instructions"] },
    { n: 5, scope: "Core", t: "Install", d: "GPU and server installation across HGX and GPU clusters: B200, B300, GB300, Vera Rubin.", items: ["Storage: VAST, DDN, Tintri; InfiniBand fabric cabling", "Certified fibre and Cat6A, patch panels, labelling", "Last-mile liquid cooling: CDU-to-rack, manifolds, flush and fill, leak testing", "Busway, rPDU, earthing and bonding, DOA screening, RMA"] },
    { n: 6, scope: "Core", t: "Commission", d: "L2 to L5 commissioning including Integrated Systems Test (IST).", items: ["Cooling verification: leak, pressure and flush testing", "OTDR and insertion-loss on every link; copper to Fluke DSX-8000 Level VI", "Cluster burn-in: NCCL/HPL, POST and log validation", "Four quality gates, ending in independent acceptance QA"] },
    { n: 7, scope: "Core", t: "Handover", d: "Documentation and training so the floor is operable from day one.", items: ["As-builts and asset register", "Warranty and spares strategy", "O&M manuals and client training", "Uptime M&O readiness; commissioning sign-off"] },
    { n: 8, scope: "Core", t: "Operate & Refresh", d: "24×7 SLA operation of AI data halls, measured on cluster availability, node time-to-repair and GPU-hours delivered.", items: ["Facilities, smart hands and NOC; liquid cooling and 100kW+ rack power operations", "DCGM telemetry, InfiniBand and RoCE, firmware and BMC at fleet scale", "Slurm and Kubernetes; VAST/DDN", "IMAC, RMA and spares, technology refresh, ITAD and secure erasure"] },
  ],
  // Capability chapters (dc-services, dc-development, dc-cabling, dc-networks)
  chapters: [
    {
      id: "facility",
      label: "Infrastructure engineering",
      title: "Facility design, build and development.",
      body: "Site selection, power and cooling design, modular and containerised builds, fit-out and handover. Purview also develops hyperscale capacity itself: originating power-secured sites, structuring bankable projects and building AI-ready campuses in the UK and India.",
      spec: [
        ["Models", "Build-to-suit, powered shell, turnkey"],
        ["Modular data centres", "10 to 100 rack modules"],
        ["Development pipeline", "300 MW+ in the UK and India"],
      ],
      href: "/dc-development",
      linkLabel: "Data Centre Development",
    },
    {
      id: "gpu",
      label: "GPU deployment",
      title: "Racks received, staged and installed to OEM standard.",
      body: "HGX, B200, B300 and GB300 racks received, staged, installed and cabled to OEM standard, by certified lead engineers with technician teams under them, alongside high-performance storage and the networks around them.",
      spec: [
        ["Platforms", "NVIDIA HGX, B200, B300, GB300, Vera Rubin"],
        ["Storage", "VAST, DDN, Tintri"],
        ["Liquid cooling", "CDU-to-rack, manifolds, leak testing"],
      ],
      href: "/ai-infrastructure",
      linkLabel: "AI Infrastructure",
    },
    {
      id: "commission",
      label: "Commissioning",
      title: "Every result captured as acceptance evidence.",
      body: "Power-on, burn-in, cluster validation and acceptance evidence before go-live. L2 to L5 commissioning including Integrated Systems Test, with NCCL/HPL cluster burn-in completed before acceptance.",
      spec: [
        ["Levels", "L2 to L5, including IST"],
        ["Burn-in", "NCCL/HPL, POST and log validation"],
        ["Gates", "Four independent quality gates"],
      ],
      href: "/dc-delivery",
      linkLabel: "Delivery model",
    },
    {
      id: "network",
      label: "Networks and cabling",
      title: "Structured cabling, certified to the link.",
      body: "Spine-leaf, InfiniBand and Ethernet fabrics, out-of-band and security, configured and validated, on top of a cabling practice that began in Australia in 2002 as EDF and now delivers worldwide under Purview DC.",
      spec: [
        ["Cabling heritage", "24 years, copper and fibre"],
        ["Links certified", "185,000+"],
        ["Test method", "Fluke DSX-8000 Level VI; OTDR on every fibre"],
      ],
      href: "/dc-cabling",
      linkLabel: "Structured Cabling & Smart Hands",
    },
    {
      id: "operate",
      label: "24×7 operations",
      title: "We run what we build.",
      body: "Operations contracts follow installation: AI facility and DCO operations, GPU cluster and fabric operations, 24×7 smart hands and NOC, IMAC, RMA and spares logistics, against signed SLAs.",
      spec: [
        ["Measured on", "Cluster availability, node time-to-repair, GPU-hours delivered"],
        ["Coverage", "Facilities, smart hands, NOC"],
        ["Refresh", "IMAC, RMA, ITAD and secure erasure"],
      ],
      href: "/dc-networks",
      linkLabel: "Network Solutions",
    },
  ],
  // purviewdc.com delivery model
  phases: [
    { t: "Prestaging", d: "Material receipt, engineering verification, assembly, labelling, QA and deployment release.", gate: "Engineering release" },
    { t: "Site receipt & validation", d: "Receiving, delivery reconciliation, chain of custody, contamination inspection.", gate: "Site validation" },
    { t: "Active infrastructure", d: "Asset validation, DOA test, RMA handling, rack, rail and device installation with progressive verification." },
    { t: "Structured cabling", d: "Certified fibre and Cat6A, point-to-point and structured methods, patch panels, dressing and labelling." },
    { t: "Connectivity & optics", d: "MPO, LC and copper connectivity, optics installation and verification.", gate: "Installation verification" },
    { t: "Testing, QA & handover", d: "Certification testing, independent QA, documentation, acceptance, commissioning support and operational handover.", gate: "Independent acceptance QA" },
  ],
  india: [
    { t: "Port of entry", place: "Chennai · Krishnapatnam", d: "Sea ports for liquid-cooled rack imports." },
    { t: "Bonded custody", place: "GigaPort, Hyderabad", d: "Customs-bonded receipt and custody, duty optimisation." },
    { t: "Integration & QA", place: "Prestaging", d: "Assembly, burn-in, firmware baselining and QA release." },
    { t: "Site delivery", place: "Data hall", d: "Last-mile moves under chain of custody." },
  ],
  platforms: [
    { t: "Data Center Deployer", d: "Dock-to-rack delivery: technician app with scan-based asset confirmation, coordinator control tower, rack elevation and a live 3D view of the facility.", tag: "Deploy" },
    { t: "SmartAMM", d: "Asset and maintenance management: RFID, NFC, edge vision, temperature sensors and ticketing through edge hubs into AI analytics and a live digital twin.", tag: "Monitor" },
    { t: "SmartInspect", d: "Wearable-led remote collaboration: AR annotations, 4K streaming, smart glasses, session reporting and digital auditing.", tag: "Inspect" },
    { t: "SmartWorkforce", d: "Certified crews, planned and guided: SOPs turned into step-by-step guidance on wearables, mobiles and tablets with remote support.", tag: "Guide" },
  ],
  // dc-why.html track record (client names withheld)
  track: [
    ["Neocloud, Australia", "GPU cluster across two colocation facilities (Cisco B300, Supermicro GB300): rack and stack, structured cabling, optics, validation, RMA management", "Delivered on time for OEM commissioning; liquid-cooled cluster finished early"],
    ["AI infrastructure, Middle East", "HGX AI data centre with 3,000+ devices, including DDN and Tintri storage", "Fully validated, enterprise-grade cabling"],
    ["Hyperscale cloud, USA", "HGX data centre deployment and estate relocation", "Migration with reduced downtime; production-ready"],
    ["Global IT services", "Firewall refresh of about 300 devices across a global estate", "Standardised deployment, minimal downtime"],
    ["Edge compute, APAC", "Cross-border AI edge migration with GPU platforms and cluster cabling", "Completed ahead of schedule; production-ready edge node"],
    ["Hospitality and gaming, Singapore", "Network modernisation: BOM validation, burn-in, VLAN design, UAT, CMDB and as-built documentation", "Production-ready rollout; documentation complete"],
  ],
  // dc-development.html project register
  projects: [
    { status: "Energised", mw: "50 MW", t: "Flagship AI data centre", where: "Middle East", d: "End-to-end delivery of a regional AI facility for an AI cloud operator: GPU-dense halls, high-density power distribution, advanced cooling, full design, build and commissioning." },
    { status: "In development", mw: "50 MW", t: "Hyderabad hyperscale", where: "Telangana, India", d: "Build-to-suit hyperscale campus backed by a bonded AI logistics hub (GigaPort)." },
    { status: "In development", mw: "63 MW", t: "Glasgow AI Growth Zone", where: "Scotland, UK", d: "Consented site with grid energisation scheduled for 2028, within the Scottish AI Growth Zone." },
    { status: "Live · Sovereign", mw: "Multi-state", t: "Government platforms", where: "India", d: "Sovereign state data centres, HPC estates and security operations centres in production." },
  ],
  faq: [
    { q: "Which GPU platforms do you install?", a: "NVIDIA HGX and GPU cluster installs across B200, B300, GB300, Vera Rubin and comparable platforms, together with high-performance storage (VAST, DDN, Tintri) and InfiniBand fabric cabling." },
    { q: "Can we hand you only part of the programme?", a: "Yes. Planning and specification, OEM alignment, import and clearance, and staging and integration are taken on as needed, based on your in-house capability. Installation, commissioning, handover, and operations and refresh are delivered by Purview installation specialists." },
    { q: "What happens after handover?", a: "We run what we build: AI facility and DCO operations, GPU cluster and fabric operations, 24×7 smart hands and NOC, IMAC, RMA and spares logistics. Operations are measured on cluster availability, node time-to-repair and GPU-hours delivered, not on facility uptime alone." },
    { q: "Where do your engineers come from?", a: "Engineers are hired and certified in India through the Purview DC Academy before mobilisation, with NVIDIA, liquid-cooling and service-management disciplines built in. Crews deploy from five delivery centres: Hyderabad, Edinburgh, Warsaw, Singapore and Sydney." },
  ],
};

/* =====================================================================
   PURVIEW TECH
   ===================================================================== */
export const TECH = {
  hero: {
    eyebrow: "Purview Tech · the applications",
    title: "AI that passes security review and keeps working in production.",
    lede: "Purview builds Gen AI, agentic, vision, voice and XR systems that run inside your data boundary, log every action and survive the next model change, together with the software, data, cloud and security estates they depend on.",
    stats: [
      { value: "98%", label: "task success in a live agentic POC at a major US financial institution" },
      { value: "4–6 wks", label: "from problem statement to a working slice on your data" },
      { value: "30+", label: "languages for voice agents in production through CallOHM" },
      { value: "17 yrs", label: "building enterprise and government applications" },
    ],
  },
  // Use cases for the interactive workflow, from ai-solutions.html
  useCases: [
    { id: "recon", label: "Reconciliation", input: "Flagged payments", agents: ["Fetch ledger items", "Match statements", "Draft exception note"], review: "Mismatched amounts", output: "Ledger updated" },
    { id: "claims", label: "Claims", input: "Claim with photos", agents: ["Read statement", "Check policy", "Assess damage images"], review: "Out-of-policy cases", output: "Claim decision" },
    { id: "kyc", label: "KYC & onboarding", input: "New customer file", agents: ["Extract documents", "Verify records", "Score risk"], review: "High-risk profiles", output: "Account opened" },
    { id: "tickets", label: "Ticket resolution", input: "Service ticket", agents: ["Classify intent", "Search knowledge", "Apply fix"], review: "Unresolved tickets", output: "Ticket closed" },
  ],
  capabilities: [
    { title: "Gen AI applications and copilots", body: "Assistants, copilots and content engines built on your data, inside your boundary.", href: "/ai-solutions" },
    { title: "Agentic AI workflows for operations", body: "Agents that complete multi-step work with human review where it matters.", href: "/ai-solutions" },
    { title: "Edge & Vision AI", body: "Cameras, sensors and devices that see, count, inspect and alert in real time.", href: "/edge-vision" },
    { title: "Conversational AI", body: "Voice and chat agents in 30+ languages, in production through CallOHM.", href: "/callohm" },
    { title: "AI XR", body: "Smart glasses and spatial computing with AI in the field of view.", href: "/nexable" },
    { title: "LLM and SLM integration, RAG pipelines", body: "The right model for the job, grounded in your data, swappable without rework.", href: "/ai-solutions" },
    { title: "Machine learning and cognitive AI", body: "Prediction, classification and optimisation models that earn their keep.", href: "/ai-solutions" },
    { title: "Hyperautomation and AI-assisted DevOps", body: "Automation that spans bots, agents and the software lifecycle.", href: "/rpa" },
    { title: "Enterprise modernisation with AI", body: "Legacy estates understood, re-platformed and re-imagined with AI inside.", href: "/digital-engineering" },
    { title: "Multi-Modal AI", body: "Text, voice, image, video and sensor data understood together.", href: "/ai-solutions" },
  ],
  method: [
    { title: "Problem statement", body: "We start from the decision that has to be made, how fast and at what cost, not from a model looking for a use case." },
    { title: "Proof in four to six weeks", body: "A working slice on your data, inside your boundary, scored against a success metric you agree up front." },
    { title: "Harden and scale", body: "Evaluation harness, guardrails, observability and cost controls before any wider rollout." },
    { title: "Run", body: "Managed operation of the agents, with model updates handled without rewriting the workflow." },
  ],
  // The platform beneath the AI: published headline figures from each service page
  platform: [
    { id: "dpe", t: "Digital Product Engineering", d: "Cloud-native applications, experience design and quality engineering for products that have to ship every week.", stat: "2-week", statLabel: "release cadence from the first month", href: "/digital-engineering", image: "/img/digital-engineering.jpg" },
    { id: "data", t: "Data & Analytics", d: "Data platforms that are ready for AI, not just for reports: pipelines you can trust and governed domains.", stat: "1", statLabel: "trusted source per business domain", href: "/data-analytics", image: "/img/data-analytics.jpg" },
    { id: "cloud", t: "Cloud Services", d: "Migration, hybrid estate and platform engineering with the bill under control. Workloads go to the right place, which is not always the public cloud.", stat: "20–40%", statLabel: "typical cloud spend reduction after FinOps", href: "/cloud", image: "/img/cloud.jpg" },
    { id: "cyber", t: "Cybersecurity", d: "Security for the estate you have and the AI estate you are building: models, prompts, training data and agent permissions.", stat: "24×7", statLabel: "SOC from five delivery centres", href: "/cybersecurity", image: "/img/cybersecurity.jpg" },
    { id: "managed", t: "Managed IT Services", d: "Run, support and secure what you already have, from delivery centres in five countries, with SLAs we sign against and a 24×7 NOC behind them.", stat: "One NOC", statLabel: "servers, storage, network, cloud and GPU floors", href: "/managed", image: "/img/infra-managed.jpg" },
    { id: "payments", t: "Payments & Digital Assets", d: "Payment platforms, wallets and digital asset systems built for regulated environments and national-scale volumes.", stat: "National", statLabel: "scale: a state citizen wallet operated by Purview", href: "/payments", image: "/img/payments.jpg" },
  ],
  products: [
    { t: "SAIE · Secure AI Engine", d: "The orchestration and workflow layer above frontier and open models: tools, guardrails, evaluation and audit, inside your boundary.", href: "/ai-solutions", kind: "AI platform" },
    { t: "CallOHM", d: "AI voice bots, calling agents, LLM voice workflows and call analytics in 30+ languages, as pay-as-you-go SaaS.", href: "/callohm", kind: "Voice AI" },
    { t: "RabbiT", d: "Agentic AI recruitment: voice screening, auto-scoring and scheduling, built and run by CallOHM.", href: "/rabbit", kind: "Recruitment AI" },
    { t: "Nexable", d: "AI assistive aids from Purview Technologies: SEVA, Maitri and Silenta.", href: "/nexable", kind: "Assistive AI" },
    { t: "Smart Solutions", d: "SmartCare, SmartPick, SmartInspect and SmartSurveillance: AR smart-glass solutions for field and frontline teams.", href: "/smartinspect", kind: "AR platform" },
    { t: "T-Wallet", d: "The official digital wallet of Telangana State since 2017, powered and operated by Purview.", href: "/twallet", kind: "Government payments" },
    { t: "Castlematic", d: "Real-time GPS fleet tracking and telematics.", href: "/castlematic", kind: "IoT" },
    { t: "BenePay · EFUNDZZ", d: "Simplified payments and wallets; an SME lending marketplace.", href: "/benepay", kind: "Fintech" },
  ],
  faq: [
    { q: "Which models do you use?", a: "Whichever your policy allows. SAIE sits above Anthropic, OpenAI, Azure AI, Bedrock and open models, so the workflow does not change when the model does." },
    { q: "Can agents run on-premise?", a: "Yes. We deploy on your cloud, your sovereign cloud or on GPU infrastructure Purview builds for you." },
    { q: "How do you price a first engagement?", a: "A fixed-price proof of value, four to six weeks, with a success metric agreed before we start." },
    { q: "Do you build the hardware side too?", a: "Yes. Purview DC installs and operates GPU infrastructure, and Purview Technologies supplies and supports edge and XR devices." },
  ],
};

/* =====================================================================
   PURVIEW WORKFORCE
   ===================================================================== */
export const WORKFORCE = {
  hero: {
    eyebrow: "Purview Workforce · the people",
    title: "The people side of delivery.",
    lede: "2,500 professionals across 21 countries, hired by our own agentic AI platform, certified in our labs and deployed on our floors and yours. Specialist hiring, recruitment technology and delivery teams from mobilisation through steady-state operations.",
    stats: [
      { value: "2,500", label: "professionals in Purview’s own workforce" },
      { value: "21", label: "countries we hire in" },
      { value: "30+", label: "languages for AI voice screening" },
      { value: "2 wks", label: "notice for a floor-ready pod" },
    ],
  },
  // Operating model, rtd.html + workforce.html
  journey: [
    {
      id: "recruit",
      t: "Recruit",
      head: "Screen everyone, in their own language.",
      d: "Aptitude-based campaigns across India, Poland, the Gulf and ANZ. RabbiT voice-screens every applicant, scores each answer against the role and books interviews; BeeRef runs referral hiring with one fair owner per candidate.",
      tools: ["RabbiT", "BeeRef", "Volume, Contract & Perm Recruitment"],
      stat: { v: ">85%", l: "offer acceptance target on recruitment campaigns" },
      href: "/rabbit",
    },
    {
      id: "train",
      t: "Train",
      head: "Trained in our labs on real racks.",
      d: "Four to twelve weeks of lab training with real equipment, AR/VR guided procedures and OEM and vendor certification, assessed against the real task.",
      tools: ["Lab training", "AR/VR guidance", "OEM certification"],
      stat: { v: "4–12 wks", l: "lab training before deployment" },
      href: "/rtd",
    },
    {
      id: "deploy",
      t: "Deploy",
      head: "Pods arrive floor-ready.",
      d: "Lead engineers deploy with their own team of technicians, tooling and procedures, from a visa-ready bench in each operating country.",
      tools: ["Lead engineer pods", "Visa-ready bench", "Offshore & nearshore"],
      stat: { v: "10–12", l: "technicians per certified lead engineer" },
      href: "/rtd",
    },
    {
      id: "operate",
      t: "Operate",
      head: "From mobilisation to steady state.",
      d: "Time-based or outcome-priced SOW teams, compliant contract payroll across 21 entities, and managed services that carry the work into operation.",
      tools: ["Time-based & SOW Delivery", "Contract Payroll", "Managed IT Services"],
      stat: { v: "21", l: "entities for employer-of-record" },
      href: "/sow",
    },
  ],
  rabbitFlow: ["Create or upload a JD", "Source and match", "Auto-bucket", "AI voice screen", "Technical and coding assessment", "Analytics", "Select, schedule, offer"],
  rabbitFeatures: [
    { t: "Screen in their language", d: "Voice-screen applicants in their preferred language and auto-score every conversation against the role." },
    { t: "Schedule interviews", d: "Qualified candidates get booked into open interview slots automatically." },
    { t: "Follow up on offers", d: "Automated, human-sounding follow-ups keep candidates warm from offer to acceptance." },
    { t: "One pipeline, full visibility", d: "Every job, candidate and stage in one calm board, sourcing to signed, at a glance." },
  ],
  rabbitTrust: [
    ["TLS · AES-256", "Encrypted in transit and at rest"],
    ["SSO · MFA", "Least-privilege, role-based access"],
    ["Audit", "Logs and anomaly detection, always monitored"],
    ["GDPR · SOC 2", "Compliance-aligned, inside an ISO 27001 group"],
  ],
  beeref: {
    flow: ["Share", "Refer", "Hire", "Reward"],
    stats: [
      { value: "1", label: "owner per candidate: referral chains of up to three people, ownership settled by rule" },
      { value: "5", label: "roles: employee, partner, candidate, hiring manager, TA team, each seeing only its part" },
      { value: "0", label: "payouts made without a human approval" },
    ],
    body: "BeeRef runs referrals from the first share to the final reward: careers page, tracked referral links, ownership checks, AI screening, client hiring stages and wallet payouts in one workspace. BeeRef prepares the work. People make every decision.",
  },
  services: [
    { t: "Volume, Contract & Perm Recruitment", d: "High-volume hiring campaigns and specialist permanent placements across technology, engineering and operations roles.", href: "/volume-recruitment" },
    { t: "Offshore & Nearshore Solutions", d: "Delivery centres in Hyderabad, Pune, Bengaluru, Chennai, Poland, Singapore and Sydney, with UK and US account leadership.", href: "/offshore" },
    { t: "Time-based & SOW Delivery", d: "Outcome-priced statements of work with one accountable owner, or time-based teams when the scope is still moving.", href: "/sow" },
    { t: "Contract Payroll", d: "Compliant in-country payrolling and contractor management across our 21 entities.", href: "/payroll" },
    { t: "Discovery Audits", d: "Baseline your estate, skills and spend before a transformation, so the plan starts from facts.", href: "/audits" },
    { t: "Market Insights", d: "Talent availability, rate cards and location intelligence for the markets we operate in.", href: "/market-insights" },
  ],
  models: [
    { t: "Dedicated offshore centres", d: "ODC, build-operate-transfer or managed team, chosen against cost, control and time horizon." },
    { t: "Nearshore in Poland", d: "European working hours on a secure estate, with governance and transfer options built into the contract." },
    { t: "Follow-the-sun", d: "India provides scale and follow-the-sun; Singapore and Sydney cover Asia Pacific." },
    { t: "Employer of record", d: "Engage people before you have an entity; move them to your entity when you are ready." },
  ],
  proof: [
    { value: "40–60%", label: "cost reduction on offshore delivery" },
    { value: ">90%", label: "certification rates in Recruit, Train, Deploy" },
    { value: "12–15", label: "engineers deployed to a sovereign AI data centre build in Australia" },
    { value: "18 mo", label: "to a clean employer-of-record transfer, India and Poland" },
  ],
  faq: [
    { q: "Who certifies the engineers?", a: "OEM and vendor programmes plus Purview lab assessment against the real task." },
    { q: "Can Purview run the recruitment campaign for us?", a: "Yes. Workforce Solutions runs RabbiT as a managed recruitment service, from campaign set-up to compliant in-country contracts through Recruit, Train, Deploy and Contract Payroll." },
    { q: "Can you train our people?", a: "Yes, in our labs or at your site." },
    { q: "Does RabbiT replace our recruiters?", a: "No. It removes the repetitive work. RabbiT handles high-volume screening, scheduling and follow-up so recruiters spend their time on the people and decisions that matter." },
  ],
};
