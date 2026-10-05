import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code2, BarChart3, Cpu, Eye, Network, Boxes } from 'lucide-react';

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

  return (
    <section id="skills" className="section-y border-b border-white/[0.06]">
      <div className="shell">
        <p className="eyebrow" data-reveal>
          Expertise
        </p>
        <h2 className="t-h1 mt-4 max-w-2xl" data-reveal data-reveal-delay="60">
          The data science stack, in practice.
        </h2>
        <p className="t-lead mt-4 max-w-2xl" data-reveal data-reveal-delay="100">
          Six disciplines, drawn from the projects and research on this site.
          Select a category to see what it covers in practice.
        </p>

        {/* Category selector */}
        <div
          className="mt-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Skill categories"
          data-reveal
          data-reveal-delay="140"
        >
          {SKILL_CATEGORIES.map((cat, i) => {
            const Icon = ICONS[cat.iconName] ?? Code2;
            const on = i === active;
            return (
              <button
                key={cat.id}
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={on}
                aria-controls={`panel-${cat.id}`}
                onClick={() => setActive(i)}
                className={`inline-flex items-center gap-2 rounded-[10px] border px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
                  on
                    ? 'border-accent/50 bg-accent/10 text-accent'
                    : 'border-white/10 bg-white/[0.02] text-ink-secondary hover:border-white/25 hover:text-ink'
                }`}
              >
                <Icon size={14} />
                <span className="font-mono-tech tracking-[0.06em]">{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          className="card-lab mt-5"
          data-reveal
          data-reveal-delay="60"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-xl">
              <h3 className="t-h3">{current.title}</h3>
              <p className="t-body mt-2 text-sm">{current.description}</p>
            </div>
            <span className="stat-label shrink-0 border border-white/10 rounded-[8px] px-2 py-1">
              {current.code}
            </span>
          </div>

          <div className="node-grid mt-6">
            {current.skills.map((s, i) => (
              <span
                key={s}
                className="node"
                data-reveal
                data-reveal-delay={i * 45}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};