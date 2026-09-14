"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What are your gym operating hours?",
    answer:
      "We are open 7 days a week! Weekdays: 5:00 AM – 10:00 PM, Saturdays: 6:00 AM – 8:00 PM, Sundays & Holidays: 7:00 AM – 6:00 PM.",
  },
  {
    question: "Do I need prior fitness experience to join?",
    answer:
      "Not at all! දෙ Max Fitness Club welcomes everyone from absolute beginners to competitive athletes. Our trainers will assess your fitness level and create a personalized plan for you.",
  },
  {
    question: "Can I get a free trial before committing?",
    answer:
      "Yes! We offer a complimentary one-day trial pass so you can experience our facilities, equipment, and atmosphere before making a decision. Simply fill out the contact form or visit us directly.",
  },
  {
    question: "What's included in the VIP Platinum membership?",
    answer:
      "The VIP Platinum membership includes full gym access, unlimited group classes, 4 personal trainer sessions per month, a customized nutrition plan, priority equipment booking, VIP locker & amenities, monthly body composition scans, a free supplements starter kit, and 2 guest passes per month.",
  },
  {
    question: "Do you provide nutrition and diet plans?",
    answer:
      "Yes! Our Standard and VIP members receive nutritional guidance. VIP Platinum members get a fully customized nutrition plan created by our in-house nutritionist, tailored to their specific fitness goals.",
  },
  {
    question: "Is there parking available at the gym?",
    answer:
      "Yes, we have free parking available for all members. Our facility includes designated parking spaces and the area is well-lit and secure.",
  },
  {
    question: "Can I freeze or pause my membership?",
    answer:
      "Yes, members can freeze their membership for up to 30 days per year for medical or travel reasons. Please contact our front desk for the freeze request process.",
  },
  {
    question: "Do you offer group classes? What types?",
    answer:
      "We offer a variety of group classes including Aerobics, Functional Fitness, Conditioning, HIIT, and more. Group classes are included in Standard and VIP memberships.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 bg-brand-dark overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand-red/5 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black font-[family-name:var(--font-heading)] text-brand-white leading-tight">
            Frequently Asked{" "}
            <span className="text-gradient-red">Questions</span>
          </h2>
          <div className="section-divider mt-4 mx-auto" />
        </motion.div>

        {/* Accordion */}
        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-light rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                aria-expanded={openIndex === i}
                id={`faq-${i}`}
              >
                <span
                  className={`text-sm md:text-base font-semibold transition-colors duration-300 pr-4 ${
                    openIndex === i ? "text-brand-red" : "text-brand-white group-hover:text-brand-red"
                  }`}
                >
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-colors duration-300 ${
                      openIndex === i ? "text-brand-red" : "text-brand-gray"
                    }`}
                  />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <div className="w-full h-px bg-gradient-to-r from-brand-red/20 via-brand-slate to-transparent mb-4" />
                      <p className="text-sm md:text-base text-brand-gray leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
