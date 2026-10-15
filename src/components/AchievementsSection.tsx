import React, { useState } from 'react';
import { EDUCATION, PUBLICATIONS, EXPERIENCE } from '../data/portfolioData';
import { Section } from './ui/Section';
import { GraduationCap, BookOpen, Award, Copy, Check, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';

type Tab = 'education' | 'publications' | 'recognition';

const TABS: { id: Tab; label: string; count: number }[] = [
  { id: 'education', label: 'Education', count: EDUCATION.length },
  { id: 'publications', label: 'Publications', count: PUBLICATIONS.length },
  { id: 'recognition', label: 'Recognition', count: EXPERIENCE.filter((e) => e.achievement).length },
];

/**
 * Editorial-style Credentials Section (macOS-inspired).
 * Features refined academic records, publication citations with clean DOI linking,
 * and an editorial timeline for recognition.
 */
export const AchievementsSection: React.FC = () => {
  const [tab, setTab] = useState<Tab>('education');
  const [openPub, setOpenPub] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const recognition = EXPERIENCE.filter((e) => e.achievement);

  const copyCitation = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <Section
      id="achievements"
      eyebrow="Credentials"
      title="Education, research, and recognition."
      lede="Formal computer science foundations, peer-reviewed academic proceedings, and verified industry recognitions."
      aside={
        <div
          className="flex flex-wrap items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-1 backdrop-blur-md max-w-full"
          role="tablist"
          aria-label="Credentials views"
        >
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                id={`cred-tab-${t.id}`}
                aria-selected={active}
                aria-controls={`cred-panel-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`relative flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 text-[11px] sm:text-[12px] font-medium tracking-tight transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2997ff] ${
                  active
                    ? 'bg-white/[0.12] text-[#f5f5f7] shadow-[0_1px_4px_rgba(0,0,0,0.5)] border border-white/10'
                    : 'text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <span>{t.label}</span>
                <span
                  className={`font-mono text-[9px] sm:text-[10px] transition-colors ${
                    active ? 'text-[#2997ff]' : 'text-[#86868b]/60'
                  }`}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>
      }
    >
      <div className="pt-2">
        {/* ===================================================================
            TAB 1: EDUCATION — Elegant Academic Records
           =================================================================== */}
        {tab === 'education' && (
          <div
            id="cred-panel-education"
            role="tabpanel"
            aria-labelledby="cred-tab-education"
            className="grid gap-6 md:grid-cols-2"
          >
            {EDUCATION.map((edu, i) => (
              <article
                key={edu.degree}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.025] to-transparent p-6 sm:p-7 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.035]"
                data-reveal
                data-reveal-delay={i * 80}
              >
                {/* Header: Degree Status & Academic Badge */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-[#2997ff]">
                        <GraduationCap size={16} />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#86868b]">
                        {edu.level}
                      </span>
                    </div>

                    <span className="font-mono text-[11px] font-medium tracking-tight text-[#2997ff] bg-[#2997ff]/10 border border-[#2997ff]/20 px-2.5 py-0.5 rounded-full">
                      {edu.status}
                    </span>
                  </div>

                  {/* Degree Name & Institution */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#f5f5f7]">
                      {edu.degree}
                    </h3>
                    <p className="text-[14px] font-medium text-[#f5f5f7]/90">
                      {edu.institution}
                    </p>
                    <p className="text-[13px] text-[#86868b] leading-relaxed">
                      {edu.affiliation}
                    </p>
                  </div>
                </div>

                {/* Footer / Focus Area */}
                <div className="mt-8 border-t border-white/[0.05] pt-4">
                  <div className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-[#a1a1a6]">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#2997ff]" />
                    <span>{edu.focus}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ===================================================================
            TAB 2: PUBLICATIONS — Refined Research Entries & Citations
           =================================================================== */}
        {tab === 'publications' && (
          <div
            id="cred-panel-publications"
            role="tabpanel"
            aria-labelledby="cred-tab-publications"
            className="space-y-5"
          >
            {PUBLICATIONS.map((pub, i) => {
              const isExpanded = openPub === pub.id;

              return (
                <article
                  key={pub.id}
                  className="group relative rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.025] to-transparent p-6 sm:p-7 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.035]"
                  data-reveal
                  data-reveal-delay={i * 80}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Left Column: Metadata & Core Paper Info */}
                    <div className="min-w-0 flex-1 space-y-3">
                      {/* Meta category pill & date */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[10px] font-semibold tracking-wider text-[#2997ff] uppercase">
                          {pub.type}
                        </span>
                        <span className="text-white/20 font-mono text-[11px]" aria-hidden="true">·</span>
                        <span className="font-mono text-[11px] text-[#86868b]">
                          {pub.date}
                        </span>
                        {pub.statusBadge && (
                          <>
                            <span className="text-white/20 font-mono text-[11px]" aria-hidden="true">·</span>
                            <span className="font-mono text-[10px] tracking-wider text-[#30d158] uppercase">
                              {pub.statusBadge}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Paper Title */}
                      <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#f5f5f7] leading-snug">
                        {pub.title}
                      </h3>

                      {/* Venue / Journal Citation Info */}
                      <p className="text-[13.5px] text-[#86868b]">
                        {pub.venue}
                      </p>

                      {/* Expandable Abstract Details */}
                      {isExpanded && (
                        <div className="pt-4 mt-3 border-t border-white/[0.06] space-y-3 animate-fadeIn">
                          <p className="text-[14px] leading-relaxed text-[#a1a1a6]">
                            {pub.description}
                          </p>
                          <div className="rounded-lg border border-white/[0.05] bg-white/[0.015] p-3 text-[12px] font-mono text-[#86868b] leading-relaxed">
                            {pub.citation}
                          </div>
                        </div>
                      )}

                      {/* Quick Actions Strip */}
                      <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                        <button
                          onClick={() => setOpenPub(isExpanded ? null : pub.id)}
                          aria-expanded={isExpanded}
                          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#f5f5f7] transition-colors duration-200 hover:text-[#2997ff] cursor-pointer"
                        >
                          {isExpanded ? (
                            <>
                              <span>Hide Synopsis</span>
                              <ChevronUp size={13} />
                            </>
                          ) : (
                            <>
                              <span>View Synopsis & Abstract</span>
                              <ChevronDown size={13} />
                            </>
                          )}
                        </button>

                        {pub.doi && (
                          <>
                            <span className="text-white/20 font-mono text-[11px]" aria-hidden="true">·</span>
                            <button
                              onClick={() =>
                                copyCitation(
                                  pub.id,
                                  `${pub.title}. ${pub.citation}. DOI: https://doi.org/${pub.doi}`,
                                )
                              }
                              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#86868b] transition-colors duration-200 hover:text-[#f5f5f7] cursor-pointer"
                            >
                              {copied === pub.id ? (
                                <>
                                  <Check size={13} className="text-[#30d158]" />
                                  <span className="text-[#30d158]">Citation Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={13} />
                                  <span>Copy Citation</span>
                                </>
                              )}
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Direct Clean DOI Link */}
                    {pub.doi && (
                      <div className="shrink-0 flex items-center lg:items-start pt-1">
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.02] px-3.5 py-2 font-mono text-[11px] text-[#f5f5f7] transition-all duration-200 hover:border-[#2997ff]/50 hover:bg-[#2997ff]/5 hover:text-[#2997ff]"
                        >
                          <span>DOI : {pub.doi}</span>
                          <ArrowUpRight size={13} className="text-[#2997ff]" />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ===================================================================
            TAB 3: RECOGNITION — Clean Editorial Timeline
           =================================================================== */}
        {tab === 'recognition' && (
          <div
            id="cred-panel-recognition"
            role="tabpanel"
            aria-labelledby="cred-tab-recognition"
            className="space-y-6"
          >
            {recognition.map((exp, i) => (
              <article
                key={exp.role}
                className="group relative rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.025] to-transparent p-6 sm:p-7 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.035]"
                data-reveal
                data-reveal-delay={i * 80}
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#2997ff]/30 bg-[#2997ff]/10 text-[#2997ff]">
                    <Award size={18} />
                  </div>

                  <div className="min-w-0 space-y-2 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/[0.06] pb-3">
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#f5f5f7]">
                          {exp.achievement?.title}
                        </h3>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#2997ff] bg-[#2997ff]/10 px-2 py-0.5 rounded-full border border-[#2997ff]/20">
                          Merit Honor
                        </span>
                      </div>

                      <span className="font-mono text-[11px] text-[#86868b]">
                        {exp.period}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[13px] text-[#86868b]">
                      <span className="font-medium text-[#f5f5f7]/90">{exp.company}</span>
                      <span className="text-white/20 font-mono text-[10px]">/</span>
                      <span>{exp.role}</span>
                    </div>

                    <p className="pt-1 text-[14px] leading-relaxed text-[#a1a1a6]">
                      {exp.achievement?.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

