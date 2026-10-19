"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import WalkingSprite from "../shared/WalkingSprite";
import PortfolioTerminal from "../shared/PortfolioTerminal";

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
      <PortfolioTerminal />
      <Footer />
    </>
  );
}