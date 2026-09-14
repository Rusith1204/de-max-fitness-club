"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ravindu Jayasekara",
    role: "Bodybuilder, 2 Years Member",
    image: "/images/gallery-1.jpg",
    rating: 5,
    quote:
      "දෙ Max Fitness Club completely changed my life. The trainers here are world-class and the equipment is top-notch. I went from 68kg to competing at 82kg in under 2 years!",
  },
  {
    name: "Sachin Bandara",
    role: "Weight Loss Transformation",
    image: "/images/gallery-3.jpg",
    rating: 5,
    quote:
      "I lost 25kg in 8 months with the guidance of the trainers at දෙ Max. The nutrition plans and personalized workouts made all the difference. Can't recommend enough!",
  },
  {
    name: "Tharindu Kumara",
    role: "Fitness Enthusiast, 1 Year Member",
    image: "/images/gallery-7.jpg",
    rating: 5,
    quote:
      "The atmosphere at දෙ Max is electric. From the red-lit ambiance to the heavy metal playlist, everything is designed to push you beyond your limits. Best gym in Sri Lanka!",
  },
  {
    name: "Nimal Wickrama",
    role: "Strength Athlete",
    image: "/images/gallery-9.jpg",
    rating: 4,
    quote:
      "Amazing equipment, amazing coaches. The community here is supportive and the environment motivates you to be your best self every single day. Proud to be a member!",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev < testimonials.length - 1 ? prev + 1 : 0
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [autoplay, currentIndex]);

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 bg-brand-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">
            Success Stories
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black font-[family-name:var(--font-heading)] text-brand-white leading-tight">
            Member{" "}
            <span className="text-gradient-red">Testimonials</span>
          </h2>
          <div className="section-divider mt-4 mx-auto" />
        </motion.div>

        {/* Testimonial Slider */}
        <div
          className="mt-14 relative max-w-4xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative glass-light rounded-2xl p-8 md:p-12"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-red/10" />

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                {/* Avatar */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-brand-red/30 shrink-0">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                {/* Content */}
                <div className="text-center md:text-left flex-1">
                  {/* Stars */}
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonials[currentIndex].rating
                            ? "text-brand-red fill-brand-red"
                            : "text-brand-slate"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-brand-gray text-base md:text-lg leading-relaxed italic">
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </p>

                  {/* Name */}
                  <div className="mt-5">
                    <p className="text-lg font-bold font-[family-name:var(--font-heading)] text-brand-white">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm text-brand-red">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() =>
                setCurrentIndex(
                  currentIndex > 0
                    ? currentIndex - 1
                    : testimonials.length - 1
                )
              }
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-brand-gray hover:text-brand-red transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentIndex
                      ? "w-8 h-2 bg-brand-red"
                      : "w-2 h-2 bg-brand-slate hover:bg-brand-gray"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentIndex(
                  currentIndex < testimonials.length - 1
                    ? currentIndex + 1
                    : 0
                )
              }
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-brand-gray hover:text-brand-red transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
