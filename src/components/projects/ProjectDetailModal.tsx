import React, { useEffect } from 'react';
import { ProjectItem } from '../../types/portfolio';
import { ProjectMockup } from './ProjectMockup';
import { X, ExternalLink, CheckCircle2, Cpu, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onContactWithProject: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onContactWithProject,
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-10 overflow-y-auto">
      {/* Dark backdrop with blur */}
      <div
        className="fixed inset-0 bg-[#040405]/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#0C0C0E] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-y-auto z-10 text-[#F5F2EB] flex flex-col">
        {/* Sticky Top Action Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0C0C0E]/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-2 sm:gap-3 truncate pr-2">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#FF4D00] uppercase font-bold shrink-0">
              {project.chapter}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-[10px] sm:text-xs font-mono text-zinc-400 truncate">
              {project.category}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors focus:outline-none shrink-0"
            aria-label="Close Case Study"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-8 md:p-12 space-y-8 sm:space-y-10">
          {/* Header & Title */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-zinc-300">
                CLIENT: {project.clientType}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-zinc-300">
                YEAR: {project.year}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/30 text-[10px] sm:text-xs font-mono text-[#FF4D00]">
                ROLE: {project.myRole}
              </span>
            </div>

            <h2 className="font-display font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-white">
              {project.title}
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-zinc-300 font-light leading-relaxed">
              {project.tagline}
            </p>

            {/* Quick Live / GitHub Action Links */}
            <div className="mt-5 sm:mt-6 flex flex-wrap gap-2.5 sm:gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 xs:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FF4D00] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#FF6420] transition-all shadow-[0_0_20px_rgba(255,77,0,0.3)] min-h-[40px]"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 xs:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-white font-medium text-xs uppercase tracking-wider hover:bg-white/10 transition-all min-h-[40px]"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>Source Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Interactive UI Mockup Stage & Photo Gallery Slider */}
          <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-[#09090B]">
            <ProjectMockup 
              type={project.visualPreview.uiMockupType} 
              title={project.title}
              galleryImages={project.galleryImages}
              accentColor={project.accentColor}
            />
          </div>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 pt-2">
            <div className="glass-panel p-5 sm:p-8 rounded-2xl border-l-4 border-l-red-500/80">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-red-400 uppercase font-bold block mb-1.5">
                01 / The Business Problem
              </span>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-white mb-2 sm:mb-3">
                Operational Friction & Inefficiencies
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed font-light">
                {project.businessProblem}
              </p>
            </div>

            <div className="glass-panel p-5 sm:p-8 rounded-2xl border-l-4 border-l-emerald-500/80">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-emerald-400 uppercase font-bold block mb-1.5">
                02 / Engineered Solution
              </span>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-white mb-2 sm:mb-3">
                Full-Stack Architecture & Automation
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed font-light">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Major Capabilities Checklist */}
          <div>
            <h3 className="text-xs font-mono tracking-[0.25em] text-[#FF4D00] uppercase font-bold mb-3 sm:mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00]" />
              Core Functional Modules
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
              {project.majorFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#FF4D00] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-zinc-300 font-light">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture & Engineering Highlights */}
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-5 sm:p-8">
            <h3 className="text-xs font-mono tracking-[0.25em] text-[#00F0FF] uppercase font-bold mb-4 flex items-center gap-2">
              <Cpu className="h-4 w-4 text-[#00F0FF]" />
              Engineering & Architecture Highlights
            </h3>
            <ul className="space-y-3">
              {project.architectureHighlights.map((arch, idx) => (
                <li key={idx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-zinc-300 font-mono">
                  <span className="text-[#00F0FF] font-bold shrink-0">[{idx + 1}]</span>
                  <span className="break-words">{arch}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Arsenal */}
          <div>
            <h3 className="text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase font-bold mb-3">
              Applied Technologies
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 sm:px-3 py-1 rounded-lg border border-white/10 bg-white/5 font-mono text-[11px] sm:text-xs text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Technical Contribution */}
          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <span className="text-[10px] font-mono tracking-widest text-[#FF4D00] uppercase font-bold block mb-1">
              Engineering Contribution
            </span>
            <p className="text-xs sm:text-sm md:text-base text-zinc-300">
              {project.keyContribution}
            </p>
          </div>

          {/* Bottom Conversion Prompt */}
          <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-display font-bold text-base sm:text-lg text-white">Need a similar business solution?</h4>
              <p className="text-xs text-zinc-400 font-light mt-0.5">Let's discuss requirements, timeline, and architectural approach.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onContactWithProject(project.title);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FF4D00] text-black font-bold uppercase tracking-wider text-xs hover:bg-[#FF6420] transition-all shadow-[0_0_20px_rgba(255,77,0,0.3)] min-h-[42px]"
            >
              <span>Inquire About This Project</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
