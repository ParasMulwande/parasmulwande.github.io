import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Copy, Check, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
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

  const channels = [
    { icon: Mail, label: 'Email', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: '/in/paras-mulwande', href: PERSONAL_INFO.linkedin },
    { icon: Github, label: 'GitHub', value: '@parasmulwande-sketch', href: PERSONAL_INFO.github },
    { icon: MapPin, label: 'Based in', value: PERSONAL_INFO.location, href: undefined },
  ];

  return (
    <section id="contact" className="section-y relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-[-6rem] left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[130px]" />
      </div>

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center" data-reveal>
            Contact
          </p>

          <h2 className="t-h1 mt-5" data-reveal data-reveal-delay="60">
            Have a dataset, an idea, or a problem worth solving?
          </h2>

          <p className="t-lead mt-5" data-reveal data-reveal-delay="100">
            Let's build something intelligent.
          </p>

          <div
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
            data-reveal
            data-reveal-delay="140"
          >
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              data-magnetic
              className="group inline-flex items-center gap-2 rounded-[11px] bg-accent px-6 py-3 text-sm font-semibold text-[#05070B] transition-all duration-200 hover:bg-[#3CBCFF] hover:shadow-[0_10px_30px_rgba(0,168,255,0.28)]"
            >
              Start a conversation
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            <button
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-[11px] border border-white/10 bg-white/[0.02] px-5 py-3 text-sm text-ink-secondary transition-all duration-200 hover:border-accent/40 hover:text-accent"
            >
              {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-px overflow-hidden rounded-[14px] border border-white/[0.06] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => {
            const Icon = c.icon;
            const inner = (
              <>
                <Icon size={16} className="text-accent" />
                <div>
                  <div className="stat-label">{c.label}</div>
                  <div className="mt-1 truncate text-sm text-ink">{c.value}</div>
                </div>
              </>
            );
            return (
              <div key={c.label} className="bg-surface p-4" data-reveal data-reveal-delay={i * 60}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="flex items-start gap-3 transition-opacity duration-200 hover:opacity-80"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-start gap-3">{inner}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};