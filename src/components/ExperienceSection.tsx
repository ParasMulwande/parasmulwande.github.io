import React, { useEffect, useRef } from 'react';
import { EXPERIENCE } from '../data/portfolioData';
import { Section } from './ui/Section';
import { Award, ArrowUpRight } from 'lucide-react';

/**
 * Premium editorial career timeline.
 * Features distinct, clearly separated entries with an elegant vertical spine,
 * subtle progress fill, refined award highlight, readable achievement grouping,
 * and secondary skill tags.
 */
export const ExperienceSection: React.FC = () => {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.8;
      const end = vh * 0.3;
      const total = r.height + (start - end);
      const passed = start - r.top;
      const pct = Math.max(0, Math.min(1, passed / Math.max(1, total)));
      list.style.setProperty('--tl', `${(pct * 100).toFixed(1)}%`);

      list.querySelectorAll<HTMLElement>('.timeline-entry').forEach((item) => {
        const ir = item.getBoundingClientRect();
        item.classList.toggle('is-active', ir.top <= vh * 0.65);
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    if (reduce.matches) {
      list.style.setProperty('--tl', '100%');
      list.querySelectorAll<HTMLElement>('.timeline-entry').forEach((i) => i.classList.add('is-active'));
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where the work has happened."
      lede="A timeline of roles, responsibilities and what was actually delivered."
      aside={
        <span className="font-mono text-[11px] text-[#86868b] tracking-wider uppercase">
          {EXPERIENCE.length} verified roles
        </span>
      }
    >
      <div ref={listRef} className="relative pt-4 lg:pt-6">
        {/* Background track spine */}
        <div
          className="absolute left-[11px] sm:left-[17px] lg:left-[184px] top-6 bottom-8 w-[1px] bg-white/[0.08]"
          aria-hidden="true"
        />

        {/* Dynamic electric-blue fill spine */}
        <div
          className="tl-progress-bar absolute left-[11px] sm:left-[17px] lg:left-[184px] top-6 w-[1px] bg-gradient-to-b from-[#2997ff] via-[#2997ff]/70 to-[#2997ff]/20 transition-all duration-150"
          style={{ height: 'var(--tl, 0%)', maxHeight: 'calc(100% - 3rem)' }}
          aria-hidden="true"
        />

        <div className="space-y-14 sm:space-y-16 lg:space-y-24">
          {EXPERIENCE.map((exp, i) => {
            const isFeatured = exp.role.includes('Artificial Intelligence');

            return (
              <article
                key={exp.role}
                className="timeline-entry group relative grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-14 pl-8 sm:pl-12 lg:pl-0"
                data-reveal
                data-reveal-delay={i * 90}
              >
                {/* Left Column (Desktop): Date & Metadata */}
                <div className="lg:col-span-2 lg:text-right flex flex-col lg:items-end justify-start pt-1">
                  <span className="inline-block font-mono text-[11px] sm:text-[12px] font-semibold tracking-wider text-[#86868b] uppercase">
                    {exp.period}
                  </span>
                  {exp.workMode && (
                    <span className="mt-1 sm:mt-1.5 inline-flex items-center gap-1 font-mono text-[10px] tracking-widest text-[#2997ff] uppercase">
                      <span className="h-1 w-1 rounded-full bg-[#2997ff]" />
                      {exp.workMode}
                    </span>
                  )}
                </div>

                {/* Timeline Node Marker */}
                <div
                  className="absolute left-[6px] sm:left-[12px] lg:left-[179px] top-[7px] z-10 flex h-[11px] w-[11px] items-center justify-center rounded-full border border-white/20 bg-[#000000] transition-all duration-300 group-hover:border-[#2997ff] group-hover:scale-125"
                  aria-hidden="true"
                >
                  <span className="h-[5px] w-[5px] rounded-full bg-white/40 transition-colors duration-300 group-hover:bg-[#2997ff]" />
                </div>

                {/* Right Column: Role Details & Narrative */}
                <div className="lg:col-span-10 space-y-6 max-w-3xl">
                  {/* Role Header */}
                  <div className="space-y-2 border-b border-white/[0.06] pb-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#f5f5f7]">
                        {exp.role}
                      </h3>
                      {isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-wider text-[#2997ff] uppercase">
                          AI Practicum
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[14px] text-[#86868b]">
                      <span className="font-medium text-[#f5f5f7]/90">{exp.company}</span>
                    </div>
                  </div>

                  {/* Role Executive Summary */}
                  <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#a1a1a6] font-normal">
                    {exp.summary}
                  </p>

                  {/* Compact, Elegant Award Highlight (Top Performer) */}
                  {exp.achievement && (
                    <div className="relative overflow-hidden rounded-xl border border-[#2997ff]/25 bg-gradient-to-r from-[#2997ff]/[0.06] via-[#2997ff]/[0.02] to-transparent p-4 transition-all duration-300 hover:border-[#2997ff]/40">
                      <div className="flex items-start gap-3.5">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#2997ff]/30 bg-[#2997ff]/10 text-[#2997ff]">
                          <Award size={15} />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-semibold tracking-wider text-[#2997ff] uppercase">
                              Recognition
                            </span>
                            <span className="text-white/20 font-mono text-[10px]">/</span>
                            <span className="text-[13px] font-semibold text-[#f5f5f7]">
                              {exp.achievement.title}
                            </span>
                          </div>
                          <p className="text-[13px] leading-relaxed text-[#a1a1a6]">
                            {exp.achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Organized Achievements / Responsibilities — Clean Editorial List */}
                  {exp.bullets.length > 0 && (
                    <div className="space-y-3 pt-1">
                      <span className="font-mono text-[10px] tracking-wider text-[#86868b] uppercase block">
                        Key Responsibilities & Deliverables
                      </span>
                      <ul className="space-y-3.5">
                        {exp.bullets.map((bullet, bi) => (
                          <li
                            key={bi}
                            className="group/item flex items-start gap-3.5"
                          >
                            <span className="mt-[7px] flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#2997ff] transition-transform duration-200 group-hover/item:scale-125" />
                            <span className="text-[14px] leading-relaxed text-[#a1a1a6] transition-colors duration-200 group-hover/item:text-[#f5f5f7]">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Subtle, Secondary Skill Tags */}
                  {exp.tags.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] tracking-wider text-[#86868b]/70 uppercase mr-1">
                        Domain focus:
                      </span>
                      {exp.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/[0.06] bg-white/[0.01] px-3 py-1 font-mono text-[11px] text-[#86868b] transition-colors duration-200 hover:border-white/[0.12] hover:text-[#f5f5f7]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

