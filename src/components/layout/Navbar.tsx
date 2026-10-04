import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import sjLogo from '../../assets/SJ logo.jpeg';

interface NavbarProps {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ isAudioPlaying, onToggleAudio, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Why Me', href: '#why-me' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navOffset = 70;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleStartProject = () => {
    setIsMobileMenuOpen(false);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#000000]/85 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo & Monogram */}
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="group flex items-center gap-2.5 sm:gap-3 shrink-0"
            >
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full overflow-hidden border border-white/20 bg-black shadow-[0_0_12px_rgba(255,255,255,0.15)] group-hover:border-[#FF4D00]/60 transition-all shrink-0 p-0.5">
                <img
                  src={sjLogo}
                  alt="Suman Jana Logo"
                  className="h-full w-full object-cover rounded-full group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F5F2EB] group-hover:text-[#FF4D00] transition-colors leading-tight uppercase">
                  Suman Jana
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                  Full-Stack Software Engineer
                </span>
              </div>
            </a>

            {/* Middle: Floating Nav Links (Visible when scrolled) */}
            <nav
              className={`hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md transition-all duration-300 ${
                isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative px-3 py-1 text-xs font-medium tracking-wide transition-all rounded-full ${
                      isActive
                        ? 'text-white bg-white/10 font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-3 bg-[#FF4D00] rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Action Cluster for Desktop */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              
              {/* Audio toggle button with animated Luz Roja sound bars */}
              <button
                type="button"
                onClick={onToggleAudio}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border text-[10px] sm:text-xs font-mono tracking-wider transition-all min-h-[34px] ${
                  isAudioPlaying
                    ? 'border-[#FF4D00]/50 bg-[#FF4D00]/15 text-[#FF4D00] shadow-[0_0_15px_rgba(255,77,0,0.25)]'
                    : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-[#FF4D00]/40'
                }`}
                title={isAudioPlaying ? 'Mute soundtrack' : 'Play Luz Roja soundtrack'}
                aria-label="Toggle Luz Roja audio track"
              >
                {isAudioPlaying ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00] animate-ping" />
                    <span className="text-[#FF4D00] font-bold">AUDIO ON</span>
                    <div className="flex items-end gap-[2px] h-3 ml-0.5">
                      <span className="w-[2px] bg-[#FF4D00] rounded-full animate-music-bar-1" />
                      <span className="w-[2px] bg-[#FF4D00] rounded-full animate-music-bar-2" />
                      <span className="w-[2px] bg-[#FF4D00] rounded-full animate-music-bar-3" />
                      <span className="w-[2px] bg-[#FF4D00] rounded-full animate-music-bar-4" />
                    </div>
                  </>
                ) : (
                  <>
                    <VolumeX className="h-3.5 w-3.5 text-zinc-500" />
                    <span>AUDIO</span>
                  </>
                )}
              </button>

              {/* Get in Touch / Start a Project CTA Button */}
              <button
                type="button"
                onClick={handleStartProject}
                className="group flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 hover:border-[#FF4D00] bg-white/[0.04] hover:bg-[#FF4D00] text-xs font-mono font-bold tracking-widest uppercase text-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(255,77,0,0.4)] active:scale-95"
              >
                <span>{isScrolled ? 'Start a Project' : 'Get in Touch'}</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Mobile Action Group */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Mobile Audio Button */}
              <button
                type="button"
                onClick={onToggleAudio}
                className={`p-2 rounded-full border text-xs font-mono transition-all ${
                  isAudioPlaying
                    ? 'border-[#FF4D00]/50 bg-[#FF4D00]/15 text-[#FF4D00]'
                    : 'border-white/10 bg-white/[0.03] text-zinc-400'
                }`}
                title={isAudioPlaying ? 'Mute' : 'Play audio'}
                aria-label="Toggle audio"
              >
                {isAudioPlaying ? (
                  <Volume2 className="h-4 w-4 text-[#FF4D00] animate-pulse" />
                ) : (
                  <VolumeX className="h-4 w-4 text-zinc-500" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 md:hidden">
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4D00]">Navigation</span>
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-2xl font-display font-bold transition-colors ${
                      isActive ? 'text-[#FF4D00]' : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={handleStartProject}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#FF4D00] text-black font-bold uppercase tracking-wider text-xs shadow-lg active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
