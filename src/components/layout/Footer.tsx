import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '../ui/Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040405] text-[#F5F2EB] pt-14 sm:pt-20 pb-8 sm:pb-12 border-t border-white/[0.08] overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[700px] h-[150px] sm:h-[250px] bg-[#FF4D00]/5 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-16 border-b border-white/[0.08]">
          {/* Col 1: Brand & Positioning */}
          <div className="sm:col-span-2 md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-[#1E1E24] to-[#121216] border border-white/10 flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-[#FF4D00] shrink-0">
                SJ
              </div>
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">Suman Jana</h3>
                <span className="text-[11px] sm:text-xs font-mono text-zinc-400 block">Full-Stack Developer & Software Engineer</span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm max-w-md font-light leading-relaxed">
              Engineering reliable commercial web applications, enterprise ERPs, and Restaurant POS systems for businesses worldwide. Available for freelance contracts.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] sm:text-xs font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for New Projects</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2.5 sm:space-y-3 font-mono text-xs">
            <span className="text-zinc-500 uppercase tracking-widest block font-bold mb-3 sm:mb-4 text-[10px] sm:text-xs">
              Navigation
            </span>
            {[
              { label: 'Work & Case Studies', href: '#work' },
              { label: 'Freelance Services', href: '#services' },
              { label: 'Why Work With Me', href: '#why-me' },
              { label: 'Engineering Process', href: '#process' },
              { label: 'About & Principles', href: '#about' },
              { label: 'Experience Record', href: '#experience' },
              { label: 'Start a Project', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-zinc-400 hover:text-white transition-colors py-0.5"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Col 3: Direct Connect */}
          <div className="md:col-span-3 space-y-2.5 sm:space-y-3 font-mono text-xs">
            <span className="text-zinc-500 uppercase tracking-widest block font-bold mb-3 sm:mb-4 text-[10px] sm:text-xs">
              Connect
            </span>
            <a
              href="mailto:sumanjana9692@gmail.com"
              className="flex items-center gap-2 text-zinc-400 hover:text-[#FF4D00] transition-colors py-0.5 break-all"
            >
              <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>sumanjana9692@gmail.com</span>
            </a>
            <a
              href="https://github.com/Suman-tech96"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors py-0.5"
            >
              <GithubIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>github.com/Suman-tech96</span>
            </a>
            <a
              href="https://www.linkedin.com/in/suman-jana-a5bb92357/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors py-0.5"
            >
              <LinkedinIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#00F0FF] shrink-0" />
              <span>LinkedIn / Suman Jana</span>
            </a>
            <a
              href="https://wa.me/8144591856"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors py-0.5"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] sm:text-xs text-zinc-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Suman Jana. All rights reserved.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#FF4D00]/50 hover:text-white transition-all group min-h-[36px]"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[#FF4D00] transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
