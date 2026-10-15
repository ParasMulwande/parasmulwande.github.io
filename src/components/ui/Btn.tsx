import React from 'react';

/**
 * Buttons — Apple-inspired interaction physics with immediate pointer-down feedback.
 *
 * `magnetic` opts into subtle pointer drift from lib/pointer.
 */

type Variant = 'primary' | 'secondary' | 'ghost';

const BASE =
  'group relative inline-flex items-center justify-center gap-2 rounded-[12px] px-5 py-2.5 text-[14px] font-medium tracking-tight transition-all duration-200 active:scale-[0.98] will-change-transform select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg isolate';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-[#f5f5f7] text-[#000000] hover:bg-white hover:shadow-[0_4px_16px_rgba(255,255,255,0.18)] font-semibold border border-transparent',
  secondary:
    'border border-white/10 bg-white/[0.04] text-[#f5f5f7] hover:bg-white/[0.08] hover:border-white/25 backdrop-blur-md',
  ghost:
    'text-[#a1a1a6] hover:text-[#f5f5f7] hover:bg-white/[0.05] border border-transparent',
};

interface CommonProps {
  children: React.ReactNode;
  variant?: Variant;
  magnetic?: boolean;
  className?: string;
}

export const Btn: React.FC<
  CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, variant = 'primary', magnetic = false, className = '', ...rest }) => (
  <button
    className={`${BASE} ${VARIANTS[variant]} ${className}`}
    {...(magnetic ? { 'data-magnetic': '' } : {})}
    {...rest}
  >
    {children}
  </button>
);

export const BtnLink: React.FC<
  CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ children, variant = 'primary', magnetic = false, className = '', ...rest }) => (
  <a
    className={`${BASE} ${VARIANTS[variant]} ${className}`}
    {...(magnetic ? { 'data-magnetic': '' } : {})}
    {...rest}
  >
    {children}
  </a>
);