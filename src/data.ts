import { HeroSlide, FocusArea, MetricItem, TeamMember, InsightItem, ProjectItem } from './types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "DRIVING SUSTAINABLE TRANSFORMATION ACROSS AFRICA",
    subtitle: "Partnering with global institutions and state governments to build resilient systems, strengthen policy frameworks, and drive sovereign development initiatives with absolute transparency.",
    badge: "BILATERAL ALLIANCE & POLICY",
    imageTheme: "health"
  },
  {
    id: 2,
    title: "ADVANCED HEALTH SYSTEMS STRENGTHENING",
    subtitle: "Optimizing institutional health delivery frameworks, subnational insurance policies, and clinical support protocols for maximum human and sovereign impact.",
    badge: "INSTITUTIONAL CLINICAL DELIVERY"
  },
  {
    id: 3,
    title: "GOVERNANCE & CITIZEN POLICY MONITORING",
    subtitle: "Strengthening public-private dialog, civic accountability charters, and municipal legislative metrics across primary decentralization zones.",
    badge: "LEGISLATIVE ACCOUNTABILITY"
  }
];

export const CORE_FOCUS_AREAS: FocusArea[] = [
  {
    id: "health-systems",
    number: "01",
    title: "Health Systems Strengthening",
    description: "Institutional capacity building, resource optimization, and clinical delivery advisory.",
    outcomes: [
      "Subnational financing architectures",
      "Quality assurance and clinical protocol audits",
      "Primary health care supply chain integration"
    ],
    partnerNetworks: [
      "The Global Fund and Philanthropic Networks",
      "Federal Ministry of Health & State Primary Health Schemes"
    ]
  },
  {
    id: "governance",
    number: "02",
    title: "Governance & Citizen Engagement",
    description: "Strengthening public policy, policy monitoring, transparency, and public-private dialogue.",
    outcomes: [
      "Inclusive subnational policy audit tools",
      "State-level executive briefing frameworks",
      "Social contract monitoring systems"
    ],
    partnerNetworks: [
      "FCDO Legislative Alignments",
      "State Executive Councils & Civic Coalitions"
    ]
  },
  {
    id: "institutional-dev",
    number: "03",
    title: "Institutional Development & Strategy",
    description: "Tailored advisory frameworks for international donors and state agencies.",
    outcomes: [
      "Multi-sectoral program blueprints",
      "Operational performance management tools",
      "Bespoke change management guidelines"
    ],
    partnerNetworks: [
      "UN Agencies & Bilateral Missions",
      "State Bureaus of Public Service Reforms"
    ]
  },
  {
    id: "strategic-partnerships",
    number: "04",
    title: "Strategic Partnerships",
    description: "Connecting global funding networks (e.g., FCDO, Gates Foundation) with local implementation frameworks.",
    outcomes: [
      "Subgrant administrative frameworks",
      "Private donor compliance guidelines",
      "Zonal operational safety reports"
    ],
    partnerNetworks: [
      "International Development Banks",
      "Civil Society Coalition for Accountability"
    ]
  }
];

export const GENERAL_METRICS: MetricItem[] = [
  {
    id: "interventions",
    value: "15+",
    label: "State Interventions Deployed",
    description: "Rigorous subnational advisory matrices implementing regional health policy and public audits.",
    scopeLabel: "Sub-Saharan Coverage"
  },
  {
    id: "projects",
    value: "40+",
    label: "Global Partner Projects Executed",
    description: "Successful joint portfolios completed under global donor-compliance timelines and fiscal regimes.",
    scopeLabel: "Accredited Portfolios"
  },
  {
    id: "accountability",
    value: "100%",
    label: "Project Fiscal Accountability",
    description: "Pristine administrative, operational, and auditing scores verified by international compliance bodies.",
    scopeLabel: "Absolute Compliance"
  }
];

export const LEADERSHIP_TEAM: TeamMember[] = [
  {
    id: "ukwaja-kingsley",
    name: "Ukwaja Kingsley",
    role: "Senior Partner / Managing Director",
    qualification: "MD, MPH, FCP",
    bio: "A distinguished health systems specialist with over 18 years of advisory experience with international institutions including USAID, FCDO, and the Global Fund. Expert in crafting subnational strategic health development plans and evidence-informed health policies across Africa.",
    specialization: "Global Health Policy, Sustainable Financing & Resource Optimization",
    email: "k.ukwaja@dpcl-consulting.com",
    avatarText: "UK"
  },
  {
    id: "iro-okechukwu",
    name: "Iro Okechukwu",
    role: "Director of Strategy & Operations",
    qualification: "MBA, PMP, Lead Auditor",
    bio: "An accomplished operations architect in governance, legislative reform, and program compliance. Expert in aligning international donor models with regional policy guidelines, ensuring absolute transparency, high accountability ratings, and optimal resource deployments.",
    specialization: "Public Sector Re-engineering, Strategic Auditing & Program Management",
    email: "o.iro@dpcl-consulting.com",
    avatarText: "IO"
  }
];

export const INSIGHTS_NEWS: InsightItem[] = [
  {
    id: "kaduna-interview",
    category: "EXECUTIVE DIALOGUE",
    title: "Kaduna State Government Executive Interview on Governance Reforms",
    summary: "Reviewing recent strategic frameworks on governance and development deployment across northwestern subnational zones, prioritizing resource optimization and policy alignment.",
    date: "May 20, 2026",
    readTime: "7 min read",
    author: "DPCL Advisory Council"
  },
  {
    id: "healthy-living",
    category: "PUBLIC HEALTH BLUEPRINT",
    title: "Building Healthy Lifestyles & Living: Community Infrastructure Strategy",
    summary: "A proactive look at sustainable community health infrastructure development, exploring localized primary care funding pathways and state-supported health models.",
    date: "April 12, 2026",
    readTime: "12 min read",
    author: "Dr. K. Ukwaja"
  }
];

export const PROJECTS_REPOSITORY: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Subnational Health Financing Audit Report",
    category: "health",
    location: "Kaduna & Abuja, Nigeria",
    year: "2026",
    imageUrl: "HEALTH",
    docCode: "DPCL-HFA-2026",
    summary: "Comprehensive fiscal assessment reviewing allocation efficiencies, state insurance framework penetrations, and primary healthcare fund utilization tracks."
  },
  {
    id: "proj-2",
    title: "Social Contract Accountability Framework & Briefing",
    category: "governance",
    location: "Kano & Kaduna Zones",
    year: "2025",
    imageUrl: "GOV",
    docCode: "DPCL-SCA-05",
    summary: "Institutional tools aligning civic dialogue metrics with local government planning commissions to foster policy transparency and state accountability covenants."
  },
  {
    id: "proj-3",
    title: "Multisectoral Donor Strategy Advisory Handbook",
    category: "strategy",
    location: "Abuja HQ Secretariat",
    year: "2026",
    imageUrl: "STRAT",
    docCode: "DPCL-MSH-09",
    summary: "A robust regulatory handbook outlining operational guidelines, compliance limits, and risk-mitigation layers for major bilateral philanthropic donors."
  },
  {
    id: "proj-4",
    title: "Sub-Grant Accountability Verification Action Report",
    category: "governance",
    location: "Sub-Saharan Sovereign Partners",
    year: "2025",
    imageUrl: "AUDIT",
    docCode: "DPCL-SGV-25",
    summary: "Fiscal monitoring checklists and evidence-based reviews highlighting implementation speeds and resource transparency benchmarks."
  },
  {
    id: "proj-5",
    title: "Regional Clinical Delivery Protocol and Guidelines Dashboard",
    category: "health",
    location: "Wuse II & Abuja Outposts",
    year: "2026",
    imageUrl: "MEDIC",
    docCode: "DPCL-CDP-26",
    summary: "Systematic guidelines advising state committees on primary clinical performance indicators, drug procurement security, and state-wide immunization tracks."
  },
  {
    id: "proj-6",
    title: "Strategic Transition Model & Public Sector Re-engineering Roadmap",
    category: "strategy",
    location: "Inter-State Public Service Bureau",
    year: "2025",
    imageUrl: "REFORM",
    docCode: "DPCL-STR-25",
    summary: "A structural transition model ensuring minimum operational downtime during systemic administrative transitions in state institutions."
  }
];
