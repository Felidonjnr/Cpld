import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoreAreas from './components/CoreAreas';
import Milestones from './components/Milestones';
import Team from './components/Team';
import Affiliations from './components/Affiliations';
import BlogEvents from './components/BlogEvents';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { siteConfig } from './data';

export default function App() {
  const [partnerConsultationTopic, setPartnerConsultationTopic] = useState<string>('');
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [siteConfigState, setSiteConfigState] = useState<any>(null);
  const [affiliations, setAffiliations] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  // Periodically fetch any changes saved inside CMS admin panels on switch or on mount
  useEffect(() => {
    let activeConfig = siteConfig;
    const localConfig = localStorage.getItem('dpcl_cms_site_config');
    if (localConfig) {
      const parsed = JSON.parse(localConfig);
      setSiteConfigState(parsed);
      activeConfig = parsed;
    }
    
    const localAffs = localStorage.getItem('dpcl_cms_affiliations');
    if (localAffs) {
      setAffiliations(JSON.parse(localAffs));
    }

    const localTeam = localStorage.getItem('dpcl_cms_team');
    if (localTeam) {
      const parsed = JSON.parse(localTeam).filter((m: any) => m.id !== 'ukwaja-kingsley' && m.id !== 'iro-okechukwu');
      setTeamMembers(parsed);
    }

    // Dynamic Synchronization of Address Bar / Browser Tag Favicons and Social Link Previews
    const logoUrlToUse = activeConfig.logoUrl || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=150";
    
    // 1. Title Sync
    document.title = activeConfig.companyName || "Development Consult Plus Limited (DPCL)";

    // 2. Favicon Sync
    const favicons = document.querySelectorAll("link[rel*='icon']");
    if (favicons.length > 0) {
      favicons.forEach((fav: any) => {
        fav.href = logoUrlToUse;
      });
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = logoUrlToUse;
      document.head.appendChild(link);
    }

    // 3. Open Graph Link Preview Elements Sync
    const ogTitle = document.getElementById('og-title') || document.querySelector("meta[property='og:title']");
    if (ogTitle) ogTitle.setAttribute('content', activeConfig.companyName || "Development Consult Plus Limited (DPCL)");

    const ogImg = document.getElementById('og-image') || document.querySelector("meta[property='og:image']");
    if (ogImg) ogImg.setAttribute('content', activeConfig.logoUrl || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200");

    // 4. Twitter Link Preview Elements Sync
    const twTitle = document.getElementById('twitter-title') || document.querySelector("meta[name='twitter:title']");
    if (twTitle) twTitle.setAttribute('content', activeConfig.companyName || "Development Consult Plus Limited (DPCL)");

    const twImg = document.getElementById('twitter-image') || document.querySelector("meta[name='twitter:image']");
    if (twImg) twImg.setAttribute('content', activeConfig.logoUrl || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200");

  }, [currentView]);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Offset height due to fixed top utility header & navigation
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleContactPartner = (partnerName: string) => {
    setPartnerConsultationTopic(partnerName);
    handleNavigate('contact');
  };

  // If Admin panel is open, render standalone dashboard layout view
  if (currentView === 'admin') {
    return <AdminPanel onClose={() => setCurrentView('public')} />;
  }

  return (
    <div 
      id="app-root-frame" 
      className="relative min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden selection:bg-[#0F3A6B]/15 selection:text-slate-950"
    >
      
      {/* SECTION 1: HEADER & TOP NAVIGATION BAR */}
      <Navbar onNavigate={handleNavigate} onOpenAdmin={() => setCurrentView('admin')} config={siteConfigState} />

      {/* SECTION 2: HERO CAROUSEL / SLIDER */}
      <Hero onLearnMore={handleNavigate} />

      {/* SECTION 3: CORE AREAS */}
      <CoreAreas onLearnMore={handleContactPartner} />

      {/* SECTION 4: KEY MILESTONES (STATS BANNER) */}
      <Milestones />

      {/* SECTION 5: OUR TEAM */}
      <Team onContactPartner={handleContactPartner} items={teamMembers.length > 0 ? teamMembers : undefined} />

      {/* SECTION 6: PROFESSIONAL AFFILIATIONS */}
      <Affiliations items={affiliations.length > 0 ? affiliations : undefined} />

      {/* SECTION 7: BLOG & EVENTS */}
      <BlogEvents />

      {/* SECURE ENGAGEMENT SUB-SECTION (Matches the nav Contact link perfectly) */}
      <Contact 
        partnerConsultationTopic={partnerConsultationTopic} 
        clearTopic={() => setPartnerConsultationTopic('')} 
      />

      {/* SECTION 8: FOOTER */}
      <Footer onNavigate={handleNavigate} onOpenAdmin={() => setCurrentView('admin')} config={siteConfigState} />

    </div>
  );
}
