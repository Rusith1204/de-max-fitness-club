"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";

const plans = [
  {
    name: "Basic",
    monthlyPrice: 3500,
    annualPrice: 35000,
    description: "General Gym Access",
    features: [
      "Full gym equipment access",
      "Locker room & showers",
      "Basic fitness assessment",
      "Open 7 days a week",
      "Free parking",
    ],
    notIncluded: [
      "Group classes",
      "Personal trainer sessions",
      "Nutrition consultation",
    ],
    popular: false,
  },
  {
    name: "Standard",
    monthlyPrice: 5500,
    annualPrice: 55000,
    description: "General + Group Classes",
    features: [
      "Everything in Basic",
      "Unlimited group classes",
      "Aerobics & functional fitness",
      "Monthly progress check-in",
      "Workout plan included",
      "Towel service",
    ],
    notIncluded: ["Personal trainer sessions", "Nutrition consultation"],
    popular: true,
  },
  {
    name: "VIP Platinum",
    monthlyPrice: 9500,
    annualPrice: 95000,
    description: "All-Access + Personal Trainer",
    features: [
      "Everything in Standard",
      "4 personal trainer sessions/month",
      "Customized nutrition plan",
      "Priority equipment booking",
      "VIP locker & amenities",
      "Monthly body composition scan",
      "Free supplements starter kit",
      "Guest pass (2/month)",
    ],
    notIncluded: [],
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: any = {
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

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative py-24 md:py-32 bg-brand-dark overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-brand-red text-sm font-bold uppercase tracking-[0.2em] bg-brand-red/10 px-4 py-1.5 rounded-full">
            Membership Plans
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black font-[family-name:var(--font-heading)] text-brand-white leading-[1.1]">
            Choose Your{" "}
            <span className="text-gradient-red">Path.</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-brand-red to-transparent rounded-full mx-auto mt-6" />

          {/* Toggle */}
          <div className="mt-10 flex items-center justify-center gap-6 glass-light w-max mx-auto p-2 rounded-full border border-brand-slate/50 shadow-lg">
            <span
              className={`text-sm font-bold tracking-wide transition-colors ${
                !isAnnual ? "text-brand-white" : "text-brand-gray"
              } pl-4`}
            >
              MONTHLY
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full transition-colors duration-500 ease-in-out ${
                isAnnual ? "bg-brand-red" : "bg-brand-slate-light"
              }`}
              id="pricing-toggle"
              aria-label="Toggle between monthly and annual pricing"
            >
              <motion.div
                layout
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                style={{ left: isAnnual ? "calc(100% - 28px)" : "4px" }}
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
              />
            </button>
            <span
              className={`text-sm font-bold tracking-wide transition-colors ${
                isAnnual ? "text-brand-white" : "text-brand-gray"
              } pr-4`}
            >
              ANNUAL{" "}
              <span className="text-brand-red text-xs bg-brand-red/10 px-2 py-1 rounded-md ml-2">
                -17%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards - Staggered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 grid md:grid-cols-3 gap-8 lg:gap-10 items-center"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`relative rounded-3xl p-8 lg:p-10 card-hover ${
                plan.popular
                  ? "bg-gradient-to-b from-brand-dark to-[#1a1012] border-2 border-brand-red/50 shadow-[0_0_40px_rgba(229,9,20,0.2)] md:scale-105 z-10"
                  : "glass-light border border-brand-slate/30"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2 bg-brand-red rounded-full shadow-lg shadow-brand-red/30">
                  <Star className="w-4 h-4 text-white fill-white" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-2xl font-black font-[family-name:var(--font-heading)] text-brand-white uppercase tracking-wide">
                {plan.name}
              </h3>
              <p className="text-sm font-medium text-brand-gray mt-2">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-sm font-bold text-brand-gray uppercase">LKR</span>
                <div className="relative h-14 overflow-hidden flex-1">
                  <motion.div
                    initial={false}
                    animate={{ y: isAnnual ? -56 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <span className="h-14 text-5xl lg:text-6xl font-black font-[family-name:var(--font-heading)] text-brand-white tabular-nums tracking-tight">
                      {plan.monthlyPrice.toLocaleString()}
                    </span>
                    <span className="h-14 text-5xl lg:text-6xl font-black font-[family-name:var(--font-heading)] text-brand-white tabular-nums tracking-tight">
                      {plan.annualPrice.toLocaleString()}
                    </span>
                  </motion.div>
                </div>
                <span className="text-sm font-bold text-brand-gray uppercase">
                  /{isAnnual ? "year" : "month"}
                </span>
              </div>

              {/* Divider */}
              <div className={`my-8 h-px w-full ${plan.popular ? "bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" : "bg-gradient-to-r from-transparent via-brand-slate to-transparent"}`} />

              {/* Features */}
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0 border border-brand-red/20">
                      <Check className="w-3.5 h-3.5 text-brand-red" />
                    </div>
                    <span className="text-sm font-medium text-brand-gray">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-4 opacity-40"
                  >
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-brand-slate/30 flex items-center justify-center shrink-0 border border-brand-slate/20">
                      <span className="text-xs text-brand-gray">—</span>
                    </div>
                    <span className="text-sm font-medium text-brand-gray line-through">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className={`mt-10 block w-full py-4 text-center font-bold rounded-xl text-sm uppercase tracking-widest transition-all duration-300 relative overflow-hidden group ${
                  plan.popular
                    ? "bg-brand-red text-white btn-glow border-none"
                    : "bg-transparent text-brand-white border border-brand-slate-light hover:border-brand-red"
                }`}
              >
                {plan.popular && <span className="absolute inset-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />}
                <span className="relative flex items-center justify-center gap-2">
                  {plan.popular && <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                  Get Started
                </span>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
