import React, { useState } from 'react';
import { SERVICES_DATA } from '../../data/servicesData';
import { BorderGlow } from '../ui/BorderGlow';
import { DecryptedText } from '../ui/DecryptedText';
import { 
  Globe, 
  Layers, 
  Server, 
  Building2, 
  UtensilsCrossed, 
  LayoutDashboard, 
  ShoppingCart, 
  Webhook, 
  Database, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown 
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return Globe;
      case 'Layers': return Layers;
      case 'Server': return Server;
      case 'Building2': return Building2;
      case 'UtensilsCrossed': return UtensilsCrossed;
      case 'LayoutDashboard': return LayoutDashboard;
      case 'ShoppingCart': return ShoppingCart;
      case 'Webhook': return Webhook;
      case 'Database': return Database;
      default: return TrendingUp;
    }
  };

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="services" className="relative py-20 sm:py-28 lg:py-36 bg-[#080808] border-b border-white/[0.08] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Tag */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00]" />
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#FF4D00] uppercase font-bold">
                <DecryptedText
                  text="03 / FREELANCE CAPABILITIES"
                  animateOn="inViewHover"
                  sequential={true}
                  revealDirection="start"
                  speed={25}
                  className="text-[#FF4D00]"
                  encryptedClassName="text-[#00F0FF] font-mono"
                />
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight uppercase">
              Services & <br />
              <span className="text-zinc-500 font-serifDisplay italic lowercase">
                technical execution.
              </span>
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-base max-w-md font-light">
            I partner with businesses as an autonomous software engineer to build scalable software without corporate agency overhead.
          </p>
        </div>

        {/* 10 Services Editorial Accordion / Card System with BorderGlow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
          {SERVICES_DATA.map((service, idx) => {
            const Icon = getIcon(service.icon);
            const isExpanded = expandedIndex === idx;
            const isCardHovered = hoveredCardIdx === idx;

            return (
              <div
                key={service.number}
                onMouseEnter={() => setHoveredCardIdx(idx)}
                onMouseLeave={() => setHoveredCardIdx(null)}
                className="h-full"
              >
                <BorderGlow
                  borderRadius={20}
                  glowRadius={35}
                  edgeSensitivity={30}
                  glowIntensity={1.0}
                  glowColor="24 100 50"
                  backgroundColor={isExpanded ? '#14141B' : '#0D0D11'}
                  colors={['#FF4D00', '#FF8A00', '#00F0FF']}
                  className="h-full transition-all duration-300"
                >
                  <div className="p-4 sm:p-6 md:p-7 flex flex-col justify-between h-full">
                    <div>
                      {/* Top Bar: Number & Icon */}
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span className="font-mono text-[11px] sm:text-xs font-bold text-[#FF4D00] tracking-wider">
                          <DecryptedText
                            text={`SERVICE ${service.number}`}
                            sequential={true}
                            revealDirection="start"
                            speed={22}
                            isHovered={isCardHovered}
                            className="text-[#FF4D00]"
                            encryptedClassName="text-[#00F0FF] font-mono"
                          />
                        </span>
                        <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-[#FF4D00] transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Title with DecryptedText - Serial Left to Right on Hover */}
                      <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight">
                        <DecryptedText
                          text={service.title}
                          sequential={true}
                          revealDirection="start"
                          speed={22}
                          isHovered={isCardHovered}
                          className="text-white"
                          encryptedClassName="text-[#FF4D00] font-mono font-normal tracking-wide"
                        />
                      </h3>

                      {/* Short Description */}
                      <p className="mt-2 text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                        {service.shortDesc}
                      </p>

                    {/* Expandable Deep Content */}
                    {isExpanded && (
                      <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-white/10 space-y-3.5 sm:space-y-4 animate-in fade-in duration-200">
                        {/* Typical client problem */}
                        <div className="p-3 sm:p-3.5 rounded-xl bg-red-500/[0.04] border border-red-500/20">
                          <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase font-bold block mb-1">
                            Typical Client Problem:
                          </span>
                          <p className="text-zinc-300 text-xs font-light">
                            {service.typicalProblem}
                          </p>
                        </div>

                        {/* What I Deliver */}
                        <div>
                          <span className="text-[10px] font-mono tracking-widest text-[#FF4D00] uppercase font-bold block mb-2">
                            What I Deliver:
                          </span>
                          <div className="space-y-1.5">
                            {service.whatIDeliver.map((del, dIdx) => (
                              <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300 font-light">
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#FF4D00] shrink-0 mt-0.5" />
                                <span>{del}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Pills */}
                        <div>
                          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold block mb-1.5">
                            Core Technologies:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {service.technologies.map((t) => (
                              <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Toggle & Inquire Actions */}
                  <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => toggleExpand(idx)}
                      className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors focus:outline-none min-h-[36px]"
                    >
                      <span>{isExpanded ? 'Less Details' : 'Problem & Scope'}</span>
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#FF4D00]' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectService(service.title)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#FF4D00] hover:text-[#FF6420] font-semibold transition-colors min-h-[36px] px-2"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </BorderGlow>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
};
