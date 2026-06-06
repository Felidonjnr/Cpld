import React, { useState, useEffect, useRef } from 'react';
import { MILESTONES_DATA, MilestoneItem } from '../data';
import { Award, Briefcase, Landmark, CheckCircle } from 'lucide-react';

interface AnimatedStatProps {
  target: number;
}

function AnimatedStat({ target }: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<boolean>(false);

  useEffect(() => {
    // Reset animation state whenever target changes
    setCount(0);
    animatedRef.current = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          let startTime: number | null = null;
          const duration = 1500; // 1.5 seconds

          const animateStep = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing function (easeOutQuad)
            const easeProgress = progress * (2 - progress);
            
            setCount(Math.floor(easeProgress * target));

            if (progress < 1) {
              window.requestAnimationFrame(animateStep);
            } else {
              setCount(target);
            }
          };

          window.requestAnimationFrame(animateStep);
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return (
    <div 
      ref={elementRef}
      className="text-4xl md:text-5xl font-sans font-black text-[#0F3A6B] tracking-tight flex items-center justify-center gap-0.5"
    >
      <span>{count}</span>
      <span className="text-[#3b82f6] text-3xl font-bold">+</span>
    </div>
  );
}

export default function Milestones() {
  const stats: MilestoneItem[] = MILESTONES_DATA;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award size={20} className="text-[#0F3A6B]" />;
      case 'Briefcase': return <Briefcase size={20} className="text-[#0F3A6B]" />;
      case 'Landmark': return <Landmark size={20} className="text-[#0F3A6B]" />;
      case 'CheckCircle': return <CheckCircle size={20} className="text-[#0F3A6B]" />;
      default: return <Award size={20} className="text-[#0F3A6B]" />;
    }
  };

  return (
    <section 
      id="milestones" 
      className="bg-[#F8FAFC] py-20 px-6 sm:px-10 border-t border-b border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Full-width Accent Stats Row to Divide Page Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div 
              key={stat.id}
              className="flex flex-col items-center space-y-4 p-8 bg-white border border-slate-200/60 shadow-xs hover:shadow-xl hover:border-[#3b82f6]/40 rounded-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              
              {/* Soft Centered Icon Frame */}
              <div className="w-12 h-12 rounded-full bg-[#0F3A6B]/5 border border-[#0F3A6B]/10 flex items-center justify-center">
                {renderIcon(stat.iconName)}
              </div>

              {/* Massive Bold Animated Counter line */}
              <AnimatedStat target={stat.target} />

              {/* Bold label */}
              <p className="text-xs font-sans font-extrabold text-slate-500 uppercase tracking-widest leading-normal">
                {stat.label}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
