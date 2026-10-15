import React from 'react';
import { TICKER_ITEMS } from '../data/portfolioData';
import { Brain, Cpu, Eye, Network, Layers, Sparkles, Activity } from 'lucide-react';

export const TechTicker: React.FC = () => {
  const icons = [Brain, Cpu, Eye, Network, Layers, Sparkles, Activity];

  return (
    <div className="relative border-y border-white/[0.05] bg-[#0c0c0e]/50 py-3 overflow-hidden select-none backdrop-blur-md">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-max animate-marquee space-x-10 items-center text-[12px] font-mono tracking-tight text-[#86868b]">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => {
          const IconComponent = icons[idx % icons.length];
          return (
            <div key={idx} className="flex items-center space-x-3 shrink-0 hover:text-[#f5f5f7] transition-colors cursor-default">
              <IconComponent size={14} className="text-[#a1a1a6] opacity-70" />
              <span>{item}</span>
              <span className="text-white/20 ml-5 font-bold">·</span>
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
          animation: marquee 38s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
