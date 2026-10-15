import React, { useEffect, useState } from 'react';
import { User, Menu, X, ArrowUpRight, Sparkles, FileDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenProfile?: () => void;
}

const LINKS = [
  { label: 'Overview', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenProfile }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('#hero');

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 20);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash) {
        setActiveHash(window.location.hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const on = () => mq.matches && setOpen(false);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full pt-3 pb-2 px-4 transition-all duration-300">
      <div className="mx-auto max-w-[1140px]">
        {/* Apple-grade floating pill bar */}
        <div
          className={`flex items-center justify-between rounded-[22px] px-4 sm:px-5 transition-all duration-300 ${
            scrolled
              ? 'h-13 bg-[#121214]/80 backdrop-blur-2xl border border-white/[0.12] shadow-[0_12px_32px_rgba(0,0,0,0.45),0_1px_1px_rgba(255,255,255,0.06)]'
              : 'h-14 bg-[#161618]/65 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.3)]'
          }`}
        >
          {/* Left Brand Identity */}
          <a
            href="#hero"
            id="nav-logo"
            aria-label="Paras Mulwande — home"
            className="group flex items-center gap-2.5 transition-transform duration-200 active:scale-[0.98]"
            onClick={() => setActiveHash('#hero')}
          >
            <div className="relative flex h-7 w-7 items-center justify-center rounded-[9px] bg-white/[0.08] border border-white/10 text-white font-semibold text-xs transition-colors group-hover:bg-white/[0.14]">
              <span>PM</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[14px] font-semibold tracking-tight text-[#f5f5f7]">
                Paras Mulwande
              </span>
              <span className="hidden text-[10px] tracking-wider text-[#86868b] sm:inline">
                Machine Learning & Systems
              </span>
            </div>
          </a>

          {/* Centered Segmented Nav Controls (Desktop) */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center rounded-full bg-black/25 p-1 border border-white/[0.06] backdrop-blur-md">
              {LINKS.map((l) => {
                const isActive = activeHash === l.href;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setActiveHash(l.href)}
                      className={`relative block rounded-full px-3.5 py-1 text-[13px] font-medium tracking-tight transition-all duration-200 ${
                        isActive
                          ? 'bg-white/[0.14] text-[#f5f5f7] shadow-[0_1px_4px_rgba(0,0,0,0.3)]'
                          : 'text-[#a1a1a6] hover:text-[#f5f5f7] hover:bg-white/[0.06]'
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action Tray */}
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumePath}
              download="Paras-Mulwande-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Download Paras Mulwande's Resume PDF"
              className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[12px] font-medium tracking-tight text-[#f5f5f7] transition-all duration-200 hover:border-[#2997ff]/40 hover:bg-white/[0.08] hover:text-[#2997ff] active:scale-[0.97] sm:inline-flex"
            >
              <FileDown size={12} className="text-[#2997ff]" />
              <span>Resume</span>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[12px] font-medium tracking-tight text-[#a1a1a6] transition-all duration-200 hover:bg-white/[0.08] hover:text-[#f5f5f7] hover:border-white/20 active:scale-[0.97] md:inline-flex"
            >
              GitHub <ArrowUpRight size={12} className="opacity-70" />
            </a>


            <button
              onClick={onOpenProfile}
              id="nav-profile-btn"
              aria-label="Open candidate profile dossier"
              className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#a1a1a6] transition-all duration-200 hover:border-white/25 hover:bg-white/[0.09] hover:text-[#f5f5f7] active:scale-[0.95]"
            >
              <User size={14} className="transition-transform group-hover:scale-105" />
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              id="nav-mobile-toggle"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04] text-[#a1a1a6] transition-colors duration-200 hover:text-white active:scale-[0.95] lg:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropped Sheet */}
      <div
        id="mobile-nav"
        className={`mx-auto max-w-[1140px] mt-2 overflow-hidden rounded-[20px] border border-white/[0.1] bg-[#141416]/95 backdrop-blur-2xl transition-[max-height,opacity] duration-300 ease-out lg:hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)] ${
          open ? 'max-h-[80vh] opacity-100 p-4' : 'max-h-0 opacity-0 p-0 border-transparent'
        }`}
      >
        <nav aria-label="Mobile" className="space-y-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => {
                setActiveHash(l.href);
                setOpen(false);
              }}
              className="flex items-center justify-between rounded-[12px] px-3.5 py-2.5 text-[14px] font-medium text-[#a1a1a6] hover:bg-white/[0.08] hover:text-white transition-all active:scale-[0.98]"
            >
              <span>{l.label}</span>
              <ArrowUpRight size={14} className="opacity-40" />
            </a>
          ))}

          <a
            href={PERSONAL_INFO.resumePath}
            download="Paras-Mulwande-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-[12px] px-3.5 py-2.5 text-[14px] font-medium text-[#2997ff] bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] transition-all active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <FileDown size={15} />
              <span>Download Resume</span>
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b]">PDF</span>
          </a>

          <div className="pt-3 mt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-[#86868b] px-3.5">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#2997ff] hover:underline">
              {PERSONAL_INFO.email}
            </a>
            <span>{PERSONAL_INFO.location}</span>
          </div>
        </nav>
      </div>
    </header>
  );
};