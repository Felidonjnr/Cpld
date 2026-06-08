import React, { useState, useEffect } from "react";
import { FileText, ArrowUpRight, Search, BookOpen, Download, X } from "lucide-react";
import { technicalPublications, Publication } from "../data";

export default function KnowledgeHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activePublication, setActivePublication] = useState<Publication | null>(null);

  const categories = ["All", "Health Systems", "Public Finance", "Institutional Strategy"];

  // Keyboard accessibility for ESC close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter Publications based on category and search query
  const filteredPublications = technicalPublications.filter((pub) => {
    const matchesCategory = selectedCategory === "All" || pub.category === selectedCategory;
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      pub.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Dynamic Badge Color Mapping
  const getBadgeStyles = (category: string) => {
    switch (category) {
      case "Health Systems":
        return "bg-blue-50 text-blue-700 border-blue-200/60";
      case "Public Finance":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Institutional Strategy":
        return "bg-purple-50 text-purple-700 border-purple-200/60";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200/60";
    }
  };

  return (
    <section 
      id="knowledge-hub" 
      className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-b border-slate-100 relative"
    >
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        
        {/* Component Header Area */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-black tracking-[0.25em] text-[#3b82f6] uppercase bg-blue-50/80 px-3.5 py-1.5 rounded-full border border-blue-100">
            Resource Library
          </span>
          <h2 className="mt-4 font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F3A6B]">
            DPCL Knowledge Hub
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-sans mt-2">
            Access our elite publication archive featuring political economy analyses, structural diagnostic reports, capacity building guides, and operations research briefs.
          </p>
        </div>

        {/* Filter Controls & Search Input bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          
          {/* Pill Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-wider rounded-xl transition-all duration-300 pointer-events-auto cursor-pointer ${
                  selectedCategory === category
                    ? "bg-[#0F3A6B] text-white shadow-sm scale-102"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60"
                }`}
              >
                {category === "All" ? "All Resources" : category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-sans pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3b82f6] focus:bg-white transition-colors placeholder-slate-400"
            />
          </div>

        </div>

        {/* Grid of Uniform Height Cards */}
        {filteredPublications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPublications.map((pub) => (
              <div 
                key={pub.id}
                className="bg-white border border-slate-100/95 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Upper Content container */}
                <div className="p-6 md:p-8 space-y-4">
                  
                  {/* Color-Coded Domain Badge & Document Type */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border ${getBadgeStyles(pub.category)}`}>
                        {pub.category}
                      </span>
                      <span className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold bg-slate-100/60 px-2 py-0.5 rounded">
                        {pub.documentType}
                      </span>
                    </div>
                    <FileText size={16} className="text-slate-300 shrink-0 mt-1" />
                  </div>

                  {/* Document Title */}
                  <h3 className="font-sans text-base font-extrabold text-[#0B2340] line-clamp-2 leading-snug group-hover:text-[#3b82f6] transition-colors">
                    {pub.title}
                  </h3>

                  {/* Summary paragraph */}
                  <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium line-clamp-4">
                    {pub.summary}
                  </p>

                </div>

                {/* Footer/Action area */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100/80 flex items-center justify-end">
                  
                  <button 
                    onClick={() => {
                      setActivePublication(pub);
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#0F3A6B] text-[#0F3A6B] hover:text-white border border-slate-200/80 hover:border-[#0F3A6B] text-xs font-sans font-bold tracking-wider uppercase rounded-xl transition-all duration-300 hover:scale-103 shadow-xs cursor-pointer"
                  >
                    <span>View Report</span>
                    <ArrowUpRight size={14} className="stroke-[2.5]" />
                  </button>

                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl">
            <BookOpen size={48} className="mx-auto text-slate-300 stroke-[1.5]" />
            <h4 className="mt-4 font-sans text-sm font-extrabold text-slate-800 uppercase">
              No matching archival publications found
            </h4>
            <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
              Please try adjusting your search terms or search for documents in a different category.
            </p>
          </div>
        )}

      </div>

      {/* Interactive Modal Popup Window for Previewing Documents */}
      {isModalOpen && activePublication && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col transform transition-all scale-100 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0F3A6B] text-white flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-white/10 text-white border border-white/20">
                    {activePublication.category}
                  </span>
                  <span className="text-blue-100 text-[10px] uppercase tracking-wider font-semibold">
                    {activePublication.documentType}
                  </span>
                </div>
                <h3 className="font-sans text-sm sm:text-base font-extrabold tracking-tight pr-4">
                  {activePublication.title}
                </h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                title="Close document viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Sandbox-protected Iframe Document Embed */}
            <div className="p-4 bg-slate-50 flex-1">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                <iframe 
                  src={activePublication.pdfUrl} 
                  className="w-full h-[65vh] md:h-[75vh] bg-white rounded-lg border-none"
                  contentEditable="false"
                  referrerPolicy="no-referrer"
                  title={activePublication.title}
                  allow="autoplay; encrypted-media"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="px-6 py-3.5 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-xs">
              <span className="font-sans font-medium flex items-center gap-1.5 text-slate-600">
                <BookOpen className="w-4 h-4 text-[#3b82f6]" />
                Secure Read-Only Document Embed (Google Drive Reader)
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={activePublication.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-sans font-bold text-[#0F3A6B] hover:text-[#3b82f6] border border-slate-200 hover:border-slate-300 rounded-lg transition-colors bg-white shadow-xs"
                >
                  Open in New Tab
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 bg-[#0F3A6B] hover:bg-slate-800 text-white font-sans text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
