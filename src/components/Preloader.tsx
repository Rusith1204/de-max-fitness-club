"use client";

import { useEffect, useState } from "react";
import anime from "animejs";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    // Timeline for preloader animation
    const tl = anime.timeline({
      easing: "easeOutExpo",
      complete: () => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 800); // Wait for fade out
      },
    });

    tl.add({
      targets: ".preloader-logo-part",
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(200),
    })
      .add(
        {
          targets: ".preloader-line",
          scaleX: [0, 1],
          duration: 1000,
          easing: "easeInOutQuart",
        },
        "-=400"
      )
      .add({
        targets: ".preloader-logo-part, .preloader-line",
        opacity: [1, 0],
        translateY: [0, -20],
        duration: 600,
        delay: anime.stagger(100),
      });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black transition-opacity duration-800 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-baseline overflow-hidden pb-2">
          <span className="preloader-logo-part text-4xl sm:text-6xl font-black font-[family-name:var(--font-heading)] text-brand-white translate-y-12 opacity-0">
            දෙ
          </span>
          <span className="preloader-logo-part text-4xl sm:text-6xl font-black font-[family-name:var(--font-heading)] text-brand-red ml-2 translate-y-12 opacity-0">
            Max
          </span>
        </div>
        <div className="w-full h-1 mt-4 bg-brand-slate-light overflow-hidden rounded-full relative">
          <div className="preloader-line absolute top-0 left-0 h-full w-full bg-brand-red origin-left scale-x-0 rounded-full" />
        </div>
      </div>
    </div>
  );
}
