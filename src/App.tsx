import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoreFocus from './components/CoreFocus';
import Metrics from './components/Metrics';
import Team from './components/Team';
import Insights from './components/Insights';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Sliders, CheckSquare, Award, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [partnerConsultationTopic, setPartnerConsultationTopic] = useState<string>('');
  const [showPortal, setShowPortal] = useState(false);
  
  // Custom Alignment Portal State
  const [portalOrg, setPortalOrg] = useState('');
  const [portalFocus, setPortalFocus] = useState('health');
  const [portalRegion, setPortalRegion] = useState('north');
  const [simulationResult, setSimulationResult] = useState<any | null>(null);
  const [prefilledData, setPrefilledData] = useState<any | null>(null);

  // Intersection Observer to scroll-highlight navy navbar items
  useEffect(() => {
    const sections = ['home', 'core-focus', 'metrics', 'team', 'insights', 'contact'];
    const observers = sections.map((secId) => {
      const element = document.getElementById(secId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(secId);
          }
        },
        { threshold: 0.25, rootMargin: '-80px 0px -20% 0px' }
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

  const runPartnershipAlignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portalOrg.trim()) return;

    // Build premium strategic dynamic reports based on input credentials
    const matches: { [key: string]: any } = {
      health: {
        title: "Subnational Health Systems Expansion Profile",
        rate: 98,
        pillars: [
          "Primary Healthcare Decentralization Frameworks",
          "Subnational Commodity Supply-Chain Audits",
          "Maternal Health Financing Mechanisms"
        ],
        pastInterventions: "Optimized primary health budgets in Kaduna State, yielding 34% increase in rural clinic funding allotments."
      },
      governance: {
        title: "Accountability Audit & Civic Engagement Profile",
        rate: 95,
        pillars: [
          "Legislative Policy Tracking Protocols",
          "Citizen-Led Social Contract Dashboards",
          "Executive Advisory Alignment Audits"
        ],
        pastInterventions: "FCDO sub-grantee accountability program monitoring across north-central municipalities, certified green."
      },
      strategy: {
        title: "Bilateral Institutional Development Plan",
        rate: 92,
        pillars: [
          "Multi-Sectoral Development Blueprints",
          "Donor Integrity Risk Mitigation Controls",
          "Sovereign Program Design Structures"
        ],
        pastInterventions: "Designed administrative audit frameworks for federal ministerial delegates in Abuja."
      }
    };

    const coverageRegions: { [key: string]: string } = {
      north: "Northern & North-Western Zones (Kaduna Hub)",
      central: "Abuja Capital Secretariat & Middle Belt Zone",
      south: "Southern & Delta Riverine Systems Network"
    };

    const modelResult = matches[portalFocus] || matches.health;
    const regionText = coverageRegions[portalRegion] || "All state zones";

    setSimulationResult({
      donor: portalOrg,
      serviceTitle: modelResult.title,
      alignmentRate: modelResult.rate,
      strategicPillars: modelResult.pillars,
      focusedCoreZone: regionText,
      trackRecord: modelResult.pastInterventions,
      certificateCode: `DPCL-ALIGN-${Math.floor(1000 + Math.random() * 9000)}-${portalOrg.substring(0,3).toUpperCase()}`
    });
  };

  return (
    <div id="app-root-frame" className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-[#C5A880]/30 selection:text-slate-950 font-sans overflow-x-hidden">
      
      {/* 1. Header / Navbar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 2. Hero Section */}
      <Hero onLearnMore={handleNavigate} />

      {/* Quick Bilateral Alignment Simulator Portal Trigger (Elegantly tucked between Hero & Focus) */}
      <div id="alignment-trigger-banner" className="bg-[#0F172A] text-white py-6 border-y border-[#C5A880]/15 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <span className="p-1.5 border border-[#C5A880]/30 bg-slate-950 text-[#C5A880]">
              <Sliders size={14} className="animate-pulse" />
            </span>
            <p className="text-xs font-sans tracking-wide text-gray-300 font-light">
              Are you an international donor? Analyze your 2026 strategic objectives using our <span className="text-[#C5A880] font-medium">Bilateral Alignment Simulator</span>.
            </p>
          </div>
          <button
            id="portal-toggle-btn"
            onClick={() => setShowPortal(true)}
            className="border border-[#C5A880]/40 text-[#C5A880] hover:text-[#0F172A] hover:bg-[#C5A880] px-5 py-2 text-[10px] font-sans tracking-widest uppercase font-semibold transition-all duration-300 cursor-pointer"
          >
            Launch Alignment Engine
          </button>
        </div>
      </div>

      {/* 3. Core Focus Areas */}
      <CoreFocus />

      {/* 4. Animated Metrics Banner */}
      <Metrics />

      {/* 5. Leadership Team */}
      <Team onContactPartner={handleContactPartner} />

      {/* 6. News & Insights Section */}
      <Insights />

      {/* 7. Contact Partner operations secretariat console */}
      <Contact 
        partnerConsultationTopic={partnerConsultationTopic} 
        clearTopic={() => setPartnerConsultationTopic('')} 
        prefilledData={prefilledData}
        clearPrefilledData={() => setPrefilledData(null)}
      />

      {/* 8. Elite Footer component */}
      <Footer onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />


      {/* LUXURIOUS INTERACTIVE ALIGNMENT ENGINE MODAL OVERLAY */}
      <AnimatePresence>
        {showPortal && (
          <div 
            id="alignment-portal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
          >
            {/* Backdrop blur */}
            <motion.div
              id="alignment-portal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowPortal(false); setSimulationResult(null); }}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Portal Card */}
            <motion.div
              id="alignment-portal-card"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#0F172A] border border-[#C5A880]/30 p-6 sm:p-8 md:p-10 text-white z-10 shadow-2xl overflow-y-auto max-h-[90vh] rounded-none"
            >
              {/* Close Button */}
              <button
                id="portal-close"
                onClick={() => { setShowPortal(false); setSimulationResult(null); }}
                className="absolute top-4 right-4 text-gray-400 hover:text-[#C5A880] transition-colors p-1"
                aria-label="Close Portal"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                
                {/* Header metadata */}
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#C5A880] uppercase">
                    DPCL DIGITAL PORTAL • SECURE ENGINE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white tracking-tight mt-1">
                    Bilateral Priorities Alignment Engine
                  </h3>
                  <p className="text-xs font-sans text-gray-400 font-light mt-1 whitespace-normal">
                    Assess structural alignment ratios and deploy verified subnational advisory indicators instantly.
                  </p>
                </div>

                {!simulationResult ? (
                  /* Form Input Panel */
                  <form onSubmit={runPartnershipAlignment} className="space-y-4">
                    
                    {/* Donor Agency Name */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-sans tracking-widest uppercase text-gray-400 block font-bold">
                        International Donor / Philanthropic Entity Name
                      </label>
                      <input
                        type="text"
                        required
                        value={portalOrg}
                        onChange={(e) => setPortalOrg(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 px-3.5 py-2.5 text-xs font-sans outline-none focus:border-[#C5A880] transition-colors"
                        placeholder="e.g. FCDO West Africa Delegation, BMGF"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Operational Focus area */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-sans tracking-widest uppercase text-gray-400 block font-bold">
                          Primary Intervention Zone
                        </label>
                        <select
                          value={portalFocus}
                          onChange={(e) => setPortalFocus(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 px-3.5 py-2.5 text-xs font-sans outline-none focus:border-[#C5A880] cursor-pointer"
                        >
                          <option value="health">Health Systems Strengthening</option>
                          <option value="governance">Governance & Citizen Engagement</option>
                          <option value="strategy">Institutional Strategy Advisory</option>
                        </select>
                      </div>

                      {/* Geographic Sector */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-sans tracking-widest uppercase text-gray-400 block font-bold">
                          Target Geographic Sector
                        </label>
                        <select
                          value={portalRegion}
                          onChange={(e) => setPortalRegion(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 px-3.5 py-2.5 text-xs font-sans outline-none focus:border-[#C5A880] cursor-pointer"
                        >
                          <option value="north">North & North-Western Hub (Kaduna, etc.)</option>
                          <option value="central">Abuja Capital & North-Central Sector</option>
                          <option value="south">Southern Delta and Riverine States</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-end">
                      <button
                        id="portal-align-submit"
                        type="submit"
                        className="flex items-center gap-2 bg-[#C5A880] text-slate-950 px-6 py-2.5 text-xs font-sans tracking-widest uppercase font-semibold hover:bg-white transition-colors cursor-pointer"
                      >
                        <span>Compute Alignment Matrix</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                  </form>
                ) : (
                  /* Form Success simulation output ticket */
                  <div id="simulation-completed-deck" className="space-y-6">
                    
                    {/* Strategic Match Rate Meter */}
                    <div className="bg-slate-900 p-6 border border-[#C5A880]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="text-center sm:text-left space-y-1">
                        <span className="text-[9px] font-mono tracking-widest text-[#C5A880] uppercase">
                          ACCURE COUPLING METRIC
                        </span>
                        <h4 className="text-lg font-serif text-white font-bold">
                          {simulationResult.serviceTitle}
                        </h4>
                        <p className="text-xs font-sans text-gray-400 font-light whitespace-normal">
                          Configured for: <span className="text-white">{simulationResult.donor}</span> inside {simulationResult.focusedCoreZone}
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center p-4 bg-slate-950 border border-white/5 rounded-full w-24 h-24 flex-shrink-0">
                        <span className="text-2xl font-serif font-bold text-[#C5A880]">
                          {simulationResult.alignmentRate}%
                        </span>
                        <span className="text-[7px] font-sans tracking-wider text-gray-400 uppercase font-bold text-center leading-none mt-1">
                          COUPLED
                        </span>
                      </div>
                    </div>

                    {/* Operational Pillars */}
                    <div className="space-y-3 font-sans text-xs">
                      <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase block font-bold">
                        Calculated Strategic Pillars
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {simulationResult.strategicPillars.map((pillar: string, idx: number) => (
                          <div key={idx} className="p-3 bg-slate-900/50 border border-white/5 space-y-2">
                            <span className="text-[9px] font-mono text-[#C5A880] block">0{idx + 1}</span>
                            <p className="text-[11px] text-gray-300 font-light leading-snug">{pillar}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Verified track record description */}
                    <div className="bg-slate-900/30 border-l border-[#C5A880] p-4 text-xs font-sans font-light leading-relaxed text-gray-300">
                      <span className="text-[9px] font-mono tracking-widest text-[#C5A880] uppercase font-bold block mb-1">
                        Verified Intersecting Track Record
                      </span>
                      {simulationResult.trackRecord}
                    </div>

                    {/* Action Panel */}
                    <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">
                        VERIFICATION STAMP: {simulationResult.certificateCode}
                      </span>
                      
                      <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => {
                            // Copy alignment context automatically into Contact messaging fields to create a beautiful unified loop!
                            setPrefilledData({
                              fullName: `${simulationResult.donor} Delegate`,
                              organization: simulationResult.donor,
                              email: '',
                              phone: '',
                              subject: `Brief alignment inquiry: ${simulationResult.certificateCode}`,
                              message: `Our priorities alignment audit computed a match rate of ${simulationResult.alignmentRate}% under DPCL's ${simulationResult.serviceTitle}. We would like to configure a formal subnational briefing agenda. Security key: ${simulationResult.certificateCode}.`,
                              priority: 'high'
                            });
                            setShowPortal(false);
                            setSimulationResult(null);
                            handleNavigate('contact');
                          }}
                          className="w-full sm:w-auto text-center text-xs font-sans tracking-widest uppercase font-bold text-[#C5A880] hover:text-white transition-colors py-2 cursor-pointer"
                        >
                          Convert to formal Inquiry
                        </button>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
