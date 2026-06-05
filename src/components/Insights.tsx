import React from 'react';
import { INSIGHTS_NEWS } from '../data';
import { InsightItem } from '../types';
import { Calendar, Clock, ArrowUpRight, Award, Newspaper } from 'lucide-react';

export default function Insights() {
  const insights: InsightItem[] = INSIGHTS_NEWS;

  // Split into Featured and Secondary articles
  const featuredArticle = insights.find(item => item.id === 'kaduna-interview');
  const secondaryArticles = insights.filter(item => item.id !== 'kaduna-interview');

  return (
    <section
      id="insights"
      className="py-24 sm:py-32 bg-white text-slate-950 border-b border-[#C5A880]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-[#C5A880]/20 pb-12 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <span className="text-[10px] font-sans tracking-[0.25em] font-semibold text-[#C5A880] uppercase">
              Corporate Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-slate-900 leading-tight">
              Insights & Strategic Engagements
            </h2>
          </div>
          <p className="text-sm font-sans tracking-wide text-gray-500 max-w-sm font-light leading-relaxed">
            Direct briefings, auditing guides, and local administrative updates penned by our senior consultants on subnational development models.
          </p>
        </div>

        {/* Bento-Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Featured Article spanning 2 equal grid blocks in wide-width */}
          {featuredArticle && (
            <div 
              id={`insight-featured-${featuredArticle.id}`}
              className="lg:col-span-2 group border border-slate-200 hover:border-[#C5A880]/60 p-8 md:p-12 bg-slate-50 relative flex flex-col justify-between transition-all duration-300 h-full min-h-[460px]"
            >
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#C5A880]/15 to-transparent pointer-events-none" />
              
              <div className="space-y-6">
                {/* Meta Headings */}
                <div className="flex flex-wrap items-center gap-4 text-[10px] font-sans tracking-wider text-gray-500 uppercase">
                  <span className="text-[#C5A880] font-bold border border-[#C5A880]/30 px-2.5 py-1 bg-white">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-[#C5A880]" />
                    <span>{featuredArticle.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-[#C5A880]" />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>

                {/* Big Title */}
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 tracking-tight leading-snug group-hover:text-slate-800 transition-colors">
                  {featuredArticle.title}
                </h3>

                {/* Summary */}
                <p className="text-sm font-sans tracking-wide text-gray-600 font-light leading-relaxed max-w-2xl">
                  {featuredArticle.summary}
                </p>

                {/* Executive interview meta-quote block */}
                <div className="border-l-2 border-[#C5A880] pl-4 py-1 bg-white/40 my-4">
                  <span className="text-xs font-serif italic text-gray-500 block leading-relaxed">
                    "Sustainable reform belongs to local ownership; international funds achieve their strategic objectives only when aligned with subnational executive structures and grassroot monitoring covenants."
                  </span>
                  <span className="text-[10px] font-sans font-bold uppercase text-[#C5A880] block mt-2 tracking-widest">
                    — CONSULTANCY POLICY BRIEF, VOL. 14
                  </span>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="pt-8 border-t border-slate-200 mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-xs">
                  <span className="text-gray-400 font-light">Author: </span>
                  <span className="text-slate-900 font-medium">{featuredArticle.author}</span>
                </div>
                
                <button 
                  id={`btn-read-${featuredArticle.id}`}
                  className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase font-bold text-[#C5A880] group-hover:text-slate-950 transition-colors cursor-pointer"
                >
                  <span>Request Full Executive Brief</span>
                  <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                </button>
              </div>

            </div>
          )}

          {/* Right Column: List of Secondary Articles stacked vertically */}
          <div className="flex flex-col gap-6">
            {secondaryArticles.map((article) => (
              <div
                key={article.id}
                id={`insight-card-${article.id}`}
                className="group border border-slate-200 hover:border-[#C5A880]/50 p-6 md:p-8 bg-white relative flex flex-col justify-between transition-all duration-300 flex-grow"
              >
                <div className="space-y-4">
                  {/* Meta tags */}
                  <div className="flex flex-wrap items-center gap-3 text-[9px] font-sans tracking-wider text-gray-400 uppercase">
                    <span className="text-[#C5A880] font-bold">
                      {article.category}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-[#C5A880]/40" />
                    <div className="flex items-center gap-0.5">
                      <Calendar size={11} />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-serif font-bold text-slate-900 leading-snug group-hover:text-[#C5A880] transition-colors">
                    {article.title}
                  </h4>

                  {/* Summary limit briefing */}
                  <p className="text-xs font-sans tracking-wide text-gray-500 font-light leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {/* Footer Section */}
                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider text-gray-400 uppercase font-medium">
                    {article.engagement} (0{article.readTime[0]}m)
                  </span>
                  
                  <button 
                    id={`sub-btn-read-${article.id}`}
                    className="p-1 border border-transparent group-hover:border-[#C5A880]/20 text-[#C5A880] group-hover:bg-slate-50 transition-all rounded-none cursor-pointer"
                    aria-label="Read complete memo"
                  >
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
