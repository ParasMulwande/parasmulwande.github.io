import React, { useState } from 'react';
import { ArrowRight, Mail, Github, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { HeroDataSystem } from './viz/HeroDataSystem';
import { BtnLink } from './ui/Btn';

const SUPPORT = ['AI / ML', 'PYTHON', 'SQL', 'DATA ANALYTICS'];

export const HeroSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable — the mail link stays available */
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden border-b border-white/[0.06]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 right-[6%] h-[30rem] w-[30rem] rounded-full bg-accent/[0.08] blur-[140px]" />
        <div className="absolute bottom-[-10rem] left-[2%] h-80 w-80 rounded-full bg-[#4F46E5]/[0.08] blur-[130px]" />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-10 py-16 lg:min-h-[85vh] lg:grid-cols-12 lg:gap-12 lg:py-20">
          {/* Identity — sequenced entrance */}
          <div className="lg:col-span-6 xl:col-span-6">
            <p
              className="seq seq-clip eyebrow"
              style={{ ['--seq' as string]: 0 }}
            >
              <span>Available for work</span>
            </p>

            <h1 className="mt-6">
              <span
                className="seq block font-display text-[2.5rem] font-bold leading-[1] tracking-[-0.03em] text-ink sm:text-6xl"
                style={{ ['--seq' as string]: 1 }}
              >
                PARAS MULWANDE
              </span>
              <span
                className="seq block bg-gradient-to-r from-accent to-[#4F46E5] bg-clip-text font-display text-[2.5rem] font-bold leading-[1] tracking-[-0.03em] text-transparent sm:text-6xl"
                style={{ ['--seq' as string]: 2 }}
              >
                DATA SCIENTIST
              </span>
            </h1>

            <p
              className="seq mt-6 max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg"
              style={{ ['--seq' as string]: 3 }}
            >
              {PERSONAL_INFO.heroTagline}
            </p>

            <div
              className="seq mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-tech text-[11px] tracking-[0.14em] text-ink-muted"
              style={{ ['--seq' as string]: 4 }}
            >
              {SUPPORT.map((s, i) => (
                <React.Fragment key={s}>
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <span>{s}</span>
                </React.Fragment>
              ))}
            </div>

            <div
              className="seq mt-9 flex flex-wrap items-center gap-3"
              style={{ ['--seq' as string]: 5 }}
            >
              <BtnLink href="#projects" magnetic>
                View My Work
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </BtnLink>
              <BtnLink href="#contact" variant="secondary" magnetic>
                Let's Connect
              </BtnLink>
              <button
                onClick={copy}
                aria-label="Copy email address"
                className="inline-flex items-center gap-2 rounded-[11px] px-3 py-3 text-xs text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                <span className="hidden sm:inline">{copied ? 'Copied' : PERSONAL_INFO.email}</span>
              </button>
            </div>

            <div
              className="seq mt-8 flex flex-wrap items-center gap-5 text-xs text-ink-muted"
              style={{ ['--seq' as string]: 6 }}
            >
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-accent"
              >
                <Github size={13} /> GitHub
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-accent"
              >
                <Mail size={13} /> Email
              </a>
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Live data system — arrives after the identity */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div
              className="seq-wipe relative h-[22rem] overflow-hidden rounded-[16px] border border-white/[0.07] bg-bg/40 backdrop-blur-[2px] sm:h-[26rem] lg:h-[30rem]"
              style={{ ['--seq' as string]: 3 }}
            >
              <HeroDataSystem />
            </div>

            <div
              className="seq mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-[12px] border border-white/[0.06] bg-white/[0.04] sm:grid-cols-4"
              style={{ ['--seq' as string]: 6 }}
            >
              {[
                { k: 'Projects', v: PERSONAL_INFO.telemetry.modelsDeployed },
                { k: 'Papers', v: PERSONAL_INFO.telemetry.researchPapers },
                { k: 'Discipline', v: PERSONAL_INFO.telemetry.coreDisciplines },
                { k: 'Stack', v: PERSONAL_INFO.telemetry.engineStack },
              ].map((m) => (
                <div key={m.k} className="bg-surface px-3 py-2.5">
                  <div className="stat-label">{m.k}</div>
                  <div className="mt-0.5 truncate font-display text-sm font-bold text-ink">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="shell pb-10">
        <BtnLink
          href="#about"
          variant="ghost"
          className="text-ink-muted"
          aria-label="Scroll to About"
        >
          Scroll to explore
          <ArrowRight size={14} className="rotate-90" />
        </BtnLink>
      </div>
    </section>
  );
};
