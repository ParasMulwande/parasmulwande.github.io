import React from 'react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import { Section } from './ui/Section';
import { Card } from './ui/Card';
import { BtnLink } from './ui/Btn';
import { ProjectVisual } from './viz/ProjectVisual';
import { ArrowUpRight, FileText } from 'lucide-react';

/**
 * Problem/approach framing is derived from each project's own description and
 * tags so nothing is claimed that the data does not support.
 */
const FRAMING: Record<string, { problem: string; approach: string }> = {
  'agri-weather': {
    problem:
      'Crop decisions rested on fragmented weather readings, with no way to diagnose disease directly from a leaf image.',
    approach:
      'Four ML/DL models consolidated behind one Flask dashboard, fusing CNN image diagnosis with Random Forest and XGBoost regressors over live weather data.',
  },
  'valorcut-ai': {
    problem:
      'Long-form gameplay footage buries clutch moments, requiring tedious manual review to identify winning rounds and frag highlights.',
    approach:
      'A spatial-temporal computer vision pipeline engineered to classify high-action combat cues for automated highlight extraction, with automated captions and vertical reframing in development.',
  },
};

/** Never let an unknown project break the page. */
const framingFor = (p: Project) =>
  FRAMING[p.id] ?? {
    problem: p.subtitle,
    approach: p.description,
  };

export const ProjectsSection: React.FC = () => (
  <Section
    id="projects"
    eyebrow="Case studies"
    title="Systems built, not tutorials followed."
    lede="Two projects covering the full path from problem statement to a working, published system."
    aside={<span className="stat-label">{PROJECTS.length} featured</span>}
  >
    <div className="space-y-12">
      {PROJECTS.map((p, pi) => {
        const f = framingFor(p);
        const isAgri = p.id === 'agri-weather';

        return (
          <div
            key={p.id}
            id={`project-${p.id}`}
            className={`relative overflow-hidden rounded-[28px] border p-6 sm:p-10 transition-all duration-300 ${
              isAgri
                ? 'border-white/[0.09] bg-[#121314]/90 shadow-[0_24px_60px_rgba(0,0,0,0.55),0_1px_1px_rgba(255,255,255,0.06)]'
                : 'border-white/[0.09] bg-[#141217]/90 shadow-[0_24px_60px_rgba(0,0,0,0.55),0_1px_1px_rgba(255,255,255,0.06)]'
            }`}
          >
            {/* Subtle contextual ambient corner glow */}
            <div
              className={`pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-[120px] opacity-40 ${
                isAgri ? 'bg-[#30d158]/20' : 'bg-[#bf5af2]/20'
              }`}
              aria-hidden="true"
            />

            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
              {/* Left Column: Narrative & Technical Details */}
              <div className="lg:col-span-6 space-y-5">
                
                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-semibold tracking-tight ${
                      isAgri
                        ? 'bg-[#30d158]/10 text-[#30d158] border border-[#30d158]/30'
                        : 'bg-[#bf5af2]/10 text-[#bf5af2] border border-[#bf5af2]/30'
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {p.tag}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-[#86868b] uppercase tracking-wider">
                    {p.badge}
                  </span>
                </div>

                {/* Project Title & Subtitle */}
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#f5f5f7]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] font-medium text-[#a1a1a6]">
                    {p.subtitle}
                  </p>
                </div>

                {/* Core Description */}
                <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#a1a1a6]">
                  {p.description}
                </p>

                {/* Technology Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-[#86868b]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Links: Source Code, Live Demo, and Peer-Reviewed Paper */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-[#f5f5f7] transition-all duration-200 hover:border-white/40 hover:bg-white/[0.12] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer"
                      aria-label={`View Source for ${p.title} on GitHub (opens in new tab)`}
                    >
                      <span>View Source</span>
                      <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#a1a1a6] group-hover:text-[#f5f5f7]" />
                    </a>
                  )}

                  {p.demoUrl && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-[#30d158]/40 bg-[#30d158]/15 px-4 py-2 text-[13px] font-medium text-[#30d158] transition-all duration-200 hover:border-[#30d158]/60 hover:bg-[#30d158]/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#30d158]/50 cursor-pointer shadow-[0_0_20px_rgba(48,209,88,0.15)]"
                      aria-label={`Open Live Demo for ${p.title} (opens in new tab)`}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#30d158]"></span>
                      </span>
                      <span>Live Demo</span>
                      <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}

                  {p.paperLink && (
                    <a
                      href={p.paperLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-2 text-[13px] font-medium text-[#2997ff] transition-all duration-200 hover:bg-[#2997ff]/20 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2997ff]/50 cursor-pointer"
                      aria-label={`Read Peer-Reviewed Paper on ${p.doi} (opens in new tab)`}
                    >
                      <FileText size={15} />
                      <span>Paper ({p.doi})</span>
                      <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Visual Showcase */}
              <div className="lg:col-span-6">
                <div className="lg:sticky lg:top-24">
                  <ProjectVisual project={p} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </Section>
);
