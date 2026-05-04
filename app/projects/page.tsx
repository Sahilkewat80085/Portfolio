import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import EmptyState from "../components/shared/EmptyState";
import { Slide } from "../animation/Slide";
import PageHeading from "../components/shared/PageHeading";
import ProjectList from "../components/pages/ProjectList";
import { projects } from "../data/portfolio";

export const metadata: Metadata = {
  title: "Projects | Sahil Kewat",
  metadataBase: new URL("https://sahilkewat.dev/projects"),
  description: "Explore projects built by Sahil Kewat",
  openGraph: {
    title: "Projects | Sahil Kewat",
    url: "https://sahilkewat.dev/projects",
    description: "Explore projects built by Sahil Kewat",
    images: "/logo.png",
  },
};

export default async function Project() {
  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        title="Projects"
        description="I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas on how it can be improved."
      />

      <Slide delay={0.1}>
        {projects.length > 0 ? (
          <ProjectList projects={projects} />
        ) : (
          <EmptyState value="Projects" />
        )}
      </Slide>
    </main>
  );
}
