import React from 'react';
import type { Project } from '../../types';

/**
 * Project visuals.
 *
 * Each visual is built from what the project data actually states. Agri-Weather
 * uses its real 96.4% CNN accuracy; ValorCut reflects the capabilities the
 * project describes as in development, labelled as such.
 */

const seeded = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 41.77) * 43758.5453;
  return x - Math.floor(x);
};

/* ------------------------------------------------------------------ */
/* Agri-Weather — crop suitability + confidence + weather stream        */
/* ------------------------------------------------------------------ */

const AgriWeather: React.FC<{ project: Project }> = ({ project }) => {
  const crops = ['Wheat', 'Rice', 'Soybean', 'Cotton'];
  const weather = [
    { k: 'temp', label: 'Temp', v: '31°C' },
    { k: 'hum', label: 'Humidity', v: '68%' },
    { k: 'rain', label: 'Rain 7d', v: '42mm' },
    { k: 'soil', label: 'Soil moisture', v: '54%' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="stat-label">Crop suitability</span>
        <span className="rounded-[8px] border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono-tech text-[9px] tracking-[0.12em] text-accent">
          {project.metricValue}
        </span>
      </div>

      <div className="space-y-2.5">
        {crops.map((c, i) => {
          const v = 0.42 + seeded(i, 3) * 0.5;
          return (
            <div key={c}>
              <div className="mb-1 flex items-baseline justify-between">
                <span className="font-mono-tech text-[10px] text-ink-secondary">{c}</span>
                <span className="font-mono-tech text-[10px] text-ink-muted">
                  {(v * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                <div
                  className="chart-bar h-full rounded-full bg-gradient-to-r from-[#0066FF] to-accent"
                  style={{
                    transform: 'scaleY(1) scaleX(var(--v))',
                    ['--v' as string]: v,
                    transformOrigin: 'left',
                    transitionDelay: `${i * 110}ms`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Leaf diagnosis confidence — the project's real CNN capability */}
      <div className="rounded-[10px] border border-white/[0.07] bg-surface/60 p-3">
        <div className="flex items-center justify-between">
          <span className="stat-label">Leaf diagnosis</span>
          <span className="font-mono-tech text-[10px] text-accent">CNN classifier</span>
        </div>
        <div className="mt-3 flex items-end gap-1">
          {Array.from({ length: 14 }, (_, i) => {
            const v = 0.25 + seeded(i, 7) * 0.75;
            return (
              <div
                key={i}
                className="chart-bar flex-1 rounded-t-[2px] bg-accent/70"
                style={{
                  height: `${Math.max(6, v * 44)}px`,
                  transitionDelay: `${i * 40}ms`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-white/[0.07] bg-white/[0.04] sm:grid-cols-4">
        {weather.map((m) => (
          <div key={m.k} className="bg-surface px-3 py-2.5">
            <div className="stat-label">{m.label}</div>
            <div className="mt-1 font-display text-sm font-bold text-ink">{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* ValorCut — video timeline with detected events + vertical reframe    */
/* ------------------------------------------------------------------ */

const ValorCut: React.FC<{ project: Project }> = ({ project }) => {
  const events = [0.12, 0.28, 0.46, 0.61, 0.78, 0.9];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="stat-label">Event detection</span>
        <span className="rounded-[8px] border border-white/10 px-2 py-0.5 font-mono-tech text-[9px] tracking-[0.12em] text-ink-muted uppercase">
          In development
        </span>
      </div>

      {/* 16:9 -> 9:16 reframe */}
      <div className="relative flex h-32 items-center justify-center rounded-[10px] border border-white/[0.07] bg-bg/50">
        <div className="absolute inset-x-3 top-3 bottom-3 flex gap-1.5">
          <div className="flex-1 rounded-[4px] border border-white/[0.06] bg-white/[0.015]" />
          <div className="w-[26%] rounded-[4px] border border-accent/40 bg-accent/[0.08]" />
          <div className="flex-1 rounded-[4px] border border-white/[0.06] bg-white/[0.015]" />
        </div>
        <span className="relative rounded-[8px] bg-[#05070B]/85 px-2.5 py-1 font-mono-tech text-[9px] tracking-[0.14em] text-ink-secondary">
          16:9 → 9:16
        </span>
        <span className="absolute bottom-2 left-3 font-mono-tech text-[9px] text-ink-muted">
          salience tracking
        </span>
      </div>

      {/* timeline */}
      <div className="relative h-14 rounded-[10px] border border-white/[0.07] bg-surface/60 px-3 py-2">
        <div className="relative h-full rounded-[4px] bg-white/[0.03]">
          {events.map((p, i) => (
            <div
              key={i}
              className="absolute top-1/2 h-3 w-[2px] -translate-y-1/2 rounded bg-accent"
              style={{ left: `${p * 100}%` }}
              title={`detected event ${i + 1}`}
            >
              <span className="absolute -top-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent/70" />
            </div>
          ))}
          <div
            className="absolute top-0 bottom-0 w-[2px] rounded bg-white/70"
            style={{ left: '38%' }}
          />
        </div>
        <span className="absolute bottom-1 right-3 font-mono-tech text-[9px] text-ink-muted">
          {events.length} candidate moments
        </span>
      </div>

      {/* audio track */}
      <div className="rounded-[10px] border border-white/[0.07] bg-surface/60 px-3 py-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="stat-label">Whisper ASR</span>
          <span className="font-mono-tech text-[10px] text-ink-muted">cue alignment</span>
        </div>
        <div className="flex h-8 items-center gap-[2px]">
          {Array.from({ length: 46 }, (_, i) => {
            const v = 0.15 + seeded(i, 11) * 0.85;
            return (
              <div
                key={i}
                className="chart-bar w-[2px] rounded-full bg-accent/55"
                style={{ height: `${Math.max(3, v * 30)}px`, transitionDelay: `${i * 18}ms` }}
              />
            );
          })}
        </div>
      </div>

      <p className="font-mono-tech text-[9px] leading-relaxed text-ink-muted">
        {project.badge}
      </p>
    </div>
  );
};

export const ProjectVisual: React.FC<{ project: Project }> = ({ project }) =>
  project.id === 'agri-weather' ? (
    <AgriWeather project={project} />
  ) : (
    <ValorCut project={project} />
  );