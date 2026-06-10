import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoreAreas from './components/CoreAreas';
import Milestones from './components/Milestones';
import Team from './components/Team';
import Affiliations from './components/Affiliations';
import BlogEvents from './components/BlogEvents';
import KnowledgeHub from './components/KnowledgeHub';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { siteConfig, AFFILIATIONS_DATA, TEAM_MEMBERS_DATA } from './data';

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
      const merged = { ...siteConfig, ...parsed };
      setSiteConfigState(merged);
      activeConfig = merged;
    } else {
      setSiteConfigState(siteConfig);
    }
    
    // Sync Affiliations with smart merge
    const localAffs = localStorage.getItem('dpcl_cms_affiliations');
    let finalAffs = AFFILIATIONS_DATA;
    if (localAffs) {
      const parsed = JSON.parse(localAffs);
      const defaultsMap = new Map(AFFILIATIONS_DATA.map(a => [a.id, a]));
      const merged = parsed.map((aff: any) => {
        if (defaultsMap.has(aff.id)) {
          return { ...aff, ...defaultsMap.get(aff.id) };
        }
        return aff;
      });
      const existingIds = new Set(merged.map((a: any) => a.id));
      AFFILIATIONS_DATA.forEach(def => {
        if (!existingIds.has(def.id)) {
          merged.push(def);
        }
      });
      finalAffs = merged;
      localStorage.setItem('dpcl_cms_affiliations', JSON.stringify(merged));
    } else {
      localStorage.setItem('dpcl_cms_affiliations', JSON.stringify(AFFILIATIONS_DATA));
    }
    setAffiliations(finalAffs);

    // Sync Team with smart merge (this automatically rolls out Dr. Adamu's new details!)
    const localTeam = localStorage.getItem('dpcl_cms_team');
    let finalTeam = TEAM_MEMBERS_DATA;
    if (localTeam) {
      const parsed = JSON.parse(localTeam);
      const defaultsMap = new Map(TEAM_MEMBERS_DATA.map(m => [m.id, m]));
      const merged = parsed.map((m: any) => {
        if (defaultsMap.has(m.id)) {
          return { ...m, ...defaultsMap.get(m.id) };
        }
        return m;
      });
      const existingIds = new Set(merged.map((m: any) => m.id));
      TEAM_MEMBERS_DATA.forEach(def => {
        if (!existingIds.has(def.id)) {
          merged.push(def);
        }
      });
      finalTeam = merged;
      localStorage.setItem('dpcl_cms_team', JSON.stringify(merged));
    } else {
      localStorage.setItem('dpcl_cms_team', JSON.stringify(TEAM_MEMBERS_DATA));
    }
    setTeamMembers(finalTeam);

    // Dynamic Synchronization of Address Bar / Browser Tag Favicons and Social Link Previews
    const logoUrlToUse = activeConfig.logoUrl || siteConfig.logoUrl;
    const previewImgToUse = activeConfig.previewImageUrl || siteConfig.previewImageUrl;
    const descriptionToUse = activeConfig.description || siteConfig.description;
    const companyTitleToUse = activeConfig.companyName || siteConfig.companyName;
    
    // 1. Title Sync
    document.title = companyTitleToUse;

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
    if (ogTitle) ogTitle.setAttribute('content', companyTitleToUse);

    const ogImg = document.getElementById('og-image') || document.querySelector("meta[property='og:image']");
    if (ogImg) ogImg.setAttribute('content', previewImgToUse || '');

    const ogDesc = document.getElementById('og-description') || document.querySelector("meta[property='og:description']");
    if (ogDesc) ogDesc.setAttribute('content', descriptionToUse || '');

    // 4. Twitter Link Preview Elements Sync
    const twTitle = document.getElementById('twitter-title') || document.querySelector("meta[name='twitter:title']");
    if (twTitle) twTitle.setAttribute('content', companyTitleToUse);

    const twImg = document.getElementById('twitter-image') || document.querySelector("meta[name='twitter:image']");
    if (twImg) twImg.setAttribute('content', previewImgToUse || '');

    const twDesc = document.getElementById('twitter-description') || document.querySelector("meta[name='twitter:description']");
    if (twDesc) twDesc.setAttribute('content', descriptionToUse || '');

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

      {/* KNOWLEDGE HUB RESOURCE ARCHIVE */}
      <KnowledgeHub />

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
