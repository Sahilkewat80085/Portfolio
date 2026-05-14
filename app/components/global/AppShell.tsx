"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import WalkingSprite from "../shared/WalkingSprite";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <WalkingSprite />
      <Footer />
    </>
  );
}
