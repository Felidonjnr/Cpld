import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Clock, Send, ShieldAlert, ArrowRight, Printer } from 'lucide-react';
import { ConsultationInquiry } from '../types';

interface ContactProps {
  partnerConsultationTopic?: string;
  clearTopic: () => void;
  prefilledData: Partial<ConsultationInquiry> | null;
  clearPrefilledData: () => void;
}

export default function Contact({ partnerConsultationTopic, clearTopic, prefilledData, clearPrefilledData }: ContactProps) {
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
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionTicket, setSubmissionTicket] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Auto-fill form topic when a partner refers inquiry from another section
  useEffect(() => {
    if (partnerConsultationTopic) {
      setFormData(prev => ({
        ...prev,
        subject: `Corporate Consultation regarding ${partnerConsultationTopic}`,
        message: `Dear MD, I was reviewing the professional profile of ${partnerConsultationTopic} and would appreciate to schedule a private advisory brief with respect to our upcoming subnational development initiatives.`
      }));
    }
  }, [partnerConsultationTopic]);

  // Handle alignment prefilled calculations
  useEffect(() => {
    if (prefilledData) {
      setFormData(prev => ({
        ...prev,
        ...prefilledData
      }));
      clearPrefilledData();
    }
  }, [prefilledData, clearPrefilledData]);

  const validate = () => {
    const activeErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) activeErrors.fullName = "Full name is required";
    if (!formData.organization.trim()) activeErrors.organization = "Organization name is required";
    if (!formData.email.trim()) {
      activeErrors.email = "Business email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      activeErrors.email = "Please input a valid business email address";
    }
    if (!formData.subject.trim()) activeErrors.subject = "Subject description is required";
    if (!formData.message.trim()) activeErrors.message = "Message specification is required";
    
    setErrors(activeErrors);
    return Object.keys(activeErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate luxury API security latency
    setTimeout(() => {
      // Create a unique submission ticket ID
      const uniqueId = `DPCL-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Save submission logs inside localStorage for genuine persistent accountability
      const submissions = JSON.parse(localStorage.getItem('dpcl_inquiries') || '[]');
      const newInquiry = { 
        ...formData, 
        id: uniqueId, 
        timestamp: new Date().toISOString() 
      };
      submissions.push(newInquiry);
      localStorage.setItem('dpcl_inquiries', JSON.stringify(submissions));

      setIsSubmitting(false);
      setIsSuccess(true);
      setSubmissionTicket(uniqueId);
      clearTopic(); // clear topic
    }, 1800);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      organization: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
    setIsSuccess(false);
    setSubmissionTicket(null);
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-slate-50 text-slate-950 border-b border-[#C5A880]/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-[#C5A880]/20 pb-12 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <span className="text-[10px] font-sans tracking-[0.25em] font-semibold text-[#C5A880] uppercase">
              Bilateral Channels
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-slate-900 leading-tight">
              Partner Operations Office
            </h2>
          </div>
          <p className="text-sm font-sans tracking-wide text-gray-500 max-w-sm font-light leading-relaxed">
            Ready to secure a performance-driven advisory partnership? Detail your institutional program scope below for immediate review.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Panel: Direct channels & map indicator (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-950 text-white p-8 relative overflow-hidden border border-[#C5A880]/30 shadow-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C5A880]/10 to-transparent pointer-events-none" />
              
              <h3 className="text-lg font-serif tracking-tight text-white mb-6">
                DPCL Global Headquarters
              </h3>

              <div className="space-y-6">
                {/* Physical Location Marker */}
                <div className="flex items-start space-x-3.5">
                  <MapPin size={18} className="text-[#C5A880] mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-sans tracking-widest text-[#C5A880] uppercase font-bold block">
                      Physical Secretariat
                    </span>
                    <p className="text-xs font-sans tracking-wide text-gray-300 leading-relaxed font-light">
                      Suite 302, Capital Plaza,<br />
                      66 Adetokunbo Ademola Crescent,<br />
                      Wuse II, Abuja, Nigeria.
                    </p>
                  </div>
                </div>

                {/* Telephone Channels */}
                <div className="flex items-start space-x-3.5">
                  <Phone size={18} className="text-[#C5A880] mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-sans tracking-widest text-[#C5A880] uppercase font-bold block">
                      Secure Hotlines
                    </span>
                    <p className="text-xs font-sans tracking-wide text-gray-300 leading-relaxed font-light">
                      <a href="tel:+23494600000" className="hover:text-white transition-colors block">
                        +234 (0) 9 460 0000
                      </a>
                      <a href="tel:+2348030000000" className="hover:text-white transition-colors block">
                        +234 (0) 803 000 0000
                      </a>
                    </p>
                  </div>
                </div>

                {/* Direct Mail Routing */}
                <div className="flex items-start space-x-3.5">
                  <Mail size={18} className="text-[#C5A880] mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-sans tracking-widest text-[#C5A880] uppercase font-bold block">
                      Direct Inquiries
                    </span>
                    <p className="text-xs font-sans tracking-wide text-gray-300 leading-relaxed font-light">
                      <a href="mailto:office@dpcl-consulting.com" className="hover:text-white transition-colors block break-all">
                        office@dpcl-consulting.com
                      </a>
                      <a href="mailto:projects@dpcl-consulting.com" className="hover:text-white transition-colors block break-all">
                        projects@dpcl-consulting.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Secure accountability stamp */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[9px] font-mono tracking-widest text-gray-400">
                <span>SECURED AES-256 CHANNELS</span>
                <span className="text-[#C5A880]">VERIFIED</span>
              </div>
            </div>

            {/* Stylized Abuja Office Location Area Accent */}
            <div className="border border-slate-200 p-6 bg-white space-y-4">
              <h4 className="text-xs font-sans tracking-widest uppercase font-bold text-slate-800">
                Regional Subnational Coverage
              </h4>
              <p className="text-[11px] font-sans text-gray-500 leading-relaxed font-light">
                Our operations portfolio reaches multiple state zones, providing on-the-ground technical advice to regional hubs in Abuja, Kaduna, Enugu, and Rivers State.
              </p>
              {/* Abstract Map Line Drawing graphic frame */}
              <div id="abstract-map-panel" className="h-28 bg-slate-100 border border-slate-200/50 flex flex-col items-center justify-center relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full text-[#C5A880]/20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 50 Q100 20 200 80 T300 40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                  <path d="M50 10 Q150 90 250 20 T350 100" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="180" cy="50" r="4" fill="#C5A880" />
                  <circle cx="180" cy="50" r="10" fill="none" stroke="#C5A880" strokeWidth="0.5" className="animate-ping" />
                  <circle cx="240" cy="30" r="3" fill="#C5A880" fillOpacity="0.5" />
                  <circle cx="110" cy="70" r="3" fill="#C5A880" fillOpacity="0.5" />
                </svg>
                <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase relative z-10 font-medium">
                  ABUJA HQ LAT 9.0765° N
                </span>
              </div>
            </div>

          </div>

          {/* Right Panel: Interactive Form (8 Columns) */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200 p-8 md:p-12 shadow-sm rounded-none">
              
              {isSuccess ? (
                /* Success Ticket display state */
                <div id="contact-success-ticket" className="text-center py-8 space-y-6">
                  <div className="inline-flex p-4 bg-emerald-50 text-emerald-600 rounded-full">
                    <CheckCircle size={36} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-slate-900">
                      Inquiry Logged Securely
                    </h3>
                    <p className="text-xs font-sans tracking-wide text-gray-500 max-w-md mx-auto">
                      Thank you. Your strategic partnership submission has been parsed. A private verification ticket was constructed for your reference records.
                    </p>
                  </div>

                  {/* High Quality Printable Ticket Frame */}
                  <div className="border border-[#C5A880]/30 bg-slate-950 p-6 text-left max-w-md mx-auto space-y-4 text-white relative">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#C5A880]/20 to-transparent pointer-events-none" />
                    
                    <div className="flex justify-between items-center border-b border-[#C5A880]/15 pb-3">
                      <div>
                        <span className="text-[10px] font-serif tracking-widest text-white leading-none font-bold block">
                          DPCL ADVISORY
                        </span>
                        <span className="text-[7px] font-sans tracking-[0.2em] text-[#C5A880] uppercase">
                          Bilateral Submission Log
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#C5A880]">
                        {submissionTicket}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-sans font-light">
                      <div className="flex justify-between"><span className="text-gray-400 font-normal">Donor App:</span> <span className="text-white font-medium">{formData.fullName}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400 font-normal">Agency:</span> <span className="text-white font-medium">{formData.organization}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400 font-normal">Contact email:</span> <span className="text-white font-medium">{formData.email}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400 font-normal">Routing code:</span> <span className="text-white font-medium">EST-ST-Z9</span></div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-normal">Priority Clearance:</span> 
                        <span className={`text-[9px] px-2 py-0.5 rounded-none font-bold uppercase ${
                          formData.priority === 'urgent' ? 'bg-red-950 text-red-400 border border-red-800' :
                          formData.priority === 'high' ? 'bg-[#C5A880]/20 text-[#C5A880]' :
                          'bg-slate-900 text-gray-300'
                        }`}>
                          {formData.priority}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#C5A880]/15 flex items-center justify-between text-[8px] font-mono text-gray-500">
                      <span>SECURE RECORD REPLICATION IP-V6</span>
                      <span>STATUS: SEALED</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <button
                      id="ticket-print-trigger"
                      onClick={() => window.print()}
                      className="flex items-center gap-2 text-xs font-sans font-semibold tracking-wider text-gray-500 hover:text-slate-950 px-4 py-2 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <Printer size={13} />
                      <span>Print Ticket</span>
                    </button>
                    
                    <button
                      id="reset-form-btn"
                      onClick={resetForm}
                      className="bg-transparent border border-[#C5A880] hover:bg-[#C5A880]/10 text-[#C5A880] px-5 py-2.5 text-xs font-sans tracking-widest uppercase font-medium rounded-none transition-all duration-300 cursor-pointer"
                    >
                      Log Another Request
                    </button>
                  </div>
                </div>
              ) : (
                /* Primary Contact form input state */
                <form id="donor-inquiry-form" onSubmit={handleFormSubmit} className="space-y-6">
                  
                  {/* Title Banner inside the form */}
                  <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase font-bold">
                        Form DC-901
                      </span>
                      <h3 className="text-lg font-serif font-bold text-[#0F172A] mt-1">
                        Bilateral Partnership Protocol
                      </h3>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-[9px] font-sans tracking-wide text-gray-400 bg-slate-50 py-1 px-2.5 border border-slate-100 uppercase">
                      <Clock size={10} className="text-[#C5A880]" />
                      <span>Response &lt; 24h</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name input */}
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-[10px] font-sans tracking-widest font-bold uppercase text-slate-700 block">
                        Full Name / Principal Correspondent *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full bg-slate-50 border px-4 py-3 text-xs font-sans transition-colors duration-200 outline-none rounded-none focus:bg-white focus:border-[#C5A880] ${
                          errors.fullName ? 'border-red-400' : 'border-slate-200'
                        }`}
                        placeholder="e.g. Director General"
                      />
                      {errors.fullName && <p className="text-[10px] font-sans text-red-500 font-medium">{errors.fullName}</p>}
                    </div>

                    {/* Organization input */}
                    <div className="space-y-2">
                      <label htmlFor="organization" className="text-[10px] font-sans tracking-widest font-bold uppercase text-slate-700 block">
                        Corporate / Donor / Sovereign Org *
                      </label>
                      <input
                        type="text"
                        name="organization"
                        id="organization"
                        required
                        value={formData.organization}
                        onChange={handleInputChange}
                        className={`w-full bg-slate-50 border px-4 py-3 text-xs font-sans transition-colors duration-200 outline-none rounded-none focus:bg-white focus:border-[#C5A880] ${
                          errors.organization ? 'border-red-400' : 'border-slate-200'
                        }`}
                        placeholder="e.g. FCDO Advisory Committee"
                      />
                      {errors.organization && <p className="text-[10px] font-sans text-red-500 font-medium">{errors.organization}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Business Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-sans tracking-widest font-bold uppercase text-slate-700 block">
                        Direct Business Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-slate-50 border px-4 py-3 text-xs font-sans transition-colors duration-200 outline-none rounded-none focus:bg-white focus:border-[#C5A880] ${
                          errors.email ? 'border-red-400' : 'border-slate-200'
                        }`}
                        placeholder="dg.nominee@agency.gov.int"
                      />
                      {errors.email && <p className="text-[10px] font-sans text-red-500 font-medium">{errors.email}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-[10px] font-sans tracking-widest font-bold uppercase text-slate-700 block">
                        Secure Contact Telephone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs font-sans outline-none rounded-none focus:bg-white focus:border-[#C5A880] transition-colors"
                        placeholder="e.g. +44 20 7946 0000"
                      />
                    </div>
                  </div>

                  {/* Priority level select & Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Priority select */}
                    <div className="space-y-2 md:col-span-4">
                      <label htmlFor="priority" className="text-[10px] font-sans tracking-widest font-bold uppercase text-slate-700 block">
                        Clearance Priority
                      </label>
                      <select
                        name="priority"
                        id="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs font-sans outline-none rounded-none focus:bg-white focus:border-[#C5A880] transition-colors appearance-none cursor-pointer"
                      >
                        <option value="low">Standard Brief (3-5 days)</option>
                        <option value="medium">Direct (48-hr respond)</option>
                        <option value="high">Urgent Call Schedule</option>
                        <option value="urgent">Critical Brief Intervention</option>
                      </select>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2 md:col-span-8">
                      <label htmlFor="subject" className="text-[10px] font-sans tracking-widest font-bold uppercase text-slate-700 block">
                        Summary Advisory Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full bg-slate-50 border px-4 py-3 text-xs font-sans transition-colors duration-200 outline-none rounded-none focus:bg-white focus:border-[#C5A880] ${
                          errors.subject ? 'border-red-400' : 'border-slate-200'
                        }`}
                        placeholder="e.g. Kaduna health delivery finance alignment"
                      />
                      {errors.subject && <p className="text-[10px] font-sans text-red-500 font-medium">{errors.subject}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-sans tracking-widest font-bold uppercase text-slate-700 block">
                      Comprehensive Partnership Description & Program Bounds *
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-50 border px-4 py-3 text-xs font-sans transition-colors duration-200 outline-none rounded-none focus:bg-white focus:border-[#C5A880] resize-y ${
                        errors.message ? 'border-red-400' : 'border-slate-200'
                      }`}
                      placeholder="Outline target state zones, donor accountability margins, scope of clinical delivery or governmental transparency expectations..."
                    />
                    {errors.message && <p className="text-[10px] font-sans text-red-500 font-medium">{errors.message}</p>}
                  </div>

                  {/* Terms and compliance notice */}
                  <div className="pt-2 flex items-start gap-3 text-[10px] font-sans tracking-wide text-gray-400 leading-normal font-light bg-slate-50/50 p-4 border border-slate-100">
                    <ShieldAlert size={14} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <span>
                      Submission of this consultation record indicates consent under our bilateral audit protocols. Your organizational requirements will be held in strict confidentiality and will never be shared beyond our senior partners.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex justify-end">
                    <button
                      id="submit-inquiry-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className={`group flex items-center justify-center gap-3 bg-slate-950 border border-slate-950 text-white hover:bg-[#C5A880] hover:text-slate-950 hover:border-[#C5A880] px-8 py-3.5 text-xs font-sans tracking-[0.25em] font-medium uppercase rounded-none transition-all duration-300 w-full md:w-auto cursor-pointer ${
                        isSubmitting ? 'opacity-85 pointer-events-none' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-[#C5A880]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Validating Credentials...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Secure Brief</span>
                          <Send size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
