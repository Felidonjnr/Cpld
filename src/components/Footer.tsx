import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowUp, ShieldCheck, HelpCircle, Landmark, ExternalLink } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    
    setSubSuccess(true);
    setTimeout(() => {
      setNewsEmail('');
      setSubSuccess(false);
    }, 3000);
  };

  const handleStaffLogin = () => {
    alert("Administrative Staff Access Terminal: Redirecting to secure Microsoft Azure / active-directory portal with sovereign single-sign-on (SSO).");
  };

  return (
    <footer id="footer-section" className="relative">
      
      {/* 1. HIGH-IMPACT NEWSLETTER BLOCK (Full-width, Solid Deep Corporate Navy) */}
      <div className="bg-[#0F3A6B] py-16 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
        {/* Abstract background stamp alignment lines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <Landmark size={400} className="stroke-[1] absolute -right-20 -bottom-20" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Explanatory Context */}
            <div className="lg:col-span-5 text-left space-y-2">
              <span className="text-[10px] font-mono tracking-[0.2em] text-white/70 block uppercase">
                SOVEREIGN INTELLIGENCE BULLETIN
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-white uppercase tracking-tight">
                SUBSCRIBE TO BRIEFING DECK
              </h3>
              <p className="text-xs text-slate-200/90 font-sans max-w-sm leading-relaxed">
                Receive subnational policy updates, clinical resource briefs, and bilateral alignment audits sent directly from our Secretariat.
              </p>
            </div>

            {/* Right Col: Transparent Underlined Form fields */}
            <div className="lg:col-span-7">
              {subSuccess ? (
                <div className="border border-white/30 bg-white/10 p-4 text-center text-xs font-mono rounded-none uppercase animate-pulse">
                  ✔ SUCCESS: Email added to the secure intelligence queue.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-5 items-end">
                  <div className="flex-1 w-full text-left">
                    <label className="text-[9px] font-mono uppercase text-slate-300 block mb-1">
                      DIRECTORATE / REGISTERED EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={newsEmail}
                      onChange={(e) => setNewsEmail(e.target.value)}
                      placeholder="e.g. administrator@ministry.state.gov"
                      className="w-full text-xs font-sans py-3 bg-transparent border-b border-white/50 text-white placeholder-white/40 focus:border-white focus:outline-none rounded-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-white text-[#0F3A6B] hover:bg-slate-100 font-serif font-black uppercase text-xs tracking-wider rounded-none px-8 py-4.5 transition-colors cursor-pointer shrink-0"
                  >
                    REGISTRY SUBMIT
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>


      {/* 2. MAIN FOOTER (Deep Blue backdrop list stack) */}
      <div className="bg-[#0B2340] py-20 px-4 sm:px-6 lg:px-8 text-white text-left select-none">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
            
            {/* Col 1: Corporate Registry Brand */}
            <div className="space-y-4">
              <div 
                className="flex flex-col cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <span className="font-serif text-base tracking-tight text-white leading-none font-black uppercase">
                  DEVELOPMENT CONSULT
                </span>
                <span className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-sans tracking-[0.25em] text-slate-300 uppercase font-bold">
                    PLUS LIMITED
                  </span>
                  <span className="h-1 w-1 bg-white" />
                  <span className="text-[9px] font-mono tracking-wider text-slate-300">
                    DPCL
                  </span>
                </span>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-xs">
                A premier subnational advisory and systemic health reform firm driving fiscal accountability across Sub-Saharan sovereign targets.
              </p>

              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] font-mono rounded-none">
                <ShieldCheck size={12} className="text-[#3b82f6]" />
                <span>ACCENT GRADE: INSTITUTIONAL A</span>
              </div>
            </div>

            {/* Col 2: Structured Vertical Text Menus (Advisory Domains) */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono tracking-[0.15em] uppercase text-white font-extrabold pb-2 border-b border-white/5">
                ADVISORY TRACKS
              </h4>
              <ul className="space-y-2.5 text-xs font-sans text-slate-300">
                <li><a href="#core-focus" className="hover:text-white transition-colors">01. Health Systems Strengthening</a></li>
                <li><a href="#core-focus" className="hover:text-white transition-colors">02. Governance & Accountability</a></li>
                <li><a href="#core-focus" className="hover:text-white transition-colors">03. Subnational Performance Policy</a></li>
                <li><a href="#core-focus" className="hover:text-white transition-colors">04. Multisectoral Bilateral Strategy</a></li>
              </ul>
            </div>

            {/* Col 3: Quick Navigation Stack */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono tracking-[0.15em] uppercase text-white font-extrabold pb-2 border-b border-white/5">
                PORTAL NAVIGATOR
              </h4>
              <ul className="space-y-2.5 text-xs font-sans text-slate-300">
                <li><a href="#home" className="hover:text-white transition-colors">Home Executive</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Registry Contact Office</a></li>
                <li><a href="#metrics" className="hover:text-white transition-colors">Impact Analytics</a></li>
                <li><a href="#media-grid" className="hover:text-white transition-colors">Document Archive Covers</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">Leadership Partnership</a></li>
                <li><a href="#insights" className="hover:text-white transition-colors">Insights Memorandums</a></li>
              </ul>
            </div>

            {/* Col 4: Secretariat Contact details */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono tracking-[0.15em] uppercase text-white font-extrabold pb-2 border-b border-white/5">
                SECRETARIAT ADRESS
              </h4>
              <div className="space-y-3.5 text-xs font-sans text-slate-300 leading-snug">
                <div className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-white shrink-0 mt-0.5" />
                  <span>Valley Plaza, 3rd Floor, Plot 215, Aminu Kano Crescent, Wuse II, Abuja, Nigeria.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-white shrink-0" />
                  <span>+234 (0) 90 3216 7193</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail size={14} className="text-white shrink-0" />
                  <span>k.ukwaja@dpcl-consulting.com</span>
                </div>
              </div>
            </div>

          </div>

          {/* Lower bottom elements with Hollow Ghost button explicitly for Staff Access */}
          <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-1 text-center md:text-left">
              <p className="text-[10px] font-mono text-slate-400">
                © 2026 Development Consult Plus Limited (DPCL). Abuja Executive Office. All Rights Reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-1 text-[9px] text-slate-500 font-mono">
                <span>FORMAL REG: RC-1495922</span>
                <span>•</span>
                <span>STATE SECURITY CLEARANCE VERIFIED</span>
              </div>
            </div>

            {/* Right side: staff token trigger + alignment backup */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-5">
              
              {/* Back to Top */}
              <button
                onClick={onScrollToTop}
                className="text-[10px] font-mono text-slate-300 hover:text-white uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <span>Scroll Top</span>
                <ArrowUp size={12} />
              </button>

              {/* Distinct completely square hollow ghost button explicitly styled for staff access as requested */}
              <button
                onClick={handleStaffLogin}
                className="border border-white/30 hover:border-white text-white hover:bg-white/5 text-[9px] font-mono tracking-widest uppercase rounded-none px-4 py-2 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>STAFF LOGIN PORTAL</span>
                <ExternalLink size={10} />
              </button>

            </div>

          </div>

        </div>
      </div>

    </footer>
  );
}
