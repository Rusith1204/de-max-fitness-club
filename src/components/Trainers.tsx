"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const trainers = [
  {
    name: "Kavindu Perera",
    role: "Head Coach & Bodybuilding Specialist",
    specialization: "Bodybuilding, Strength & Conditioning",
    experience: "8+ Years Experience",
    achievement: "Mr. Sabaragamuwa 2026 — Title Winner",
    image: "/images/champion.jpg",
    instagram: "#",
    facebook: "#",
  },
  {
    name: "Ashan Fernando",
    role: "Certified Personal Trainer",
    specialization: "Weight Loss, HIIT & Functional Training",
    experience: "5+ Years Experience",
    achievement: "NSCA Certified Professional",
    image: "/images/gallery-2.jpg",
    instagram: "#",
    facebook: "#",
  },
  {
    name: "Dimantha Silva",
    role: "Strength & Performance Coach",
    specialization: "Powerlifting & Athletic Performance",
    experience: "6+ Years Experience",
    achievement: "National Level Powerlifter",
    image: "/images/gallery-5.jpg",
    instagram: "#",
    facebook: "#",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 80, rotateX: -15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 20 
    } 
  },
};

export default function Trainers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="trainers"
      ref={ref}
      className="relative py-24 md:py-32 bg-brand-black overflow-hidden perspective-[1000px]"
    >
      {/* Background Parallax Element */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute bottom-0 left-1/3 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[150px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-brand-red text-sm font-bold uppercase tracking-[0.2em] bg-brand-red/10 px-4 py-1.5 rounded-full">
            Our Team
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-heading)] text-brand-white leading-[1.1]">
            Expert{" "}
            <span className="text-gradient-red">Trainers.</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-brand-red to-transparent rounded-full mx-auto mt-6" />
          <p className="mt-6 text-brand-gray text-lg">
            Our certified coaching staff brings years of competitive and
            professional experience to guide your fitness journey.
          </p>
        </motion.div>

        {/* Trainer Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {trainers.map((trainer, i) => (
            <motion.div
              key={trainer.name}
              variants={cardVariants}
              whileHover={{ y: -15 }}
              className="group relative rounded-[2rem] overflow-hidden shadow-2xl bg-brand-dark/50 border border-brand-slate/20"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Complex gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
                <div className="absolute inset-0 bg-brand-red/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Social links */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100">
                  <a
                    href={trainer.instagram}
                    className="w-12 h-12 glass rounded-full flex items-center justify-center text-brand-white hover:text-brand-red hover:bg-brand-white transition-all duration-300 shadow-lg"
                    aria-label={`${trainer.name} Instagram`}
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={trainer.facebook}
                    className="w-12 h-12 glass rounded-full flex items-center justify-center text-brand-white hover:text-brand-red hover:bg-brand-white transition-all duration-300 shadow-lg"
                    aria-label={`${trainer.name} Facebook`}
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Info Panel - Slides up on hover slightly */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-1 bg-gradient-to-r from-brand-red to-transparent rounded-full" />
                  <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">
                    {trainer.experience}
                  </span>
                </div>
                <h3 className="text-2xl font-black font-[family-name:var(--font-heading)] text-brand-white group-hover:text-brand-red transition-colors duration-300">
                  {trainer.name}
                </h3>
                <p className="text-sm font-semibold text-brand-gray mt-1">{trainer.role}</p>
                <p className="text-xs font-medium text-brand-gray-dark mt-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100 h-0 group-hover:h-auto">
                  {trainer.specialization}
                </p>
                {trainer.achievement && (
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 border border-brand-red/20 rounded-lg backdrop-blur-md">
                    <span className="text-xs font-bold text-brand-white">
                      🏆 <span className="text-brand-red">{trainer.achievement}</span>
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
