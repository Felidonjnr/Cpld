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

export default function App() {
  const [partnerConsultationTopic, setPartnerConsultationTopic] = useState<string>('');
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [siteConfigState, setSiteConfigState] = useState<any>(null);
  const [affiliations, setAffiliations] = useState<any[]>([]);

  // Periodically fetch any changes saved inside CMS admin panels on switch or on mount
  useEffect(() => {
    const localConfig = localStorage.getItem('dpcl_cms_site_config');
    if (localConfig) {
      setSiteConfigState(JSON.parse(localConfig));
    }
    
    const localAffs = localStorage.getItem('dpcl_cms_affiliations');
    if (localAffs) {
      setAffiliations(JSON.parse(localAffs));
    }
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
      <Team onContactPartner={handleContactPartner} />

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
