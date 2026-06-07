export interface SiteConfig {
  companyName: string;
  shortName: string;
  logoText: string;
  logoPath: string; // Easily replaceable path or indicator
  logoUrl?: string; // Custom real-time logo image link
  previewImageUrl?: string; // Social preview image link
  description?: string; // Site preview metadata description
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  officeHours: string;
  regNumber: string;
  socials: {
    facebook: string;
    twitter: string;
    github: string;
    googlePlus: string;
  };
}

export const siteConfig: SiteConfig = {
  companyName: "Development Consult Plus Limited",
  shortName: "DPCL",
  logoText: "DP",
  logoPath: "/assets/logo.png",
  logoUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=150", 
  previewImageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
  description: "Premium landing page and consulting hub for Development Consult Plus Limited (DPCL), an elite international development consulting firm.",
  contactEmail: "k.ukwaja@dpcl-consulting.com",
  contactPhone: "+234.703.068.4093",
  contactAddress: "3rd Floor, Valley Plaza, Plot 215, Aminu Kano Crescent, Wuse II, Abuja, FCT, Nigeria.",
  officeHours: "Monday — Friday: 08:30 to 17:00 (GMT+1 / West Africa Time)",
  regNumber: "RC-2021-992-DPCL",
  socials: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    github: "https://github.com",
    googlePlus: "https://plus.google.com"
  }
};

export interface HeroSlideItem {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 1,
    badge: "EXPERT ADVISORY SOLUTIONS",
    title: "DEVELOPMENT CONSULT PLUS LIMITED",
    subtitle: "Empowering Lives through Expertise, Vision, and Advanced Technological Endeavors.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: 2,
    badge: "CAPACITY BUILDING",
    title: "HEALTH SYSTEMS STRENGTHENING",
    subtitle: "Health Enhancements Achieved through Leadership, Technology, and Systems Strengthening.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: 3,
    badge: "FISCAL ACCOUNTABILITY",
    title: "PUBLIC FINANCIAL MANAGEMENT",
    subtitle: "Financial Integrity, Strategy, Compliance, Accountability, and Leadership for Wise Economic Management.",
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: 4,
    badge: "DEMAND SIDE FINANCING",
    title: "HEALTH FINANCING",
    subtitle: "Financially Upholding Needs for Diverse Wellness Ensuring Lifelong Liveliness.",
    imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=1600"
  }
];

export interface CoreAreaItem {
  id: string;
  title: string;
  text: string;
  badge: string;
  iconName: string; // lucide icon name representation
  routeLink: string;
}

export const CORE_AREAS_DATA: CoreAreaItem[] = [
  {
    id: "health-systems",
    title: "Health Systems Strengthening",
    text: "Foreign Commonwealth and Development Office (FCDO) funded Health Programme in Nigeria, focusing on healthcare system optimization, decentralized medical care, and professional development training.",
    badge: "FCDO",
    iconName: "Shield",
    routeLink: "#contact"
  },
  {
    id: "financial-mgmt",
    title: "Public Financial Management",
    text: "Federal Ministry of Finance and Nigeria Governors' Forum funded Strengthening the Fiscal Sustainability, Transparency and Accountability of Nigerian States (SFTAS) framework.",
    badge: "SFTAS",
    iconName: "Landmark",
    routeLink: "#contact"
  },
  {
    id: "health-financing",
    title: "Health Financing",
    text: "Bill and Melinda Gates Foundation (BMGF) funded Demand Side Financing (DSF) Program implemented by Results for Development, Washington D.C., in collaboration with the Kaduna State Contributory Health Management Authority (KADCHMA).",
    badge: "BMGF & R4D",
    iconName: "Coins",
    routeLink: "#contact"
  },
  {
    id: "governance-engagement",
    title: "Governance & Citizen Engagement",
    text: "Empowering communities through fiscal audits, interactive capacity building program implementations, health advocacy boards, and policy compliance verification tasks.",
    badge: "GOVERNANCE",
    iconName: "Users",
    routeLink: "#contact"
  }
];

export interface MilestoneItem {
  id: string;
  target: number;
  label: string;
  displayValue: string; // display string representation like "45+", "12", etc.
  suffix?: string;
  iconName: string;
}

export const MILESTONES_DATA: MilestoneItem[] = [
  { id: "partners", target: 5, displayValue: "5+", label: "Professional Affiliations", iconName: "Award" },
  { id: "projects", target: 45, displayValue: "45+", label: "Projects Coordinated", iconName: "Briefcase" },
  { id: "facilities", target: 650, displayValue: "650+", label: "Facilities Supported", iconName: "Landmark" },
  { id: "states", target: 12, displayValue: "12", label: "States Impacted", iconName: "CheckCircle" }
];

export interface TeamProfileItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  isPending: boolean;
  avatarText: string;
  avatarUrl?: string; // easy replacement for custom team avatar paths
}

export const TEAM_MEMBERS_DATA: TeamProfileItem[] = [
  {
    id: "ebenezer-uchenna",
    name: "EBENEZER UCHENNA",
    role: "PRINCIPAL PARTNER",
    bio: "As the principal partner, Uche Ebenezer brings extensive experience in the health development sector across Nigeria and sub-Saharan Africa. Specializing in health systems strengthening and health financing, Uche has contributed to projects funded by leading organizations like UNAIDS, USAID, BMGF, The World Bank, and The Global Fund.",
    isPending: false,
    avatarText: "EU",
    avatarUrl: ""
  },
  {
    id: "maikano-adamu",
    name: "MAIKANO ADAMU",
    role: "SENIOR MEDICAL REFORM PARTNER",
    bio: "Maikano Adamu, a distinguished medical doctor, boasts a comprehensive academic background, holding a Master's in Public Health from London Metropolitan University, United Kingdom, and a Master's in Health Policy Planning and Financing from the prestigious London School of Economics and London School of Hygiene and Tropical Medicine.",
    isPending: false,
    avatarText: "MA",
    avatarUrl: ""
  }
];

export interface AffiliationItem {
  id: string;
  fullName: string;
  initials: string;
  imageUrl: string; // Dynamic customizable logo image URL
  color: string; // Accent color border or tint
}

export const AFFILIATIONS_DATA: AffiliationItem[] = [
  {
    id: "aff-1",
    fullName: "INSTITUTE OF HEALTH INSURANCE AND MANAGED CARE OF NIGERIA",
    initials: "IHIMN",
    imageUrl: "https://images.unsplash.com/photo-1578496479531-32e296d5c6e1?auto=format&fit=crop&q=80&w=150",
    color: "#3b82f6"
  },
  {
    id: "aff-2",
    fullName: "PHARMACEUTICAL SOCIETY OF NIGERIA",
    initials: "PSN",
    imageUrl: "https://images.unsplash.com/photo-1628771065518-0d82f1116703?auto=format&fit=crop&q=80&w=150",
    color: "#10b981"
  },
  {
    id: "aff-3",
    fullName: "NIGERIA MEDICAL ASSOCIATION",
    initials: "NMA",
    imageUrl: "https://images.unsplash.com/photo-1605684954998-c85c79d546a8?auto=format&fit=crop&q=80&w=150",
    color: "#ef4444"
  },
  {
    id: "aff-4",
    fullName: "ROYAL SOCIETY OF PUBLIC HEALTH OF GREAT BRITAIN",
    initials: "RSPH",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=150",
    color: "#f59e0b"
  },
  {
    id: "aff-5",
    fullName: "NATIONAL ASSOCIATION FOR PUBLIC HEALTH PRACTITIONERS COUNCIL IN NIGERIA",
    initials: "NAPHPPCN",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=150",
    color: "#a855f7"
  }
];

export interface BlogItem {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  text: string;
  category: string;
}

export const BLOGS_DATA: BlogItem[] = [
  {
    id: "blog-1",
    title: "USA, International Triathlon Event",
    date: "June 12, 2026",
    imageUrl: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=600&q=80",
    text: "Reviewing international healthcare preparedness guidelines, participant support benchmarks, and emergency response structures compiled for global extreme athletic formats.",
    category: "HEALTH POLICY"
  },
  {
    id: "blog-2",
    title: "New Device Developed by Microsoft",
    date: "May 28, 2026",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    text: "An administrative breakdown exploring cloud-connected diagnostic integration tools designed by Microsoft to improve clinical accuracy in remote decentralization clinics.",
    category: "DIGITAL INNOVATION"
  },
  {
    id: "blog-3",
    title: "Healthy Lifestyle & Living",
    date: "April 15, 2026",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80",
    text: "Strategic steps targeting localized preventive disease frameworks, nutrition campaigns, physical fitness integration, and active community wellness guidelines.",
    category: "PUBLIC HYGIENE & WELLNESS"
  }
];

export interface PublicationItem {
  id: string;
  category: "Health Systems" | "Public Finance" | "Institutional Strategy" | string;
  title: string;
  summary: string;
  pdfUrl: string;
}

export const PUBLICATIONS_DATA: PublicationItem[] = [
  {
    id: "pub-01",
    category: "Public Finance",
    title: "Diagnostic Reports of Key Development Sectors: Plateau State",
    summary: "This diagnostic report assesses Plateau State's performance gaps across education, public financial management, open governance, and health sectors relative to the Plateau State Development Strategy (PSDS). It provides actionable, context-driven recommendations to strengthen fiscal transparency, budget processes, and sectoral governance for improved donor assistance and state performance.",
    pdfUrl: "/documents/pea_plateau_state.pdf"
  },
  {
    id: "pub-02",
    category: "Health Systems",
    title: "Operations Research Phase I: Training Workshop Report for GoHealth",
    summary: "This report details a four-day training workshop that equipped GoHealth management staff with operations research methodologies to identify system improvement needs and design strategic interventions. Participants learned to apply scientific, mathematical, and logical approaches to healthcare challenges, enhancing their capacity to conduct research and publish findings.",
    pdfUrl: "/documents/operations_research-phase_1_gohealth_workshop_report.pdf"
  },
  {
    id: "pub-03",
    category: "Health Systems",
    title: "Political Economy Analysis of the Health Sector: Plateau State",
    summary: "This analysis examines health system structure, funding flows, and service delivery challenges in Plateau State, identifying critical bottlenecks such as memo approval delays and liquidity management constraints. It offers an influence-interest matrix to strategically target stakeholders and provides seven evidence-based recommendations to improve public health investment and accountability.",
    pdfUrl: "/documents/dpcl-plateau_pea_report.pdf"
  },
  {
    id: "pub-04",
    category: "Health Systems",
    title: "Inception Meeting Report: Institutional Strengthening of GoHealth",
    summary: "This inception report outlines the technical assistance approach to strengthen Gombe State's Contributory Healthcare Management Agency (GoHealth) for achieving universal health coverage. It documents stakeholder engagement, OCAT deployment, and workplan adoption to align project scope with state health financing and primary care reforms.",
    pdfUrl: "/documents/inception_meeting_report_institutional_strengthening_of_gohealth.pdf"
  },
  {
    id: "pub-05",
    category: "Health Systems",
    title: "Training on Effective Communication Strategies: Concept and Strategies for GoHealth",
    summary: "This training report equips GoHealth's communication team with social and behavioral change communication (SBCC) frameworks, theory of change models, and effective health communication characteristics. Participants co-created a communications plan to drive demand for social health insurance products and improve public engagement.",
    pdfUrl: "/documents/gohealth_training_report_effective_communication_strategies.pdf"
  },
  {
    id: "pub-06",
    category: "Health Systems",
    title: "Training in Monitoring & Evaluation: Fundamentals of M&E for GoHealth",
    summary: "This four-day off-site training built GoHealth staff capacity in logic frameworks, indicator definitions, and M&E plan development to strengthen results-based management. The training yielded a draft M&E plan that enables data-driven course correction, resource allocation, and organizational learning.",
    pdfUrl: "/documents/gohealth_training_report_on_m_&_e.pdf"
  },
  {
    id: "pub-07",
    category: "Institutional Strategy",
    title: "Executive Brief: Key Findings from the OCAT Analysis - Gombe State Contributory Healthcare Management Agency (GoHealth)",
    summary: "This organizational capacity assessment evaluates GoHealth across eleven domains including governance, finance, human resources, and monitoring & evaluation. The analysis identifies strengths and weaknesses, providing low-hanging fruit recommendations and a sequenced capacity-building roadmap to enhance institutional performance.",
    pdfUrl: "/documents/executive_brief_of_key_findings_ocat_analysis.pdf"
  },
  {
    id: "pub-08",
    category: "Institutional Strategy",
    title: "GoHealth Capacity Building Plan: Training Developed and Implemented",
    summary: "This capacity building plan maps ten targeted training interventions across monitoring & evaluation, human resources, communication, operations research, and program management. Using a hybrid off-site and on-site handholding approach, the plan addresses critical gaps identified through OCAT analysis to strengthen GoHealth's institutional effectiveness.",
    pdfUrl: "/documents/gohealth-capacity_building_plan_&_training_developed_&_implemented.pdf"
  }
];

