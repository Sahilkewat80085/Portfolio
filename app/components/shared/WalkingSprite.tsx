"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

const SPRITE_SIZE = 64; 
const SPRITE_SHEET = "/sprite.png"; 

const directionMap: Record<string, number> = {
  down: 0,
  left: 1,
  up: 2,
  right: 3,
};

const MESSAGES = [
  "Hi! I'm Ji-Ji, Sahil's secretary.",
  "Sahil is probably building something awesome!",
  "Have you seen the Github calendar below?",
  "I love walking around this portfolio!",
  "Need a dev? Sahil is your guy!",
  "Ji-Ji is here to help! (mostly just to walk though)",
];

const WalkingSprite = () => {
  const [direction, setDirection] = useState("down");
  const [frame, setFrame] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const controls = useAnimation();
  const isFirstRun = useRef(true);
  const [dialogOffset, setDialogOffset] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  
  // Sprite animation loop
  useEffect(() => {
    const frameInterval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);
    }, 150);
    return () => clearInterval(frameInterval);
  }, []);

  // Boundary check for dialog box
  useEffect(() => {
    if (message && dialogRef.current) {
      const checkBoundaries = () => {
        if (!dialogRef.current) return;
        const rect = dialogRef.current.getBoundingClientRect();
        const safetyMargin = 20;
        const windowWidth = window.innerWidth;
        
        let offset = 0;
        if (rect.left < safetyMargin) {
          offset = safetyMargin - rect.left;
        } else if (rect.right > windowWidth - safetyMargin) {
          offset = windowWidth - safetyMargin - rect.right;
        }
        setDialogOffset(offset);
      };

      // Check immediately and after a small delay to handle transitions
      checkBoundaries();
      const timer = setTimeout(checkBoundaries, 100);
      return () => clearTimeout(timer);
    } else {
      setDialogOffset(0);
    }
  }, [message]);

  const getNextPosition = useCallback(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const contentWidth = Math.min(windowWidth, 1280);
    const sideMargin = (windowWidth - contentWidth) / 2;
    
    // Default to at least some padding if window is narrow
    const effectiveMargin = Math.max(sideMargin, 60); 
    
    const isLeft = Math.random() > 0.5;
    
    let targetX;
    const BUFFER = 15; // Keep away from the absolute edge
    
    if (isLeft) {
      const maxRange = Math.max(0, effectiveMargin - SPRITE_SIZE - BUFFER);
      targetX = BUFFER + Math.random() * maxRange;
    } else {
      const minX = windowWidth - effectiveMargin + BUFFER;
      const maxRange = Math.max(0, effectiveMargin - SPRITE_SIZE - BUFFER);
      targetX = minX + Math.random() * maxRange;
    }
    
    const targetY = BUFFER + Math.random() * (windowHeight - SPRITE_SIZE - BUFFER * 2);
    
    return { x: targetX, y: targetY };
  }, []);

  useEffect(() => {
    let currentX = 20;
    let currentY = 100;

    const run = async () => {
      // Set actual initial position based on window width
      const startPos = getNextPosition();
      currentX = startPos.x;
      currentY = startPos.y;
      controls.set({ x: currentX, y: currentY });

      // Starting dialog
      if (isFirstRun.current) {
        setMessage("My name Ji-Ji, I'm Sahil's secretary!");
        await new Promise(r => setTimeout(r, 4500));
        setMessage(null);
        isFirstRun.current = false;
        await new Promise(r => setTimeout(r, 1000));
      }

      while (true) {
        const nextPos = getNextPosition();
        
        // Calculate direction
        const dx = nextPos.x - currentX;
        const dy = nextPos.y - currentY;
        
        let newDir = "down";
        if (Math.abs(dx) > Math.abs(dy)) {
          newDir = dx > 0 ? "right" : "left";
        } else {
          newDir = dy > 0 ? "down" : "up";
        }
        setDirection(newDir);

        // Move
        const distance = Math.sqrt(dx * dx + dy * dy);
        const duration = distance / 70; // Steady walking pace

        await controls.start({
          x: nextPos.x,
          y: nextPos.y,
          transition: { duration, ease: "linear" }
        });

        currentX = nextPos.x;
        currentY = nextPos.y;
        setFrame(0); // Stop animation

        // Random chance to speak when arriving
        if (Math.random() > 0.5) {
          const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
          setMessage(randomMsg);
          await new Promise(r => setTimeout(r, 4000));
          setMessage(null);
        }

        // Idle for a bit
        await new Promise((r) => setTimeout(r, 4000 + Math.random() * 6000));
      }
    };

    run();
  }, [controls, getNextPosition]);

  return (
    <motion.div
      animate={controls}
      initial={{ x: 20, y: 100 }} 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: SPRITE_SIZE,
        height: SPRITE_SIZE,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <AnimatePresence>
        {message && (
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              y: -60, 
              scale: 1,
              x: `calc(-50% + ${dialogOffset}px)` 
            }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            className="absolute left-1/2"
            style={{
              backgroundColor: "white",
              border: "3px solid black",
              padding: "6px 12px",
              color: "black",
              fontSize: "13px",
              fontWeight: "600",
              fontFamily: "var(--gitlabmono), monospace",
              boxShadow: "4px 4px 0px rgba(0,0,0,0.15)",
              whiteSpace: "nowrap",
              imageRendering: "pixelated",
            }}
          >
            {message}
            {/* Pixel pointer */}
            <div 
              className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-[3px] border-b-[3px] border-black rotate-45"
              style={{
                left: `calc(50% - ${dialogOffset}px)` 
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${SPRITE_SHEET})`,
          backgroundSize: `${SPRITE_SIZE * 4}px ${SPRITE_SIZE * 4}px`,
          backgroundPosition: `-${directionMap[direction] * SPRITE_SIZE}px -${frame * SPRITE_SIZE}px`,
          imageRendering: "pixelated",
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
        }}
      />
    </motion.div>
  );
};

export default WalkingSprite;
