import React from 'react';
import { Landmark, ArrowUp, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '../data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  config?: any;
}

export default function Footer({ onNavigate, onOpenAdmin, config }: FooterProps) {
  const cfg = config || siteConfig;
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B2340] text-slate-300 font-sans relative">
      
      {/* Primary Footer grid */}
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          
          {/* Column 1: About DPCL */}
          <div className="space-y-4">
            <div 
              className="flex items-center space-x-2 cursor-pointer select-none"
              onClick={handleScrollToTop}
            >
              {cfg.logoUrl ? (
                <div className="h-7 w-7 relative flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg bg-white p-0.5 shadow-sm">
                  <img 
                    src={cfg.logoUrl} 
                    alt={cfg.logoText} 
                    referrerPolicy="no-referrer" 
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="h-7 w-7 bg-[#0F3A6B] text-white flex items-center justify-center font-serif font-black text-xs rounded-lg shadow-sm">
                  {cfg.logoText}
                </div>
              )}
              <span className="font-sans text-sm font-black text-white tracking-tight uppercase">
                ABOUT {cfg.shortName}
              </span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {cfg.companyName} is a premier development consulting firm established in 2021. Our team of specialists from health, policy, finance, and academia provides a wide range of analytical research, advocacy implementation, and policy audit services.
            </p>
          </div>

          {/* Column 2: QUICK NAVIGATION */}
          <div className="space-y-4">
            <h4 className="text-xs font-sans font-extrabold tracking-widest text-white uppercase pb-1 border-b border-white/10">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span 
                  onClick={handleScrollToTop}
                  className="hover:text-white cursor-pointer transition-colors font-medium"
                >
                  Home
                </span>
              </li>
              <li>
                <span 
                  onClick={() => onNavigate('core-areas')}
                  className="hover:text-white cursor-pointer transition-colors font-medium"
                >
                  Core Focus Areas
                </span>
              </li>
              <li>
                <span 
                  onClick={() => onNavigate('milestones')}
                  className="hover:text-white cursor-pointer transition-colors font-medium"
                >
                  Milestones & Statistics
                </span>
              </li>
              <li>
                <span 
                  onClick={() => onNavigate('blog-events')}
                  className="hover:text-white cursor-pointer transition-colors font-medium"
                >
                  Latest Blog & Events
                </span>
              </li>
              <li>
                <span 
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white cursor-pointer transition-colors font-medium"
                >
                  Contact Secretariat
                </span>
              </li>
              <li>
                <span 
                  onClick={onOpenAdmin}
                  className="hover:text-white cursor-pointer transition-colors font-medium"
                >
                  Staff Login
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: GENERAL INQUIRIES */}
          <div className="space-y-4">
            <h4 className="text-xs font-sans font-extrabold tracking-widest text-[#efefef] uppercase pb-1 border-b border-white/10">
              SECRETARIAT DIRECT
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin size={14} className="text-[#3b82f6] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {cfg.contactAddress}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#3b82f6] shrink-0" />
                <a href={`mailto:${cfg.contactEmail}`} className="hover:text-white transition-colors hover:underline">
                  {cfg.contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={14} className="text-[#3b82f6] shrink-0" />
                <span>Mon — Fri: 08:30 to 17:00 (GMT+1)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Absolute bottom: Centered stand-alone copyright bar & Top Scroll */}
        <div className="pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          
          <div className="flex-1 hidden sm:block" />

          <div className="text-center font-sans tracking-wide">
            © 2026 {cfg.companyName}. All Rights Reserved.
          </div>

          <div className="flex-1 flex justify-center sm:justify-end">
            <button
              onClick={handleScrollToTop}
              className="hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Scroll Top</span>
              <ArrowUp size={12} />
            </button>
          </div>

        </div>

      </div>

    </footer>
  );
}
