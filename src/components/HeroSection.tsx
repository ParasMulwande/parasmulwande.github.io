import React, { useState } from 'react';
import { ArrowDown, Github, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const HeroSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToSystems = () => {
    const el = document.getElementById('systems');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[85vh] pt-10 pb-12 border-b border-white/[0.08] overflow-x-clip flex items-center">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7000ff]/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-20 left-10 w-80 h-80 bg-[#00f0ff]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="shell">
        
        {/* Top Label */}
        <div className="mb-4">
          <span className="font-mono-tech text-xs tracking-widest text-white/50 uppercase">
            {PERSONAL_INFO.roleLabel}
          </span>
        </div>

        {/* Hero Grid: Left Name/Bio & Right Telemetry Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Name, Bio, CTAs (8 cols on lg/xl for ample headline width) */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-6">
            
            {/* HUD Bracket Framed Name */}
            <div className="relative inline-block max-w-full py-2.5 sm:py-3.5 px-3 sm:px-6 overflow-hidden">
              {/* Corner HUD Brackets with Active Cyber Pulse Animation */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff] animate-hud-bracket pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00f0ff] animate-hud-bracket pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00f0ff] animate-hud-bracket pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00f0ff] animate-hud-bracket pointer-events-none"></div>

              {/* Sweeping Laser Scanline Overlay */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent animate-scanline pointer-events-none z-10"></div>

              <h1 className="font-display font-extrabold tracking-tight leading-[0.95] text-4xl sm:text-6xl md:text-7xl select-none relative z-0">
                <span className="block text-[#00f0ff] tracking-tight drop-shadow-[0_0_25px_rgba(0,240,255,0.4)] animate-cyber-glow">
                  PARAS //
                </span>
                <span className="block text-[#f4f4f6] tracking-tight animate-cyber-text-shimmer">
                  MULWANDE
                </span>
              </h1>
            </div>

            {/* Sub-headline / Primary Tagline */}
            <p className="font-body text-base sm:text-lg text-[#f4f4f6] font-medium leading-relaxed max-w-3xl">
              {PERSONAL_INFO.heroTagline}
            </p>

            {/* Narrative Bio */}
            <p className="font-body text-sm sm:text-base text-[#8e8e9f] leading-relaxed max-w-3xl">
              {PERSONAL_INFO.bio}
            </p>

            {/* Action Buttons Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              {/* Primary Cyber Action: Explore Featured Systems */}
              <button
                onClick={scrollToSystems}
                id="hero-explore-systems-btn"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#00f0ff] hover:bg-[#38f8ff] text-[#070709] font-mono-tech text-xs font-bold tracking-wider transition-all duration-150 glow-cyan-sm cursor-pointer"
              >
                <span>EXPLORE FEATURED SYSTEMS</span>
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </button>

              {/* Secondary Cyber Action: View GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                id="hero-github-btn"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-[#111116] hover:bg-[#181820] border border-white/20 hover:border-[#00f0ff] text-[#f4f4f6] hover:text-[#00f0ff] font-mono-tech text-xs tracking-wider transition-all duration-150"
              >
                <Github size={14} />
                <span>VIEW GITHUB</span>
              </a>

              {/* Tertiary Action: Copy Email */}
              <button
                onClick={handleCopyEmail}
                id="hero-copy-email-btn"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-sm bg-[#111116]/80 hover:bg-[#181820] border border-white/10 hover:border-white/30 text-xs font-mono-tech text-[#8e8e9f] hover:text-white transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-[#a3e635]" />
                    <span className="text-[#a3e635]">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Hazard Stripe Line */}
            <div className="hazard-line" aria-hidden="true" />

          </div>

          {/* Right Column: [NEURAL STACK TELEMETRY] HUD Panel */}
          <div className="lg:col-span-4 xl:col-span-4 w-full">
            <div className="rounded-md border border-white/15 bg-[#0e0e13]/90 backdrop-blur-md p-5 shadow-2xl relative overflow-hidden">
              
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff]/60 to-transparent"></div>

              {/* Panel Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 font-mono-tech text-xs">
                <div className="flex items-center gap-2 text-white/80 tracking-wider font-semibold">
                  <Terminal size={14} className="text-[#00f0ff]" />
                  <span>[NEURAL STACK TELEMETRY]</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#a3e635] text-[11px] font-medium tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635] animate-pulse"></span>
                  <span>ONLINE {PERSONAL_INFO.telemetry.onlinePercent}</span>
                </div>
              </div>

              {/* Telemetry Metrics 2x2 Grid */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Metric 1 */}
                <div className="p-3 rounded bg-[#13131a]/80 border border-white/[0.06] hover:border-white/15 transition-colors">
                  <div className="text-[10px] font-mono-tech text-[#8e8e9f] tracking-wider uppercase">
                    MODELS DEPLOYED
                  </div>
                  <div className="text-2xl font-mono-tech font-bold text-[#00f0ff] mt-1">
                    {PERSONAL_INFO.telemetry.modelsDeployed}
                  </div>
                  <div className="text-[11px] font-body text-white/60 mt-0.5 leading-tight">
                    {PERSONAL_INFO.telemetry.modelsSub}
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-3 rounded bg-[#13131a]/80 border border-white/[0.06] hover:border-white/15 transition-colors">
                  <div className="text-[10px] font-mono-tech text-[#8e8e9f] tracking-wider uppercase">
                    RESEARCH PAPERS
                  </div>
                  <div className="text-2xl font-mono-tech font-bold text-[#a3e635] mt-1">
                    {PERSONAL_INFO.telemetry.researchPapers}
                  </div>
                  <div className="text-[11px] font-body text-white/60 mt-0.5 leading-tight">
                    {PERSONAL_INFO.telemetry.researchSub}
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-3 rounded bg-[#13131a]/80 border border-white/[0.06] hover:border-white/15 transition-colors">
                  <div className="text-[10px] font-mono-tech text-[#8e8e9f] tracking-wider uppercase">
                    CORE DISCIPLINES
                  </div>
                  <div className="text-xl font-mono-tech font-bold text-[#f4f4f6] mt-1">
                    {PERSONAL_INFO.telemetry.coreDisciplines}
                  </div>
                  <div className="text-[11px] font-body text-white/60 mt-0.5 leading-tight">
                    {PERSONAL_INFO.telemetry.coreDisciplinesSub}
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="p-3 rounded bg-[#13131a]/80 border border-white/[0.06] hover:border-white/15 transition-colors">
                  <div className="text-[10px] font-mono-tech text-[#8e8e9f] tracking-wider uppercase">
                    ENGINE STACK
                  </div>
                  <div className="text-base font-mono-tech font-bold text-[#00f0ff] mt-1 truncate">
                    {PERSONAL_INFO.telemetry.engineStack}
                  </div>
                  <div className="text-[11px] font-body text-white/60 mt-0.5 leading-tight">
                    {PERSONAL_INFO.telemetry.engineStackSub}
                  </div>
                </div>

              </div>

              {/* Bottom CLI Prompt simulation */}
              <div className="mt-4 pt-3 border-t border-white/10 font-mono-tech text-[11px] flex items-center justify-between text-white/70">
                <span className="text-[#00f0ff] truncate">
                  {'> init_agent(target="Paras_Mulwande")'}
                </span>
                <span className="text-[#a3e635] font-semibold ml-2 shrink-0">[OK]</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};