export interface CompanyDetails {
  legalName: string;
  shortName: string;
  cacNumber: string;
  registeredAddress: string;
  operationalAddress: string;
  email: string;
  phones: string[];
}

export const companyDetails: CompanyDetails = {
  legalName: "Development Plus Health Consult Limited",
  shortName: "DPCL",
  cacNumber: "1876089",
  registeredAddress: "Plot 337, Cherry Street, Mac Global Estate, Gwarinpa, Abuja, FCT, Nigeria",
  operationalAddress: "Centre La Sharp Building Complex, No. 4 & 6 Gut Road, Rayfield, Jos, Plateau State, Nigeria",
  email: "info@dpcl.com.ng",
  phones: ["+234703-068-4093", "+234-803-2597-804"]
};

export interface SiteConfig {
  companyName: string;
  shortName: string;
  logoText: string;
  logoPath: string;
  logoUrl?: string;
  previewImageUrl?: string;
  description?: string;
  contactEmail: string;
  contactPhone: string;
  operationalAddress: string;
  registeredAddress: string;
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
  companyName: "Development Plus Health Consult Limited",
  shortName: "DPCL",
  logoText: "DP",
  logoPath: "/assets/logo.png",
  logoUrl: "https://res.cloudinary.com/drcroxtgs/image/upload/v1780822868/Screenshot_20260607-095224_xnvdie.jpg", 
  previewImageUrl: "https://res.cloudinary.com/drcroxtgs/image/upload/v1780822868/Screenshot_20260607-095224_xnvdie.jpg",
  description: "Premium landing page and consulting hub for Development Plus Health Consult Limited (DPCL), an elite international development consulting firm.",
  contactEmail: "info@dpcl.com.ng",
  contactPhone: "+234703-068-4093, +234-803-2597-804",
  operationalAddress: "Centre La Sharp Building Complex, No. 4 & 6 Gut Road, Rayfield, Jos, Plateau State, Nigeria",
  registeredAddress: "Plot 337, Cherry Street, Mac Global Estate, Gwarinpa, Abuja, FCT, Nigeria",
  officeHours: "Monday — Friday: 08:30 to 17:00 (GMT+1 / West Africa Time)",
  regNumber: "1876089",
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
    title: "DEVELOPMENT PLUS HEALTH CONSULT LIMITED",
    subtitle: "Empowering communities and strengthening governance through evidence-based strategic advisory solutions.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: 2,
    badge: "CAPACITY BUILDING",
    title: "HEALTH SYSTEMS STRENGTHENING",
    subtitle: "Optimizing healthcare infrastructure, clinical service delivery frameworks, and institutional performance monitoring.",
    imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: 3,
    badge: "FISCAL ACCOUNTABILITY",
    title: "PUBLIC FINANCIAL MANAGEMENT",
    subtitle: "Driving public sector integrity, budget transparency, compliance audits, and fiscal sustainability programs.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: 4,
    badge: "DEMAND SIDE FINANCING",
    title: "HEALTH FINANCING & POLICY",
    subtitle: "Designing sustainable health insurance architectures to ensure affordable, quality healthcare access for all citizens.",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1600"
  }
];

export interface CoreAreaItem {
  id: string;
  title: string;
  text: string;
  badge: string;
  iconName: string;
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
    id: "digital-health-tools",
    title: "Digital Tools for Health & Strategic Information",
    text: "DPCL combines public health expertise with advanced digital health and strategic information capabilities, including DHIS2, electronic medical records, dashboards, logistics management information systems, cloud-based platforms, data visualization tools, and database management systems but not limited to the electronic Nigeria National Response Information Management System (eNNRIMS), NAVSION to track HIV commodities and support quantification, dashboards, HRH registry and data visualization tools, LAMIS, CSPro, KoboCollect, Power BI, SPSS, and Microsoft Excel.",
    badge: "STRATEGIC INFO",
    iconName: "Cpu",
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
  displayValue: string;
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
  avatarUrl?: string;
}

export const TEAM_MEMBERS_DATA: TeamProfileItem[] = [
  {
    id: "uchenna-ebenezer",
    name: "Pharm. Uchenna Ebenezer",
    role: "Director, Health Systems Strengthening/Health Financing",
    bio: "She is an outstanding health professional with 20+ years of international health leadership experience within Africa. Proven technical expertise in deploying strategic, governance, operational, and programmatic approaches in HIV, Tuberculosis (TB), Malaria, and Maternal, Newborn and Child Health (MNCH) interventions. Uche has 20+ years’ experience in the development sector, particularly in Nigeria, sub-Saharan Africa. She is a health financing/health system strengthening expert with an MSc in Health Economics, Policy & Management and an MPH from the University of Nigeria, Nsukka. She is an EDCTP/WANETAM-Talent PhD Fellow at the London School of Hygiene & Tropical Medicine, United Kingdom. She also holds a certification on population & reproductive health from Queen Margaret University, Edinburgh, in addition to other certificates from the University of Washington. She has held several positions including Technical Director/Health Financing Expert at Development Plus Consult Limited (DPCL), State Human Resources for Health (HRH) Coordinator at USAID/Nigeria Health Workforce Management, Ebonyi State Nigeria, Consultant(Demand Side Financing) at Results for Development (R4D) Washington DC , Consultant Drug Revolving Fund at Management Sciences for Health (MSH), State Program Officer at APIN Public Health Initiatives and Mothergold Consulting Limited, Consultant at the State Primary Health Care Development Agency (SPHCDA) on Annual Operational Plan (AOP) Development at Palladium International Development Nigeria Limited and Consultant in Health System Strengthening/Equity at the USAID/Maternal Child Survival Program (MCSP) under Results for Development, Washington D.C. Uche was a Grantee of John D. & Catherine T. MacArthur Foundation Nigeria Leadership Development Programme.",
    isPending: false,
    avatarText: "UE",
    avatarUrl: "https://res.cloudinary.com/drcroxtgs/image/upload/v1780865977/Pharm_Uchenna_Ebenezer_vwdeed.jpg"
  },
  {
    id: "adamu-maikano",
    name: "Dr. Adamu Maikano",
    role: "Director, Strategy and Partnerships",
    bio: "Dr. Adamu Maikano, He holds a Medical Degree from the University of Jos, as well as a Master’s in Public Health from London Metropolitan University and a Masters in Health Policy Planning and Financing from London School of Economics and London School of Hygiene and Tropical Medicine.\n\nWith a 14 years’ experience, Dr. Maikano has held various roles in his career, including Regional Coordinator at the Foreign Commonwealth and Development Office (FCDO)-Kano, Health Financing Consultant at Development Plus Consult Limited (DPCL) and Result for Development (R4D), and Consultant for Political Economy Analysis for Improved Public Investment in Health for the FCDO-Lafiya Project in Kaduna State. He has also served as Technical Advisor for Public Financial Management/Domestic Resource Mobilization at Palladium Health Policy Plus, and Program Officer for Save One Million Lives (SOML) Project at AIDS Prevention Initiative in Nigeria (APIN) Public Health Initiatives in Abuja, Nigeria.",
    isPending: false,
    avatarText: "AM",
    avatarUrl: "https://res.cloudinary.com/drcroxtgs/image/upload/v1780865976/Dr.Adamu_Maikano_Director_Strategy_Partnerships_ng4qlr.jpg"
  },
  {
    id: "frank-emerenini",
    name: "Dr. Franklin Emerenini",
    role: "Technical Lead - Clinical Services & Support",
    bio: "Dr Franklin Emerenini is a Pediatrician with Msc in Public Health, Masters in International Affairs and diplomacy, has over 20 years of experience leading high-impact RMNCH, newborn survival, nutrition, and HIV/PMTCT programs across multiple African countries. Proven expertise in providing global and country-level technical leadership, designing and scaling evidence-based interventions, strengthening health systems, and ensuring alignment with WHO, World bank, Gates and USG/PEPFAR guidelines. Extensive experience delivering technical assistance to Ministries of Health, managing multi-country teams, supporting consortium partners, and driving quality improvement through data-driven approaches. Strong track record in policy development, operational research, and knowledge dissemination, with demonstrated ability to translate state-of-the-art science into sustainable program impact. He has proven ability in institutional capacity building, and training manual development.",
    isPending: false,
    avatarText: "FE",
    avatarUrl: "https://res.cloudinary.com/drcroxtgs/image/upload/v1780865976/Dr.Franklin_Emerenini_Technical_Lead_Clinical_Services_hlfjej.jpg"
  },
  {
    id: "chima-ugwu",
    name: "Pharm. Chima Ugwu",
    role: "Technical Advisor - Monitoring & Evaluation",
    bio: "A public health pharmacist and results-driven Monitoring & Evaluation specialist with over a decade of technical leadership on large-scale, donor-funded health programmes across Nigeria. Expert in designing complex field assessments and data quality systems for the World Bank, Global Fund, WHO, and UN agencies.",
    isPending: false,
    avatarText: "CU",
    avatarUrl: "https://res.cloudinary.com/drcroxtgs/image/upload/v1780869738/Screenshot_20260607-224008_rgddov.jpg"
  },
  {
    id: "michael-olawuyi",
    name: "Dr. Michael Olawuyi",
    role: "Director, Global Health",
    bio: "A results-driven development and public health expert with more than a decade of experience leading the design, implementation, and evaluation of health systems strengthening initiatives across international, national, and subnational contexts, with deep expertise in Sexual and Reproductive Health (SRH) and HIV platforms.",
    isPending: false,
    avatarText: "MO",
    avatarUrl: "https://res.cloudinary.com/drcroxtgs/image/upload/v1780865977/Dr.Mike_Director_Global_Health_tgpi5s.png"
  },
  {
    id: "kingsley-ukwaja",
    name: "Prof. Kingsley Ukwaja",
    role: "Director, Research & Innovation",
    bio: "A clinician-scientist and public health specialist with deep expertise in internal medicine, pulmonology, and health systems research. Blends advanced clinical training (FWACP, MSc LSHTM) with over 15 years of field-driven epidemiological and operational research, alongside high-impact academic publishing (130+ papers).",
    isPending: false,
    avatarText: "KU",
    avatarUrl: "https://res.cloudinary.com/drcroxtgs/image/upload/v1780865975/Professor_Kingsely_Ukwaja_Director_Research_e7ru5k.jpg"
  }
];

export interface AffiliationItem {
  id: string;
  fullName: string;
  initials: string;
  imageUrl: string;
  color: string;
}

export const AFFILIATIONS_DATA: AffiliationItem[] = [
  {
    id: "aff-1",
    fullName: "INSTITUTE OF HEALTH INSURANCE AND MANAGED CARE OF NIGERIA",
    initials: "IHIMN",
    imageUrl: "",
    color: "#3b82f6"
  },
  {
    id: "aff-2",
    fullName: "PHARMACEUTICAL SOCIETY OF NIGERIA",
    initials: "PSN",
    imageUrl: "https://res.cloudinary.com/drcroxtgs/image/upload/v1780831357/PSN_t1gdti.png",
    color: "#10b981"
  },
  {
    id: "aff-3",
    fullName: "NIGERIA MEDICAL ASSOCIATION",
    initials: "NMA",
    imageUrl: "https://res.cloudinary.com/drcroxtgs/image/upload/v1780831357/nMA_t2xafx.png",
    color: "#ef4444"
  },
  {
    id: "aff-4",
    fullName: "ROYAL SOCIETY OF PUBLIC HEALTH OF GREAT BRITAIN",
    initials: "RSPH",
    imageUrl: "https://res.cloudinary.com/drcroxtgs/image/upload/v1780831357/RSPH_echscd.png",
    color: "#f59e0b"
  },
  {
    id: "aff-5",
    fullName: "NATIONAL ASSOCIATION FOR PUBLIC HEALTH PRACTITIONERS COUNCIL IN NIGERIA",
    initials: "NAPHPPCN",
    imageUrl: "",
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
    title: "Optimizing State Health Schemes: Key Operational Requirements",
    date: "June 12, 2026",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    text: "Reviewing comprehensive institutional protocols, risk management frameworks, and data tracking matrices necessary to support public equity health enrollment programs safely.",
    category: "HEALTH POLICY"
  },
  {
    id: "blog-2",
    title: "Fiscal Sustainability: Technical Insights from SFTAS Implementations",
    date: "May 28, 2026",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
    text: "An administrative assessment analyzing budget execution tracking systems, open governance criteria, and strategic revenue transparency metrics deployed across subnational units.",
    category: "PUBLIC FINANCE"
  },
  {
    id: "blog-3",
    title: "Strengthening Monitoring & Evaluation in Social Health Insurance",
    date: "April 15, 2026",
    imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
    text: "A technical blueprint showcasing evidence-driven course correction metrics, data visualization pathways, and indicator structures optimized for state-level capacity managers.",
    category: "RESEARCH & DEVELOPMENT"
  }
];

export interface Publication {
  id: string;
  category: "Health Systems" | "Public Finance" | "Institutional Strategy";
  title: string;
  documentType: string;
  summary: string;
  pdfUrl: string;
}

export const technicalPublications: Publication[] = [
  {
    "id": "pub-01",
    "category": "Public Finance",
    "title": "Diagnostic Reports of Key Development Sectors: Plateau State",
    "documentType": "Diagnostic Assessment",
    "summary": "This comprehensive diagnostic report analyzes performance gaps across Plateau State's education, public financial management, open governance, and health sectors relative to the Plateau State Development Strategy. It delivers evidence-based, context-driven recommendations to strengthen fiscal transparency, budget processes, and sectoral governance.",
    "pdfUrl": "https://drive.google.com/file/d/1WojNMu4KG4-6pFSEDi_Ue4pmCVfDvrce/preview"
  },
  {
    "id": "pub-02",
    "category": "Health Systems",
    "title": "Operations Research Phase I: Training Workshop Report for GoHealth",
    "documentType": "Training Completion Report",
    "summary": "This report documents a four-day operations research training workshop delivered to GoHealth management staff, covering research methodologies, manuscript development, and system improvement design. Pre- and post-training assessments demonstrate marked improvement in participant understanding of operations research concepts.",
    "pdfUrl": "https://drive.google.com/file/d/1JidKAOB5Sl6exUPvIdiu1Rv5nzra_olA/preview"
  },
  {
    "id": "pub-03",
    "category": "Health Systems",
    "title": "Political Economy Analysis of the Health Sector: Plateau State",
    "documentType": "Diagnostic Assessment",
    "summary": "This political economy analysis examines health system structure, funding flows, and service delivery bottlenecks in Plateau State through key informant interviews and desk review. It presents an influence-interest matrix for strategic stakeholder targeting and offers seven actionable recommendations to improve public health investment.",
    "pdfUrl": "https://drive.google.com/file/d/1by9k639mx9hKEx0p4eSP9X6SsQkU-s7i/preview"
  },
  {
    "id": "pub-04",
    "category": "Health Systems",
    "title": "Inception Meeting Report: Institutional Strengthening of GoHealth",
    "documentType": "Inception Report",
    "summary": "This inception report establishes the scope, methodology, and stakeholder engagement framework for providing technical assistance to Gombe State's Contributory Healthcare Management Agency. It documents entry meetings, OCAT deployment planning, and workplan adoption for institutional strengthening.",
    "pdfUrl": "https://drive.google.com/file/d/1lOH_dHH0tK0hSZutsUhbqvrR5SN8aN6y/preview"
  },
  {
    "id": "pub-05",
    "category": "Health Systems",
    "title": "Training on Effective Communication Strategies: Concept and Strategies for GoHealth",
    "documentType": "Training Completion Report",
    "summary": "This training report details a three-day workshop that equipped GoHealth's communication team with social and behavioral change communication frameworks and theory of change models. Participants co-created a communications plan to drive demand for social health insurance products and improve public engagement.",
    "pdfUrl": "https://drive.google.com/file/d/1m54OoQeSVx-k19Rp1loFyXU_Iw1LGqdQ/preview"
  },
  {
    "id": "pub-06",
    "category": "Health Systems",
    "title": "Training in Monitoring & Evaluation: Fundamentals of M&E for GoHealth",
    "documentType": "Training Completion Report",
    "summary": "This four-day training report documents capacity building for GoHealth staff on logic frameworks, indicator development, and M&E plan design. The training produced a draft M&E plan enabling data-driven course correction and resource allocation, with pre- and post-test results showing significant knowledge gains.",
    "pdfUrl": "https://drive.google.com/file/d/1NPsI0CLrW3cVwC6emmbck8jYtOPkeYn-/preview"
  },
  {
    "id": "pub-07",
    "category": "Institutional Strategy",
    "title": "Executive Brief: Key Findings from the OCAT Analysis - Gombe State Contributory Healthcare Management Agency",
    "documentType": "Diagnostic Assessment",
    "summary": "This organizational capacity assessment evaluates GoHealth across eleven domains including governance, finance, human resources, and monitoring & evaluation. The analysis identifies institutional strengths, critical gaps, and low-hanging fruit recommendations with a sequenced capacity-building roadmap.",
    "pdfUrl": "https://drive.google.com/file/d/1ZIJrUYXtM_-nEPnqQh1HV3rIraZEvMzn/preview"
  },
  {
    "id": "pub-08",
    "category": "Institutional Strategy",
    "title": "GoHealth Capacity Building Plan: Training Developed and Implemented",
    "documentType": "Capacity Building Plan",
    "summary": "This capacity building plan maps ten targeted training interventions across monitoring & evaluation, human resources, communication, operations research, and program management. The plan outlines a hybrid delivery model combining off-site workshops and on-site handholding sessions to address organizational capacity gaps.",
    "pdfUrl": "https://drive.google.com/file/d/16jrjxzKxbUzQKhSC1R-wtKHCVdtmjT2T/preview"
  }
];
