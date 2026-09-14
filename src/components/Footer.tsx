"use client";

import { Dumbbell, ArrowUp, Phone } from "lucide-react";

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

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Programs", href: "#programs" },
  { name: "Pricing", href: "#pricing" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const programLinks = [
  "Personal Training",
  "Bodybuilding & Strength",
  "Cardio & Fat Loss",
  "Group Classes",
  "Nutrition & Diet",
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-brand-darker border-t border-brand-slate/30">
      {/* Red gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 group">
              <Dumbbell className="w-7 h-7 text-brand-red" />
              <div className="flex items-baseline">
                <span className="text-2xl font-black font-[family-name:var(--font-heading)] text-brand-white">
                  දෙ
                </span>
                <span className="text-2xl font-black font-[family-name:var(--font-heading)] text-brand-red ml-0.5">
                  Max
                </span>
              </div>
            </a>
            <p className="mt-4 text-sm text-brand-gray leading-relaxed">
              Sri Lanka&apos;s elite fitness destination. Building champions
              through world-class training, modern equipment, and certified
              coaching.
            </p>
            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-brand-gray hover:text-brand-red hover:bg-brand-red/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-brand-gray hover:text-brand-red hover:bg-brand-red/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/94771234567"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-brand-gray hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold font-[family-name:var(--font-heading)] text-brand-white uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-gray hover:text-brand-red transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-slate group-hover:bg-brand-red transition-colors duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-bold font-[family-name:var(--font-heading)] text-brand-white uppercase tracking-wider mb-5">
              Programs
            </h4>
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link}>
                  <span className="text-sm text-brand-gray hover:text-brand-red transition-colors duration-300 flex items-center gap-2 group cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-slate group-hover:bg-brand-red transition-colors duration-300" />
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold font-[family-name:var(--font-heading)] text-brand-white uppercase tracking-wider mb-5">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-brand-gray-dark uppercase tracking-wider mb-1">
                  Address
                </p>
                <p className="text-sm text-brand-gray">
                  දෙ Max Fitness Club
                  <br />
                  Ratnapura, Sri Lanka
                </p>
              </div>
              <div>
                <p className="text-xs text-brand-gray-dark uppercase tracking-wider mb-1">
                  Phone
                </p>
                <p className="text-sm text-brand-gray">+94 77 123 4567</p>
              </div>
              <div>
                <p className="text-xs text-brand-gray-dark uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="text-sm text-brand-gray">
                  info@demaxfitness.lk
                </p>
              </div>
              <div>
                <p className="text-xs text-brand-gray-dark uppercase tracking-wider mb-1">
                  Hours
                </p>
                <p className="text-sm text-brand-gray">
                  Mon-Fri: 5AM - 10PM
                  <br />
                  Sat-Sun: 6AM - 8PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-slate/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-gray-dark text-center sm:text-left">
            © {new Date().getFullYear()} දෙ Max Fitness Club. All rights
            reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-brand-gray hover:text-brand-red hover:bg-brand-red/10 transition-all duration-300"
            aria-label="Scroll to top"
            id="back-to-top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
