import { HeroSlide, FocusArea, MetricItem, TeamMember, InsightItem } from './types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "Driving Sustainable Transformation Across Africa",
    subtitle: "Partnering with global bilateral agencies, philanthropic funds, and state actors to engineer resilient health delivery, civic governance, and strategic operating structures.",
    badge: "GLOBAL ADVISORY",
    imageTheme: "ambient-navy",
    align: 'left',
    bgColor: "from-slate-900 via-[#0F172A] to-slate-900"
  },
  {
    id: 2,
    title: "Advanced Health Systems Strengthening",
    subtitle: "Optimizing regional health insurance frameworks, clinical delivery models, state funding systems, and primary care supply chain designs.",
    badge: "HEALTH STRATEGY",
    imageTheme: "charcoal-gold",
    align: 'center',
    bgColor: "from-slate-950 via-[#111827] to-[#0D1526]"
  },
  {
    id: 3,
    title: "Governance, Policy & Citizen Engagement",
    subtitle: "Empowering state councils and civic networks with transparent monitoring methodologies, sustainable public dialog structures, and executive audits.",
    badge: "GOVERNANCE & REFORM",
    imageTheme: "slate-minimal",
    align: 'right',
    bgColor: "from-slate-900 via-slate-950 to-[#0F172A]"
  }
];

export const CORE_FOCUS_AREAS: FocusArea[] = [
  {
    id: "health-systems",
    number: "01",
    title: "Health Systems Strengthening",
    description: "Institutional capacity building, subnational financing, and clinical delivery design for international donor health portfolios.",
    outcomes: [
      "Subnational financing architectures",
      "Quality assurance and clinical protocol audits",
      "Primary health care supply chain integration"
    ],
    partnerNetworks: [
      "The Global Fund to Fight AIDS, TB & Malaria",
      "Bill & Melinda Gates Foundation (BMGF)",
      "National & State Primary Health Development Agencies"
    ]
  },
  {
    id: "governance",
    number: "02",
    title: "Governance & Citizen Engagement",
    description: "Strengthening municipal policy framework, local leadership development, policy tracking, and institutionalized accountability dialogs.",
    outcomes: [
      "Inclusive subnational policy audit tools",
      "State-level executive briefing frameworks",
      "Social contract monitoring systems"
    ],
    partnerNetworks: [
      "Foreign, Commonwealth & Development Office (FCDO)",
      "State Executive Councils & Civic Coalitions",
      "National Assembly Legislative Committees"
    ]
  },
  {
    id: "institutional-dev",
    number: "03",
    title: "Institutional Development & Strategy",
    description: "Structuring high-impact administrative processes, audit structures, and operations advice for state development bureaus and donor bodies.",
    outcomes: [
      "Multi-sectoral program blueprints",
      "Operational performance management tools",
      "Bespoke change management guidelines"
    ],
    partnerNetworks: [
      "United States Agency for International Development (USAID)",
      "State Bureaus of Public Service Reforms",
      "United Nations Development Programme (UNDP)"
    ]
  },
  {
    id: "strategic-partnerships",
    number: "04",
    title: "Strategic Partnerships",
    description: "Bridging global capital assets and bilateral agencies with high-integrity local implementation and compliance structures.",
    outcomes: [
      "Subgrant administrative frameworks",
      "FCDO and State-integrated program offices",
      "Operational security and transparency reports"
    ],
    partnerNetworks: [
      "International Philanthropic Advisers",
      "Bilateral Aid Attachés",
      "Civil Society Coalition for Accountability and Legislative Advocacy"
    ]
  }
];

export const GENERAL_METRICS: MetricItem[] = [
  {
    id: "interventions",
    value: "15+",
    label: "State Interventions",
    description: "Comprehensive advisory models deployed across multiple subnational jurisdictions, improving health access and policy governance."
  },
  {
    id: "projects",
    value: "40+",
    label: "Global Partner Projects",
    description: "Successful joint portfolios executed with major international donors, UN affiliates, and philanthropic networks."
  },
  {
    id: "accountability",
    value: "100%",
    label: "Project Accountability",
    description: "Impeccable fiscal, structural, and administrative tracking logs, verified by international audit authorities."
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
    category: "Corporate Engagement",
    title: "Kaduna State Government Executive Interview & Partnership Plan",
    summary: "Reviewing our recent policy monitoring framework on public services, accountability governance, and structural health deployments across the northwestern zone.",
    date: "May 20, 2026",
    readTime: "7 min read",
    engagement: "Bilateral Strategy",
    author: "DPCL Advisory Council"
  },
  {
    id: "healthy-living",
    category: "Sustainable Development",
    title: "Building Healthy Lifestyles & Living: Framework for Subnational Infrastructure",
    summary: "A comprehensive analysis of public health delivery systems and wellness centers, prioritizing local community funding pathways and municipal engagement models.",
    date: "April 12, 2026",
    readTime: "12 min read",
    engagement: "Health Policy Blueprint",
    author: "Dr. K. Ukwaja"
  },
  {
    id: "fcdo-transparency",
    category: "Governance Audit",
    title: "Strengthening Fiscal Integrity in Private Sector Development Alignments",
    summary: "How modern public-private dialogues yield robust local outcomes. A retro-analysis of FCDO sub-grantees' administrative capacities and policy milestones.",
    date: "March 05, 2026",
    readTime: "5 min read",
    engagement: "Compliance Blueprint",
    author: "Iro Okechukwu"
  }
];
