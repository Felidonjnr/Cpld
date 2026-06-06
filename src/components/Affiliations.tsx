import React, { useState, useEffect, useRef } from 'react';
import { Landmark, Activity, Pill, HeartPulse, Globe, ShieldCheck } from 'lucide-react';
import { AFFILIATIONS_DATA } from '../data';

interface AffiliationItem {
  id: string;
  fullName: string;
  initials: string;
  iconName: string;
  color: string;
}

export default function Affiliations() {
  const affs: AffiliationItem[] = AFFILIATIONS_DATA;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Track if user clicked/interacted to prolong next slide advancement
  const hasInteractedRef = useRef(false);

  // Auto-play timer effect
  useEffect(() => {
    if (isHovered || affs.length === 0) return;

    // Use a custom pacing: 4.5 seconds normally, 6 seconds if they recently manually clicked a dot
    const intervalTime = hasInteractedRef.current ? 6000 : 4500;

    const timer = setInterval(() => {
      // Clear manual delay flag upon next automatic tick
      hasInteractedRef.current = false;
      
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % affs.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentIndex, isHovered, affs.length]);

  // Transition clean up effect: reset prevIndex once the animation completes (650ms)
  useEffect(() => {
    if (prevIndex !== null) {
      const animTimer = setTimeout(() => {
        setPrevIndex(null);
      }, 650);
      return () => clearTimeout(animTimer);
    }
  }, [prevIndex]);

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    hasInteractedRef.current = true;
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
  };

  const renderIcon = (iconName: string, color: string) => {
    const norm = (iconName || '').toLowerCase().trim();
    // Dynamically retrieve lucide icon component or default to Globe
    let IconComp = Globe;
    if (norm === 'activity') IconComp = Activity;
    else if (norm === 'pill') IconComp = Pill;
    else if (norm === 'heartpulse' || norm === 'heart-pulse') IconComp = HeartPulse;
    else if (norm === 'globe') IconComp = Globe;
    else if (norm === 'shieldcheck' || norm === 'shield-check') IconComp = ShieldCheck;
    else if (norm === 'landmark') IconComp = Landmark;
    
    return <IconComp size={36} className="stroke-[1.5]" style={{ color }} />;
  };

  if (affs.length === 0) return null;

  const currentAff = affs[currentIndex] || affs[0];
  const prevAff = prevIndex !== null ? (affs[prevIndex] || affs[0]) : null;

  return (
    <section 
      id="affiliations" 
      className="bg-[#091E3A] py-16 px-4 w-full relative overflow-hidden select-none border-t border-[#091E3A] border-b border-slate-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Low-opacity layered vector watermark icon pattern in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
        <Landmark className="absolute top-8 left-[10%] w-36 h-36 text-slate-100 rotate-12" />
        <Activity className="absolute bottom-8 right-[10%] w-44 h-44 text-slate-100 -rotate-12 animate-pulse" />
        <Globe className="absolute top-12 right-[25%] w-24 h-24 text-slate-100 rotate-45" />
        <HeartPulse className="absolute bottom-12 left-[25%] w-32 h-32 text-slate-100 -rotate-45" />
        <ShieldCheck className="absolute top-1/2 left-[5%] w-28 h-28 text-slate-100 rotate-[35deg] -translate-y-1/2" />
        <Pill className="absolute top-1/3 right-[5%] w-28 h-28 text-slate-100 -rotate-12" />
      </div>

      {/* Decorative ambient gradients for cosmic depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3b82f6]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* 2. Section Header: flanked by perfectly straight thin horizontal rules */}
        <div className="flex items-center justify-center gap-6 mb-12 w-full">
          <div className="h-[1px] bg-slate-700/50 flex-grow" />
          <h3 className="text-[10px] sm:text-xs font-sans font-black tracking-[0.3em] text-[#3b82f6] uppercase whitespace-nowrap">
            PROFESSIONAL AFFILIATIONS
          </h3>
          <div className="h-[1px] bg-slate-700/50 flex-grow" />
        </div>

        {/* 3. Center Stage Logo Show Portal */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-slate-700/40 bg-[#071931]/95 flex items-center justify-center shadow-2xl overflow-hidden mx-auto">
          
          {/* Active kinetic rotating external dashed aura rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#3b82f6]/15 animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-dashed border-[#10b981]/10 animate-[spin_30s_linear_infinite_reverse]" />
          
          {/* Glossy highlight layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none rounded-full" />

          {/* Exiting portal view */}
          {prevIndex !== null && prevAff && (
            <div className="absolute inset-0 flex flex-col items-center justify-center animate-portal-exit pb-2">
              <div className="p-3.5 bg-[#091E3A]/40 rounded-full border border-slate-800 shadow-sm mb-2 text-white/90">
                {renderIcon(prevAff.iconName, prevAff.color)}
              </div>
              <span className="text-[11px] font-mono font-black tracking-widest text-[#3b82f6]">
                {prevAff.initials}
              </span>
            </div>
          )}

          {/* Active entering portal view */}
          <div 
            key={currentIndex} 
            className={`absolute inset-0 flex flex-col items-center justify-center pb-2 ${prevIndex !== null ? 'animate-portal-enter' : ''}`}
          >
            <div className="p-3.5 bg-[#091E3A]/40 rounded-full border border-slate-800 shadow-sm mb-2 text-white/95 hover:scale-105 transition-transform duration-300">
              {renderIcon(currentAff.iconName, currentAff.color)}
            </div>
            <span className="text-[11px] font-mono font-black tracking-widest text-[#3b82f6]">
              {currentAff.initials}
            </span>
          </div>

        </div>

        {/* 4. Masked Title baseline representation block */}
        <div className="relative h-16 sm:h-14 overflow-hidden flex items-center justify-center mt-8 px-6 select-text">
          
          {/* Exiting slide-up text representation */}
          {prevIndex !== null && prevAff && (
            <div className="absolute inset-0 flex items-center justify-center animate-mask-text-exit">
              <h4 className="font-serif font-black text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl tracking-normal leading-snug uppercase">
                {prevAff.fullName}
              </h4>
            </div>
          )}

          {/* Active entering slide-up text representation */}
          <div 
            key={currentIndex + "-text"}
            className={`absolute inset-0 flex items-center justify-center ${prevIndex !== null ? 'animate-mask-text-enter' : ''}`}
          >
            <h4 className="font-serif font-black text-xs sm:text-sm md:text-base text-white max-w-2xl tracking-normal leading-snug uppercase">
              {currentAff.fullName}
            </h4>
          </div>

        </div>

        {/* 5. Liquid Dot Carousel Navigation */}
        <div className="flex justify-center items-center gap-3.5 mt-8">
          {affs.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleDotClick(idx)}
                className={`h-2.5 rounded-full transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer focus:outline-none ${
                  isActive 
                    ? 'w-9 bg-[#3b82f6] shadow-md shadow-[#3b82f6]/40' 
                    : 'w-2.5 bg-slate-700 hover:bg-slate-500 hover:scale-125'
                }`}
                aria-label={`Show slide affiliation ${idx + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
