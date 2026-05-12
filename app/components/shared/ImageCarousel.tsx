"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  { src: "/images/carousel/carousel-2.jpg", position: "center" },
  { src: "/images/carousel/carousel-3.jpg", position: "top" },
  { src: "/images/carousel/carousel-4.jpg", position: "center" },
  { src: "/images/carousel/carousel-5.jpg", position: "center" },
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[400px] aspect-square rounded-2xl overflow-hidden mx-auto lg:mx-0">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={`Carousel image ${currentIndex + 1}`}
            fill
            style={{ objectPosition: images[currentIndex].position }}
            className="object-cover"
            priority={currentIndex === 3}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
