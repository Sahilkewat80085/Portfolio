import Image from "next/image";
import { Metadata } from "next";
import { BiEnvelope, BiLinkExternal, BiSolidDownload } from "react-icons/bi";
import Heroes from "../components/pages/Heroes";
import Usage from "../components/pages/Usage";
import { Slide } from "../animation/Slide";
import RefLink from "../components/shared/RefLink";
import { profile } from "../data/portfolio";

export const metadata: Metadata = {
  title: "About | Sahil Kewat",
  metadataBase: new URL("https://sahilkewat.dev/about"),
  description:
    "Learn more about my skills, experience and technical background",
  openGraph: {
    title: "About | Sahil Kewat",
    url: "https://sahilkewat.dev/about",
    description:
      "Learn more about my skills, experience and technical background",
    images:
      "https://res.cloudinary.com/victoreke/image/upload/v1692635746/victoreke/og.png",
  },
};

export default async function About() {
  return (
    <main className="relative lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6">
      <div>
        <section className="relative grid lg:grid-cols-custom grid-cols-1 gap-x-6 justify-items-center">
          <div className="order-2 lg:order-none">
            <Slide>
              <h1 className="font-incognito font-semibold tracking-tight sm:text-5xl text-3xl lg:leading-tight basis-1/2 mb-8">
                I&apos;m {profile.fullName}. I live in {profile.location}, where
                I build useful things.
              </h1>

              <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                {profile.about.map((paragraph) => (
                  <p key={paragraph} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Slide>
          </div>

          <aside className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-none mb-12">
            <Slide delay={0.1}>
              <div className="sticky top-10">
                <Image
                  className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top"
                  src="/site.png"
                  width={400}
                  height={400}
                  quality={100}
                  alt={profile.fullName}
                  priority
                />

                <div className="flex flex-col text-center gap-y-4">
                  <div className="flex items-center gap-x-3">
                    <RefLink
                      href={profile.resumeUrl}
                      className="flex items-center justify-center text-center gap-x-2 basis-[90%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-lg font-incognito font-semibold"
                    >
                      View Resume <BiLinkExternal className="text-base" />
                    </RefLink>
                    <a
                      href={profile.resumeUrl}
                      className="flex items-center justify-center text-center dark:text-primary-color text-secondary-color hover:underline basis-[10%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-3 text-lg"
                      title="Download Resume"
                    >
                      <BiSolidDownload
                        className="text-lg"
                        aria-label="Download Resume"
                      />
                    </a>
                  </div>

                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-x-2 hover:text-primary-color"
                  >
                    <BiEnvelope className="text-lg" />
                    {profile.email}
                  </a>
                </div>
              </div>
            </Slide>
          </aside>
        </section>
        <Slide delay={0.14}>
          <Usage />
        </Slide>
        <Heroes />
      </div>
    </main>
  );
}
