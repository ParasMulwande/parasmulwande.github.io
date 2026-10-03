import React, { useEffect, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const TelemetryStatusBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      // IST time calculation (UTC + 5:30)
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
    <div className="border-b border-white/[0.06] bg-[#08080b] py-2">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono-tech tracking-wider text-[#8e8e9f]">
        
        {/* Left Telemetry Status */}
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635]"></span>
          <span className="text-white/80">[{PERSONAL_INFO.systemVersion}]</span>
        </div>

        {/* Right Location & Role Status */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <span className="text-white/70">
            [LOC: NAGPUR, IN // IST {timeStr ? `${timeStr} ` : ''}GMT+5:30]
          </span>
          <span className="text-[#00f0ff] font-medium bg-[#00f0ff]/10 px-1.5 py-0.5 rounded border border-[#00f0ff]/30">
            [STATUS: {PERSONAL_INFO.availabilityStatus}]
          </span>
        </div>
      </div>
    </div>
  );
};
