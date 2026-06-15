import React, { useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  role: string;
  institution: string;
  rating: number;
  tag: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    quote: "Development Plus Health Consult (DPCL) delivered an outstanding diagnostic analysis for our health coverage and public financial modules. Their expertise in state health insurance schemes and strict SFTAS compliance audits is unparalleled in sub-Saharan Africa. They are top-tier strategic partners.",
    author: "Dr. Aliyu Ibrahim",
    role: "Senior Consultant & Institutional Advisor",
    institution: "Federal Secretariat Health Systems Advisory",
    rating: 5,
    tag: "HEALTH SYSTEMS"
  },
  {
    id: 2,
    quote: "Working with DPCL during the Results for Development (R4D) collaboration in Kaduna State was exceptional. Their technical lead demonstrated exceptional capability in designing sustainable demand-side financing architectures, monitoring frameworks, and training materials that have significantly boosted state-wide contributory health schemes.",
    author: "Pharm. Amina Bello",
    role: "Director of Programs & Strategy",
    institution: "State Contributory Health Management Authority",
    rating: 5,
    tag: "DEMAND SIDE FINANCING"
  },
  {
    id: 3,
    quote: "The organizational capacity assessment (OCAT) and subsequent communications training delivered by DPCL was a complete game-changer for our team. The clarity, rigor, and technical expertise shown by Dr. Adamu Maikano and the team have strengthened our operational transparency immensely.",
    author: "Mallam Yusuf Audu",
    role: "External Relations Lead",
    institution: "GoHealth Gombe Communications Board",
    rating: 5,
    tag: "CAPACITY BUILDING"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section 
      id="testimonials" 
      className="bg-[#0B2340] text-white py-24 px-6 sm:px-10 relative overflow-hidden border-t border-b border-blue-950"
    >
      {/* Premium Decorative Lighting effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-[#3b82f6] tracking-[0.25em] font-extrabold mb-3 uppercase">
            <Award size={12} className="text-[#3b82f6] animate-pulse" />
            <span>GLOBAL CREDIBILITY & TRUST</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans tracking-tight text-white leading-none uppercase font-black">
            PARTNER TESTIMONIALS
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#3b82f6] to-purple-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-300 text-xs sm:text-sm font-sans font-medium mt-4 leading-relaxed max-w-lg mx-auto">
            See how our strategic advisories, implementation training workshops, and governance audits empower public health and financial structures globally.
          </p>
        </div>

        {/* Carousel Visualizer */}
        <div className="relative max-w-4xl mx-auto">
          
          <div className="bg-[#112D52] border border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl relative min-h-[320px] flex flex-col justify-between transition-all duration-500">
            
            {/* Top Quote Icon Accent */}
            <div className="absolute top-6 left-6 text-blue-500/20 select-none pointer-events-none">
              <Quote size={80} className="stroke-[1.5]" />
            </div>

            <div className="relative z-10 space-y-6">
              
              {/* Star rating & Tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#3b82f6] text-[#3b82f6]" />
                  ))}
                </div>
                <span className="text-[9px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[#3b82f6]">
                  {TESTIMONIALS[activeIndex].tag}
                </span>
              </div>

              {/* Main Testimonial text */}
              <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed italic font-medium text-left">
                "{TESTIMONIALS[activeIndex].quote}"
              </p>

            </div>

            {/* Author details in footer */}
            <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left relative z-10">
              <div>
                <h4 className="text-sm font-sans font-extrabold tracking-tight text-white uppercase">
                  {TESTIMONIALS[activeIndex].author}
                </h4>
                <p className="text-[11px] font-mono font-bold text-slate-400 uppercase mt-0.5">
                  {TESTIMONIALS[activeIndex].role}
                </p>
                <p className="text-[10px] font-sans font-semibold text-[#3b82f6] mt-0.5 uppercase">
                  {TESTIMONIALS[activeIndex].institution}
                </p>
              </div>

              {/* Slider Toggles */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrev}
                  className="p-2 sm:p-3 bg-white/5 hover:bg-white/10 active:scale-95 text-slate-300 hover:text-white rounded-full border border-white/10 transition-all cursor-pointer"
                  title="Previous testimonial"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-mono font-bold text-slate-400 select-none px-1">
                  {activeIndex + 1} / {TESTIMONIALS.length}
                </span>
                <button 
                  onClick={handleNext}
                  className="p-2 sm:p-3 bg-white/5 hover:bg-white/10 active:scale-95 text-slate-300 hover:text-white rounded-full border border-white/10 transition-all cursor-pointer"
                  title="Next testimonial"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-6 bg-[#3b82f6]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
