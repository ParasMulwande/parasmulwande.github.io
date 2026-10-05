import React, { useState } from 'react';
import { User, Menu, X, Terminal, ExternalLink, Mail, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProfile }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'SYSTEMS', href: '#systems' },
    { label: 'EXPERTISE', href: '#expertise' },
    { label: 'PUBLICATIONS', href: '#publications' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070709]/90 backdrop-blur-md border-b border-white/[0.08] transition-all">
      <div className="shell h-16 flex items-center justify-between">
        
        {/* Left ID + Live Status Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#"
            id="nav-logo"
            className="flex items-center gap-1.5 font-mono-tech text-sm font-semibold tracking-wider text-white hover:text-[#00f0ff] transition-colors"
          >
            <span className="text-[#00f0ff] font-bold">PM</span>
            <span className="text-white/40">/</span>
            <span className="text-white/80">01</span>
          </a>

          <div
            id="nav-availability-badge"
            className="hidden md:inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0d160e] border border-[#a3e635]/30 text-[11px] font-mono-tech text-[#a3e635] tracking-wider"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3e635] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3e635]"></span>
            </span>
            <span>AVAILABLE FOR Q2/Q3 ROLES & COLLABS</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] font-mono-tech tracking-widest text-[#8e8e9f]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase()}`}
              className="hover:text-[#00f0ff] transition-colors py-1 relative group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#00f0ff] transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right Action Icons & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenProfile}
            id="nav-profile-btn"
            title="System Profile & Dossier"
            aria-label="User Profile"
            className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/20 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 flex items-center justify-center text-white/80 transition-all cursor-pointer"
          >
            <User size={15} />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-toggle"
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-1.5 rounded text-white/70 hover:text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0f] border-b border-white/10 px-4 py-4 space-y-3 font-mono-tech text-xs">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-[#0d160e] border border-[#a3e635]/30 text-[#a3e635] text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] animate-pulse"></span>
            <span>AVAILABLE FOR Q2/Q3 ROLES</span>
          </div>

          <div className="pt-2 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-white/70 hover:text-[#00f0ff] hover:bg-white/5 rounded transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[11px] text-white/50">
            <span>LOC: NAGPUR, IN (IST)</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-[#00f0ff] hover:underline"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
