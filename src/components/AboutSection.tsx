import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Section } from './ui/Section';
import { Sparkles, ArrowUpRight, Compass, ShieldCheck, MapPin } from 'lucide-react';

const PRINCIPLES = [
  {
    num: '01',
    title: 'What I do',
    body: 'Build end-to-end machine learning systems — from data preparation and exploratory analysis through model training, evaluation, and deployment behind an interface people actually use.',
  },
  {
    num: '02',
    title: 'What I build',
    body: 'Decision-support platforms, computer vision pipelines, and web applications that serve live predictions to real users.',
  },
  {
    num: '03',
    title: 'Why data science',
    body: 'The hard problems are never solved by a model alone. They need clean data, honest evaluation, and software solid enough to survive contact with production.',
  },
];

const PROFILE_DETAILS = [
  { label: 'Role', value: PERSONAL_INFO.roleLabel },
  { label: 'Specialization', value: 'Machine Learning · Computer Vision · Deep Learning' },
  { label: 'Location', value: PERSONAL_INFO.location },
  { label: 'Availability', value: PERSONAL_INFO.availabilityStatus },
];

export const AboutSection: React.FC = () => (
  <Section
    id="about"
    eyebrow="Identity & Purpose"
    divider={true}
    className="relative overflow-hidden"
  >
    {/* Editorial Master Container */}
    <div className="space-y-16 lg:space-y-20">
      
      {/* Top Banner: Expressive Headline + Portrait Composition */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-center">
        
        {/* Left Column: Expressive Headline & Spacious Bio */}
        <div className="lg:col-span-7 space-y-7">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-3.5 py-1 text-[11px] font-mono font-medium text-[#2997ff]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2997ff] animate-pulse" />
              <span>PHILOSOPHY & PROFILE</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-tight text-[#f5f5f7] leading-[1.12]">
              Turning raw data into actionable{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2997ff] via-[#64d2ff] to-[#f5f5f7]">
                decisions
              </span>
              .
            </h2>
          </div>

          <p className="text-[16px] sm:text-[17px] leading-relaxed text-[#a1a1a6] font-normal max-w-2xl">
            {PERSONAL_INFO.bio}
          </p>

          {/* Minimal Profile Dossier Row */}
          <div className="pt-2 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PROFILE_DETAILS.map((item) => (
              <div key={item.label} className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#86868b] block">
                  {item.label}
                </span>
                <span className="text-[12px] sm:text-[13px] font-medium text-[#f5f5f7] block leading-snug">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Distinctive Art-Directed Portrait Frame */}
        <div className="lg:col-span-5">
          <div className="group relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
            {/* Subtle ambient light aura */}
            <div
              className="pointer-events-none absolute -inset-2 rounded-[32px] bg-gradient-to-b from-[#2997ff]/15 via-transparent to-transparent blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-90"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#121214] shadow-[0_24px_60px_rgba(0,0,0,0.65),0_1px_1px_rgba(255,255,255,0.08)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0c0c0e]">
                <img
                  src="/paras-portrait.png"
                  alt="Paras Mulwande — Machine Learning Engineer & System Architect"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                
                {/* Subtle bottom vignette for text contrast */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0c0e]/90 via-transparent to-transparent opacity-80"
                  aria-hidden="true"
                />
              </div>

              {/* Portrait metadata bar */}
              <div className="border-t border-white/[0.08] bg-[#141416]/95 px-5 py-3 backdrop-blur-xl flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#30d158]" />
                  <span className="text-[#f5f5f7] font-semibold">{PERSONAL_INFO.name}</span>
                </div>
                <span className="text-[#86868b]">{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Connected Editorial Principles Composition */}
      <div className="pt-12 sm:pt-16 border-t border-white/[0.08]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
          {PRINCIPLES.map((p, idx) => (
            <div
              key={p.num}
              className={`group flex flex-col justify-between transition-colors duration-300 ${
                idx === 0
                  ? 'pb-10 md:pb-0 md:pr-10 lg:pr-12'
                  : idx === 1
                  ? 'py-10 md:py-0 md:px-10 lg:px-12'
                  : 'pt-10 md:pt-0 md:pl-10 lg:pl-12'
              }`}
            >
              <div className="space-y-6">
                {/* Oversized refined section number with electric-blue accent */}
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-4xl sm:text-5xl font-light tracking-tighter text-white/[0.18] transition-colors duration-300 group-hover:text-[#2997ff]/70 select-none">
                    {p.num}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-white/[0.15] transition-all duration-300 group-hover:bg-[#2997ff] group-hover:scale-125" />
                </div>

                {/* Scannable Heading */}
                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#f5f5f7] transition-colors duration-300 group-hover:text-white">
                  {p.title}
                </h3>

                {/* Clearly subordinate supporting text */}
                <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#a1a1a6] font-normal">
                  {p.body}
                </p>
              </div>

              {/* Subtle interactive bottom indicator line */}
              <div className="pt-8">
                <div className="h-[1px] w-8 bg-white/[0.1] transition-all duration-300 group-hover:w-16 group-hover:bg-[#2997ff]" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </Section>
);
