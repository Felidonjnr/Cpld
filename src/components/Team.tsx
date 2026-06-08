import React from 'react';
import { TEAM_MEMBERS_DATA, TeamProfileItem } from '../data';
import { AlertCircle } from 'lucide-react';

interface TeamProps {
  onContactPartner: (partnerName: string) => void;
  items?: TeamProfileItem[];
}

export default function Team({ onContactPartner, items }: TeamProps) {
  const team: TeamProfileItem[] = items || TEAM_MEMBERS_DATA;

  return (
    <section 
      id="team" 
      className="bg-white py-20 px-6 sm:px-10 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[10px] font-mono tracking-[0.25em] font-extrabold text-[#0F3A6B] uppercase mb-2">
            ORGANIZATIONAL LEADERSHIP
          </p>
          <h2 className="text-3xl sm:text-4xl font-sans tracking-tight text-slate-800 leading-none uppercase font-black">
            OUR TEAM
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#0F3A6B] to-[#3b82f6] mx-auto mt-4 rounded-full" />
          <p className="text-[#3b82f6] text-[13px] font-sans font-bold mt-4 uppercase tracking-widest leading-relaxed">
            Meet the Heartbeats: Our Dedicated Team Leading the Charge Towards Healthier Lives!
          </p>
        </div>

        {/* Modern Grid Layout Displaying Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="flex flex-col bg-slate-50 border border-slate-200/80 hover:border-[#3b82f6] transition-all duration-300 p-6 text-left justify-between rounded-2xl shadow-xs hover:shadow-xl transform hover:-translate-y-1.5"
            >
              
              <div className="space-y-5">
                
                {/* Profile Picture Frame / Square Geometric initials block with friendly rounded edges */}
                <div className="w-full aspect-square bg-[#0B2340] border border-slate-150 flex flex-col items-center justify-center relative select-none rounded-2xl shadow-xs overflow-hidden group">
                  {member.avatarUrl ? (
                    <img 
                      src={member.avatarUrl} 
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                      <div className="w-16 h-16 rounded-full bg-white text-[#0F3A6B] flex items-center justify-center font-serif font-black text-2xl shadow-md border border-slate-100">
                        {member.avatarText}
                      </div>

                      <span className="text-[10px] font-mono tracking-widest text-[#3b82f6] font-bold uppercase mt-4">
                        {member.role ? member.role.split(' ')[0] : 'CONSULTANT'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Profile Meta Details */}
                <div>
                  <h3 className="text-base font-sans font-extrabold text-[#0F3A6B] uppercase tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-1">
                    {member.role}
                  </p>
                </div>

                {/* Biography or Pending Placeholder */}
                {member.isPending ? (
                  /* Stylized, custom pending review placeholder block */
                  <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-xl space-y-2 flex flex-col items-start shadow-xs">
                    <div className="flex items-center gap-1.5 text-amber-800">
                      <AlertCircle size={14} className="shrink-0" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                        REVIEW DIRECTIVE
                      </span>
                    </div>
                    <p className="text-xs text-amber-700 font-sans italic leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                ) : (
                  member.bio && (
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      {member.bio}
                    </p>
                  )
                )}

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
