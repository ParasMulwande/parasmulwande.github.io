import React from 'react';
import { Section } from './ui/Section';
import { Card } from './ui/Card';
import { DatasetConsole } from './viz/DatasetConsole';

const STAGES = [
  { step: '01', label: 'Raw data', note: 'imagery, feeds, telemetry' },
  { step: '02', label: 'Clean', note: 'nulls, dupes, types' },
  { step: '03', label: 'Analyze', note: 'EDA, distributions' },
  { step: '04', label: 'Model', note: 'CNN, RF, XGBoost' },
  { step: '05', label: 'Predict', note: 'inference' },
  { step: '06', label: 'Insight', note: 'decision' },
];

export const DataLabShowcase: React.FC = () => (
  <Section
    id="datalab"
    eyebrow="Data lab"
    title="The loop behind every project."
    lede="Collect, clean, interrogate, model, then ship the answer somewhere useful. This console is interactive — step through the pipeline."
  >
    {/* Pipeline */}
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {STAGES.map((s, i) => (
        <li key={s.step}>
          <div className="pipe-node h-full" data-reveal data-reveal-delay={i * 60}>
            <div className="pipe-step">{s.step}</div>
            <div className="pipe-label">{s.label}</div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-ink-muted">{s.note}</p>
          </div>
        </li>
      ))}
    </ol>

    <div className="mt-6">
      <DatasetConsole />
    </div>

    {/* Supporting charts */}
    <div className="mt-6 grid gap-5 lg:grid-cols-3">
      {/* Evaluation */}
      <Card reactive delay={60}>
        <span className="stat-label">Evaluation</span>
        <svg
          viewBox="0 0 220 130"
          className="mt-4 w-full"
          role="img"
          aria-label="Illustrative ROC curve rising steeply toward the top right, indicating strong classifier discrimination."
        >
          <g className="chart-grid">
            <line x1="0" y1="130" x2="220" y2="0" strokeWidth="0.5" opacity="0.5" />
            {[0.25, 0.5, 0.75].map((f) => (
              <line key={f} x1={220 * f} y1="0" x2={220 * f} y2="130" strokeWidth="0.5" opacity="0.3" />
            ))}
          </g>
          <path
            className="chart-line"
            d={Array.from({ length: 22 }, (_, i) => {
              const t = i / 21;
              const x = t * 220;
              const y = 130 - (0.05 + 0.95 * Math.pow(t, 0.4)) * 130;
              return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
            }).join(' ')}
            fill="none"
            stroke="#00A8FF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
          Discrimination reported per model, not asserted once.
        </p>
      </Card>

      {/* Feature importance */}
      <Card reactive delay={110}>
        <span className="stat-label">Feature importance</span>
        <div className="mt-5 space-y-3">
          {['Canopy cover', 'Soil moisture', 'Leaf lesions', 'Rainfall 7d', 'Temperature'].map(
            (f, i) => {
              const v = 0.94 - i * 0.17;
              return (
                <div key={f}>
                  <div className="mb-1 flex items-baseline justify-between">
                    <span className="text-[11px] text-ink-secondary">{f}</span>
                    <span className="font-mono-tech text-[10px] text-ink-muted">{v.toFixed(2)}</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full origin-left rounded-full bg-gradient-to-r from-[#0066FF] to-accent"
                      style={{
                        transform: 'scaleX(var(--v))',
                        ['--v' as string]: v,
                        transition: 'transform 900ms var(--ease-out-expo)',
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
          Which signals carried the predictive weight, ranked.
        </p>
      </Card>

      {/* Clustering */}
      <Card reactive delay={160}>
        <span className="stat-label">Cluster separation</span>
        <svg
          viewBox="0 0 220 130"
          className="mt-4 w-full"
          role="img"
          aria-label="Illustrative scatter plot showing three separated clusters."
        >
          <g className="chart-grid">
            <line x1="0" y1="130" x2="220" y2="0" strokeWidth="0.5" opacity="0.5" />
          </g>
          {Array.from({ length: 40 }, (_, i) => {
            const c = i % 3;
            const s = Math.sin(i * 45.233) * 10000;
            const r1 = s - Math.floor(s);
            const s2 = Math.sin(i * 12.71) * 10000;
            const r2 = s2 - Math.floor(s2);
            const cx = 36 + c * 70 + (r1 - 0.5) * 40;
            const cy = 100 - c * 28 + (r2 - 0.5) * 46;
            return (
              <circle
                key={i}
                className="chart-dot"
                cx={cx}
                cy={cy}
                r={2.8}
                fill={c === 1 ? '#00A8FF' : c === 2 ? '#4F46E5' : '#697386'}
                opacity={c === 1 ? 0.95 : 0.6}
                style={{ transitionDelay: `${i * 26}ms` }}
              />
            );
          })}
        </svg>
        <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
          Group structure checked visually before trusting any aggregate.
        </p>
      </Card>
    </div>
  </Section>
);
