import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_SLIDES } from '../data';
import { HeroSlide } from '../types';

interface HeroProps {
  onLearnMore: (targetSectionId: string) => void;
}

export default function Hero({ onLearnMore }: HeroProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

  const slides: HeroSlide[] = HERO_SLIDES;

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8500); // Luxury slow auto-rotation
    return () => clearInterval(timer);
  }, [currentSlideIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentSlideIndex];

  // Abstract SVG structures that yield a "luxury consulting architecture" visual look
  const renderSlideBackgroundArt = (id: number) => {
    if (id === 1) {
      return (
        <svg 
          id="hero-bg-art-1"
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none mix-blend-color-dodge transition-all duration-1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="navy-radial" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#C5A880" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#navy-radial)" />
          {/* Elegant geometric grids for donor alignment mood */}
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="#C5A880" strokeOpacity="0.1" strokeWidth="0.5" />
          <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#C5A880" strokeOpacity="0.05" strokeWidth="0.5" />
          <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#C5A880" strokeOpacity="0.05" strokeWidth="0.5" />
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="#C5A880" strokeOpacity="0.1" strokeWidth="0.5" />
          
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#C5A880" strokeOpacity="0.08" strokeWidth="0.5" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#C5A880" strokeOpacity="0.05" strokeWidth="0.5" />
          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#C5A880" strokeOpacity="0.08" strokeWidth="0.5" />
          
          {/* Subtle concentric orbital rings */}
          <circle cx="15%" cy="30%" r="180" fill="none" stroke="#C5A880" strokeOpacity="0.08" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="15%" cy="30%" r="300" fill="none" stroke="#C5A880" strokeOpacity="0.04" strokeWidth="0.5" />
          <circle cx="85%" cy="70%" r="220" fill="none" stroke="#C5A880" strokeOpacity="0.08" strokeWidth="0.5" strokeDasharray="6 4" />
        </svg>
      );
    } else if (id === 2) {
      return (
        <svg 
          id="hero-bg-art-2"
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none mix-blend-color-dodge transition-all duration-1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="gold-radial" cx="80%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#gold-radial)" />
          {/* Clean tech-forward isometric grid lines indicating systems strengthening */}
          <path d="M-100 200 L1200 800 M-100 400 L1200 1000 M-100 0 L1200 600" stroke="#C5A880" strokeOpacity="0.07" strokeWidth="0.75" />
          <path d="M1200 200 L-100 800 M1200 400 L-100 1000 M1200 0 L-100 600" stroke="#C5A880" strokeOpacity="0.07" strokeWidth="0.75" />
          {/* Concentric node coordinates */}
          <circle cx="50%" cy="50%" r="120" fill="none" stroke="#C5A880" strokeOpacity="0.08" strokeWidth="0.5" />
          <circle cx="50%" cy="50%" r="240" fill="none" stroke="#C5A880" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="3 3"/>
        </svg>
      );
    } else {
      return (
        <svg 
          id="hero-bg-art-3"
          className="absolute inset-0 w-full h-full opacity-25 pointer-events-none mix-blend-color-dodge transition-all duration-1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* High-end minimalist line alignment */}
          <g stroke="#C5A880" strokeWidth="0.5" strokeOpacity="0.12">
            <line x1="50%" y1="0" x2="50%" y2="100%" />
            <line x1="0" y1="40%" x2="100%" y2="40%" />
            <circle cx="50%" cy="40%" r="8" fill="#C5A880" fillOpacity="0.3" stroke="none" />
            <circle cx="50%" cy="40%" r="60" fill="none" strokeDasharray="4, 4" />
            <circle cx="50%" cy="40%" r="120" fill="none" />
            <circle cx="50%" cy="40%" r="200" fill="none" strokeOpacity="0.05" />
          </g>
        </svg>
      );
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '4%' : '-4%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween", duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.6 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '4%' : '-4%',
      opacity: 0,
      transition: {
        x: { type: "tween", duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.4 }
      }
    })
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-between text-white overflow-hidden bg-slate-950 pt-16"
    >
      {/* Editorial Slide Presentation Wrapper */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.bgColor} opacity-95 transition-all duration-1000 ease-out`} />
        {renderSlideBackgroundArt(currentSlide.id)}
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[50vh]">
          
          <div className="md:col-span-10 lg:col-span-9 xl:col-span-8 flex flex-col justify-center">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentSlideIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6"
              >
                {/* Visual Category Ornament Banner */}
                <div className="inline-flex items-center space-x-2">
                  <span className="h-[1px] w-8 bg-[#C5A880]" />
                  <span className="text-[10px] sm:text-xs font-sans tracking-[0.3em] font-medium text-[#C5A880] uppercase">
                    {currentSlide.badge}
                  </span>
                </div>

                {/* Bold Headline Text - Elegant Editorial Serif */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.12] font-semibold">
                  {currentSlide.title}
                </h1>

                {/* Highly structured, descriptive Subtext */}
                <p className="text-sm sm:text-base md:text-lg text-gray-300 font-sans tracking-wide leading-relaxed max-w-2xl font-light">
                  {currentSlide.subtitle}
                </p>

                {/* Premium Actions Deck */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {/* Primary Ghost Button */}
                  <button
                    id={`hero-action-primary-${currentSlide.id}`}
                    onClick={() => onLearnMore('core-focus')}
                    className="group flex items-center gap-2.5 bg-transparent border border-[#C5A880] text-[#C5A880] hover:text-[#0F172A] hover:bg-[#C5A880] px-6 py-3 text-xs font-sans font-medium tracking-[0.2em] uppercase rounded-none transition-all duration-300 cursor-pointer"
                  >
                    <span>Analyze Core Focus</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  {/* Secondary Transparent Navigation to Contacts */}
                  <button
                    id={`hero-action-contact-${currentSlide.id}`}
                    onClick={() => onLearnMore('contact')}
                    className="group border border-white/10 hover:border-white/40 text-white px-6 py-3 text-xs font-sans font-medium tracking-[0.2em] uppercase rounded-none transition-all duration-300 cursor-pointer"
                  >
                    Partner Inquiry
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Carousel Visual Controls and Indicator Progress Dashes */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-white/10 mt-16 pt-8 gap-4">
          
          {/* Progress Indicators */}
          <div className="flex items-center space-x-4">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                id={`carousel-slide-dot-${slide.id}`}
                onClick={() => {
                  setDirection(idx > currentSlideIndex ? 1 : -1);
                  setCurrentSlideIndex(idx);
                }}
                className="flex flex-col text-left group cursor-pointer"
              >
                {/* Line dashboard */}
                <div className="h-[2px] w-12 sm:w-16 bg-white/10 relative overflow-hidden transition-all duration-300 rounded-full">
                  <div 
                    className={`absolute inset-0 bg-[#C5A880] transition-transform duration-[8500ms] ease-linear origin-left ${
                      idx === currentSlideIndex ? 'translate-x-0' : '-translate-x-full'
                    }`} 
                  />
                </div>
                <span className={`text-[10px] font-mono tracking-wider mt-2 transition-colors ${
                  idx === currentSlideIndex ? 'text-[#C5A880]' : 'text-gray-500 group-hover:text-gray-300'
                }`}>
                  0{idx + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Left / Right Arrow switches */}
          <div className="flex items-center space-x-3 self-end sm:self-auto">
            <button
              id="hero-slider-prev"
              onClick={handlePrev}
              className="p-3 border border-white/10 hover:border-[#C5A880] text-gray-400 hover:text-[#C5A880] bg-transparent transition-all rounded-none cursor-pointer hover:bg-white/5"
              aria-label="Previous Slide"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              id="hero-slider-next"
              onClick={handleNext}
              className="p-3 border border-white/10 hover:border-[#C5A880] text-gray-400 hover:text-[#C5A880] bg-transparent transition-all rounded-none cursor-pointer hover:bg-white/5"
              aria-label="Next Slide"
            >
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
