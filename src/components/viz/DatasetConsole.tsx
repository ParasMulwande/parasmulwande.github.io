import React, { useMemo, useState } from 'react';

/**
 * Dataset console — a small, honest model-inference readout.
 *
 * IMPORTANT: the numbers below are illustrative demo values used to show the
 * interface, not measured results from any project. The only real figure on
 * the site is the 96.4% CNN accuracy stated in the Agri-Weather project data,
 * which is passed in explicitly rather than invented here.
 */

const METRICS = [
  { key: 'accuracy', label: 'Accuracy', value: 94.2 },
  { key: 'precision', label: 'Precision', value: 92.8 },
  { key: 'recall', label: 'Recall', value: 91.7 },
  { key: 'f1', label: 'F1', value: 92.2 },
];

const STEPS = [
  { label: 'Collect', detail: 'samples + labels' },
  { label: 'Clean', detail: 'nulls · dupes · types' },
  { label: 'Analyze', detail: 'EDA · correlation' },
  { label: 'Model', detail: 'fit · tune · cv' },
  { label: 'Predict', detail: 'inference' },
  { label: 'Insight', detail: 'decision' },
];

const seeded = (i: number, salt = 0) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const DatasetConsole: React.FC = () => {
  const [stage, setStage] = useState(0);

  // A small "active" sparkline that shifts as the stage advances.
  const series = useMemo(
    () => Array.from({ length: 22 }, (_, i) => 0.25 + seeded(i, stage) * 0.7),
    [stage],
  );
  const pts = series
    .map((v, i) => `${((i / (series.length - 1)) * 100).toFixed(2)},${(100 - v * 100).toFixed(2)}`)
    .join(' ');

  return (
    <div className="console-grid relative overflow-hidden rounded-[14px] border border-white/[0.07] bg-bg/60 p-4 sm:p-6">
      {/* scan sweep */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-accent/[0.06] to-transparent scan-line" />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent motion-safe:animate-pulse" />
          <span className="font-mono-tech text-[10px] tracking-[0.18em] text-ink-secondary uppercase">
            Inference console
          </span>
        </div>
        <span className="rounded-[8px] border border-white/10 px-2 py-0.5 font-mono-tech text-[9px] tracking-[0.14em] text-ink-muted uppercase">
          Illustrative values
        </span>
      </div>

      {/* Pipeline steps */}
      <ol className="relative mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {STEPS.map((s, i) => (
          <li key={s.label}>
            <button
              type="button"
              onClick={() => setStage(i)}
              aria-pressed={stage === i}
              className={`w-full rounded-[10px] border px-3 py-2.5 text-left transition-all duration-200 ${
                stage === i
                  ? 'border-accent/50 bg-accent/10'
                  : 'border-white/[0.07] bg-white/[0.015] hover:border-white/20'
              }`}
            >
              <span
                className={`block font-mono-tech text-[9px] tracking-[0.14em] ${
                  stage === i ? 'text-accent' : 'text-ink-muted'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`mt-1 block font-display text-[13px] font-semibold tracking-tight ${
                  stage === i ? 'text-ink' : 'text-ink-secondary'
                }`}
              >
                {s.label}
              </span>
              <span className="mt-0.5 block font-mono-tech text-[9px] text-ink-muted">
                {s.detail}
              </span>
            </button>
          </li>
        ))}
      </ol>

      {/* Dataset table (illustrative shape, not real records) */}
      <div className="mt-6 overflow-hidden rounded-[10px] border border-white/[0.07]">
        <div className="grid grid-cols-4 gap-px bg-white/[0.04] font-mono-tech text-[9px] tracking-[0.12em] text-ink-muted uppercase">
          {['feature', 'value', 'group', 'quality'].map((h) => (
            <div key={h} className="bg-surface px-3 py-2">
              {h}
            </div>
          ))}
        </div>
        {Array.from({ length: 5 }, (_, r) => (
          <div
            key={r}
            className="grid grid-cols-4 gap-px border-t border-white/[0.05] bg-white/[0.04] font-mono-tech text-[10px] text-ink-secondary"
          >
            <div className="bg-surface px-3 py-2">f_{r + 1}</div>
            <div className="bg-surface px-3 py-2 text-ink">
              {(seeded(r, stage) * 4 + 0.2).toFixed(2)}
            </div>
            <div className="bg-surface px-3 py-2">
              {['A', 'B', 'A', 'C', 'B'][r]}
            </div>
            <div className="bg-surface px-3 py-2">
              <span className={seeded(r, stage + 2) > 0.35 ? 'text-[#a3e635]' : 'text-[#ffb020]'}>
                {seeded(r, stage + 2) > 0.35 ? 'ok' : 'review'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Metrics + live series */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[10px] border border-white/[0.07] bg-surface/60 p-4">
          <div className="flex items-baseline justify-between">
            <span className="stat-label">Stage output</span>
            <span className="font-mono-tech text-[10px] text-accent">{STEPS[stage].label}</span>
          </div>
          <svg viewBox="0 0 100 42" preserveAspectRatio="none" className="mt-3 h-20 w-full" aria-hidden="true">
            <defs>
              <linearGradient id="dsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00A8FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00A8FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={`0,42 ${pts} 100,42`} fill="url(#dsFill)" className="chart-area" />
            <polyline
              points={pts}
              fill="none"
              stroke="#00A8FF"
              strokeWidth={1.4}
              strokeLinejoin="round"
              className="chart-line"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-white/[0.07] bg-white/[0.04]">
          {METRICS.map((m) => (
            <div key={m.key} className="bg-surface px-3 py-3">
              <div className="stat-label">{m.label}</div>
              <div
                className="stat mt-1 text-xl"
                data-count={m.value}
                data-count-decimals="1"
                data-count-suffix="%"
              >
                0.0%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
