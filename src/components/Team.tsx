import React, { useState } from 'react';
import { LEADERSHIP_TEAM } from '../data';
import { TeamMember } from '../types';
import { Mail, ArrowRight, ShieldCheck, Award, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface TeamProps {
  onContactPartner: (partnerName: string) => void;
}

export default function Team({ onContactPartner }: TeamProps) {
  const team: TeamMember[] = LEADERSHIP_TEAM;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="team"
      className="py-24 sm:py-32 bg-slate-50 text-slate-950 border-b border-[#C5A880]/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-[#C5A880]/20 pb-12 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <span className="text-[10px] font-sans tracking-[0.25em] font-semibold text-[#C5A880] uppercase">
              Principal Advisory
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-slate-900 leading-tight">
              The Leadership Team
            </h2>
          </div>
          <p className="text-sm font-sans tracking-wide text-gray-500 max-w-sm font-light leading-relaxed">
            Led by veteran health and governance architects driving rigorous accountability and systemic change across multi-sectoral development frameworks.
          </p>
        </div>

        {/* 2-Column Responsive Layout Grid for Senior Leaders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {team.map((member) => (
            <div
              key={member.id}
              id={`team-card-${member.id}`}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex flex-col sm:flex-row gap-8 bg-white border border-slate-200 hover:border-[#C5A880]/55 p-8 transition-all duration-300 relative shadow-sm hover:shadow-lg"
            >
              {/* Luxury Portrait Placeholder Frame */}
              <div 
                id={`portrait-frame-${member.id}`}
                className="w-full sm:w-44 h-56 flex-shrink-0 relative overflow-hidden bg-slate-950 flex flex-col items-center justify-between p-4 border border-[#C5A880]/25 group-hover:border-[#C5A880]/60 transition-all duration-300"
              >
                {/* Radial golden background glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-950 to-slate-900 z-0" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-[#C5A880]/10 rounded-full filter blur-xl z-0" />
                
                {/* Inner Thin Border Box */}
                <div className="absolute inset-2 border border-[#C5A880]/10 group-hover:border-[#C5A880]/20 transition-all duration-300" />

                {/* Top Badge: Senior Rank */}
                <span className="text-[8px] font-sans tracking-[0.2em] uppercase text-gray-400 group-hover:text-[#C5A880] transition-colors z-10 font-bold">
                  DPCL SENIOR
                </span>

                {/* Big Editorial Initials Centerpiece */}
                <div className="text-4xl font-serif tracking-widest text-[#C5A880] select-none z-10 flex items-center justify-center h-24 font-light">
                  {member.avatarText}
                </div>

                {/* Underlines & Grid Lines */}
                <div className="w-full text-center z-10 pt-2 border-t border-white/5 space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase leading-none block">
                    {member.qualification}
                  </span>
                  <span className="text-[8px] font-sans tracking-[0.1em] text-[#C5A880] uppercase block">
                    VERIFIED PARTNER
                  </span>
                </div>
              </div>

              {/* Bio Details */}
              <div className="flex flex-col justify-between py-1 flex-grow">
                <div className="space-y-4">
                  <div>
                    {/* Name */}
                    <h3 className="text-xl font-serif font-bold text-slate-900">
                      {member.name}
                    </h3>
                    {/* Role */}
                    <p className="text-xs font-sans font-semibold tracking-wider text-[#C5A880] uppercase mt-1">
                      {member.role}
                    </p>
                  </div>

                  {/* Bio brief summary description */}
                  <p className="text-xs font-sans tracking-wide text-gray-600 leading-relaxed font-light">
                    {member.bio}
                  </p>

                  {/* Specialization Indicator */}
                  <div className="bg-slate-50 border-l-2 border-[#C5A880] p-2.5">
                    <span className="text-[9px] font-sans font-bold uppercase text-gray-500 block tracking-widest leading-none mb-1">
                      Core Specialization
                    </span>
                    <span className="text-[11px] font-sans text-slate-800 tracking-wide">
                      {member.specialization}
                    </span>
                  </div>
                </div>

                {/* Contact Partner CTA Anchor Link */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center space-x-2 text-xs font-sans tracking-wider text-gray-500 hover:text-[#C5A880] transition-colors leading-none"
                    title={`Email ${member.name}`}
                  >
                    <Mail size={13} className="text-[#C5A880]" />
                    <span>{member.email}</span>
                  </a>

                  <button
                    id={`contact-md-btn-${member.id}`}
                    onClick={() => onContactPartner(member.name)}
                    className="flex items-center space-x-1 text-[10px] font-sans tracking-widest uppercase font-semibold text-[#C5A880] hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <span>Consult</span>
                    <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Network Compliance Tagline */}
        <div id="compliance-banner-log" className="mt-16 text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 justify-center py-1.5 px-3 bg-[#C5A880]/10 border border-[#C5A880]/20 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-sans font-semibold text-[#0F172A] tracking-wider uppercase">
              Bilateral Security Clearance Verified
            </span>
          </div>
          <p className="text-[10px] font-sans tracking-wide text-gray-400">
            DPCL Senior Partners maintain clean record alignments under sovereign anti-graft legislation and FCDO / USAID direct-award compliance thresholds.
          </p>
        </div>

      </div>
    </section>
  );
}
