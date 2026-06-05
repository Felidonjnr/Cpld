import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoreFocus from './components/CoreFocus';
import AlignmentSimulator from './components/AlignmentSimulator';
import Metrics from './components/Metrics';
import MediaGrid from './components/MediaGrid';
import Team from './components/Team';
import Insights from './components/Insights';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [partnerConsultationTopic, setPartnerConsultationTopic] = useState<string>('');
  const [prefilledData, setPrefilledData] = useState<{
    fullName: string;
    organization: string;
    subject: string;
    message: string;
  } | null>(null);

  // Intersection Observer to scroll-highlight navy navbar items
  useEffect(() => {
    const sections = ['home', 'core-focus', 'advisory-sim', 'metrics', 'media-grid', 'team', 'insights', 'contact'];
    const observers = sections.map((secId) => {
      const element = document.getElementById(secId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(secId);
          }
        },
        { threshold: 0.15, rootMargin: '-80px 0px -30% 0px' }
      );
      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.element);
      });
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of fixed top navbar container
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

  const handleSimulatorDataTransfer = (copiedProfile: {
    fullName: string;
    organization: string;
    subject: string;
    message: string;
  }) => {
    setPrefilledData(copiedProfile);
    // Smooth scroll is initiated by the child, but we register the state immediately
  };

  return (
    <div 
      id="app-root-frame" 
      className="relative min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden selection:bg-[#0F3A6B]/15 selection:text-slate-950"
    >
      
      {/* 1. Rigid Geometric Header Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 2. Full-bleed Immersive Hero Segment */}
      <Hero onLearnMore={handleNavigate} />

      {/* 3. Vertical Structured Core Advisory Tracks */}
      <CoreFocus onSelectTrack={handleContactPartner} />

      {/* 4. Bespoke Subnational Strategy Alignment Simulator */}
      <AlignmentSimulator onCopyData={handleSimulatorDataTransfer} />

      {/* 5. Light-gray Circular Metric Badges Area */}
      <Metrics />

      {/* 6. Flat Administrative Search & Media Report Grid */}
      <MediaGrid />

      {/* 7. Principal Board of Partners */}
      <Team onContactPartner={handleContactPartner} />

      {/* 8. Intelligence Memorandums & Insights Bento Deck */}
      <Insights />

      {/* 9. Core Registry Consultation Office (Contact Block) */}
      <Contact 
        partnerConsultationTopic={partnerConsultationTopic} 
        clearTopic={() => setPartnerConsultationTopic('')} 
        prefilledData={prefilledData}
        clearPrefilledData={() => setPrefilledData(null)}
      />

      {/* 10. Immersive Newsletter Area & Structured Main Footer */}
      <Footer onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

    </div>
  );
}
