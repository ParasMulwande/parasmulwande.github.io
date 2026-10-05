import React from 'react';

/** Shared surface used across every section. */

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  /** Adds the cursor-proximity glow (desktop only, see lib/pointer). */
  reactive?: boolean;
  sweep?: boolean;
  delay?: number;
  as?: 'div' | 'article' | 'li';
}> = ({
  children,
  className = '',
  reactive = false,
  sweep = false,
  delay,
  as: Tag = 'div',
}) => (
  <Tag
    className={`card-lab ${reactive ? 'proximity' : ''} ${sweep ? 'sweep' : ''} ${className}`}
    {...(reactive ? { 'data-proximity': '' } : {})}
    {...(delay !== undefined ? { 'data-reveal': '', 'data-reveal-delay': delay } : {})}
  >
    {children}
  </Tag>
);