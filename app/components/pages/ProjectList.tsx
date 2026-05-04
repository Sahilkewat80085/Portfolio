"use client";

import { useState } from "react";
import Image from "next/image";
import { Slide } from "../../animation/Slide";
import { PortfolioProject } from "@/app/data/portfolio";
import { BiLinkExternal, BiLogoGithub, BiX } from "react-icons/bi";

type Props = {
  projects: PortfolioProject[];
};

export default function ProjectList({ projects }: Props) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(
    null
  );

  return (
    <>
      <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="flex flex-col gap-y-4 dark:bg-primary-bg bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 p-4 rounded-lg cursor-pointer group"
          >
            <div className="flex items-center gap-x-4">
              {project.logo ? (
                <Image
                  src={project.logo}
                  width={60}
                  height={60}
                  alt={project.name}
                  className="dark:bg-zinc-800 bg-zinc-100 rounded-md p-2"
                />
              ) : (
                <div className="dark:bg-primary-bg bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 p-2 rounded-lg text-3xl">
                  P
                </div>
              )}
              <div>
                <h2 className="text-lg tracking-wide mb-1 group-hover:dark:text-primary-color group-hover:text-secondary-color duration-300">
                  {project.name}
                </h2>
                <div className="text-sm dark:text-zinc-400 text-zinc-600">
                  {project.tagline}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] uppercase tracking-widest dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-400 text-zinc-600 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto dark:bg-zinc-900 bg-white rounded-2xl shadow-2xl border dark:border-zinc-800 border-zinc-200 p-6 md:p-10 animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full dark:hover:bg-zinc-800 hover:bg-zinc-100 duration-300"
            >
              <BiX className="text-3xl" />
            </button>

            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h2 className="text-2xl md:text-4xl font-black tracking-tight">
                    {selectedProject.name}
                  </h2>
                  <div className="flex items-center gap-x-3 text-sm">
                    {selectedProject.projectUrl && (
                      <a
                        href={selectedProject.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-x-2 dark:bg-primary-bg bg-zinc-100 px-3 py-1.5 rounded-md hover:dark:border-zinc-700 hover:border-zinc-300 border border-transparent duration-300"
                      >
                        <BiLinkExternal /> Live URL
                      </a>
                    )}
                    {selectedProject.repository && (
                      <a
                        href={selectedProject.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-x-2 dark:bg-primary-bg bg-zinc-100 px-3 py-1.5 rounded-md hover:dark:border-zinc-700 hover:border-zinc-300 border border-transparent duration-300"
                      >
                        <BiLogoGithub /> GitHub
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-base dark:text-zinc-400 text-zinc-600">
                  {selectedProject.tagline}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProject.screenshots.map((ss, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden border dark:border-zinc-800 border-zinc-100"
                  >
                    <Image
                      src={ss}
                      alt={`${selectedProject.name} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest dark:text-zinc-500 text-zinc-400">
                  About the project
                </h3>
                <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed text-sm space-y-2">
                  {selectedProject.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
