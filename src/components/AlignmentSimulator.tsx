import React, { useState } from 'react';
import { 
  Sliders, 
  CheckSquare, 
  AlertTriangle, 
  Play, 
  ArrowRight, 
  Bookmark, 
  Send, 
  RefreshCw, 
  Activity, 
  Heart, 
  Scale, 
  BookOpen 
} from 'lucide-react';

interface AlignmentSimulatorProps {
  onCopyData: (data: {
    fullName: string;
    organization: string;
    subject: string;
    message: string;
  }) => void;
}

export default function AlignmentSimulator({ onCopyData }: AlignmentSimulatorProps) {
  // Simulator configuration states
  const [domain, setDomain] = useState<'health' | 'governance' | 'strategy'>('health');
  const [donor, setDonor] = useState<'USAID' | 'FCDO' | 'Gates Foundation'>('FCDO');
  const [region, setRegion] = useState<'north' | 'south' | 'east' | 'west'>('north');
  const [checkedPriorities, setCheckedPriorities] = useState<string[]>([
    'p1', 'p2', 'p4'
  ]);
  const [activeTab, setActiveTab] = useState<'parameters' | 'impact'>('parameters');

  // Calculation outputs
  const [rating, setRating] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [systemAlerts, setSystemAlerts] = useState<string[]>([]);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const priorities = [
    { id: 'p1', label: 'Primary healthcare finance tracking transparency', domain: 'health' },
    { id: 'p2', label: 'Inclusive public contracting & bidding framework', domain: 'governance' },
    { id: 'p3', label: 'Federal-state legislative alignment parameters', domain: 'governance' },
    { id: 'p4', label: 'Sub-grant operational transparency guidelines', domain: 'strategy' },
    { id: 'p5', label: 'Coordinated programmatic clinic safety index', domain: 'health' },
    { id: 'p6', label: 'Proactive civil accountability dialogue records', domain: 'governance' },
    { id: 'p7', label: 'Post-intervention asset continuity strategy', domain: 'strategy' }
  ];

  const handleTogglePriority = (id: string) => {
    if (checkedPriorities.includes(id)) {
      setCheckedPriorities(checkedPriorities.filter(p => p !== id));
    } else {
      setCheckedPriorities([...checkedPriorities, id]);
    }
  };

  const handleRunSimulation = () => {
    // Generate authoritative calculation formula
    const baseScore = checkedPriorities.length * 12;
    const domainMultiplier = domain === 'health' ? 1.1 : domain === 'governance' ? 1.15 : 1.05;
    const donorWeight = donor === 'USAID' ? 9 : donor === 'FCDO' ? 11 : 13;
    
    let calculatedRating = Math.min(100, Math.round((baseScore + donorWeight) * domainMultiplier));
    if (checkedPriorities.length === 0) calculatedRating = 0;

    let alerts: string[] = [];
    if (checkedPriorities.length < 3) {
      alerts.push("Warning: Low programmatic priority coverage may trigger strict bilateral audit overrides.");
    }
    if (domain === 'health' && !checkedPriorities.includes('p1')) {
      alerts.push("Protocol Missing: Health domain requires immediate Activation of Primary healthcare finance tracking transparency.");
    }
    if (domain === 'governance' && !checkedPriorities.includes('p2') && !checkedPriorities.includes('p6')) {
      alerts.push("Compliance Notice: Civic trust and billing dialogue benchmarks are currently unaddressed.");
    }

    setRating(calculatedRating);
    setSystemAlerts(alerts);
    setHasCalculated(true);
    setActiveTab('impact');
  };

  const handleTransferToContact = () => {
    const formattedSubject = `Subnational Strategic Alignment Proposal: ${donor} Audit`;
    const formattedMessage = `Respectfully submitted for appraisal.\n\nFollowing simulations, we request a dedicated consultation with Ukwaja Kingsley or Iro Okechukwu regarding our subnational deployment in the ${region.toUpperCase()} region.\n\nProject Parameters Checked:\n- Lead Sector: ${domain.toUpperCase()}\n- Funding Framework/Alliance: ${donor}\n- Targeted Region: ${region.toUpperCase()}\n- Active Priorities: ${checkedPriorities.length} / ${priorities.length} evaluated items\n- Approximate Alignment Rating: ${rating ?? 0}%\n\nPlease advise on scheduling a strategic compliance session.`;

    onCopyData({
      fullName: 'Bilateral Mission Program Officer',
      organization: `${donor} Subnational Coordination`,
      subject: formattedSubject,
      message: formattedMessage
    });

    setCopiedSuccess(true);
    setTimeout(() => {
      setCopiedSuccess(false);
      // Smooth scroll to the contact form block
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);
  };

  return (
    <div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-200" id="advisory-sim">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Context Brief & Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-[#0F3A6B] tracking-wider font-bold mb-3 uppercase">
                <span className="w-2 h-2 bg-[#0F3A6B]" />
                <span>Subnational Strategic Integrity Engine</span>
              </div>
              
              <h3 className="font-serif text-3xl font-black text-slate-900 tracking-tight leading-tight uppercase relative pb-4">
                Bespoke Strategy Alignment Module
                <span className="absolute bottom-0 left-0 w-16 h-[3px] bg-[#0F3A6B]" />
              </h3>
              
              <p className="mt-6 text-sm text-slate-600 leading-relaxed font-sans">
                Subnational alignments across African states require strict harmony between regional budgets, local regulatory boards, and international compliance checklists. 
              </p>
              
              <p className="mt-3 text-xs text-slate-500 font-mono">
                Instruct governors, state finance committees, and programmatic officers to dial in target profiles below to check compliance instantly.
              </p>
            </div>

            {/* Sub-panels switcher strictly geometric */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex space-x-1 bg-slate-200 p-1 rounded-none">
                <button
                  type="button"
                  onClick={() => setActiveTab('parameters')}
                  className={`flex-1 text-center py-2.5 text-xs tracking-wider transition-all font-serif font-black uppercase rounded-none cursor-pointer ${
                    activeTab === 'parameters' 
                      ? 'bg-[#0F3A6B] text-white' 
                      : 'text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  1. Dial Parameters
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!hasCalculated) handleRunSimulation();
                    setActiveTab('impact');
                  }}
                  className={`flex-1 text-center py-2.5 text-xs tracking-wider transition-all font-serif font-black uppercase rounded-none cursor-pointer ${
                    activeTab === 'impact' 
                      ? 'bg-[#0F3A6B] text-white' 
                      : 'text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  2. Alignment Scoring
                </button>
              </div>

              {/* Reset simulator Button */}
              {hasCalculated && (
                <button
                  onClick={() => {
                    setCheckedPriorities(['p1', 'p2', 'p4']);
                    setRating(null);
                    setHasCalculated(false);
                    setActiveTab('parameters');
                  }}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-xs font-mono font-bold tracking-wider text-[#0F3A6B] hover:text-[#0B2C52] transition-colors"
                >
                  <RefreshCw size={14} className="animate-spin-hover" />
                  REVERT SIMULATION PARAMETERS
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Visual Dashboard Simulator */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-slate-200 shadow-sm rounded-none">
            {activeTab === 'parameters' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-serif font-bold tracking-wider text-slate-700 uppercase mb-3">
                    A. Lead Operational Domain
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'health', label: 'Health Systems', icon: Heart },
                      { id: 'governance', label: 'Governance / Trust', icon: Scale },
                      { id: 'strategy', label: 'Direct Strategy', icon: BookOpen }
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setDomain(item.id as any)}
                          className={`flex flex-col items-center justify-center p-3 border rounded-none transition-all cursor-pointer ${
                            domain === item.id 
                              ? 'border-[#0F3A6B] bg-slate-50 text-[#0F3A6B] ring-1 ring-[#0F3A6B]' 
                              : 'border-slate-200 hover:border-slate-300 text-slate-600'
                          }`}
                        >
                          <Icon size={18} className="mb-2" />
                          <span className="text-[10px] font-sans font-extrabold uppercase tracking-tight text-center leading-none">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif font-bold tracking-wider text-slate-700 uppercase mb-2">
                      B. Lead Bilateral Donor Framework
                    </label>
                    <select
                      value={donor}
                      onChange={(e) => setDonor(e.target.value as any)}
                      className="w-full text-xs font-sans tracking-wide p-2.5 border border-slate-200 rounded-none bg-white focus:outline-none focus:border-[#0F3A6B] focus:ring-1 focus:ring-[#0F3A6B]"
                    >
                      <option value="FCDO">FCDO Strategic Alliance</option>
                      <option value="USAID">USAID Bilateral Mission Guide</option>
                      <option value="Gates Foundation">Gates Foundation Framework</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-bold tracking-wider text-slate-700 uppercase mb-2">
                      C. Targeted Deployment Zone
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value as any)}
                      className="w-full text-xs font-sans tracking-wide p-2.5 border border-slate-200 rounded-none bg-white focus:outline-none focus:border-[#0F3A6B] focus:ring-1 focus:ring-[#0F3A6B]"
                    >
                      <option value="north">Subnational Zone A (North Focus)</option>
                      <option value="south">Subnational Zone B (South Focus)</option>
                      <option value="east">Subnational Zone C (East Focus)</option>
                      <option value="west">Subnational Zone D (West Focus)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold tracking-wider text-slate-700 uppercase mb-2">
                    D. Governance Action Priorities Checklist ({checkedPriorities.length} selected)
                  </label>
                  <p className="text-[10px] text-slate-400 mb-3 block">
                    Check which accountability priorities are embedded in your current subnational plan:
                  </p>
                  <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-100 p-2 bg-slate-50">
                    {priorities.map((item) => (
                      <label 
                        key={item.id} 
                        className={`flex items-start gap-3 p-2 border transition-all cursor-pointer ${
                          checkedPriorities.includes(item.id) 
                            ? 'bg-white border-slate-300' 
                            : 'bg-transparent border-transparent opacity-75 hover:opacity-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checkedPriorities.includes(item.id)}
                          onChange={() => handleTogglePriority(item.id)}
                          className="mt-0.5 border-slate-300 text-[#0F3A6B] focus:ring-[#0F3A6B] h-4.5 w-4.5 rounded-none"
                        />
                        <div className="text-[11px]">
                          <span className={`font-mono text-[9px] mr-2 px-1 py-0.2 uppercase font-black tracking-tighter ${
                            item.domain === 'health' ? 'bg-indigo-100 text-indigo-700' :
                            item.domain === 'governance' ? 'bg-amber-100 text-amber-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {item.domain}
                          </span>
                          <span className="text-slate-700 font-sans tracking-tight">{item.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleRunSimulation}
                    className="w-full bg-[#0F3A6B] hover:bg-[#0B2C52] text-white font-serif font-black tracking-widest text-xs uppercase rounded-none py-3.5 px-4 flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer"
                  >
                    <Play size={14} className="fill-current" />
                    RUN COMPLIANCE SIMULATION & SCORE REPORT
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-none text-center">
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 block uppercase mb-1">
                    Systemic Alignment Level
                  </span>
                  
                  {rating !== null ? (
                    <div>
                      <div className="text-6xl font-serif font-black tracking-tighter text-[#0F3A6B]">
                        {rating}%
                      </div>
                      
                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-none text-xs font-mono font-bold">
                        <Activity size={12} className={rating > 70 ? "text-emerald-500" : "text-amber-500"} />
                        <span>
                          {rating >= 80 ? "HIGH SYSTEM ALIGNMENT (ACCELERATED TRACK)" :
                           rating >= 50 ? "MODERATE ALIGNMENT (PRE-REQUISITES APPLIED)" :
                           "INSUFFICIENT ALIGNMENT CONTROLS"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-slate-400 font-mono text-xs">
                      No appraisal compiled. Return to Step 1 to load parameters.
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-serif font-black tracking-wider text-slate-800 uppercase">
                    Audit Alerts & Framework Adjustments
                  </h4>

                  {systemAlerts.length > 0 ? (
                    <div className="space-y-2">
                      {systemAlerts.map((e, index) => (
                        <div key={index} className="flex items-start gap-3 bg-red-50/70 border border-red-200 p-3 rounded-none text-red-950 text-xs font-sans">
                          <AlertTriangle size={15} className="text-red-600 shrink-0 mt-0.5" />
                          <p className="leading-tight">{e}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-none text-emerald-950 text-xs font-sans flex items-center gap-3">
                      <Sliders size={15} className="text-emerald-600 shrink-0" />
                      <p>All compliance metrics align perfectly with the defined {donor} frameworks. Ready for deployment.</p>
                    </div>
                  )}

                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-none text-slate-600 text-xs font-sans leading-relaxed">
                    <strong>Report Summary:</strong> Analyzing state plans in <strong>Subnational Zone ({region.toUpperCase()})</strong> with strategic parameters tailored around <strong>{donor}</strong>, the systemic integrity score indicates that {checkedPriorities.length} of {priorities.length} core metrics match guidelines. We can expedite compliance.
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setActiveTab('parameters')}
                    className="flex-1 bg-white hover:bg-slate-50 text-[#0F3A6B] border border-slate-300 font-serif font-black tracking-widest text-xs uppercase rounded-none py-3 px-4 text-center transition-all cursor-pointer"
                  >
                    DIAL PARAMETERS
                  </button>
                  <button
                    onClick={handleTransferToContact}
                    disabled={copiedSuccess}
                    className={`flex-1 font-serif font-black tracking-widest text-xs uppercase rounded-none py-3 px-4 flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      copiedSuccess 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-[#0F3A6B] hover:bg-[#0B2C52] text-white'
                    }`}
                  >
                    {copiedSuccess ? (
                      <>
                        <CheckSquare size={13} />
                        COPIED SECURELY!
                      </>
                    ) : (
                      <>
                        <Send size={13} />
                        CREATE COMPLIANCE SECURE PROFILE
                      </>
                    )}
                  </button>
                </div>
                {copiedSuccess && (
                  <p className="text-[10px] text-emerald-600 font-mono text-center animate-pulse">
                    Routing variables to the primary inquiry section below. Please complete submit sequence.
                  </p>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
