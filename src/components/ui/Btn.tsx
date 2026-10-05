import React from 'react';

/**
 * Buttons — one implementation for every CTA on the site.
 *
 * `magnetic` opts into the pointer drift from lib/pointer; it is ignored on
 * touch devices and under reduced motion.
 */

type Variant = 'primary' | 'secondary' | 'ghost';

const BASE =
  'group inline-flex items-center justify-center gap-2 rounded-[11px] px-5 py-3 text-sm font-semibold transition-all duration-200 will-change-transform';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-accent text-[#05070B] hover:bg-[#3CBCFF] hover:shadow-[0_10px_30px_rgba(0,168,255,0.28)]',
  secondary:
    'border border-white/10 bg-white/[0.02] text-ink hover:border-accent/40 hover:bg-accent/10 hover:text-accent',
  ghost: 'text-ink-secondary hover:text-ink hover:bg-white/[0.04]',
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