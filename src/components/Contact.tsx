import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Landmark, Clock, Send, UploadCloud, FileText, X, Check } from 'lucide-react';
import { siteConfig } from '../data';

export interface ConsultationInquiry {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

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
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle prefilled data transfers
  useEffect(() => {
    if (prefilledData) {
      setFormData(prev => ({
        ...prev,
        fullName: prefilledData.fullName || prev.fullName,
        subject: prefilledData.subject || prev.subject,
        message: prefilledData.message || prev.message,
      }));
      clearPrefilledData();
    }
  }, [prefilledData, clearPrefilledData]);

  useEffect(() => {
    if (partnerConsultationTopic) {
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry regarding Focus Area: ${partnerConsultationTopic}`,
        message: `I would like to inquire about collaboration opportunities in your focus track: "${partnerConsultationTopic}". Please share more details on your initiatives.`
      }));
      clearTopic();
    }
  }, [partnerConsultationTopic, clearTopic]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Drag and Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file: File) => {
    setFileError('');
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith('.pdf')) {
      setFileError('Please upload a PDF document only.');
      return;
    }
    if (file.size > 50 * 1024 * 1024) { // 50MB file size ceiling
      setFileError('File size exceeds the 50MB secure transmission limit.');
      return;
    }
    setPdfFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeAttachedFile = () => {
    setPdfFile(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFileError('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone || 'No Phone Passed',
          subject: formData.subject || 'General Inquiry',
          message: formData.message,
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errMsg = 'Failed to submit inquiry to security database.';
        try {
          const errJson = JSON.parse(errorText);
          errMsg = errJson.error || errMsg;
        } catch (_) {}
        throw new Error(errMsg);
      }

      const resData = await response.json();
      const generatedId = resData.inquiry ? resData.inquiry.id : `DPCL-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionId(generatedId);
      setFormSuccess(true);
      
      // Save client backup copy in localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('dpcl_local_inquiries') || '[]');
        existing.push({
          id: generatedId,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone || 'No Phone Passed',
          subject: formData.subject || 'General Inquiry',
          message: formData.message,
          attachedFile: pdfFile ? pdfFile.name : null,
          timestamp: new Date().toISOString(),
          read: false
        });
        localStorage.setItem('dpcl_local_inquiries', JSON.stringify(existing));
      } catch (err) {
        console.warn("Could not save secondary client copy to localStorage:", err);
      }

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      console.error("Submission failed on server:", err);
      setFileError(err.message || 'Error communicating with security servers. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormSuccess(false);
    setPdfFile(null);
    setFileError('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      {/* Subtly curved dynamic background panel section */}
      <div className="absolute inset-y-0 right-0 w-1/3 bg-slate-50/50 hidden lg:block border-l border-slate-100 rounded-l-[40px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: General / Partner Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-between" id="office-secretariat">
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-[#0F3A6B] tracking-wider font-bold mb-3 uppercase">
                <Landmark size={12} className="text-[#3b82f6]" />
                <span>INQUIRIES & ENGAGEMENT</span>
              </div>
              
              <h2 className="font-sans text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-none uppercase relative pb-4 text-left">
                GET IN TOUCH WITH US
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-[#0F3A6B] to-[#3b82f6] rounded-full" />
              </h2>
              
              <p className="mt-8 text-sm text-slate-600 leading-relaxed font-sans font-medium text-left">
                Our support desk welcomes General Inquiries, Project Briefs, Partner proposals, and focus track recommendations. Submit the form below to connect with us, and attach relevant briefs directly as a PDF.
              </p>

              {/* Friendly Rounded Details Cards */}
              <div className="mt-10 space-y-4">
                <div className="flex items-start gap-4 p-5 border border-slate-200/60 bg-slate-50 rounded-2xl shadow-xs hover:shadow-md transition-all duration-350 transform hover:-translate-y-0.5 text-left">
                  <div className="p-2.5 bg-[#0F3A6B] text-white rounded-xl shrink-0 shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-xs font-sans font-extrabold tracking-wide text-[#0F3A6B] uppercase">
                        Operational Office
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 font-sans leading-relaxed">
                        {siteConfig.operationalAddress}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <h4 className="text-xs font-sans font-extrabold tracking-wide text-slate-500 uppercase">
                        Registered Address
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 font-sans leading-relaxed">
                        {siteConfig.registeredAddress}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 border border-slate-200/60 bg-slate-50 rounded-2xl shadow-xs hover:shadow-md transition-all duration-350 transform hover:-translate-y-0.5 text-left">
                  <div className="p-2.5 bg-[#0F3A6B] text-white rounded-xl shrink-0 shadow-sm">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-sans font-extrabold tracking-wide text-slate-900 uppercase">
                      Direct Email & Document Transfers
                    </h4>
                    <p className="text-xs text-[#0F3A6B] mt-1 font-mono font-bold hover:underline break-all">
                      {siteConfig.contactEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 border border-slate-200/60 bg-slate-50 rounded-2xl shadow-xs hover:shadow-md transition-all duration-350 transform hover:-translate-y-0.5 text-left">
                  <div className="p-2.5 bg-[#0F3A6B] text-white rounded-xl shrink-0 shadow-sm">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-sans font-extrabold tracking-wide text-slate-900 uppercase">
                      Contact Response Hours
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 font-sans leading-relaxed">
                      {siteConfig.officeHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Friendly Inquiry Form with curved layout, smooth inputs, and PDF support */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-slate-100 shadow-xl rounded-3xl transition-shadow duration-300">
            {formSuccess ? (
              <div className="py-12 px-4 text-center space-y-6">
                <div className="mx-auto w-14 h-14 bg-emerald-100 text-emerald-800 flex items-center justify-center rounded-full shadow-inner animate-bounce">
                  <Check size={26} />
                </div>
                <div>
                  <h3 className="text-xl font-sans font-black text-slate-900 uppercase tracking-tight">
                    Inquiry Logged Successfully
                  </h3>
                  <p className="text-slate-600 text-xs mt-2 font-sans max-w-md mx-auto leading-relaxed font-semibold">
                    Thank you! Your request has been received and parsed. A support representative will review your message and document brief shortly.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl max-w-sm mx-auto text-left font-mono shadow-xs space-y-1 text-xs">
                  <p className="text-[10px] text-slate-400 tracking-wider font-bold mb-2 uppercase">SUBMISSION DETAILS Summary:</p>
                  <p className="text-slate-700"><strong>Inquiry ID:</strong> {submissionId}</p>
                  <p className="text-slate-700"><strong>Queue Status:</strong> Pending Desk Assignee</p>
                  {pdfFile && (
                    <p className="text-emerald-700 flex items-center gap-1 font-sans font-bold text-[11px] mt-2">
                      <FileText size={12} />
                      <span>Document Attached: {pdfFile.name} ({formatFileSize(pdfFile.size)})</span>
                    </p>
                  )}
                </div>

                <button
                  onClick={handleResetForm}
                  className="bg-[#0F3A6B] hover:bg-[#3b82f6] text-white text-xs font-sans tracking-widest font-extrabold uppercase rounded-full py-4 px-10 transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in text-left" onDragEnter={handleDrag}>
                
                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. Isaac Bello"
                      className="w-full text-xs font-sans tracking-wide p-3.5 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 hover:border-slate-300 transition-all shadow-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-2">
                      Direct Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +234 803 000 0000"
                      className="w-full text-xs font-sans tracking-wide p-3.5 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 hover:border-slate-300 transition-all shadow-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-xs font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-2">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. ibello@domain.org"
                      className="w-full text-xs font-sans tracking-wide p-3.5 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 hover:border-slate-300 transition-all shadow-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-2">
                    Inquiry Subject Heading
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. General Inquiry / Health Advisory Partnership Proposal"
                    className="w-full text-xs font-sans tracking-wide p-3.5 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 hover:border-slate-300 transition-all shadow-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-2">
                    Message Details / Request Context
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide details about your inquiry, target programmatic area, or assistance required..."
                    className="w-full text-xs font-sans tracking-wide p-3.5 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 hover:border-slate-300 transition-all shadow-xs font-semibold hover:border-slate-300"
                  />
                </div>

                {/* PDF Document Attachment Section */}
                <div>
                  <label className="block text-xs font-sans font-extrabold tracking-wider text-slate-700 uppercase mb-2">
                    Attach PDF Document (Optional)
                  </label>

                  {/* Hidden Input File Field */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                  />

                  {!pdfFile ? (
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={triggerFileInput}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                        dragActive 
                          ? 'border-[#3b82f6] bg-[#3b82f6]/5 text-[#3b82f6]' 
                          : 'border-slate-200 bg-slate-50/50 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <UploadCloud size={28} className={dragActive ? 'text-[#3b82f6]' : 'text-slate-400'} />
                        <p className="text-xs font-sans font-bold">
                          {dragActive ? "Drop the PDF here" : "Drag & Drop PDF or Click to upload"}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">Any supporting documents or specifications</p>
                      </div>
                    </div>
                  ) : (
                    /* Attached file indicator container */
                    <div className="flex items-center justify-between p-4 bg-[#3b82f6]/5 border border-[#3b82f6]/25 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center shrink-0">
                          <FileText size={18} />
                        </div>
                        <div className="text-left font-sans">
                          <p className="text-[11px] font-extrabold text-[#0F3A6B] truncate max-w-xs sm:max-w-md font-sans">
                            {pdfFile.name}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono">{formatFileSize(pdfFile.size)} • PDF Attached</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeAttachedFile}
                        className="p-1.5 hover:bg-[#3b82f6]/10 text-slate-600 hover:text-[#0F3A6B] rounded-full transition-colors cursor-pointer"
                        title="Remove attached PDF"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  )}

                  {fileError && (
                    <p className="text-red-500 font-sans text-[10px] font-bold mt-1.5 text-left uppercase tracking-wider">
                      {fileError}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0F3A6B] hover:bg-[#3b82f6] text-white font-sans font-extrabold tracking-widest text-xs uppercase rounded-full py-4 px-6 flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING INQUIRY...</span>
                    ) : (
                      <>
                        <Send size={13} className="fill-current" />
                        <span>SEND INQUIRY TO THE TEAM</span>
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
