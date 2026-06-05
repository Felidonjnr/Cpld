import React, { useState, useEffect } from 'react';
import { Menu, X, Landmark, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', id: 'home' },
    { name: 'ADVISORY MODULES', id: 'core-focus' },
    { name: 'IMPACT METRICS', id: 'metrics' },
    { name: 'DOCUMENT ATTACHMENTS', id: 'media-grid' },
    { name: 'PRINCIPAL BOARD', id: 'team' },
    { name: 'INTELLIGENCE MEMOS', id: 'insights' }
  ];

  const handleLinkClick = (id: string) => {
    setIsMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white border-b border-slate-200/80 shadow-sm py-0 h-16'
            : 'bg-white border-b border-slate-100 py-0 h-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* Left: Brand Identity Logo */}
            <div 
              id="brand-logo-container"
              className="flex-shrink-0 cursor-pointer flex items-center space-x-3"
              onClick={() => handleLinkClick('home')}
            >
              <div className="p-2 bg-[#0F3A6B] text-white rounded-none">
                <Landmark size={20} className="stroke-[2]" />
              </div>
              <div id="brand-logo" className="flex flex-col">
                <span className="font-serif text-sm sm:text-base tracking-tight text-[#0F3A6B] font-black leading-none uppercase">
                  DEVELOPMENT CONSULT
                </span>
                <span className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] font-sans tracking-[0.24em] text-slate-500 uppercase font-bold">
                    PLUS LIMITED
                  </span>
                  <span className="h-1 w-1 bg-[#0F3A6B]" />
                  <span className="text-[9px] font-mono tracking-wider text-slate-500 font-bold">
                    DPCL
                  </span>
                </span>
              </div>
            </div>

            {/* Center: Desktop Institutional Navigation */}
            <nav id="desktop-navigation" className="hidden lg:flex items-center justify-center space-x-6 h-full">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-[11px] font-sans tracking-wider uppercase transition-colors duration-150 relative h-full flex items-center px-1 font-bold cursor-pointer ${
                    activeSection === link.id
                      ? 'text-[#0F3A6B]'
                      : 'text-slate-500 hover:text-[#0F3A6B]'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <span 
                      id={`indicator-${link.id}`}
                      className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0F3A6B]" 
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Right: Contact Us fully block matching navigation height */}
            <div className="hidden sm:flex items-center h-full">
              <button
                id="header-contact-btn"
                onClick={() => handleLinkClick('contact')}
                className="bg-[#0F3A6B] text-white hover:bg-[#0B2C52] text-xs font-serif tracking-widest font-black uppercase rounded-none px-8 py-3 h-full flex items-center justify-center transition-all duration-150 cursor-pointer"
              >
                CONTACT US
              </button>
            </div>

            {/* Mobile menu button */}
            <div id="mobile-toggle-box" className="flex lg:hidden items-center">
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-700 hover:text-[#0F3A6B] p-2 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Absolute Sharp Geometry) */}
      <div
        id="mobile-nav-panel"
        className={`fixed inset-0 z-40 transition-transform duration-300 transform lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Backdrop overlay */}
        <div
          id="mobile-overlay"
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
        />

        {/* Sidebar Container */}
        <div id="mobile-sidebar-container" className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white border-l border-slate-200 px-6 py-6 flex flex-col justify-between overflow-y-auto rounded-none">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <span className="font-serif text-xs tracking-wider text-[#0F3A6B] font-extrabold uppercase flex items-center gap-2">
                <ShieldCheck size={16} /> ADMINISTRATOR ACCESS
              </span>
              <button
                id="sidebar-close"
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-400 hover:text-slate-950"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Links List */}
            <nav className="mt-8 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left text-xs font-sans tracking-wide uppercase py-3 px-3 rounded-none font-bold transition-all ${
                    activeSection === link.id
                      ? 'bg-slate-100 text-[#0F3A6B] border-l-4 border-[#0F3A6B]'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          <div id="mobile-sidebar-footer" className="pt-6 border-t border-slate-100 space-y-4">
            <button
              onClick={() => handleLinkClick('contact')}
              className="bg-[#0F3A6B] text-white py-3 w-full text-xs font-serif tracking-widest uppercase font-extrabold rounded-none block text-center"
            >
              DIRECT CONTACT UNIT
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Development Consult Plus Limited. Abuja HQ.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
