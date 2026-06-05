import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Landmark, Clock, Send, ShieldAlert, Award } from 'lucide-react';
import { ConsultationInquiry } from '../types';

interface ContactProps {
  partnerConsultationTopic?: string;
  clearTopic?: () => void;
  prefilledData?: {
    fullName: string;
    organization: string;
    subject: string;
    message: string;
  } | null;
  clearPrefilledData?: () => void;
}

export default function Contact({ 
  partnerConsultationTopic = '', 
  clearTopic = () => {}, 
  prefilledData = null, 
  clearPrefilledData = () => {} 
}: ContactProps) {
  
  const [formData, setFormData] = useState<ConsultationInquiry>({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  // Handle prefilled data transfers from external simulation blocks or topics
  useEffect(() => {
    if (prefilledData) {
      setFormData(prev => ({
        ...prev,
        fullName: prefilledData.fullName || prev.fullName,
        organization: prefilledData.organization || prev.organization,
        subject: prefilledData.subject || prev.subject,
        message: prefilledData.message || prev.message,
        priority: 'high'
      }));
      // Clear parent context to allow subsequent edits
      clearPrefilledData();
    }
  }, [prefilledData, clearPrefilledData]);

  useEffect(() => {
    if (partnerConsultationTopic) {
      setFormData(prev => ({
        ...prev,
        subject: `Strategic Appraisal: ${partnerConsultationTopic}`,
        message: `We request professional consultation regarding focus track: "${partnerConsultationTopic}". Please provide programmatic appraisal guidelines for our subnational rollout.`
      }));
      clearTopic();
    }
  }, [partnerConsultationTopic, clearTopic]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate elite administrative logging
    setTimeout(() => {
      const generatedId = `DPCL-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionId(generatedId);
      setIsSubmitting(false);
      setFormSuccess(true);
      
      // Reset form variables
      setFormData({
        fullName: '',
        organization: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        priority: 'medium'
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      {/* Dynamic Background subtle geometric divider */}
      <div className="absolute inset-y-0 right-0 w-1/3 bg-slate-50/50 hidden lg:block border-l border-slate-100" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Institutional Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-between" id="office-secretariat">
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-[#0F3A6B] tracking-wider font-bold mb-3 uppercase">
                <Landmark size={12} />
                <span>COMMUNICATIONS SECRETARIAT</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase relative pb-4">
                SECURE AN ADVISORY ENGAGEMENT
                <span className="absolute bottom-0 left-0 w-24 h-[3px] bg-[#0F3A6B]" />
              </h2>
              
              <p className="mt-8 text-sm text-slate-600 leading-relaxed font-sans">
                Our board reviews state directives, administrative inquiries, and subnational project briefs within 24 working hours of filing. Submit the secure form to assign a program officer.
              </p>

              {/* Office Details Cards - completely square */}
              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4 p-4 border border-slate-200/80 bg-slate-50 rounded-none">
                  <div className="p-2.5 bg-[#0F3A6B] text-white rounded-none shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-serif font-black tracking-wide text-slate-900 uppercase">
                      Physical Secretariat (Nigeria)
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 font-sans leading-tight">
                      3rd Floor, Valley Plaza, Plot 215, Aminu Kano Crescent, Wuse II, Abuja, FCT, Nigeria.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-slate-200/80 bg-slate-50 rounded-none">
                  <div className="p-2.5 bg-[#0F3A6B] text-white rounded-none shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-serif font-black tracking-wide text-slate-900 uppercase">
                      Direct Email & Document Transfers
                    </h4>
                    <p className="text-xs text-[#0F3A6B] mt-1 font-mono font-bold hover:underline">
                      k.ukwaja@dpcl-consulting.com
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Secure file limits: max 50MB encrypted PDF.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-slate-200/80 bg-slate-50 rounded-none">
                  <div className="p-2.5 bg-[#0F3A6B] text-white rounded-none shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-serif font-black tracking-wide text-slate-900 uppercase">
                      Administrative Hours
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 font-sans">
                      Monday — Friday: 08:30 to 17:00 (GMT+1 / West Africa Time)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate stamp block */}
            <div className="mt-12 pt-6 border-t border-slate-100 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="border border-slate-300 p-2.5 rounded-none shrink-0 text-slate-500">
                  <Award size={24} className="stroke-[1.5]" />
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  <p className="font-bold text-slate-800 uppercase">FISCAL AUDITING COMPLIANCE CERTIFICATION</p>
                  <p className="mt-0.5 font-mono">ID Code: DPCL-SEC/99R-22</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Professional Consultation Briefing Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-slate-200 shadow-sm rounded-none">
            {formSuccess ? (
              <div className="py-12 px-4 text-center space-y-6">
                <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-800 flex items-center justify-center rounded-none">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-black text-slate-900 uppercase tracking-tight">
                    COMMUNICATION DOCUMENT LOGGED
                  </h3>
                  <p className="text-slate-600 text-xs mt-2 font-sans max-w-md mx-auto leading-relaxed">
                    Thank you. Your consultation profile has been successfully ingested into our private administrative database. A copy was routed to Ukwaja Kingsley's executive inbox.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-none max-w-sm mx-auto text-left font-mono">
                  <p className="text-[10px] text-slate-500">SYSTEM DATA METRIC REPORT:</p>
                  <div className="mt-2 space-y-1 text-xs">
                    <p className="text-slate-700"><strong>Appraisal Ticket:</strong> {submissionId}</p>
                    <p className="text-slate-700"><strong>Queue Status:</strong> Zonal Advisory Review</p>
                    <p className="text-slate-700"><strong>Priority Status:</strong> High Active Routing</p>
                  </div>
                </div>

                <button
                  onClick={() => setFormSuccess(false)}
                  className="bg-[#0F3A6B] text-white hover:bg-[#0B2C52] text-xs font-serif tracking-widest font-black uppercase rounded-none py-3 px-8 transition-colors cursor-pointer"
                >
                  LOAD ANOTHER INQUIRY FORM
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-none flex items-start gap-3">
                  <ShieldAlert size={18} className="text-[#0F3A6B] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                    You are transmitting an official request. Please provide accurate donor or government affiliation to ensure correct routing in our executive queue.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-serif font-black tracking-wider text-slate-700 uppercase mb-2">
                      Full Name / Representative
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Honorable Delegate / Dr. Bello"
                      className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-none focus:outline-none focus:border-[#0F3A6B] focus:ring-1 focus:ring-[#0F3A6B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-black tracking-wider text-slate-700 uppercase mb-2">
                      Organization / Agency / Ministry
                    </label>
                    <input
                      type="text"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder="e.g. Gates Foundation / Kaduna Ministry of Health"
                      className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-none focus:outline-none focus:border-[#0F3A6B] focus:ring-1 focus:ring-[#0F3A6B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-serif font-black tracking-wider text-slate-700 uppercase mb-2">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rep@agency.org"
                      className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-none focus:outline-none focus:border-[#0F3A6B] focus:ring-1 focus:ring-[#0F3A6B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-black tracking-wider text-slate-700 uppercase mb-2">
                      Direct Secure Phone (Include Country Code)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +234 803 000 0000"
                      className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-none focus:outline-none focus:border-[#0F3A6B] focus:ring-1 focus:ring-[#0F3A6B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif font-black tracking-wider text-slate-700 uppercase mb-2">
                    Appraisal Priority Level
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['low', 'medium', 'high', 'urgent'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, priority: lvl }))}
                        className={`py-2 text-[10px] font-mono tracking-widest uppercase border text-center font-bold cursor-pointer rounded-none transition-all ${
                          formData.priority === lvl
                            ? 'bg-[#0F3A6B] border-[#0F3A6B] text-white'
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif font-black tracking-wider text-slate-700 uppercase mb-2">
                    Briefing Subject Heading
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Subnational Health Insurance Policy Alignment Audit"
                    className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-none focus:outline-none focus:border-[#0F3A6B] focus:ring-1 focus:ring-[#0F3A6B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-black tracking-wider text-slate-700 uppercase mb-2">
                    Detailed Advisory Request / Context Outline
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Outline the parameters of your project, target states or zones, policy bottlenecks, and required alignment audit outcomes..."
                    className="w-full text-xs font-sans tracking-wide p-3 border border-slate-200 bg-white rounded-none focus:outline-none focus:border-[#0F3A6B] focus:ring-1 focus:ring-[#0F3A6B]"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0F3A6B] hover:bg-[#0B2C52] text-white font-serif font-black tracking-widest text-xs uppercase rounded-none py-4 px-6 flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-sm"
                  >
                    {isSubmitting ? (
                      <span>SECURELY LOGGING INFORMATION...</span>
                    ) : (
                      <>
                        <Send size={13} className="fill-current" />
                        <span>SUBMIT ADVISORY BRIEF TO DIRECTORS</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
