import React, { useState } from 'react';
import { CORE_FOCUS_AREAS } from '../data';
import { FocusArea } from '../types';
import { ArrowUpRight, ShieldCheck, HelpCircle, GraduationCap, Network, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CoreFocus() {
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const focusAreas: FocusArea[] = CORE_FOCUS_AREAS;

  const iconMapping: { [key: string]: React.ReactNode } = {
    "health-systems": <ShieldCheck size={24} className="text-[#C5A880]" />,
    "governance": <GraduationCap size={24} className="text-[#C5A880]" />,
    "institutional-dev": <Building2 size={24} className="text-[#C5A880]" />,
    "strategic-partnerships": <Network size={24} className="text-[#C5A880]" />
  };

  const getIcon = (id: string) => {
    return iconMapping[id] || <HelpCircle size={24} className="text-[#C5A880]" />;
  };

  const handleCardClick = (id: string) => {
    setSelectedAreaId(selectedAreaId === id ? null : id);
  };

  return (
    <section
      id="core-focus"
      className="py-24 sm:py-32 bg-white text-slate-950 border-b border-[#C5A880]/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-[#C5A880]/20 pb-12 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            {/* Tiny Badge */}
            <span className="text-[10px] font-sans tracking-[0.25em] font-semibold text-[#C5A880] uppercase">
              Operational Framework
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-slate-900 leading-tight">
              Our Core Advisory Modules
            </h2>
          </div>
          <p className="text-sm font-sans tracking-wide text-gray-500 max-w-sm font-light leading-relaxed">
            Structuring bespoke development methodologies that link sovereign ambitions with the uncompromising compliance standards of international donors.
          </p>
        </div>

        {/* 4-Column Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((area) => {
            const isSelected = selectedAreaId === area.id;
            return (
              <div
                key={area.id}
                id={`focus-card-${area.id}`}
                onClick={() => handleCardClick(area.id)}
                className={`group border cursor-pointer p-8 relative flex flex-col justify-between transition-all duration-300 rounded-none h-full min-h-[300px] ${
                  isSelected
                    ? 'bg-slate-950 text-white border-slate-950 shadow-xl scale-[1.01]'
                    : 'bg-slate-50 hover:bg-slate-950/5 border-slate-200 hover:border-[#C5A880]/40'
                }`}
              >
                {/* Thin top accent gold bar */}
                <div 
                  className={`absolute top-0 left-0 h-[2px] transition-all duration-300 ${
                    isSelected ? 'w-full bg-[#C5A880]' : 'w-0 group-hover:w-16 bg-[#C5A880]/80'
                  }`} 
                />

                {/* Top Section: Number and Icon */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl font-serif font-light ${isSelected ? 'text-[#C5A880]' : 'text-slate-300 group-hover:text-slate-400'}`}>
                      {area.number}
                    </span>
                    <div className="p-2.5 border border-[#C5A880]/20 rounded-none">
                      {getIcon(area.id)}
                    </div>
                  </div>

                  {/* Title and Short Description */}
                  <div className="space-y-3">
                    <h3 className={`text-lg font-serif font-semibold tracking-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {area.title}
                    </h3>
                    <p className={`text-xs font-sans tracking-wide leading-relaxed font-light ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>
                      {area.description}
                    </p>
                  </div>
                </div>

                {/* Action Link Banner */}
                <div className="pt-6 flex items-center justify-between border-t border-[#C5A880]/10 mt-6 text-[10px] font-sans tracking-widest uppercase font-medium">
                  <span className={isSelected ? 'text-[#C5A880]' : 'text-slate-500 group-hover:text-slate-900'}>
                    {isSelected ? 'Collapse Details' : 'Analyze Indicators'}
                  </span>
                  <ArrowUpRight 
                    size={13} 
                    className={`transition-transform duration-300 ${
                      isSelected ? 'rotate-45 text-[#C5A880]' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-slate-400 group-hover:text-slate-950'
                    }`} 
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail Reveal Panel */}
        <AnimatePresence>
          {selectedAreaId && (
            <motion.div
              id="focus-details-revealer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mt-8"
            >
              {(() => {
                const area = focusAreas.find(a => a.id === selectedAreaId);
                if (!area) return null;
                return (
                  <div className="border border-[#C5A880]/35 bg-slate-950 text-white p-8 md:p-12 relative">
                    {/* Glowing ornament shadow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#C5A880]/10 to-transparent pointer-events-none" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                      
                      {/* Left: Objectives and outcomes */}
                      <div className="space-y-6">
                        <div className="inline-flex items-center space-x-2">
                          <span className="h-[1px] w-4 bg-[#C5A880]" />
                          <h4 className="text-xs font-sans tracking-widest uppercase font-semibold text-[#C5A880]">
                            Targeted Project Indicators
                          </h4>
                        </div>
                        <ul className="space-y-4">
                          {area.outcomes.map((outcome, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-[#C5A880] mt-1.5" />
                              <span className="text-sm font-sans tracking-wide leading-relaxed text-gray-300 font-light">
                                {outcome}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Partner references */}
                      <div className="space-y-6">
                        <div className="inline-flex items-center space-x-2">
                          <span className="h-[1px] w-4 bg-[#C5A880]" />
                          <h4 className="text-xs font-sans tracking-widest uppercase font-semibold text-[#C5A880]">
                            Institutional Intersect
                          </h4>
                        </div>
                        <p className="text-xs font-sans tracking-wide leading-relaxed text-gray-400 font-light mb-4">
                          Connecting regional framework implementation directly with accredited governance channels and sovereign aid missions:
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {area.partnerNetworks.map((partner, idx) => (
                            <span 
                              key={idx}
                              className="text-[10px] font-sans tracking-wider border border-[#C5A880]/20 bg-slate-900/50 hover:bg-slate-900 hover:border-[#C5A880] text-[#C5A880] px-3 py-1.5 transition-all"
                            >
                              {partner}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
