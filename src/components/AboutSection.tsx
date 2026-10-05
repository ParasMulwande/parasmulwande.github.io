import React from 'react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, PUBLICATIONS, EXPERIENCE } from '../data/portfolioData';

/**
 * Every figure below is derived from the portfolio data at runtime, so a
 * stat can never drift away from what the site actually claims.
 */
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

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-y border-b border-white/[0.06]">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Story */}
          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal>
              About
            </p>
            <h2 className="t-h1 mt-4" data-reveal data-reveal-delay="60">
              I turn raw data into{' '}
              <span className="text-accent">decisions</span>.
            </h2>

            <p
              className="t-lead mt-6 max-w-2xl"
              data-reveal
              data-reveal-delay="100"
            >
              {PERSONAL_INFO.bio}
            </p>

            <div className="mt-8 space-y-4" data-reveal data-reveal-delay="140">
              {[
                {
                  k: 'What I do',
                  v: 'Build end-to-end machine learning systems — from data preparation and exploratory analysis through model training, evaluation, and deployment behind a usable interface.',
                },
                {
                  k: 'What I build',
                  v: 'Decision-support platforms, computer vision pipelines, and web applications that serve real predictions to real users.',
                },
                {
                  k: 'Why data science',
                  v: 'The interesting problems are rarely solved by a model alone. They need clean data, honest evaluation, and software solid enough to survive contact with production.',
                },
              ].map((b) => (
                <div key={b.k} className="flex gap-4">
                  <span className="mt-[0.45rem] h-px w-6 shrink-0 bg-accent/50" aria-hidden="true" />
                  <div>
                    <div className="font-mono-tech text-[11px] tracking-[0.14em] text-accent uppercase">
                      {b.k}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{b.v}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Facts */}
          <div className="lg:col-span-5">
            <div className="card-lab" data-reveal data-reveal-delay="80">
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

              <hr className="rule my-7" />

              <dl className="space-y-3 text-sm">
                {[
                  ['Role', PERSONAL_INFO.roleLabel],
                  ['Disciplines', 'Machine Learning · Computer Vision · Deep Learning'],
                  ['Based in', PERSONAL_INFO.location],
                  ['Availability', PERSONAL_INFO.availabilityStatus],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <dt className="stat-label">{k}</dt>
                    <dd className="text-right text-ink-secondary">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};