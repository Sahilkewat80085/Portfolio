export type PortfolioProfile = {
  fullName: string;
  headline: string;
  shortBio: string;
  location: string;
  email: string;
  resumeUrl: string;
  about: string[];
  usage: string[];
};

export type PortfolioJob = {
  id: string;
  name: string;
  jobTitle: string;
  url: string;
  logo: string;
  description: string;
  startDate: string;
  endDate?: string;
};

export type PortfolioProject = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  projectUrl: string;
  repository: string;
  logo: string;
  coverImage: string;
  description: string[];
  techStack: string[];
  screenshots: string[];
};



export type PortfolioHero = {
  id: string;
  name: string;
  url: string;
  met: boolean;
};

export const profile: PortfolioProfile = {
  fullName: "Sahil Kewat",
  headline: "I'm Sahil Kewat. I live in India, where I build useful things.",
  shortBio:
    "I’m Sahil Kewat, a software developer passionate about building scalable applications and intelligent systems. I enjoy turning ideas into working products and learning something new every time the code doesn’t cooperate.",
  location: "India",
  email: "kkewat315@gmail.com",
  resumeUrl: "/sahil_kewat_resume.pdf",
  about: [
    "I am a self-driven software developer specializing in full-stack development, machine learning, and intelligent systems, currently pursuing a Bachelor’s degree in Information Technology. I focus on building scalable applications and data-driven systems using Python, JavaScript, and modern ML frameworks.",
    "I believe in continuous learning and actively challenge myself through hands-on projects, including ML pipelines, NLP systems, and agentic AI solutions.",
    "Beyond learning, I enjoy building impactful projects that solve real-world problems and push the boundaries of practical AI and system design.",
  ],
  usage: [
    "Next.js and React for frontend work",
    "TypeScript for safer app development",
    "Tailwind CSS for styling",
    "Git and GitHub for version control",
    "Figma, VS Code, and browser devtools in the daily workflow",
  ],
};

export const jobs: PortfolioJob[] = [
  {
    id: "job-1",
    name: "Tata via Forage",
    jobTitle: "GenAI Powered Data Analytics",
    url: "https://www.theforage.com/",
    logo: "/tata_logo.jpg",
    description:
      "Completed a virtual internship focusing on leveraging Generative AI for data analytics and visualization to drive business insights.",
    startDate: "2026-04-01",
    endDate: "2026-05-31",
  },
  {
    id: "job-2",
    name: "Team Abhyuday Racing",
    jobTitle: "Team Manager",
    url: "#",
    logo: "/Abhyuday_logo.jpeg",
    description:
      "Led the team through aBAJA 2025, overseeing Integration of all sub systems, team coordination, and strategic planning.",
    startDate: "2025-07-01",
    endDate: "2025-10-31",
  },
  {
    id: "job-3",
    name: "Team Abhyuday Racing",
    jobTitle: "Software Integration Head",
    url: "#",
    logo: "/Abhyuday_logo.jpeg",
    description:
      "Managed the integration of software systems for the autonomous vehicle, ensuring seamless communication between sensors and control units.",
    startDate: "2025-01-01",
    endDate: "2025-07-31",
  },
];

export const projects: PortfolioProject[] = [
  {
    id: "project-1",
    slug: "cottonx",
    name: "CottonX",
    tagline: "Autonomous Agent Infrastructure",
    projectUrl: "",
    repository: "https://github.com/Reality373/CottonX",
    logo: "/logo.png",
    coverImage: "/projects/cottonx/ss1.png",
    description: [
      "CottonX is a robust infrastructure for deploying and managing autonomous AI agents capable of executing secure, reliable onchain operations based on user-defined intents.",
      "It combines natural language processing with blockchain automation to create intelligent agents that can trade, transfer assets, rebalance portfolios, and participate in governance.",
    ],
    techStack: [
      "Node.js",
      "TypeScript",
      "Next.js",
      "Express.js",
      "HeLa Testnet",
      "Coinbase CDP",
    ],
    screenshots: ["/projects/cottonx/ss1.png", "/projects/cottonx/ss2.png"],
  },
  {
    id: "project-2",
    slug: "octopy",
    name: "OctoPy",
    tagline: "A Modular Python Library for Machine Learning Automation",
    projectUrl: "",
    repository: "https://github.com/Sahilkewat80085/OctoPy",
    logo: "/logo.png",
    coverImage: "/projects/octopy/ss1.png",
    description: [
      "OctoPy is a modular machine learning support library that automates data preprocessing, feature selection, model evaluation, and report generation.",
      "It simplifies the ML workflow by providing a collection of plug-and-play Python modules for developers, data scientists, and researchers.",
      "The library includes specialized modules for pipeline creation, data cleaning, feature selection, automated EDA, and evaluation reporting.",
    ],
    techStack: [
      "Python",
      "Scikit-Learn",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Pickle",
    ],
    screenshots: ["/projects/octopy/ss1.png", "/projects/octopy/ss2.png"],
  },
  {
    id: "project-3",
    slug: "escrox",
    name: "EscroX",
    tagline: "Autonomous Milestone-Based Escrow Engine",
    projectUrl: "",
    repository: "https://github.com/Sahilkewat80085/EscroX",
    logo: "/logo.png",
    coverImage: "/projects/escrox/ss1.png",
    description: [
      "EscroX is a next-generation escrow platform designed for the global digital economy, securing cross-border freelance payments using programmable finance.",
      "It ensures that funds are only released when milestone-verified work is submitted and approved, combining Web3 security with Web2 speed.",
      "The platform features an AI Contract Drafter using Google Gemini, multi-currency support, and a real-time audit trail for dispute resolution.",
    ],
    techStack: [
      "Next.js",
      "Solidity",
      "Firebase",
      "Chainlink",
      "Wagmi",
      "Google Gemini AI",
    ],
    screenshots: ["/projects/escrox/ss1.png", "/projects/escrox/ss2.png"],
  },
];



export const heroes: PortfolioHero[] = [
  {
    id: "hero-1",
    name: "Ada Lovelace",
    url: "https://en.wikipedia.org/wiki/Ada_Lovelace",
    met: false,
  },
  {
    id: "hero-2",
    name: "Guido van Rossum",
    url: "https://en.wikipedia.org/wiki/Guido_van_Rossum",
    met: false,
  },
];
