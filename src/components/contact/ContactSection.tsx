import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Mail,
  Send,
  CheckCircle2,
  MessageSquare,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '../ui/Icons';

interface ContactSectionProps {
  initialProjectInquiry?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialProjectInquiry = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: initialProjectInquiry || 'Full-Stack Web App',
    budget: '$1,000 — $3,000',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    if (initialProjectInquiry) {
      setFormData((prev) => ({
        ...prev,
        projectType: initialProjectInquiry,
        message: prev.message || `Hi Suman, I would like to discuss building a project similar to ${initialProjectInquiry}.`,
      }));
    }
  }, [initialProjectInquiry]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please provide a brief project description.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#FF4D00', '#00F0FF', '#FFFFFF'],
          });
        } catch (err) {}
        setStatus('success');
      } else {
        throw new Error(result.message || 'Server failed to send email.');
      }
    } catch (err: any) {
      console.warn('Nodemailer API error:', err.message);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to send message. Please click below to email directly.');
    }
  };

  const handleOpenDirectEmail = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} - ${formData.name}`);
    const body = encodeURIComponent(
      `Client Name: ${formData.name}\nClient Email: ${formData.email}\nCompany: ${formData.company || 'N/A'}\nProject Type: ${formData.projectType}\nBudget Range: ${formData.budget}\n\nProject Scope & Message:\n${formData.message}`
    );
    window.location.href = `mailto:sumanjana9692@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-36 bg-[#060608]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#FF4D00]/10 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-4 sm:right-10 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#00F0FF]/5 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00]" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#FF4D00] uppercase font-bold">
            08 / INITIATE ENGAGEMENT
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start mt-4 sm:mt-6">
          {/* Left Column: Direct Pitch & Contacts */}
          <div className="lg:col-span-5">
            <h2 className="font-display font-bold text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight uppercase leading-[1.08]">
              Have a project <br />
              <span className="text-gradient-flame">in mind?</span> <br />
              <span className="text-zinc-500 font-serifDisplay italic lowercase">
                let's build it right.
              </span>
            </h2>

            <p className="mt-4 sm:mt-6 text-zinc-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              Whether you are launching a new commercial web application, replacing fragile spreadsheets with a custom ERP, or need a robust Restaurant POS system — I am available for independent freelance contracts.
            </p>

            {/* Direct Contact Cards */}
            <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
              <a
                href="mailto:sumanjana9692@gmail.com"
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#FF4D00]/50 hover:bg-[#FF4D00]/5 transition-all"
              >
                <div className="flex items-center gap-3 sm:gap-3.5 truncate pr-2">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-white/5 flex items-center justify-center text-[#FF4D00] group-hover:scale-110 transition-transform shrink-0">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                      Direct Email
                    </span>
                    <span className="text-xs sm:text-base font-mono font-medium text-white group-hover:text-[#FF4D00] transition-colors truncate block">
                      sumanjana9692@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors shrink-0" />
              </a>

              <a
                href="https://wa.me/8144591856?text=Hi%20Suman%2C%20I%20am%20interested%20in%20discussing%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
              >
                <div className="flex items-center gap-3 sm:gap-3.5">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                    <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                      Direct WhatsApp
                    </span>
                    <span className="text-xs sm:text-base font-mono font-medium text-white group-hover:text-emerald-400 transition-colors">
                      Quick Chat & Audio Calls
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors shrink-0" />
              </a>

              <div className="flex flex-col xs:flex-row items-stretch gap-2.5 sm:gap-3 pt-1">
                <a
                  href="https://www.linkedin.com/in/suman-jana-a5bb92357/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-white/30 text-xs font-mono transition-all"
                >
                  <LinkedinIcon className="h-4 w-4 text-[#00F0FF]" />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href="https://github.com/Suman-tech96"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-white/30 text-xs font-mono transition-all"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub Code</span>
                </a>
              </div>
            </div>

            {/* Commitment Pledge */}
            <div className="mt-6 sm:mt-8 p-3.5 sm:p-4 rounded-xl border border-white/5 bg-white/[0.01] text-xs font-mono text-zinc-400">
              <span className="text-emerald-400 font-bold block mb-1">✓ DIRECT DEVELOPER ACCESS</span>
              Every inquiry is reviewed personally by Suman Jana within 24 hours. No sales spam.
            </div>
          </div>

          {/* Right Column: Lead Conversion Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl relative">
              {status === 'success' ? (
                <div className="py-8 sm:py-12 text-center space-y-4 sm:space-y-5 animate-in fade-in duration-300">
                  <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-white">
                    Inquiry Received!
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm md:text-base max-w-md mx-auto font-light leading-relaxed">
                    Thank you, <strong className="text-white font-medium">{formData.name}</strong>. I will review your requirements for <strong className="text-[#FF4D00]">{formData.projectType}</strong> and get back to you within 24 hours.
                  </p>
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleOpenDirectEmail}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white hover:bg-white/20 transition-all min-h-[40px]"
                    >
                      Also Send via Mail Client ↗
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#FF4D00] text-black font-semibold text-xs font-mono hover:bg-[#FF6420] transition-all min-h-[40px]"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {errorMessage && (
                    <div className="p-3 sm:p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-300">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-[11px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                        Your Name <span className="text-[#FF4D00]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors min-h-[44px]"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-[11px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                        Email Address <span className="text-[#FF4D00]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors min-h-[44px]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-[11px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                        Company / Business Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Corp / Restaurant / Startup"
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors min-h-[44px]"
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label htmlFor="projectType" className="block text-[11px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        style={{ colorScheme: 'dark' }}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#0d0d0f] border border-white/10 text-white text-xs sm:text-sm font-sans focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors min-h-[44px] cursor-pointer"
                      >
                        <option value="Restaurant POS & KDS System" style={{ background: '#0d0d0f', color: '#f5f2eb' }}>Restaurant POS &amp; KDS System</option>
                        <option value="HDT Quotation Management & ERP" style={{ background: '#0d0d0f', color: '#f5f2eb' }}>HDT Quotation Management &amp; ERP</option>
                        <option value="Full-Stack Web App" style={{ background: '#0d0d0f', color: '#f5f2eb' }}>Full-Stack Web Application</option>
                        <option value="E-Commerce Platform" style={{ background: '#0d0d0f', color: '#f5f2eb' }}>E-Commerce Platform</option>
                        <option value="Backend API & Database Architecture" style={{ background: '#0d0d0f', color: '#f5f2eb' }}>Backend API &amp; Database Architecture</option>
                        <option value="Real-Time WebSocket App" style={{ background: '#0d0d0f', color: '#f5f2eb' }}>Real-Time WebSocket Application</option>
                        <option value="Custom High-End Website" style={{ background: '#0d0d0f', color: '#f5f2eb' }}>Custom High-End Website</option>
                        <option value="Other Digital Solution" style={{ background: '#0d0d0f', color: '#f5f2eb' }}>Other Digital Solution</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="block text-[11px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                      Target Budget Range (USD)
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      style={{ colorScheme: 'dark' }}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#0d0d0f] border border-white/10 text-white text-xs sm:text-sm font-sans focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors min-h-[44px] cursor-pointer"
                    >
                      <option value="Under $1,000" style={{ background: '#0d0d0f', color: '#f5f2eb' }}>Under $1,000 (Scoping / Small System)</option>
                      <option value="$1,000 — $3,000" style={{ background: '#0d0d0f', color: '#f5f2eb' }}>$1,000 — $3,000 (Standard Commercial App)</option>
                      <option value="$3,000 — $5,000" style={{ background: '#0d0d0f', color: '#f5f2eb' }}>$3,000 — $5,000 (Comprehensive System / ERP / POS)</option>
                      <option value="$5,000+" style={{ background: '#0d0d0f', color: '#f5f2eb' }}>$5,000+ (Enterprise Multi-Module Suite)</option>
                      <option value="To Be Discussed" style={{ background: '#0d0d0f', color: '#f5f2eb' }}>To Be Discussed / Flexible</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-[11px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                      Project Description & Requirements <span className="text-[#FF4D00]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about what you are building, key features needed, operational problems to solve, and your ideal timeline..."
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-colors resize-y"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full min-h-[48px] py-3.5 sm:py-4 rounded-xl bg-[#FF4D00] text-black font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-[#FF6420] transition-all shadow-[0_0_30px_rgba(255,77,0,0.4)] disabled:opacity-50 flex items-center justify-center gap-2 active:scale-98"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Start a Conversation</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <div className="flex flex-col xs:flex-row items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-500 gap-1 pt-1">
                    <span>* Required fields</span>
                    <button
                      type="button"
                      onClick={handleOpenDirectEmail}
                      className="hover:text-zinc-300 underline"
                    >
                      Or open default email client
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
};
