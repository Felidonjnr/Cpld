import React, { useState } from 'react';
import { BLOGS_DATA, BlogItem } from '../data';
import { Calendar, ArrowRight, X, Clock } from 'lucide-react';

export default function BlogEvents() {
  const blogs: BlogItem[] = BLOGS_DATA;
  const [selectedPost, setSelectedPost] = useState<BlogItem | null>(null);

  return (
    <section 
      id="blog-events" 
      className="bg-white py-20 px-6 sm:px-10 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[10px] font-mono tracking-[0.25em] font-extrabold text-[#0F3A6B] uppercase mb-2">
            INTELLIGENCE MEMORANDUMS
          </p>
          <h2 className="text-3xl sm:text-4xl font-sans tracking-tight text-slate-800 leading-none uppercase font-black">
            BLOG & EVENTS
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#0F3A6B] to-[#3b82f6] mx-auto mt-4 rounded-full" />
        </div>

        {/* 3-Card Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <div 
              key={post.id}
              className="group flex flex-col justify-between bg-slate-50 border border-slate-200/80 hover:border-[#3b82f6] transition-all duration-300 p-5 text-left h-full rounded-2xl shadow-xs hover:shadow-xl transform hover:-translate-y-1.5"
            >
              <div className="space-y-4">
                
                {/* Sharp Image Container with nice curve */}
                <div className="w-full h-48 overflow-hidden bg-slate-200 relative select-none rounded-xl shadow-xs">
                  <img 
                    src={post.imageUrl || "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80"} 
                    alt={post.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 saturate-[0.85] brightness-[0.85]"
                  />
                  <div className="absolute top-3 left-3 bg-[#0F3A6B] text-white text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                    {post.category}
                  </div>
                </div>

                {/* Precise Date Stamp */}
                <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
                  <Calendar size={11} className="text-[#3b82f6]" />
                  <span>{post.date}</span>
                </div>

                {/* Explicit Headline Title */}
                <h3 className="text-base font-sans font-black tracking-tight text-slate-950 uppercase leading-snug group-hover:text-[#0F3A6B] transition-colors">
                  {post.title}
                </h3>

                {/* Sleek Descriptive Context Placeholder */}
                <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-4">
                  {post.text}
                </p>

              </div>

              {/* Sleek "Read More" link */}
              <div className="pt-5 mt-6 border-t border-slate-200/50 flex justify-end">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-xs font-sans font-bold uppercase tracking-wider text-[#0F3A6B] hover:text-[#3b82f6] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* MODAL WINDOW FOR PUBLICATION DISCLOSURE */}
      {selectedPost && (
        <div id="blog-reader-backdrop" className="fixed inset-0 bg-slate-950/75 flex items-center justify-center p-4 z-50 backdrop-blur-xs select-text">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header Image */}
            <div className="relative h-60 w-full overflow-hidden shrink-0 select-none bg-slate-100">
              <img 
                src={selectedPost.imageUrl || "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80"}
                alt={selectedPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent flex flex-col justify-end p-6">
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#3b82f6] uppercase mb-2">
                  {selectedPost.category}
                </span>
                <h4 className="text-lg md:text-xl font-sans font-black text-white uppercase leading-snug">
                  {selectedPost.title}
                </h4>
              </div>
              
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-slate-900 text-white p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Reading Content Area */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-left flex-1 scrollbar-thin">
              <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-[#3b82f6]" />
                  <span>PUBLISHED: {selectedPost.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-[#3b82f6]" />
                  <span>READING TIME: 4 MIN</span>
                </div>
              </div>

              <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-serif whitespace-pre-line">
                {selectedPost.text}
                
                {/* Simulated extensive paragraphs to feel high fidelity and represent true intelligence memorandums */}
                <p className="mt-4 pt-4 border-t border-slate-100 text-xs italic text-slate-500 font-sans font-normal">
                  This document serves as an analytical brief distributed by Development Consult Plus Limited (DPCL). Our senior partners advise public agencies, ministries, and civil society taskforces with capacity development, policy modeling, and fiscal management frameworks. For collaboration or formal project consultations, reach out via our contact gateway.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
