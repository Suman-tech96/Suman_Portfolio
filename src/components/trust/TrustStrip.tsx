import React from 'react';

export const TrustStrip: React.FC = () => {
  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Full-Stack' },
    { name: 'Node.js', category: 'Runtime' },
    { name: 'Express.js', category: 'Backend' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'JavaScript ES6+', category: 'Language' },
    { name: 'RESTful APIs', category: 'Architecture' },
    { name: 'Socket.IO', category: 'Real-Time' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'JWT & Auth', category: 'Security' },
    { name: 'Postman', category: 'API Testing' },
    { name: 'Git & GitHub', category: 'DevOps' },
    { name: 'Vercel & Cloud', category: 'Deployment' },
  ];

  return (
    <section className="relative py-12 border-y border-white/[0.08] bg-[#0A0A0C] overflow-hidden">
      {/* Background Gradient Line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF4D00]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF4D00]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-zinc-400 font-semibold flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00]" />
            Core Technologies & Production Stack
          </span>
          <span className="hidden sm:inline text-[11px] font-mono tracking-wider text-zinc-500">
            Engineered for Stability & Performance
          </span>
        </div>
      </div>

      {/* Ticker marquee */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Soft edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0A0A0C] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0A0A0C] to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap gap-3 sm:gap-4 animate-marquee py-2 hover:[animation-play-state:paused]">
          {[...technologies, ...technologies].map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] hover:border-[#FF4D00]/40 hover:bg-[#FF4D00]/10 transition-all cursor-default group"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 group-hover:bg-[#FF4D00] transition-colors" />
              <span className="font-mono text-xs sm:text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                {tech.name}
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
