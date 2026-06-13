"use client";
import { motion, useInView, useAnimation, AnimationProps } from "framer-motion";
import { useRef, useEffect, RefObject } from "react";

interface SlideProps extends AnimationProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const Slide = ({ children, className, delay }: SlideProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInview = useInView(ref as RefObject<Element>, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInview) {
      controls.start("stop");
    }
  }, [controls, isInview]);

  useEffect(() => {
    // Failsafe 1: Check if the element is in the viewport immediately on client-side mount
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const inViewport =
        rect.top < (typeof window !== "undefined" ? window.innerHeight : 800) &&
        rect.bottom > 0;
      if (inViewport) {
        controls.start("stop");
      }
    }

    // Failsafe 2: Check after a short layout settling delay to prevent hydration mismatches
    const timer = setTimeout(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const inViewport =
          rect.top < (typeof window !== "undefined" ? window.innerHeight : 800) &&
          rect.bottom > 0;
        if (inViewport) {
          controls.start("stop");
        }
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        start: { opacity: 0, translateY: 10 },
        stop: { opacity: 1, translateY: 0 },
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
        delay: delay,
        stiffness: 0.5,
      }}
      animate={controls}
      initial="start"
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
};
