/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TelemetryStatusBar } from './components/TelemetryStatusBar';
import { HeroSection } from './components/HeroSection';
import { TechTicker } from './components/TechTicker';
import { FeaturedSystems } from './components/FeaturedSystems';
import { TechnicalArsenal } from './components/TechnicalArsenal';
import { PublicationsSection } from './components/PublicationsSection';
import { ExperienceEducation } from './components/ExperienceEducation';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProfileModal } from './components/ProfileModal';
import { BootIntro } from './components/BootIntro';

export default function App() {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem('portfolio_booted');
    if (hasBooted) {
      setBootComplete(true);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('portfolio_booted', 'true');
    setBootComplete(true);
  };

  if (!bootComplete) {
    return (
      <BootIntro onComplete={handleBootComplete} />
    );
  }

  return (
    <div className="w-full max-w-none min-h-screen bg-bg text-ink font-body relative flex flex-col">
      {/* Global background atmosphere is provided by body::before / body::after in index.css */}
      
      {/* Top Fixed Navigation */}
      <Navbar onOpenProfile={() => setProfileModalOpen(true)} />

      {/* Sub-header Telemetry Status Bar */}
      <div className="relative z-10">
        <TelemetryStatusBar />
      </div>

      {/* Main Content Sections */}
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Endless Infinite Ticker */}
        <TechTicker />

        {/* Section 01: Featured Intelligent Systems */}
        <FeaturedSystems />

        {/* Section 02: Technical Arsenal */}
        <TechnicalArsenal />

        {/* Section 03: Peer-Reviewed Publications */}
        <PublicationsSection />

        {/* Section 04 & 05: Experience & Education */}
        <ExperienceEducation />

        {/* Section Contact: System Direct Console & CLI Simulator */}
        <ContactSection />
      </main>

      {/* System Footer */}
      <Footer />

      {/* Candidate Dossier Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
}
