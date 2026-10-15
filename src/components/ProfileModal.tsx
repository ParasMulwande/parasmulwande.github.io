import React from 'react';
import { PERSONAL_INFO, EDUCATION, EXPERIENCE } from '../data/portfolioData';
import { X, Mail, Phone, MapPin, Download, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#161618] border border-white/[0.12] rounded-[24px] max-w-xl w-full p-6 sm:p-8 font-sans space-y-6 shadow-[0_24px_60px_rgba(0,0,0,0.65)] relative max-h-[90vh] overflow-y-auto">
        
        {/* Modal Window Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56]/80 cursor-pointer" onClick={onClose} />
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]/80" />
              <div className="h-3 w-3 rounded-full bg-[#27c93f]/80" />
            </div>
            <span className="text-[12px] text-[#86868b] font-medium tracking-tight ml-2">
              Profile Dossier · {PERSONAL_INFO.handle}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#86868b] hover:text-[#f5f5f7] text-[12px] cursor-pointer px-2.5 py-1 bg-white/[0.05] hover:bg-white/[0.1] rounded-full transition-colors"
          >
            Done
          </button>
        </div>

        {/* Profile Identity Card */}
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-bold text-[#f5f5f7] tracking-tight">
            {PERSONAL_INFO.firstName} {PERSONAL_INFO.lastName}
          </h3>
          <p className="text-[13px] text-[#2997ff] font-medium tracking-tight">
            Machine Learning Engineer & Data Scientist
          </p>
          <p className="text-[13px] text-[#a1a1a6] leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Quick Contact & Coordinates */}
        <div className="p-4 rounded-[16px] bg-[#1c1c1e] border border-white/[0.06] text-[13px] space-y-2.5 text-[#f5f5f7]">
          <div className="flex items-center justify-between">
            <span className="text-[#86868b]">Email:</span>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#2997ff] hover:underline font-mono text-[12px]">
              {PERSONAL_INFO.email}
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#86868b]">Phone:</span>
            <a
              href={`https://wa.me/${PERSONAL_INFO.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="text-[#2997ff] hover:underline font-mono text-[12px]"
            >
              {PERSONAL_INFO.phone}
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#86868b]">Location:</span>
            <span className="text-[#f5f5f7]">{PERSONAL_INFO.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/40">Status:</span>
            <span className="text-[#a3e635] font-semibold">{PERSONAL_INFO.availabilityStatus}</span>
          </div>
        </div>

        {/* Professional Experience & Internship */}
        <div className="space-y-3">
          <div className="text-[11px] text-[#2997ff] font-bold uppercase tracking-wider">
            PROFESSIONAL EXPERIENCE:
          </div>
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="text-xs border-l-2 border-[#2997ff]/50 pl-3 py-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[#f5f5f7] font-semibold">{exp.role}</span>
                <span className="text-[11px] text-[#86868b] font-mono">{exp.period}</span>
              </div>
              <div className="text-[#2997ff] text-[11px]">{exp.company} {exp.workMode && `· ${exp.workMode}`}</div>
              <p className="text-[11px] text-[#a1a1a6] leading-relaxed">{exp.summary}</p>
            </div>
          ))}
        </div>

        {/* Academic Qualifications */}
        <div className="space-y-3">
          <div className="text-[11px] text-[#2997ff] font-bold uppercase tracking-wider">
            ACADEMIC QUALIFICATIONS:
          </div>
          {EDUCATION.map((edu, i) => (
            <div key={i} className="text-xs border-l-2 border-[#2997ff]/50 pl-3 py-1 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[#f5f5f7] font-semibold">{edu.degree}</span>
                <span className="text-[10px] text-[#30d158] font-mono bg-[#30d158]/10 px-1.5 py-0.5 rounded border border-[#30d158]/20">{edu.status}</span>
              </div>
              <div className="text-[#a1a1a6] text-[11px]">{edu.institution}</div>
              <div className="text-[#86868b] text-[10px]">{edu.affiliation}</div>
            </div>
          ))}
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-3">
          <a
            href={PERSONAL_INFO.resumePath}
            download="Paras-Mulwande-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2.5 px-4 rounded-[12px] bg-[#f5f5f7] hover:bg-white text-black text-xs font-semibold text-center transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Download size={13} />
            <span>DOWNLOAD RESUME (PDF)</span>
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=ML%20Engineer%20Opportunity`}
            className="py-2.5 px-4 rounded-[12px] bg-white/[0.05] hover:bg-white/[0.1] text-[#f5f5f7] text-xs font-medium text-center border border-white/10 cursor-pointer transition-colors"
          >
            CONTACT DIRECTLY
          </a>
          <button
            onClick={onClose}
            className="py-2.5 px-3 rounded-[12px] bg-white/[0.03] hover:bg-white/[0.08] text-[#86868b] hover:text-white text-xs text-center border border-white/10 cursor-pointer transition-colors"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};
