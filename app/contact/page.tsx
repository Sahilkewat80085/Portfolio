import { Metadata } from "next";
import { Slide } from "../animation/Slide";
import Social from "../components/shared/Social";
import { profile } from "../data/portfolio";
import { BiEnvelope, BiMap } from "react-icons/bi";

export const metadata: Metadata = {
  title: "Contact | Sahil Kewat",
  metadataBase: new URL("https://sahilkewat.dev/contact"),
  description: "Get in touch with me for collaborations or just to say hi!",
};

export default function Contact() {
  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <Slide>
        <h1 className="font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
          Contact Me
        </h1>
        <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed max-w-2xl">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out through any of the channels below!
        </p>
      </Slide>

      <section className="grid lg:grid-cols-2 grid-cols-1 gap-x-20 gap-y-12 mt-20">
        <Slide delay={0.1}>
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Contact Information</h2>
              <div className="flex flex-col gap-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-x-3 dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900 duration-300"
                >
                  <BiEnvelope className="text-xl" />
                  {profile.email}
                </a>
                <div className="flex items-center gap-x-3 dark:text-zinc-400 text-zinc-600">
                  <BiMap className="text-xl" />
                  {profile.location}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Follow Me</h2>
              <Social type="social" />
            </div>
          </div>
        </Slide>

        <Slide delay={0.14}>
          <form className="flex flex-col gap-y-6 dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 p-8 rounded-2xl">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest dark:text-zinc-400 text-zinc-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="py-3 px-4 rounded-md dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-zinc-200 focus:border-primary-color outline-none duration-300"
                required
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest dark:text-zinc-400 text-zinc-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                className="py-3 px-4 rounded-md dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-zinc-200 focus:border-primary-color outline-none duration-300"
                required
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest dark:text-zinc-400 text-zinc-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me more about your project..."
                className="py-3 px-4 rounded-md dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-zinc-200 focus:border-primary-color outline-none duration-300 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="py-3 px-8 rounded-md bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 duration-300"
            >
              Send Message
            </button>
          </form>
        </Slide>
      </section>
    </main>
  );
}
