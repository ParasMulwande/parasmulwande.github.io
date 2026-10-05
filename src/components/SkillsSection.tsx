import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Section } from './ui/Section';
import { SkillConstellation } from './viz/SkillConstellation';

export const SkillsSection: React.FC = () => (
  <Section
    id="skills"
    eyebrow="Expertise"
    title="The stack, and how it connects."
    lede="Every node below is a technology already used in the projects and research on this site. Relationships matter more here than scores."
    aside={
      <span className="stat-label">
        {SKILL_CATEGORIES.length} disciplines ·{' '}
        {SKILL_CATEGORIES.reduce((n, c) => n + c.skills.length, 0)} technologies
      </span>
    }
  >
    <SkillConstellation />
  </Section>
);
