import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Data Lab', href: '#datalab' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const Footer: React.FC = () => {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-white/[0.06] bg-[#05070B]">
      <div className="shell py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-display text-lg font-bold tracking-tight text-ink">
              Paras Mulwande
            </div>
            <div className="mt-1 font-mono-tech text-[11px] tracking-[0.16em] text-accent">
              {PERSONAL_INFO.roleLabel}
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              {PERSONAL_INFO.heroTagline}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <div className="stat-label mb-3">Navigate</div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-ink-muted transition-colors duration-200 hover:text-accent"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <div className="stat-label mb-3">Elsewhere</div>
            <ul className="space-y-2">
              {[
                { label: 'GitHub', href: PERSONAL_INFO.github },
                { label: 'LinkedIn', href: PERSONAL_INFO.linkedin },
                { label: 'Email', href: `mailto:${PERSONAL_INFO.email}` },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="text-sm text-ink-muted transition-colors duration-200 hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={toTop}
              className="mt-6 inline-flex items-center gap-1.5 text-xs text-ink-muted transition-colors duration-200 hover:text-accent"
            >
              Back to top <ArrowUp size={13} />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Paras Mulwande. All rights reserved.</span>
          <span className="font-mono-tech text-[10px] tracking-[0.14em]">
            {PERSONAL_INFO.location} · {PERSONAL_INFO.timezone}
          </span>
        </div>
      </div>
    </footer>
  );
};