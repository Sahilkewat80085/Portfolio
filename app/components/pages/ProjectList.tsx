"use client";

import { useState } from "react";
import Image from "next/image";
import { Slide } from "../../animation/Slide";
import { PortfolioProject } from "@/app/data/portfolio";
import { BiLinkExternal, BiLogoGithub, BiX } from "react-icons/bi";
import { ProjectIcon } from "../shared/ProjectIcons";

type Props = {
  projects: PortfolioProject[];
};

export default function ProjectList({ projects }: Props) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(
    null
  );
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

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
                <div className="flex-shrink-0 dark:bg-zinc-800 bg-zinc-100 rounded-md p-2 w-[60px] h-[60px] flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-secondary-color group-hover:dark:text-primary-color transition-colors duration-300">
                  <ProjectIcon name={project.logo} className="w-8 h-8" />
                </div>
              ) : (
                <div className="dark:bg-primary-bg bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 p-2 rounded-lg text-3xl flex items-center justify-center w-[60px] h-[60px]">
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
              {project.techStack.slice(0, 6).map((tech) => (
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
                    onClick={() => setZoomedImage(ss)}
                    className="relative aspect-video rounded-lg overflow-hidden border dark:border-zinc-800 border-zinc-100 cursor-zoom-in hover:scale-[1.02] hover:opacity-95 transition-all duration-300 group/image"
                  >
                    <Image
                      src={ss}
                      alt={`${selectedProject.name} screenshot ${index + 1}`}
                      fill
                      className={`object-cover duration-300 group-hover/image:scale-105 ${
                        selectedProject.slug === "bloodcall" && index === 1
                          ? "object-[center_10%]"
                          : "object-center"
                      }`}
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
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-zoom-out transition-opacity duration-300"
          onClick={() => setZoomedImage(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90vw] md:w-[50vw] max-h-[80vh] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/80 shadow-2xl flex items-center justify-center"
          >
            <Image
              src={zoomedImage}
              alt="Project screenshot zoom"
              width={1920}
              height={1080}
              className="w-full h-auto max-h-[80vh] object-contain select-none"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
