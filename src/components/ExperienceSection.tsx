import React from 'react';
import { EXPERIENCE } from '../data/portfolioData';
import { Trophy, Check } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="section-y border-b border-white/[0.06]">
      <div className="shell">
        <p className="eyebrow" data-reveal>
          Experience
        </p>
        <h2 className="t-h1 mt-4 max-w-2xl" data-reveal data-reveal-delay="60">
          Where the work has happened.
        </h2>

        <div className="tl mt-12 space-y-8">
          {EXPERIENCE.map((exp, i) => (
            <div key={exp.role} className="tl-item" data-reveal data-reveal-delay={i * 90}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="t-h3">{exp.role}</h3>
                <span className="font-mono-tech text-[11px] tracking-[0.12em] text-ink-muted">
                  {exp.period}
                </span>
              </div>

              <div className="mt-1.5 flex flex-wrap items-center gap-2 font-mono-tech text-xs text-accent">
                <span>{exp.company}</span>
                {exp.workMode && (
                  <>
                    <span className="text-ink-muted" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-ink-muted">{exp.workMode}</span>
                  </>
                )}
              </div>

              <p className="t-body mt-3 max-w-2xl text-sm">{exp.summary}</p>

              {exp.bullets.length > 0 && (
                <ul className="mt-4 max-w-2xl space-y-2">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-3 text-sm leading-relaxed text-ink-secondary">
                      <Check size={14} className="mt-1 shrink-0 text-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {exp.achievement && (
                <div className="mt-5 max-w-2xl rounded-[12px] border border-accent/25 bg-accent/[0.06] p-4">
                  <div className="flex items-center gap-2">
                    <Trophy size={15} className="text-accent" />
                    <span className="font-mono-tech text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
                      {exp.achievement.title}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                    {exp.achievement.description}
                  </p>
                </div>
              )}

              {exp.tags.length > 0 && (
                <div className="node-grid mt-5">
                  {exp.tags.map((t) => (
                    <span key={t} className="node">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};