import React, { useState } from 'react';
import { ArrowRight, Mail, Github, Copy, Check, Sparkles, ChevronDown, FileDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { HeroDataSystem } from './viz/HeroDataSystem';
import { BtnLink } from './ui/Btn';

const SUPPORT = ['Machine Learning', 'Computer Vision', 'Deep Learning', 'Data Pipelines'];

export const HeroSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24 border-b border-white/[0.06]">
      {/* Subtle Apple Zenith ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[28rem] w-[46rem] rounded-full bg-[#2997ff]/[0.05] blur-[150px]" />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-10 lg:min-h-[78vh] lg:grid-cols-12 lg:gap-14">
          
          {/* Identity & Editorial Hierarchy */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-[12px] font-medium tracking-tight text-[#a1a1a6] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#30d158] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#30d158]"></span>
              </span>
              <span>Available for ML & AI roles</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 sm:mt-6">
              <span className="block font-display text-[2.25rem] xs:text-[2.65rem] sm:text-6xl lg:text-[4.2rem] font-bold tracking-[-0.03em] text-[#f5f5f7] leading-[1.06]">
                Paras Mulwande
              </span>
              <span className="block font-display text-[1.85rem] xs:text-[2.15rem] sm:text-5xl lg:text-[3.4rem] font-medium tracking-[-0.025em] text-[#86868b] leading-[1.1] mt-1 sm:mt-2">
                Data Scientist & ML Engineer.
              </span>
            </h1>

            {/* Tagline */}
            <p className="mt-5 sm:mt-6 max-w-xl text-[15px] sm:text-[17px] lg:text-[18px] leading-relaxed text-[#a1a1a6]">
              {PERSONAL_INFO.heroTagline}
            </p>

            {/* Support Disciplines */}
            <div className="mt-5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] text-[#86868b]">
              {SUPPORT.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 sm:px-3 py-0.5 tracking-tight"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Primary Action Row */}
            <div className="mt-9 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <BtnLink href="#projects" magnetic>
                View Selected Work
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </BtnLink>
              
              <BtnLink href="#contact" variant="secondary" magnetic>
                Get in Touch
              </BtnLink>

              <a
                href={PERSONAL_INFO.resumePath}
                download="Paras-Mulwande-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                data-magnetic
                aria-label="Download Paras Mulwande's Resume PDF"
                className="group relative inline-flex items-center justify-center gap-2 rounded-[12px] border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[14px] font-medium tracking-tight text-[#f5f5f7] transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] active:scale-[0.98] backdrop-blur-md cursor-pointer select-none"
              >
                <FileDown size={15} className="text-[#2997ff] transition-transform duration-200 group-hover:translate-y-0.5" />
                <span>Download Resume</span>
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label={`Send email to ${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 rounded-[12px] border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 text-[13px] text-[#86868b] transition-all duration-200 hover:text-[#f5f5f7] hover:border-white/20 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg max-w-full"
              >
                <Mail size={14} className="shrink-0 text-[#2997ff]" />
                <span className="font-mono text-[12px] truncate">{PERSONAL_INFO.email}</span>
              </a>
            </div>

            {/* Meta Coordinates */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-[13px] text-[#86868b]">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-[#f5f5f7]"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-[#f5f5f7]"
              >
                <Mail size={14} /> Email
              </a>
              <span className="flex items-center gap-1.5 text-[#86868b]">
                <span className="h-1 w-1 rounded-full bg-[#86868b]"></span>
                {PERSONAL_INFO.location}
              </span>
            </div>
          </div>

          {/* Interactive ML Pipeline Preview — Apple Frosted Container */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.1] bg-[#141416]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_1px_1px_rgba(255,255,255,0.06)]">
              {/* macOS window titlebar dots */}
              <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-2.5 bg-white/[0.02]">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/80"></div>
                </div>
                <div className="font-mono text-[10px] tracking-wider text-[#86868b]">
                  NEURAL PIPELINE
                </div>
                <div className="h-2.5 w-6"></div>
              </div>

              {/* Canvas Visual */}
              <div className="h-[19rem] sm:h-[22rem] lg:h-[24rem]">
                <HeroDataSystem />
              </div>
            </div>

            {/* Refined Typographic Metric Strip — Mobile Responsive */}
            <div className="mt-4 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-between gap-3 sm:gap-y-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3 sm:px-4 sm:py-3 backdrop-blur-md">
              {[
                { k: 'Models Deployed', v: PERSONAL_INFO.telemetry.modelsDeployed },
                { k: 'Research Papers', v: PERSONAL_INFO.telemetry.researchPapers },
                { k: 'Disciplines', v: PERSONAL_INFO.telemetry.coreDisciplines },
                { k: 'Primary Stack', v: 'PyTorch + Py' },
              ].map((m, idx, arr) => (
                <div key={m.k} className="flex items-center gap-3 sm:gap-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#86868b]">
                      {m.k}
                    </span>
                    <span className="font-display text-[13px] sm:text-[14px] lg:text-[15px] font-semibold tracking-tight text-[#f5f5f7]">
                      {m.v}
                    </span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="hidden sm:block h-6 w-[1px] bg-white/[0.08]" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll affordance */}
        <div className="pt-6">
          <a
            href="#about"
            className="group inline-flex items-center gap-2 text-[13px] text-[#86868b] transition-colors duration-200 hover:text-[#f5f5f7]"
          >
            <span>Explore overview</span>
            <ChevronDown size={14} className="transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
