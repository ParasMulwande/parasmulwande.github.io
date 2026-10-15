import React from 'react';
import type { Project } from '../../types';

/**
 * Project visuals.
 *
 * Each visual is built from what the project data actually states. Agri-Weather
 * uses its real 96.4% CNN accuracy; ValorCut reflects the capabilities the
 * project describes as in development, labelled as such.
 */

const seeded = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 41.77) * 43758.5453;
  return x - Math.floor(x);
};

/* ------------------------------------------------------------------ */
/* Agri-Weather — crop suitability + confidence + weather stream        */
/* ------------------------------------------------------------------ */

const AgriWeather: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="space-y-4">
      {/* Apple-style window bar with project identity and accuracy metric */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#30d158]"></span>
          </span>
          <span className="font-mono text-[11px] font-semibold text-[#f5f5f7] tracking-tight">
            PREDICROP AI // PRODUCTION INTERFACE
          </span>
        </div>
        <span className="rounded-full border border-[#30d158]/30 bg-[#30d158]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#30d158]">
          {project.metricValue}
        </span>
      </div>

      {/* Genuine Project Screenshot Frame */}
      <div className="group relative overflow-hidden rounded-[20px] border border-white/[0.12] bg-[#0c0c0e] shadow-[0_16px_36px_rgba(0,0,0,0.6)]">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0c0c0e]">
          <img
            src="/predicrop-crop-ai.png"
            alt="PREDICROP Crop AI interface screenshot showing soil and environment input parameters, soil nutrient guide, and predictive crop matching"
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
        <div className="border-t border-white/[0.08] bg-[#141416]/90 px-4 py-2.5 backdrop-blur-md flex items-center justify-between text-[11px] font-mono text-[#86868b]">
          <span>Interface Preview · Crop AI Analysis</span>
          <span className="text-[#30d158]">Live on Render</span>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* ValorCut — video timeline with detected events + vertical reframe    */
/* ------------------------------------------------------------------ */

const ValorCut: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="space-y-4">
      {/* Header bar with video status */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#bf5af2]"></span>
          </span>
          <span className="font-mono text-[11px] font-semibold text-[#f5f5f7] tracking-tight">
            VALORCUT AI // HIGHLIGHT EXTRACTION
          </span>
        </div>
        <span className="rounded-full border border-[#bf5af2]/30 bg-[#bf5af2]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#bf5af2] uppercase">
          In Development
        </span>
      </div>

      {/* Cinematic 16:9 Project Visual Frame */}
      <div className="group relative overflow-hidden rounded-[20px] border border-[#bf5af2]/20 bg-[#0c0c0e] shadow-[0_16px_36px_rgba(0,0,0,0.6)]">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0c0c0e]">
          <img
            src="/valorcut-cinematic.png"
            alt="ValorCut AI cinematic gameplay showcase illustrating automated highlight extraction from competitive tactical footage"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
          {/* Subtle purple corner ambient gradient overlay */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"
            aria-hidden="true"
          />
        </div>

        {/* Feature roadmap pill footer */}
        <div className="border-t border-white/[0.08] bg-[#141217]/90 px-4 py-2.5 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#86868b]">
          <div className="flex items-center gap-2">
            <span className="text-[#f5f5f7] font-medium">Core: Highlight Extraction</span>
            <span className="text-white/20">·</span>
            <span className="text-[#a1a1a6]">OpenCV Combat Cues</span>
          </div>
          <span className="text-[#bf5af2] text-[10px] font-semibold">Captions & 9:16 Reframe In Dev</span>
        </div>
      </div>
    </div>
  );
};

export const ProjectVisual: React.FC<{ project: Project }> = ({ project }) =>
  project.id === 'agri-weather' ? (
    <AgriWeather project={project} />
  ) : (
    <ValorCut project={project} />
  );