import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Section } from './ui/Section';
import { Code2, BarChart3, Cpu, Eye, Network, Boxes, ArrowRight } from 'lucide-react';

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2,
  BarChart3,
  Cpu,
  Eye,
  Network,
  Boxes,
};

export const SkillsSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const current = SKILL_CATEGORIES[active];
  const CurrentIcon = ICONS[current.iconName] ?? Code2;

  return (
    <Section
      id="skills"
      eyebrow="Expertise"
      title="Technical proficiency & disciplines."
      lede="Six core disciplines covering machine learning pipelines, deep learning computer vision, exploratory analysis, and production engineering."
      aside={
        <span className="font-mono text-[11px] text-[#86868b] tracking-wider uppercase">
          {SKILL_CATEGORIES.length} disciplines ·{' '}
          {SKILL_CATEGORIES.reduce((n, c) => n + c.skills.length, 0)} technologies
        </span>
      }
    >
      <div className="pt-2">
        {/* Editorial Grid: Category Index (Left) & Active Detail View (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Refined Navigation Strip */}
          <div
            className="lg:col-span-5 flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.08]"
            role="tablist"
            aria-label="Skill disciplines"
          >
            {SKILL_CATEGORIES.map((cat, i) => {
              const Icon = ICONS[cat.iconName] ?? Code2;
              const on = i === active;
              const formattedIndex = String(i + 1).padStart(2, '0');

              return (
                <button
                  key={cat.id}
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={on}
                  aria-controls={`panel-${cat.id}`}
                  onClick={() => setActive(i)}
                  className={`group flex items-center justify-between py-4 text-left transition-all duration-300 cursor-pointer ${
                    on ? 'text-[#f5f5f7]' : 'text-[#86868b] hover:text-[#f5f5f7]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-xs transition-colors duration-300 ${
                        on ? 'text-[#2997ff] font-semibold' : 'text-white/20 group-hover:text-white/40'
                      }`}
                    >
                      {formattedIndex}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <Icon
                        size={15}
                        className={`transition-colors duration-300 ${
                          on ? 'text-[#2997ff]' : 'text-[#86868b] group-hover:text-[#f5f5f7]'
                        }`}
                      />
                      <span className="text-[14px] sm:text-[15px] font-medium tracking-tight">
                        {cat.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-[#86868b]/70">
                      {cat.skills.length}
                    </span>
                    <div
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        on
                          ? 'bg-[#2997ff] scale-125 shadow-[0_0_8px_rgba(41,151,255,0.6)]'
                          : 'bg-transparent group-hover:bg-white/20'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Editorial Discipline Focus & Technology Typography */}
          <div
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
            className="lg:col-span-7 flex flex-col justify-between min-h-[340px] space-y-8"
          >
            {/* Header info for active discipline */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold text-[#2997ff] tracking-widest uppercase">
                  {current.code}
                </span>
                <span className="text-white/10 font-mono">/</span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#86868b]">
                  Core Specialization
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f5f7]">
                  {current.title}
                </h3>
              </div>

              <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#a1a1a6] font-normal max-w-xl">
                {current.description}
              </p>
            </div>

            {/* Technologies list presented with spacious, typography-first treatment */}
            <div className="pt-6 border-t border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#86868b]">
                  TECHNOLOGIES & CONCEPTS ({current.skills.length})
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {current.skills.map((skill) => (
                  <div
                    key={skill}
                    className="group flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-xs font-mono text-[#f5f5f7] transition-all duration-300 hover:border-[#2997ff]/40 hover:bg-[#2997ff]/5 hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2997ff]/70 transition-all duration-300 group-hover:scale-125 group-hover:bg-[#2997ff]" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle editorial footer marker */}
            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#86868b]">
              <span>Active Architecture Stack</span>
              <span className="text-[#2997ff]">CORE TECHNICAL SKILLS</span>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};

