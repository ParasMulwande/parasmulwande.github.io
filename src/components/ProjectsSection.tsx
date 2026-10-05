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
      'Long-form gameplay footage buried its strongest moments, and publishing vertical video meant re-editing every clip by hand.',
    approach:
      'A multi-modal pipeline that scores footage for visual salience, transcribes speech with Whisper ASR, and reframes 16:9 into 9:16 automatically.',
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
    <div className="space-y-8">
      {PROJECTS.map((p, pi) => {
        const f = framingFor(p);
        return (
          <Card
            key={p.id}
            as="article"
            reactive
            sweep
            delay={pi * 90}
            className="overflow-hidden"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Narrative */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="stat-label text-accent">{p.tag}</span>
                  <span className="rounded-[8px] border border-white/10 px-2 py-0.5 font-mono-tech text-[10px] tracking-[0.1em] text-ink-muted uppercase">
                    {p.badge}
                  </span>
                </div>

                <h3 className="t-h2 mt-4">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-secondary">{p.subtitle}</p>
                <p className="t-body mt-5 text-sm">{p.description}</p>

                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="stat-label">Problem</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                      {f.problem}
                    </dd>
                  </div>
                  <div>
                    <dt className="stat-label">Approach</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                      {f.approach}
                    </dd>
                  </div>
                </dl>

                {p.highlights.length > 0 && (
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {p.highlights.map((h, i) => (
                      <li
                        key={h.title}
                        className="rounded-[10px] border border-white/[0.06] bg-white/[0.02] p-3.5 transition-colors duration-200 hover:border-accent/25"
                        data-reveal
                        data-reveal-delay={i * 70}
                      >
                        <div className="text-xs font-semibold text-ink">{h.title}</div>
                        <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                          {h.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="node-grid mt-6">
                  {p.tags.map((t) => (
                    <span key={t} className="node">
                      {t}
                    </span>
                  ))}
                </div>

                {p.paperLink && (
                  <BtnLink
                    href={p.paperLink}
                    target="_blank"
                    rel="noreferrer"
                    variant="ghost"
                    className="mt-7 px-0 text-accent hover:bg-transparent hover:text-[#3CBCFF]"
                  >
                    <FileText size={15} />
                    Read the published paper
                    <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </BtnLink>
                )}
              </div>

              {/* Visual */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-24">
                  <div className="rounded-[14px] border border-white/[0.07] bg-surface/40 p-4">
                    <ProjectVisual project={p} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  </Section>
);
