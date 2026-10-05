import React, { useEffect, useRef } from 'react';
import { EXPERIENCE } from '../data/portfolioData';
import { Section } from './ui/Section';
import { Trophy, Check } from 'lucide-react';

/**
 * Experience timeline. The spine fills as the section scrolls, and each node
 * activates as it is reached.
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
      // 0 when the top of the list reaches 75% of the viewport,
      // 1 when its bottom reaches 40% — so it fills with the read.
      const start = vh * 0.75;
      const end = vh * 0.4;
      const total = r.height + (start - end);
      const passed = start - r.top;
      const pct = Math.max(0, Math.min(1, passed / Math.max(1, total)));
      list.style.setProperty('--tl', `${(pct * 100).toFixed(1)}%`);

      list.querySelectorAll<HTMLElement>('.tl-item').forEach((item) => {
        const ir = item.getBoundingClientRect();
        item.classList.toggle('is-active', ir.top <= vh * 0.62);
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    if (reduce.matches) {
      list.style.setProperty('--tl', '100%');
      list.querySelectorAll<HTMLElement>('.tl-item').forEach((i) => i.classList.add('is-active'));
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
      aside={<span className="stat-label">{EXPERIENCE.length} roles</span>}
    >
      <div ref={listRef} className="tl">
        <span className="tl-progress" aria-hidden="true" />
        {EXPERIENCE.map((exp, i) => (
          <div key={exp.role} className="tl-item" data-reveal data-reveal-delay={i * 80}>
            <span className="tl-node absolute -left-[1.75rem] top-[6px] h-[11px] w-[11px] rounded-full border-2 border-accent bg-bg" aria-hidden="true" />

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
    </Section>
  );
};
