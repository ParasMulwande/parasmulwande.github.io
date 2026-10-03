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
      className={`fixed inset-0 z-[100] bg-[#070709] flex flex-col items-center justify-center transition-opacity duration-500 ${
        phase === 'fade' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Ambient glow matching hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f0ff]/5 rounded-full blur-[200px] opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#a3e635]/3 rounded-full blur-[150px] opacity-30"></div>
      </div>

      {/* Scanline sweep */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent animate-scanline pointer-events-none" style={{ animationDuration: '2s' }} />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* System identifier */}
        <div className="font-mono-tech text-xs tracking-widest text-white/40 uppercase">
          PARAS MULWANDE // PORTFOLIO v1.0
        </div>

        {/* Status text */}
        <div className="min-h-[2.5rem] w-full max-w-md flex flex-col items-center gap-3">
          <span
            className={`font-mono-tech text-sm tracking-wider text-[#00f0ff] transition-all duration-300 ${
              phase === 'init' ? 'opacity-100' : 'opacity-0 -translate-y-4'
            }`}
          >
            INITIALIZING SYSTEM...
          </span>
          <span
            className={`font-mono-tech text-sm tracking-wider text-[#00f0ff] transition-all duration-300 ${
              phase === 'loading' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            LOADING NEURAL STACK...
          </span>
          <span
            className={`font-mono-tech text-sm tracking-wider text-[#a3e635] transition-all duration-300 ${
              phase === 'online' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            SYSTEM ONLINE
          </span>
        </div>

        {/* Progress indicator */}
        <div className="w-full max-w-md">
          <div className="h-1 bg-[#111116] rounded overflow-hidden border border-white/10">
            <div
              className={`h-full bg-gradient-to-r from-[#00f0ff] via-[#a3e635] to-[#00f0ff] rounded transition-all duration-500 ease-out ${
                phase === 'init' ? 'w-0' : phase === 'loading' ? 'w-1/2' : 'w-full'
              }`}
              style={{ boxShadow: '0 0 12px #00f0ff, 0 0 24px rgba(0,240,255,0.3)' }}
            />
          </div>
        </div>

        {/* Boot details - only show during loading */}
        {phase === 'loading' && (
          <div className="font-mono-tech text-[10px] text-white/30 tracking-wider uppercase max-w-md text-left">
            <div className="mb-1">{'> memory check.......... [OK]'}</div>
            <div className="mb-1">{'> neural weights loaded.. [OK]'}</div>
            <div className="mb-1">{'> telemetry link......... [OK]'}</div>
            <div>{'> interface ready........ [OK]'}</div>
          </div>
        )}

        {/* Version tag */}
        <div className="font-mono-tech text-[10px] text-white/20 tracking-wider">
          BUILD {new Date().toISOString().slice(0, 10).replace(/-/g, '')} // NODE v20+ // VITE
        </div>
      </div>
    </div>
  );
};