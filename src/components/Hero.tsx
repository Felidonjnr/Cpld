import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Landmark, FileText, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data';
import { HeroSlide } from '../types';

interface HeroProps {
  onLearnMore: (targetSectionId: string) => void;
}

export default function Hero({ onLearnMore }: HeroProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides: HeroSlide[] = HERO_SLIDES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // High contrast background placeholders that represent premium pan-African field work & institutional operations
  const backgroundImages = [
    "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=1600", // Institutional infrastructure (African regional trade / development)
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1600", // African business specialists coordinating policy
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600"  // Multi-sector meeting guidelines workspace
  ];

  const currentSlide = slides[currentSlideIndex];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-start text-white overflow-hidden bg-slate-950 pt-20"
    >
      {/* 1. Full-Bleed Photographic Frame with Dark Tint Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImages[currentSlideIndex]} 
          alt="Institutional Field Work" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-all duration-1000 scale-105 filter saturate-[0.85] brightness-[0.35]" 
        />
        {/* Additional clean deep gradient tint overlay for extreme high contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-slate-950/75 to-transparent" />
        
        {/* Abstract administrative technical grids overlay for structural feeling */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 py-16 md:py-24">
        <div className="max-w-3xl space-y-6 text-left">
          
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 bg-[#0F3A6B]/90 border border-[#0F3A6B] py-1.5 px-3.5 rounded-none">
            <Landmark size={12} className="text-white shrink-0" />
            <span className="text-[10px] font-sans tracking-[0.2em] font-extrabold text-white uppercase leading-none">
              {currentSlide.badge || "SOVEREIGN DEVELOPMENT"}
            </span>
          </div>

          {/* Commanding Left-aligned Headline with Strict Geometric Weight */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1] font-black uppercase">
            {currentSlide.title}
          </h1>

          {/* Descriptive Subtitle Text */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200 tracking-wide leading-relaxed font-sans max-w-2xl font-normal">
            {currentSlide.subtitle}
          </p>

          {/* Primary & Secondary Action Button Deck */}
          <div className="flex flex-wrap gap-4 pt-6">
            
            {/* Pure white ghost button with completely square corners */}
            <button
              onClick={() => onLearnMore('core-focus')}
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-950 px-8 py-3.5 text-xs font-serif font-black tracking-wider uppercase rounded-none transition-all duration-150 cursor-pointer"
            >
              EXECUTIVE PORTFOLIO BRIEF
            </button>

            {/* Solid corporate-blue block button for quick alignment simulation */}
            <button
              onClick={() => onLearnMore('contact')}
              className="bg-[#0F3A6B] hover:bg-[#0B2C52] text-white border-2 border-[#0F3A6B] px-8 py-3.5 text-xs font-serif font-black tracking-wider uppercase rounded-none transition-all duration-150 cursor-pointer flex items-center gap-1.5"
            >
              <span>RUN PRIORITIES AUDIT</span>
            </button>
          </div>

        </div>

        {/* Slideshow Controls Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className="flex items-center gap-2 cursor-pointer font-sans"
              >
                <div className={`h-1.5 transition-all duration-300 rounded-none ${
                    idx === currentSlideIndex ? 'w-12 bg-[#0F3A6B]' : 'w-4 bg-white/20'
                  }`} 
                />
                <span className={`text-[10px] font-mono font-bold ${
                  idx === currentSlideIndex ? 'text-white' : 'text-slate-400'
                }`}>
                  0{idx + 1}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              className="p-3 border border-white/20 hover:border-white text-white bg-transparent hover:bg-white/5 transition-all rounded-none cursor-pointer"
              aria-label="Previous Slide"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 border border-white/20 hover:border-white text-white bg-transparent hover:bg-white/5 transition-all rounded-none cursor-pointer"
              aria-label="Next Slide"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
