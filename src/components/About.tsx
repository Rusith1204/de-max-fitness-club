"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { Target, Award, Clock, Users } from "lucide-react";
import anime from "animejs";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const obj = { val: 0 };
      anime({
        targets: obj,
        val: target,
        round: 1,
        easing: "easeOutExpo",
        duration: 3000,
        update: function () {
          if (ref.current) {
            ref.current.innerHTML = obj.val + suffix;
          }
        },
      });
    }
  }, [isInView, target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { icon: Users, number: 1000, suffix: "+", label: "Active Members" },
  { icon: Award, number: 15, suffix: "+", label: "Certified Trainers" },
  { icon: Target, number: 50, suffix: "+", label: "Modern Equipment" },
  { icon: Clock, number: 7, suffix: "", label: "Days a Week" },
];

// Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 md:py-32 bg-brand-dark overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-red/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Side - Staggered reveal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <motion.div variants={itemVariants} className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-brand-black/50">
              <Image
                src="/images/focus.jpg"
                alt="දෙ Max Fitness Club — Focus and Dedication"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent" />
            </motion.div>
            
            {/* Floating badge with spring bounce */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="absolute -bottom-6 -right-4 sm:bottom-10 sm:-right-8 glass px-8 py-5 rounded-2xl backdrop-blur-xl border border-brand-red/20 shadow-xl"
            >
              <p className="text-4xl font-black font-[family-name:var(--font-heading)] text-brand-red">
                Est. 2024
              </p>
              <p className="text-xs font-bold text-brand-white uppercase tracking-[0.2em] mt-1">
                Building Champions
              </p>
            </motion.div>

            {/* Red line accent */}
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={isInView ? { height: 96, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="absolute top-12 -left-6 w-1 bg-gradient-to-b from-brand-red to-transparent rounded-full" 
            />
          </motion.div>

          {/* Content Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span variants={itemVariants} className="inline-block text-brand-red text-sm font-bold uppercase tracking-[0.2em] bg-brand-red/10 px-3 py-1 rounded-full mb-4">
              About Us
            </motion.span>
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-heading)] text-brand-white leading-[1.1]">
              Where Champions{" "}
              <span className="text-gradient-red block mt-2">Are Built.</span>
            </motion.h2>
            
            <motion.div variants={itemVariants} className="w-24 h-1.5 bg-gradient-to-r from-brand-red to-brand-red/10 rounded-full mt-6" />
            
            <motion.p variants={itemVariants} className="mt-8 text-brand-gray leading-relaxed text-lg">
              At{" "}
              <span className="text-brand-white font-bold">
                දෙ Max Fitness Club
              </span>
              , we believe in more than just fitness — we believe in ultimate transformation.
              Our state-of-the-art facility is equipped with over 50 pieces of
              modern, high-tech equipment, backed by a team of elite certified
              trainers.
            </motion.p>
            <motion.p variants={itemVariants} className="mt-4 text-brand-gray leading-relaxed text-lg">
              Whether you&apos;re a beginner stepping into the gym for the first
              time or a seasoned athlete preparing for competition, our
              supportive environment ensures everyone finds their path to greatness.
            </motion.p>

            {/* Key highlights */}
            <motion.div variants={itemVariants} className="mt-10 grid grid-cols-2 gap-y-4 gap-x-2">
              {[
                "High-Tech Equipment",
                "Certified Trainers",
                "24/7 Support",
                "Nutrition Plans",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0 group-hover:bg-brand-red/20 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-brand-red group-hover:scale-150 transition-transform duration-300" />
                  </div>
                  <span className="text-sm font-semibold text-brand-white">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section with Anime.js Counters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, type: "spring", bounce: 0.4 }}
          className="mt-20 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                whileHover={{ y: -10 }}
                key={stat.label}
                className="relative glass-light rounded-2xl p-8 text-center card-hover overflow-hidden group border border-brand-slate/50"
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Top border line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-red/50 to-transparent group-hover:via-brand-red transition-all duration-500" />
                
                <Icon className="w-8 h-8 text-brand-red mx-auto mb-4 group-hover:scale-125 transition-transform duration-500 ease-out" />
                <p className="text-4xl sm:text-5xl font-black font-[family-name:var(--font-heading)] text-brand-white tabular-nums tracking-tight">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs font-bold text-brand-gray uppercase tracking-widest group-hover:text-brand-white transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
