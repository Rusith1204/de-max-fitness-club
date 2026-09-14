"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import anime from "animejs";

const galleryImages = [
  { src: "/images/logo-wall.jpg", alt: "දෙ Max Fitness Club Logo", category: "Facility" },
  { src: "/images/gallery-1.jpg", alt: "Gym training session", category: "Training" },
  { src: "/images/gallery-2.jpg", alt: "Shoulder workout", category: "Training" },
  { src: "/images/gallery-3.jpg", alt: "Motivation pose", category: "Lifestyle" },
  { src: "/images/gallery-4.jpg", alt: "Cable crossover workout", category: "Training" },
  { src: "/images/gallery-5.jpg", alt: "Most muscular pose", category: "Competition" },
  { src: "/images/gallery-6.jpg", alt: "Mirror reflection training", category: "Lifestyle" },
  { src: "/images/gallery-7.jpg", alt: "Gym equipment area", category: "Facility" },
  { src: "/images/gallery-8.jpg", alt: "Back double biceps", category: "Competition" },
  { src: "/images/gallery-9.jpg", alt: "Training intensity", category: "Training" },
  { src: "/images/gallery-10.jpg", alt: "Workout session", category: "Training" },
  { src: "/images/gallery-11.jpg", alt: "Side pose", category: "Competition" },
  { src: "/images/gallery-12.jpg", alt: "Gym lifestyle", category: "Lifestyle" },
  { src: "/images/gallery-13.jpg", alt: "Fitness motivation", category: "Lifestyle" },
  { src: "/images/gallery-14.jpg", alt: "Strength training", category: "Training" },
  { src: "/images/focus.jpg", alt: "Focus and dedication", category: "Lifestyle" },
  { src: "/images/champion.jpg", alt: "Mr. Sabaragamuwa 2026", category: "Competition" },
  { src: "/images/trainer-1.jpg", alt: "Trainer posing", category: "Training" },
  { src: "/images/trainer-2.jpg", alt: "Trainer workout", category: "Training" },
  { src: "/images/pose-bw.jpg", alt: "Back pose black and white", category: "Competition" },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = ["All", "Training", "Competition", "Lifestyle", "Facility"];
  const filteredImages =
    filter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedIndex === null) return;
    if (direction === "prev") {
      setSelectedIndex(
        selectedIndex > 0 ? selectedIndex - 1 : filteredImages.length - 1
      );
    } else {
      setSelectedIndex(
        selectedIndex < filteredImages.length - 1 ? selectedIndex + 1 : 0
      );
    }
  };

  // Lightbox parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  const xParallax = useTransform(smoothX, [-0.5, 0.5], ["-5%", "5%"]);
  const yParallax = useTransform(smoothY, [-0.5, 0.5], ["-5%", "5%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX / innerWidth - 0.5;
    const y = clientY / innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleFilterClick = (cat: string) => {
    setFilter(cat);
    // Anime.js glitch/flash effect on the buttons
    anime({
      targets: '.filter-btn',
      scale: (el: Element) => (el.textContent === cat ? [0.9, 1.05, 1] : 1),
      opacity: (el: Element) => (el.textContent === cat ? [0.5, 1] : 0.7),
      duration: 600,
      easing: 'easeOutElastic(1, .8)'
    });
  };

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-24 md:py-32 bg-brand-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-brand-red text-sm font-bold uppercase tracking-[0.2em] bg-brand-red/10 px-4 py-1.5 rounded-full">
            Our Facility
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-heading)] text-brand-white leading-[1.1]">
            Photo{" "}
            <span className="text-gradient-red">Gallery.</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-brand-red to-transparent rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`filter-btn px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                filter === cat
                  ? "bg-brand-red text-white shadow-lg shadow-brand-red/30"
                  : "glass-light text-brand-gray hover:text-brand-white hover:bg-brand-slate/60 border border-brand-slate/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, i) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                transition={{ 
                  duration: 0.5, 
                  delay: (i % 8) * 0.05,
                  type: "spring",
                  damping: 20,
                  stiffness: 100
                }}
                className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl ${
                  i % 5 === 0 ? "row-span-2 md:col-span-2" : ""
                }`}
                onClick={() => setSelectedIndex(i)}
              >
                <div
                  className={`relative w-full h-full ${
                    i % 5 === 0 ? "min-h-[300px] md:min-h-[500px]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Hover overlay with complex gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-brand-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center mix-blend-overlay" />
                  
                  {/* Icon Reveal */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full glass flex items-center justify-center transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out shadow-2xl">
                      <ZoomIn className="w-6 h-6 text-brand-white" />
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 glass rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 backdrop-blur-md border border-white/10">
                    <span className="text-[10px] font-bold text-brand-white uppercase tracking-widest">
                      {image.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Advanced Lightbox with Parallax */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 overflow-hidden"
            onClick={() => setSelectedIndex(null)}
            onMouseMove={handleMouseMove}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 w-14 h-14 rounded-full glass flex items-center justify-center text-brand-white hover:text-brand-red hover:bg-white transition-all duration-300 z-20 group border border-white/20"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>

            {/* Navigation Buttons */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-6 w-14 h-14 rounded-full glass flex items-center justify-center text-brand-white hover:text-brand-red hover:bg-white transition-all duration-300 z-20 group border border-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-6 w-14 h-14 rounded-full glass flex items-center justify-center text-brand-white hover:text-brand-red hover:bg-white transition-all duration-300 z-20 group border border-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Parallax Image Container */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full z-10"
              onClick={(e) => e.stopPropagation()}
              style={{ x: xParallax, y: yParallax }}
            >
              <Image
                src={filteredImages[selectedIndex].src}
                alt={filteredImages[selectedIndex].alt}
                fill
                className="object-contain drop-shadow-[0_0_50px_rgba(229,9,20,0.2)]"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Image Info Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-2xl border border-white/20 z-20"
            >
              <p className="text-sm font-bold text-brand-white flex items-center gap-4">
                <span className="opacity-80">{filteredImages[selectedIndex].alt}</span>
                <span className="w-1 h-1 bg-brand-red rounded-full" />
                <span className="text-brand-red tracking-widest">
                  {selectedIndex + 1} / {filteredImages.length}
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
