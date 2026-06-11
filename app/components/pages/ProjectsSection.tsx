import Image from "next/image";
import Link from "next/link";
import EmptyState from "../shared/EmptyState";
import { Slide } from "../../animation/Slide";
import ProjectList from "./ProjectList";
import { projects } from "../../data/portfolio";

export default function ProjectsSection() {
  return (
    <section id="projects" className="mt-32">
      <Slide delay={0.16}>
        <div className="mb-16">
          <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
            Projects
          </h2>
          <p className="max-w-2xl text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
            I&apos;ve worked on tons of little projects over the years but these are the ones that I&apos;m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas on how it can be improved.
          </p>
        </div>
      </Slide>

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
