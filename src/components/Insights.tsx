import React from 'react';
import { INSIGHTS_NEWS } from '../data';
import { InsightItem } from '../types';
import { Calendar, Clock, ArrowRight, BookOpen, Quote } from 'lucide-react';

export default function Insights() {
  const insights: InsightItem[] = INSIGHTS_NEWS;

  // Split into Featured and Secondary articles
  const featuredArticle = insights.find(item => item.id === 'kaduna-interview');
  const secondaryArticles = insights.filter(item => item.id !== 'kaduna-interview');

  return (
    <section 
      id="insights" 
      className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Accent Underline */}
        <div className="border-b border-slate-200 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left">
            <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold text-[#0F3A6B] uppercase block mb-2">
              INTELLECTUAL MEMORANDUMS & ANALYSIS
            </span>
            <h2 className="text-3xl font-serif text-slate-900 tracking-tight leading-none uppercase font-black">
              STRATEGIC INSIGHTS DECK
            </h2>
            <div className="h-[3px] w-24 bg-[#0F3A6B] mt-4 rounded-none" />
          </div>
          <p className="text-xs text-slate-500 font-sans max-w-sm leading-relaxed text-left">
            Sovereign briefing summaries and regulatory alignments published by DPCL partners for bilateral development missions.
          </p>
        </div>

        {/* Bento Grid layout with zero round radius */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
          
          {/* Left Block: Featured Administrative Article */}
          {featuredArticle && (
            <div 
              id={`insight-featured-${featuredArticle.id}`}
              className="lg:col-span-2 group border border-slate-200 p-6 sm:p-10 bg-slate-50 hover:bg-white hover:border-[#0F3A6B] transition-all duration-150 rounded-none flex flex-col justify-between"
            >
              <div className="space-y-6">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                  <span className="text-white bg-[#0F3A6B] px-2.5 py-1 rounded-none">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#0F3A6B]" />
                    <span>{featuredArticle.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-[#0F3A6B]" />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>

                {/* Big Title */}
                <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-950 uppercase tracking-tight leading-snug">
                  {featuredArticle.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-600 font-sans leading-relaxed max-w-2xl">
                  {featuredArticle.summary}
                </p>

                {/* Quote block - completely rectangular */}
                <div className="border-l-4 border-[#0F3A6B] pl-4 py-2 bg-white border border-slate-200 rounded-none relative">
                  <Quote size={20} className="absolute right-3 top-3 text-slate-100 shrink-0 pointer-events-none" />
                  <p className="text-xs font-serif italic text-slate-600 leading-relaxed max-w-xl">
                    "Reflective subnational governance architectures verify that global aid objectives manifest genuine regional improvements only when they are coupled directly text-for-text with local state insurance schemas and civic contract monitoring."
                  </p>
                  <span className="text-[9px] font-mono text-[#0F3A6B] font-bold block mt-2">
                    — CONSULTATIVE ADVISORY STATEMENT FORUM, VOL. 20
                  </span>
                </div>

              </div>

              {/* Author bar */}
              <div className="pt-6 border-t border-slate-200 mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-[11px] font-mono">
                  <span className="text-slate-400">ISSUING ADVISORY BODY: </span>
                  <span className="text-[#0F3A6B] font-bold">{featuredArticle.author.toUpperCase()}</span>
                </div>

                <button
                  onClick={() => alert(`Simulating access protocol. Direct request routed for full catalog: "${featuredArticle.title}"`)}
                  className="text-xs font-serif font-black text-[#0F3A6B] hover:text-slate-950 tracking-wider uppercase flex items-center gap-1 cursor-pointer"
                >
                  <span>REQUEST EXECUTIVE BRIEF</span>
                  <ArrowRight size={12} />
                </button>
              </div>

            </div>
          )}

          {/* Right Column: Secondary Article Stack */}
          <div className="space-y-6">
            {secondaryArticles.map((article) => (
              <div
                key={article.id}
                id={`secondary-insight-${article.id}`}
                className="group border border-slate-200 p-6 bg-slate-50 hover:bg-white hover:border-[#0F3A6B] transition-all duration-150 rounded-none flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Category Details */}
                  <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-500 uppercase">
                    <span className="text-[#0F3A6B]">
                      {article.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar size={10} />
                      {article.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm font-serif font-black text-slate-950 uppercase tracking-tight line-clamp-2">
                    {article.title}
                  </h4>

                  {/* Summary */}
                  <p className="text-xs text-slate-500 font-sans leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                </div>

                {/* Footer panel */}
                <div className="pt-4 border-t border-slate-100 mt-6 flex justify-between items-center">
                  <span className="text-[9px] font-mono text-[#0F3A6B]">
                    AUTHOR: {article.author.toUpperCase()}
                  </span>

                  <button
                    onClick={() => alert(`Review memo details logged securely under database queue: "${article.title}"`)}
                    className="p-1.5 bg-white border border-slate-200 hover:border-[#0F3A6B] text-[#0F3A6B] rounded-none cursor-pointer"
                    aria-label="Request memo copy"
                  >
                    <BookOpen size={12} />
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
