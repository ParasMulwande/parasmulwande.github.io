import React from 'react';
import { BarChart3, LineChart, ChartScatter } from 'lucide-react';

const STAGES = [
  { step: '01', label: 'Raw data', note: 'Leaf imagery, weather feeds, telemetry' },
  { step: '02', label: 'Clean', note: 'Null handling, dedupe, normalisation' },
  { step: '03', label: 'Analyze', note: 'EDA, distributions, correlation' },
  { step: '04', label: 'Model', note: 'CNN, Random Forest, XGBoost' },
  { step: '05', label: 'Insight', note: 'Diagnosis and recommendations' },
];

const seeded = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** ROC-style curve — illustrative of the evaluation work described in the projects. */
const rocPath = (w: number, h: number) => {
  const pts = Array.from({ length: 24 }, (_, i) => {
    const t = i / 23;
    const x = t * w;
    const y = h - (0.06 + 0.94 * Math.pow(t, 0.42)) * h;
    return [x, y] as const;
  });
  return pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
};

export const DataLabShowcase: React.FC = () => {
  const W = 200;
  const H = 120;

  return (
    <section id="datalab" className="section-y border-b border-white/[0.06]">
      <div className="shell">
        <p className="eyebrow" data-reveal>
          Data lab
        </p>
        <h2 className="t-h1 mt-4 max-w-2xl" data-reveal data-reveal-delay="60">
          How the work actually moves.
        </h2>
        <p className="t-lead mt-4 max-w-2xl" data-reveal data-reveal-delay="100">
          The same loop runs behind every project here — collect, clean,
          interrogate, model, then ship the answer somewhere useful.
        </p>

        {/* Pipeline */}
        <div
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
          data-reveal
          data-reveal-delay="120"
        >
          {STAGES.map((s, i) => (
            <React.Fragment key={s.step}>
              <div
                className="pipe-node"
                data-reveal
                data-reveal-delay={i * 80}
              >
                <div className="pipe-step">{s.step}</div>
                <div className="pipe-label">{s.label}</div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-ink-muted">{s.note}</p>
              </div>
              {i < STAGES.length - 1 && (
                <div className="pipe-arrow hidden lg:flex" aria-hidden="true">
                  <span className="sr-only">then</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Chart gallery */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {/* ROC */}
          <div className="card-lab" data-reveal data-reveal-delay="60">
            <div className="flex items-center gap-2">
              <LineChart size={15} className="text-accent" />
              <span className="stat-label">Model evaluation</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label="Illustrative ROC curve rising steeply toward the top right, indicating strong classifier discrimination.">
              <g className="chart-grid">
                <line x1={0} y1={H} x2={W} y2={0} strokeWidth={0.5} opacity={0.5} />
                {[0.25, 0.5, 0.75].map((f) => (
                  <line key={f} x1={W * f} y1={0} x2={W * f} y2={H} strokeWidth={0.5} opacity={0.35} />
                ))}
              </g>
              <path
                className="chart-line"
                d={rocPath(W, H)}
                fill="none"
                stroke="#00A8FF"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
              <path d={`M 0 ${H} L ${W} ${H}`} stroke="#697386" strokeWidth={0.75} opacity={0.5} fill="none" />
            </svg>
            <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
              Cross-validated discrimination, reported per model rather than
              asserted once.
            </p>
          </div>

          {/* Feature importance */}
          <div className="card-lab" data-reveal data-reveal-delay="120">
            <div className="flex items-center gap-2">
              <BarChart3 size={15} className="text-accent" />
              <span className="stat-label">Feature importance</span>
            </div>
            <div className="mt-5 space-y-3">
              {['Canopy cover', 'Soil moisture', 'Leaf lesions', 'Rainfall 7d', 'Temperature'].map(
                (f, i) => {
                  const v = 0.92 - i * 0.16 - seeded(i) * 0.05;
                  return (
                    <div key={f}>
                      <div className="mb-1 flex items-baseline justify-between">
                        <span className="text-[11px] text-ink-secondary">{f}</span>
                        <span className="font-mono-tech text-[10px] text-ink-muted">
                          {v.toFixed(2)}
                        </span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-white/[0.05]">
                        <div
                          className="chart-bar h-full origin-left rounded-full bg-gradient-to-r from-[#0066FF] to-accent"
                          style={{
                            transform: 'scaleX(var(--v))',
                            ['--v' as string]: v,
                            width: '100%',
                            transitionDelay: `${i * 90}ms`,
                          }}
                        />
                      </div>
                    </div>
                  );
                },
              )}
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-ink-muted">
              Which signals actually carried predictive weight, ranked rather
              than hand-waved.
            </p>
          </div>

          {/* Scatter / clustering */}
          <div className="card-lab" data-reveal data-reveal-delay="180">
            <div className="flex items-center gap-2">
              <ChartScatter size={15} className="text-accent" />
              <span className="stat-label">Cluster separation</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label="Scatter plot of two clusters separated into distinct groups.">
              <g className="chart-grid">
                <line x1={0} y1={H} x2={W} y2={0} strokeWidth={0.5} opacity={0.5} />
              </g>
              {Array.from({ length: 34 }, (_, i) => {
                const cluster = i % 3;
                const cx = 34 + cluster * 62 + (seeded(i) - 0.5) * 34;
                const cy = 96 - cluster * 26 + (seeded(i + 9) - 0.5) * 46;
                return (
                  <circle
                    key={i}
                    className="chart-dot"
                    cx={cx}
                    cy={cy}
                    r={2.6}
                    fill={cluster === 1 ? '#00A8FF' : cluster === 2 ? '#4F46E5' : '#697386'}
                    opacity={cluster === 1 ? 0.95 : 0.6}
                    style={{ transitionDelay: `${i * 28}ms` }}
                  />
                );
              })}
            </svg>
            <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
              Group structure checked visually before trusting any aggregate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};