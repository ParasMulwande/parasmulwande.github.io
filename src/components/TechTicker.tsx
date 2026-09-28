import React from 'react';
import { TICKER_ITEMS } from '../data/portfolioData';
import { Brain, Cpu, Eye, Network, Layers, Sparkles, Activity } from 'lucide-react';

export const TechTicker: React.FC = () => {
  // Icons to cycle through
  const icons = [Brain, Cpu, Eye, Network, Layers, Sparkles, Activity];

  return (
    <div className="relative border-y border-white/[0.08] bg-[#09090d] py-3 overflow-hidden select-none">
      {/* Gradient masks for edge fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#070709] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#070709] to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-max animate-marquee space-x-8 items-center text-[12px] font-mono-tech tracking-wider text-[#8e8e9f]">
        {/* Render twice for seamless infinite scroller */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => {
          const IconComponent = icons[idx % icons.length];
          return (
            <div key={idx} className="flex items-center space-x-3 shrink-0 hover:text-[#00f0ff] transition-colors">
              <IconComponent size={13} className="text-[#00f0ff]/70" />
              <span>{item}</span>
              <span className="text-[#00f0ff]/40 ml-4 font-bold">•</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
