import React from 'react';

/**
 * Section shell — the single container every section uses.
 *
 * Owns the vertical rhythm, the full-bleed divider and the consistent
 * eyebrow + heading pair, so no section re-declares those values.
 */

interface SectionProps {
  id: string;
  eyebrow: string;
  /** Optional — sections with a bespoke centred heading omit it. */
  title?: React.ReactNode;
  lede?: React.ReactNode;
  children: React.ReactNode;
  /** Optional right-hand slot in the heading row (e.g. a count or filter). */
  aside?: React.ReactNode;
  className?: string;
  divider?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  eyebrow,
  title,
  lede,
  children,
  aside,
  className = '',
  divider = true,
}) => (
  <section
    id={id}
    className={`section-y ${divider ? 'border-b border-white/[0.06]' : ''} ${className}`}
  >
    <div className="shell">
      {title || aside ? (
        <header className="max-w-3xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="min-w-0">
              <p className="eyebrow" data-reveal>
                {eyebrow}
              </p>
              {title ? (
                <h2 className="t-h1 mt-4" data-reveal data-reveal-delay="60">
                  {title}
                </h2>
              ) : null}
            </div>
            {aside ? (
              <div data-reveal data-reveal-delay="100">
                {aside}
              </div>
            ) : null}
          </div>

          {lede ? (
            <p className="t-lead mt-4 max-w-2xl" data-reveal data-reveal-delay="100">
              {lede}
            </p>
          ) : null}
        </header>
      ) : null}

      <div className={title ? 'mt-12' : ''}>{children}</div>
    </div>
  </section>
);

/** Sub-heading used inside sections for secondary groupings. */
export const Subhead: React.FC<{
  children: React.ReactNode;
  hint?: string;
  className?: string;
}> = ({ children, hint, className = '' }) => (
  <div className={`flex flex-wrap items-baseline justify-between gap-3 ${className}`} data-reveal>
    <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{children}</h3>
    {hint ? <span className="stat-label">{hint}</span> : null}
  </div>
);