import Image from "next/image";
import HeroSvg from "../../assets/icons/HeroSvg";
import { BiLinkExternal, BiSolidDownload } from "react-icons/bi";

import Usage from "./Usage";
import SoftSkills from "./SoftSkills";
import { Slide } from "../../animation/Slide";
import RefLink from "../shared/RefLink";
import EmailCopyLink from "../shared/EmailCopyLink";
import { profile } from "../../data/portfolio";

export default function AboutSection() {
  return (
    <section id="about" className="relative lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6 lg:pt-32 pt-20 lg:pb-16 pb-10">
      <div className="mb-16">
        <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
          About Me
        </h2>
      </div>
      <div>
        <div className="relative grid lg:grid-cols-custom grid-cols-1 gap-x-6 justify-items-center">
          <div className="order-2 lg:order-none">
            <Slide>
              <h3 className="font-incognito font-semibold tracking-tight sm:text-5xl text-3xl lg:leading-tight basis-1/2 mb-8">
                Developer, builder, and problem solver
              </h3>

              <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                {profile.about.map((paragraph) => (
                  <p key={paragraph} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Slide>
          </div>

          <aside className="flex flex-col lg:justify-self-center justify-self-center gap-y-8 lg:order-1 order-none mb-12">
            <Slide delay={0.1}>
              <div className="sticky top-10">
                <HeroSvg />

                <div className="flex flex-col text-center gap-y-4">
                  <div className="flex items-center gap-x-3">
                    <RefLink
                      href={profile.resumeUrl}
                      className="flex items-center justify-center text-center gap-x-2 basis-[90%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-base font-incognito font-semibold"
                    >
                      View Resume <BiLinkExternal className="text-base" />
                    </RefLink>
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-center text-center dark:text-primary-color text-secondary-color hover:underline basis-[10%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-base"
                      title="Download Resume"
                    >
                      <BiSolidDownload
                        className="text-lg"
                        aria-label="Download Resume"
                      />
                    </a>
                  </div>

                  <EmailCopyLink email={profile.email} />
                </div>
              </div>
            </Slide>
          </aside>
        </div>
        <Slide delay={0.14}>
          <SoftSkills />
          <Usage />
        </Slide>
      </div>
    </section>
  );
}
