import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] border-t border-white/[0.08] py-14 text-white/70 font-mono-tech text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/[0.08] items-start">
          
          {/* Left Column: Name, Tagline, Socials (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <span>{PERSONAL_INFO.firstName} {PERSONAL_INFO.lastName}</span>
              <span className="text-[#00f0ff] font-medium text-xs">[ ML & CREATIVE TECH ]</span>
            </div>

            <p className="font-body text-xs text-[#8e8e9f] max-w-md leading-relaxed">
              Engineering applied neural networks, computer vision pipelines, and sensory interactive interfaces.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px]">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-white/60 hover:text-[#00f0ff] transition-colors"
              >
                [ GITHUB ]
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-white/60 hover:text-[#00f0ff] transition-colors"
              >
                [ LINKEDIN ]
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-white/60 hover:text-[#00f0ff] transition-colors"
              >
                [ EMAIL ]
              </a>
              <a
                href="#contact"
                className="text-white/60 hover:text-[#a3e635] transition-colors"
              >
                [ TERMINAL // X ]
              </a>
            </div>
          </div>

          {/* Center Column: System Telemetry (3 cols) */}
          <div className="md:col-span-3 space-y-1">
            <div className="text-[10px] uppercase text-white/40 tracking-wider font-semibold">
              SYSTEM TELEMETRY
            </div>
            <div className="text-white/80 font-medium text-xs flex items-center gap-1.5 pt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff]"></span>
              <span>Nagpur, IN • IST GMT+5:30</span>
            </div>
          </div>

          {/* Right Column: Status Protocol (3 cols) */}
          <div className="md:col-span-3 space-y-1 flex flex-col md:items-end">
            <div className="text-[10px] uppercase text-white/40 tracking-wider font-semibold">
              STATUS PROTOCOL
            </div>
            <div className="text-[#a3e635] font-semibold text-xs flex items-center gap-1.5 pt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] animate-pulse"></span>
              <span>Active // Open for Engagements</span>
            </div>
            <button
              onClick={scrollToTop}
              className="mt-3 text-[11px] text-white/40 hover:text-[#00f0ff] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={12} />
            </button>
          </div>

        </div>

        {/* Copyright Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/40">
          <div>
            © 2026 PARAS MULWANDE. ALL RIGHTS RESERVED.
          </div>
          <div className="text-white/30 text-[10px]">
            ARCHITECTED FOR ML & FULL-STACK REAL-WORLD WORKFLOWS
          </div>
        </div>

      </div>
    </footer>
  );
};
