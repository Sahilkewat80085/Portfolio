import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { incognito } from "./assets/font/font";
import { gitlabmono } from "./assets/font/font";
import { Providers } from "./providers";
import AppShell from "./components/global/AppShell";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

const options = {
  title: "Victor Eke | Software Developer",
  description:
    "Victor Eke is a Software Developer and Technical Writer who is passionate about building solutions and contributing to open source communities",
  url: "https://victoreke.com",
  ogImage:
    "https://res.cloudinary.com/victoreke/image/upload/v1692635746/victoreke/og.png",
};

export const metadata: Metadata = {
  title: options.title,
  metadataBase: new URL(options.url),
  description: options.description,
  openGraph: {
    title: options.title,
    url: options.url,
    siteName: "victoreke.com",
    locale: "en-US",
    type: "website",
    description: options.description,
    images: options.ogImage,
  },
  alternates: {
    canonical: options.url,
  },
  other: {
    "google-site-verification": "IzcWMgn5Qjf-LCtA337KTGjivsf9bmod_1pZ-jxYQh8",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${incognito.variable} ${inter.className} ${gitlabmono.variable} dark:bg-zinc-900 bg-white dark:text-white text-zinc-700`}
      >
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
