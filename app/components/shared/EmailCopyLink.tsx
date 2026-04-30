"use client";

import { useState } from "react";
import { BiEnvelope } from "react-icons/bi";

export default function EmailCopyLink({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="click to copy"
      className="group relative flex items-center gap-x-2 hover:text-primary-color"
    >
      <BiEnvelope className="text-lg" />
      <span>{email}</span>
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md dark:bg-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {copied ? "copied" : "click to copy"}
      </span>
    </button>
  );
}
