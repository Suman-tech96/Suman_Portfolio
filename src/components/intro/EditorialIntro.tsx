import React from 'react';
import { Layers, Database, Lock, Zap, Server, ShieldCheck } from 'lucide-react';
import { BorderGlow } from '../ui/BorderGlow';

export const EditorialIntro: React.FC = () => {
  const capabilities = [
    {
      title: 'Frontend Precision',
      desc: 'Fast, responsive interfaces crafted with clean component architecture and fluid micro-interactions.',
      icon: Layers,
    },
    {
      title: 'Backend & APIs',
      desc: 'Robust RESTful and WebSocket services with structured routing, input sanitization, and graceful error recovery.',
      icon: Server,
    },
    {
      title: 'Database Architecture',
      desc: 'Normalized schema modeling in MongoDB and SQL, indexed for high-volume transactions and low latency.',
      icon: Database,
    },
    {
      title: 'Authentication & Security',
      desc: 'Granular Role-Based Access Control (RBAC), JWT token rotations, and encrypted credential storage.',
      icon: Lock,
    },
    {
      title: 'Real-Time Sync',
      desc: 'Low-latency Socket.IO channels powering live kitchen order tickets, chat streaming, and dynamic ledgers.',
      icon: Zap,
    },
    {
      title: 'Cloud & Turnkey Deployment',
      desc: 'Production deployment pipelines on Vercel and AWS, complete with environment secrets and DNS setup.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 bg-[#080808] border-b border-white/[0.08] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00]" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#FF4D00] uppercase font-bold">
            01 / PHILOSOPHY & CAPABILITY
          </span>
        </div>

        {/* Large Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <h2 className="font-display font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F5F2EB] leading-[1.12] sm:leading-[1.1] tracking-tight">
              I build modern digital products for businesses that need{' '}
              <span className="text-gradient-flame">more than a generic template.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed font-light">
              Most website templates fail when faced with real business operations: inventory reconciliations, role-based security, multi-party order queues, and custom tax billing. 
              I engineer bespoke software systems that match your exact business logic.
            </p>
          </div>
        </div>

        {/* Capabilities Grid with React Bits BorderGlow */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {capabilities.map((cap, idx) => (
            <BorderGlow
              key={idx}
              borderRadius={20}
              glowRadius={32}
              edgeSensitivity={32}
              glowIntensity={0.9}
              glowColor="24 100 50"
              backgroundColor="#0D0D11"
              colors={['#FF4D00', '#FF8A00', '#00F0FF']}
              className="h-full"
            >
              <div className="p-5 sm:p-7 md:p-8 h-full flex flex-col justify-between group">
                <div>
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#FF4D00] group-hover:scale-110 group-hover:bg-[#FF4D00]/10 transition-all duration-300 mb-4 sm:mb-6">
                    <cap.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#FF4D00] transition-colors mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                    {cap.desc}
                  </p>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
};
