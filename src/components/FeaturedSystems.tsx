import React, { useState, useEffect } from 'react';
import { ExternalLink, Play, Pause, RefreshCw, Activity, CheckCircle2, Video, Zap, FileText } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

interface FeaturedSystemsProps {
  onSelectDoi?: (doi: string) => void;
}

export const FeaturedSystems: React.FC<FeaturedSystemsProps> = ({ onSelectDoi }) => {
  // Interactive state for Agri-Weather simulation
  const [agriSimulating, setAgriSimulating] = useState(false);
  const [isAgriStreaming, setIsAgriStreaming] = useState(true);
  const [agriHealthIndex, setAgriHealthIndex] = useState(96.4);
  const [agriBlightStatus, setAgriBlightStatus] = useState('LEAF_BLIGHT_FREE');
  const [agriLatency, setAgriLatency] = useState('0.0034s');
  const [atmosphericPressure, setAtmosphericPressure] = useState('1013.2 hPa • 28.2°C');
  const [precipVal, setPrecipVal] = useState('3.2mm');
  const [agriProbe, setAgriProbe] = useState({ x: 190, y: 32 });
  const [agriWavePath, setAgriWavePath] = useState('M 0,55 Q 50,20 100,45 T 200,30 T 320,35');
  const [agriAreaPath, setAgriAreaPath] = useState('M 0,55 Q 50,20 100,45 T 200,30 T 320,35 L 320,80 L 0,80 Z');

  // Dynamic animation state for ValorCut AI gameplay clipping
  const [isValorantPlaying, setIsValorantPlaying] = useState(true);
  const [cropPosition, setCropPosition] = useState(50); // percentage (35% to 65%)
  const [crosshairCoords, setCrosshairCoords] = useState({ x: 962, y: 518 });
  const [valorantConfidence, setValorantConfidence] = useState(99.1);
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [killfeedIdx, setKillfeedIdx] = useState(0);
  const [audioLevels, setAudioLevels] = useState<number[]>([35, 70, 25, 90, 55, 80, 45, 95, 65, 30, 85, 50]);

  const subtitlesList = [
    'ASR: "ONE ENEMY REMAINING"',
    'ASR: "SPIKE PLANTED AT A SITE"',
    'ASR: "CLUTCH ENGAGEMENT DETECTED"',
    'ASR: "ENEMY SPOTTED HEAVEN"',
    'ASR: "TARGET ELIMINATED: HEADSHOT"'
  ];

  const killfeedList = [
    'KILLFEED: VANDAL HEADSHOT',
    'KILLFEED: OPERATOR WALLBANG',
    'KILLFEED: 1V3 CLUTCH WON',
    'KILLFEED: PHANTOM SPRAY ACE'
  ];

  // Continuous animation loop for ValorCut AI
  useEffect(() => {
    if (!isValorantPlaying) return;

    let startTime = Date.now();
    let frameId: number;

    const animateLoop = () => {
      const elapsed = Date.now() - startTime;
      
      // Smooth sinusoidal tracking movement across the 16:9 canvas (between 40% and 60%)
      const newCropX = 50 + Math.sin(elapsed / 1200) * 12;
      setCropPosition(newCropX);

      // Coordinate tracking aligned with camera pan
      const newX = Math.round(960 + Math.sin(elapsed / 1200) * 220 + Math.sin(elapsed / 400) * 15);
      const newY = Math.round(518 + Math.cos(elapsed / 1500) * 35 + Math.cos(elapsed / 300) * 8);
      setCrosshairCoords({ x: newX, y: newY });

      // Audio waveform oscillation
      if (Math.random() > 0.4) {
        setAudioLevels([
          20 + Math.floor(Math.sin(elapsed / 200) * 30 + 35),
          30 + Math.floor(Math.cos(elapsed / 250) * 45 + 45),
          15 + Math.floor(Math.sin(elapsed / 180) * 25 + 30),
          40 + Math.floor(Math.cos(elapsed / 320) * 45 + 50),
          25 + Math.floor(Math.sin(elapsed / 150) * 35 + 40),
          50 + Math.floor(Math.cos(elapsed / 280) * 40 + 45),
          20 + Math.floor(Math.sin(elapsed / 220) * 30 + 35),
          60 + Math.floor(Math.cos(elapsed / 190) * 35 + 40),
          35 + Math.floor(Math.sin(elapsed / 270) * 40 + 45),
          25 + Math.floor(Math.cos(elapsed / 160) * 25 + 30),
          45 + Math.floor(Math.sin(elapsed / 310) * 40 + 45),
          30 + Math.floor(Math.cos(elapsed / 210) * 30 + 35)
        ]);
      }

      frameId = requestAnimationFrame(animateLoop);
    };

    frameId = requestAnimationFrame(animateLoop);

    // Periodic events: Subtitle, killfeed, and confidence updates
    const eventInterval = setInterval(() => {
      setSubtitleIdx((prev) => (prev + 1) % subtitlesList.length);
      setKillfeedIdx((prev) => (prev + 1) % killfeedList.length);
      setValorantConfidence(parseFloat((98.4 + Math.random() * 1.4).toFixed(1)));
    }, 2800);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(eventInterval);
    };
  }, [isValorantPlaying]);

  // Continuous animation loop for Agri-Weather telemetry and sensor wave
  useEffect(() => {
    if (!isAgriStreaming) return;

    let frameId: number;
    const startTime = Date.now();

    const animateAgriWave = () => {
      const elapsed = Date.now() - startTime;
      const t = elapsed / 1000;

      // Real-time undulating telemetry waveform calculation
      const y0 = 52 + Math.sin(t * 2.2) * 6;
      const y1 = 24 + Math.cos(t * 2.6) * 9;
      const y2 = 46 + Math.sin(t * 1.9) * 7;
      const y3 = 26 + Math.cos(t * 2.8) * 10;
      const y4 = 34 + Math.sin(t * 2.4) * 8;

      // Dynamic gliding sensor probe across the 320px SVG width
      const probeX = (elapsed * 0.05) % 320;
      const normX = probeX / 320;
      const probeY = Math.max(14, Math.min(68, 36 + Math.sin(t * 2.2 + normX * Math.PI * 3) * 12 + Math.cos(normX * Math.PI * 2) * 8));

      setAgriProbe({ x: Math.round(probeX), y: Math.round(probeY) });

      const curve = `M 0,${y0.toFixed(1)} Q 50,${y1.toFixed(1)} 100,${y2.toFixed(1)} T 200,${y3.toFixed(1)} T 320,${y4.toFixed(1)}`;
      const area = `${curve} L 320,80 L 0,80 Z`;

      setAgriWavePath(curve);
      setAgriAreaPath(area);

      frameId = requestAnimationFrame(animateAgriWave);
    };

    frameId = requestAnimationFrame(animateAgriWave);

    // Dynamic sensory telemetry drift (weather and CNN confidence updates)
    const telemetryInterval = setInterval(() => {
      const pOffset = Math.sin(Date.now() / 6000) * 0.6;
      const tOffset = Math.cos(Date.now() / 5000) * 0.3;
      setAtmosphericPressure(`${(1013.2 + pOffset).toFixed(1)} hPa • ${(28.1 + tOffset).toFixed(1)}°C`);

      const precipFluct = (3.1 + Math.sin(Date.now() / 7000) * 0.2).toFixed(1);
      setPrecipVal(`${precipFluct}mm`);

      setAgriLatency((0.0031 + Math.random() * 0.0007).toFixed(4) + 's');
      if (!agriSimulating) {
        setAgriHealthIndex(parseFloat((96.2 + Math.random() * 0.5).toFixed(1)));
      }
    }, 1800);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(telemetryInterval);
    };
  }, [isAgriStreaming, agriSimulating]);

  const triggerAgriScan = () => {
    setAgriSimulating(true);
    setTimeout(() => {
      const newHealth = (95.4 + Math.random() * 3.2).toFixed(1);
      setAgriHealthIndex(parseFloat(newHealth));
      setAgriLatency((0.0028 + Math.random() * 0.0010).toFixed(4) + 's');
      setAgriBlightStatus(Math.random() > 0.1 ? 'LEAF_BLIGHT_FREE' : 'EARLY_RUST_DETECTED');
      setAgriSimulating(false);
    }, 600);
  };

  return (
    <section id="systems" className="py-12 sm:py-16 border-b border-white/[0.08] relative">
      <div className="shell">
        
        {/* Section Header */}
        <div className="space-y-2 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-white/50 uppercase">
            <span className="text-[#00f0ff] font-semibold">[01 // FLAGSHIP ARCHITECTURES]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f4f4f6] tracking-tight uppercase">
            FEATURED INTELLIGENT SYSTEMS
          </h2>
          <p className="font-body text-sm sm:text-base text-[#8e8e9f] max-w-3xl">
            High-impact autonomous workflows, deep-learning computer vision models, and applied data science pipelines designed for real-world utility.
          </p>
        </div>

        {/* Systems Showcase Stack */}
        <div className="space-y-6 sm:space-y-8">
          
          {/* ============================================================ */}
          {/* PROJECT 1: AGRI-WEATHER */}
          {/* ============================================================ */}
          <div className="rounded-lg border border-white/10 bg-[#0b0b10] p-5 sm:p-7 hover:border-white/20 transition-all duration-300 relative overflow-hidden shadow-2xl">
            {/* Top Cyan Sheen Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff]/70 to-transparent"></div>

            {/* Card Header Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-5 border-b border-white/10 font-mono-tech text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white/60 font-semibold">{PROJECTS[0].tag}</span>
                <span className="text-[#a3e635] flex items-center gap-1.5 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] inline-block animate-pulse"></span>
                  {PROJECTS[0].badge}
                </span>
              </div>
              <div className="text-[#8e8e9f] font-mono-tech tracking-wider text-[11px]">
                {PROJECTS[0].metricLabel}: <span className="text-[#00f0ff] font-bold">{PROJECTS[0].metricValue}</span>
              </div>
            </div>

            {/* Card Grid Content: Left Details, Right Interactive Telemetry Daemon */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5 items-center">
              
              {/* Left Column (7 cols): Title, Subtitle, Text, Highlights, Tags, DOI */}
              <div className="lg:col-span-7 space-y-3">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {PROJECTS[0].title}
                  </h3>
                  <h4 className="font-mono-tech text-xs sm:text-sm text-[#00f0ff] mt-1 tracking-wide font-medium">
                    {PROJECTS[0].subtitle}
                  </h4>
                </div>

                <p className="font-body text-sm text-[#8e8e9f] leading-relaxed">
                  {PROJECTS[0].description}
                </p>

                {/* Sub-feature badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {PROJECTS[0].highlights.map((item, idx) => (
                    <div key={idx} className="p-3 rounded bg-[#111118] border border-white/[0.08] hover:border-[#00f0ff]/30 transition-colors">
                      <div className="flex items-center gap-2 text-xs font-mono-tech font-semibold text-white">
                        <span className="h-2 w-2 rounded-full bg-[#00f0ff]/80"></span>
                        {item.title}
                      </div>
                      <div className="text-[11px] font-body text-[#8e8e9f] mt-1 leading-snug">
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {PROJECTS[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-sm bg-[#151520] border border-white/10 text-[11px] font-mono-tech text-[#b9cacb] hover:border-[#00f0ff]/40 hover:text-[#00f0ff] transition-colors"
                    >
                      [ {tag} ]
                    </span>
                  ))}
                </div>

                {/* Paper Reference Link */}
                <div className="pt-2 flex items-center gap-4 text-xs font-mono-tech">
                  <a
                    href={PROJECTS[0].paperLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#00f0ff] hover:text-[#38f8ff] font-semibold underline underline-offset-4 decoration-[#00f0ff]/40 hover:decoration-[#00f0ff] transition-all"
                  >
                    <span>VIEW PEER-REVIEWED PAPER</span>
                    <ExternalLink size={13} />
                  </a>
                  <span className="text-white/40">•</span>
                  <span className="text-[#8e8e9f] text-[11px]">
                    DOI: {PROJECTS[0].doi}
                  </span>
                </div>
              </div>

              {/* Right Column (5 cols): Live Telemetry Agriculture Analytics Daemon HUD */}
              <div className="lg:col-span-5">
                <div className="rounded-md border border-white/15 bg-[#09090e] p-4 shadow-xl font-mono-tech relative overflow-hidden">
                  
                  {/* Daemon Window Header with Active Status & Resume Toggle */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px]">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-500/80"></span>
                        <span className="h-2 w-2 rounded-full bg-yellow-500/80"></span>
                        <span className="h-2 w-2 rounded-full bg-green-500/80"></span>
                      </div>
                      <span className="text-white/70 text-[10px] ml-1">agri_analytics_daemon.py</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Interactive Manual Test Button */}
                      <button
                        onClick={triggerAgriScan}
                        disabled={agriSimulating}
                        title="Simulate Real-time Scan"
                        className="text-[10px] text-white/60 hover:text-[#00f0ff] flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded cursor-pointer transition-colors"
                      >
                        <RefreshCw size={10} className={agriSimulating ? 'animate-spin text-[#00f0ff]' : ''} />
                        <span>TEST</span>
                      </button>

                      {/* Resume / Pause Animation Button */}
                      <button
                        onClick={() => setIsAgriStreaming(!isAgriStreaming)}
                        id="agri-resume-animation-btn"
                        title={isAgriStreaming ? "Pause Telemetry Stream" : "Resume Telemetry Stream"}
                        className={`px-2 py-0.5 rounded text-[10px] flex items-center gap-1 font-mono-tech font-bold transition-all cursor-pointer ${
                          isAgriStreaming
                            ? 'bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/40 hover:bg-[#a3e635]/25'
                            : 'bg-[#00f0ff] text-[#070709] border border-[#00f0ff] animate-pulse glow-cyan-sm shadow-[0_0_12px_#00f0ff]'
                        }`}
                      >
                        {isAgriStreaming ? (
                          <>
                            <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] animate-ping"></span>
                            <span>RUNNING // 5000</span>
                            <Pause size={9} className="ml-0.5 opacity-70" />
                          </>
                        ) : (
                          <>
                            <Play size={10} fill="currentColor" />
                            <span>RESUME STREAM</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Telemetry Metrics Header with Dynamic Drift */}
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-[10px] text-white/50 uppercase tracking-wider">TARGETED CROP HEALTH INDEX</div>
                      <div className="text-2xl font-bold text-[#a3e635] flex items-baseline gap-2 mt-0.5">
                        <span>{agriHealthIndex}%</span>
                        <span className="text-[10px] text-[#a3e635]/80 font-normal">CNN CONFIDENCE</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-white/50 uppercase tracking-wider">ATMOSPHERIC TELEMETRY</div>
                      <div className="text-xs font-semibold text-white/90 mt-1 transition-all duration-300">
                        {atmosphericPressure}
                      </div>
                    </div>
                  </div>

                  {/* Dynamic SVG Sensor Waveform Visualization with Undulating Wave & Sliding Probe */}
                  <div className="my-3 h-24 w-full bg-[#050508] rounded border border-white/[0.08] relative overflow-hidden flex items-center justify-center select-none">
                    
                    {/* Moving Laser Scanline Overlay */}
                    {isAgriStreaming && (
                      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#a3e635]/40 to-transparent animate-scanline pointer-events-none z-10"></div>
                    )}

                    <svg className="w-full h-full" viewBox="0 0 320 80" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="limeGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#00f0ff" />
                          <stop offset="50%" stopColor="#a3e635" />
                          <stop offset="100%" stopColor="#00f0ff" />
                        </linearGradient>
                      </defs>

                      {/* Grid Reference Lines in Graph */}
                      <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
                      <line x1="0" y1="40" x2="320" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
                      <line x1="0" y1="60" x2="320" y2="60" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />

                      {/* Vertical Laser Probe Sweep Line */}
                      {isAgriStreaming && (
                        <line
                          x1={agriProbe.x}
                          y1="0"
                          x2={agriProbe.x}
                          y2="80"
                          stroke="#a3e635"
                          strokeWidth="1"
                          strokeOpacity="0.35"
                          strokeDasharray="2,2"
                        />
                      )}

                      {/* Live Undulating Area Fill */}
                      <path
                        d={agriAreaPath}
                        fill="url(#cyanGrad)"
                        className="transition-all duration-75 ease-linear"
                      />

                      {/* Live Undulating Wave Curve */}
                      <path
                        d={agriWavePath}
                        fill="none"
                        stroke="url(#limeGrad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="transition-all duration-75 ease-linear"
                      />

                      {/* Real-time Dynamic Probe Point gliding across the curve */}
                      <g className="transition-all duration-75 ease-linear">
                        <circle cx={agriProbe.x} cy={agriProbe.y} r="3.5" fill="#a3e635" />
                        <circle
                          cx={agriProbe.x}
                          cy={agriProbe.y}
                          r="7"
                          fill="none"
                          stroke="#a3e635"
                          strokeWidth="1.2"
                          opacity="0.8"
                          className={isAgriStreaming ? "animate-ping" : ""}
                        />
                      </g>
                    </svg>

                    {/* Sensor Probe Coordinates Badge */}
                    <div className="absolute top-1 left-2 text-[8px] text-white/40 font-mono-tech z-10 bg-black/60 px-1 py-0.5 rounded border border-white/5">
                      PROBE: [X: {agriProbe.x}, Y: {agriProbe.y}]
                    </div>
                  </div>

                  {/* Sub-telemetry Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-center py-2 px-1 bg-[#0f0f16] rounded border border-white/[0.05] text-[10px]">
                    <div>
                      <span className="text-white/50 block">NPK Ratio:</span>
                      <span className="text-white font-bold">14-8-10</span>
                    </div>
                    <div>
                      <span className="text-white/50 block">Precip:</span>
                      <span className="text-[#00f0ff] font-bold">{precipVal}</span>
                    </div>
                    <div>
                      <span className="text-white/50 block">Status:</span>
                      <span className="text-[#a3e635] font-bold">Optimal</span>
                    </div>
                  </div>

                  {/* Bottom Verification Footer */}
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
                    <span className="text-[#a3e635]">
                      [CONFIDENCE: {agriBlightStatus}]
                    </span>
                    <span className="text-[#00f0ff] font-medium">{agriLatency} latency</span>
                  </div>

                </div>
              </div>

            </div>
          </div>


          {/* ============================================================ */}
          {/* PROJECT 2: VALORCUT AI */}
          {/* ============================================================ */}
          <div className="rounded-lg border border-white/10 bg-[#0b0b10] p-5 sm:p-7 hover:border-white/20 transition-all duration-300 relative overflow-hidden shadow-2xl">
            {/* Top Lime Sheen Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#a3e635]/70 to-transparent"></div>

            {/* Card Header Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-5 border-b border-white/10 font-mono-tech text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white/60 font-semibold">{PROJECTS[1].tag}</span>
                <span className="text-[#00f0ff] flex items-center gap-1.5 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] inline-block animate-pulse"></span>
                  {PROJECTS[1].badge}
                </span>
              </div>
              <div className="text-[#8e8e9f] font-mono-tech tracking-wider text-[11px]">
                {PROJECTS[1].metricLabel}: <span className="text-[#a3e635] font-bold">{PROJECTS[1].metricValue}</span>
              </div>
            </div>

            {/* Card Grid Content: Left Details, Right Interactive Computer Vision Studio */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5 items-center">
              
              {/* Left Column (7 cols): Title, Subtitle, Text, Highlights, Tags */}
              <div className="lg:col-span-7 space-y-3">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {PROJECTS[1].title}
                  </h3>
                  <h4 className="font-mono-tech text-xs sm:text-sm text-[#a3e635] mt-1 tracking-wide font-medium">
                    {PROJECTS[1].subtitle}
                  </h4>
                </div>

                <p className="font-body text-sm text-[#8e8e9f] leading-relaxed">
                  {PROJECTS[1].description}
                </p>

                {/* Sub-feature badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {PROJECTS[1].highlights.map((item, idx) => (
                    <div key={idx} className="p-3 rounded bg-[#111118] border border-white/[0.08] hover:border-[#a3e635]/30 transition-colors">
                      <div className="flex items-center gap-2 text-xs font-mono-tech font-semibold text-white">
                        <span className="h-2 w-2 rounded-full bg-[#a3e635]/80"></span>
                        {item.title}
                      </div>
                      <div className="text-[11px] font-body text-[#8e8e9f] mt-1 leading-snug">
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {PROJECTS[1].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-sm bg-[#151520] border border-white/10 text-[11px] font-mono-tech text-[#b9cacb] hover:border-[#a3e635]/40 hover:text-[#a3e635] transition-colors"
                    >
                      [ {tag} ]
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs font-mono-tech text-white/50">
                  <span className="text-[#a3e635]">●</span>
                  <span>AUTONOMOUS PIPELINE: OPENCV SALIENCE + WHISPER FAST-INFERENCE</span>
                </div>
              </div>

              {/* Right Column (5 cols): Interactive Computer Vision Gameplay Clipping HUD */}
              <div className="lg:col-span-5">
                <div className="rounded-md border border-white/15 bg-[#09090e] p-4 shadow-xl font-mono-tech relative overflow-hidden">
                  
                  {/* Thread Header with Active Animation Status and Resume/Pause Toggle */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px]">
                    <div className="flex items-center gap-2 text-white/80 font-semibold">
                      <Video size={13} className="text-[#a3e635]" />
                      <span>CLIP_EXTRACTION_THREAD #83</span>
                    </div>

                    {/* Resume / Pause Interactive Action Button */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsValorantPlaying(!isValorantPlaying)}
                        id="valorcut-resume-animation-btn"
                        title={isValorantPlaying ? "Pause Animation" : "Resume Animation"}
                        className={`px-2 py-0.5 rounded text-[10px] flex items-center gap-1 font-mono-tech font-bold transition-all cursor-pointer ${
                          isValorantPlaying
                            ? 'bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/40 hover:bg-[#a3e635]/25'
                            : 'bg-[#00f0ff] text-[#070709] border border-[#00f0ff] animate-pulse glow-cyan-sm shadow-[0_0_12px_#00f0ff]'
                        }`}
                      >
                        {isValorantPlaying ? (
                          <>
                            <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] animate-ping"></span>
                            <span>ACTIVE 60FPS</span>
                            <Pause size={9} className="ml-1 opacity-70" />
                          </>
                        ) : (
                          <>
                            <Play size={10} fill="currentColor" />
                            <span>RESUME ANIMATION</span>
                          </>
                        )}
                      </button>

                      <span className="text-[#00f0ff] text-[10px] hidden sm:inline-block">
                        1080p
                      </span>
                    </div>
                  </div>

                  {/* 16:9 Video Canvas Frame Simulator with Dynamic 9:16 Adaptive Reframe Overlay */}
                  <div className="relative aspect-video w-full rounded bg-[#030306] border border-white/10 overflow-hidden flex items-center justify-center p-2 select-none">
                    
                    {/* Dark Tactical Grid inside video frame */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#13131d_1px,transparent_1px),linear-gradient(to_bottom,#13131d_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 pointer-events-none"></div>

                    {/* Moving Laser Scanline Effect */}
                    {isValorantPlaying && (
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent animate-scanline pointer-events-none z-30"></div>
                    )}

                    {/* Left 16:9 Dynamic Letterbox dimming zone */}
                    <div
                      className="absolute inset-y-0 left-0 bg-black/80 border-r border-white/20 flex items-center justify-center text-[8px] text-white/30 uppercase tracking-widest pointer-events-none transition-all duration-75 z-20"
                      style={{ width: `${Math.max(0, cropPosition - 18)}%` }}
                    >
                      <span className="truncate px-1">HUD_ZONE [SUPPRESSED]</span>
                    </div>

                    {/* Right 16:9 Dynamic Letterbox dimming zone */}
                    <div
                      className="absolute inset-y-0 right-0 bg-black/80 border-l border-white/20 flex items-center justify-center text-[8px] text-white/30 uppercase tracking-widest pointer-events-none transition-all duration-75 z-20"
                      style={{ width: `${Math.max(0, 100 - (cropPosition + 18))}%` }}
                    >
                      <span className="truncate px-1">BUFFER: 99.4% FULL</span>
                    </div>

                    {/* Dynamic Center 9:16 Adaptive Framing Window (Tracks horizontally) */}
                    <div
                      className="absolute top-[4%] bottom-[4%] z-20 border-2 border-[#00f0ff] rounded-sm bg-[#00f0ff]/5 flex flex-col justify-between p-1.5 shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all duration-75"
                      style={{
                        left: `${cropPosition}%`,
                        transform: 'translateX(-50%)',
                        width: '36%'
                      }}
                    >
                      {/* Top Frame Label */}
                      <div className="flex items-center justify-between text-[8px] text-[#00f0ff] font-bold">
                        <span className="truncate">9:16 CROP [SALIENT]</span>
                        <span className={`h-1.5 w-1.5 rounded-full bg-[#00f0ff] ${isValorantPlaying ? 'animate-ping' : ''}`}></span>
                      </div>

                      {/* Center Crosshair Tracker with Target Lock reticle */}
                      <div className="self-center flex flex-col items-center my-auto relative">
                        {/* Target Reticle Brackets */}
                        <div className="w-8 h-8 rounded-full border border-[#a3e635]/40 flex items-center justify-center relative animate-pulse">
                          <div className="text-[#a3e635] text-[15px] leading-none select-none font-bold">
                            +
                          </div>
                        </div>

                        <div className="mt-1 px-1.5 py-0.5 rounded bg-black/90 border border-[#a3e635]/60 text-[8px] text-[#a3e635] font-bold text-center leading-tight shadow-md">
                          CLUTCH ENGAGEMENT<br />
                          CONF: {valorantConfidence}% (ACE)
                        </div>
                      </div>

                      {/* Bottom Subtitle / Speech Sync Bar */}
                      <div className="bg-black/95 px-1 py-0.5 rounded border border-[#00f0ff]/30 text-[8px] text-[#00f0ff] font-medium text-center truncate shadow-lg">
                        {subtitlesList[subtitleIdx]}
                      </div>
                    </div>

                    {/* Dynamic Killfeed Parser Tag (Top Right of active region) */}
                    <div className="absolute top-2 right-[24%] z-25 px-2 py-0.5 rounded bg-red-950/90 border border-red-500/80 text-[8px] text-red-200 font-bold shadow-lg transition-all duration-200">
                      {killfeedList[killfeedIdx]}
                    </div>

                    {/* Dynamic Coordinate Marker in bottom left */}
                    <div className="absolute bottom-1 left-2 text-[8px] text-white/50 font-mono-tech z-25 bg-black/70 px-1.5 py-0.5 rounded border border-white/10">
                      COORDS: [X: {crosshairCoords.x}, Y: {crosshairCoords.y}]
                    </div>
                  </div>

                  {/* Dynamic Audio Waveform Equalizer Strip */}
                  <div className="mt-3 flex items-center justify-between text-[10px] pt-2 border-t border-white/10 text-white/70">
                    <div className="flex items-center gap-2">
                      <span className="text-[#a3e635] font-semibold text-[10px]">
                        [PIPELINE: STT → CROPPING → EXPORT]
                      </span>
                      {/* Live Animated Equalizer Bars */}
                      <div className="flex items-end gap-[2px] h-3 w-14">
                        {audioLevels.slice(0, 8).map((level, i) => (
                          <div
                            key={i}
                            className="w-1 bg-[#00f0ff] rounded-t-xs transition-all duration-100"
                            style={{ height: `${Math.max(15, level)}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    <span className="text-[#00f0ff] font-bold text-[10px]">
                      ETA: Q1 2026
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
