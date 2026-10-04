import React, { useState } from 'react';
import { MapPin, Globe, Play, Pause, Volume2, Sparkles, Award, Code2, ShieldCheck, Music } from 'lucide-react';
import { BorderGlow } from '../ui/BorderGlow';
import sumanPhoto from '../../assets/Suman photo.jpeg';
import sumanBg from '../../assets/Suman bg.png';
import sjLogo from '../../assets/SJ logo.jpeg';

interface AboutSectionProps {
  isAudioPlaying?: boolean;
  onToggleAudio?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  isAudioPlaying = false, 
  onToggleAudio 
}) => {
  const [viewMode, setViewMode] = useState<'portrait' | 'cinematic'>('portrait');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-36 bg-[#080808] border-b border-white/[0.08] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00]" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#FF4D00] uppercase font-bold">
            06 / BACKGROUND & PRINCIPLES
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start mt-4 sm:mt-6">
          {/* Left Text Narrative */}
          <div className="lg:col-span-7">
            <h2 className="font-display font-bold text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight uppercase leading-[1.1]">
              About Suman Jana — <br />
              <span className="text-gradient-flame">Software Engineer</span> & <br />
              <span className="text-zinc-500 font-serifDisplay italic lowercase">
                digital solutions builder.
              </span>
            </h2>

            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-zinc-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              <p>
                I am a full-stack developer and freelance software engineer based in Balasore, India, working with clients and businesses globally. 
                My focus centers on architecting real business software: systems where downtime, lost orders, or broken data schemas directly hurt the bottom line.
              </p>
              <p>
                Over the past several years, I have engineered mission-critical applications including 
                <strong className="text-white font-medium"> Restaurant POS systems with live Kitchen Display screens</strong>, 
                <strong className="text-white font-medium"> multi-tenant ERP suites with automated GST/HSN billing</strong>, and 
                <strong className="text-white font-medium"> high-concurrency real-time WebSocket communication engines</strong>.
              </p>
              <p>
                I work across the full engineering spectrum — from database schema design and RESTful APIs in Node.js to fast, responsive user interfaces in React and Tailwind CSS.
                When you hire me, you get direct communication, senior architectural ownership, and clean code built for long-term production.
              </p>
            </div>

            {/* Quick Location & Availability Badges */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#FF4D00] shrink-0" />
                <div>
                  <div className="text-xs font-mono text-white font-semibold">Balasore, India</div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-500">Collaborating Worldwide (IST / UTC)</div>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
                <Globe className="h-5 w-5 text-[#00F0FF] shrink-0" />
                <div>
                  <div className="text-xs font-mono text-white font-semibold">100% Freelance Ready</div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-500">Direct Contract & Milestones</div>
                </div>
              </div>
            </div>

            {/* Core Working Philosophy Highlights */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="flex items-start gap-2 text-zinc-400">
                <ShieldCheck className="h-4 w-4 text-[#FF4D00] shrink-0 mt-0.5" />
                <span>Zero bloated templates or unmaintained plugins</span>
              </div>
              <div className="flex items-start gap-2 text-zinc-400">
                <Code2 className="h-4 w-4 text-[#00F0FF] shrink-0 mt-0.5" />
                <span>Strict TypeScript and validated API schemas</span>
              </div>
              <div className="flex items-start gap-2 text-zinc-400">
                <Award className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Complete handover: 100% client code ownership</span>
              </div>
            </div>
          </div>

          {/* Right Engineering Identity & Interactive Portrait Card with BorderGlow */}
          <div className="lg:col-span-5 w-full">
            <BorderGlow
              borderRadius={28}
              glowRadius={42}
              edgeSensitivity={32}
              glowIntensity={1.1}
              animated={true}
              glowColor="24 100 50"
              backgroundColor="#0E0E12"
              colors={['#FF4D00', '#FF8A00', '#00F0FF']}
              className="w-full shadow-2xl"
            >
              <div className="p-5 sm:p-7 relative overflow-hidden">
                {/* Interactive Portrait Stage with 3D Tilt & Flame Aura */}
                <div 
                  className="relative rounded-2xl overflow-hidden bg-black/70 border border-white/10 group cursor-pointer"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                  }}
                >
                  {/* Glowing Ambient Flame Aura behind Photo */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#FF4D00]/30 via-[#FF2600]/20 to-[#00F0FF]/15 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Photo Display with View Switcher Mode */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0A0A0D]">
                    <img
                      src={viewMode === 'portrait' ? sumanPhoto : sumanBg}
                      alt="Suman Jana - Full-Stack Software Engineer"
                      className={`h-full w-full object-cover object-top transition-all duration-700 ${
                        isHovered ? 'scale-105 brightness-105' : 'scale-100'
                      }`}
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-[#0E0E12]/30 to-black/40 pointer-events-none" />

                    {/* Top Bar on Image: Golden Logo + View Switcher */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 gap-2">
                      {/* Golden Monogram Badge */}
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-500/40 shadow-lg">
                        <img 
                          src={sjLogo} 
                          alt="SJ Monogram" 
                          className="h-4 w-4 rounded-full object-cover" 
                        />
                        <span className="font-mono text-[10px] text-amber-300 font-bold tracking-wider uppercase">
                          Suman Jana
                        </span>
                      </div>

                      {/* View Switcher: Portrait vs Cinematic */}
                      <div className="inline-flex items-center p-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setViewMode('portrait'); }}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-all ${
                            viewMode === 'portrait'
                              ? 'bg-[#FF4D00] text-black font-bold shadow-sm'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          Studio
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setViewMode('cinematic'); }}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-all ${
                            viewMode === 'cinematic'
                              ? 'bg-[#FF4D00] text-black font-bold shadow-sm'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          Neon
                        </button>
                      </div>
                    </div>

                    {/* Bottom Floating Info & Audio Player on Image */}
                    <div className="absolute bottom-3 inset-x-3 z-10 space-y-2">
                      {/* Live Availability Status */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-md text-emerald-300 text-[10px] font-mono">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>AVAILABLE FOR FREELANCE & CONTRACTS</span>
                      </div>

                      {/* Luz Roja Interactive Soundtrack Player Pill */}
                      {onToggleAudio && (
                        <div 
                          onClick={(e) => { e.stopPropagation(); onToggleAudio(); }}
                          className={`flex items-center justify-between gap-3 px-3 py-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
                            isAudioPlaying
                              ? 'bg-[#FF4D00]/20 border-[#FF4D00]/50 shadow-[0_0_20px_rgba(255,77,0,0.3)]'
                              : 'bg-black/80 border-white/15 hover:border-white/30'
                          }`}
                          title={isAudioPlaying ? 'Pause Luz Roja' : 'Play Luz Roja soundtrack'}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="h-6 w-6 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                              {isAudioPlaying ? (
                                <Pause className="h-3 w-3 text-[#FF4D00]" />
                              ) : (
                                <Play className="h-3 w-3 text-white ml-0.5" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-mono uppercase font-bold text-white tracking-wider truncate">
                                  Luz Roja
                                </span>
                                <span className="text-[9px] font-mono text-[#FF4D00]">Studio Vibe</span>
                              </div>
                              <span className="text-[9px] font-mono text-zinc-400 block truncate">
                                {isAudioPlaying ? 'Playing high-energy soundtrack' : 'Click to play soundtrack'}
                              </span>
                            </div>
                          </div>

                          {/* Animated Soundwave Equalizer Bars */}
                          {isAudioPlaying ? (
                            <div className="flex items-end gap-[3px] h-4 shrink-0">
                              <span className="w-[3px] bg-[#FF4D00] rounded-full animate-music-bar-1" />
                              <span className="w-[3px] bg-[#FF4D00] rounded-full animate-music-bar-2" />
                              <span className="w-[3px] bg-[#FF4D00] rounded-full animate-music-bar-3" />
                              <span className="w-[3px] bg-[#FF4D00] rounded-full animate-music-bar-4" />
                            </div>
                          ) : (
                            <Volume2 className="h-4 w-4 text-zinc-500 shrink-0" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Developer Profile Matrix */}
                <div className="py-4 sm:py-5 space-y-2.5 font-mono text-xs">
                  <div className="flex flex-col xs:flex-row xs:justify-between py-1.5 border-b border-white/5 gap-1">
                    <span className="text-zinc-500 uppercase text-[10px] sm:text-xs">Primary Stack</span>
                    <span className="text-zinc-200 text-[11px] sm:text-xs font-semibold">MERN (Mongo, Express, React, Node)</span>
                  </div>
                  <div className="flex flex-col xs:flex-row xs:justify-between py-1.5 border-b border-white/5 gap-1">
                    <span className="text-zinc-500 uppercase text-[10px] sm:text-xs">Languages</span>
                    <span className="text-zinc-200 text-[11px] sm:text-xs">TypeScript, JavaScript ES6+, SQL</span>
                  </div>
                  <div className="flex flex-col xs:flex-row xs:justify-between py-1.5 border-b border-white/5 gap-1">
                    <span className="text-zinc-500 uppercase text-[10px] sm:text-xs">Specialization</span>
                    <span className="text-[#FF4D00] font-semibold text-[11px] sm:text-xs">Commercial ERP, POS, WebSockets</span>
                  </div>
                  <div className="flex flex-col xs:flex-row xs:justify-between py-1.5 border-b border-white/5 gap-1">
                    <span className="text-zinc-500 uppercase text-[10px] sm:text-xs">Experience Role</span>
                    <span className="text-zinc-200 text-[11px] sm:text-xs">Backend Dev @ Hyper Digitech</span>
                  </div>
                  <div className="flex flex-col xs:flex-row xs:justify-between py-1.5 border-b border-white/5 gap-1">
                    <span className="text-zinc-500 uppercase text-[10px] sm:text-xs">Freelance Practice</span>
                    <span className="text-emerald-400 font-semibold text-[11px] sm:text-xs">Autonomous Product Delivery</span>
                  </div>
                  <div className="flex flex-col xs:flex-row xs:justify-between py-1.5 gap-1">
                    <span className="text-zinc-500 uppercase text-[10px] sm:text-xs">Location</span>
                    <span className="text-zinc-200 text-[11px] sm:text-xs">Balasore, Odisha, India</span>
                  </div>
                </div>

                {/* Developer Creed Quote */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                  <span className="text-[#FF4D00] block mb-1 font-bold">// ENGINEERING CREED</span>
                  "Software must be built for real humans under pressure: fast cash registers during restaurant rushes, accurate invoices during audits, and rock-solid databases."
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>
      </div>
    </section>
  );
};

