import React, { useState } from 'react';
import { PUBLICATIONS } from '../data/portfolioData';
import { ExternalLink, Check, Copy, BookOpen, Award, FileText } from 'lucide-react';
import { Publication } from '../types';

export const PublicationsSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);

  const handleCopyCitation = (pub: Publication) => {
    const text = `${pub.title}. ${pub.citation}. ${pub.doi ? `DOI: https://doi.org/${pub.doi}` : ''}`;
    navigator.clipboard.writeText(text);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="publications" className="py-20 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-white/50 uppercase">
            <span className="text-[#00f0ff] font-semibold">[03 // SCHOLARLY CONTRIBUTIONS]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f4f4f6] tracking-tight uppercase">
            PEER-REVIEWED PUBLICATIONS
          </h2>
          <p className="font-body text-sm sm:text-base text-[#8e8e9f] max-w-2xl">
            Theoretical insights and empirical engineering findings validated by peer-review bodies in applied computational sciences.
          </p>
        </div>

        {/* Papers Stack */}
        <div className="space-y-6">
          {PUBLICATIONS.map((pub) => (
            <div
              key={pub.id}
              id={`pub-${pub.id}`}
              className="rounded-lg border border-white/10 bg-[#0c0c11] p-6 sm:p-7 hover:border-white/20 transition-all relative overflow-hidden group shadow-xl"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#00f0ff]/50 via-transparent to-transparent"></div>

              {/* Meta Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.08] font-mono-tech text-xs">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-semibold text-[10px] tracking-wider">
                    {pub.type}
                  </span>
                  <span className="text-white/80 font-medium">
                    {pub.venue}
                  </span>
                </div>

                {/* Right Metadata / DOI / Status */}
                <div className="flex items-center gap-3">
                  {pub.doi ? (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#a3e635] hover:text-[#b4f04d] text-[11px] tracking-wider"
                    >
                      <span className="text-white/40">DOI INDEX</span>
                      <span className="font-bold underline">{pub.doi}</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-[#a3e635] text-[11px] tracking-wider font-semibold">
                      <span className="text-white/40">PROCEEDINGS STATUS</span>
                      <span>{pub.statusBadge || 'ACCEPTED // PRESENTED'}</span>
                      <Award size={12} className="text-[#a3e635]" />
                    </div>
                  )}
                </div>
              </div>

              {/* Paper Content */}
              <div className="mt-4 space-y-3">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#00f0ff] transition-colors leading-tight">
                  {pub.title}
                </h3>

                <p className="font-mono-tech text-xs text-[#00f0ff]/80">
                  {pub.citation}
                </p>

                <p className="font-body text-sm text-[#8e8e9f] leading-relaxed">
                  {pub.description}
                </p>
              </div>

              {/* Interactive Footer Actions */}
              <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono-tech text-xs">
                <button
                  onClick={() => setSelectedPub(pub)}
                  className="text-white/70 hover:text-[#00f0ff] inline-flex items-center gap-1.5 cursor-pointer text-[11px] transition-colors"
                >
                  <BookOpen size={12} />
                  <span>View Research Abstract & Methodology</span>
                </button>

                <button
                  onClick={() => handleCopyCitation(pub)}
                  className="text-white/50 hover:text-white inline-flex items-center gap-1 cursor-pointer text-[11px] transition-colors"
                >
                  {copiedId === pub.id ? (
                    <>
                      <Check size={12} className="text-[#a3e635]" />
                      <span className="text-[#a3e635]">Citation Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy BibTeX / Citation</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Abstract Modal */}
        {selectedPub && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0e0e14] border border-[#00f0ff]/40 rounded-lg max-w-2xl w-full p-6 sm:p-8 font-mono-tech space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs text-[#00f0ff]">
                  [RESEARCH DOSSIER // {selectedPub.venue}]
                </span>
                <button
                  onClick={() => setSelectedPub(null)}
                  className="text-white/60 hover:text-white text-sm cursor-pointer"
                >
                  [✕ CLOSE]
                </button>
              </div>

              <h4 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                {selectedPub.title}
              </h4>

              <div className="text-xs text-white/60">
                Author: <strong className="text-white">Paras Mulwande</strong> et al. &bull; Published {selectedPub.date}
              </div>

              <div className="bg-[#07070a] p-4 rounded border border-white/10 text-xs font-body text-[#b9cacb] leading-relaxed space-y-2">
                <div className="font-mono-tech text-[11px] text-[#a3e635] uppercase tracking-wider font-semibold">
                  ABSTRACT & METHODOLOGY SUMMARY:
                </div>
                <p>
                  {selectedPub.description}
                </p>
                <p>
                  Key Architectural Contributions: Consolidated sequential CNN feature extractors, live atmospheric streaming telemetry integration via OpenWeather API, and low-latency database queries using MongoDB for real-time agronomic advisories.
                </p>
              </div>

              {selectedPub.doi && (
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-white/50">DOI: {selectedPub.doi}</span>
                  <a
                    href={`https://doi.org/${selectedPub.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00f0ff] hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>Open Official Journal Record</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
