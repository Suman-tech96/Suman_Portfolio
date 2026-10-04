import React from 'react';
import { EXPERIENCE_DATA } from '../../data/experienceData';
import { Building, CheckCircle2, MapPin } from 'lucide-react';
import hdtLogo from '../../assets/hyper_digitech_logo.jpg';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-20 sm:py-28 lg:py-36 bg-[#080808] border-b border-white/[0.08] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#FF4D00] uppercase font-bold">
                07 / VERIFIED BACKGROUND
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight uppercase">
              Professional <br />
              <span className="text-zinc-500 font-serifDisplay italic lowercase">
                experience & engineering record.
              </span>
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-base max-w-md font-light">
            Genuine track record building production systems in agile tech teams and delivering client solutions independently.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6 sm:space-y-8">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-white/[0.08] hover:border-[#FF4D00]/40 transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-white/[0.08]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/30 text-[10px] sm:text-xs font-mono text-[#FF4D00] font-bold">
                      {exp.period}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                      {exp.location}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-zinc-500">
                      • {exp.type}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-white group-hover:text-[#FF4D00] transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-sm sm:text-base md:text-lg font-mono text-zinc-300 mt-1 flex items-center gap-2.5">
                    {exp.company.toLowerCase().includes('hyper digitech') ? (
                      <img src={hdtLogo} alt="Hyper Digitech" className="h-5 w-5 rounded-md object-contain bg-white/10 p-0.5 border border-white/15 shrink-0" />
                    ) : (
                      <Building className="h-4 w-4 text-[#00F0FF] shrink-0" />
                    )}
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:max-w-md">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] sm:text-xs font-mono text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description & Key Achievements */}
              <div className="pt-4 sm:pt-6">
                <p className="text-zinc-300 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-4 sm:mb-5">
                  {exp.description}
                </p>

                <div className="space-y-2">
                  {exp.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-zinc-400 font-light">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
