import React from 'react';
import { PROJECTS } from '../data/portfolioData';
import { ArrowUpRight, FileText } from 'lucide-react';

/** Deterministic pseudo-random from a string, so charts never change between renders. */
const seeded = (s: string, i: number) => {
  let h = 2166136261;
  for (let k = 0; k < s.length; k++) {
    h ^= s.charCodeAt(k);
    h = Math.imul(h, 16777619);
  }
  return Math.abs((h >> (i % 12)) % 1000) / 1000;
};

const linePath = (id: string, w: number, h: number, n: number) => {
  const pts = Array.from({ length: n }, (_, i) => {
    const x = (i / (n - 1)) * w;
    const y = h - (0.25 + seeded(id, i) * 0.65) * h;
    return [x, y] as const;
  });
  return pts
    .map(([x, y], i) => {
      if (i === 0) return `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      const [px, py] = pts[i - 1];
      const mx = (px + x) / 2;
      return `C ${mx.toFixed(1)} ${py.toFixed(1)}, ${mx.toFixed(1)} ${y.toFixed(1)}, ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
};

const ProjectViz: React.FC<{ id: string; accuracy?: string }> = ({ id, accuracy }) => {
  const W = 320;
  const H = 88;
  const bars = Array.from({ length: 16 }, (_, i) => 0.3 + seeded(id + 'b', i) * 0.7);

  return (
    <div className="rounded-[12px] border border-white/[0.06] bg-bg/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="stat-label">Model behaviour</span>
        {accuracy && (
          <span className="font-mono-tech text-[10px] tracking-[0.12em] text-accent">
            {accuracy}
          </span>
        )}
      </div>

      {/* bar series */}
      <svg viewBox={`0 0 ${W} 56`} className="w-full" preserveAspectRatio="none" aria-hidden="true">
        {bars.map((v, i) => {
          const bw = W / bars.length - 3;
          const x = i * (W / bars.length);
          return (
            <rect
              key={i}
              className="chart-bar"
              x={x}
              y={56 - v * 56}
              width={bw}
              height={v * 56}
              rx={1.5}
              fill={i > 11 ? '#00A8FF' : '#0066FF'}
              opacity={i > 11 ? 0.9 : 0.42}
              style={{ transitionDelay: `${i * 45}ms` }}
            />
          );
        })}
      </svg>

      {/* line series */}
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full" aria-hidden="true">
        <g className="chart-grid">
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={0} y1={(i / 3) * H} x2={W} y2={(i / 3) * H} strokeWidth={0.5} />
          ))}
        </g>
        <path
          className="chart-line"
          d={linePath(id, W, H, 14)}
          fill="none"
          stroke="#00A8FF"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="section-y border-b border-white/[0.06]">
      <div className="shell">
        <p className="eyebrow" data-reveal>
          Case studies
        </p>
        <h2 className="t-h1 mt-4 max-w-2xl" data-reveal data-reveal-delay="60">
          Systems built, not tutorials followed.
        </h2>
        <p className="t-lead mt-4 max-w-2xl" data-reveal data-reveal-delay="100">
          Two projects that show the full path from problem statement to a
          working, published system.
        </p>

        <div className="mt-12 space-y-8">
          {PROJECTS.map((p, pi) => (
            <article
              key={p.id}
              className="card-lab overflow-hidden"
              data-reveal
              data-reveal-delay={pi * 80}
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                {/* Narrative */}
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="stat-label text-accent">{p.tag}</span>
                    <span className="rounded-[8px] border border-white/10 px-2 py-0.5 font-mono-tech text-[10px] tracking-[0.1em] text-ink-muted">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="t-h2 mt-4">{p.title}</h3>
                  <p className="mt-2 text-sm text-ink-secondary">{p.subtitle}</p>

                  <p className="t-body mt-5 text-sm">{p.description}</p>

                  {/* Problem / solution framing derived from the data */}
                  <dl className="mt-6 space-y-3">
                    <div>
                      <dt className="stat-label">Problem</dt>
                      <dd className="mt-1 text-sm text-ink-secondary">
                        {p.id === 'agri-weather'
                          ? 'Crop decisions were made on fragmented weather readings, with no way to diagnose disease directly from a leaf image.'
                          : 'Long-form gameplay footage buried its best moments, and publishing vertical video meant manual re-editing every clip.'}
                      </dd>
                    </div>
                    <div>
                      <dt className="stat-label">Approach</dt>
                      <dd className="mt-1 text-sm text-ink-secondary">
                        {p.id === 'agri-weather'
                          ? 'Consolidated four ML/DL models behind one Flask dashboard, fusing CNN image diagnosis with Random Forest and XGBoost regressors over live weather data.'
                          : 'A multi-modal pipeline that scores footage for visual salience, transcribes speech with Whisper, and reframes 16:9 into 9:16 automatically.'}
                      </dd>
                    </div>
                  </dl>

                  {p.highlights.length > 0 && (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {p.highlights.map((h, i) => (
                        <li
                          key={h.title}
                          className="rounded-[10px] border border-white/[0.06] bg-white/[0.02] p-3"
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
                    <a
                      href={p.paperLink}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors duration-200 hover:text-[#3CBCFF]"
                    >
                      <FileText size={15} />
                      Read the published paper
                      <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>

                {/* Visual */}
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-24">
                    <div
                      className="mb-3 flex items-center justify-between"
                      data-reveal
                      data-reveal-delay="120"
                    >
                      <span className="stat-label">{p.metricLabel}</span>
                      <span className="font-mono-tech text-[10px] tracking-[0.1em] text-ink-muted">
                        {p.metricValue}
                      </span>
                    </div>
                    <ProjectViz
                      id={p.id}
                      accuracy={p.id === 'agri-weather' ? '96.4% TEST ACCURACY' : undefined}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};