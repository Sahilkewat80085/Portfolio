"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import funImage from "@/public/yeah-right.png";

const SPRITE_SIZE = 64;
const SPRITE_SHEET = "/sprite.png";
const SPEED = 55; // px per second
const FRAME_INTERVAL = 200; // ms per frame
const SAFE_MARGIN = 16; // px from viewport edge for dialog

const directionMap: Record<string, number> = {
  down: 0,
  left: 1,
  up: 2,
  right: 3,
};

const MESSAGES = [
  "Hello! My name is Ji-Ji, I'm Sahil's secretary!",
  "Sahil is probably building something awesome right now...",
  "Have you checked the projects section?",
  "I love patrolling this portfolio!",
  "Need a great dev? Sahil is your guy!",
  "Ji-Ji is always on duty!",
  "Check out Sahil's GitHub calendar above!",
  "Psst… Sahil also has a resume you can download!",
  "Did you know Sahil loves building things? He built me tho!!",
  "Don't forget to connect with Sahil on LinkedIn!",
  "My pixel-legs are getting a real workout today.",
  "Sahil told me to look busy. Am I doing it right?",
  "Wait, did I leave the production server on fire?",
  "I'm not paid enough for all this cardio.",
  "Error 404: Motivation to walk any further not found.",
  "Is it just me, or is that cursor watching us?",
  "I've walked five miles and I'm still on the same div.",
  "Don't tell Sahil, but I think his code is sentient.",
  "I'm only here for the free cloud storage and the views.",
  "If I walk off the screen, consider me on vacation.",
  "Debugging is just detective work where you are also the killer.",
  "I'm a 2D secretary in a 3D world. It's complicated.",
  "Have you seen Sahil's resume? It's less pixelated than me.",
  "I'd offer you a coffee, but I lack the necessary logic gates.",
  "Seriously, just hire Sahil already. My pixel-knees are hurting.",
  "Sahil is a coding machine. You should probably put him on your payroll.",
  "If you don't hire him, I'm going to start charging you for these walks.",
  "Hire Sahil. Your codebase will thank you. And I might get a day off.",
  "Looking for a sign to hire a dev? This is it. Right here.",
  "Fun fact: Sahil can debug code in his sleep. I've seen it.",
  "Did you know Sahil once built a robot that only fetches high-quality code?",
  "Sahil's coffee to code ratio is statistically significant.",
  "Fun fact: Sahil speaks fluent JavaScript, Python, and Sarcasm.",
  "Sahil doesn't just write code, he crafts digital experiences. And sprites like me.",
  "I'm not a bot, I'm a highly advanced sequence of pixels.",
  "Sahil once wrote an entire app using only his left hand. Probably.",
  "If you find a bug, it's actually a feature Sahil added for character.",
  "I'm thinking of starting a union for portfolio sprites.",
  "Does this sprite sheet make me look fat?",
  "Sahil's keyboard has seen things you wouldn't believe.",
  "I'm the only secretary who works for free and never complains. Mostly.",
  "Just click a project. Any project. They're all great.",
  "Wait, did Sahil just push to main? Brave man.",
  "I'm waiting for the day Sahil upgrades me to 4K.",
  "Life as a sprite is just loop after loop. Send help.",
  "Are you a CSS file? Because you've got style.",
  "My heart skips a frame whenever you scroll by.",
  "Is your Wi-Fi signal strong? Because I'm feeling a connection.",
];

const WalkingSprite = () => {
  const [posX, setPosX] = useState(20);
  const [direction, setDirection] = useState<"left" | "right" | "down">("down");
  const [frame, setFrame] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [dialogWidth, setDialogWidth] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const posXRef = useRef(20);
  const targetXRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const messageIndexRef = useRef(1); // skip intro (index 0)

  // ─── Frame ticker (only animate when walking) ──────────────────────────────
  useEffect(() => {
    if (!isWalking) {
      setFrame(0);
      return;
    }
    const iv = setInterval(() => setFrame((p) => (p + 1) % 4), FRAME_INTERVAL);
    return () => clearInterval(iv);
  }, [isWalking]);

  // ─── Measure dialog width whenever message changes ─────────────────────────
  useEffect(() => {
    if (message) {
      const t = setTimeout(() => {
        if (dialogRef.current) setDialogWidth(dialogRef.current.offsetWidth);
      }, 60);
      return () => clearTimeout(t);
    } else {
      setDialogWidth(0);
    }
  }, [message]);

  // Also keep dialog width up to date while she moves
  useEffect(() => {
    if (!message) return;
    const iv = setInterval(() => {
      if (dialogRef.current) setDialogWidth(dialogRef.current.offsetWidth);
    }, 80);
    return () => clearInterval(iv);
  }, [message]);

  // ─── Clamped dialog left (in px, relative to sprite div) ──────────────────
  const computeDialogLeft = (x: number, dw: number): string => {
    if (dw === 0) return "-9999px";
    const spriteCenter = x + SPRITE_SIZE / 2;
    const natural = spriteCenter - dw / 2;
    const clamped = Math.max(
      SAFE_MARGIN,
      Math.min(natural, window.innerWidth - dw - SAFE_MARGIN)
    );
    return `${clamped - x}px`;
  };

  const computePointerLeft = (x: number, dw: number): string => {
    if (dw === 0) return "50%";
    const spriteCenter = x + SPRITE_SIZE / 2;
    const natural = spriteCenter - dw / 2;
    const clamped = Math.max(
      SAFE_MARGIN,
      Math.min(natural, window.innerWidth - dw - SAFE_MARGIN)
    );
    const ptr = spriteCenter - clamped;
    return `${Math.max(10, Math.min(ptr, dw - 10))}px`;
  };

  // ─── Pick a random X along the full bottom edge (with a small margin) ──────
  const getRandomX = useCallback(() => {
    const w = window.innerWidth;
    const minX = 20;
    const maxX = w - SPRITE_SIZE - 20;
    return minX + Math.random() * (maxX - minX);
  }, []);

  // ─── rAF walk to a target ──────────────────────────────────────────────────
  const startWalking = useCallback((target: number) => {
    targetXRef.current = target;
    lastTimeRef.current = null;
    setIsWalking(true);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const animate = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const tgt = targetXRef.current!;
      const cur = posXRef.current;
      const dist = tgt - cur;
      const step = SPEED * dt;

      if (Math.abs(dist) <= step) {
        posXRef.current = tgt;
        setPosX(tgt);
        targetXRef.current = null;
        setIsWalking(false);
        setDirection("down"); // face the user when idle
        return;
      }

      const newX = cur + Math.sign(dist) * step;
      posXRef.current = newX;
      setPosX(newX);
      setDirection(dist > 0 ? "right" : "left");
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  // ─── Intro greeting ────────────────────────────────────────────────────────
  useEffect(() => {
    setMessage(MESSAGES[0]);
    const t = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(t);
  }, []);

  // ─── Walk loop – completely independent of dialogs ─────────────────────────
  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) =>
      new Promise<void>((r) => setTimeout(r, ms));

    const waitArrived = () =>
      new Promise<void>((r) => {
        const check = () => {
          if (targetXRef.current === null) return r();
          setTimeout(check, 50);
        };
        check();
      });

    const run = async () => {
      await sleep(600);
      posXRef.current = 20;
      setPosX(20);

      // Skip first stop dialog since intro greeting is already showing
      await sleep(4500);
      if (cancelled) return;

      while (!cancelled) {
        // Walk to a random position
        const target = getRandomX();
        startWalking(target);
        await waitArrived();
        if (cancelled) break;

        // She arrived and is facing the user – show a dialog
        const idx = Math.floor(Math.random() * (MESSAGES.length - 1)) + 1;
        setMessage(MESSAGES[idx]);

        // Stand still while speaking (5 seconds)
        const standDuration = 5000;
        await sleep(standDuration);
        if (cancelled) break;

        // Clear dialog just before walking again
        setMessage(null);
        await sleep(400);
        if (cancelled) break;
      }
    };

    run();
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [getRandomX, startWalking]);

  return (
    <>
      <div
        onClick={() => {
          setShowEasterEgg(true);
          setTimeout(() => setShowEasterEgg(false), 3000);
        }}
        style={{
          position: "fixed",
          bottom: 20,
          left: posX,
          width: SPRITE_SIZE,
          height: SPRITE_SIZE,
          zIndex: 100,
          pointerEvents: "auto",
          cursor: "pointer",
        }}
      >
      {/* Dialog bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            ref={dialogRef}
            key={message}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              bottom: SPRITE_SIZE + 8,
              left: computeDialogLeft(posX, dialogWidth),
              backgroundColor: "white",
              border: "3px solid black",
              padding: "6px 10px",
              color: "black",
              fontSize: "12px",
              fontWeight: "700",
              fontFamily: "monospace",
              boxShadow: "3px 3px 0px rgba(0,0,0,0.2)",
              whiteSpace: "nowrap",
              imageRendering: "pixelated",
            }}
          >
            {message}
            {/* Pointer triangle */}
            <div
              style={{
                position: "absolute",
                bottom: -8,
                left: computePointerLeft(posX, dialogWidth),
                transform: "translateX(-50%) rotate(45deg)",
                width: 12,
                height: 12,
                backgroundColor: "white",
                borderRight: "3px solid black",
                borderBottom: "3px solid black",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sprite */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${SPRITE_SHEET})`,
          backgroundSize: `${SPRITE_SIZE * 4}px ${SPRITE_SIZE * 4}px`,
          backgroundPosition: `-${directionMap[direction] * SPRITE_SIZE}px -${frame * SPRITE_SIZE}px`,
          imageRendering: "pixelated",
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))",
        }}
      />
    </div>

      {/* Easter Egg Image */}
      <Image
        className={`fixed z-[1000] bottom-1/2 duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          showEasterEgg ? "left-0" : "-left-[300px]"
        }`}
        src={funImage}
        width={250}
        height={250}
        quality={100}
        alt="yeah right"
        style={{ pointerEvents: "none", transitionProperty: "left" }}
      />
    </>
  );
};

export default WalkingSprite;
