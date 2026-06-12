import React from "react";

type IconProps = {
  className?: string;
};

// 1. CottonX: Autonomous Agent Infrastructure
// Design: Cybernetic central agent node with orbits and network points.
export function CottonXIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Outer orbits representing autonomy & loops */}
      <circle cx="12" cy="12" r="9" strokeDasharray="3 3" className="opacity-60" />
      <path d="M12 3a9 9 0 0 1 9 9" />
      
      {/* Central control unit */}
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
      
      {/* Network connectors & agent nodes */}
      <line x1="12" y1="3" x2="12" y2="9" />
      <line x1="12" y1="15" x2="12" y2="21" />
      <line x1="3" y1="12" x2="9" y2="12" />
      <line x1="15" y1="12" x2="21" y2="12" />
      
      {/* Active node indicators */}
      <circle cx="12" cy="3" r="1.5" fill="currentColor" />
      <circle cx="12" cy="21" r="1.5" fill="currentColor" />
      <circle cx="3" cy="12" r="1.5" fill="currentColor" />
      <circle cx="21" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

// 2. OctoPy: Modular ML Automation Library
// Design: Stylized octopus with modular machine learning nodes as tentacle tips.
export function OctoPyIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Octopus Head (minimal machine learning brain shape) */}
      <path d="M8 9.5C8 6.5 9.8 4 12 4s4 2.5 4 5.5c0 2-1.2 3.5-2.5 4h-3C9.2 13 8 11.5 8 9.5z" />
      
      {/* Dynamic curly tentacle pipelines representing automated workflows */}
      <path d="M7 10c-1.8 1-3.2 2.5-3 4.5.3 2 2.2 2.5 3 1" />
      <path d="M17 10c1.8 1 3.2 2.5 3 4.5-.3 2-2.2 2.5-3 1" />
      <path d="M9 13c-.5 2.5-2 4-2.5 6s1 2.5 2.5 1.5" />
      <path d="M15 13c.5 2.5 2 4 2.5 6s-1 2.5-2.5 1.5" />
      <path d="M12 13.5v5c0 1.5 1 2 1.5 1.5" />
      
      {/* Pipeline Data Nodes (Machine learning modules) */}
      <circle cx="7" cy="15.5" r="1" fill="currentColor" />
      <circle cx="17" cy="15.5" r="1" fill="currentColor" />
      <circle cx="9" cy="20.5" r="1" fill="currentColor" />
      <circle cx="15" cy="20.5" r="1" fill="currentColor" />
      
      {/* Analytical eyes */}
      <circle cx="10.5" cy="8.5" r="0.8" fill="currentColor" />
      <circle cx="13.5" cy="8.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

// 3. EscroX: Milestone-Based Escrow Engine
// Design: Interlocking high-tech security shield with a contract lock & X symbol.
export function EscroXIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Security Shield */}
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      
      {/* Lock Shackle (escrow hold state) */}
      <path d="M9 11V9.2C9 7.4 10.3 6 12 6s3 1.4 3 3.2V11" />
      
      {/* Lock Base & The 'X' representing trade and smart contracts */}
      <rect x="8.5" y="11" width="7" height="5" rx="1" fill="currentColor" className="opacity-10" />
      <path d="M10.5 13.5l3 2" />
      <path d="M13.5 13.5l-3 2" />
    </svg>
  );
}

// 4. NyayaSetu: Whistleblower & Civic Shield Protocol
// Design: Encrypted safety shield overlapping structural bridge arches ("Setu").
export function NyayaSetuIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Defensive Cryptographic Shield */}
      <path d="M12 2L4 5v6c0 5.5 8 9.5 8 9.5s8-4 8-9.5V5l-8-3z" />
      
      {/* Bridge Arch inside representation (Setu of secure transport) */}
      <path d="M7 14c2-2.5 8-2.5 10 0" />
      
      {/* Bridge Pillars */}
      <line x1="9.5" y1="13.2" x2="9.5" y2="16" />
      <line x1="12" y1="12.8" x2="12" y2="16.5" />
      <line x1="14.5" y1="13.2" x2="14.5" y2="16" />
      
      {/* Whistle / Zero Knowledge Key of Truth */}
      <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
      <line x1="12" y1="9" x2="12" y2="11" />
    </svg>
  );
}

// 5. BloodCall: Smart Blood Donation & Emergency Assistance
// Design: Elegant medical cross combined with an emergency droplet and ECG pulse.
export function BloodCallIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Drop of Blood Outline */}
      <path d="M12 2.7l5.3 5.3a7.5 7.5 0 1 1-10.6 0L12 2.7z" />
      
      {/* Pulse / ECG Wave representing emergency response */}
      <path
        d="M8.5 13.5h1.8l1.2-3 1 6 1.2-4 1.3 1h1.5"
        strokeLinejoin="miter"
      />
      
      {/* Small locator dot for emergency call coordination */}
      <circle cx="12" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

// 6. Orqestra: Multi-Agent LLM Orchestration Platform
// Design: High-tech hub coordinating multiple synchronized agent nodes.
export function OrqestraIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Hexagonal orchestrator boundary */}
      <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2z" strokeDasharray="3 3" className="opacity-40" />
      
      {/* Central Conductor Orchestration Hub */}
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="12" cy="12" r="5" />
      
      {/* Dynamic agent paths & radiating waves */}
      <line x1="12" y1="2" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="22" />
      <line x1="3.5" y1="7" x2="8.5" y2="10" />
      <line x1="20.5" y1="17" x2="15.5" y2="14" />
      <line x1="3.5" y1="17" x2="8.5" y2="14" />
      <line x1="20.5" y1="7" x2="15.5" y2="10" />
      
      {/* Orbiting multi-agent node terminals */}
      <circle cx="12" cy="2" r="1.5" fill="currentColor" />
      <circle cx="12" cy="22" r="1.5" fill="currentColor" />
      <circle cx="3.5" cy="7" r="1.5" fill="currentColor" />
      <circle cx="20.5" cy="17" r="1.5" fill="currentColor" />
      <circle cx="3.5" cy="17" r="1.5" fill="currentColor" />
      <circle cx="20.5" cy="7" r="1.5" fill="currentColor" />
    </svg>
  );
}

// 7. CreatorJoy: AI-Powered Video Intelligence Platform
// Design: A play button nested inside a generative RAG node network.
export function CreatorJoyIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Video screen border */}
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      {/* Play button inside screen */}
      <polygon points="10 8 15 11 10 14 10 8" fill="currentColor" />
      {/* Generative RAG AI node paths radiating underneath */}
      <path d="M6 21h12" />
      <path d="M12 17v4" />
      <circle cx="6" cy="21" r="1" fill="currentColor" />
      <circle cx="18" cy="21" r="1" fill="currentColor" />
      <circle cx="12" cy="21" r="1" fill="currentColor" />
    </svg>
  );
}

// 8. The Monitor: AI-Powered Market Intelligence Platform
// Design: Geopolitical globe coordinates with a rising market trend line.
export function TheMonitorIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Global longitude / latitude circle */}
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
      {/* Rising overlay market trend line (monitoring/market context) */}
      <path d="M8 14l3-3 3 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="18" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

type ProjectIconProps = {
  name: string;
  className?: string;
};

// Generic dispatcher component that selects the correct icon dynamically
export function ProjectIcon({ name, className }: ProjectIconProps) {
  const iconMap: Record<string, React.ComponentType<IconProps>> = {
    cottonx: CottonXIcon,
    octopy: OctoPyIcon,
    escrox: EscroXIcon,
    nyayasetu: NyayaSetuIcon,
    bloodcall: BloodCallIcon,
    orqestra: OrqestraIcon,
    creatorjoy: CreatorJoyIcon,
    "the-monitor": TheMonitorIcon,
  };

  const SelectedIcon = iconMap[name.toLowerCase()];

  if (!SelectedIcon) {
    // Return a default placeholder code/project bracket icon if no specific key matches
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }

  return <SelectedIcon className={className} />;
}
