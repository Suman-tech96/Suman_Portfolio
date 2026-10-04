import React, { useState } from 'react';
import { ProjectItem, ProjectCategory } from '../../types/portfolio';
import { PROJECTS_DATA } from '../../data/projectsData';
import { ProjectMockup } from './ProjectMockup';
import { ProjectDetailModal } from './ProjectDetailModal';
import { SolarGalaxy3D } from './SolarGalaxy3D';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Orbit, 
  LayoutGrid,
  Zap
} from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { BorderGlow } from '../ui/BorderGlow';

interface ProjectsShowcaseProps {
  onStartProject: () => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onStartProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [viewMode, setViewMode] = useState<'galaxy' | 'stream'>('galaxy');

  const categories: ProjectCategory[] = [
    'All',
    'Business Systems',
    'Web Apps',
    'Real-Time & Backend',
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.filterCategory === selectedCategory);

  const handleContactWithProject = (projectName: string) => {
    onStartProject();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="relative py-20 sm:py-28 lg:py-36 bg-[#080808] border-b border-white/[0.08] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#FF4D00] uppercase font-bold">
                02 / SELECTED COMMERCIAL ARCHIVES
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight uppercase">
              Featured Work & <br />
              <span className="text-zinc-500 font-serifDisplay italic lowercase">
                system case studies.
              </span>
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-base max-w-md font-light leading-relaxed">
            Genuine business platforms, enterprise operational tools, and real-time applications engineered for reliability.
          </p>
        </div>

        {/* View Mode Toggle & Category Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-8 sm:mb-12 border-b border-white/[0.06]">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono tracking-wide transition-all whitespace-nowrap min-h-[36px] cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FF4D00] text-black font-bold shadow-[0_0_15px_rgba(255,77,0,0.3)]'
                    : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/5 border border-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode Switcher: 3D Solar Galaxy vs Detailed Stream */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.1] shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode('galaxy')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                viewMode === 'galaxy'
                  ? 'bg-gradient-to-r from-[#FF4D00] to-[#FF8A00] text-black font-bold shadow-[0_0_15px_rgba(255,77,0,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Orbit className="h-3.5 w-3.5" />
              <span>3D Solar Galaxy</span>
            </button>

            <button
              onClick={() => setViewMode('stream')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                viewMode === 'stream'
                  ? 'bg-white/20 text-white font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>System Archives</span>
            </button>
          </div>
        </div>

        {/* --- VIEW MODE 1: Interactive Three.js Solar Galaxy View --- */}
        {viewMode === 'galaxy' && (
          <div className="mb-14 sm:mb-20">
            <SolarGalaxy3D
              projects={filteredProjects}
              selectedProject={activeProjectModal}
              onSelectProject={(proj) => setActiveProjectModal(proj)}
              onOpenCaseStudy={(proj) => setActiveProjectModal(proj)}
            />
          </div>
        )}

        {/* --- VIEW MODE 2 / Stream Showcase Grid --- */}
        {viewMode === 'stream' && (
          <div className="space-y-10 sm:space-y-16 lg:space-y-24">
            {filteredProjects.map((project, index) => {
              const isSplitLayout = index % 2 === 1;

              return (
                <BorderGlow
                  key={project.id}
                  backgroundColor="#0D0D10"
                  borderRadius={28}
                  glowRadius={42}
                  edgeSensitivity={35}
                  glowIntensity={1.2}
                  coneSpread={28}
                  colors={[project.accentColor, '#FF8A00', '#00F0FF']}
                  className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 lg:p-12 transition-all duration-500"
                >
                  {/* Background Ambient Glow */}
                  <div
                    className="absolute -top-32 -right-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                    style={{ background: project.accentColor }}
                  />

                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center ${
                    isSplitLayout ? 'lg:grid-flow-dense' : ''
                  }`}>
                    {/* Text Story Column */}
                    <div className={`lg:col-span-6 flex flex-col justify-between ${
                      isSplitLayout ? 'lg:col-start-7' : ''
                    }`}>
                      <div>
                        {/* Meta chips */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#FF4D00] font-bold">
                            {project.chapter}
                          </span>
                          <span className="text-zinc-600 font-mono">•</span>
                          <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wide">
                            {project.category}
                          </span>
                          <span className="text-zinc-600 font-mono">•</span>
                          <span className="text-[10px] sm:text-xs font-mono text-zinc-500">
                            {project.year}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white group-hover:text-[#FF4D00] transition-colors tracking-tight">
                          {project.title}
                        </h3>

                        {/* Tagline */}
                        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                          {project.tagline}
                        </p>

                        {/* Key features bullet points */}
                        <div className="mt-4 sm:mt-6 space-y-1.5 sm:space-y-2">
                          {project.majorFeatures.slice(0, 3).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400 font-light">
                              <CheckCircle2 className="h-4 w-4 text-[#FF4D00] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech stack badges */}
                        <div className="mt-5 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] sm:text-[11px] font-mono text-zinc-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-2.5 sm:gap-4">
                        {/* Open Case Study Modal */}
                        <button
                          type="button"
                          onClick={() => setActiveProjectModal(project)}
                          className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#FF4D00] hover:text-black transition-all shadow-md active:scale-95 min-h-[42px] cursor-pointer"
                        >
                          <span>Deep Case Study</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>

                        {/* Live Demo Link */}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 xs:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-3 rounded-full border border-white/15 bg-white/[0.02] text-xs font-mono text-zinc-300 hover:text-white hover:border-white/40 transition-all min-h-[42px]"
                          >
                            <ExternalLink className="h-3.5 w-3.5 text-emerald-400" />
                            <span>Live Demo</span>
                          </a>
                        )}

                        {/* GitHub Link */}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 xs:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-3 rounded-full border border-white/15 bg-white/[0.02] text-xs font-mono text-zinc-300 hover:text-white hover:border-white/40 transition-all min-h-[42px]"
                          >
                            <GithubIcon className="h-3.5 w-3.5" />
                            <span>Source</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Visual Screenshot Slider Column */}
                    <div className={`lg:col-span-6 ${
                      isSplitLayout ? 'lg:col-start-1' : ''
                    }`}>
                      <div className="w-full">
                        <ProjectMockup 
                          type={project.visualPreview.uiMockupType} 
                          title={project.title}
                          galleryImages={project.galleryImages}
                          accentColor={project.accentColor}
                        />
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              );
            })}
          </div>
        )}

        {/* Post-Projects Conversion Strip with BorderGlow */}
        <BorderGlow
          backgroundColor="#101014"
          borderRadius={24}
          glowRadius={36}
          colors={['#FF4D00', '#FF8A00', '#00F0FF']}
          className="mt-14 sm:mt-20 p-6 sm:p-10 lg:p-12"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#FF4D00] uppercase font-bold mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>CUSTOM BUSINESS SOFTWARE</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-white">
                Have a tailored business platform or app to build?
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1">
                I can take your project from initial idea to architecture, development, and cloud launch.
              </p>
            </div>
            <button
              type="button"
              onClick={onStartProject}
              className="w-full md:w-auto shrink-0 min-h-[48px] px-8 py-3.5 sm:py-4 rounded-full bg-[#FF4D00] text-black font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-[#FF6420] transition-all shadow-[0_0_25px_rgba(255,77,0,0.4)] cursor-pointer"
            >
              Discuss Your System
            </button>
          </div>
        </BorderGlow>
      </div>

      {/* Case Study Detail Modal */}
      <ProjectDetailModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        onContactWithProject={handleContactWithProject}
      />
    </section>
  );
};
