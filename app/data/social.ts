import {
  BiEnvelope,
  BiLogoGithub,
  BiLogoLinkedinSquare,
  BiFileBlank,
} from "react-icons/bi";
import { FaSquareXTwitter } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi2";

export const socialLinks = [
  {
    id: 1,
    name: "GitHub",
    url: "https://github.com/Sahilkewat80085",
    icon: BiLogoGithub,
    status: "social",
  },
  {
    id: 2,
    name: "X",
    url: "https://x.com/sahil_kewat22",
    icon: FaSquareXTwitter,
    status: "social",
  },
  {
    id: 3,
    name: "Linkedin",
    url: "https://www.linkedin.com/in/sahil-kewat-b72534267",
    icon: BiLogoLinkedinSquare,
    status: "social",
  },
  {
    id: 4,
    name: "Email",
    url: "mailto:kkewat315@gmail.com",
    icon: BiEnvelope,
    status: "social",
  },
  {
    id: 5,
    name: "Resume",
    url: "/sahil_kewat_resume.pdf",
    icon: HiOutlineDocumentText,
    status: "social",
  },
  {
    id: 6,
    name: "Medium",
    url: "https://medium.com/@yourhandle",
    icon: BiLogoGithub,
    status: "publication",
  },
];
