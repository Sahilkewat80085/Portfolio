"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

const SPRITE_SIZE = 64; 
const SPRITE_SHEET = "/sprite.png"; 

// Mapping columns to directions based on common sprite sheet layouts:
// Col 0: Down (Front)
// Col 1: Left
// Col 2: Up (Back)
// Col 3: Right
const directionMap: Record<string, number> = {
  down: 0,
  left: 1,
  up: 2,
  right: 3,
};

const WalkingSprite = () => {
  const [direction, setDirection] = useState("down");
  const [frame, setFrame] = useState(0);
  const controls = useAnimation();
  
  // Sprite animation loop
  useEffect(() => {
    const frameInterval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);
    }, 150);
    return () => clearInterval(frameInterval);
  }, []);

  const getNextPosition = useCallback(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const contentWidth = Math.min(windowWidth, 1280);
    const sideMargin = (windowWidth - contentWidth) / 2;
    
    // Default to at least some padding if window is narrow
    const effectiveMargin = Math.max(sideMargin, 40); 
    
    const isLeft = Math.random() > 0.5;
    
    let targetX;
    if (isLeft) {
      targetX = Math.random() * (effectiveMargin - SPRITE_SIZE);
    } else {
      targetX = windowWidth - effectiveMargin + Math.random() * (effectiveMargin - SPRITE_SIZE);
    }
    
    const targetY = Math.random() * (windowHeight - SPRITE_SIZE);
    
    return { x: targetX, y: targetY };
  }, []);

  const moveSprite = useCallback(async () => {
    const nextPos = getNextPosition();
    
    // We need the current position to calculate direction
    // controls.get("x") isn't a direct way to get value in framer motion easily without refs
    // So we'll just track it locally or assume it's starting from somewhere.
  }, [getNextPosition]);

  // Initial position and movement loop
  useEffect(() => {
    let currentX = 0;
    let currentY = 0;

    const run = async () => {
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
        const duration = distance / 100; // 100px per second

        await controls.start({
          x: nextPos.x,
          y: nextPos.y,
          transition: { duration, ease: "linear" }
        });

        currentX = nextPos.x;
        currentY = nextPos.y;

        // Idle for a bit
        setFrame(0); // Reset to idle frame if possible (row 0 or 2 depending on sheet)
        await new Promise((r) => setTimeout(r, 2000 + Math.random() * 3000));
      }
    };

    run();
  }, [controls, getNextPosition]);

  return (
    <motion.div
      animate={controls}
      initial={{ x: -100, y: 100 }} // Start off-screen
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: SPRITE_SIZE,
        height: SPRITE_SIZE,
        backgroundImage: `url(${SPRITE_SHEET})`,
        backgroundSize: `${SPRITE_SIZE * 4}px ${SPRITE_SIZE * 4}px`,
        // Column is direction, Row is frame
        backgroundPosition: `-${directionMap[direction] * SPRITE_SIZE}px -${frame * SPRITE_SIZE}px`,
        zIndex: 50,
        pointerEvents: "none",
        imageRendering: "pixelated",
        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
      }}
    />
  );
};

export default WalkingSprite;
