import React, { useEffect, useState } from 'react';
import { User, Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenProfile?: () => void;
}

const LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Data Lab', href: '#datalab' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenProfile }) => {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet when the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const on = () => mq.matches && setOpen(false);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        condensed
          ? 'bg-[#05070B]/80 backdrop-blur-xl border-b border-white/[0.07]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="shell">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            condensed ? 'h-14' : 'h-16'
          }`}
        >
          {/* Wordmark */}
          <a
            href="#hero"
            id="nav-logo"
            aria-label="Paras Mulwande — home"
            className="group flex items-baseline gap-2"
          >
            <span className="font-display text-base font-bold tracking-tight text-ink">
              Paras Mulwande
            </span>
            <span className="hidden sm:inline font-mono-tech text-[10px] tracking-[0.18em] text-ink-muted transition-colors duration-200 group-hover:text-accent">
              DATA SCIENTIST
            </span>
          </a>

          {/* Desktop links */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} data-nav-link className="nav-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="relative h-0">
              <span className="nav-ink" style={{ width: 0 }} aria-hidden="true" />
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 rounded-[10px] border border-white/10 px-3 py-1.5 text-[11px] font-mono-tech tracking-wider text-ink-secondary transition-all duration-200 hover:border-accent/40 hover:text-accent"
            >
              GitHub <ArrowUpRight size={12} />
            </a>

            <button
              onClick={onOpenProfile}
              id="nav-profile-btn"
              aria-label="Open profile dossier"
              className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-ink-secondary transition-all duration-200 hover:border-accent/50 hover:text-accent hover:bg-accent/10"
            >
              <User size={14} />
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              id="nav-mobile-toggle"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-8 w-8 place-items-center rounded-[10px] border border-white/10 text-ink-secondary transition-colors duration-200 hover:text-ink lg:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-white/[0.07] bg-[#05070B]/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="shell py-4">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/[0.05] py-3 font-display text-sm tracking-tight text-ink-secondary transition-colors duration-200 hover:text-accent"
                >
                  {l.label}
                  <ArrowUpRight size={14} className="opacity-40" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between text-[11px]">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-accent hover:underline"
            >
              {PERSONAL_INFO.email}
            </a>
            <span className="text-ink-muted">{PERSONAL_INFO.location}</span>
          </div>
        </nav>
      </div>
    </header>
  );
};