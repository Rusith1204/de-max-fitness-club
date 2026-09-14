"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Dumbbell, Flame, HeartPulse, Users, Apple, ArrowRight } from "lucide-react";

const programs = [
  {
    icon: Dumbbell,
    title: "Personal Training",
    description:
      "Tailored 1-on-1 coaching plans designed around your unique goals. Our certified trainers create customized workout routines, track your progress, and keep you accountable.",
  },
  {
    icon: Flame,
    title: "Bodybuilding & Strength",
    description:
      "Dedicated heavy-weight and resistance zones with premium equipment. Push your limits with progressive overload programs designed for serious muscle growth.",
  },
  {
    icon: HeartPulse,
    title: "Cardio & Fat Loss",
    description:
      "High-intensity interval training (HIIT) and state-of-the-art cardio decks. Burn fat, boost endurance, and transform your cardiovascular fitness.",
  },
  {
    icon: Users,
    title: "Group Classes",
    description:
      "Aerobics, Functional Fitness, and Conditioning sessions led by energetic instructors. Train with a community that motivates and inspires.",
  },
  {
    icon: Apple,
    title: "Nutrition & Diet",
    description:
      "Personalized meal guidance and diet consultation for members. Fuel your body with expert nutritional strategies tailored to your fitness goals.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15 
    } 
  },
};

export default function Programs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="programs"
      ref={ref}
      className="relative py-24 md:py-32 bg-brand-black overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-96 h-96 bg-brand-red/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-red/3 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-brand-red text-sm font-bold uppercase tracking-[0.2em] bg-brand-red/10 px-4 py-1.5 rounded-full">
            Our Programs
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-heading)] text-brand-white leading-[1.1]">
            Train Like a{" "}
            <span className="text-gradient-red">Champion.</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-brand-red to-transparent rounded-full mx-auto mt-6" />
          <p className="mt-6 text-brand-gray text-lg">
            From elite personal training to energetic group classes, we offer comprehensive
            programs to help you dominate your goals.
          </p>
        </motion.div>

        {/* Program Cards - Waterfall Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.title}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group glass-light rounded-3xl p-8 cursor-pointer border border-brand-slate/30 shadow-xl shadow-black/20"
              >
                {/* Glowing border top */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-brand-red/30 to-transparent group-hover:via-brand-red transition-all duration-700" />
                
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                {/* Icon Container */}
                <div className="relative w-16 h-16 rounded-2xl bg-brand-dark flex items-center justify-center mb-8 group-hover:bg-brand-red transition-colors duration-500 border border-brand-slate/50 group-hover:border-brand-red shadow-lg">
                  <Icon className="w-8 h-8 text-brand-red group-hover:text-white transition-colors duration-500" />
                  <div className="absolute -inset-2 bg-brand-red/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black font-[family-name:var(--font-heading)] text-brand-white mb-4 group-hover:text-brand-red transition-colors duration-300">
                  {program.title}
                </h3>
                <p className="text-brand-gray text-base leading-relaxed group-hover:text-brand-white transition-colors duration-300">
                  {program.description}
                </p>

                {/* Action Arrow */}
                <div className="mt-8 flex items-center gap-2 text-brand-gray font-bold uppercase tracking-widest text-xs group-hover:text-brand-red transition-colors duration-300">
                  Explore 
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
