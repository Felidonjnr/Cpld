import React, { useState, useEffect } from 'react';
import { Linkedin, Phone, MapPin, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Core Focus', id: 'core-focus' },
    { name: 'Metrics', id: 'metrics' },
    { name: 'Team', id: 'team' },
    { name: 'Insights', id: 'insights' },
    { name: 'Contact', id: 'contact' }
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
            ? 'bg-slate-900/95 backdrop-blur-md border-b border-[#C5A880]/20 shadow-lg py-3'
            : 'bg-[#0F172A]/90 backdrop-blur-sm border-b border-white/5 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: Clean brand logo */}
            <div 
              id="brand-logo-container"
              className="flex-shrink-0 cursor-pointer"
              onClick={() => handleLinkClick('home')}
            >
              <div id="brand-logo" className="flex flex-col">
                <span className="font-serif text-lg tracking-widest text-white leading-none font-semibold">
                  DEVELOPMENT CONSULT
                </span>
                <span className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-sans tracking-[0.25em] text-[#C5A880] uppercase font-medium">
                    Plus Limited
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[#C5A880]" />
                  <span className="text-[10px] font-sans tracking-widest text-[#C5A880] uppercase font-bold">
                    DPCL
                  </span>
                </span>
              </div>
            </div>

            {/* Center: Desktop Navigation links */}
            <nav id="desktop-narvation" className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-xs font-sans tracking-widest uppercase transition-colors duration-200 relative py-1 cursor-pointer font-medium ${
                    activeSection === link.id
                      ? 'text-[#C5A880]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <span 
                      id={`indicator-${link.id}`}
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A880]" 
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Right: Contact & Social Icons */}
            <div id="quick-contact-container" className="hidden lg:flex items-center space-x-6 text-gray-300 border-l border-white/10 pl-6">
              <a
                id="header-linkedin"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-[#C5A880] transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={16} />
              </a>
              
              <div id="header-phone-box" className="flex items-center space-x-2 text-xs font-sans tracking-wider">
                <Phone size={13} className="text-[#C5A880]" />
                <a href="tel:+2348000000000" className="hover:text-white transition-colors duration-200">
                  +234 (0) 9 460 0000
                </a>
              </div>

              <div id="header-location-box" className="flex items-center space-x-1.5 text-xs font-sans tracking-wider text-gray-400">
                <MapPin size={13} className="text-[#C5A880]" />
                <span>Abuja, Nigeria</span>
              </div>
            </div>

            {/* Mobile menu button */}
            <div id="mobile-toggle-box" className="flex md:hidden">
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-[#C5A880] focus:outline-none p-1"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel Sidebar */}
      <div
        id="mobile-nav-panel"
        className={`fixed inset-0 z-40 transition-transform duration-300 transform md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Backdrop overlay */}
        <div
          id="mobile-overlay"
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Sidebar Container */}
        <div id="mobile-sidebar-container" className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-slate-950 border-l border-[#C5A880]/20 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-8 border-b border-white/5">
              <span className="font-serif text-sm tracking-widest text-[#C5A880] font-bold">
                DPCL ADVISORY
              </span>
              <button
                id="sidebar-close"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-400 hover:text-[#C5A880] focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile nav items */}
            <nav className="mt-8 flex flex-col space-y-5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left text-sm font-sans tracking-widest uppercase transition-colors py-2 font-medium ${
                    activeSection === link.id
                      ? 'text-[#C5A880] pl-2 border-l border-[#C5A880]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer Metadata */}
          <div id="mobile-sidebar-footer" className="pt-8 border-t border-white/5 text-gray-400 space-y-4">
            <div className="flex items-center space-x-3 text-xs">
              <Phone size={14} className="text-[#C5A880]" />
              <span>+234 (0) 9 460 0000</span>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <MapPin size={14} className="text-[#C5A880]" />
              <span>Abuja Office, Nigeria</span>
            </div>
            <div className="flex items-center space-x-4 pt-2">
              <a
                id="mobile-linkedin-link"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 border border-white/10 rounded-full hover:border-[#C5A880] hover:text-[#C5A880] transition-all text-gray-300"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
