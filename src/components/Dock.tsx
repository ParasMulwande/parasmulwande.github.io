import React, { useState } from 'react';
import { Home, User, Cpu, FolderGit2, Briefcase, Mail, ArrowUp } from 'lucide-react';

interface DockItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
}

const DOCK_ITEMS: DockItem[] = [
  { id: 'hero', label: 'Top', href: '#hero', icon: Home },
  { id: 'about', label: 'About', href: '#about', icon: User },
  { id: 'skills', label: 'Skills', href: '#skills', icon: Cpu },
  { id: 'projects', label: 'Projects', href: '#projects', icon: FolderGit2 },
  { id: 'experience', label: 'Experience', href: '#experience', icon: Briefcase },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
];

export const Dock: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        // Reveal dock after scrolling past the initial hero view (120px)
        setVisible(window.scrollY > 120);
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-40 hidden md:block max-w-[calc(100vw-2rem)] pointer-events-none transition-all duration-300 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Quick Navigation Dock"
    >
      <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#121214]/85 p-1.5 sm:p-2 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.65),0_1px_1px_rgba(255,255,255,0.08)]">
        {DOCK_ITEMS.map((item) => {
          const Icon = item.icon;
          const isHovered = hovered === item.id;

          return (
            <div key={item.id} className="relative group">
              {/* macOS-style Tooltip */}
              <div
                className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[8px] border border-white/10 bg-[#1c1c1e]/90 px-2 py-0.5 text-[11px] font-medium text-[#f5f5f7] backdrop-blur-md shadow-md transition-all duration-150 ${
                  isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'
                }`}
              >
                {item.label}
              </div>

              {/* Dock Icon Button */}
              <a
                href={item.href}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                aria-label={item.label}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#a1a1a6] transition-all duration-200 hover:scale-115 hover:bg-white/[0.1] hover:text-[#f5f5f7] active:scale-95"
              >
                <Icon size={17} />
              </a>
            </div>
          );
        })}

        {/* Separator */}
        <div className="h-5 w-[1px] bg-white/[0.12] mx-1" aria-hidden="true" />

        {/* Scroll To Top action */}
        <div className="relative group">
          <div
            className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[8px] border border-white/10 bg-[#1c1c1e]/90 px-2 py-0.5 text-[11px] font-medium text-[#f5f5f7] backdrop-blur-md shadow-md transition-all duration-150 ${
              hovered === 'to-top' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'
            }`}
          >
            Scroll to Top
          </div>
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setHovered('to-top')}
            onMouseLeave={() => setHovered(null)}
            aria-label="Scroll to top"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#a1a1a6] transition-all duration-200 hover:scale-115 hover:bg-white/[0.1] hover:text-[#f5f5f7] active:scale-95 cursor-pointer"
          >
            <ArrowUp size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};
