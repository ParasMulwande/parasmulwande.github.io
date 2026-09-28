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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b0b10] border border-[#00f0ff]/30 rounded-lg max-w-xl w-full p-6 sm:p-8 font-mono-tech space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00f0ff]"></span>
            <span className="text-xs text-[#00f0ff] font-bold tracking-wider uppercase">
              CANDIDATE DOSSIER // {PERSONAL_INFO.handle}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-xs cursor-pointer px-2 py-1 bg-white/5 rounded"
          >
            [✕ CLOSE]
          </button>
        </div>

        {/* Profile Identity Card */}
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-extrabold text-white">
            {PERSONAL_INFO.firstName} {PERSONAL_INFO.lastName}
          </h3>
          <p className="text-xs text-[#00f0ff] font-medium">
            Machine Learning Engineer & Data Scientist
          </p>
          <p className="font-body text-xs text-[#8e8e9f] leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Quick Contact & Coordinates */}
        <div className="p-3.5 rounded bg-[#12121a] border border-white/[0.08] text-xs space-y-2 text-white/80">
          <div className="flex items-center justify-between">
            <span className="text-white/40">Email:</span>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#00f0ff] hover:underline">
              {PERSONAL_INFO.email}
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/40">Phone:</span>
            <span className="text-white">{PERSONAL_INFO.phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/40">Location:</span>
            <span>{PERSONAL_INFO.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/40">Status:</span>
            <span className="text-[#a3e635] font-semibold">{PERSONAL_INFO.availabilityStatus}</span>
          </div>
        </div>

        {/* Primary Education & Roles Highlights */}
        <div className="space-y-3">
          <div className="text-[11px] text-[#00f0ff] font-bold uppercase tracking-wider">
            ACADEMIC QUALIFICATIONS:
          </div>
          {EDUCATION.map((edu, i) => (
            <div key={i} className="text-xs border-l-2 border-[#00f0ff]/50 pl-3 py-0.5">
              <div className="text-white font-semibold">{edu.degree}</div>
              <div className="text-white/50 text-[11px]">{edu.institution}</div>
            </div>
          ))}
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-3">
          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=ML%20Engineer%20Opportunity`}
            className="flex-1 py-2.5 px-4 rounded bg-[#00f0ff] hover:bg-[#38f8ff] text-[#070709] text-xs font-bold text-center glow-cyan-sm transition-all"
          >
            CONTACT DIRECTLY
          </a>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded bg-[#161622] hover:bg-[#1e1e2d] text-white/80 text-xs text-center border border-white/10 cursor-pointer"
          >
            RETURN TO PORTFOLIO
          </button>
        </div>

      </div>
    </div>
  );
};
