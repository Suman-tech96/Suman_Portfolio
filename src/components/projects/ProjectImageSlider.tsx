import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Play, 
  Pause, 
  X,
  Sparkles
} from 'lucide-react';

export interface SliderImage {
  url: string;
  title: string;
  caption?: string;
  badge?: string;
}

interface ProjectImageSliderProps {
  images: SliderImage[];
  projectTitle: string;
  accentColor?: string;
  autoPlayInterval?: number;
}

export const ProjectImageSlider: React.FC<ProjectImageSliderProps> = ({
  images,
  projectTitle,
  accentColor = '#FF4D00',
  autoPlayInterval = 4500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  // Auto-slide effect with pause-on-hover
  useEffect(() => {
    if (images.length <= 1 || isPaused || isLightboxOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, isPaused, isLightboxOpen, autoPlayInterval]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSelectTab = (idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(idx);
  };

  return (
    <>
      <div 
        className="relative w-full rounded-2xl bg-[#08080C] border border-white/10 overflow-hidden group shadow-2xl flex flex-col select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top High-Tech Window Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-[#101016] border-b border-white/[0.08] z-20 shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex gap-1.5 shrink-0">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] text-zinc-300 font-mono pl-1.5 font-semibold truncate">
              {currentImage.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {currentImage.badge && (
              <span 
                className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider"
                style={{ 
                  color: accentColor, 
                  backgroundColor: `${accentColor}18`, 
                  borderColor: `${accentColor}35` 
                }}
              >
                {currentImage.badge}
              </span>
            )}
            
            {/* Lightbox / Zoom Trigger */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsLightboxOpen(true);
              }}
              title="Inspect Full Image"
              className="p-1.5 rounded-md bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Main Stage Image Display (100% Uncropped with object-contain) */}
        <div className="relative w-full h-[260px] xs:h-[300px] sm:h-[360px] md:h-[400px] bg-[#050508] flex items-center justify-center p-2 sm:p-3 overflow-hidden">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          {/* Actual High-Res Screenshot (Crisp, Non-Zoomed, Fully Visible) */}
          <img
            key={currentImage.url}
            src={currentImage.url}
            alt={`${projectTitle} - ${currentImage.title}`}
            className="w-full h-full object-contain rounded-lg transition-opacity duration-300"
          />

          {/* Previous / Next Arrow Buttons */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-black/80 hover:bg-[#FF4D00] text-white hover:text-black border border-white/20 flex items-center justify-center backdrop-blur-md transition-all opacity-85 hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer z-30"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-black/80 hover:bg-[#FF4D00] text-white hover:text-black border border-white/20 flex items-center justify-center backdrop-blur-md transition-all opacity-85 hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer z-30"
                aria-label="Next Slide"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </>
          )}

          {/* Slide Progress Counter Pill */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/85 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 font-bold z-20 shadow-md">
              0{currentIndex + 1} / 0{images.length}
            </div>
          )}
        </div>

        {/* Bottom Interactive Navigation Strip (Tabs & Captions) */}
        <div className="px-3 py-2 sm:py-2.5 bg-[#0C0C12] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 z-20">
          
          {/* Slide Selection Pills */}
          {images.length > 1 ? (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleSelectTab(idx, e)}
                  className={`px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer border ${
                    currentIndex === idx
                      ? 'bg-[#FF4D00] text-black font-bold border-[#FF4D00] shadow-[0_0_10px_rgba(255,77,0,0.4)]'
                      : 'bg-white/[0.04] text-zinc-400 hover:text-white border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  {img.title}
                </button>
              ))}
            </div>
          ) : (
            <span className="text-[11px] font-mono text-zinc-400">
              {currentImage.caption || currentImage.title}
            </span>
          )}

          {/* Auto-Slide Indicator & Lightbox Hint */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
            {images.length > 1 && (
              <span className="hidden sm:inline">
                {isPaused ? '• Paused on hover' : '⚡ Auto-sliding'}
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsLightboxOpen(true);
              }}
              className="text-[#00F0FF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View Fullscreen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Lightbox Button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50 shadow-xl"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Lightbox Navigation */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-[#FF4D00] text-white hover:text-black flex items-center justify-center transition-all cursor-pointer z-50 shadow-xl"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-[#FF4D00] text-white hover:text-black flex items-center justify-center transition-all cursor-pointer z-50 shadow-xl"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Expanded Image Container */}
          <div 
            className="max-w-6xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage.url}
              alt={currentImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl border border-white/10 shadow-2xl"
            />
            <div className="mt-4 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-center font-mono text-xs sm:text-sm text-zinc-200 shadow-xl">
              <span className="font-bold text-white">{currentImage.title}</span>
              {currentImage.caption && <span className="text-zinc-400"> — {currentImage.caption}</span>}
              <span className="text-[#FF4D00] font-bold ml-3">({currentIndex + 1} / {images.length})</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
