import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Copy, Check, MessageCircle, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Section } from './ui/Section';
import { Btn, BtnLink } from './ui/Btn';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  const whatsappHref = `https://wa.me/${PERSONAL_INFO.whatsapp}`;
  const channels = [
    { icon: Mail, label: 'Email', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}`, external: false },
    { icon: Linkedin, label: 'LinkedIn', value: '/in/parasmulwande', href: PERSONAL_INFO.linkedin, external: true },
    { icon: Github, label: 'GitHub', value: '@ParasMulwande', href: PERSONAL_INFO.github, external: true },
    { icon: MapPin, label: 'Based in', value: PERSONAL_INFO.location },
  ];

  return (
    <Section id="contact" eyebrow="Contact" divider={false} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-[-8rem] left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="t-h1" data-reveal data-reveal-delay="60">
          Have a problem worth solving?
        </h2>
        <p className="t-lead mt-5" data-reveal data-reveal-delay="100">
          Let's build something intelligent.
        </p>

        <div
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
          data-reveal
          data-reveal-delay="140"
        >
          <BtnLink href={`mailto:${PERSONAL_INFO.email}`} magnetic>
            Start a conversation
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </BtnLink>

          <BtnLink href={whatsappHref} target="_blank" rel="noreferrer" variant="secondary" magnetic>
            <MessageCircle size={16} />
            Chat on WhatsApp
          </BtnLink>

          <Btn variant="ghost" onClick={copy} className="text-ink-secondary">
            {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
            {copied ? 'Copied' : 'Copy email'}
          </Btn>
        </div>
      </div>

      <div
        className="relative mx-auto mt-14 grid max-w-4xl gap-px overflow-hidden rounded-[14px] border border-white/[0.06] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4"
        data-reveal
        data-reveal-delay="180"
      >
        {channels.map((c, i) => {
          const Icon = c.icon;
          const inner = (
            <>
              <Icon size={16} className="shrink-0 text-accent" />
              <div className="min-w-0">
                <div className="stat-label">{c.label}</div>
                <div className="mt-1 truncate text-sm text-ink">{c.value}</div>
              </div>
            </>
          );
          return (
            <div key={c.label} className="bg-surface p-4 transition-colors duration-200 hover:bg-surface-raised">
              {c.href ? (
                <a
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noreferrer' : undefined}
                  className="flex items-start gap-3"
                  data-reveal
                  data-reveal-delay={i * 60}
                >
                  {inner}
                </a>
              ) : (
                <div className="flex items-start gap-3" data-reveal data-reveal-delay={i * 60}>
                  {inner}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
};
