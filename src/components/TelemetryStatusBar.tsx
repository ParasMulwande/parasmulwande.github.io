import React, { useEffect, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const TelemetryStatusBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (330 * 60000));
      const hours = String(istTime.getHours()).padStart(2, '0');
      const minutes = String(istTime.getMinutes()).padStart(2, '0');
      const seconds = String(istTime.getSeconds()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-b border-white/[0.05] bg-[#0c0c0e]/60 backdrop-blur-md py-1.5 px-4 text-[11px] font-mono text-[#86868b]">
      <div className="mx-auto max-w-[1140px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 tracking-tight">
        {/* Left Telemetry Status */}
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#30d158]"></span>
          <span className="text-[#a1a1a6]">SYSTEM // {PERSONAL_INFO.systemVersion}</span>
          <span className="text-white/20">·</span>
          <span className="hidden sm:inline text-[#86868b]">{PERSONAL_INFO.roleLabel}</span>
        </div>

        {/* Right Location & Time */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span>
            NAGPUR, IN · IST {timeStr ? `${timeStr} ` : ''}(UTC+5:30)
          </span>
          <span className="text-white/20">·</span>
          <span className="text-[#30d158] font-medium bg-[#30d158]/10 px-2 py-0.5 rounded-full border border-[#30d158]/20 text-[10px]">
            {PERSONAL_INFO.availabilityStatus}
          </span>
        </div>
      </div>
    </div>
  );
};
