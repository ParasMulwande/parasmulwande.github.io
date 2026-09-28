export interface Project {
  id: string;
  tag: string;
  badge: string;
  metricLabel: string;
  metricValue: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: {
    title: string;
    description: string;
    icon?: string;
  }[];
  tags: string[];
  paperLink?: string;
  doi?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  code: string;
  iconName: string;
  skills: string[];
  description: string;
}

export interface Publication {
  id: string;
  type: string;
  venue: string;
  date: string;
  title: string;
  citation: string;
  description: string;
  doi?: string;
  statusBadge?: string;
}

export interface EducationItem {
  status: string;
  level: string;
  degree: string;
  institution: string;
  affiliation: string;
  focus: string;
}

export interface ExperienceItem {
  role: string;
  period: string;
  company: string;
  summary: string;
  bullets: string[];
  tags: string[];
}
