import React from 'react';
import { GENERAL_METRICS } from '../data';
import { MetricItem } from '../types';
import { Briefcase, Award, CheckCircle2, ShieldCheck, Database, Landmark } from 'lucide-react';

export default function Metrics() {
  const metrics: MetricItem[] = GENERAL_METRICS;

  const iconMapping: { [key: string]: React.ReactNode } = {
    "interventions": <Briefcase size={28} className="text-[#0F3A6B]" />,
    "projects": <Award size={28} className="text-[#0F3A6B]" />,
    "accountability": <CheckCircle2 size={28} className="text-[#0F3A6B]" />
  };

  const getIcon = (id: string) => {
    return iconMapping[id] || <Award size={28} className="text-[#0F3A6B]" />;
  };

  return (
    <section 
      id="metrics" 
      className="bg-[#F8FAFC] py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading with accent underline */}
        <div className="text-center md:text-left mb-16">
          <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold text-[#0F3A6B] uppercase block mb-2">
            MEASURABLE DELIVERABLES & ACCOUNTABILITY
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 tracking-tight leading-none uppercase font-black">
            SOVEREIGN REGIONAL IMPACT PORTFOLIO
          </h2>
          {/* 3px thick font accent line as specified in style tokens */}
          <div className="h-[3px] w-24 bg-[#0F3A6B] mt-4 mx-auto md:mx-0 rounded-none" />
          <p className="text-xs text-slate-500 font-sans mt-3 max-w-2xl leading-relaxed">
            Our interventions are measured by audit readiness, subnational health insurance coverage, and direct compliance benchmarks with global development institutions.
          </p>
        </div>

        {/* Multi-column grid containing circular badges */}
        <div 
          id="metrics-badges-grid"
          className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left"
        >
          {metrics.map((metric) => (
            <div 
              key={metric.id}
              id={`metric-column-${metric.id}`}
              className="flex flex-col items-center md:items-start space-y-5"
            >
              
              {/* Crisp white circular container with soft outer shadow */}
              <div 
                id={`circle-badge-${metric.id}`}
                className="w-20 h-20 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-150 flex items-center justify-center border border-slate-100"
              >
                {getIcon(metric.id)}
              </div>

              {/* Data metric directly below the circle in massive black typography */}
              <div className="space-y-1 w-full">
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                  <span className="text-4xl sm:text-5xl font-serif font-black text-slate-950 tracking-tighter">
                    {metric.value}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#0F3A6B] bg-slate-200/60 px-1.5 py-0.5 rounded-none">
                    {metric.scopeLabel}
                  </span>
                </div>

                {/* Highly legible uppercase title label and muted description */}
                <h4 className="text-sm font-serif font-black tracking-wide text-slate-900 uppercase">
                  {metric.label}
                </h4>
                
                <p className="text-xs text-slate-500 font-sans leading-relaxed max-w-sm">
                  {metric.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic lower bar matching print specifications */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-400 text-[10px] font-mono uppercase">
          <span>COOPERATIVE ACCREDITATION NO: DPCL-7193-GF</span>
          <span>FEDERAL INVENTORY OF STRATEGIC ADVISORY BLUEPRINTS</span>
        </div>

      </div>
    </section>
  );
}
