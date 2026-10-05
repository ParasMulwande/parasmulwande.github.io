import React from 'react';
import { Section } from './ui/Section';
import { Card } from './ui/Card';
import { BarChart3, Cpu, Brain, Code2, LineChart, Layers } from 'lucide-react';

const SERVICES = [
  { icon: BarChart3, title: 'Data Analysis', body: 'Exploratory analysis, distribution checks and feature engineering that make the shape of the data explicit before a model is fitted.' },
  { icon: Cpu, title: 'Machine Learning', body: 'Classification and regression pipelines with cross-validation, honest baselines, and metrics reported per model.' },
  { icon: Brain, title: 'AI Solutions', body: 'Applied deep learning for image and video problems — CNN architectures, transfer learning, multi-modal pipelines.' },
  { icon: Code2, title: 'Intelligent Web Apps', body: 'Flask and FastAPI services that put a trained model behind an interface, with the data layer designed alongside it.' },
  { icon: LineChart, title: 'Data Visualization', body: 'Charts and dashboards built to answer a question, readable at a glance and honest about uncertainty.' },
  { icon: Layers, title: 'Freelance Development', body: 'End-to-end delivery for clients who need a working system rather than a prototype, from scoping through handover.' },
];

export const ServicesSection: React.FC = () => (
  <Section
    id="services"
    eyebrow="Capabilities"
    title="What I can build."
    lede="Six things I do repeatedly, and would be comfortable owning end to end."
    aside={<span className="stat-label">{SERVICES.length} areas</span>}
  >
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((s, i) => {
        const Icon = s.icon;
        return (
          <Card key={s.title} reactive sweep delay={i * 60} className="h-full">
            <Icon size={20} className="text-accent transition-transform duration-300 group-hover:scale-110" />
            <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-ink">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{s.body}</p>
          </Card>
        );
      })}
    </div>
  </Section>
);
