import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { PROCESS_DATA } from '../../data/processData';
import { 
  CheckCircle2, 
  Search, 
  Compass, 
  Palette, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  LifeBuoy, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Zap,
  Check,
  Activity
} from 'lucide-react';

interface ProcessTimelineProps {
  onStartProject?: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Search,
  Compass,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  LifeBuoy,
};

const HUD_LABELS = [
  'SYS.01 // DISCOVERY_SYNC',
  'SYS.02 // ARCH_MODELING',
  'SYS.03 // UI_PROTOTYPING',
  'SYS.04 // FULLSTACK_BUILD',
  'SYS.05 // QA_STRESS_TEST',
  'SYS.06 // CLOUD_PIPELINE',
  'SYS.07 // SCALE_MONITOR'
];

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onStartProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Hardware-accelerated dynamic progress line tracking the entire scroll timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 85%']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleStartProjectClick = () => {
    if (onStartProject) {
      onStartProject();
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToStage = (stageNumber: string) => {
    const el = document.getElementById(`process-stage-${stageNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section 
      id="process" 
      ref={containerRef}
      className="relative py-20 sm:py-28 lg:py-36 bg-[#070709] border-b border-white/[0.08] overflow-x-clip [perspective:1200px]"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF4D00]/6 rounded-full blur-[140px] pointer-events-none -z-10 transform-gpu" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#00F0FF]/6 rounded-full blur-[140px] pointer-events-none -z-10 transform-gpu" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Spatial Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 30, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-14 sm:mb-20 transform-gpu"
        >
          <div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/30 mb-3 sm:mb-4 shadow-[0_0_15px_rgba(255,77,0,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4D00]" />
              </span>
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#FF4D00] uppercase font-bold">
                05 / SYSTEMATIC WORKFLOW
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-[10px] font-mono text-[#00F0FF] uppercase tracking-wider">
                7-STAGE ENGINE
              </span>
            </div>
            
            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight uppercase leading-[1.08]">
              Development <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] via-[#F5F2EB] to-[#00F0FF] font-serifDisplay italic lowercase">
                process timeline.
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-4">
              A disciplined, high-velocity 7-stage lifecycle engineered to eliminate scope creep, guarantee milestones, and launch enterprise-grade code.
            </p>
            
            {/* Live Interactive Stage Quick-Jump Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {PROCESS_DATA.map((step, sIdx) => (
                <button
                  key={step.number}
                  onClick={() => scrollToStage(step.number)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all duration-200 border cursor-pointer ${
                    activeStageIndex === sIdx
                      ? 'bg-[#FF4D00] text-black font-bold border-[#FF4D00] shadow-[0_0_12px_rgba(255,77,0,0.6)] scale-105'
                      : 'bg-white/[0.03] text-zinc-400 hover:text-white border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  P0{sIdx + 1}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 7-Step Process Timeline with Scroll Design & Rotating Laser Borders */}
        <div className="relative [transform-style:preserve-3d]">

          {/* Desktop Center Vertical Neon Laser Beam */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-12 w-[2px] -translate-x-1/2 bg-white/[0.08] rounded-full overflow-hidden pointer-events-none">
            <motion.div
              style={{ scaleY, transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-[#FF4D00] via-[#FF8A00] to-[#00F0FF] shadow-[0_0_15px_rgba(255,77,0,0.8)] will-change-transform"
            />
          </div>

          {/* Mobile & Tablet Left Vertical Track */}
          <div className="block lg:hidden absolute left-6 sm:left-8 top-4 bottom-12 w-[2px] bg-white/[0.08] rounded-full overflow-hidden pointer-events-none">
            <motion.div
              style={{ scaleY, transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-[#FF4D00] via-[#FF8A00] to-[#00F0FF] shadow-[0_0_15px_rgba(255,77,0,0.8)] will-change-transform"
            />
          </div>

          {/* Process Cards List */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {PROCESS_DATA.map((step, idx) => {
              const isEven = idx % 2 === 1;
              const isActive = activeStageIndex === idx;
              const IconComponent = step.iconName && ICON_MAP[step.iconName] ? ICON_MAP[step.iconName] : Sparkles;
              const hudTag = HUD_LABELS[idx] || `SYS.0${idx + 1} // ACTIVE_MODULE`;

              return (
                <div
                  id={`process-stage-${step.number}`}
                  key={step.number}
                  className={`relative flex flex-col lg:flex-row items-stretch lg:items-center gap-6 sm:gap-10 pl-14 sm:pl-20 lg:pl-0 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                  onMouseEnter={() => setActiveStageIndex(idx)}
                >
                  {/* Mobile High-Tech Node with Circular Moving Laser Border */}
                  <div className="flex lg:hidden absolute left-2 sm:left-4 top-6 z-20">
                    <motion.div 
                      initial={{ scale: 0, rotateY: 90 }}
                      whileInView={{ scale: 1, rotateY: 0 }}
                      onViewportEnter={() => setActiveStageIndex(idx)}
                      viewport={{ once: false, amount: 0.4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative flex items-center justify-center transform-gpu"
                    >
                      {/* Spinning Conic Circular Moving Laser Border */}
                      <div className="absolute -inset-[4px] rounded-full overflow-hidden pointer-events-none p-[1.5px]">
                        <div
                          className={`w-full h-full rounded-full animate-[spin_3s_linear_infinite]`}
                          style={{
                            background: isActive
                              ? 'conic-gradient(from 0deg, transparent 0%, transparent 50%, #FF4D00 80%, #00F0FF 92%, #FFFFFF 100%)'
                              : 'conic-gradient(from 0deg, transparent 0%, transparent 60%, #FF4D00 85%, #00F0FF 95%, #ffffff 100%)',
                          }}
                        />
                      </div>

                      {/* Outer Orbit Dashed Ring */}
                      <div className="absolute -inset-2 rounded-full border border-dashed border-[#FF4D00]/40 animate-[spin_12s_linear_infinite] pointer-events-none" />

                      <div className={`relative h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#0F0F14] border-2 ${
                        isActive ? 'border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.7)]' : 'border-[#FF4D00] shadow-[0_0_15px_rgba(255,77,0,0.5)]'
                      } flex flex-col items-center justify-center font-mono text-xs font-black text-white z-10 transition-colors duration-300`}>
                        <span>{step.number}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* GPU Hardware-Accelerated 3D Flipping Card with Continuous Moving Circular Cover Border */}
                  <motion.div
                    initial={{ 
                      opacity: 0, 
                      x: isEven ? 80 : -80,
                      y: 25,
                      rotateY: isEven ? -25 : 25,
                      scale: 0.92
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      x: 0, 
                      y: 0,
                      rotateY: 0,
                      scale: 1
                    }}
                    onViewportEnter={() => setActiveStageIndex(idx)}
                    viewport={{ once: false, amount: 0.35 }}
                    transition={{ 
                      duration: 0.7, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.05
                    }}
                    className="w-full lg:w-[46%] transform-gpu will-change-transform"
                  >
                    {/* Stage Cover Border Moving in Circle Format Container */}
                    <div className="relative p-[1.5px] rounded-2xl overflow-hidden group shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(255,77,0,0.2)] transition-shadow duration-500">
                      
                      {/* Moving Circular Conic Laser Border - Circulating around stage cover (Stage 1 to 7) */}
                      <div 
                        className={`absolute -inset-[150%] w-[400%] h-[400%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-500 ${
                          isActive 
                            ? 'opacity-100 animate-[spin_3.5s_linear_infinite]' 
                            : 'opacity-40 group-hover:opacity-100 animate-[spin_5.5s_linear_infinite]'
                        }`}
                        style={{
                          background: isEven
                            ? 'conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(0,240,255,0.4) 85%, #00F0FF 95%, #FF4D00 98%, #FFFFFF 100%)'
                            : 'conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(255,77,0,0.4) 85%, #FF4D00 95%, #00F0FF 98%, #FFFFFF 100%)'
                        }}
                      />

                      {/* Card Content Shell */}
                      <div className="relative rounded-2xl bg-[#0C0C10]/95 backdrop-blur-xl border border-white/[0.08] group-hover:border-white/20 transition-all duration-300 overflow-hidden">
                        
                        {/* Ambient Accent Light */}
                        <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-44 h-44 bg-gradient-to-br ${isEven ? 'from-[#00F0FF]/15' : 'from-[#FF4D00]/15'} to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

                        {/* Cyber HUD Corner Tech Brackets */}
                        <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#FF4D00]/60 group-hover:border-[#FF4D00] transition-colors" />
                        <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#FF4D00]/60 group-hover:border-[#FF4D00] transition-colors" />
                        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-white/20 group-hover:border-[#00F0FF] transition-colors" />
                        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-white/20 group-hover:border-[#00F0FF] transition-colors" />

                        <div className="p-5 sm:p-7 md:p-8 flex flex-col justify-between h-full relative z-10">
                          
                          {/* 3D Background Stage Watermark */}
                          <div className="absolute right-3 -bottom-5 font-display font-black text-8xl sm:text-9xl text-white/[0.03] select-none pointer-events-none group-hover:text-[#FF4D00]/[0.06] transition-colors">
                            {step.number}
                          </div>

                          <div>
                            {/* HUD Status Bar */}
                            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                              <div className="flex items-center gap-2">
                                <span className={`flex h-2 w-2 rounded-full ${isActive ? 'bg-[#00F0FF] animate-ping' : 'bg-[#FF4D00]'}`} />
                                <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-[#00F0FF]/90 uppercase font-semibold">
                                  {hudTag}
                                </span>
                              </div>

                              {step.duration && (
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-zinc-300">
                                  <Clock className="h-3 w-3 text-[#FF8A00]" />
                                  <span>{step.duration}</span>
                                </div>
                              )}
                            </div>

                            {/* Phase Title, Icon & Subtitle */}
                            <div className="flex items-start gap-3.5 mb-3">
                              <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 text-[#FF4D00] group-hover:bg-[#FF4D00] group-hover:text-black group-hover:shadow-[0_0_18px_rgba(255,77,0,0.6)] transition-all duration-300 shrink-0 mt-0.5">
                                <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xl sm:text-2xl font-display font-black text-[#FF4D00]">
                                    {step.number}
                                  </span>
                                  <span className="text-zinc-600 font-mono text-xs">/</span>
                                  <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white group-hover:text-[#FF4D00] transition-colors leading-tight">
                                    {step.title}
                                  </h3>
                                </div>
                                <p className="text-[11px] sm:text-xs font-mono text-[#00F0FF] mt-1 font-medium tracking-wide">
                                  {step.subtitle}
                                </p>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed mt-3">
                              {step.description}
                            </p>

                            {/* Key Deliverables Staggered Chips */}
                            <div className="mt-5 pt-4 border-t border-white/[0.06]">
                              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-2.5 flex items-center gap-1.5">
                                <Sparkles className="h-3 w-3 text-[#FF4D00]" />
                                Key Deliverables:
                              </span>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {step.deliverables.map((item, dIdx) => (
                                  <span
                                    key={dIdx}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.07] text-[11px] sm:text-xs font-mono text-zinc-300 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/5 transition-colors"
                                  >
                                    <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                                    <span>{item}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Expected Outcome Footer */}
                          {step.outcome && (
                            <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono">
                              <div className="flex items-center gap-2 text-zinc-400 overflow-hidden">
                                <Activity className="h-3.5 w-3.5 text-[#00F0FF] shrink-0" />
                                <span className="text-zinc-300 font-light truncate">{step.outcome}</span>
                              </div>
                              <span className="text-[10px] text-[#FF4D00] font-bold shrink-0 ml-2 uppercase tracking-wider flex items-center gap-1 bg-[#FF4D00]/10 px-2 py-0.5 rounded border border-[#FF4D00]/20">
                                <Check className="h-3 w-3" /> VERIFIED
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Desktop Center Rotating Gyroscope & Circular Moving Laser Border Node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-20">
                    
                    {/* Animated Horizontal Laser Connecting Arm */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      style={{ transformOrigin: isEven ? 'left' : 'right' }}
                      className={`absolute top-1/2 -translate-y-1/2 h-[2px] w-12 sm:w-16 pointer-events-none ${
                        isEven 
                          ? 'left-full bg-gradient-to-r from-[#00F0FF] to-transparent shadow-[0_0_10px_#00F0FF]' 
                          : 'right-full bg-gradient-to-l from-[#FF4D00] to-transparent shadow-[0_0_10px_#FF4D00]'
                      }`}
                    />

                    <motion.div
                      initial={{ scale: 0, rotateY: 90 }}
                      whileInView={{ scale: 1, rotateY: 0 }}
                      onViewportEnter={() => setActiveStageIndex(idx)}
                      viewport={{ once: false, amount: 0.35 }}
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                      className="relative flex items-center justify-center group cursor-pointer transform-gpu"
                      onClick={() => scrollToStage(step.number)}
                    >
                      {/* 1. Moving Circular Laser Border (Conic gradient spinning continuously in circle format from stage 1 till 7) */}
                      <div className="absolute -inset-[5px] rounded-full overflow-hidden pointer-events-none p-[1.5px]">
                        <div
                          className={`w-full h-full rounded-full ${isActive ? 'animate-[spin_2.5s_linear_infinite]' : 'animate-[spin_4s_linear_infinite]'}`}
                          style={{
                            background: isActive
                              ? 'conic-gradient(from 0deg, transparent 0%, transparent 45%, #FF4D00 75%, #00F0FF 90%, #ffffff 100%)'
                              : 'conic-gradient(from 0deg, transparent 0%, transparent 60%, #FF4D00 85%, #00F0FF 95%, #ffffff 100%)',
                          }}
                        />
                      </div>

                      {/* 2. Outer Dashed Orbit Ring */}
                      <div className="absolute -inset-3 rounded-full border border-dashed border-[#FF4D00]/40 animate-[spin_16s_linear_infinite] pointer-events-none transform-gpu" />

                      {/* 3. Counter-Rotating Dotted Cyan Ring */}
                      <div className="absolute -inset-1.5 rounded-full border border-dotted border-[#00F0FF]/50 animate-[spin_20s_linear_infinite_reverse] pointer-events-none transform-gpu" />

                      {/* 4. Central Orb Core */}
                      <div className={`relative h-12 w-12 sm:h-13 sm:w-13 rounded-full bg-[#0E0E14] border-2 ${
                        isActive ? 'border-[#00F0FF] shadow-[0_0_35px_rgba(0,240,255,0.85)] scale-110' : 'border-[#FF4D00] shadow-[0_0_25px_rgba(255,77,0,0.6)]'
                      } group-hover:border-[#00F0FF] flex flex-col items-center justify-center text-white group-hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] transition-all duration-300 z-10`}>
                        <span className="font-mono text-xs sm:text-sm font-black text-white">
                          {step.number}
                        </span>
                        <span className="text-[6.5px] font-mono text-[#FF8A00] uppercase font-bold tracking-tight -mt-0.5">
                          STAGE
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for Desktop alternating layout */}
                  <div className="hidden lg:block w-full lg:w-[46%]" />
                </div>
              );
            })}
          </div>

          {/* Concluding Milestone Action Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 sm:mt-24 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#111116] via-[#15151E] to-[#0D0D12] border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group transform-gpu"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF4D00]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF4D00]/20 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00F0FF]/20 transition-all duration-500" />

            <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F0FF] uppercase tracking-wider mb-2 font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-[#FF4D00]" /> Ready to initiate Stage 01?
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white">
                Turn your architectural vision into an active sprint.
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1 max-w-xl leading-relaxed">
                I begin with an in-depth Discovery & Scope session to outline exact architecture, fixed transparent milestones, and zero bloat.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <button
                onClick={handleStartProjectClick}
                className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#FF4D00] to-[#FF6B00] hover:from-[#FF5D1A] hover:to-[#FF8A00] text-black font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(255,77,0,0.4)] hover:shadow-[0_0_35px_rgba(255,77,0,0.7)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Initiate Project Scope</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
