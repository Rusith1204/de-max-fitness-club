"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Play, Flame, Zap } from "lucide-react";
import anime from "animejs";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // 1. Anime.js Text Reveal
    if (textRef.current) {
      // We will split the text manually since we don't have a specific text-splitting library here,
      // but we can just animate the elements that have the 'hero-text-line' class.
      anime({
        targets: ".hero-text-line",
        translateY: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: anime.stagger(200, { start: 1000 }), // Wait for preloader
      });
    }

    // 2. Anime.js Particle Engine
    if (particlesRef.current) {
      const particles: HTMLDivElement[] = [];
      const colors = ["#E50914", "#FF1E27", "#B80710"];
      
      for (let i = 0; i < 20; i++) {
        const p = document.createElement("div");
        p.style.width = Math.random() * 4 + 2 + "px";
        p.style.height = p.style.width;
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.position = "absolute";
        p.style.borderRadius = "50%";
        p.style.left = Math.random() * 100 + "%";
        p.style.bottom = "-10px";
        p.style.opacity = "0";
        p.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${p.style.backgroundColor}`;
        particlesRef.current.appendChild(p);
        particles.push(p);
      }

      anime({
        targets: particles,
        translateY: () => [0, -Math.random() * 500 - 200],
        translateX: () => [0, Math.random() * 100 - 50],
        opacity: [
          { value: [0, 1], duration: 500, easing: "linear" },
          { value: 0, duration: 1500, delay: () => Math.random() * 2000, easing: "linear" }
        ],
        scale: () => [0, Math.random() * 1.5 + 0.5],
        duration: () => Math.random() * 3000 + 3000,
        easing: "easeOutSine",
        delay: anime.stagger(300),
        loop: true,
      });
      const currentParticles = particlesRef.current;
      return () => {
        // Cleanup particles on unmount
        if (currentParticles) {
          currentParticles.innerHTML = "";
        }
      };
    }
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 z-0 origin-top"
      >
        <Image
          src="/images/hero-main.jpg"
          alt="දෙ Max Fitness Club — Strength & Power"
          fill
          priority
          className="object-cover object-center scale-110"
          quality={90}
          sizes="100vw"
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(229,9,20,0.2),transparent_70%)]" />
      </motion.div>

      {/* Advanced Anime.js Particles Engine */}
      <div ref={particlesRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden" />

      {/* Content */}
      <motion.div 
        style={{ opacity: opacityText }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full"
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6 border border-brand-red/20 backdrop-blur-xl"
          >
            <Flame className="w-4 h-4 text-brand-red animate-pulse-red" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-white">
              Sri Lanka&apos;s Elite Fitness Destination
            </span>
          </motion.div>

          {/* Headline - Animated via Anime.js */}
          <h1
            ref={textRef}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-[family-name:var(--font-heading)] leading-[0.95] tracking-tight overflow-hidden"
          >
            <div className="hero-text-line block text-brand-white opacity-0">REDEFINE YOUR</div>
            <div className="hero-text-line block text-gradient-red mt-2 opacity-0">STRENGTH.</div>
            <div className="hero-text-line block text-brand-white mt-2 opacity-0">
              FIND YOUR{" "}
              <span className="text-brand-red">දෙ</span>{" "}
              <span className="text-brand-white">MAX.</span>
            </div>
          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mt-6 text-base sm:text-lg text-brand-gray max-w-xl leading-relaxed"
          >
            Elite equipment. Certified trainers. Personal transformation.
            Experience the ultimate fitness journey at{" "}
            <span className="text-brand-white font-semibold">
              දෙ Max Fitness Club
            </span>{" "}
            — where champions are built.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#pricing"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-lg btn-glow text-sm sm:text-base transition-all duration-300 relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Join Now
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-4 border border-brand-slate-light hover:border-brand-red text-brand-white font-bold rounded-lg text-sm sm:text-base transition-all duration-300 hover:bg-brand-red/10 backdrop-blur-md"
            >
              <Play className="w-4 h-4 group-hover:text-brand-red transition-colors" />
              Book a Free Trial
            </motion.a>
          </motion.div>

          {/* Quick stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="mt-12 flex flex-wrap gap-6 sm:gap-12"
          >
            {[
              { number: "1000+", label: "Active Members" },
              { number: "15+", label: "Trainers" },
              { number: "50+", label: "Equipment" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 group">
                <div className="w-1 h-12 bg-gradient-to-b from-brand-red via-brand-red/50 to-transparent rounded-full group-hover:h-14 transition-all duration-300" />
                <div>
                  <p className="text-2xl sm:text-3xl font-black font-[family-name:var(--font-heading)] text-brand-white group-hover:text-brand-red transition-colors">
                    {stat.number}
                  </p>
                  <p className="text-[10px] sm:text-xs text-brand-gray uppercase tracking-widest font-semibold mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, type: "spring" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-brand-gray uppercase tracking-widest font-bold">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-brand-red animate-scroll-hint" />
      </motion.div>

      {/* Add shimmer keyframe dynamically or rely on Tailwind */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}} />
    </section>
  );
}
