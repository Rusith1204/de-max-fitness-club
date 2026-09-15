"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", preferredTime: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 md:py-28 bg-brand-black overflow-hidden"
    >
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black font-[family-name:var(--font-heading)] text-brand-white leading-tight">
            Contact{" "}
            <span className="text-gradient-red">Us</span>
          </h2>
          <div className="section-divider mt-4 mx-auto" />
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-brand-gray mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-slate rounded-lg text-brand-white placeholder-brand-gray-dark focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30 transition-all duration-300 text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-brand-gray mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-slate rounded-lg text-brand-white placeholder-brand-gray-dark focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30 transition-all duration-300 text-sm"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-brand-gray mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-slate rounded-lg text-brand-white placeholder-brand-gray-dark focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30 transition-all duration-300 text-sm"
                    placeholder="+94 77 123 4567"
                  />
                </div>
                <div>
                  <label
                    htmlFor="preferredTime"
                    className="block text-sm font-medium text-brand-gray mb-2"
                  >
                    Preferred Time
                  </label>
                  <select
                    id="preferredTime"
                    value={formData.preferredTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredTime: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-slate rounded-lg text-brand-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30 transition-all duration-300 text-sm appearance-none"
                  >
                    <option value="">Select a time</option>
                    <option value="morning">Morning (5AM - 9AM)</option>
                    <option value="midday">Midday (9AM - 2PM)</option>
                    <option value="afternoon">Afternoon (2PM - 6PM)</option>
                    <option value="evening">Evening (6PM - 10PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-brand-gray mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-brand-dark border border-brand-slate rounded-lg text-brand-white placeholder-brand-gray-dark focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30 transition-all duration-300 text-sm resize-none"
                  placeholder="Tell us about your fitness goals..."
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full py-3.5 bg-brand-red hover:bg-brand-red-light text-white font-bold rounded-lg btn-glow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                id="contact-submit"
              >
                {formStatus === "submitting" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : formStatus === "success" ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Info cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-light rounded-xl p-5 group hover:border-brand-red/20 transition-all duration-300">
                <MapPin className="w-6 h-6 text-brand-red mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-brand-white text-sm">
                  Location
                </h4>
                <p className="text-sm text-brand-gray mt-1">
                  දෙ Max Fitness Club, kegalle, Rambukkana, Sri Lanka
                </p>
              </div>
              <div className="glass-light rounded-xl p-5 group hover:border-brand-red/20 transition-all duration-300">
                <Phone className="w-6 h-6 text-brand-red mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-brand-white text-sm">
                  Phone
                </h4>
                <p className="text-sm text-brand-gray mt-1">
                  +94 77 123 4567
                </p>
              </div>
              <div className="glass-light rounded-xl p-5 group hover:border-brand-red/20 transition-all duration-300">
                <Mail className="w-6 h-6 text-brand-red mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-brand-white text-sm">
                  Email
                </h4>
                <p className="text-sm text-brand-gray mt-1">
                  info@demaxfitness.lk
                </p>
              </div>
              <div className="glass-light rounded-xl p-5 group hover:border-brand-red/20 transition-all duration-300">
                <Clock className="w-6 h-6 text-brand-red mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-brand-white text-sm">
                  Hours
                </h4>
                <p className="text-sm text-brand-gray mt-1">
                  Weekdays: 5AM - 10PM
                  <br />
                  Weekends: 6AM - 8PM
                </p>
              </div>
            </div>

            {/* WhatsApp button */}
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3.5 bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/40 rounded-xl text-sm font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with us on WhatsApp
            </a>

            {/* Google Maps */}
            <div className="rounded-xl overflow-hidden border border-brand-slate h-64 lg:h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63382.29876698285!2d80.3684!3d6.6828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3bf2c9c0b8d7f%3A0x9b3a0b6b6c2a3f0b!2sRatnapura%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1699999999999"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="දෙ Max Fitness Club Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
