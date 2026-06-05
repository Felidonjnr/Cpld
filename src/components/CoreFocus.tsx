import React from 'react';
import { CORE_FOCUS_AREAS } from '../data';
import { FocusArea } from '../types';
import { ShieldCheck, Scale, Landmark, Award, HelpCircle, ArrowRight, CheckSquare } from 'lucide-react';

interface CoreFocusProps {
  onSelectTrack?: (trackName: string) => void;
}

export default function CoreFocus({ onSelectTrack = () => {} }: CoreFocusProps) {
  const focusAreas: FocusArea[] = CORE_FOCUS_AREAS;

  const iconMapping: { [key: string]: React.ReactNode } = {
    "health-systems": <ShieldCheck size={28} className="text-[#0F3A6B]" />,
    "governance": <Scale size={28} className="text-[#0F3A6B]" />,
    "institutional-dev": <Landmark size={28} className="text-[#0F3A6B]" />,
    "strategic-partnerships": <Award size={28} className="text-[#0F3A6B]" />
  };

  const getIcon = (id: string) => {
    return iconMapping[id] || <HelpCircle size={28} className="text-[#0F3A6B]" />;
  };

  return (
    <section 
      id="core-focus" 
      className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with style token underline accent */}
        <div className="border-b border-slate-200 pb-8 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl text-left">
            <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold text-[#0F3A6B] uppercase block mb-2">
              EXECUTIVE REGULATORY DOMAINS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 tracking-tight leading-none uppercase font-black">
              CORE ADVISORY OPERATIONS
            </h2>
            {/* Short, thick accent line beneath heading */}
            <div className="h-[3px] w-24 bg-[#0F3A6B] mt-4 rounded-none" />
          </div>
          <p className="text-xs text-slate-500 font-sans max-w-sm leading-relaxed text-left">
            Bespoke programmatic tracks engineered to bridge public-private governance gaps and coordinate multi-lateral sovereign funding schemes.
          </p>
        </div>

        {/* Vertical Structured List Panels as requested */}
        <div id="vertical-advisory-panels" className="space-y-6">
          {focusAreas.map((area) => (
            <div
              key={area.id}
              id={`advisory-item-${area.id}`}
              className="bg-slate-50 border border-slate-200 p-6 sm:p-8 hover:bg-slate-100/50 hover:border-[#0F3A6B]/60 transition-all duration-150 rounded-none flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-left"
            >
              
              {/* Left Segment: Identifier stamp & minimalist icon */}
              <div className="flex items-center gap-5 shrink-0">
                <span className="font-mono text-3xl font-extrabold text-slate-300">
                  {area.number}
                </span>
                <div className="w-14 h-14 bg-white border border-slate-200/80 rounded-none flex items-center justify-center shadow-xs">
                  {getIcon(area.id)}
                </div>
              </div>

              {/* Central Segment: Title, Description & Horizontal subcategories with line-art icons */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-serif font-black text-[#0F3A6B] uppercase tracking-tight">
                    {area.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-1">
                    {area.description}
                  </p>
                </div>

                {/* Subcategories aligned horizontally alongside minimalist line icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-200/60">
                  {area.outcomes.map((outcome, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-2.5"
                    >
                      <CheckSquare size={14} className="text-[#0F3A6B] shrink-0 mt-0.5" />
                      <span className="text-[11px] text-slate-700 font-sans font-medium leading-tight">
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Horizontal badge line representing the bilateral alliances */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[9px] font-mono text-slate-400">PARTNERS:</span>
                  {area.partnerNetworks.map((partner, idx) => (
                    <span 
                      key={idx}
                      className="text-[9px] font-sans font-bold tracking-tight text-[#0F3A6B] uppercase"
                    >
                      {partner} {idx < area.partnerNetworks.length - 1 ? '•' : ''}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Segment: Flat, completely square dark navy block button "Know More" */}
              <div className="shrink-0">
                <button
                  id={`read-more-${area.id}`}
                  onClick={() => onSelectTrack(area.title)}
                  className="w-full lg:w-auto bg-[#0F3A6B] hover:bg-[#0B2C52] text-white font-serif font-black tracking-widest text-xs uppercase rounded-none py-3 px-6 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>KNOW MORE</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
