import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Phone, Facebook, Twitter, Github, Sparkles } from 'lucide-react';
import { siteConfig } from '../data';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  config?: any;
}

export default function Navbar({ onNavigate, onOpenAdmin, config }: NavbarProps) {
  const cfg = config || siteConfig;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      
      {/* SECTION 1A: THIN TOP UTILITY BAR (Deep Corporate Navy Accent) */}
      <div className="bg-[#0B2340] text-slate-200 text-[11px] py-2.5 px-4 sm:px-6 lg:px-8 border-b border-white/5 font-sans relative z-10 hidden md:block select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          
          {/* Contact and address left segments */}
          <div className="flex flex-wrap items-center gap-5 justify-center sm:justify-start">
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin size={11} className="text-[#3b82f6]" />
              <span className="font-medium">
                {cfg.contactAddress}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Phone size={11} className="text-[#3b82f6]" />
              <span className="font-mono font-bold">{cfg.contactPhone}</span>
            </div>
          </div>

          {/* Social connections */}
          <div className="flex items-center gap-4">
            <a 
              href={cfg.socials?.facebook || 'https://facebook.com'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#3b82f6] transition-colors"
              title="Facebook"
            >
              <Facebook size={12} />
            </a>
            <a 
              href={cfg.socials?.twitter || 'https://twitter.com'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#3b82f6] transition-colors"
              title="Twitter"
            >
              <Twitter size={12} />
            </a>
            <a 
              href={cfg.socials?.googlePlus || 'https://plus.google.com'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#3b82f6] flex items-center gap-0.5 transition-colors font-mono font-bold text-[9px]"
              title="Google+"
            >
              <span className="leading-none">G+</span>
            </a>
            <a 
              href={cfg.socials?.github || 'https://github.com'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#3b82f6] transition-colors"
              title="GitHub"
            >
              <Github size={12} />
            </a>
          </div>

        </div>
      </div>

      {/* SECTION 1B: MAIN NAVIGATION BAR (Pristine White) */}
      <nav 
        className={`w-full transition-all duration-300 bg-white ${
          isScrolled 
            ? 'shadow-lg py-3 border-b border-slate-200' 
            : 'border-b border-slate-200/60 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Group */}
            <div 
              className="flex items-center space-x-2.5 cursor-pointer shrink-0 select-none text-left"
              onClick={() => handleLinkClick('home')}
            >
              {cfg.logoUrl ? (
                <div className="h-9 w-9 relative flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg bg-slate-50 border border-slate-100 p-0.5">
                  <img 
                    src={cfg.logoUrl} 
                    alt={cfg.logoText} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="h-9 w-9 bg-[#0F3A6B] flex items-center justify-center text-white relative flex-shrink-0 rounded-lg shadow-sm">
                  <span className="font-serif font-black text-sm tracking-tighter">{cfg.logoText}</span>
                  <span className="absolute bottom-0.5 right-0.5 h-1.5 w-1.5 bg-[#3b82f6] rounded-full" />
                </div>
              )}
              <div className="flex flex-col">
                <h1 className="font-sans text-sm sm:text-base font-black tracking-tight text-[#0F3A6B] leading-none uppercase">
                  {cfg.companyName}
                </h1>
                <span className="text-[9px] font-mono tracking-[0.22em] text-slate-500 font-bold mt-0.5 uppercase">
                  PLUS LTD • {cfg.shortName}
                </span>
              </div>
            </div>

            {/* Main right-aligned Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 font-sans">
              <button 
                onClick={() => handleLinkClick('home')} 
                className="text-[12px] font-extrabold tracking-widest text-[#0F3A6B] hover:text-[#3b82f6] transition-colors cursor-pointer uppercase py-1 relative"
              >
                HOME
              </button>
              
              <button 
                onClick={() => handleLinkClick('core-areas')} 
                className="text-[12px] font-extrabold tracking-widest text-slate-600 hover:text-[#0F3A6B] transition-colors cursor-pointer uppercase py-1 relative"
              >
                ABOUT
              </button>

              <button 
                onClick={() => handleLinkClick('knowledge-hub')} 
                className="text-[12px] font-extrabold tracking-widest text-slate-600 hover:text-[#0F3A6B] transition-colors cursor-pointer uppercase py-1 relative"
              >
                KNOWLEDGE
              </button>

              <button 
                onClick={onOpenAdmin} 
                className="text-[12px] font-extrabold tracking-widest text-[#3b82f6] hover:text-[#0F3A6B] transition-colors cursor-pointer uppercase py-1 flex items-center gap-1 font-mono"
              >
                <Sparkles size={12} className="text-[#3b82f6] animate-pulse" />
                <span>ADMIN CMS</span>
              </button>
              
              <button 
                onClick={() => handleLinkClick('contact')} 
                className="bg-[#0F3A6B] text-white hover:bg-[#1d4ed8] text-[11px] font-extrabold tracking-widest uppercase px-6 py-2.5 transition-all duration-300 cursor-pointer rounded-full shadow-sm hover:shadow-md"
              >
                CONTACT
              </button>
            </div>

            {/* Mobile hamburger toggler */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-[#0F3A6B] focus:outline-none p-1.5"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* MOBILE FULL-DRAWER NAVIGATION PANEL */}
      <div 
        className={`fixed inset-0 z-40 transition-transform duration-300 transform md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-[100%]'
        }`}
      >
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" 
          onClick={() => setIsMenuOpen(false)} 
        />
        
        <div className="fixed top-0 right-0 w-[80%] max-w-xs h-full bg-white shadow-2xl border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-8 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="font-serif text-xs tracking-wider text-[#0F3A6B] font-extrabold uppercase">
                {cfg.shortName} PORTAL
              </span>
              <button onClick={() => setIsMenuOpen(false)} className="text-slate-400 hover:text-slate-900">
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col space-y-2">
              <button 
                onClick={() => handleLinkClick('home')}
                className="p-3 text-[#0F3A6B] text-xs font-black tracking-widest uppercase hover:bg-[#0F3A6B]/5 rounded-xl text-left bg-[#0F3A6B]/5 transition-all"
              >
                HOME
              </button>
              <button 
                onClick={() => handleLinkClick('core-areas')}
                className="p-3 text-slate-600 hover:text-[#0F3A6B] text-xs font-black tracking-widest uppercase hover:bg-slate-50 rounded-xl text-left transition-all"
              >
                ABOUT
              </button>
              <button 
                onClick={() => handleLinkClick('knowledge-hub')}
                className="p-3 text-slate-600 hover:text-[#0F3A6B] text-xs font-black tracking-widest uppercase hover:bg-slate-50 rounded-xl text-left transition-all"
              >
                KNOWLEDGE
              </button>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenAdmin();
                }}
                className="p-3 text-[#3b82f6] hover:text-[#0F3A6B] text-xs font-black tracking-widest uppercase hover:bg-slate-50 rounded-xl text-left transition-all"
              >
                ADMIN CMS
              </button>
              <button 
                onClick={() => handleLinkClick('contact')}
                className="p-3 text-slate-600 hover:text-[#0F3A6B] text-xs font-black tracking-widest uppercase hover:bg-slate-50 rounded-xl text-left transition-all"
              >
                CONTACT
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-4 text-xs font-sans text-slate-500 text-left">
            <div>
              <p className="font-bold text-[#0F3A6B] uppercase text-[10px] tracking-wider mb-1">
                SECRETARIAT ADDRESS
              </p>
              <p className="leading-tight text-[11px]">
                {cfg.contactAddress}
              </p>
            </div>
            <div>
              <p className="font-bold text-[#0F3A6B] uppercase text-[10px] tracking-wider mb-1">
                CONTACT PHONE
              </p>
              <p className="font-mono font-bold text-[11px] text-slate-800">
                {cfg.contactPhone}
              </p>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}
