import React from 'react';
import { BorderGlow } from '../ui/BorderGlow';
import {
  Briefcase,
  Code,
  MessageSquare,
  Server,
  Lock,
  Webhook,
  Smartphone,
  FileCheck,
  ShieldCheck,
  LifeBuoy
} from 'lucide-react';

export const WhyWorkWithMe: React.FC = () => {
  const advantages = [
    {
      title: 'Business-First Development',
      desc: 'I write code to achieve commercial goals, cut operational waste, and streamline workflows — not just for the sake of coding.',
      icon: Briefcase,
    },
    {
      title: 'Clean, Maintainable Architecture',
      desc: 'Modular, well-commented code structured with separation of concerns so your future team can easily extend it.',
      icon: Code,
    },
    {
      title: 'Direct, Responsive Communication',
      desc: 'You work directly with the engineer building your system. No account managers, lost context, or telephone games.',
      icon: MessageSquare,
    },
    {
      title: 'Scalable Backend Services',
      desc: 'High-performance Node.js & Express APIs designed with rate limiting, input validation, and optimized database queries.',
      icon: Server,
    },
    {
      title: 'Secure Authentication & RBAC',
      desc: 'Protected endpoints using JSON Web Tokens (JWT), salted hashing, and fine-grained role-based permissions.',
      icon: Lock,
    },
    {
      title: 'Real-World API Integrations',
      desc: 'Proven experience integrating third-party payment gateways, SMS dispatch, WebSocket feeds, and cloud services.',
      icon: Webhook,
    },
    {
      title: 'Responsive Cross-Device UI',
      desc: 'Interfaces thoroughly inspected from 320px mobile displays up to 4K desktop screens with zero layout breakage.',
      icon: Smartphone,
    },
    {
      title: 'Thorough Testing & Edge Case Handling',
      desc: 'Stress testing invalid form submissions, network disconnects, and concurrent user updates before production deploy.',
      icon: ShieldCheck,
    },
    {
      title: 'Documented Handover & Code Ownership',
      desc: 'You own 100% of your source code, configuration files, environment variables, and deployment credentials.',
      icon: FileCheck,
    },
    {
      title: 'Dedicated Post-Launch Support',
      desc: 'I remain available after launch to monitor production telemetry, apply patches, and assist with feature evolution.',
      icon: LifeBuoy,
    },
  ];

  return (
    <section id="why-me" className="relative py-20 sm:py-28 lg:py-36 bg-[#09090C] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#FF4D00] uppercase font-bold">
                04 / VALUE & DISCIPLINE
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight uppercase">
              Why Work <br />
              <span className="text-zinc-500 font-serifDisplay italic lowercase">
                with me directly.
              </span>
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-base max-w-md font-light">
            Working with an experienced independent engineer gives you agility, complete technical transparency, and senior-level execution.
          </p>
        </div>

        {/* 10 Advantages Grid — Scales gracefully across mobile, tablet, laptop, and 4K with BorderGlow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {advantages.map((adv, idx) => (
            <BorderGlow
              key={idx}
              borderRadius={16}
              glowRadius={25}
              edgeSensitivity={30}
              glowIntensity={0.85}
              glowColor="24 100 50"
              backgroundColor="#0C0C10"
              colors={['#FF4D00', '#FF8A00', '#00F0FF']}
              className="h-full"
            >
              <div className="p-4 sm:p-5 lg:p-6 flex flex-col justify-between h-full group">
                <div>
                  <div className="h-8 w-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#FF4D00] group-hover:bg-[#FF4D00]/10 transition-colors mb-3 sm:mb-4">
                    <adv.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#FF4D00] transition-colors leading-snug">
                    {adv.title}
                  </h3>
                  <p className="mt-2 text-zinc-400 text-xs font-light leading-relaxed">
                    {adv.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>0{idx + 1}</span>
                  <span className="text-emerald-400/80">PROVEN</span>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
};
