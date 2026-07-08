import Image from "next/image";
import Link from "next/link";
import EmptyState from "../shared/EmptyState";
import { Slide } from "../../animation/Slide";
import PageHeading from "../shared/PageHeading";
import ProjectList from "./ProjectList";
import { projects } from "../../data/portfolio";

export default function ProjectsSection() {
  return (
    <section id="projects" className="max-w-7xl mx-auto md:px-16 px-6 lg:pt-32 pt-20 lg:pb-16 pb-10">
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
    </section>
  );
}
