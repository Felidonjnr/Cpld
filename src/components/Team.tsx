import React, { useState } from 'react';
import { LEADERSHIP_TEAM } from '../data';
import { TeamMember } from '../types';
import { Mail, ArrowRight, ShieldCheck, Award, FileText } from 'lucide-react';

interface TeamProps {
  onContactPartner: (partnerName: string) => void;
}

export default function Team({ onContactPartner }: TeamProps) {
  const team: TeamMember[] = LEADERSHIP_TEAM;

  return (
    <section 
      id="team" 
      className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Underline Accent */}
        <div className="border-b border-slate-200 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left">
            <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold text-[#0F3A6B] uppercase block mb-2">
              EXECUTIVE BOARD OF PRINCIPALS
            </span>
            <h2 className="text-3xl font-serif text-slate-900 tracking-tight leading-none uppercase font-black">
              THE SENIOR PARTNERSHIP
            </h2>
            <div className="h-[3px] w-24 bg-[#0F3A6B] mt-4 rounded-none" />
          </div>
          <p className="text-xs text-slate-500 font-sans max-w-sm leading-relaxed text-left">
            Led by accredited subnational health specialists and program auditors with over 35 years of cumulative sovereign advisory experience.
          </p>
        </div>

        {/* 2-Column Responsive Layout Grid for Senior Leaders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {team.map((member) => (
            <div
              key={member.id}
              id={`team-card-${member.id}`}
              className="flex flex-col sm:flex-row gap-8 bg-slate-50 border border-slate-200 p-6 sm:p-8 hover:border-[#0F3A6B] hover:bg-white transition-all duration-150 rounded-none shadow-xs text-left"
            >
              
              {/* Square Portrait Placeholder Frame - Absolute Sharpness */}
              <div 
                id={`portrait-frame-${member.id}`}
                className="w-full sm:w-44 h-56 flex-shrink-0 relative bg-slate-900 flex flex-col items-center justify-between p-4 border border-slate-200 rounded-none"
              >
                {/* Thin inner geometric line */}
                <div className="absolute inset-2 border border-white/5 pointer-events-none" />

                <span className="text-[8px] font-mono tracking-widest uppercase text-slate-400 font-bold z-10">
                  DPCL FELLOW
                </span>

                {/* Big Initials Logo center */}
                <div className="text-3xl font-serif tracking-widest text-[#0F3A6B] bg-white w-14 h-14 rounded-none flex items-center justify-center font-black select-none z-10 shadow-xs border border-slate-200">
                  {member.avatarText}
                </div>

                <div className="w-full text-center z-10 pt-2 border-t border-white/10 space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-white uppercase leading-none block">
                    {member.qualification}
                  </span>
                  <span className="text-[8px] font-sans tracking-[0.1em] text-[#0F3A6B] font-black uppercase bg-white px-1.5 py-0.5 mt-1 inline-block rounded-none">
                    BOARD RECORD
                  </span>
                </div>
              </div>

              {/* Bio Details - Left Aligned, Clean Grid */}
              <div className="flex flex-col justify-between flex-grow">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-serif font-black text-slate-950 uppercase tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono font-bold tracking-wider text-[#0F3A6B] uppercase mt-1">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Core Specialization Details Bar */}
                  <div className="bg-white border-l-2 border-[#0F3A6B] p-2.5 rounded-none border border-slate-200">
                    <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block tracking-widest leading-none mb-1">
                      Zonal Area Specialization
                    </span>
                    <span className="text-xs text-slate-800 font-sans font-medium">
                      {member.specialization}
                    </span>
                  </div>
                </div>

                {/* Action panel underneath */}
                <div className="pt-4 mt-6 border-t border-slate-200 flex items-center justify-between">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-[11px] font-mono font-semibold text-[#0F3A6B] hover:underline"
                  >
                    {member.email}
                  </a>

                  <button
                    onClick={() => onContactPartner(member.name)}
                    className="text-[10px] font-serif font-black text-[#0F3A6B] hover:text-slate-950 tracking-widest uppercase flex items-center gap-1 cursor-pointer"
                  >
                    <span>CONSULT</span>
                    <ArrowRight size={11} />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Global Network Compliance Tagline - absolute zero round radius */}
        <div id="compliance-banner-log" className="mt-16 text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 py-2 px-4 bg-slate-50 border border-slate-200 rounded-none">
            <span className="h-2 w-2 bg-[#0F3A6B] rounded-none animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-slate-800 tracking-wider uppercase">
              BILATERAL DIRECT-AWARD ASSURANCE COMPLIANT
            </span>
          </div>
          <p className="text-[10px] font-sans text-slate-400 leading-relaxed">
            All principal consultants carry pristine records under FCDO framework guidelines and USAID direct-recipient sub-grant management protocols.
          </p>
        </div>

      </div>
    </section>
  );
}
