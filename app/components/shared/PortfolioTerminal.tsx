"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, projects, jobs } from "@/app/data/portfolio";

type LineType = "input" | "output" | "error" | "banner" | "success";

interface TerminalLine {
  id: number;
  type: LineType;
  content: string;
}

let lineIdCounter = 0;
const mkLine = (type: LineType, content: string): TerminalLine => ({
  id: lineIdCounter++,
  type,
  content,
});

const BANNER = [
  "┌──────────────────────────────────────────────────────┐",
  "│          SAHIL KEWAT — PORTFOLIO CLI v1.0            │",
  "│        Type  help  to see available commands         │",
  "└──────────────────────────────────────────────────────┘",
];

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "Available commands:",
    "  about      —  about me",
    "  projects   —  list all projects",
    "  skills     —  tech stack & tools",
    "  experience —  work experience",
    "  contact    —  get in touch",
    "  resume     —  open resume PDF",
    "  clear      —  clear the terminal",
    "  exit       —  close terminal",
  ],

  about: () => [
    `Name     : ${profile.fullName}`,
    `Location : ${profile.location}`,
    `Email    : ${profile.email}`,
    "",
    ...profile.about,
  ],

  projects: () => [
    `${projects.length} projects found:`,
    "",
    ...projects.map(
      (p, i) =>
        `  ${String(i + 1).padStart(2, "0")}. ${p.name.padEnd(18)} — ${p.tagline}`
    ),
    "",
    "Visit the Projects section above for details.",
  ],

  skills: () => {
    const langs = profile.usage
      .slice(0, 8)
      .map((u) => u.name)
      .join(", ");
    const tools = profile.usage
      .slice(8)
      .map((u) => u.name)
      .join(", ");
    return [
      "Languages  : " + langs,
      "Tools      : " + tools,
      "",
      "Soft Skills:",
      ...profile.softSkills.map((s) => `  • ${s.title}`),
    ];
  },

  experience: () => {
    return jobs.flatMap((j) => {
      const start = new Date(j.startDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      const end = j.endDate
        ? new Date(j.endDate).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "Present";
      return [
        `${j.name} — ${j.jobTitle}`,
        `  Period : ${start} → ${end}`,
        `  ${j.description.slice(0, 90)}...`,
        "",
      ];
    });
  },

  contact: () => [
    `Email    : ${profile.email}`,
    `Resume   : ${profile.resumeUrl}`,
    `GitHub   : https://github.com/Sahilkewat80085`,
    `LinkedIn : https://linkedin.com/in/sahil-kewat`,
  ],

  resume: () => {
    if (typeof window !== "undefined") {
      setTimeout(() => window.open(profile.resumeUrl, "_blank"), 200);
    }
    return ["Opening resume in a new tab..."];
  },
};

export default function PortfolioTerminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const resetTerminal = useCallback(() => {
    setLines(BANNER.map((l) => mkLine("banner", l)));
  }, []);

  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "`" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) resetTerminal();
          return !prev;
        });
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [resetTerminal]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Immediately auto-focus the input as soon as the terminal opens
  useEffect(() => {
    if (open) {
      focusInput();
      const raf = requestAnimationFrame(() => focusInput());
      const t1 = setTimeout(() => focusInput(), 50);
      const t2 = setTimeout(() => focusInput(), 150);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [open, focusInput]);

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;
      setHistory((h) => [cmd, ...h]);
      setHistoryIdx(-1);
      setLines((prev) => [...prev, mkLine("input", `sahil@portfolio:~$ ${cmd}`)]);
      if (cmd === "clear") {
        resetTerminal();
        return;
      }
      if (cmd === "exit") {
        setOpen(false);
        return;
      }
      const fn = COMMANDS[cmd];
      if (fn) {
        const out = fn();
        setLines((prev) => [...prev, ...out.map((l) => mkLine("output", l))]);
      } else {
        setLines((prev) => [
          ...prev,
          mkLine(
            "error",
            `bash: ${cmd}: command not found. Type  help  for available commands.`
          ),
        ]);
      }
    },
    [resetTerminal]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setCursorPos(e.target.selectionStart ?? e.target.value.length);
  };

  const syncCursorPos = () => {
    setTimeout(() => {
      if (inputRef.current) {
        setCursorPos(inputRef.current.selectionStart ?? inputRef.current.value.length);
      }
    }, 0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      setCursorPos(0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistoryIdx((i) => {
        const next = Math.min(i + 1, history.length - 1);
        const val = history[next] ?? "";
        setInput(val);
        setCursorPos(val.length);
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistoryIdx((i) => {
        const next = Math.max(i - 1, -1);
        const val = next === -1 ? "" : (history[next] ?? "");
        setInput(val);
        setCursorPos(val.length);
        return next;
      });
    } else {
      syncCursorPos();
    }
  };

  const lineColor: Record<LineType, string> = {
    banner: "#33E092",
    input: "#A0F0C8",
    output: "#d4d4d4",
    error: "#ff6b6b",
    success: "#33E092",
  };

  const beforeCursor = input.slice(0, cursorPos);
  const atCursor = input.slice(cursorPos, cursorPos + 1);
  const afterCursor = input.slice(cursorPos + 1);

  return (
    <AnimatePresence>
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          {/* Keyframe animation for classic blinking terminal block cursor */}
          <style>{`
            @keyframes terminalBlink {
              0%, 49% {
                opacity: 1;
              }
              50%, 100% {
                opacity: 0;
              }
            }
            .terminal-block-cursor {
              animation: terminalBlink 1s step-start infinite;
            }
          `}</style>

          {/* Backdrop */}
          <motion.div
            key="terminal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(6px)",
            }}
          />

          {/* Centered Modal Window */}
          <motion.div
            key="terminal-window"
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              width: "min(760px, 92vw)",
              height: "min(500px, 80vh)",
              background: "rgba(10, 12, 16, 0.96)",
              border: "1px solid rgba(51, 224, 146, 0.35)",
              borderRadius: 12,
              boxShadow: "0 0 0 1px rgba(51,224,146,0.1), 0 25px 60px rgba(0,0,0,0.75)",
              display: "flex",
              flexDirection: "column",
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
              overflow: "hidden",
              cursor: "text",
            }}
            onClick={(e) => {
              e.stopPropagation();
              focusInput();
            }}
          >
            {/* Title bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                borderBottom: "1px solid rgba(51,224,146,0.15)",
                background: "rgba(51,224,146,0.04)",
                flexShrink: 0,
                cursor: "default",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", gap: 6 }}>
                {(["#ff5f57", "#ffbd2e", "#28c940"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={c === "#ff5f57" ? () => setOpen(false) : undefined}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: c,
                      border: "none",
                      cursor: c === "#ff5f57" ? "pointer" : "default",
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: "rgba(255,255,255,0.45)",
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  userSelect: "none",
                }}
              >
                portfolio — bash
              </span>
              <kbd
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.3)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 4,
                  padding: "1px 5px",
                  userSelect: "none",
                }}
              >
                esc
              </kbd>
            </div>

            {/* Output area */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "14px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
              onClick={focusInput}
            >
              {lines.map((line) => (
                <div
                  key={line.id}
                  style={{
                    fontSize: 13,
                    lineHeight: "1.6",
                    color: lineColor[line.type],
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {line.content || "\u00A0"}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Interactive Input row with classic retro white block cursor */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                padding: "12px 18px",
                borderTop: "1px solid rgba(51,224,146,0.12)",
                gap: 8,
                flexShrink: 0,
                cursor: "text",
              }}
              onClick={focusInput}
            >
              <span
                style={{
                  color: "#33E092",
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  userSelect: "none",
                }}
              >
                sahil@portfolio:~$
              </span>

              {/* Display text and blinking white block cursor */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: 13,
                  fontFamily: "inherit",
                  lineHeight: "1.2",
                  minHeight: "18px",
                  flex: 1,
                  pointerEvents: "none",
                }}
              >
                <span style={{ color: "#e8e8e8", whiteSpace: "pre" }}>{beforeCursor}</span>
                {atCursor ? (
                  <span
                    className="terminal-block-cursor"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#0a0c10",
                      display: "inline-block",
                      lineHeight: "1.2",
                      fontWeight: 600,
                    }}
                  >
                    {atCursor}
                  </span>
                ) : (
                  <span
                    className="terminal-block-cursor"
                    style={{
                      display: "inline-block",
                      width: "8.5px",
                      height: "15px",
                      backgroundColor: "#ffffff",
                      verticalAlign: "middle",
                    }}
                  />
                )}
                <span style={{ color: "#e8e8e8", whiteSpace: "pre" }}>{afterCursor}</span>
              </div>

              {/* Real hidden input capturing keystrokes */}
              <input
                ref={inputRef}
                autoFocus
                value={input}
                onChange={handleInputChange}
                onKeyDown={onKeyDown}
                onKeyUp={syncCursorPos}
                onClick={syncCursorPos}
                onSelect={syncCursorPos}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "text",
                  caretColor: "transparent",
                  fontSize: 13,
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}