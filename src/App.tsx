/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TelemetryStatusBar } from './components/TelemetryStatusBar';
import { HeroSection } from './components/HeroSection';
import { TechTicker } from './components/TechTicker';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { DataLabShowcase } from './components/DataLabShowcase';
import { ExperienceSection } from './components/ExperienceSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ServicesSection } from './components/ServicesSection';
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
    return <BootIntro onComplete={handleBootComplete} />;
  }

  return (
    <div className="relative flex min-h-screen w-full max-w-none flex-col bg-bg font-body text-ink">
      {/* Global background atmosphere lives in index.css (body::before / ::after) */}

      <Navbar onOpenProfile={() => setProfileModalOpen(true)} />

      <div className="relative z-10">
        <TelemetryStatusBar />
      </div>

      <main className="relative z-10 flex-grow">
        <HeroSection />
        <TechTicker />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <DataLabShowcase />
        <ExperienceSection />
        <AchievementsSection />
        <ServicesSection />
        <ContactSection />
      </main>

      <Footer />

      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
}