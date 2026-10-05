import React from 'react';
import { BarChart3, Cpu, Brain, Code2, LineChart, Layers } from 'lucide-react';

const SERVICES = [
  {
    icon: BarChart3,
    title: 'Data Analysis',
    body: 'Exploratory analysis, distribution checks, and feature engineering that make the shape of the data explicit before a single model is fitted.',
  },
  {
    icon: Cpu,
    title: 'Machine Learning',
    body: 'Classification and regression pipelines with cross-validation, honest baselines, and evaluation metrics reported per model.',
  },
  {
    icon: Brain,
    title: 'AI Solutions',
    body: 'Applied deep learning for image and video problems — CNN architectures, transfer learning, and multi-modal pipelines.',
  },
  {
    icon: Code2,
    title: 'Web & Data Applications',
    body: 'Flask and FastAPI services that put a trained model behind a usable interface, with the data layer designed alongside it.',
  },
  {
    icon: LineChart,
    title: 'Data Visualization',
    body: 'Charts and dashboards built to answer a question, not to decorate a slide — readable at a glance and honest about uncertainty.',
  },
  {
    icon: Layers,
    title: 'Freelance Development',
    body: 'End-to-end delivery for clients who need a working system rather than a prototype, from scoping through handover.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="section-y border-b border-white/[0.06]">
      <div className="shell">
        <p className="eyebrow" data-reveal>
          Capabilities
        </p>
        <h2 className="t-h1 mt-4 max-w-2xl" data-reveal data-reveal-delay="60">
          What I can do for you.
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="card-lab"
                data-reveal
                data-reveal-delay={i * 70}
              >
                <Icon size={20} className="text-accent" />
                <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};