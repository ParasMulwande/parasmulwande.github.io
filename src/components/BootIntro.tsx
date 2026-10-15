import React, { useState, useEffect } from 'react';

export const BootIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'init' | 'loading' | 'online' | 'fade'>('init');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener?.('change', handler);
    return () => mediaQuery.removeEventListener?.('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPhase('fade');
      const timer = setTimeout(onComplete, 50);
      return () => clearTimeout(timer);
    }

    const t1 = setTimeout(() => setPhase('loading'), 300);
    const t2 = setTimeout(() => setPhase('online'), 1000);
    const t3 = setTimeout(() => setPhase('fade'), 1400);
    const t4 = setTimeout(onComplete, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [reducedMotion, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#000000] flex flex-col items-center justify-center transition-opacity duration-500 ${
        phase === 'fade' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Ambient subtle glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[180px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* System identifier */}
        <div className="font-mono text-xs tracking-wider text-white/40 uppercase">
          PARAS MULWANDE // PORTFOLIO
        </div>

        {/* Status text */}
        <div className="min-h-[2.5rem] w-full max-w-md flex flex-col items-center gap-3">
          <span
            className={`font-mono text-sm tracking-tight text-[#f5f5f7] transition-all duration-300 ${
              phase === 'init' ? 'opacity-100' : 'opacity-0 -translate-y-4'
            }`}
          >
            Initializing environment...
          </span>
          <span
            className={`font-mono text-sm tracking-tight text-[#f5f5f7] transition-all duration-300 ${
              phase === 'loading' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Loading neural systems & pipeline...
          </span>
          <span
            className={`font-mono text-sm tracking-tight text-[#30d158] transition-all duration-300 ${
              phase === 'online' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            System Online
          </span>
        </div>

        {/* Progress indicator */}
        <div className="w-full max-w-xs">
          <div className="h-1 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className={`h-full bg-[#f5f5f7] rounded-full transition-all duration-500 ease-out ${
                phase === 'init' ? 'w-0' : phase === 'loading' ? 'w-1/2' : 'w-full'
              }`}
            />
          </div>
        </div>

        {/* Boot details - only show during loading */}
        {phase === 'loading' && (
          <div className="font-mono text-[10px] text-white/30 tracking-tight max-w-xs text-left">
            <div className="mb-0.5">{'> loading neural weights... [OK]'}</div>
            <div className="mb-0.5">{'> telemetry stream link.... [OK]'}</div>
            <div>{'> interface ready.......... [OK]'}</div>
          </div>
        )}

        {/* Version tag */}
        <div className="font-mono text-[10px] text-white/20 tracking-tight">
          SYSTEM ONLINE · BUILD {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};