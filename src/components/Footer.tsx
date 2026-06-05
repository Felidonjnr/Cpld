import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-section" className="bg-[#0B0F19] text-white pt-20 pb-12 border-t border-white/5 relative">
      
      {/* Decorative golden accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-16 border-b border-white/5">
          
          {/* Brand Col (5 Columns) */}
          <div className="md:col-span-5 space-y-6">
            <div 
              id="footer-logo"
              className="flex flex-col cursor-pointer"
              onClick={handleLogoClick}
            >
              <span className="font-serif text-lg tracking-widest text-[#C5A880] leading-none font-bold">
                DEVELOPMENT CONSULT
              </span>
              <span className="flex items-center gap-1.5 mt-1">
                <span className="text-xs font-sans tracking-[0.25em] text-gray-300 uppercase">
                  Plus Limited
                </span>
                <span className="h-1 w-1 rounded-full bg-[#C5A880]" />
                <span className="text-[10px] font-sans tracking-widest text-gray-400 uppercase font-bold">
                  DPCL
                </span>
              </span>
            </div>

            <p className="text-xs font-sans tracking-wide text-gray-400 leading-relaxed font-light max-w-sm">
              We are a premier international development consulting firm, forging resilient health systems, transparent public policies, and robust program compliance structures across Africa's developing state jurisdictions.
            </p>

            <div className="flex items-center space-x-2 text-[10px] font-sans tracking-wider text-gray-400 bg-white/5 py-1 px-3 self-start max-w-max border border-white/5">
              <ShieldCheck size={12} className="text-[#C5A880]" />
              <span>Sovereign Advisory Accreditation Level A</span>
            </div>
          </div>

          {/* Quick Navigation Deck (3 Columns) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#C5A880] font-bold">
              Corporate Modules
            </h4>
            <div className="flex flex-col space-y-2.5">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left text-xs font-sans tracking-wider text-gray-400 hover:text-white transition-colors cursor-pointer">
                Top Overview
              </button>
              <a href="#core-focus" className="text-xs font-sans tracking-wider text-gray-400 hover:text-white transition-colors">
                Strategic Focus Areas
              </a>
              <a href="#metrics" className="text-xs font-sans tracking-wider text-gray-400 hover:text-white transition-colors">
                Intervention Metrics
              </a>
              <a href="#team" className="text-xs font-sans tracking-wider text-gray-400 hover:text-white transition-colors">
                Executive Partners
              </a>
              <a href="#insights" className="text-xs font-sans tracking-wider text-gray-400 hover:text-white transition-colors">
                Insights & Memos
              </a>
              <a href="#contact" className="text-xs font-sans tracking-wider text-gray-400 hover:text-white transition-colors">
                Private Inquiries
              </a>
            </div>
          </div>

          {/* Direct channels summary (4 Columns) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#C5A880] font-bold">
              Secretariat Routing
            </h4>
            <div className="space-y-4 text-xs font-sans text-gray-400 font-light">
              <div className="flex items-start space-x-2.5">
                <MapPin size={14} className="text-[#C5A880] mt-0.5" />
                <span>Suite 302, Capital Plaza, 66 Adetokunbo Ademola Cres, Wuse II, Abuja, Nigeria.</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone size={14} className="text-[#C5A880]" />
                <a href="tel:+23494600000" className="hover:text-white transition-colors">+234 (0) 9 460 0000</a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail size={14} className="text-[#C5A880]" />
                <a href="mailto:office@dpcl-consulting.com" className="hover:text-white transition-colors">office@dpcl-consulting.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Lower footer row */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Copyright notice - strictly as parsed */}
          <div className="text-center sm:text-left space-y-1">
            <p className="text-[10px] font-sans tracking-wider text-gray-500">
              © 2026 Development Consult Plus Limited (DPCL). All Rights Reserved.
            </p>
            <p className="text-[8px] font-sans tracking-widest text-gray-600 uppercase">
              ABUJA SEC_REG_NUM: 2045952
            </p>
          </div>

          {/* Privacy & legal links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-sans tracking-wider text-gray-500">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Charter</a>
            <a href="#terms" className="hover:text-white transition-colors">Commitment Terms</a>
            <a href="#disclosure" className="hover:text-white transition-colors">Audit Disclosures</a>
            
            {/* Scroll block trigger arrow */}
            <button
              onClick={onScrollToTop}
              className="flex items-center gap-1.5 text-gray-400 hover:text-[#C5A880] transition-colors font-bold uppercase pl-4 cursor-pointer border-l border-white/10"
              title="Return to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
