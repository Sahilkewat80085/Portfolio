"use client";

import { useState } from "react";
import { Metadata } from "next";
import { Slide } from "../animation/Slide";
import Social from "../components/shared/Social";
import { profile } from "../data/portfolio";
import { BiEnvelope, BiMap, BiCheckCircle, BiLoaderAlt } from "react-icons/bi";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/mvgzvjzy", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  }

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-16 mt-10 no-scrollbar overflow-hidden">
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-x-20 gap-y-12">
        <div className="flex flex-col gap-y-8">
          <Slide>
            <h1 className="font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
              Contact Me
            </h1>
            <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed max-w-xl">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out through any of the channels below!
            </p>
          </Slide>

          <Slide delay={0.1}>
            <div className="flex flex-col gap-y-8 mt-4">
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
        </div>

        <Slide delay={0.14}>
          <div className="relative">
            <form 
              onSubmit={handleSubmit}
              className={`flex flex-col gap-y-6 dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 p-8 rounded-2xl h-full justify-center duration-300 ${status === "success" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
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
                  rows={4}
                  placeholder="Tell me more about your project..."
                  className="py-3 px-4 rounded-md dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-zinc-200 focus:border-primary-color outline-none duration-300 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="py-3 px-8 rounded-md bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 duration-300 flex items-center justify-center gap-x-2"
              >
                {status === "sending" ? (
                  <>
                    <BiLoaderAlt className="animate-spin text-xl" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
              
              {status === "error" && (
                <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
              )}
            </form>

            {status === "success" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-500">
                <BiCheckCircle className="text-6xl text-green-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="dark:text-zinc-400 text-zinc-600">
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm underline dark:text-zinc-500 text-zinc-400 hover:dark:text-white hover:text-zinc-900 duration-300"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </Slide>
      </section>
    </main>
  );
}
