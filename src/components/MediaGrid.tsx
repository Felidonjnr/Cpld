import React, { useState } from 'react';
import { PROJECTS_REPOSITORY } from '../data';
import { ProjectItem } from '../types';
import { FileText, MapPin, Calendar, Search, ArrowRight, ShieldCheck, Download, ExternalLink } from 'lucide-react';

export default function MediaGrid() {
  const allProjects: ProjectItem[] = PROJECTS_REPOSITORY;
  const [activeTab, setActiveTab] = useState<'all' | 'health' | 'governance' | 'strategy'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrief, setSelectedBrief] = useState<ProjectItem | null>(null);

  const filterTabs = [
    { label: 'ALL DEPLOYMENTS', id: 'all' as const },
    { label: 'HEALTH SECTOR (01)', id: 'health' as const },
    { label: 'GOVERNANCE AUDITS (02)', id: 'governance' as const },
    { label: 'STRATEGIC PORTFOLIO (03)', id: 'strategy' as const }
  ];

  const filteredProjects = allProjects.filter(p => {
    const matchesTab = activeTab === 'all' || p.category === activeTab;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.docCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section 
      id="media-grid" 
      className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header Block with Corporate Style Underscore Icon */}
        <div className="border-b border-slate-200 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left">
            <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold text-[#0F3A6B] uppercase block mb-2">
              ADMINISTRATIVE REPOSITORY
            </span>
            <h2 className="text-3xl font-serif text-slate-900 tracking-tight leading-none uppercase font-black">
              PROJECT ARCHIVES & REPORT COVERS
            </h2>
            <div className="h-[3px] w-24 bg-[#0F3A6B] mt-4 rounded-none" />
          </div>

          {/* Search container - completely rectangular */}
          <div className="relative w-full md:w-80 shrink-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search size={15} />
            </span>
            <input
              type="text"
              placeholder="Search by index, zone, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-sans p-3 pl-9 border border-slate-200 rounded-none bg-slate-50 focus:outline-none focus:bg-white focus:border-[#0F3A6B] focus:ring-1 focus:ring-[#0F3A6B]"
            />
          </div>
        </div>

        {/* Tab Filters row - completely square buttons */}
        <div 
          id="project-filters-nav"
          className="flex flex-wrap gap-2 mb-10 border-b border-slate-100 pb-4"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[11px] font-serif font-black tracking-widest uppercase px-5 py-3 transition-colors cursor-pointer rounded-none ${
                activeTab === tab.id
                  ? 'bg-[#0F3A6B] text-white'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Media Gallery - Stricter Multi-column Grid (Report Binder covers) */}
        <div 
          id="media-gallery-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              id={`media-item-${project.id}`}
              className="group border border-slate-200 p-5 bg-slate-50 hover:bg-white hover:border-[#0F3A6B] hover:shadow-md transition-all duration-150 rounded-none text-left flex flex-col justify-between"
            >
              <div>
                {/* Simulated physical report cover binder */}
                <div className="relative h-60 w-full bg-slate-200 border border-slate-300 rounded-none mb-4 overflow-hidden flex flex-col justify-between p-4 shadow-xs group-hover:shadow-sm transition-all">
                  
                  {/* Left edge book spine simulation line */}
                  <div className="absolute left-0 inset-y-0 w-3 bg-[#0c2f56] opacity-90 border-r border-black/10" />

                  {/* Cover top: Registration details */}
                  <div className="pl-3 flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[7px] font-mono font-bold tracking-widest text-slate-500 uppercase leading-none">
                        DPCL ADVISORY SECRETARIAT
                      </span>
                      <span className="text-[8px] font-mono tracking-tight font-black text-[#0F3A6B] mt-0.5">
                        REGISTRAR AUDIT CODE
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-extrabold bg-[#0F3A6B] text-white px-1.5 py-0.5 rounded-none">
                      {project.docCode}
                    </span>
                  </div>

                  {/* Cover middle: Major Subject Label Display */}
                  <div className="pl-3 py-4 border-l-2 border-[#0F3A6B] mt-6 select-none">
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                      OFFICIAL SYSTEMIC STATUS BRIEF
                    </div>
                    <div className="text-base font-serif font-black text-slate-900 leading-tight uppercase tracking-tight mt-1 line-clamp-3">
                      {project.title}
                    </div>
                  </div>

                  {/* Cover bottom: Stamp indicators & seal lines */}
                  <div className="pl-3 border-t border-slate-300/60 pt-3 flex items-center justify-between">
                    <div className="flex flex-col text-[8px] font-sans text-slate-500">
                      <span>DEPLOYMENT YEAR: {project.year}</span>
                      <span className="font-mono text-[7px] text-[#0F3A6B] font-bold">STAMP: VERIFIED COMPLIANCE</span>
                    </div>

                    <div className="border border-[#0F3A6B]/30 px-2 py-1 rounded-none bg-white text-[8px] font-mono font-black text-[#0F3A6B] uppercase shrink-0">
                      HQ ABUJA
                    </div>
                  </div>
                </div>

                {/* Text titles underneath: concise, bold, and highly legible as specified */}
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 uppercase">
                    <MapPin size={10} className="text-[#0F3A6B]" />
                    <span>{project.location}</span>
                  </div>
                  
                  <h3 className="text-sm font-serif font-black text-slate-950 uppercase tracking-tight line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 font-sans leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>
              </div>

              {/* Action trigger block */}
              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-400 uppercase">
                  INDEX: {project.docCode}
                </span>
                
                <button
                  onClick={() => setSelectedBrief(project)}
                  className="text-[10px] font-serif font-black text-[#0F3A6B] hover:text-[#0b2b50] tracking-widest uppercase flex items-center gap-1 cursor-pointer"
                >
                  <span>REVIEW BRIEF</span>
                  <ArrowRight size={11} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Empty status check */}
        {filteredProjects.length === 0 && (
          <div className="border border-dashed border-slate-200 py-16 text-center rounded-none font-mono text-xs text-slate-400">
            No active report archives matched selection: "{searchQuery}". Please clear your search parameters.
          </div>
        )}

        {/* Simulated Document Brief Appraisal Modal - completely rectangular */}
        {selectedBrief && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white border-2 border-slate-900 w-full max-w-lg p-6 sm:p-8 rounded-none relative text-left space-y-5">
              
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[9px] font-mono text-[#0F3A6B] tracking-widest font-bold uppercase block">
                    CLINICAL & PROGRAMMATIC RECORD
                  </span>
                  <h3 className="text-lg font-serif font-black text-slate-950 uppercase leading-none mt-1">
                    {selectedBrief.title}
                  </h3>
                </div>
                <span className="text-slate-400 font-mono text-xs font-bold bg-slate-100 px-2 py-1 select-none">
                  {selectedBrief.docCode}
                </span>
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div>
                  <strong className="text-slate-700 font-serif font-bold uppercase text-[10px] block">
                    Advisory Summary Review:
                  </strong>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    {selectedBrief.summary}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 font-mono text-[10px] text-slate-500">
                  <div>
                    <strong>DEPLOYMENT LOCATION:</strong>
                    <span className="block text-slate-800 font-sans font-bold mt-0.5">{selectedBrief.location}</span>
                  </div>
                  <div>
                    <strong>ISSUING MANDATE YEAR:</strong>
                    <span className="block text-slate-800 font-sans font-bold mt-0.5">{selectedBrief.year}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 border border-slate-200 font-mono text-[10px] text-slate-600 space-y-1">
                  <p>✔ State Cabinet Council Reviewed</p>
                  <p>✔ Bilateral Funding Guidelines Applied</p>
                  <p>✔ Authorized Signatory Approved Program Status</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setSelectedBrief(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-serif font-black tracking-widest uppercase rounded-none py-3 text-center cursor-pointer"
                >
                  CLOSE BRIEF
                </button>
                <button
                  onClick={() => {
                    alert(`Simulating secure administrative system download for document alignment payload [${selectedBrief.docCode}].pdf`);
                    setSelectedBrief(null);
                  }}
                  className="flex-1 bg-[#0F3A6B] hover:bg-[#0B2C52] text-white text-xs font-serif font-black tracking-widest uppercase rounded-none py-3 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download size={12} />
                  <span>DOWNLOAD PDF</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
