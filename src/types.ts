export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  imageTheme?: string;
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
  scopeLabel: string;
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
  author: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'all' | 'health' | 'governance' | 'strategy';
  location: string;
  year: string;
  imageUrl: string;
  docCode: string;
  summary: string;
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
