import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ChevronDown, GripVertical } from 'lucide-react';

interface WelcomeIntro3DProps {
  onIntroComplete?: () => void;
}

export const WelcomeIntro3D: React.FC<WelcomeIntro3DProps> = ({ onIntroComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const zipperSliderRef = useRef<HTMLDivElement | null>(null);
  const textWrapperRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);

  const [progress, setProgress] = useState(0); // 0 = fully closed, 1 = fully open
  const [isDragging, setIsDragging] = useState(false);
  const [isUnzipped, setIsUnzipped] = useState(false);

  const progressRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartProgressRef = useRef(0);
  const isCompletingRef = useRef(false);

  const teethCount = 30;
  const teeth = Array.from({ length: teethCount }, (_, i) => i);

  // Lock body scroll while intro overlay is active to prevent page jumping
  useEffect(() => {
    if (!isUnzipped) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isUnzipped]);

  // Apply progress smoothly to jacket flaps, teeth, and zipper
  const applyProgress = useCallback((p: number) => {
    const clamped = Math.max(0, Math.min(1, p));
    progressRef.current = clamped;
    setProgress(clamped);

    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const zipperSlider = zipperSliderRef.current;
    const textWrapper = textWrapperRef.current;
    const cue = cueRef.current;

    const yPercent = clamped * 100;
    const openSpread = Math.min(100, clamped * 120);

    if (leftPanel) {
      const topX = Math.max(0, 100 - openSpread);
      leftPanel.style.clipPath = `polygon(0 0, ${topX}% 0, 100% ${yPercent}%, 100% 100%, 0 100%)`;
      if (clamped > 0.7) {
        const slideOut = ((clamped - 0.7) / 0.3) * 110;
        leftPanel.style.transform = `translateX(-${slideOut}%)`;
      } else {
        leftPanel.style.transform = 'translateX(0)';
      }
    }

    if (rightPanel) {
      const topX = Math.min(100, openSpread);
      rightPanel.style.clipPath = `polygon(${topX}% 0, 100% 0, 100% 100%, 0 100%, 0 ${yPercent}%)`;
      if (clamped > 0.7) {
        const slideOut = ((clamped - 0.7) / 0.3) * 110;
        rightPanel.style.transform = `translateX(${slideOut}%)`;
      } else {
        rightPanel.style.transform = 'translateX(0)';
      }
    }

    if (zipperSlider) {
      zipperSlider.style.top = `${yPercent}%`;
    }

    if (textWrapper) {
      const opacity = Math.max(0, 1 - clamped * 2.2);
      const scale = 1 + clamped * 0.12;
      const blur = clamped * 12;
      textWrapper.style.opacity = `${opacity}`;
      textWrapper.style.transform = `scale(${scale})`;
      textWrapper.style.filter = `blur(${blur}px)`;
    }

    if (cue) {
      cue.style.opacity = `${Math.max(0, 1 - clamped * 3)}`;
    }

    if (clamped >= 0.98 && !isUnzipped && !isCompletingRef.current) {
      isCompletingRef.current = true;
      setIsUnzipped(true);
      if (onIntroComplete) onIntroComplete();
    }
  }, [isUnzipped, onIntroComplete]);

  // Smooth GSAP interpolation
  const animateToProgress = useCallback((target: number, duration: number = 0.4) => {
    gsap.to(progressRef, {
      current: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        applyProgress(progressRef.current);
      },
      onComplete: () => {
        if (target >= 0.98) {
          setIsUnzipped(true);
          if (onIntroComplete) onIntroComplete();
        }
      },
    });
  }, [applyProgress, onIntroComplete]);

  // Drag Zipper Slider Handler
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    dragStartProgressRef.current = progressRef.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaY = e.clientY - dragStartYRef.current;
    const containerHeight = window.innerHeight;
    const addedProgress = deltaY / (containerHeight * 0.85);
    const newProgress = Math.max(0, Math.min(1, dragStartProgressRef.current + addedProgress));
    applyProgress(newProgress);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (progressRef.current > 0.45) {
      animateToProgress(1, 0.35);
    } else {
      animateToProgress(0, 0.35);
    }
  };

  // Scroll / Wheel & Touch Swipe control
  useEffect(() => {
    if (isUnzipped) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.002;
      const nextProgress = Math.max(0, Math.min(1, progressRef.current + delta));
      applyProgress(nextProgress);

      if (nextProgress >= 0.75) {
        animateToProgress(1, 0.3);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const delta = (touchStartY - currentY) * 0.004;
      touchStartY = currentY;
      const nextProgress = Math.max(0, Math.min(1, progressRef.current + delta));
      applyProgress(nextProgress);

      if (nextProgress >= 0.75) {
        animateToProgress(1, 0.3);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', 'Space'].includes(e.code)) {
        animateToProgress(1, 0.5);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUnzipped, applyProgress, animateToProgress]);

  if (isUnzipped) return null;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="fixed inset-0 w-full h-full z-[99999] overflow-hidden select-none"
      style={{ willChange: 'opacity' }}
      aria-label="Welcome Intro Screen - Scroll or Pull Zipper to Open"
    >
      {/* Solid Left Jacket Flap */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#07070A] z-20 flex flex-col justify-end p-6 sm:p-10 pointer-events-none shadow-[15px_0_40px_rgba(0,0,0,0.95)]"
        style={{
          willChange: 'clip-path, transform',
          backgroundImage: 'radial-gradient(circle at 100% 50%, #12121A 0%, #060608 100%)',
        }}
      >
        <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-[#FF4D00]/60 to-[#FF4D00]/20" />
        <div className="font-mono text-[9px] sm:text-[11px] text-zinc-500 tracking-[0.25em] uppercase relative z-10">
          PORTFOLIO ARCHIVE
        </div>
      </div>

      {/* Solid Right Jacket Flap */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#07070A] z-20 flex flex-col justify-end items-end p-6 sm:p-10 text-right pointer-events-none shadow-[-15px_0_40px_rgba(0,0,0,0.95)]"
        style={{
          willChange: 'clip-path, transform',
          backgroundImage: 'radial-gradient(circle at 0% 50%, #12121A 0%, #060608 100%)',
        }}
      >
        <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#FF4D00]/60 to-[#FF4D00]/20" />
        <div className="font-mono text-[9px] sm:text-[11px] text-zinc-500 tracking-[0.25em] uppercase relative z-10">
          2026 EDITION
        </div>
      </div>

      {/* Dynamic Jacket Chain Teeth */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-25 overflow-hidden">
        {teeth.map((idx) => {
          const toothYPercent = (idx / (teethCount - 1)) * 100;
          const isAboveSlider = toothYPercent < progress * 100;
          const isEven = idx % 2 === 0;

          let leftX = 50;
          let rightX = 50;
          let rot = 0;

          if (isAboveSlider) {
            const dist = (progress * 100 - toothYPercent) / (progress * 100 || 1);
            const spread = dist * Math.min(48, progress * 58);
            leftX = 50 - spread;
            rightX = 50 + spread;
            rot = dist * 32;
          }

          return (
            <React.Fragment key={idx}>
              {/* Left Tooth */}
              <div
                className="absolute -translate-y-1/2 transition-all duration-75 ease-out"
                style={{
                  left: `${leftX}%`,
                  top: `${toothYPercent}%`,
                  transform: `translate(-100%, -50%) rotate(${isAboveSlider ? -rot : 0}deg)`,
                  opacity: isAboveSlider ? Math.max(0.1, 1 - (rot / 35)) : 1,
                }}
              >
                <div className="h-2 sm:h-2.5 w-2 sm:w-3 bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700/80 rounded-r-md flex items-center justify-end pr-0.5 shadow-sm">
                  <div className="h-1.5 w-1 rounded-full bg-zinc-600/70" />
                </div>
              </div>

              {/* Right Tooth */}
              <div
                className="absolute -translate-y-1/2 transition-all duration-75 ease-out"
                style={{
                  left: `${rightX}%`,
                  top: `${toothYPercent}%`,
                  transform: `translate(0%, -50%) rotate(${isAboveSlider ? rot : 0}deg)`,
                  opacity: isAboveSlider ? Math.max(0.1, 1 - (rot / 35)) : 1,
                }}
              >
                <div className="h-2 sm:h-2.5 w-2 sm:w-3 bg-gradient-to-l from-[#181820] to-[#0D0D12] border border-[#FF4D00]/50 rounded-l-md flex items-center justify-start pl-0.5 shadow-[0_0_6px_rgba(255,77,0,0.35)]">
                  <div className="h-1.5 w-1 rounded-full bg-[#FF4D00] shadow-[0_0_4px_#FF4D00]" />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Draggable Metallic Zipper Puller Slider */}
      <div
        ref={zipperSliderRef}
        onPointerDown={handlePointerDown}
        className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-14 sm:w-10 sm:h-16 z-40 flex flex-col items-center cursor-grab active:cursor-grabbing transition-transform ${
          isDragging ? 'scale-115' : 'hover:scale-105'
        }`}
        style={{
          top: '0%',
          willChange: 'top, transform',
          touchAction: 'none',
        }}
        title="Pull zipper down to open jacket"
      >
        <div className="w-full h-7 sm:h-9 rounded-md bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-950 border border-[#FF4D00]/80 shadow-[0_0_20px_rgba(255,77,0,0.8)] flex items-center justify-center p-0.5">
          <div className="w-1.5 h-full rounded-full bg-[#FF4D00] animate-pulse shadow-[0_0_8px_#FF4D00]" />
        </div>
        <div className="w-4 sm:w-5 h-6 sm:h-7 -mt-0.5 rounded-b-md bg-zinc-900 border border-zinc-500 flex flex-col items-center justify-center shadow-2xl">
          <GripVertical className="h-3 w-3 text-zinc-400" />
        </div>
      </div>

      {/* Welcome Headline */}
      <div
        ref={textWrapperRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none z-30 py-8 overflow-hidden"
        style={{ willChange: 'opacity, transform, filter' }}
      >
        <h1 className="font-display font-black text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[6.5rem] 2xl:text-[7.5rem] text-white tracking-tight uppercase leading-[0.95] drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
          WELCOME <br />
          TO <br />
          <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#FF4D00] via-[#FF9A00] via-[#38BDF8] to-[#00F0FF] bg-clip-text text-transparent italic font-serifDisplay lowercase text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] 2xl:text-[8.5rem] font-normal leading-[1.05] tracking-normal">
            the suman world.
          </span>
        </h1>

        <p className="mt-3 sm:mt-5 text-zinc-300 font-mono text-[9px] sm:text-xs md:text-sm tracking-[0.25em] uppercase drop-shadow-md">
          ENTERPRISE SOFTWARE & WEB APPLICATIONS
        </p>

        <div
          ref={cueRef}
          className="mt-4 sm:mt-8 flex flex-col items-center gap-1 text-zinc-400 font-mono text-[9px] sm:text-xs tracking-[0.25em] uppercase"
        >
          <span className="text-zinc-300 font-bold drop-shadow">
            {isDragging ? 'UNZIPPING JACKET...' : 'SCROLL OR PULL ZIPPER DOWN'}
          </span>
          <ChevronDown className="h-4 w-4 text-[#FF4D00] animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeIntro3D;
