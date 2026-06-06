import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { HERO_SLIDES } from '../data';
import { HeroSlideItem } from '../data';

interface HeroProps {
  onLearnMore: (targetSectionId: string) => void;
}

export default function Hero({ onLearnMore }: HeroProps) {
  const slides: HeroSlideItem[] = HERO_SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Touch state for swipe detection
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (slides.length === 0) return;
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length),
      6500
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, slides.length]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex] || HERO_SLIDES[0];

  // Swipe gesture implementation handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section
      id="home"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center text-white overflow-hidden bg-slate-950 pt-28"
    >
      
      {/* Background Frame with Subtle Dark Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt="DPCL Corporate Context"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter saturate-[0.95] brightness-[0.7] scale-105 transition-all duration-700"
            />
            {/* Soft legible overlay screen */}
            <div className="absolute inset-0 bg-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/15" />
          </div>
        ))}

        {/* Technical fine background coordinates lines */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-6 z-10 py-16 text-center space-y-8 flex flex-col items-center">
        
        {/* Subtle sliding badge */}
        <div className="inline-flex items-center gap-2 bg-[#0F3A6B] border border-[#0F3A6B]/50 py-1.5 px-5 text-[10px] font-extrabold tracking-[0.2em] text-white uppercase select-none rounded-full shadow-lg backdrop-blur-md">
          {currentSlide.badge || "EXPERT OUTCOMES"}
        </div>

        {/* Main Heading Text with beautiful display typography */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight leading-tight uppercase font-black max-w-4xl text-white">
          {currentSlide.title}
        </h2>

        {/* Sub-heading content */}
        <p className="text-sm sm:text-base md:text-lg text-slate-200 tracking-wide leading-relaxed max-w-2xl mx-auto font-light">
          {currentSlide.subtitle}
        </p>

        {/* Prominent MORE Action Button */}
        <div className="pt-4">
          <button
            onClick={() => onLearnMore('core-areas')}
            className="bg-white text-[#0F3A6B] hover:bg-[#3b82f6] hover:text-white active:scale-95 text-xs sm:text-sm font-sans font-black tracking-widest uppercase rounded-full px-10 py-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5"
          >
            <span>MORE</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Bottom Navigation Dots for direct slide mapping */}
        <div className="pt-12 flex items-center justify-center gap-3 relative z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="group p-2 focus:outline-none cursor-pointer"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div
                className={`h-2 transition-all duration-300 rounded-full ${
                  idx === currentIndex 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/40 group-hover:bg-white/70'
                }`}
              />
            </button>
          ))}
        </div>

      </div>

      {/* Manual Left/Right control arrows for desktop layout accessibility */}
      <button
        onClick={handlePrev}
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 hover:border-white/30 transition-all cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={handleNext}
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 hover:border-white/30 transition-all cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

    </section>
  );
}
