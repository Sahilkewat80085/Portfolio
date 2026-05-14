"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  "My name Ji-Ji, I'm Sahil's secretary!",
  "Sahil is probably building something awesome right now...",
  "Have you checked the projects section?",
  "I love patrolling this portfolio!",
  "Need a great dev? Sahil is your guy!",
  "Ji-Ji is always on duty! 🫡",
  "Check out Sahil's GitHub calendar above!",
  "Psst… Sahil also has a resume you can download!",
  "Did you know Sahil loves building things from scratch?",
  "Don't forget to connect with Sahil on LinkedIn!",
];

const WalkingSprite = () => {
  const [posX, setPosX] = useState(20);
  const [direction, setDirection] = useState<"left" | "right" | "down">("down");
  const [frame, setFrame] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [dialogWidth, setDialogWidth] = useState(0);

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
    const t = setTimeout(() => setMessage(null), 4000);
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
        const idx = 1 + (messageIndexRef.current % (MESSAGES.length - 1));
        messageIndexRef.current++;
        setMessage(MESSAGES[idx]);

        // Stand still while speaking (2.5–4 seconds)
        const standDuration = 2500 + Math.random() * 1500;
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
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: posX,
        width: SPRITE_SIZE,
        height: SPRITE_SIZE,
        zIndex: 100,
        pointerEvents: "none",
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
  );
};

export default WalkingSprite;
