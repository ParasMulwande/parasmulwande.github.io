import React, { useState } from 'react';
import { ArrowRight, Mail, Github, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

/**
 * Data → Analysis → Model → Insight
 * A living data system: nodes, flow, and a live model curve.
 * Deliberately not a particle field — everything here encodes flow.
 */
const DataViz: React.FC = () => {
  const nodes = [
    { id: 'raw', x: 26, y: 34, label: 'RAW DATA' },
    { id: 'clean', x: 96, y: 22, label: 'CLEAN' },
    { id: 'analyze', x: 168, y: 58, label: 'ANALYZE' },
    { id: 'model', x: 238, y: 30, label: 'MODEL' },
    { id: 'insight', x: 306, y: 66, label: 'INSIGHT' },
  ];
  const links = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 2],
    [1, 3],
  ];

  return (
    <svg
      viewBox="0 0 340 130"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: raw data flows through cleaning and analysis into a machine learning model, producing insight."
    >
      <defs>
        <linearGradient id="vizLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00A8FF" stopOpacity="0.15" />
          <stop offset="55%" stopColor="#00A8FF" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#0066FF" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="vizCurve" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0066FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00A8FF" />
        </linearGradient>
      </defs>

      {/* flow edges */}
      {links.map(([a, b], i) => {
        const n1 = nodes[a];
        const n2 = nodes[b];
        const mx = (n1.x + n2.x) / 2;
        return (
          <path
            key={i}
            className="flow-line"
            d={`M ${n1.x} ${n1.y} C ${mx} ${n1.y}, ${mx} ${n2.y}, ${n2.x} ${n2.y}`}
            fill="none"
            stroke="url(#vizLine)"
            strokeWidth={1}
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        );
      })}

      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={n.id}>
          <circle
            className="pulse-node"
            cx={n.x}
            cy={n.y}
            r={3}
            fill="#00A8FF"
            style={{ animationDelay: `${i * 0.55}s` }}
          />
          <circle cx={n.x} cy={n.y} r={7} fill="none" stroke="#00A8FF" strokeOpacity={0.22} strokeWidth={1} />
          <text
            x={n.x}
            y={n.y + 20}
            textAnchor="middle"
            fill="#697386"
            style={{ font: '500 6.5px "JetBrains Mono", monospace', letterSpacing: '0.1em' }}
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* live metric curve — animated convergence */}
      <g transform="translate(0, 96)">
        <text x={0} y={0} fill="#697386" style={{ font: '500 6.5px "JetBrains Mono", monospace', letterSpacing: '0.1em' }}>
          MODEL LOSS
        </text>
        <path
          className="chart-line"
          d="M 0 26 C 40 24, 60 12, 92 10 S 150 5, 180 4 L 330 3"
          fill="none"
          stroke="url(#vizCurve)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export const HeroSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable — the mail link remains available */
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden border-b border-white/[0.06]">
      {/* asymmetric ambient light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 right-[8%] h-[26rem] w-[26rem] rounded-full bg-accent/[0.07] blur-[130px]" />
        <div className="absolute bottom-0 left-[4%] h-72 w-72 rounded-full bg-[#4F46E5]/[0.07] blur-[120px]" />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          {/* Identity */}
          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal>
              {PERSONAL_INFO.roleLabel}
            </p>

            <h1 className="mt-5" data-reveal data-reveal-delay="60">
              <span className="block font-display text-[2.6rem] font-bold leading-[0.98] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4.25rem]">
                PARAS MULWANDE
              </span>
              <span className="mt-1 block font-display text-[2.6rem] font-bold leading-[0.98] tracking-[-0.03em] text-accent sm:text-6xl lg:text-[4.25rem]">
                DATA SCIENTIST
              </span>
            </h1>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg"
              data-reveal
              data-reveal-delay="120"
            >
              {PERSONAL_INFO.heroTagline}
            </p>

            <div
              className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-tech text-[11px] tracking-[0.14em] text-ink-muted"
              data-reveal
              data-reveal-delay="160"
            >
              {['AI / ML', 'PYTHON', 'SQL', 'DATA ANALYTICS'].map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>

            <div
              className="mt-9 flex flex-wrap items-center gap-3"
              data-reveal
              data-reveal-delay="200"
            >
              <a
                href="#projects"
                data-magnetic
                className="group inline-flex items-center gap-2 rounded-[11px] bg-accent px-5 py-3 text-sm font-semibold text-[#05070B] transition-all duration-200 hover:bg-[#3CBCFF] hover:shadow-[0_10px_30px_rgba(0,168,255,0.28)]"
              >
                View My Work
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>

              <a
                href="#contact"
                data-magnetic
                className="inline-flex items-center gap-2 rounded-[11px] border border-white/10 bg-white/[0.02] px-5 py-3 text-sm font-semibold text-ink transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
              >
                Let's Connect
              </a>

              <button
                onClick={copy}
                aria-label="Copy email address"
                className="inline-flex items-center gap-2 rounded-[11px] px-3 py-3 text-xs text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                <span className="hidden sm:inline">{copied ? 'Copied' : PERSONAL_INFO.email}</span>
              </button>
            </div>
          </div>

          {/* Living data system */}
          <div className="lg:col-span-5">
            <div
              className="card-lab overflow-hidden p-5 sm:p-6"
              data-reveal
              data-reveal-delay="140"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="eyebrow">Pipeline</span>
                <span className="flex items-center gap-1.5 font-mono-tech text-[10px] tracking-[0.14em] text-ink-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse" />
                  LIVE
                </span>
              </div>

              <DataViz />

              <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-white/[0.06] bg-white/[0.04]">
                {[
                  { k: 'Models deployed', v: PERSONAL_INFO.telemetry.modelsDeployed },
                  { k: 'Research papers', v: PERSONAL_INFO.telemetry.researchPapers },
                  { k: 'Core discipline', v: PERSONAL_INFO.telemetry.coreDisciplines },
                  { k: 'Engine stack', v: PERSONAL_INFO.telemetry.engineStack },
                ].map((m) => (
                  <div key={m.k} className="bg-surface px-3 py-3">
                    <div className="stat-label">{m.k}</div>
                    <div className="mt-1 font-display text-base font-bold text-ink">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4" data-reveal data-reveal-delay="200">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-ink-muted transition-colors duration-200 hover:text-accent"
              >
                <Github size={13} /> GitHub
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-1.5 text-xs text-ink-muted transition-colors duration-200 hover:text-accent"
              >
                <Mail size={13} /> Email
              </a>
              <span className="text-xs text-ink-muted">{PERSONAL_INFO.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};