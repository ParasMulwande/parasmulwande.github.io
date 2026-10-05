import React from 'react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, PUBLICATIONS, EXPERIENCE } from '../data/portfolioData';
import { Section } from './ui/Section';
import { Card } from './ui/Card';

/** Every figure is derived from the portfolio data at runtime. */
const STATS = (() => {
  const tech = new Set<string>();
  SKILL_CATEGORIES.forEach((c) => c.skills.forEach((s) => tech.add(s)));
  return [
    { value: PROJECTS.length, label: 'Data Science projects' },
    { value: tech.size, label: 'Technologies applied' },
    { value: PUBLICATIONS.length, label: 'Peer-reviewed papers' },
    { value: EXPERIENCE.length, label: 'Professional roles' },
  ];
})();

const PILLARS = [
  {
    k: 'What I do',
    v: 'Build end-to-end machine learning systems — from data preparation and exploratory analysis through model training, evaluation, and deployment behind an interface people actually use.',
  },
  {
    k: 'What I build',
    v: 'Decision-support platforms, computer vision pipelines, and web applications that serve live predictions to real users.',
  },
  {
    k: 'Why data science',
    v: 'The hard problems are never solved by a model alone. They need clean data, honest evaluation, and software solid enough to survive contact with production.',
  },
];

export const AboutSection: React.FC = () => (
  <Section
    id="about"
    eyebrow="About"
    title={
      <>
        I turn raw data into <span className="text-accent">decisions</span>.
      </>
    }
    lede={PERSONAL_INFO.bio}
  >
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Narrative + media slot */}
      <div className="lg:col-span-7">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          {/* Portrait slot — designed so a real photo drops in without a redesign */}
          <div
            className="media-slot shrink-0 sm:w-44"
            style={{ aspectRatio: '4 / 5' }}
            data-reveal
            data-reveal-delay="80"
            aria-label="Portrait placeholder, ready for a profile photograph"
          >
            <div className="relative z-10 text-center">
              <div className="monogram text-5xl">PM</div>
              <div className="stat-label mt-3">Portrait</div>
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-4">
            {PILLARS.map((p, i) => (
              <div key={p.k} className="flex gap-4" data-reveal data-reveal-delay={100 + i * 70}>
                <span className="mt-[0.5rem] h-px w-6 shrink-0 bg-accent/50" aria-hidden="true" />
                <div>
                  <div className="font-mono-tech text-[11px] tracking-[0.14em] text-accent uppercase">
                    {p.k}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{p.v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Facts */}
      <div className="lg:col-span-5">
        <Card reactive sweep className="lg:sticky lg:top-24" delay={60}>
          <span className="eyebrow">At a glance</span>

          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7">
            {STATS.map((s, i) => (
              <div key={s.label} data-reveal data-reveal-delay={120 + i * 60}>
                <div className="stat text-4xl">
                  <span data-count={s.value} data-count-decimals="0" />
                </div>
                <div className="stat-label mt-2">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="hairline my-7" />

          <dl className="space-y-3 text-sm">
            {[
              ['Role', PERSONAL_INFO.roleLabel],
              ['Focus', 'ML · Computer Vision · Deep Learning'],
              ['Based in', PERSONAL_INFO.location],
              ['Availability', PERSONAL_INFO.availabilityStatus],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <dt className="stat-label">{k}</dt>
                <dd className="text-right text-ink-secondary">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </div>
  </Section>
);
