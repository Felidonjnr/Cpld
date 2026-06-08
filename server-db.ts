// In-Memory Database Store replacing Firebase Firestore to achieve full Supabase migration
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  text: string;
  status: 'Draft' | 'Published';
}

export interface CoreArea {
  id: string;
  title: string;
  text: string;
  badge: string;
}

export interface Milestone {
  id: string;
  target: number;
  label: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  isPending: boolean;
  avatarText: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface DbHeroSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
}

export interface DbAffiliation {
  id: string;
  fullName: string;
  initials: string;
  icon: string;
  color: string;
}

export interface DbSchema {
  users: User[];
  blogs: BlogPost[];
  coreAreas: CoreArea[];
  milestones: Milestone[];
  teamMembers: TeamMember[];
  inquiries: Inquiry[];
  heroSlides: DbHeroSlide[];
  affiliations: DbAffiliation[];
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

const INITIAL_DATA: DbSchema = {
  users: [
    {
      id: "admin-1",
      email: "admin@dpcl.com",
      passwordHash: "21232f297a57a5a743894a0e4a801fc3",
      role: "admin"
    },
    {
      id: "admin-2",
      email: "godshandudoh@gmail.com",
      passwordHash: "21232f297a57a5a743894a0e4a801fc3",
      role: "admin"
    }
  ],
  blogs: [
    {
      id: "blog-1",
      title: "USA, International Triathlon Event",
      date: "June 12, 2026",
      imageUrl: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=600&q=80",
      text: "Reviewing international healthcare preparedness guidelines, participant support benchmarks, and emergency response structures compiled for global extreme athletic formats.",
      category: "HEALTH POLICY",
      status: "Published"
    },
    {
      id: "blog-2",
      title: "New Device Developed by Microsoft",
      date: "May 28, 2026",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      text: "An administrative breakdown exploring cloud-connected diagnostic integration tools designed by Microsoft to improve clinical accuracy in remote decentralization clinics.",
      category: "DIGITAL INNOVATION",
      status: "Published"
    },
    {
      id: "blog-3",
      title: "Diagnostic Assessment of the Ministry of Budget and Economic Planning",
      date: "August 14, 2025",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      text: "Comprehensive advisory review detailing structural optimization, capacity audits, and resources efficiency scaling indicators of provincial public financial frameworks.",
      category: "PUBLIC FINANCIAL MANAGEMENT",
      status: "Published"
    }
  ],
  coreAreas: [
    {
      id: "health-systems",
      title: "Health Systems Strengthening",
      text: "Foreign Commonwealth and Development Office (FCDO) funded Health Programme in Nigeria...",
      badge: "FCDO"
    },
    {
      id: "financial-mgmt",
      title: "Public Financial Management",
      text: "Federal Ministry of Finance and Nigeria Governors' Forum funded Strengthening the Fiscal Sustainability, Transparency and Accountability of Nigerian States (SFTAS)...",
      badge: "SFTAS"
    },
    {
      id: "health-financing",
      title: "Health Financing",
      text: "Demand Side Financing (DSF) Program implemented in collaboration with the Kaduna State Contributory Health Management Authority (KADCHMA)...",
      badge: "BMGF & R4D"
    },
    {
      id: "governance-engagement",
      title: "Governance & Accountability",
      text: "Advising statutory public health committees, legislative circles, and inter-agency working teams on policy framework delivery, program evaluation, and service integration metrics.",
      badge: "GOVERNMENT OF NIGERIA"
    }
  ],
  milestones: [
    { id: "stat-1", target: 45, label: "States & Federal agencies advised" },
    { id: "stat-2", target: 80, label: "Core policy framework reports delivered" },
    { id: "stat-3", target: 12, label: "National program audits executed" },
    { id: "stat-4", target: 15, label: "Years of excellence since incorporation" }
  ],
  teamMembers: [
    {
      id: "partner-1",
      name: "Dr. Godshand Udoh",
      role: "Managing Partner",
      bio: "An eminent administrator, health economist, and policy consultant who has directed multiple high-level ministerial audits and health systems strengthening missions.",
      isPending: false,
      avatarText: "GU"
    }
  ],
  inquiries: [],
  heroSlides: [
    {
      id: "slide-1",
      title: "HEALTH POLICY ADVISORY & SYSTEMS TRANSFORMATION",
      subtitle: "Empowering governments, corporate partners, and international development agencies with evidence-based advisory panels and program evaluation systems.",
      badge: "EXPERT SOLUTIONS",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600"
    }
  ],
  affiliations: [
    {
      id: "aff-1",
      fullName: "INSTITUTE OF HEALTH INSURANCE AND MANAGED CARE OF NIGERIA",
      initials: "IHIMN",
      icon: "activity",
      color: "#3b82f6"
    }
  ]
};

import fs from 'fs';
import path from 'path';

const DB_FILE_PATH = path.join(process.cwd(), 'db_store.json');

// Simple active store initialized from disk or template
const DB_STORE_INSTANCE: DbSchema = (() => {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      console.log("[DB] Loading existing database from disk:", DB_FILE_PATH);
      const fileData = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error("[DB] Failed to read database from disk, using template:", err);
  }

  const initialCopy = JSON.parse(JSON.stringify(INITIAL_DATA));
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initialCopy, null, 2), 'utf-8');
    console.log("[DB] Created initial database file:", DB_FILE_PATH);
  } catch (err) {
    console.error("[DB] Failed to write initial database file:", err);
  }
  return initialCopy;
})();

function saveDb() {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(DB_STORE_INSTANCE, null, 2), 'utf-8');
  } catch (err) {
    console.error("[DB] Critical error saving database state to disk:", err);
  }
}

export class DbStore {
  static async seedIfEmpty(): Promise<void> {
    console.log("Database file persistence architecture is active.");
  }

  // USERS
  static async getUsers(): Promise<User[]> {
    return DB_STORE_INSTANCE.users;
  }

  // BLOGS
  static async getBlogs(): Promise<BlogPost[]> {
    return DB_STORE_INSTANCE.blogs;
  }

  static async addBlog(blog: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    const newBlog = { ...blog, id: `blog-${Date.now()}` };
    DB_STORE_INSTANCE.blogs.unshift(newBlog);
    saveDb();
    return newBlog;
  }

  static async updateBlog(id: string, updated: Partial<BlogPost>): Promise<BlogPost | null> {
    const idx = DB_STORE_INSTANCE.blogs.findIndex(b => b.id === id);
    if (idx === -1) return null;
    DB_STORE_INSTANCE.blogs[idx] = { ...DB_STORE_INSTANCE.blogs[idx], ...updated };
    saveDb();
    return DB_STORE_INSTANCE.blogs[idx];
  }

  static async deleteBlog(id: string): Promise<boolean> {
    const len = DB_STORE_INSTANCE.blogs.length;
    DB_STORE_INSTANCE.blogs = DB_STORE_INSTANCE.blogs.filter(b => b.id !== id);
    saveDb();
    return DB_STORE_INSTANCE.blogs.length < len;
  }

  // SITE CONTENT
  static async getSiteContent(): Promise<{ coreAreas: CoreArea[]; milestones: Milestone[] }> {
    return {
      coreAreas: DB_STORE_INSTANCE.coreAreas,
      milestones: DB_STORE_INSTANCE.milestones
    };
  }

  static async getCoreAreas(): Promise<CoreArea[]> {
    return DB_STORE_INSTANCE.coreAreas;
  }

  static async getMilestones(): Promise<Milestone[]> {
    return DB_STORE_INSTANCE.milestones;
  }

  static async updateMilestones(milestones: Milestone[]): Promise<Milestone[]> {
    DB_STORE_INSTANCE.milestones = milestones;
    saveDb();
    return milestones;
  }

  static async updateCoreArea(id: string, updatedFields: Partial<Omit<CoreArea, 'id'>>): Promise<CoreArea | null> {
    const idx = DB_STORE_INSTANCE.coreAreas.findIndex(c => c.id === id);
    if (idx !== -1) {
      DB_STORE_INSTANCE.coreAreas[idx] = { ...DB_STORE_INSTANCE.coreAreas[idx], ...updatedFields };
      saveDb();
      return DB_STORE_INSTANCE.coreAreas[idx];
    }
    return null;
  }

  // INQUIRIES
  static async getInquiries(): Promise<Inquiry[]> {
    return DB_STORE_INSTANCE.inquiries;
  }

  static async addInquiry(inq: Omit<Inquiry, 'id' | 'timestamp' | 'read'>): Promise<Inquiry> {
    const newInq: Inquiry = {
      ...inq,
      id: `inq-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    DB_STORE_INSTANCE.inquiries.unshift(newInq);
    saveDb();
    return newInq;
  }

  static async toggleInquiryRead(id: string): Promise<Inquiry | null> {
    const idx = DB_STORE_INSTANCE.inquiries.findIndex(i => i.id === id);
    if (idx === -1) return null;
    DB_STORE_INSTANCE.inquiries[idx].read = !DB_STORE_INSTANCE.inquiries[idx].read;
    saveDb();
    return DB_STORE_INSTANCE.inquiries[idx];
  }

  static async toggleReadInquiry(id: string): Promise<Inquiry | null> {
    return this.toggleInquiryRead(id);
  }

  static async deleteInquiry(id: string): Promise<boolean> {
    const len = DB_STORE_INSTANCE.inquiries.length;
    DB_STORE_INSTANCE.inquiries = DB_STORE_INSTANCE.inquiries.filter(i => i.id !== id);
    saveDb();
    return DB_STORE_INSTANCE.inquiries.length < len;
  }

  // TEAM MEMBERS
  static async getTeam(): Promise<TeamMember[]> {
    return DB_STORE_INSTANCE.teamMembers;
  }

  static async getTeamMembers(): Promise<TeamMember[]> {
    return DB_STORE_INSTANCE.teamMembers;
  }

  static async addTeamMember(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    const newMember = { ...member, id: `team-${Date.now()}` };
    DB_STORE_INSTANCE.teamMembers.push(newMember);
    saveDb();
    return newMember;
  }

  static async updateTeamMember(id: string, updated: Partial<TeamMember>): Promise<TeamMember | null> {
    const idx = DB_STORE_INSTANCE.teamMembers.findIndex(t => t.id === id);
    if (idx === -1) return null;
    DB_STORE_INSTANCE.teamMembers[idx] = { ...DB_STORE_INSTANCE.teamMembers[idx], ...updated };
    saveDb();
    return DB_STORE_INSTANCE.teamMembers[idx];
  }

  static async deleteTeamMember(id: string): Promise<boolean> {
    const len = DB_STORE_INSTANCE.teamMembers.length;
    DB_STORE_INSTANCE.teamMembers = DB_STORE_INSTANCE.teamMembers.filter(t => t.id !== id);
    saveDb();
    return DB_STORE_INSTANCE.teamMembers.length < len;
  }

  // HERO SLIDES
  static async getHeroSlides(): Promise<DbHeroSlide[]> {
    return DB_STORE_INSTANCE.heroSlides;
  }

  static async addHeroSlide(slide: Omit<DbHeroSlide, 'id'>): Promise<DbHeroSlide> {
    const newSlide = { ...slide, id: `slide-${Date.now()}` };
    DB_STORE_INSTANCE.heroSlides.push(newSlide);
    saveDb();
    return newSlide;
  }

  static async updateHeroSlide(id: string, updated: Partial<DbHeroSlide>): Promise<DbHeroSlide | null> {
    const idx = DB_STORE_INSTANCE.heroSlides.findIndex(s => s.id === id);
    if (idx === -1) return null;
    DB_STORE_INSTANCE.heroSlides[idx] = { ...DB_STORE_INSTANCE.heroSlides[idx], ...updated };
    saveDb();
    return DB_STORE_INSTANCE.heroSlides[idx];
  }

  static async deleteHeroSlide(id: string): Promise<boolean> {
    const len = DB_STORE_INSTANCE.heroSlides.length;
    DB_STORE_INSTANCE.heroSlides = DB_STORE_INSTANCE.heroSlides.filter(s => s.id !== id);
    saveDb();
    return DB_STORE_INSTANCE.heroSlides.length < len;
  }

  // AFFILIATIONS
  static async getAffiliations(): Promise<DbAffiliation[]> {
    return DB_STORE_INSTANCE.affiliations;
  }

  static async addAffiliation(aff: Omit<DbAffiliation, 'id'>): Promise<DbAffiliation> {
    const newAff = { ...aff, id: `aff-${Date.now()}` };
    DB_STORE_INSTANCE.affiliations.push(newAff);
    saveDb();
    return newAff;
  }

  static async updateAffiliation(id: string, updated: Partial<DbAffiliation>): Promise<DbAffiliation | null> {
    const idx = DB_STORE_INSTANCE.affiliations.findIndex(a => a.id === id);
    if (idx === -1) return null;
    DB_STORE_INSTANCE.affiliations[idx] = { ...DB_STORE_INSTANCE.affiliations[idx], ...updated };
    saveDb();
    return DB_STORE_INSTANCE.affiliations[idx];
  }

  static async deleteAffiliation(id: string): Promise<boolean> {
    const len = DB_STORE_INSTANCE.affiliations.length;
    DB_STORE_INSTANCE.affiliations = DB_STORE_INSTANCE.affiliations.filter(a => a.id !== id);
    saveDb();
    return DB_STORE_INSTANCE.affiliations.length < len;
  }
}
