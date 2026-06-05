export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  imageTheme: string;
  align: 'left' | 'center' | 'right';
  bgColor: string;
}

export interface FocusArea {
  id: string;
  number: string;
  title: string;
  description: string;
  outcomes: string[];
  partnerNetworks: string[];
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualification: string;
  bio: string;
  avatarText: string;
  email: string;
  specialization: string;
}

export interface InsightItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  engagement: string;
  author: string;
}

export interface AlignmentRequest {
  partnerType: string;
  focusArea: string;
  region: string;
  projectScope: string;
  donorName: string;
  email: string;
}

export interface AlignmentResult {
  matchRate: number;
  strategicPillars: string[];
  suggestedFramework: string;
  expectedOutcomes: string[];
  dpclTrackRecord: string;
}

export interface ConsultationInquiry {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}
