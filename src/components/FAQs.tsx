import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, FileText, CheckCircle2 } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "What core consulting tracks does DPCL specialize in?",
    answer: "Development Plus Health Consult Limited (DPCL) is an expert strategy firm with specialized capacity across multiple development tracks: Health Systems Strengthening (FCDO partnerships), Public Financial Management (SFTAS frameworks), demand-side Health Financing and Policy (Bill & Melinda Gates Foundation projects), and state-level capacity building implementation (Organization Capacity Assessments - OCAT)."
  },
  {
    id: 2,
    question: "Is DPCL fully registered with relevant statutory commissions and regulatory bodies?",
    answer: "Yes. DPCL is fully incorporated with the Corporate Affairs Commission (CAC) of the Federal Republic of Nigeria under Registration Number 1876089. Additionally, our key directors are individually licensed and affiliated with prestigious statutory regulatory frameworks including the Pharmaceutical Society of Nigeria (PSN), National Association for Public Health Practitioners Council (NAPHPPCN), and Institute of Health Insurance and Managed Care of Nigeria (IHIMN)."
  },
  {
    id: 3,
    question: "Where can we inspect official project publications or diagnostic studies conducted by the firm?",
    answer: "Select, non-confidential project diagnostics, training manuals, and diagnostic assessments (e.g. Gombe GoHealth OCAT briefs, Plateau State diagnostic reports) have been compiled under the 'Knowledge Hub' on this website. You can review and view these documents securely inside the direct read-only viewer, or open them in a separate browser tab."
  },
  {
    id: 4,
    question: "How can international donor agencies or local ministries initiate an advisory partnership?",
    answer: "Prospective partners, state commissioners, or donor representatives can initiate direct engagement using the 'Get in Touch' portal at the bottom of this page. You can securely attach full-scope programmatic descriptions or Request for Proposals (RFPs) directly as a PDF up to 50MB. All inquiries are saved to our secure internal registry, and our technical leads will follow up within 24 business hours."
  },
  {
    id: 5,
    question: "What is your typical project handholding and training workflow?",
    answer: "Our workflow is split into five technical phases: (1) Organization Capacity Assessment (OCAT baseline), (2) Joint Capacity Building & Training Action Plan Adoption, (3) Hybrid Implementation Workshops with structured pre- and post-evaluations, (4) Co-creation of Communications and M&E tracking matrices, and (5) Post-activity handholding with detailed technical progress reporting to relevant boards."
  }
];

export default function FAQs() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section 
      id="faqs" 
      className="bg-white py-24 px-6 sm:px-10 relative border-b border-slate-200"
    >
      <div className="max-w-4xl mx-auto relative">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-[#0F3A6B] tracking-[0.25em] font-extrabold mb-3 uppercase">
            <HelpCircle size={12} className="text-[#3b82f6]" />
            <span>KNOWLEDGE BASIS & COMPLIANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans tracking-tight text-slate-800 leading-none uppercase font-black">
            STRATEGIC ADVISORY FAQ
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#0F3A6B] to-[#3b82f6] mx-auto mt-4 rounded-full" />
          <p className="text-[#3b82f6] text-xs sm:text-sm font-sans font-bold mt-4 uppercase tracking-widest leading-relaxed">
            Get instant answers regarding DPCL credentials, focus areas, and compliance
          </p>
        </div>

        {/* Accordion Questions Frame */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-[#3b82f6]/60 bg-blue-50/10 shadow-md' 
                    : 'border-slate-200 bg-white hover:bg-slate-50/50'
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-xs sm:text-sm font-extrabold tracking-tight text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <span className={`p-1.5 rounded-full shrink-0 ${isOpen ? 'bg-[#0F3A6B] text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                </button>

                {/* Expanding Content Container */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[350px] border-t border-slate-100 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="p-6 text-xs text-slate-600 leading-relaxed font-sans text-left bg-slate-50/40">
                    <p className="font-medium">{faq.answer}</p>
                    
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 size={11} className="text-[#3b82f6]" />
                        <span>Verifiable Documented Source</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FileText size={11} className="text-[#3b82f6]" />
                        <span>Registry CAC 1876089 Compliant</span>
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
