# Paras Mulwande — ML Engineer & Creative Developer Portfolio

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-00A8FF?style=for-the-badge&logo=githubpages&logoColor=black)](https://parasmulwande.github.io/)
[![React 19](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS v4](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**Machine Learning Engineer & Data Scientist** building intelligent systems, neural computer-vision pipelines, and production-grade AI applications.

[🌐 View Live Website](https://parasmulwande.github.io/) • [📂 Repository](https://github.com/ParasMulwande/parasmulwande.github.io) • [📫 Contact](mailto:paras.mulwande@gmail.com)

</div>

---

## ⚡ Overview

A dark, minimal, futuristic portfolio built around a **token-driven design system**. The interface pairs Apple-level cleanliness with a technical aesthetic expressed through typography, layout, subtle gradients, grids, and restrained motion — deliberately avoiding particle effects, neon overload, and generic glassmorphism.

### 🌟 Key Highlights

- **Live Telemetry Bar:** Real-time IST clock, location, and availability status.
- **Interactive Project Deep Dives:** Machine-learning systems with live model telemetry, animated waveforms, and adaptive-reframe visualisations.
- **Technical Arsenal:** Filterable capability matrix across ML, computer vision, data science, web systems, and databases.
- **Publications Registry:** Peer-reviewed research with DOI links and citation copying.
- **Functional CLI Simulator:** A working in-page terminal with real commands (`help`, `skills`, `projects`, `publications`, `hire`, `clear`).

---

## 🎨 Design System

All visual language is defined once as tokens in [`src/index.css`](src/index.css) and consumed by every section. Sections are built **from** the system, never with one-off values.

### Color

| Role | Token | Value |
|---|---|---|
| Background | `--color-bg` | `#05070B` |
| Background alt | `--color-bg-2` | `#0A0F17` |
| Surface | `--color-surface` | `#101722` |
| Surface raised | `--color-surface-raised` | `#141C28` |
| Text primary | `--color-ink` | `#F5F7FA` |
| Text secondary | `--color-ink-secondary` | `#A7B0BE` |
| Text muted | `--color-ink-muted` | `#697386` |
| Accent | `--color-accent` | `#00A8FF` |
| Accent strong | `--color-accent-strong` | `#0066FF` |
| Border | `--color-line` | `rgba(255,255,255,0.06)` |

> **Convention:** colour tokens use **semantic names, never bare numeric suffixes**. Tailwind v4 parses a trailing number on a `--color-*` token as a shade modifier and will silently drop the variable. Use `--color-ink-secondary`, not `--color-ink-2`.

### Typography

- **Display / headings:** Space Grotesk
- **Body:** Inter
- **Mono:** JetBrains Mono

Fluid `clamp()` scale via `.t-display`, `.t-h1`, `.t-h2`, `.t-h3`, `.t-lead`, `.t-body`, `.t-muted`, `.t-eyebrow`. Headings stay bold but controlled — the display size peaks at `4.25rem` rather than filling the viewport.

### Spacing & Layout

| Token | Value | Use |
|---|---|---|
| `--spacing-section` | `72px` | Desktop section padding |
| `--spacing-section-sm` | `48px` | Mobile section padding |
| `--spacing-gutter` / `-md` | `20px` / `32px` | Container side padding |
| `--container-shell` | `1240px` | Max content width |

Primitives: `.shell` (centred container), `.section-y` (responsive section padding). Sections are **content-driven** — only the hero may use viewport-based sizing. No section uses `min-height: 100vh`.

### Radius, Shadow & Motion

- Radius: `--radius-chip` `8px` · `--radius-card` `16px` · `--radius-panel` `22px` · `--radius-ctl` `11px`
- Elevation: `--shadow-card`, `--shadow-card-hover`, `--shadow-glow`, `--shadow-ctl`
- Motion: `--duration-fast` `180ms` · `--duration-base` `280ms` · `--duration-slow` `400ms`, eased with `--ease-out-expo`

Components: `.card` / `.card-hover`, `.panel`, `.btn-primary` / `.btn-secondary` / `.btn-ghost`, `.anim-fade-up` / `.anim-fade-in` / `.anim-scale-in`.

> **Convention:** Tailwind v4 exposes `--duration-*` as CSS variables but generates **no** matching `duration-<name>` utility. Use `.dur-fast`, `.dur-base`, `.dur-slow`.

### Background

Composed in CSS as two fixed layers — no canvas, no particles:

- `body::before` — soft electric-blue radial gradients for atmospheric depth
- `body::after` — a low-contrast grid plus an inline SVG grain texture

### Scroll Reveal

[`src/lib/reveal.ts`](src/lib/reveal.ts) installs a single shared `IntersectionObserver`. Opt in per element:

```html
<div data-reveal data-reveal-delay="80">…</div>
```

Fully disabled under `prefers-reduced-motion`.

---

## 🔬 Featured Projects & Research

### 1. [Agri-Weather — Smart Crop Management Platform](https://doi.org/10.48175/IJARSCT-25960)

- **Role:** Lead ML Architect & Developer
- **Highlights:** Consolidated 4 ML/DL models into a unified decision dashboard. Developed bespoke CNN models achieving **96.4% test accuracy** for diagnosing plant pathologies from leaf imagery, coupled with Random Forest and XGBoost for dynamic crop recommendation with real-time OpenWeather telemetry.
- **Stack:** `Python`, `Flask`, `PyTorch / CNN`, `Random Forest`, `XGBoost`, `MongoDB`, `OpenWeather API`
- **Publication:** *IJARSCT (Vol. 5, Issue 12, April 2025)* • [DOI: 10.48175/IJARSCT-25960](https://doi.org/10.48175/IJARSCT-25960)

### 2. ValorCut AI — Autonomous Gameplay Clipping Engine

- **Role:** AI & Vision Pipeline Engineer
- **Highlights:** Multi-modal computer-vision and audio-intelligence pipeline that ingests long-form VALORANT footage, detects clutch events via spatial-temporal visual cues, and runs Whisper ASR to generate synced subtitles with dynamic 16:9 → 9:16 vertical reframing.
- **Stack:** `Python`, `OpenCV`, `Whisper ASR`, `FFmpeg`, `Dynamic Salience Framing`

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend Core** | React 19, TypeScript 7, Vite 8 |
| **Styling** | Tailwind CSS v4 (`@theme` tokens), custom CSS layer |
| **Icons** | Lucide React |
| **Deployment** | GitHub Pages via GitHub Actions |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Git](https://git-scm.com/)

### Install & Run

```bash
git clone https://github.com/ParasMulwande/parasmulwande.github.io.git
cd parasmulwande.github.io
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Type-check with `tsc --noEmit` |

---

## 🌐 Deployment

Pushing to `main` automatically builds and publishes to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Vite `base` is set to `/` for the root Pages site.

Live URL: **https://parasmulwande.github.io/**

---

## 📬 Contact & Connect

- **Name:** Paras Mulwande
- **Email:** [paras.mulwande@gmail.com](mailto:paras.mulwande@gmail.com)
- **LinkedIn:** [linkedin.com/in/paras-mulwande](https://linkedin.com/in/paras-mulwande)
- **GitHub:** [@ParasMulwande](https://github.com/ParasMulwande)
- **Location:** Nagpur, MH, India

---

<div align="center">
  <sub>Designed & Developed by Paras Mulwande • 2026</sub>
</div>