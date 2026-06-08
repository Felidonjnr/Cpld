import React from 'react';
import { CORE_AREAS_DATA, CoreAreaItem } from '../data';
import { Shield, Landmark, Coins, Users, Cpu, ArrowRight } from 'lucide-react';

interface CoreAreasProps {
  onLearnMore: (title: string) => void;
}

export default function CoreAreas({ onLearnMore }: CoreAreasProps) {
  const items: CoreAreaItem[] = CORE_AREAS_DATA;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield size={24} className="text-[#0F3A6B]" />;
      case 'Landmark': return <Landmark size={24} className="text-[#0F3A6B]" />;
      case 'Coins': return <Coins size={24} className="text-[#0F3A6B]" />;
      case 'Users': return <Users size={24} className="text-[#0F3A6B]" />;
      case 'Cpu': return <Cpu size={24} className="text-[#0F3A6B]" />;
      default: return <Shield size={24} className="text-[#0F3A6B]" />;
    }
  };

  return (
    <section 
      id="core-areas" 
      className="bg-white py-20 px-6 sm:px-10 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Swanky Centered Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-sans tracking-tight text-slate-800 leading-none uppercase font-black">
            CORE AREAS
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#0F3A6B] to-[#3b82f6] mx-auto mt-4 rounded-full" />
          <p className="text-[#3b82f6] text-[13px] font-sans font-bold mt-4 uppercase tracking-widest">
            Empowering Progress: Our Key Focus Areas
          </p>
        </div>

        {/* 4-Column Responsive Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div 
              key={item.id}
              className="group bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-[#3b82f6] p-6 text-left transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between rounded-2xl shadow-xs hover:shadow-xl"
            >
              <div className="space-y-4">
                
                {/* Stylized Circular Icon Container */}
                <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:bg-[#0F3A6B]/5 transition-colors">
                  {renderIcon(item.iconName)}
                </div>

                {/* Bold Area Title */}
                <h3 className="text-base font-sans font-extrabold tracking-tight text-slate-950 uppercase leading-snug pt-1">
                  {item.title}
                </h3>

                {/* Main Text Content */}
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {item.text}
                </p>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
