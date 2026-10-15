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
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
          data-reveal
          data-reveal-delay="140"
        >
          <BtnLink href={`mailto:${PERSONAL_INFO.email}`} magnetic>
            Start a conversation
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </BtnLink>

          <BtnLink href={whatsappHref} target="_blank" rel="noreferrer" variant="secondary" magnetic>
            <MessageCircle size={15} />
            Chat on WhatsApp
          </BtnLink>

          <button
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-[12px] border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-[13px] text-[#a1a1a6] transition-all duration-200 hover:text-[#f5f5f7] hover:border-white/20 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            {copied ? <Check size={14} className="text-[#30d158]" /> : <Copy size={14} />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Email'}</span>
          </button>
        </div>
      </div>

      <div
        className="relative mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4"
        data-reveal
        data-reveal-delay="180"
      >
        {channels.map((c, i) => {
          const Icon = c.icon;
          const inner = (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/[0.04] border border-white/[0.06] text-[#2997ff]">
                <Icon size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-[#86868b] uppercase tracking-wider">{c.label}</div>
                <div className="mt-0.5 truncate text-[13px] font-medium text-[#f5f5f7]">{c.value}</div>
              </div>
            </div>
          );
          return (
            <div key={c.label} className="rounded-[16px] border border-white/[0.07] bg-[#141416]/70 p-4 transition-all duration-200 hover:border-white/15 hover:bg-[#161618]">
              {c.href ? (
                <a
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noreferrer' : undefined}
                  className="block"
                  data-reveal
                  data-reveal-delay={i * 60}
                >
                  {inner}
                </a>
              ) : (
                <div data-reveal data-reveal-delay={i * 60}>
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
