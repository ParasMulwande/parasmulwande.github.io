import React, { useState } from 'react';
import { EDUCATION, PUBLICATIONS, EXPERIENCE } from '../data/portfolioData';
import { GraduationCap, FileText, Trophy, Copy, Check, ArrowUpRight, X } from 'lucide-react';

type Tab = 'education' | 'publications' | 'recognition';

const TABS: { id: Tab; label: string }[] = [
  { id: 'education', label: 'Education' },
  { id: 'publications', label: 'Publications' },
  { id: 'recognition', label: 'Recognition' },
];

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
    <section id="achievements" className="section-y border-b border-white/[0.06]">
      <div className="shell">
        <p className="eyebrow" data-reveal>
          Credentials
        </p>
        <h2 className="t-h1 mt-4 max-w-2xl" data-reveal data-reveal-delay="60">
          Education, research, and recognition.
        </h2>

        <div className="mt-9 flex flex-wrap gap-2" role="tablist" aria-label="Credentials" data-reveal data-reveal-delay="100">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              aria-controls={`ach-panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`rounded-[10px] border px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
                tab === t.id
                  ? 'border-accent/50 bg-accent/10 text-accent'
                  : 'border-white/10 bg-white/[0.02] text-ink-secondary hover:border-white/25 hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Education */}
        {tab === 'education' && (
          <div id="ach-panel-education" role="tabpanel" className="mt-6 grid gap-5 md:grid-cols-2">
            {EDUCATION.map((edu, i) => (
              <div key={edu.degree} className="card-lab" data-reveal data-reveal-delay={i * 80}>
                <div className="flex items-start justify-between gap-4">
                  <GraduationCap size={18} className="mt-1 shrink-0 text-accent" />
                  <span className="ml-auto shrink-0 rounded-[8px] border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono-tech text-[10px] tracking-[0.12em] text-accent">
                    {edu.status}
                  </span>
                </div>
                <h3 className="t-h3 mt-4">{edu.degree}</h3>
                <p className="mt-1.5 text-sm text-ink-secondary">{edu.institution}</p>
                <p className="mt-1 text-xs text-ink-muted">{edu.affiliation}</p>
                <p className="mt-4 border-t border-white/[0.06] pt-4 text-xs leading-relaxed text-ink-muted">
                  {edu.focus}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Publications */}
        {tab === 'publications' && (
          <div id="ach-panel-publications" role="tabpanel" className="mt-6 space-y-3">
            {PUBLICATIONS.map((pub, i) => (
              <div key={pub.id} className="card-lab" data-reveal data-reveal-delay={i * 80}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="stat-label text-accent">{pub.type}</span>
                      <span className="stat-label">{pub.date}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
                      {pub.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-ink-muted">{pub.venue}</p>
                    {pub.doi && (
                      <button
                        onClick={() =>
                          copyCitation(
                            pub.id,
                            `${pub.title}. ${pub.citation}. DOI: https://doi.org/${pub.doi}`
                          )
                        }
                        className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-muted transition-colors duration-200 hover:text-accent"
                      >
                        {copied === pub.id ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
                        {copied === pub.id ? 'Citation copied' : 'Copy citation'}
                      </button>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-[10px] border border-white/10 px-3 py-2 text-xs text-ink-secondary transition-all duration-200 hover:border-accent/40 hover:text-accent"
                      >
                        DOI <ArrowUpRight size={12} />
                      </a>
                    )}
                    <button
                      onClick={() => setOpenPub(pub.id)}
                      aria-label={`Read abstract for ${pub.title}`}
                      className="grid h-8 w-8 place-items-center rounded-[10px] border border-white/10 text-ink-secondary transition-all duration-200 hover:border-accent/40 hover:text-accent"
                    >
                      <FileText size={13} />
                    </button>
                  </div>
                </div>

                {openPub === pub.id && (
                  <div className="mt-5 border-t border-white/[0.06] pt-5">
                    <p className="text-sm leading-relaxed text-ink-secondary">{pub.description}</p>
                    <p className="mt-3 text-xs text-ink-muted">{pub.citation}</p>
                    {pub.statusBadge && (
                      <p className="mt-2 font-mono-tech text-[10px] tracking-[0.12em] text-accent">
                        {pub.statusBadge}
                      </p>
                    )}
                    <button
                      onClick={() => setOpenPub(null)}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-muted transition-colors duration-200 hover:text-ink"
                    >
                      <X size={12} /> Close
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Recognition */}
        {tab === 'recognition' && (
          <div id="ach-panel-recognition" role="tabpanel" className="mt-6 space-y-4">
            {recognition.map((exp, i) => (
              <div key={exp.role} className="card-lab" data-reveal data-reveal-delay={i * 80}>
                <div className="flex items-start gap-4">
                  <Trophy size={18} className="mt-1 shrink-0 text-accent" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {exp.achievement?.title}
                      </h3>
                      <span className="font-mono-tech text-[11px] tracking-[0.12em] text-ink-muted">
                        {exp.company} · {exp.period}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                      {exp.achievement?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};