import { BiEnvelope, BiLogoGithub, BiLogoLinkedinSquare } from "react-icons/bi";
import { FaSquareXTwitter } from "react-icons/fa6";

export const socialLinks = [
  {
    id: 1,
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: BiLogoGithub,
    status: "social",
  },
  {
    id: 2,
    name: "X",
    url: "https://twitter.com/yourhandle",
    icon: FaSquareXTwitter,
    status: "social",
  },
  {
    id: 3,
    name: "Linkedin",
    url: "https://linkedin.com/in/yourprofile",
    icon: BiLogoLinkedinSquare,
    status: "social",
  },
  {
    id: 4,
    name: "Email",
    url: "mailto:you@example.com",
    icon: BiEnvelope,
    status: "social",
  },
  {
    id: 5,
    name: "Medium",
    url: "https://medium.com/@yourhandle",
    icon: BiLogoGithub,
    status: "publication",
  },
];
