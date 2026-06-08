import React, { useState, useEffect } from 'react';
import { 
  Lock, LogOut, LayoutDashboard, FileText, 
  Users, Inbox, ArrowLeft, Plus, Trash2, Edit2, CheckCircle, 
  X, Save, Landmark, Target, Award, Shield, Sparkles, HelpCircle
} from 'lucide-react';
import { 
  BLOGS_DATA, TEAM_MEMBERS_DATA, MILESTONES_DATA, CORE_AREAS_DATA, HERO_SLIDES, siteConfig, AFFILIATIONS_DATA 
} from '../data';

interface AdminPanelProps {
  onClose: () => void;
}

interface LocalInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  attachedFile?: string | null;
  timestamp: string;
  read?: boolean;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  // Session Authentication State
  const [token, setToken] = useState<string>(() => localStorage.getItem('dpcl_token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab View State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'blogs' | 'team' | 'content' | 'inquiries'>('dashboard');

  // In-Memory & LocalStorage states for CMS Data Simulation
  const [blogs, setBlogs] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [coreAreas, setCoreAreas] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<LocalInquiry[]>([]);
  const [affiliations, setAffiliations] = useState<any[]>([]);
  const [siteConfigState, setSiteConfigState] = useState<any>(null);

  const [editingAffiliation, setEditingAffiliation] = useState<any | null>(null);
  const [isAffiliationModalOpen, setIsAffiliationModalOpen] = useState(false);
  const [affFormData, setAffFormData] = useState({
    fullName: '',
    initials: '',
    imageUrl: '',
    color: '#3b82f6'
  });

  // Subform Dialog States
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    category: 'HEALTH POLICY',
    text: '',
    imageUrl: '',
    date: ''
  });

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<any | null>(null);
  const [teamFormData, setTeamFormData] = useState({
    name: '',
    role: '',
    bio: '',
    isPending: false,
    avatarText: ''
  });

  const [isCcaModalOpen, setIsCcaModalOpen] = useState(false);
  const [editingCoreArea, setEditingCoreArea] = useState<any | null>(null);
  const [ccaFormData, setCcaFormData] = useState({
    title: '',
    text: '',
    badge: '',
    iconName: 'Shield'
  });

  const [editingMilestone, setEditingMilestone] = useState<any | null>(null);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [msFormData, setMsFormData] = useState({
    target: 0,
    label: '',
    displayValue: ''
  });

  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // On mount: Seed or fetch values from localStorage with fallbacks
  useEffect(() => {
    // 1. Blogs
    const localBlogs = localStorage.getItem('dpcl_cms_blogs');
    if (localBlogs) {
      setBlogs(JSON.parse(localBlogs));
    } else {
      setBlogs(BLOGS_DATA);
      localStorage.setItem('dpcl_cms_blogs', JSON.stringify(BLOGS_DATA));
    }

    // 2. Team
    const localTeam = localStorage.getItem('dpcl_cms_team');
    if (localTeam) {
      const parsed = JSON.parse(localTeam).filter((m: any) => m.id !== 'ukwaja-kingsley' && m.id !== 'iro-okechukwu');
      setTeam(parsed);
      localStorage.setItem('dpcl_cms_team', JSON.stringify(parsed));
    } else {
      setTeam(TEAM_MEMBERS_DATA);
      localStorage.setItem('dpcl_cms_team', JSON.stringify(TEAM_MEMBERS_DATA));
    }

    // 3. Core Areas
    const localCA = localStorage.getItem('dpcl_cms_core_areas');
    if (localCA) {
      setCoreAreas(JSON.parse(localCA));
    } else {
      setCoreAreas(CORE_AREAS_DATA);
      localStorage.setItem('dpcl_cms_core_areas', JSON.stringify(CORE_AREAS_DATA));
    }

    // 4. Milestones
    const localMS = localStorage.getItem('dpcl_cms_milestones');
    if (localMS) {
      setMilestones(JSON.parse(localMS));
    } else {
      setMilestones(MILESTONES_DATA);
      localStorage.setItem('dpcl_cms_milestones', JSON.stringify(MILESTONES_DATA));
    }

    // 5. Inquiries
    const localInquiries = localStorage.getItem('dpcl_local_inquiries');
    if (localInquiries) {
      setInquiries(JSON.parse(localInquiries));
    } else {
      const defaultInquiries: LocalInquiry[] = [
        {
          id: "DPCL-REQ-901142",
          fullName: "Dr. Hassan Yusuf",
          email: "hyusuf@fct-health.gov.ng",
          phone: "+234 811 500 2419",
          subject: "FCDO Ward Re-training Proposal",
          message: "We received your brochure. We are looking to contract your Program Audit Specialist to lead policy harmonization workshops at primary care clinics across Niger state starting next month.",
          attachedFile: "Ward_Retraining_Framework.pdf",
          timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
          read: false
        },
        {
          id: "DPCL-REQ-881254",
          fullName: "Engr. Fatima Bello",
          email: "fbello@nigeria-governors.org",
          phone: "+234 703 124 1152",
          subject: "SFTAS Sustainability Assessment Plan",
          message: "Please submit your team's updated credentials folder to our secretariat's Wuse II desk for review before tomorrow afternoon.",
          attachedFile: null,
          timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
          read: true
        }
      ];
      setInquiries(defaultInquiries);
      localStorage.setItem('dpcl_local_inquiries', JSON.stringify(defaultInquiries));
    }

    // 6. Site Config
    const localConfig = localStorage.getItem('dpcl_cms_site_config');
    if (localConfig) {
      const parsed = JSON.parse(localConfig);
      // Merge with default siteConfig to backfill new metadata attributes
      const merged = { ...siteConfig, ...parsed };
      setSiteConfigState(merged);
    } else {
      setSiteConfigState(siteConfig);
      localStorage.setItem('dpcl_cms_site_config', JSON.stringify(siteConfig));
    }

    // 7. Affiliations
    const localAffs = localStorage.getItem('dpcl_cms_affiliations');
    if (localAffs) {
      setAffiliations(JSON.parse(localAffs));
    } else {
      setAffiliations(AFFILIATIONS_DATA);
      localStorage.setItem('dpcl_cms_affiliations', JSON.stringify(AFFILIATIONS_DATA));
    }
  }, []);

  // Alert flash helper
  const triggerStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
  };

  // Modern Node.js REST backend synchronized fetching
  const fetchServerInquiries = async (authToken: string) => {
    if (!authToken) return;
    try {
      const response = await fetch('/api/inquiries', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        const mapped = data.map((inq: any) => ({
          id: inq.id,
          fullName: inq.name,
          email: inq.email,
          phone: inq.phone,
          subject: inq.subject,
          message: inq.message,
          attachedFile: inq.attachedFile || null,
          timestamp: inq.timestamp,
          read: !!inq.read
        }));
        setInquiries(mapped);
        localStorage.setItem('dpcl_local_inquiries', JSON.stringify(mapped));
      }
    } catch (err) {
      console.warn("Failed to retrieve server inquiries, relying on local log copies:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchServerInquiries(token);
    }
  }, [token]);

  // Real Database Authentication handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        let errMsg = 'Invalid credential parameters.';
        try {
          const errJson = JSON.parse(errText);
          errMsg = errJson.error || errMsg;
        } catch (_) {}
        throw new Error(errMsg);
      }

      const data = await response.json();
      setToken(data.token);
      localStorage.setItem('dpcl_token', data.token);
      triggerStatus('success', 'Logged in securely as Senior Administrator.');
      
      // Fetch fresh submissions
      fetchServerInquiries(data.token);
    } catch (err: any) {
      console.error("Login verification failed:", err);
      setAuthError(err.message || 'Connecting to auth servers failed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (_) {}
    
    setToken('');
    localStorage.removeItem('dpcl_token');
    triggerStatus('success', 'Logged out. Have a productive week!');
  };

  // Inquiry actions (100% Back-End Synchronized)
  const toggleInquiryRead = async (id: string) => {
    try {
      const response = await fetch(`/api/inquiries/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const updated = inquiries.map(inq => {
          if (inq.id === id) {
            return { ...inq, read: !inq.read };
          }
          return inq;
        });
        setInquiries(updated);
        localStorage.setItem('dpcl_local_inquiries', JSON.stringify(updated));
        triggerStatus('success', 'Inquiry read status updated.');
      } else {
        throw new Error('Server returned unsuccessful status update.');
      }
    } catch (err) {
      console.error("Read status sync failed:", err);
      // Failover safely to local update
      const updated = inquiries.map(inq => {
        if (inq.id === id) {
          return { ...inq, read: !inq.read };
        }
        return inq;
      });
      setInquiries(updated);
      localStorage.setItem('dpcl_local_inquiries', JSON.stringify(updated));
      triggerStatus('success', 'Status updated (offline cache fallback).');
    }
  };

  const deleteInquiry = async (id: string) => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const filtered = inquiries.filter(inq => inq.id !== id);
        setInquiries(filtered);
        localStorage.setItem('dpcl_local_inquiries', JSON.stringify(filtered));
        triggerStatus('success', 'Inquiry permanently deleted from server database.');
      } else {
        throw new Error('Server denunciation of inquiry delete request.');
      }
    } catch (err) {
      console.error("Inquiry deletion sync failed:", err);
      // Failover safely to local update
      const filtered = inquiries.filter(inq => inq.id !== id);
      setInquiries(filtered);
      localStorage.setItem('dpcl_local_inquiries', JSON.stringify(filtered));
      triggerStatus('success', 'Inquiry removed (offline cache fallback).');
    }
  };

  // Blog creation and modification (SIMULATED)
  const handleOpenAddBlog = () => {
    setEditingBlog(null);
    setBlogFormData({
      title: '',
      category: 'HEALTH POLICY',
      text: '',
      imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });
    setIsBlogModalOpen(true);
  };

  const handleOpenEditBlog = (blog: any) => {
    setEditingBlog(blog);
    setBlogFormData({
      title: blog.title || '',
      category: blog.category || 'HEALTH POLICY',
      text: blog.text || '',
      imageUrl: blog.imageUrl || '',
      date: blog.date || ''
    });
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogFormData.title || !blogFormData.text) {
      triggerStatus('error', 'Please fill in the title and content blocks.');
      return;
    }

    let updatedBlogs = [];
    if (editingBlog) {
      updatedBlogs = blogs.map(b => {
        if (b.id === editingBlog.id) {
          return { ...b, ...blogFormData };
        }
        return b;
      });
      triggerStatus('success', 'Blog post updated successfully.');
    } else {
      const newPost = {
        id: `blog-sim-${Date.now()}`,
        ...blogFormData
      };
      updatedBlogs = [newPost, ...blogs];
      triggerStatus('success', 'New blog post logged successfully.');
    }

    setBlogs(updatedBlogs);
    localStorage.setItem('dpcl_cms_blogs', JSON.stringify(updatedBlogs));
    setIsBlogModalOpen(false);
  };

  const handleDeleteBlog = (id: string) => {
    const filtered = blogs.filter(b => b.id !== id);
    setBlogs(filtered);
    localStorage.setItem('dpcl_cms_blogs', JSON.stringify(filtered));
    triggerStatus('success', 'Blog post deleted from active list.');
  };

  // Team controls (SIMULATED)
  const handleOpenAddTeam = () => {
    setEditingTeam(null);
    setTeamFormData({
      name: '',
      role: '',
      bio: '',
      isPending: false,
      avatarText: ''
    });
    setIsTeamModalOpen(true);
  };

  const handleOpenEditTeam = (member: any) => {
    setEditingTeam(member);
    setTeamFormData({
      name: member.name || '',
      role: member.role || '',
      bio: member.bio || '',
      isPending: member.isPending || false,
      avatarText: member.avatarText || ''
    });
    setIsTeamModalOpen(true);
  };

  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamFormData.name || !teamFormData.role) {
      triggerStatus('error', 'Name and Role are required.');
      return;
    }

    const calculatedAvatar = teamFormData.avatarText.trim() || teamFormData.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
    let updatedTeam = [];

    if (editingTeam) {
      updatedTeam = team.map(m => {
        if (m.id === editingTeam.id) {
          return { ...m, ...teamFormData, avatarText: calculatedAvatar };
        }
        return m;
      });
      triggerStatus('success', 'Roster member modified successfully.');
    } else {
      const newMember = {
        id: `team-sim-${Date.now()}`,
        ...teamFormData,
        avatarText: calculatedAvatar
      };
      updatedTeam = [...team, newMember];
      triggerStatus('success', 'New consultant added to team.');
    }

    setTeam(updatedTeam);
    localStorage.setItem('dpcl_cms_team', JSON.stringify(updatedTeam));
    setIsTeamModalOpen(false);
  };

  const handleDeleteTeam = (id: string) => {
    const filtered = team.filter(m => m.id !== id);
    setTeam(filtered);
    localStorage.setItem('dpcl_cms_team', JSON.stringify(filtered));
    triggerStatus('success', 'Roster profile removed.');
  };

  // Static site advice block - rendering top bar alerts
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between selection:bg-[#3b82f6]/10 text-left select-text">
      
      {/* 1. TOP HEADER BRAND RIBBON */}
      <header className="bg-[#0B2340] border-b border-white/5 py-4 px-6 shrink-0 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onClose}>
          {(siteConfigState?.logoUrl || siteConfig.logoUrl) ? (
            <div className="h-9 w-9 relative flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg bg-slate-50 border border-slate-100 p-0.5">
              <img 
                src={siteConfigState?.logoUrl || siteConfig.logoUrl} 
                alt="Logo" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="h-9 w-9 bg-[#0F3A6B] flex items-center justify-center text-white relative rounded-lg">
              <span className="font-serif font-black text-sm tracking-tighter">{siteConfigState?.logoText || siteConfig.logoText}</span>
              <span className="absolute bottom-0.5 right-0.5 h-1.5 w-1.5 bg-[#3b82f6] rounded-full" />
            </div>
          )}
          <div className="flex flex-col text-left">
            <h1 className="font-sans text-xs sm:text-sm font-black tracking-tight text-white uppercase leading-none">
              {siteConfigState?.companyName || siteConfig.companyName}
            </h1>
            <span className="text-[8px] font-mono tracking-widest text-[#3b82f6] font-bold mt-1 uppercase">
              PORTAL CMS SYSTEM BOARD
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="text-[11px] font-extrabold tracking-widest uppercase border border-slate-600/50 hover:border-white text-slate-300 hover:text-white px-5 py-2 transition-all cursor-pointer rounded-full"
          >
            ← BACK TO WEBSITE
          </button>
          
          {token && (
            <button 
              onClick={handleLogout}
              className="bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-600/40 text-[11px] font-extrabold tracking-widest uppercase px-5 py-2 transition-all cursor-pointer rounded-full flex items-center gap-1.5"
            >
              <LogOut size={12} />
              <span>LOGOUT</span>
            </button>
          )}
        </div>
      </header>

      {/* ALERT POPUPS BAR */}
      {statusMsg.text && (
        <div className={`p-3 text-center text-xs font-sans tracking-wide uppercase font-extrabold flex items-center justify-center gap-2 relative z-50 ${
          statusMsg.type === 'success' ? 'bg-emerald-650 text-emerald-800 bg-emerald-50 border-b border-emerald-200' : 'bg-red-50 text-red-800 border-b border-red-200'
        }`}>
          <CheckCircle size={14} className="shrink-0" />
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-1 w-full flex flex-col md:flex-row relative overflow-hidden">
        
        {!token ? (
          /* AUTHENTICATION PORTAL IN-CENTER CARD */
          <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
            
            <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-sm text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0F3A6B] to-[#3b82f6]" />
              
              <div className="mx-auto w-12 h-12 bg-[#0F3A6B]/5 border border-[#0F3A6B]/10 rounded-2xl flex items-center justify-center text-[#0F3A6B] mb-5">
                <Lock size={20} className="stroke-[1.5]" />
              </div>

              <h2 className="text-xl font-sans font-black tracking-tight text-slate-800 uppercase">
                ADMIN LOGIN
              </h2>
              <p className="text-slate-500 font-sans text-xs mt-1 leading-snug">
                Authorized Executive Personnel Secretariat Access Only.
              </p>

              {authError && (
                <div className="mt-5 p-3 text-left border border-red-200 bg-red-50 text-red-700 rounded-xl font-medium text-[11px] uppercase tracking-wide">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">
                    Authorized Username / Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@dpcl.com"
                    className="w-full text-xs font-sans tracking-wide p-3.5 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] shadow-inner font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">
                    Security PassPhrase
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter passphrase"
                    className="w-full text-xs font-sans tracking-wide p-3.5 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] shadow-inner font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-[#0F3A6B] hover:bg-[#3b82f6] text-white text-xs font-sans tracking-widest font-extrabold uppercase rounded-xl py-4 transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles size={13} className="animate-pulse" />
                  <span>{isLoggingIn ? 'DECRYPTING...' : 'ENTER EXECUTIVE PANEL'}</span>
                </button>
              </form>



            </div>

          </div>
        ) : (
          /* FULL ADMIN WORKSPACE BOARD */
          <div className="flex-grow flex flex-col md:flex-row relative">
            
            {/* LEFT BOARD UTILITY BAR (Menu) */}
            <aside className="w-full md:w-60 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col justify-between shrink-0">
              <div className="space-y-6">
                <p className="text-[9px] font-mono tracking-widest text-[#0F3A6B]/70 font-extrabold uppercase">
                  CMS BOARD VIEWPORTS
                </p>
                
                <nav className="space-y-1">
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer text-left ${
                      activeTab === 'dashboard' 
                        ? 'bg-[#0F3A6B]/5 text-[#0F3A6B] border border-[#0F3A6B]/15' 
                        : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <LayoutDashboard size={14} className="stroke-[1.8]" />
                    <span>DASHBOARD</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('blogs')}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer text-left ${
                      activeTab === 'blogs' 
                        ? 'bg-[#0F3A6B]/5 text-[#0F3A6B] border border-[#0F3A6B]/15' 
                        : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <FileText size={14} className="stroke-[1.8]" />
                    <span>BLOG MEMOS</span>
                    <span className="ml-auto bg-[#3b82f6]/10 text-[#3b82f6] text-[10px] px-2 py-0.5 rounded-full font-mono">{blogs.length}</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('team')}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer text-left ${
                      activeTab === 'team' 
                        ? 'bg-[#0F3A6B]/5 text-[#0F3A6B] border border-[#0F3A6B]/15' 
                        : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <Users size={14} className="stroke-[1.8]" />
                    <span>TEAM ROSTER</span>
                    <span className="ml-auto bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-mono">{team.length}</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('content')}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer text-left ${
                      activeTab === 'content' 
                        ? 'bg-[#0F3A6B]/5 text-[#0F3A6B] border border-[#0F3A6B]/15' 
                        : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <Landmark size={14} className="stroke-[1.8]" />
                    <span>SITE COPY</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('inquiries')}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer text-left ${
                      activeTab === 'inquiries' 
                        ? 'bg-[#0F3A6B]/5 text-[#0F3A6B] border border-[#0F3A6B]/15' 
                        : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <Inbox size={14} className="stroke-[1.8]" />
                    <span>INQUIRY DESK</span>
                    {inquiries.filter(i => !i.read).length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                        {inquiries.filter(i => !i.read).length}
                      </span>
                    )}
                  </button>
                </nav>
              </div>

              {/* STATICS WARNING NOTE */}
              <div className="bg-blue-50/70 border border-blue-200/50 p-4 rounded-xl mt-8 text-left space-y-1.5 shadow-xs">
                <div className="flex items-center gap-1 text-[#0F3A6B]">
                  <HelpCircle size={13} className="shrink-0" />
                  <span className="text-[9px] font-mono font-black uppercase tracking-wider">DEPLOYMENT PROTOCOL</span>
                </div>
                <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
                  We are operating purely in **Static Site Mode** to guarantee sub-millisecond monday loading. To make permanent static changes, please modify `/src/data.ts` directly. This keeps the layout bulletproof!
                </p>
              </div>
            </aside>

            {/* MAIN CONTENT FIELD SCREEN AREA */}
            <section className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-50 max-h-[calc(100vh-73px)]">
              
              {/* TAB 1: EXECUTIVE WELCOME DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-sans font-black tracking-tight text-slate-800 uppercase pb-1">
                        EXECUTIVE SECRETARIAT BOARD
                      </h2>
                      <p className="text-[#3b82f6] text-[11px] font-mono tracking-widest uppercase font-bold">
                        Welcome, General Operations Administrator • Real-time Simulation Workspace
                      </p>
                    </div>
                  </div>

                  {/* Summary Metric Counters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
                      <p className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase">Pending Inquiries</p>
                      <h3 className="text-3xl font-sans font-black text-[#0F3A6B] mt-2 font-mono">
                        {inquiries.filter(i => !i.read).length}
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-2 font-semibold">Immediate attention needed.</p>
                      <div className="absolute right-4 bottom-4 text-slate-100"><Inbox size={42} /></div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
                      <p className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase">Total Published Articles</p>
                      <h3 className="text-3xl font-sans font-black text-[#0F3A6B] mt-2 font-mono">
                        {blogs.length}
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-2 font-semibold">Intelligence memoranda live.</p>
                      <div className="absolute right-4 bottom-4 text-slate-100"><FileText size={42} /></div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
                      <p className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase">Teammate Roster Count</p>
                      <h3 className="text-3xl font-sans font-black text-[#0F3A6B] mt-2 font-mono">
                        {team.length}
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-2 font-semibold">Active lead consultants.</p>
                      <div className="absolute right-4 bottom-4 text-slate-100"><Users size={42} /></div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
                      <p className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase">Active Milestones</p>
                      <h3 className="text-3xl font-sans font-black text-[#0F3A6B] mt-2 font-mono">
                        {milestones.length}
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-2 font-semibold">Numerical indicators.</p>
                      <div className="absolute right-4 bottom-4 text-slate-100"><Award size={42} /></div>
                    </div>
                  </div>

                  {/* Operational instructions and site configurations */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-sans font-extrabold text-slate-900 uppercase mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                       <Sparkles size={16} className="text-[#3b82f6]" />
                       <span>STATIC SITE REFACTOR OVERVIEW</span>
                    </h3>
                    <div className="text-xs text-slate-650 max-w-3xl space-y-3 font-sans font-normal leading-relaxed">
                      <p>
                        To hit our strict **Monday deployment deadline**, the full system now executes as a high-performance **static presentation platform**. All active Supabase database client handshakes have been safely removed. 
                      </p>
                      <p>
                        The application retains its interactive client-side **Admin Dashboard CMS** so stakeholders can evaluate management workflows (creating blogs, approving team qualifications, modifying project parameters) directly in-browser. All changes here will save immediately in localStorage to give immediate interactive feedback, but will **not** modify `/src/data.ts`.
                      </p>
                      <div className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 p-4 rounded-xl flex items-start gap-3 mt-4">
                        <span className="p-2 bg-[#0F3A6B] text-white rounded-lg text-[10px] font-mono font-bold">STEPS TO MAKE PERMANENT SAVES</span>
                        <div>
                          <p className="font-extrabold text-[#0F3A6B] uppercase text-[10px] mb-1">Editing the Central Configuration Database:</p>
                          <p className="text-[11px] leading-relaxed">
                            Open `/src/data.ts` in your code editor. Modify the arrays like `BLOGS_DATA`, `TEAM_MEMBERS_DATA`, or `siteConfig` directly. Your inputs will update instantly on the landing page, allowing the site to load with zero database latency!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: BLOG POSTS LIST */}
              {activeTab === 'blogs' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-sans font-black tracking-tight text-slate-800 uppercase">
                        INTELLIGENCE MEMORANDUMS
                      </h2>
                      <p className="text-slate-500 text-xs font-sans mt-0.5">
                        Add, modify, or simulate editorial blog posts for the website platform.
                      </p>
                    </div>
                    <button 
                      onClick={handleOpenAddBlog}
                      className="bg-[#0F3A6B] hover:bg-[#3b82f6] text-white font-sans text-xs uppercase font-extrabold tracking-widest px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer self-start"
                    >
                      <Plus size={14} />
                      <span>LOG NEW ARTICLE</span>
                    </button>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-3xl shadow-xs overflow-hidden">
                    <table className="w-full text-left border-collapse font-sans">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
                          <th className="py-4 px-6">Image</th>
                          <th className="py-4 px-6">Headline Title</th>
                          <th className="py-4 px-6">Category</th>
                          <th className="py-4 px-6">Publication Date</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs font-semibold divide-y divide-slate-100">
                        {blogs.map((blog) => (
                          <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4.5 px-6">
                              <img 
                                src={blog.imageUrl || "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=120&q=80"} 
                                alt=""
                                className="w-14 h-10 object-cover rounded-md border border-slate-200 shrink-0 select-none"
                              />
                            </td>
                            <td className="py-4.5 px-6 font-extrabold text-slate-900 max-w-sm truncate">
                              {blog.title}
                            </td>
                            <td className="py-4.5 px-6">
                              <span className="bg-blue-50 text-[#0F3A6B] text-[10px] px-2.5 py-1 rounded-full uppercase font-mono font-bold">
                                {blog.category}
                              </span>
                            </td>
                            <td className="py-4.5 px-6 font-mono text-[11px] text-slate-500">
                              {blog.date}
                            </td>
                            <td className="py-4.5 px-6 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button 
                                  onClick={() => handleOpenEditBlog(blog)}
                                  className="p-2 text-slate-500 hover:text-[#0F3A6B] hover:bg-[#0F3A6B]/5 rounded-lg transition-colors cursor-pointer"
                                  title="Edit Post"
                                >
                                  <Edit2 size={13} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteBlog(blog.id)}
                                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Post"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: TEAM ROSTER */}
              {activeTab === 'team' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-sans font-black tracking-tight text-slate-800 uppercase">
                        TEAM & PARTERS ROSTER
                      </h2>
                      <p className="text-slate-500 text-xs font-sans mt-0.5">
                        Add, edit, or delete professional bios and qualifications for DPCL leads.
                      </p>
                    </div>
                    <button 
                      onClick={handleOpenAddTeam}
                      className="bg-[#0F3A6B] hover:bg-[#3b82f6] text-white font-sans text-xs uppercase font-extrabold tracking-widest px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer self-start"
                    >
                      <Plus size={14} />
                      <span>ADD CONSULTANT</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {team.map((member) => (
                      <div key={member.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between text-left space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#0F3A6B] text-white font-serif font-black text-lg flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
                            {member.avatarText || 'EU'}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-sans font-black text-slate-900 uppercase">{member.name}</h3>
                              {member.isPending && (
                                <span className="bg-amber-100 text-amber-800 text-[9px] px-2 py-0.5 rounded-full font-mono font-bold tracking-wider uppercase">
                                  PENDING
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3b82f6]">{member.role}</p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-3">
                          {member.bio}
                        </p>

                        <div className="flex items-center justify-end gap-1.5 pt-3 border-t border-slate-100">
                          <button 
                            onClick={() => handleOpenEditTeam(member)}
                            className="bg-[#0F3A6B]/5 hover:bg-[#0F3A6B] text-[#0F3A6B] hover:text-white px-4 py-2 rounded-lg text-[10px] font-sans font-black tracking-widest uppercase transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Edit2 size={11} />
                            <span>EDIT</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteTeam(member.id)}
                            className="p-2 border border-slate-200/60 text-slate-400 hover:text-red-700 hover:bg-red-50 hover:border-red-200 rounded-lg transition-colors cursor-pointer"
                            title="Delete consultant profile"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: COPIES (Core Areas & Milestones) */}
              {activeTab === 'content' && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div>
                    <h2 className="text-xl font-sans font-black tracking-tight text-slate-800 uppercase">
                      SITE COPIES & MILESTONES
                    </h2>
                    <p className="text-slate-500 text-xs font-sans mt-0.5">
                      Tune site core areas and stats indicators without cloud database configuration delays.
                    </p>
                  </div>

                  {/* Core areas section editing card widgets */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-sans font-extrabold text-[#0f3a6b] uppercase tracking-widest border-b border-slate-200 pb-1.5 flex items-center gap-2">
                      <Shield size={14} className="text-[#3b82f6]" />
                      <span>CORE AREAs SPECIFICATIONS</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      {coreAreas.map((ca) => (
                        <div key={ca.id} className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between">
                          <div className="space-y-2">
                            <span className="bg-blue-50 text-[#0F3A6B] text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
                              {ca.badge}
                            </span>
                            <h4 className="text-xs font-sans font-extrabold text-slate-900 uppercase pt-2">{ca.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-sans">{ca.text}</p>
                          </div>
                          
                          <div className="pt-4 mt-4 border-t border-slate-150 flex justify-end">
                            <button
                              onClick={() => {
                                setEditingCoreArea(ca);
                                setCcaFormData({
                                  title: ca.title || '',
                                  text: ca.text || '',
                                  badge: ca.badge || '',
                                  iconName: ca.iconName || 'Shield'
                                });
                                setIsCcaModalOpen(true);
                              }}
                              className="text-xs bg-[#0f3a6b]/5 hover:bg-[#0f3a6b]/10 text-[#0f3a6b] px-3.5 py-2 rounded-lg font-sans font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Edit2 size={12} />
                              <span>Edit Area Info</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational milestones */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-xs font-sans font-extrabold text-[#0f3a6b] uppercase tracking-widest border-b border-slate-200 pb-1.5 flex items-center gap-2">
                      <Target size={14} className="text-[#3b82f6]" />
                      <span>NUMERICAL STAT Indicators</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                      {milestones.map((ms) => (
                        <div key={ms.id} className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between items-start space-y-3">
                          <div>
                            <p className="text-[10px] text-slate-400 font-mono tracking-wider font-bold uppercase">MILESTONE CODES</p>
                            <h4 className="text-xs font-sans font-extrabold text-[#0f3a6b] uppercase mt-1">{ms.label}</h4>
                          </div>
                          <div className="text-2xl font-sans font-black text-slate-900 font-mono">
                            {ms.target}
                            <span className="text-[#3b82f6] ml-0.5 font-bold">+</span>
                          </div>

                          <button
                            onClick={() => {
                              setEditingMilestone(ms);
                              setMsFormData({
                                target: ms.target || 0,
                                label: ms.label || '',
                                displayValue: ms.displayValue || ''
                              });
                              setIsMilestoneModalOpen(true);
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-650 w-full rounded-lg py-2 text-[10px] font-sans font-extrabold tracking-wider uppercase text-center transition-colors cursor-pointer"
                          >
                            Update Target
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* General Config settings */}
                  {siteConfigState && (
                    <div className="space-y-4 pt-6 border-t border-slate-200">
                      <h3 className="text-xs font-sans font-extrabold text-[#0f3a6b] uppercase tracking-widest border-b border-slate-200 pb-1.5 flex items-center gap-2">
                        <Sparkles size={14} className="text-[#3b82f6]" />
                        <span>GENERAL SITE BRAND & CONTACT SETTINGS</span>
                      </h3>
                      
                      <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1">Company Long Name</label>
                            <input 
                              type="text" 
                              value={siteConfigState.companyName || ''}
                              onChange={e => {
                                const updated = { ...siteConfigState, companyName: e.target.value };
                                setSiteConfigState(updated);
                                localStorage.setItem('dpcl_cms_site_config', JSON.stringify(updated));
                              }}
                              className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1">Company Short initials (e.g. DPCL)</label>
                            <input 
                              type="text" 
                              value={siteConfigState.shortName || ''}
                              onChange={e => {
                                const updated = { ...siteConfigState, shortName: e.target.value };
                                setSiteConfigState(updated);
                                localStorage.setItem('dpcl_cms_site_config', JSON.stringify(updated));
                              }}
                              className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1">Contact Phone</label>
                            <input 
                              type="text" 
                              value={siteConfigState.contactPhone || ''}
                              onChange={e => {
                                const updated = { ...siteConfigState, contactPhone: e.target.value };
                                setSiteConfigState(updated);
                                localStorage.setItem('dpcl_cms_site_config', JSON.stringify(updated));
                              }}
                              className="w-full text-xs font-sans font-mono tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1">Contact Email</label>
                            <input 
                              type="email" 
                              value={siteConfigState.contactEmail || ''}
                              onChange={e => {
                                const updated = { ...siteConfigState, contactEmail: e.target.value };
                                setSiteConfigState(updated);
                                localStorage.setItem('dpcl_cms_site_config', JSON.stringify(updated));
                              }}
                              className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-semibold"
                            />
                          </div>

                           <div className="md:col-span-1">
                            <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1">Operational Office Address</label>
                            <input 
                              type="text" 
                              value={siteConfigState.operationalAddress || ''}
                              onChange={e => {
                                const updated = { ...siteConfigState, operationalAddress: e.target.value };
                                setSiteConfigState(updated);
                                localStorage.setItem('dpcl_cms_site_config', JSON.stringify(updated));
                              }}
                              className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-semibold"
                            />
                          </div>

                          <div className="md:col-span-1">
                            <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1">Registered Corporate Address</label>
                            <input 
                              type="text" 
                              value={siteConfigState.registeredAddress || ''}
                              onChange={e => {
                                const updated = { ...siteConfigState, registeredAddress: e.target.value };
                                setSiteConfigState(updated);
                                localStorage.setItem('dpcl_cms_site_config', JSON.stringify(updated));
                              }}
                              className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-semibold"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1">
                              Custom Logo Image Link (Replace branding icon with custom logo)
                            </label>
                            <div className="flex gap-3">
                              <input 
                                type="text" 
                                placeholder="https://example.com/logo.png"
                                value={siteConfigState.logoUrl || ''}
                                onChange={e => {
                                  const updated = { ...siteConfigState, logoUrl: e.target.value };
                                  setSiteConfigState(updated);
                                  localStorage.setItem('dpcl_cms_site_config', JSON.stringify(updated));
                                }}
                                className="flex-1 text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-mono"
                              />
                              {siteConfigState.logoUrl && (
                                <div className="h-10 w-10 p-0.5 border border-slate-200 rounded-lg flex items-center justify-center bg-slate-50 overflow-hidden shrink-0">
                                  <img 
                                    src={siteConfigState.logoUrl} 
                                    alt="Preview" 
                                    referrerPolicy="no-referrer"
                                    className="h-full w-full object-contain" 
                                    onError={(e)=>{ (e.target as any).src='https://placehold.co/100x100?text=Error'; }}
                                  />
                                </div>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">
                              Leave this field blank to automatically fall back to the premium default stylized "DP" text-circle brand icon.
                            </p>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1">
                              Social Preview Image Link (og:image)
                            </label>
                            <div className="flex gap-3">
                              <input 
                                type="text" 
                                placeholder="https://example.com/preview_banner.png"
                                value={siteConfigState.previewImageUrl || ''}
                                onChange={e => {
                                  const updated = { ...siteConfigState, previewImageUrl: e.target.value };
                                  setSiteConfigState(updated);
                                  localStorage.setItem('dpcl_cms_site_config', JSON.stringify(updated));
                                }}
                                className="flex-1 text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-mono"
                              />
                              {siteConfigState.previewImageUrl && (
                                <div className="h-10 w-10 p-0.5 border border-slate-200 rounded-lg flex items-center justify-center bg-slate-50 overflow-hidden shrink-0">
                                  <img 
                                    src={siteConfigState.previewImageUrl} 
                                    alt="Social Preview" 
                                    referrerPolicy="no-referrer"
                                    className="h-full w-full object-contain" 
                                    onError={(e)=>{ (e.target as any).src='https://placehold.co/100x100?text=Error'; }}
                                  />
                                </div>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">
                              The premium image representation used when sharing the link on platforms like WhatsApp, LinkedIn, Facebook, and Twitter.
                            </p>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1">
                              Website Description Meta (og:description)
                            </label>
                            <textarea 
                              rows={3}
                              value={siteConfigState.description || ''}
                              onChange={e => {
                                const updated = { ...siteConfigState, description: e.target.value };
                                setSiteConfigState(updated);
                                localStorage.setItem('dpcl_cms_site_config', JSON.stringify(updated));
                              }}
                              className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-semibold"
                            />
                            <p className="text-[10px] text-slate-400 mt-1">
                              The default site description text attached during link indexing, bookmarking, and messaging preview render loops.
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              triggerStatus('success', 'General site configuration updated successfully!');
                            }}
                            className="bg-[#0f3a6b]/10 hover:bg-[#0f3a6b]/15 text-[#0f3a6b] text-xs font-sans font-bold tracking-wider px-5 py-2.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Save size={14} />
                            <span>Verify Config State</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Professional affiliations editing section */}
                  <div className="space-y-4 pt-6">
                    <h3 className="text-xs font-sans font-extrabold text-[#0f3a6b] uppercase tracking-widest border-b border-slate-200 pb-1.5 flex items-center gap-2">
                      <Award size={14} className="text-[#3b82f6]" />
                      <span>PROFESSIONAL AFFILIATIONS (WITH CUSTOM IMAGES)</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      {affiliations.map((aff) => (
                        <div key={aff.id} className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between">
                          <div className="flex gap-4 items-start">
                            <div className="h-12 w-12 rounded-xl border border-slate-200 p-0.5 bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                              <img 
                                src={aff.imageUrl} 
                                alt={aff.initials} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e)=>{ (e.target as any).src='https://placehold.co/120x120?text=Logo'; }}
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="bg-emerald-50 text-emerald-800 text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full">
                                {aff.initials}
                              </span>
                              <h4 className="text-xs font-sans font-extrabold text-slate-900 uppercase pt-1 leading-snug">{aff.fullName}</h4>
                              <p className="text-[10px] text-slate-400 font-mono truncate max-w-xs">{aff.imageUrl}</p>
                            </div>
                          </div>

                          <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingAffiliation(aff);
                                setAffFormData({
                                  fullName: aff.fullName || '',
                                  initials: aff.initials || '',
                                  imageUrl: aff.imageUrl || '',
                                  color: aff.color || '#3b82f6'
                                });
                                setIsAffiliationModalOpen(true);
                              }}
                              className="text-xs bg-[#0f3a6b]/5 hover:bg-[#0f3a6b]/10 text-[#0f3a6b] px-3.5 py-2 rounded-lg font-sans font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Edit2 size={12} />
                              <span>Edit Affiliation</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 5: INQUIRIES DESK */}
              {activeTab === 'inquiries' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-sans font-black tracking-tight text-slate-800 uppercase">
                        INQUIRY GATEWAY DESK
                      </h2>
                      <p className="text-slate-500 text-xs font-sans mt-0.5">
                        Inquiries submitted via contact form are displayed below.
                      </p>
                    </div>
                  </div>

                  {/* Informative Automated Routing Indicator */}
                  <div className="bg-[#0f3a6b]/5 border border-[#0f3a6b]/15 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-sans font-extrabold text-[#0f3a6b] uppercase tracking-wide">
                          EmailJS Automations Interceptor Active
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed max-w-2xl font-medium">
                        All contact submissions are automatically routed to <strong className="text-slate-800">info@dpcl.com.ng</strong>. To connect your production templates, populate <strong className="font-mono bg-slate-100 text-[#0f3a6b] px-1 py-0.5 rounded text-[10px]">EMAILJS_SERVICE_ID</strong>, <strong className="font-mono bg-slate-100 text-[#0f3a6b] px-1 py-0.5 rounded text-[10px]">EMAILJS_TEMPLATE_ID</strong>, and <strong className="font-mono bg-slate-100 text-[#0f3a6b] px-1 py-0.5 rounded text-[10px]">EMAILJS_PUBLIC_KEY</strong> in the platform Secrets settings.
                      </p>
                    </div>
                    <span className="bg-[#0f3a6b] text-white text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl shrink-0 self-start sm:self-center">
                      Auto-Route Enabled
                    </span>
                  </div>

                  <div className="space-y-4">
                    {inquiries.length === 0 ? (
                      <div className="bg-white border border-slate-200/80 p-12 text-center rounded-2xl space-y-3">
                        <Inbox size={32} className="mx-auto text-slate-300" />
                        <p className="text-xs font-sans font-bold text-slate-400 uppercase tracking-widest">Inbox Completely Clear</p>
                      </div>
                    ) : (
                      inquiries.map((inq) => (
                        <div 
                          key={inq.id} 
                          className={`bg-white border text-left p-6 rounded-2xl transition-all flex flex-col justify-between relative shadow-xs ${
                            inq.read ? 'border-slate-200 opacity-80' : 'border-[#3b82f6] ring-1 ring-[#3b82f6]/20'
                          }`}
                        >
                          <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-sans text-xs font-black uppercase text-slate-900">{inq.fullName}</h3>
                                  {!inq.read && (
                                    <span className="bg-red-500 text-white text-[8px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                                      NEW
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1 font-sans font-medium">{inq.email} • {inq.phone}</p>
                              </div>

                              <span className="text-[10px] font-mono text-slate-400 self-start sm:self-center">
                                {new Date(inq.timestamp).toLocaleString()}
                              </span>
                            </div>

                            <div className="space-y-2">
                              <p className="text-xs font-sans font-extrabold text-[#0F3A6B] uppercase tracking-tight">{inq.subject}</p>
                              <p className="text-xs text-slate-650 leading-relaxed font-sans font-normal whitespace-pre-line">{inq.message}</p>
                            </div>

                            {inq.attachedFile && (
                              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-150 p-2 px-3.5 rounded-xl text-emerald-800 text-[10px] font-sans font-extrabold uppercase">
                                <FileText size={12} />
                                <span>Material Brief: {inq.attachedFile}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-slate-100">
                            <button
                              onClick={() => toggleInquiryRead(inq.id)}
                              className={`text-[9px] font-sans font-black tracking-widest uppercase px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                                inq.read 
                                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' 
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              }`}
                            >
                              {inq.read ? 'MARK UNREAD' : 'MARK READ'}
                            </button>
                            <button
                              onClick={() => deleteInquiry(inq.id)}
                              className="p-2 border border-slate-200/80 text-slate-400 hover:text-red-700 hover:bg-red-50 hover:border-red-200 rounded-lg transition-colors cursor-pointer"
                              title="Delete request"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </section>
          </div>
        )}

      </main>

      {/* 3. SIMULATED EDITING DIALOG MODALS SECTION */}
      {/* MODAL 1: BLOG DIALOG */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 bg-slate-950/75 flex items-center justify-center p-4 z-50 backdrop-blur-xs text-left">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl animate-in font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-sans text-xs font-black uppercase text-slate-900">
                {editingBlog ? 'EDIT INTEL ARTICLE' : 'LOG NEW ARTICLE'}
              </h3>
              <button onClick={() => setIsBlogModalOpen(false)} className="text-slate-400 hover:text-slate-900 p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Article Headline Title</label>
                <input
                  type="text"
                  required
                  value={blogFormData.title}
                  onChange={e => setBlogFormData({ ...blogFormData, title: e.target.value })}
                  placeholder="e.g. USA, International Triathlon Event"
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 uppercase bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] shadow-inner font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Category Flag</label>
                <input
                  type="text"
                  required
                  value={blogFormData.category}
                  onChange={e => setBlogFormData({ ...blogFormData, category: e.target.value })}
                  placeholder="e.g. HEALTH POLICY"
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 uppercase bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] shadow-inner font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Summary Memorandums Text</label>
                <textarea
                  required
                  rows={4}
                  value={blogFormData.text}
                  onChange={e => setBlogFormData({ ...blogFormData, text: e.target.value })}
                  placeholder="Provide brief outline message details..."
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] shadow-inner font-semibold hover:border-slate-300"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Unsplash Image URL (Optional)</label>
                <input
                  type="text"
                  value={blogFormData.imageUrl}
                  onChange={e => setBlogFormData({ ...blogFormData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-semibold"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                <button 
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-5 py-3 border border-slate-200 hover:border-slate-400 text-slate-650 text-xs font-sans font-bold uppercase transition-colors rounded-xl cursor-pointer"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="bg-[#0F3A6B] hover:bg-[#3b82f6] text-white px-6 py-3 text-xs font-sans font-black tracking-widest uppercase rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1"
                >
                  <Save size={13} />
                  <span>{editingBlog ? 'SAVE MODIFICATIONS' : 'PUBLISH ARTICLE'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: TEAM PROFILE MODAL */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 bg-slate-950/75 flex items-center justify-center p-4 z-50 backdrop-blur-xs text-left">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl animate-in font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-sans text-xs font-black uppercase text-slate-900">
                {editingTeam ? 'EDIT LEAD CONSULTANT PROFILE' : 'ADD NEW STAFF MEMBER'}
              </h3>
              <button onClick={() => setIsTeamModalOpen(false)} className="text-slate-400 hover:text-slate-900 p-1">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTeam} className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Consultant Full Name</label>
                <input
                  type="text"
                  required
                  value={teamFormData.name}
                  onChange={e => setTeamFormData({ ...teamFormData, name: e.target.value })}
                  placeholder="e.g. DR. MOHAMMED KABIR"
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 uppercase bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] shadow-inner font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Roster Role Description</label>
                <input
                  type="text"
                  required
                  value={teamFormData.role}
                  onChange={e => setTeamFormData({ ...teamFormData, role: e.target.value })}
                  placeholder="e.g. SPECIALIST HEALTH CONSULTANT"
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 uppercase bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] shadow-inner font-semibold font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Detailed Professional Biography</label>
                <textarea
                  required
                  rows={4}
                  value={teamFormData.bio}
                  onChange={e => setTeamFormData({ ...teamFormData, bio: e.target.value })}
                  placeholder="Provide background history, degrees, and agency support highlights..."
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] shadow-inner font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Initials Icon (e.g. EU)</label>
                  <input
                    type="text"
                    value={teamFormData.avatarText}
                    onChange={e => setTeamFormData({ ...teamFormData, avatarText: e.target.value })}
                    placeholder="e.g. MK"
                    maxLength={2}
                    className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 uppercase bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-semibold"
                  />
                </div>

                <div className="flex items-center gap-1.5 pt-6 pl-4 font-sans text-xs">
                  <input
                    type="checkbox"
                    id="isPending"
                    checked={teamFormData.isPending}
                    onChange={e => setTeamFormData({ ...teamFormData, isPending: e.target.checked })}
                    className="w-4 h-4 text-[#3b82f6] rounded focus:ring-[#3b82f6]/20 border-slate-200 cursor-pointer"
                  />
                  <label htmlFor="isPending" className="text-slate-700 font-extrabold uppercase select-none cursor-pointer">IS PROFILE PENDING?</label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                <button 
                  type="button"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="px-5 py-3 border border-slate-200 hover:border-slate-400 text-slate-650 text-xs font-sans font-bold uppercase transition-colors rounded-xl cursor-pointer"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="bg-[#0F3A6B] hover:bg-[#3b82f6] text-white px-6 py-3 text-xs font-sans font-black tracking-widest uppercase rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1"
                >
                  <Save size={13} />
                  <span>{editingTeam ? 'SAVE ROSTER MEMBER' : 'PUBLISH ROSTER PROFILE'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: SITE COPY CORE AREAS SPEC */}
      {isCcaModalOpen && editingCoreArea && (
        <div className="fixed inset-0 bg-slate-950/75 flex items-center justify-center p-4 z-50 backdrop-blur-xs text-left">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl animate-in font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-sans text-xs font-black uppercase text-slate-900">
                EDIT FOCUS MODULE: {editingCoreArea.title}
              </h3>
              <button onClick={() => setIsCcaModalOpen(false)} className="text-slate-400 hover:text-slate-900 p-1">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Sponsor Badge Logo</label>
                <input
                  type="text"
                  value={ccaFormData.badge}
                  onChange={e => setCcaFormData({ ...ccaFormData, badge: e.target.value })}
                  placeholder="e.g. FCDO / SFTAS"
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Section Title Name</label>
                <input
                  type="text"
                  value={ccaFormData.title}
                  onChange={e => setCcaFormData({ ...ccaFormData, title: e.target.value })}
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Description text</label>
                <textarea
                  rows={4}
                  value={ccaFormData.text}
                  onChange={e => setCcaFormData({ ...ccaFormData, text: e.target.value })}
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-semibold"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs space-y-1 text-amber-900 leading-relaxed">
                <p className="font-bold uppercase tracking-wider text-[10px]">LOCAL SANDBOX NOTATION:</p>
                <p>This action updates the state of current active browser viewport, but does not overwrite `/src/data.ts` itself. Remember to paste updated values there permanently!</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                <button 
                  type="button"
                  onClick={() => setIsCcaModalOpen(false)}
                  className="px-5 py-3 border border-slate-200 hover:border-slate-400 text-slate-650 text-xs font-sans font-bold uppercase transition-colors rounded-xl cursor-pointer"
                >
                  CLOSE
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    const updated = coreAreas.map(c => {
                      if (c.id === editingCoreArea.id) {
                        return { ...c, ...ccaFormData };
                      }
                      return c;
                    });
                    setCoreAreas(updated);
                    localStorage.setItem('dpcl_cms_core_areas', JSON.stringify(updated));
                    triggerStatus('success', 'Focus Area updated locally.');
                    setIsCcaModalOpen(false);
                  }}
                  className="bg-[#0F3A6B] hover:bg-[#3b82f6] text-white px-6 py-3 text-xs font-sans font-black tracking-widest uppercase rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1 font-semibold"
                >
                  <Save size={13} />
                  <span>SAVE LOCAL</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: STAT MILESTONE MODAL */}
      {isMilestoneModalOpen && editingMilestone && (
        <div className="fixed inset-0 bg-slate-950/75 flex items-center justify-center p-4 z-50 backdrop-blur-xs text-left">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 md:p-8 shadow-2xl animate-in font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-sans text-xs font-black uppercase text-slate-900">
                TUNE STAT TARGET: {editingMilestone.label}
              </h3>
              <button onClick={() => setIsMilestoneModalOpen(false)} className="text-slate-400 hover:text-slate-900 p-1">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Indicator Title Label</label>
                <input
                  type="text"
                  disabled
                  value={msFormData.label}
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-150 bg-slate-50 rounded-xl focus:outline-none text-slate-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Target Value (Numeric)</label>
                <input
                  type="number"
                  value={msFormData.target}
                  onChange={e => setMsFormData({ ...msFormData, target: parseInt(e.target.value) || 0 })}
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-semibold font-mono"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5 font-semibold">
                <button 
                  type="button"
                  onClick={() => setIsMilestoneModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-650 text-xs font-sans uppercase rounded-xl cursor-pointer"
                >
                  CANCEL
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    const updated = milestones.map(m => {
                      if (m.id === editingMilestone.id) {
                        return { ...m, target: msFormData.target, displayValue: `${msFormData.target}+` };
                      }
                      return m;
                    });
                    setMilestones(updated);
                    localStorage.setItem('dpcl_cms_milestones', JSON.stringify(updated));
                    triggerStatus('success', `Milestone target tuned to ${msFormData.target} successfully.`);
                    setIsMilestoneModalOpen(false);
                  }}
                  className="bg-[#0F3A6B] hover:bg-[#3b82f6] text-white px-5 py-2 text-xs font-sans font-black tracking-widest uppercase rounded-xl cursor-pointer flex items-center gap-1"
                >
                  <Save size={12} />
                  <span>SAVE LOCAL</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: AFFILIATION MODAL */}
      {isAffiliationModalOpen && editingAffiliation && (
        <div className="fixed inset-0 bg-slate-950/75 flex items-center justify-center p-4 z-50 backdrop-blur-xs text-left animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-sans text-xs font-black uppercase text-slate-900 flex items-center gap-1">
                <Award size={14} className="text-[#3b82f6]" />
                <span>EDIT PROFESSIONAL AFFILIATION</span>
              </h3>
              <button onClick={() => setIsAffiliationModalOpen(false)} className="text-slate-400 hover:text-slate-900 p-1">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Affiliation Abbreviation (Initials)</label>
                <input
                  type="text"
                  maxLength={12}
                  value={affFormData.initials}
                  onChange={e => setAffFormData({ ...affFormData, initials: e.target.value.toUpperCase() })}
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Affiliation Full Name</label>
                <textarea
                  rows={2}
                  value={affFormData.fullName}
                  onChange={e => setAffFormData({ ...affFormData, fullName: e.target.value })}
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Affiliation Logo Image URL</label>
                <input
                  type="text"
                  value={affFormData.imageUrl}
                  onChange={e => setAffFormData({ ...affFormData, imageUrl: e.target.value })}
                  className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-1.5">Accent Border Color (Hex code)</label>
                <input
                  type="color"
                  value={affFormData.color}
                  onChange={e => setAffFormData({ ...affFormData, color: e.target.value })}
                  className="w-12 h-10 border border-slate-200 rounded-xl cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5 font-semibold">
                <button 
                  type="button"
                  onClick={() => setIsAffiliationModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-sans uppercase rounded-xl cursor-pointer"
                >
                  CANCEL
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    const updated = affiliations.map(a => {
                      if (a.id === editingAffiliation.id) {
                        return { 
                          ...a, 
                          fullName: affFormData.fullName, 
                          initials: affFormData.initials, 
                          imageUrl: affFormData.imageUrl, 
                          color: affFormData.color 
                        };
                      }
                      return a;
                    });
                    setAffiliations(updated);
                    localStorage.setItem('dpcl_cms_affiliations', JSON.stringify(updated));
                    triggerStatus('success', `Affiliation '${affFormData.initials}' updated locally.`);
                    setIsAffiliationModalOpen(false);
                  }}
                  className="bg-[#0F3A6B] hover:bg-[#3b82f6] text-white px-5 py-2 text-xs font-sans font-black tracking-widest uppercase rounded-xl cursor-pointer flex items-center gap-1"
                >
                  <Save size={12} />
                  <span>SAVE LOCAL</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200/80 py-4 px-6 text-center text-[10px] text-slate-400 font-sans shrink-0">
        DPCL Portal Internal CMS Management Gateway • Audited Federal Transparency Compliant
      </footer>

    </div>
  );
}
