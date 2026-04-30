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

export type PortfolioPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
  author: {
    name: string;
    photo: string;
    twitterUrl: string;
  };
  body: string[];
};

export type PortfolioHero = {
  id: string;
  name: string;
  url: string;
  met: boolean;
};

export const profile: PortfolioProfile = {
  fullName: "Your Name",
  headline: "Developer, builder, and problem solver.",
  shortBio:
    "This portfolio now runs without Sanity. We can replace this with your real intro next.",
  location: "your city",
  email: "you@example.com",
  resumeUrl: "#",
  about: [
    "I build clean, useful digital products and enjoy turning ideas into polished web experiences.",
    "This template has been converted into a regular Next.js portfolio so your content now lives directly in the project.",
    "Next, we can replace every placeholder here with your real background, achievements, and projects.",
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
    name: "Your Company",
    jobTitle: "Your Role",
    url: "https://example.com",
    logo: "/logo.png",
    description:
      "Add your real work experience here. We can replace this with your internship, freelance, or full-time role.",
    startDate: "2024-01-01",
  },
];

export const projects: PortfolioProject[] = [
  {
    id: "project-1",
    slug: "portfolio-template",
    name: "Portfolio Template",
    tagline: "A personalized developer portfolio built from a cloned template.",
    projectUrl: "https://example.com",
    repository: "https://github.com/yourname/portfolio",
    logo: "/logo.svg",
    coverImage: "/project.png",
    description: [
      "This project is the starting point for your personal portfolio.",
      "We removed the CMS dependency and made the content local so updates are simpler and faster.",
      "Next, we can replace the copy, links, visuals, and metadata with your own brand.",
    ],
  },
];

export const posts: PortfolioPost[] = [
  {
    id: "post-1",
    slug: "welcome",
    title: "Welcome to My Portfolio",
    description: "A quick note about rebuilding this template into something personal.",
    date: "2026-04-30",
    coverImage: "/site.png",
    tags: ["portfolio", "nextjs", "personal-brand"],
    featured: true,
    author: {
      name: "Your Name",
      photo: "/logo.png",
      twitterUrl: "https://twitter.com/yourhandle",
    },
    body: [
      "This blog section is now powered by local project data instead of Sanity.",
      "That means we can customize everything directly in the codebase without fighting the Studio setup first.",
      "Once the structure feels right, we can add your real writing or remove the blog entirely if you do not want one.",
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
