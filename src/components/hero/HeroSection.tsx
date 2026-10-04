import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Quote } from 'lucide-react';
import sumanPhotoDesktop from '../../assets/Suman_photo.png';
import sumanPhotoMobile from '../../assets/Mobile_version.jpg';

interface HeroSectionProps {
  onExploreWork: () => void;
  onStartProject: () => void;
  isAudioPlaying?: boolean;
  onToggleAudio?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onStartProject,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Subject Position Analysis:
  // In the desktop portrait (Suman_photo.png), the person/subject is on the LEFT side looking right.
  // In accordance with the layout rule:
  // subjectSide = 'left' => textSide = 'right' (matching Image 3 reference)
  type SubjectPosition = 'left' | 'right';
  const subjectSide: SubjectPosition = 'left' as SubjectPosition;
  const textSide: SubjectPosition = (subjectSide as string) === 'left' ? 'right' : 'left';

  // Check viewport for responsive image conditional
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const activeHeroImage = isMobile ? sumanPhotoMobile : sumanPhotoDesktop;

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] w-full bg-[#000000] text-[#F5F2EB] flex flex-col justify-between overflow-hidden select-none pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-14 xl:px-20"
    >
      {/* 1. Portrait Layer (Dedicated Background Layer) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="relative w-full h-full"
          style={{
            transform: !isMobile ? `perspective(1200px) rotateX(${tilt.y * 0.3}deg) rotateY(${tilt.x * 0.3}deg) scale(${isHovered ? 1.02 : 1.0})` : 'none',
            transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Portrait Photo:
               subjectSide='left' means we want person on LEFT of viewport.
               The source image has: dark-SJ-wall | person | dark-concrete-wall (left→right).
               To show person on LEFT of viewport, object-position X must be HIGH (~65-72%)
               because that pans the wide image rightward so person occupies left viewport zone
               and the dark S-monogram wall fills the right zone — exactly matching reference image 1.
          */}
          <img
            src={activeHeroImage}
            alt="Suman Jana - Full-Stack Software Engineer"
            className={`w-full h-full object-cover transition-all duration-700 ${
              isMobile
                ? 'object-[center_42%] brightness-[0.90] contrast-[1.06]'
                : subjectSide === 'left'
                  ? 'object-[75%_center] xl:object-[77%_center] 2xl:object-[79%_center] brightness-[0.95] contrast-[1.08]'
                  : 'object-[32%_center] xl:object-[30%_center] 2xl:object-[28%_center] brightness-[0.95] contrast-[1.08]'
            }`}
          />

          {/* Right Scrim for Desktop: Darkens the RIGHT side where text sits over the SJ wall */}
          {textSide === 'right' ? (
            <div className="hidden lg:block absolute inset-y-0 right-0 w-[58%] xl:w-[52%] 2xl:w-[48%] bg-gradient-to-l from-[#000000] via-[#000000]/80 via-45% to-transparent z-[1]" />
          ) : (
            <div className="hidden lg:block absolute inset-y-0 left-0 w-[58%] xl:w-[52%] 2xl:w-[48%] bg-gradient-to-r from-[#000000] via-[#000000]/80 via-45% to-transparent z-[1]" />
          )}

          {/* Mobile Scrim:
               Top 0-40%:  nearly transparent so face is clearly visible
               Mid 40-60%: transitions to very dark
               Bottom 60-100%: fully black so text is always readable
          */}
          <div
            className="block lg:hidden absolute inset-0 z-[1]"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.55) 48%, rgba(0,0,0,0.88) 62%, rgba(0,0,0,0.97) 75%, rgba(0,0,0,1) 100%)' }}
          />

          {/* Bottom Scrim */}
          <div className="absolute inset-x-0 bottom-0 h-40 sm:h-52 bg-gradient-to-t from-[#000000] via-[#000000]/85 to-transparent z-[1]" />

          {/* Top Scrim */}
          <div className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-[#000000] via-[#000000]/70 to-transparent z-[1]" />

          {/* Subtle Warm Amber Glow */}
          <div className={`absolute top-1/3 ${subjectSide === 'left' ? 'left-1/4' : 'right-1/4'} w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-tr from-[#FF4D00]/15 via-[#FF7A00]/10 to-[#00F0FF]/5 blur-[130px] pointer-events-none opacity-60 z-[1]`} />
        </div>
      </div>

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none z-[2]" />

      {/* 2. Responsive Two-Zone Content Layer */}
      {/*
          Mobile:  mt-auto pushes the content to the bottom half of the section (below the face).
          Desktop: my-auto vertically centers the content within the available column space.
      */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto py-4 sm:py-6 flex flex-col justify-center ${isMobile ? 'mt-auto' : 'my-auto'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-10 w-full">
          {/* Left Zone: Empty negative-space — person occupies this zone visually via background */}
          {textSide === 'right' && (
            <div className="hidden lg:block lg:col-span-7 xl:col-span-7 pointer-events-none" aria-hidden="true" />
          )}

          {/* Text Zone: Strictly bounded to the RIGHT 5 columns, text left-aligned inside */}
          <div
            className={`w-full flex flex-col justify-center items-start text-left ${
              textSide === 'right'
                ? 'lg:col-span-5 xl:col-span-5'
                : 'lg:col-span-5 xl:col-span-5'
            }`}
          >
            

            {/* Stacked Mega Headline */}
            <h1 className="font-outfit uppercase font-[200] tracking-[-0.035em] leading-[0.88] text-white w-full max-w-xl">
              <span className="block overflow-hidden">
                <span className="block text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-[4.25rem] xl:text-[5rem] text-[#F5F2EB] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  CAN
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-[4.25rem] xl:text-[5rem] text-gradient-flame font-[300] tracking-[-0.02em] drop-shadow-[0_4px_25px_rgba(255,77,0,0.45)]">
                  CODE
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-[4.25rem] xl:text-[5rem] text-[#F5F2EB] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  SHAPE
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-[4.25rem] xl:text-[5rem] text-[#F5F2EB] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  HOW WE
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-[4.25rem] xl:text-[5rem] text-[#F5F2EB] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  SCALE?
                </span>
              </span>
            </h1>

            {/* Minimal Philosophy Quote */}
            <div className="mt-4 sm:mt-6 max-w-lg">
              <div className="flex items-start gap-2.5">
                <Quote className="h-3.5 w-3.5 text-[#FF4D00] shrink-0 mt-0.5" />
                <p className="text-zinc-300 text-xs sm:text-sm font-light italic leading-relaxed">
                  “I don’t just build websites — I engineer high-concurrency systems where downtime costs money and architectural resilience drives revenue.”
                </p>
              </div>

              {/* Action CTAs */}
              <div className="mt-5 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={onExploreWork}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-[#FF4D00] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,77,0,0.5)] active:scale-95 cursor-pointer"
                >
                  <span>Explore Work</span>
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onStartProject}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 backdrop-blur-sm active:scale-95 cursor-pointer"
                >
                  <span>Start A Project</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#FF4D00]" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Zone: Empty space only when text is on left */}
          {textSide === 'left' && (
            <div className="hidden lg:block lg:col-span-7 xl:col-span-7 pointer-events-none" aria-hidden="true" />
          )}
        </div>
      </div>

      {/* 3. Minimal Bottom Strip */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between gap-4 pt-3 border-t border-white/[0.08]">
        {/* Left: Scroll Down */}
        <button
          type="button"
          onClick={onExploreWork}
          className="group inline-flex items-center gap-2 text-left cursor-pointer transition-colors"
        >
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white transition-colors">
            Scroll Down
          </span>
          <ArrowDown className="h-3 w-3 text-zinc-500 group-hover:text-[#FF4D00] group-hover:translate-y-0.5 transition-all" />
        </button>

        {/* Right: Availability Status */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-zinc-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 font-medium">AVAILABLE FOR FREELANCE</span>
        </div>
      </footer>
    </section>
  );
};
