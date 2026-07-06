export type PortfolioProfile = {
  fullName: string;
  headline: string;
  shortBio: string;
  location: string;
  email: string;
  resumeUrl: string;
  about: string[];
  usage: { name: string; logo: string; description: string }[];
  softSkills: { title: string; description: string }[];
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





export const profile: PortfolioProfile = {
  fullName: "Sahil Kewat",
  headline: "I'm Sahil Kewat. I live in India, where I build intelligent systems and scalable applications.",
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
    { name: "Python", description: "Programming language", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "C++", description: "Systems programming", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "JavaScript", description: "Programming language", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "SQL", description: "Database querying", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "HTML", description: "Web markup", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", description: "Web styling", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Bash/Shell", description: "Shell scripting", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
    { name: "Git", description: "Version control", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", description: "Version control", logo: "https://www.google.com/s2/favicons?domain=github.com&sz=64" },
    { name: "VS Code", description: "Code editor", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "Linux", description: "Operating system", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Jupyter Notebook", description: "Interactive notebooks", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
    { name: "Firebase", description: "Realtime Database", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "Firestore", description: "NoSQL cloud database", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "Cassandra DB", description: "Distributed database", logo: "/cassandra_logo.png" },
    { name: "SQL Databases", description: "Relational databases", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Spotify", description: "Music & Podcasts", logo: "https://www.google.com/s2/favicons?domain=spotify.com&sz=64" },
    { name: "ChatGPT", description: "AI Assistant", logo: "https://www.google.com/s2/favicons?domain=openai.com&sz=64" },
    { name: "Claude", description: "AI Assistant", logo: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=64" },
    { name: "Gemini", description: "AI Assistant", logo: "https://www.google.com/s2/favicons?domain=google.com&sz=64" },
    { name: "Microsoft Edge", description: "Browser", logo: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=64" },
    { name: "Antigravity", description: "AI Coding Assistant", logo: "https://www.google.com/s2/favicons?domain=deepmind.google&sz=64" },
    { name: "Docker", description: "Containerization", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "NumPy", description: "Numerical computing", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "Pandas", description: "Data manipulation", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "OpenCV", description: "Computer vision", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
    { name: "Supabase", description: "Backend as a Service", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
    { name: "Selenium", description: "Web testing", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" },
    { name: "React", description: "UI Library", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "PyCharm", description: "IDE", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg" },
    { name: "TensorFlow", description: "Machine learning", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "Express.js", description: "Web framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "Flutter", description: "Mobile development", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { name: "Flask", description: "Web framework", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
    { name: "Raspberry Pi", description: "Hardware", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
    { name: "PyTorch", description: "Machine learning", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  ],
  softSkills: [
    {
      title: "Systems Thinking",
      description: "I enjoy designing scalable and intelligent systems by breaking complex problems into manageable components, with a strong focus on reliability, performance, and real-world usability.",
    },
    {
      title: "Fast Learning & Adaptability",
      description: "I actively explore emerging technologies like machine learning, agentic AI, blockchain, and autonomous systems, and I quickly adapt to new tools and workflows when solving problems or building projects.",
    },
    {
      title: "Ability to Work Independently",
      description: "I am comfortable taking ownership of projects and delivering solutions with minimal supervision. I enjoy figuring things out, troubleshooting challenges, and maintaining consistency under tight deadlines.",
    },
    {
      title: "Collaboration & Leadership",
      description: "Through hackathons and team-based engineering projects, I’ve worked closely with developers, designers, and system teams to build practical solutions and coordinate development effectively.",
    },
  ],
};

export const jobs: PortfolioJob[] = [
  {
    id: "job-5",
    name: "Pitchmatter",
    jobTitle: "Software Engineer",
    url: "#",
    logo: "/pitchmatter_logo.png",
    description:
      "Responsible for developing and scaling full-stack applications, optimizing data workflows, and implementing interactive UI components using modern frontend and backend frameworks.",
    startDate: "2026-07-01",
  },
  {
    id: "job-4",
    name: "GaoTek Inc",
    jobTitle: "AI Engineer",
    url: "#",
    logo: "/gaotek_logo.png",
    description:
      "Responsible for AI engineering chores such as building a RAG pipeline and setting up continuous integration for it.",
    startDate: "2026-05-01",
    endDate: "2026-06-30",
  },
  {
    id: "job-1",
    name: "Tata via Forage",
    jobTitle: "GenAI Powered Data Analyst",
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
    logo: "cottonx",
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
    logo: "octopy",
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
    repository: "https://github.com/dhruvpal102005/EscroX",
    logo: "escrox",
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
  {
    id: "project-4",
    slug: "nyayasetu",
    name: "NyayaSetu",
    tagline: "The Whistleblower & Civic Shield Protocol",
    projectUrl: "",
    repository: "",
    logo: "nyayasetu",
    coverImage: "/projects/nyayasetu/ss1.png",
    description: [
      "NyayaSetu is a decentralized, end-to-end encrypted platform designed to protect whistleblowers, journalists, and civic informants when reporting corruption or human rights violations.",
      "By leveraging Blockchain immutability, Zero-Knowledge proofs, and AI-powered Forensic Analysis, it establishes a zero-trust environment where the identity of the reporter is cryptographically shielded.",
      "The system strips device metadata from evidence and uses Google Gemini 2.5 Flash to verify authenticity, ensuring that the justice system is protected from AI-generated manipulations.",
    ],
    techStack: [
      "Next.js 14",
      "Solidity",
      "TypeScript",
      "TailwindCSS",
      "Wagmi & Viem",
      "Web Crypto API",
      "Google Gemini AI",
      "IPFS (Pinata)",
      "Hardhat",
    ],
    screenshots: ["/projects/nyayasetu/ss1.png", "/projects/nyayasetu/ss2.png"],
  },
  {
    id: "project-5",
    slug: "bloodcall",
    name: "BloodCall",
    tagline: "Smart Blood Donation & Emergency Assistance Platform",
    projectUrl: "",
    repository: "https://github.com/Sahilkewat80085/BloodCall",
    logo: "bloodcall",
    coverImage: "/projects/bloodcall/ss1.png",
    description: [
      "Developed a real-time blood donation and emergency assistance platform that connects blood donors, hospitals, and blood banks through a centralized system. The platform helps users quickly find compatible blood donors, check blood availability, and send emergency donation requests during critical situations.",
      "The system was designed to improve coordination between donors and healthcare organizations while reducing the time required to arrange blood during emergencies. Features included donor registration, blood group filtering, hospital/blood bank connectivity, emergency request handling, and real-time database integration.",
      "Built using Android Studio with Firebase backend integration, the application focused on creating a scalable and user-friendly healthcare support solution with real-time data synchronization and mobile accessibility.",
    ],
    techStack: [
      "Java",
      "Android Studio",
      "Firebase",
      "Gradle",
      "Real-time Database",
      "Mobile App Development",
    ],
    screenshots: ["/projects/bloodcall/ss1.png", "/projects/bloodcall/ss2.png"],
  },
  {
    id: "project-6",
    slug: "orqestra",
    name: "Orqestra",
    tagline: "Multi-Agent LLM Orchestration Platform",
    projectUrl: "",
    repository: "https://github.com/Sahilkewat80085/Orqestra",
    logo: "orqestra",
    coverImage: "/projects/orqestra/ss1.png",
    description: [
      "Built Orqestra, a production-grade multi-agent LLM orchestration platform using FastAPI, LangGraph, PostgreSQL, and Redis. Implemented dynamic agent routing, multi-hop RAG, critique-based validation, structured execution tracing, real-time SSE streaming, and context budget management through a typed shared-context architecture.",
      "Developed a custom evaluation pipeline with adversarial testing, multi-dimensional scoring, and a human-in-the-loop self-improving prompt optimization system. Containerized the infrastructure using Docker Compose with asynchronous workers and reproducible execution logging.",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "LangGraph",
      "LangChain",
      "PostgreSQL",
      "Redis",
      "ChromaDB",
      "SQLAlchemy",
      "Pydantic",
      "AsyncIO",
      "Docker",
      "Docker Compose",
      "Server-Sent Events (SSE)",
      "Structlog",
      "REST APIs",
      "RAG",
      "Multi-Agent Systems",
    ],
    screenshots: ["/projects/orqestra/ss1.png", "/projects/orqestra/ss2.png"],
  },
];




