import React from 'react';
import { EXPERIENCE, EDUCATION } from '../data/portfolioData';
import { CheckCircle2, GraduationCap, Briefcase, Sparkles } from 'lucide-react';

export const ExperienceEducation: React.FC = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 border-b border-white/[0.08] relative">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        
        {/* Dual Column Layout: Left Experience (7 cols), Right Education (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* ============================================================ */}
          {/* LEFT: [04 // PROFESSIONAL RECORD] EXPERIENCE & LEADERSHIP */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-white/50 uppercase">
                <span className="text-[#00f0ff] font-semibold">[04 // PROFESSIONAL RECORD]</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#f4f4f6] tracking-tight uppercase">
                EXPERIENCE &<br />LEADERSHIP
              </h2>
            </div>

            {/* Experience Card */}
            <div className="rounded-lg border border-white/10 bg-[#0c0c11] p-5 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#00f0ff]/40"></div>

              {/* Role Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-white/[0.08]">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {EXPERIENCE.role}
                </h3>
                <span className="font-mono-tech text-xs font-semibold text-[#a3e635] bg-[#0d180d] px-2 py-0.5 rounded border border-[#a3e635]/30">
                  {EXPERIENCE.period}
                </span>
              </div>

              <div className="text-xs font-mono-tech text-[#00f0ff] mt-2 mb-3">
                {EXPERIENCE.company}
              </div>

              <p className="font-body text-sm text-[#8e8e9f] leading-relaxed mb-4">
                {EXPERIENCE.summary}
              </p>

              {/* Detailed Responsibilities Bullets */}
              <div className="space-y-3 pt-1 mb-4">
                {EXPERIENCE.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs font-body text-white/80 leading-relaxed">
                    <CheckCircle2 size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Experience Tags */}
              <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {EXPERIENCE.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-sm bg-[#151520] border border-white/10 text-[11px] font-mono-tech text-[#b9cacb]"
                  >
                    [ {tag} ]
                  </span>
                ))}
              </div>

            </div>
          </div>


          {/* ============================================================ */}
          {/* RIGHT: [05 // CREDENTIALS] EDUCATION */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-white/50 uppercase">
                <span className="text-[#00f0ff] font-semibold">[05 // CREDENTIALS]</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#f4f4f6] tracking-tight uppercase">
                EDUCATION
              </h2>
            </div>

            {/* Education Stack */}
            <div className="space-y-3">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-white/10 bg-[#0c0c11] p-4 sm:p-5 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all"
                >
                  {/* Status & Level */}
                  <div className="flex items-center justify-between text-[11px] font-mono-tech pb-3 border-b border-white/[0.08]">
                    <span className="text-[#a3e635] font-semibold">
                      {edu.status}
                    </span>
                    <span className="text-white/50 tracking-wider">
                      {edu.level}
                    </span>
                  </div>

                  {/* Degree Name */}
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-3 leading-snug">
                    {edu.degree}
                  </h3>

                  {/* Institution */}
                  <div className="text-xs font-mono-tech text-[#00f0ff] mt-1 font-medium">
                    {edu.institution}
                  </div>

                  {/* University Affiliation */}
                  <div className="text-xs font-body text-white/60 mt-1">
                    {edu.affiliation}
                  </div>

                  {/* Core Focus / Foundations */}
                  <div className="mt-3 pt-3 border-t border-white/[0.06] text-xs font-mono-tech text-[#8e8e9f] leading-relaxed">
                    {edu.focus}
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
