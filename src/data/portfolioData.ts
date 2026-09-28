import { Project, SkillCategory, Publication, EducationItem, ExperienceItem } from '../types';

export const PERSONAL_INFO = {
  name: "PARAS // MULWANDE",
  firstName: "Paras",
  lastName: "Mulwande",
  handle: "PM / 01",
  roleLabel: "// SYSTEM ARCHITECT & ML SPECIALIST",
  heroTagline: "Machine Learning Engineer & Data Scientist crafting intelligent systems, neural computer vision pipelines, and production-grade full-stack AI applications.",
  bio: "Data Science professional with hands-on experience engineering end-to-end ML & DL ecosystems using Python and SQL. Specialized in precision predictive modeling, real-time diagnostic pipelines, and deploying robust user-facing web intelligence, supported by peer-reviewed published research in applied artificial intelligence.",
  location: "Nagpur, MH, India",
  timezone: "IST GMT+5:30",
  availabilityStatus: "AVAILABLE FOR ROLES",
  availabilityBadge: "AVAILABLE FOR Q2/Q3 ROLES & COLLABS",
  email: "paras.mulwande@gmail.com",
  phone: "+91 8007752979",
  github: "https://github.com/parasmulwande-sketch",
  linkedin: "https://linkedin.com/in/paras-mulwande",
  systemVersion: "SYS.ONLINE // 2025.V4",
  telemetry: {
    onlinePercent: "99.8%",
    modelsDeployed: "2+",
    modelsSub: "Production ML/DL Suites",
    researchPapers: "2",
    researchSub: "IJARSCT & ETRCEE 2025",
    coreDisciplines: "CV & DL",
    coreDisciplinesSub: "Deep Visual Architectures",
    engineStack: "Flask+PyTorch",
    engineStackSub: "MongoDB & Scikit-learn"
  }
};

export const TICKER_ITEMS = [
  "PREDICTIVE MODELING & REGRESSORS",
  "MACHINE LEARNING",
  "COMPUTER VISION",
  "DEEP LEARNING",
  "CONVOLUTIONAL NEURAL NETWORKS",
  "HYBRID ENSEMBLE REGRESSORS",
  "WHISPER ASR AUDIO PIPELINES",
  "REAL-TIME METEOROLOGICAL INFERENCE",
  "OPENCV MULTI-MODAL VISION"
];

export const PROJECTS: Project[] = [
  {
    id: "agri-weather",
    tag: "[01 // CASE STUDY]",
    badge: "COMPLETED & PUBLISHED (2025)",
    metricLabel: "METRIC",
    metricValue: "96.4% CLASSIFICATION ACCURACY",
    title: "AGRI-WEATHER — Smart Crop Management Platform",
    subtitle: "End-to-End Decision Support with Real-Time Meteorological Inference",
    description: "Engineered a full-stack agricultural intelligence ecosystem consolidating 4 distinct ML/DL models into a unified decision dashboard. Developed bespoke CNN models achieving 96.4% test accuracy for diagnosing plant pathologies from leaf imagery, coupled with Random Forest and XGBoost algorithms for dynamic crop matching and precision fertilizer allocation using live meteorological data streams.",
    highlights: [
      {
        title: "CNN Disease Diagnosis",
        description: "Automated leaf lesion identification with high-confidence outputs."
      },
      {
        title: "OpenWeather Pipeline",
        description: "Live telemetry assimilation feeding predictive harvest matrices."
      }
    ],
    tags: ["Python", "Flask", "MongoDB", "CNN", "Random Forest", "XGBoost", "OpenWeather API"],
    paperLink: "https://doi.org/10.48175/IJARSCT-25960",
    doi: "10.48175/IJARSCT-25960"
  },
  {
    id: "valorcut-ai",
    tag: "[02 // INNOVATION LAB]",
    badge: "IN ACTIVE DEVELOPMENT (2026 ROADMAP)",
    metricLabel: "FOCUS",
    metricValue: "COMPUTER VISION & ASR MULTI-MODAL",
    title: "VALORCUT AI — Autonomous Gameplay Clipping Engine",
    subtitle: "Multi-Modal Event Detection, Whisper Transcription & Vertical Reframing",
    description: "Developing a multi-modal computer vision and audio intelligence pipeline designed to ingest long-form VALORANT video streams, classify clutch engagement events via spatial-temporal visual cues, and run Whisper ASR to generate synced subtitles. The engine computes salient action focus coordinates to dynamically transform 16:9 gameplay footage into viral-ready 9:16 vertical shorts.",
    highlights: [
      {
        title: "9:16 Adaptive Reframe",
        description: "Dynamic bounding boxes tracking crosshair and kill-feed coordinates."
      },
      {
        title: "Whisper ASR Speech Sync",
        description: "Sub-millisecond audio cue alignment and multilingual translation."
      }
    ],
    tags: ["Python", "Whisper ASR", "OpenCV", "Video Processing", "Dynamic Salience Framing", "FFmpeg Engine"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    code: "[01/06]",
    iconName: "Code2",
    skills: ["Python 3.x", "SQL (Advanced)", "Object-Oriented Design", "Scripting & Automation"],
    description: "Writing scalable, reproducible algorithmic codebases with rigorous PEP8 standards and optimized relational database queries."
  },
  {
    id: "data-science",
    title: "Data Science & EDA",
    code: "[02/06]",
    iconName: "BarChart3",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Statistical Inference"],
    description: "Deep exploratory data investigation, distribution sanitization, feature engineering, and high-impact visual telemetry creation."
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    code: "[03/06]",
    iconName: "Cpu",
    skills: ["Scikit-learn", "Random Forest", "XGBoost", "Classification", "Regression"],
    description: "Cross-validated predictive model pipelines, hyperparameter grid search tuning, ensemble trees, and automated inference."
  },
  {
    id: "deep-learning",
    title: "Deep Learning & CV",
    code: "[04/06]",
    iconName: "Eye",
    skills: ["PyTorch", "TensorFlow / Keras", "CNN", "OpenCV", "Whisper ASR"],
    description: "Convolutional neural network training for image classification, transfer learning architectures, and audio-visual pipeline integration."
  },
  {
    id: "web-systems",
    title: "Web & Systems",
    code: "[05/06]",
    iconName: "Network",
    skills: ["Flask", "REST APIs", "HTML5 / CSS3", "JavaScript", "JSON Protocols"],
    description: "Constructing lightweight, latency-optimized web application backends serving real-time machine learning predictions."
  },
  {
    id: "databases-tooling",
    title: "Databases & Tooling",
    code: "[06/06]",
    iconName: "Boxes",
    skills: ["MongoDB", "Git / GitHub", "Jupyter Notebook", "VS Code", "Linux Environments"],
    description: "Document store database design, robust version control workflows, automated notebook experiments, and developer toolchains."
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "ijarsct-2025",
    type: "INTERNATIONAL JOURNAL",
    venue: "IJARSCT • VOL. 5, ISSUE 12",
    date: "April 2025",
    title: "Agri-Weather — Smart Crop Management Platform Using Deep CNN and Hybrid Regressors",
    citation: "International Journal of Advanced Research in Science, Communication and Technology • April 2025",
    description: "Comprehensive documentation of the full-stack multi-model agricultural decision support platform. Outlines the dataset curation pipeline, CNN transfer learning methodology for botanical disease identification with 96.4% test accuracy, and the integration of live weather telemetry via OpenWeather REST endpoints.",
    doi: "10.48175/IJARSCT-25960"
  },
  {
    id: "etrcee-2025",
    type: "INTERNATIONAL CONFERENCE",
    venue: "ETRCEE-2025",
    date: "June 2025",
    title: "Agri-Weather — Architectural Implementation of Multi-Agent Machine Learning in Modern Agronomy",
    citation: "International Conference on Emerging Trends and Research in Computer & Electronics Exigencies • June 2025",
    description: "Presents the deployment architecture, telemetry benchmarks, and latency profiles of coupling MongoDB persistent stores with Flask-served Scikit-learn regressors for localized farming communities.",
    statusBadge: "PROCEEDINGS STATUS: ACCEPTED // PRESENTED"
  }
];

export const EXPERIENCE: ExperienceItem = {
  role: "Freelance Graphic Designer & Design Team Lead",
  period: "2022 — PRESENT",
  company: "Independent Practice & Digital Studio",
  summary: "Directing visual communication systems, brand identity execution, and digital interface design while coordinating a multidisciplinary team of designers.",
  bullets: [
    "Led a distributed team of creative designers, assigning weekly client sprints, establishing visual QA benchmarks, and orchestrating client deliveries.",
    "Managed complete client lifecycles from discovery and scoping to iteration and asset handoff across brand collateral, social platforms, and interactive media.",
    "Engineered polished digital product graphics, mobile application mockup UI, and dynamic video reels using Photoshop, Illustrator, and Canva."
  ],
  tags: ["Team Leadership", "UI/UX Direction", "Photoshop", "Illustrator", "Creative Direction"]
};

export const EDUCATION: EducationItem[] = [
  {
    status: "[EXPECTED 2026]",
    level: "POSTGRADUATE DEGREE",
    degree: "Master of Computer Applications (MCA)",
    institution: "K. D. K. College of Engineering, Nagpur",
    affiliation: "Affiliated with Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)",
    focus: "Focus: Advanced Machine Learning, Algorithmic Analysis, Distributed Data Stores"
  },
  {
    status: "[CONFERRED 2022]",
    level: "UNDERGRADUATE DEGREE",
    degree: "Bachelor of Science in Information Technology (B.Sc. IT)",
    institution: "Prerna College of Commerce, Nagpur",
    affiliation: "Affiliated with Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)",
    focus: "Foundations: Database Management Systems, C++, Python, Statistics & Web Systems"
  }
];
