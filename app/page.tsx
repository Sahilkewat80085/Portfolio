import Image from "next/image";
import HeroSvg from "./assets/icons/HeroSvg";
import Job from "./components/pages/Job";
import Social from "./components/shared/Social";
import { Slide } from "./animation/Slide";
import ContributionGraph from "./components/pages/GithubCalendarComponent";
import { profile } from "./data/portfolio";

export default async function Home() {
  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 mb-16">
        <div className="lg:max-w-2xl max-w-2xl">
          <Slide>
            <h1 className="font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
              {profile.headline}
            </h1>
            <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
              {profile.shortBio}
            </p>
          </Slide>
          <Slide delay={0.1}>
            <Social type="social" />
          </Slide>
        </div>
        <Slide delay={0.14}>
          <Image
            src="/site.png"
            width={400}
            height={400}
            alt={profile.fullName}
            className="rounded-2xl object-cover"
            priority
          />
        </Slide>
      </section>
      <ContributionGraph />
      <Job />
    </main>
  );
}
