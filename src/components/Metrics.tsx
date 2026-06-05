import React from 'react';
import { GENERAL_METRICS } from '../data';
import { MetricItem } from '../types';
import { Award, Briefcase, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Metrics() {
  const metrics: MetricItem[] = GENERAL_METRICS;

  const iconMapping: { [key: string]: React.ReactNode } = {
    "interventions": <Briefcase size={20} className="text-[#C5A880]" />,
    "projects": <Award size={20} className="text-[#C5A880]" />,
    "accountability": <CheckCircle2 size={20} className="text-[#C5A880]" />
  };

  const getIcon = (id: string) => {
    return iconMapping[id] || <Award size={20} className="text-[#C5A880]" />;
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15
      }
    }
  };

  return (
    <section
      id="metrics"
      className="relative bg-slate-950 text-white py-16 sm:py-24 overflow-hidden border-b border-[#C5A880]/10"
    >
      {/* Background glowing textures */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C5A880]/5 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-slate-900/40 rounded-full filter blur-[100px] pointer-events-none" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Horizontal structure container */}
        <motion.div
          id="metrics-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-12"
        >
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.id}
              id={`metric-item-${metric.id}`}
              variants={itemVariants}
              className={`flex flex-col space-y-4 md:px-6 lg:px-8 ${
                idx > 0 ? 'md:border-l md:border-[#C5A880]/15' : ''
              }`}
            >
              {/* Statistic representation */}
              <div className="flex items-center space-x-3.5">
                <div className="p-2 border border-[#C5A880]/15 bg-slate-900">
                  {getIcon(metric.id)}
                </div>
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#C5A880] uppercase font-bold">
                  {metric.label}
                </span>
              </div>

              {/* Large counter number ticker style layout */}
              <div className="space-y-2">
                <h3 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-serif tracking-tight font-bold text-white bg-clip-text">
                  {metric.value}
                </h3>
                <p className="text-xs font-sans tracking-wide leading-relaxed text-gray-400 font-light max-w-sm">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Accountability pledge divider */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-gray-500 text-[10px] font-sans tracking-[0.15em] uppercase">
          <span>ABUJA COOPERATIVE REGISTER • INITIATIVE ACCREDITATION</span>
          <span className="text-[#C5A880] font-semibold">VERIFIED DONOR LEVEL STATUS</span>
        </div>

      </div>
    </section>
  );
}
