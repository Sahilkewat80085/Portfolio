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
};



export type PortfolioHero = {
  id: string;
  name: string;
  url: string;
  met: boolean;
};

export const profile: PortfolioProfile = {
  fullName: "Sahil Kewat",
  headline: "I'm Sahil Kewat. I live in India, where I build useful things..",
  shortBio:
    "I’m Sahil Kewat, a software developer passionate about building scalable applications and intelligent systems. I enjoy turning ideas into working products—and learning something new every time the code doesn’t cooperate.",
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
    slug: "portfolio-template",
    name: "Portfolio Template",
    tagline: "A personalized developer portfolio built from a cloned template.",
    projectUrl: "https://example.com",
    repository: "https://github.com/Sahilkewat80085/portfolio",
    logo: "/logo.png",
    coverImage: "/project.png",
    description: [
      "This project is the starting point for your personal portfolio.",
      "We removed the CMS dependency and made the content local so updates are simpler and faster.",
      "Next, we can replace the copy, links, visuals, and metadata with your own brand.",
    ],
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
