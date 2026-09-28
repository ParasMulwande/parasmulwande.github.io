import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Github, Linkedin, Terminal, Send, Play, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<Array<{ type: 'input' | 'output' | 'success' | 'system'; text: string }>>([
    { type: 'input', text: 'candidate.get_status()' },
    { type: 'output', text: '• Specialization: Applied Machine Learning, Computer Vision, Predictive Data Engineering' },
    { type: 'output', text: '• Frameworks: PyTorch, Scikit-learn, Flask, MongoDB, Whisper ASR' },
    { type: 'output', text: '• Verified Publications: IJARSCT-25960, ETRCEE-2025' },
    { type: 'success', text: '> prompt: Available for technical interview loops and remote/hybrid offers.' }
  ]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleRunCommand = (cmdToRun?: string) => {
    const rawCmd = (cmdToRun || terminalInput).trim();
    if (!rawCmd) return;

    const cmd = rawCmd.toLowerCase();
    const newLogs = [...terminalLogs, { type: 'input' as const, text: rawCmd }];

    switch (cmd) {
      case 'help':
        newLogs.push(
          { type: 'system', text: 'AVAILABLE COMMANDS: [status, skills, projects, contact, publications, clear, hire]' }
        );
        break;
      case 'candidate.get_status()':
      case 'status':
        newLogs.push(
          { type: 'output', text: '• Specialization: Applied Machine Learning, Computer Vision, Predictive Data Engineering' },
          { type: 'output', text: '• Frameworks: PyTorch, Scikit-learn, Flask, MongoDB, Whisper ASR' },
          { type: 'output', text: '• Verified Publications: IJARSCT-25960, ETRCEE-2025' },
          { type: 'success', text: '> prompt: Available for technical interview loops and remote/hybrid offers.' }
        );
        break;
      case 'skills':
      case 'tech':
        newLogs.push(
          { type: 'output', text: 'Core Tech: Python, SQL, PyTorch, Scikit-learn, Flask, OpenCV, MongoDB, Whisper ASR, Pandas' }
        );
        break;
      case 'projects':
        newLogs.push(
          { type: 'output', text: '[01] AGRI-WEATHER: 96.4% accuracy crop management & disease diagnosis.' },
          { type: 'output', text: '[02] VALORCUT AI: Multi-modal 9:16 vertical gameplay clipping engine.' }
        );
        break;
      case 'publications':
      case 'research':
        newLogs.push(
          { type: 'output', text: '• IJARSCT (April 2025) DOI: 10.48175/IJARSCT-25960' },
          { type: 'output', text: '• ETRCEE (June 2025) Multi-Agent Agronomy Architecture' }
        );
        break;
      case 'contact':
      case 'hire':
        newLogs.push(
          { type: 'success', text: `Email: ${PERSONAL_INFO.email} | Tel: ${PERSONAL_INFO.phone}` },
          { type: 'output', text: 'Ready for full-time Machine Learning Engineer & Data Scientist roles.' }
        );
        break;
      case 'clear':
        setTerminalLogs([]);
        setTerminalInput('');
        return;
      default:
        newLogs.push(
          { type: 'system', text: `Command not recognized: "${rawCmd}". Type "help" for valid commands.` }
        );
        break;
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  return (
    <section id="contact" className="py-20 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-10">
          <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-white/50 uppercase">
            <span className="text-[#00f0ff] font-semibold">[SYSTEM DIRECT CONSOLE // INQUIRY DISPATCH]</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f4f4f6] tracking-tight uppercase">
              Initiate Transmission
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0d180d] border border-[#a3e635]/40 text-[#a3e635] font-mono-tech text-xs font-semibold self-start sm:self-auto">
              <span className="h-2 w-2 rounded-full bg-[#a3e635] animate-ping"></span>
              <span>AVAILABLE IMMEDIATELY</span>
            </div>
          </div>

          <p className="font-body text-sm sm:text-base text-[#8e8e9f] max-w-3xl">
            Actively considering Full-Time Machine Learning Engineer, Data Scientist, and Applied AI Developer engagements for Q2/Q3 2026.
          </p>
        </div>

        {/* 3 Contact Info Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Mailbox */}
          <div className="rounded-lg border border-white/10 bg-[#0c0c11] p-6 hover:border-[#00f0ff]/40 transition-all duration-200 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4 text-[11px] font-mono-tech">
                <span className="text-white/50 uppercase tracking-wider">PRIMARY MAILBOX</span>
                <Mail size={15} className="text-[#00f0ff]" />
              </div>
              <div className="text-xs font-mono-tech text-white/40">
                &gt; mailto:
              </div>
              <div className="text-base font-mono-tech font-bold text-white mt-1 break-all select-all">
                {PERSONAL_INFO.email}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.06]">
              <button
                onClick={handleCopyEmail}
                id="contact-copy-email-btn"
                className="w-full py-2 px-3 rounded-sm bg-[#151520] hover:bg-[#1f1f2e] border border-white/10 text-xs font-mono-tech text-white/90 hover:text-[#00f0ff] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check size={13} className="text-[#a3e635]" />
                    <span className="text-[#a3e635]">COPIED EMAIL ADDRESS</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>COPY EMAIL ADDRESS</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Phone */}
          <div className="rounded-lg border border-white/10 bg-[#0c0c11] p-6 hover:border-[#a3e635]/40 transition-all duration-200 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4 text-[11px] font-mono-tech">
                <span className="text-white/50 uppercase tracking-wider">DIRECT PHONE LINE</span>
                <Phone size={15} className="text-[#a3e635]" />
              </div>
              <div className="text-xs font-mono-tech text-white/40">
                &gt; voice_tel:
              </div>
              <div className="text-xl font-mono-tech font-bold text-white mt-1 select-all">
                {PERSONAL_INFO.phone}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.06]">
              <a
                href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                id="contact-dial-phone-btn"
                className="w-full py-2 px-3 rounded-sm bg-[#151520] hover:bg-[#1f1f2e] border border-white/10 text-xs font-mono-tech text-white/90 hover:text-[#a3e635] flex items-center justify-center gap-2 transition-colors"
              >
                <Phone size={13} />
                <span>DIAL NUMBER</span>
              </a>
            </div>
          </div>

          {/* Card 3: Location / Code Hub */}
          <div className="rounded-lg border border-white/10 bg-[#0c0c11] p-6 hover:border-[#00f0ff]/40 transition-all duration-200 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4 text-[11px] font-mono-tech">
                <span className="text-white/50 uppercase tracking-wider">STATION & CODE HUB</span>
                <MapPin size={15} className="text-[#00f0ff]" />
              </div>
              <div className="text-xs font-mono-tech text-white/40">
                &gt; station:
              </div>
              <div className="text-base font-mono-tech font-bold text-white mt-1">
                {PERSONAL_INFO.location}
              </div>
              <div className="text-xs font-mono-tech text-white/60 mt-0.5">
                IST (UTC +5:30) • Remote Capable
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-2 rounded-sm bg-[#151520] hover:bg-[#1f1f2e] border border-white/10 text-[11px] font-mono-tech text-white/90 hover:text-[#00f0ff] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Github size={12} />
                <span>GITHUB</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-2 rounded-sm bg-[#151520] hover:bg-[#1f1f2e] border border-white/10 text-[11px] font-mono-tech text-white/90 hover:text-[#00f0ff] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Linkedin size={12} />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>

        </div>

        {/* PARAS_CLI // TELEMETRY_SIMULATOR Interactive Terminal */}
        <div className="rounded-lg border border-white/15 bg-[#09090e] p-5 sm:p-6 shadow-2xl font-mono-tech">
          
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-[#00f0ff]" />
              <span className="text-white/80 font-bold tracking-wider">
                PARAS_CLI // TELEMETRY_SIMULATOR
              </span>
            </div>
            <div className="text-[#a3e635] text-[11px] font-semibold tracking-wider flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] animate-pulse"></span>
              <span>STATUS: 200 OK</span>
            </div>
          </div>

          {/* Terminal Output Stream */}
          <div className="py-4 space-y-2 text-xs leading-relaxed max-h-60 overflow-y-auto">
            {terminalLogs.map((log, index) => (
              <div key={index} className="flex items-start gap-2">
                {log.type === 'input' && (
                  <span className="text-[#00f0ff] font-bold shrink-0">&gt;</span>
                )}
                <span
                  className={
                    log.type === 'input'
                      ? 'text-[#00f0ff]'
                      : log.type === 'success'
                      ? 'text-[#a3e635] font-semibold'
                      : log.type === 'system'
                      ? 'text-yellow-400'
                      : 'text-white/80'
                  }
                >
                  {log.text}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Command Suggestions */}
          <div className="py-2 border-t border-white/[0.08] flex flex-wrap items-center gap-2 text-[11px]">
            <span className="text-white/40">Quick Commands:</span>
            {['candidate.get_status()', 'skills', 'projects', 'publications', 'hire', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleRunCommand(cmd)}
                className="px-2 py-0.5 rounded bg-[#13131c] hover:bg-[#1a1a27] border border-white/10 text-[#00f0ff] text-[10px] cursor-pointer transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunCommand();
            }}
            className="mt-2 pt-2 border-t border-white/10 flex items-center gap-2"
          >
            <span className="text-[#00f0ff] font-bold">&gt;</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Type a command (e.g. status, projects, hire) and hit Enter..."
              className="w-full bg-transparent border-none text-xs text-white placeholder-white/30 focus:outline-none font-mono-tech"
            />
            <button
              type="submit"
              className="text-xs px-3 py-1 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 rounded cursor-pointer"
            >
              RUN
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
