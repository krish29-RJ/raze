"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Demo)");
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-40 md:py-56 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute inset-0 gradient-mesh opacity-40" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet/[0.04] blur-[200px] pointer-events-none" />

      <div className="absolute bottom-20 right-8 font-display text-[12vw] leading-none text-white/[0.02] pointer-events-none select-none">
        HI
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5 lg:-mt-8">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-violet mb-6"
            >
              Get in Touch — 05
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em] mb-10"
            >
              LET'S BUILD<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet to-violet-electric">
                SOMETHING
              </span><br />
              UNFORGETTABLE
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/70 text-base leading-[1.7] mb-12 max-w-md"
            >
              Whether you have a project in mind, want to collaborate, or just want to say hello — 
              I'd love to hear from you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              {[
                { icon: Mail, label: "Email", value: "hello@raze.design" },
                { icon: MapPin, label: "Location", value: "Digital Nomad / Earth" },
                { icon: Calendar, label: "Availability", value: "Open for Q3 2026" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center group-hover:bg-violet/[0.15] transition-colors duration-500">
                    <item.icon className="w-4 h-4 text-violet" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/40">{item.label}</div>
                    <div className="text-sm text-white/80 group-hover:text-white transition-colors duration-500">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-12 flex flex-wrap gap-3"
            >
              {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="px-4 py-2 rounded-full glass text-[10px] font-mono uppercase tracking-[0.15em] text-white/60 hover:text-violet hover:border-violet/40 transition-all duration-500"
                  data-cursor="LINK"
                >
                  {social}
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 lg:col-start-7 lg:mt-24"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === "name" || formState.name ? -28 : 0,
                    scale: focusedField === "name" || formState.name ? 0.8 : 1,
                    color: focusedField === "name" ? "rgba(200,85,255,0.9)" : "rgba(255,255,255,0.4)",
                  }}
                  className="absolute left-0 top-4 text-xs font-mono uppercase tracking-[0.15em] origin-left pointer-events-none"
                >
                  Your Name
                </motion.label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b border-white/[0.12] py-4 text-white text-lg focus:outline-none focus:border-violet/60 transition-colors duration-500"
                  required
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-violet/60"
                  initial={{ width: "0%" }}
                  animate={{ width: focusedField === "name" ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === "email" || formState.email ? -28 : 0,
                    scale: focusedField === "email" || formState.email ? 0.8 : 1,
                    color: focusedField === "email" ? "rgba(200,85,255,0.9)" : "rgba(255,255,255,0.4)",
                  }}
                  className="absolute left-0 top-4 text-xs font-mono uppercase tracking-[0.15em] origin-left pointer-events-none"
                >
                  Email Address
                </motion.label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b border-white/[0.12] py-4 text-white text-lg focus:outline-none focus:border-violet/60 transition-colors duration-500"
                  required
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-violet/60"
                  initial={{ width: "0%" }}
                  animate={{ width: focusedField === "email" ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <div className="relative">
                <motion.label
                  animate={{
                    y: focusedField === "message" || formState.message ? -28 : 0,
                    scale: focusedField === "message" || formState.message ? 0.8 : 1,
                    color: focusedField === "message" ? "rgba(200,85,255,0.9)" : "rgba(255,255,255,0.4)",
                  }}
                  className="absolute left-0 top-4 text-xs font-mono uppercase tracking-[0.15em] origin-left pointer-events-none"
                >
                  Your Message
                </motion.label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className="w-full bg-transparent border-b border-white/[0.12] py-4 text-white text-lg focus:outline-none focus:border-violet/60 transition-colors duration-500 resize-none"
                  required
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-violet/60"
                  initial={{ width: "0%" }}
                  animate={{ width: focusedField === "message" ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <MagneticButton
                strength={0.15}
                className="group relative w-full py-5 rounded-full bg-violet/[0.15] text-violet font-mono text-xs uppercase tracking-[0.2em] border border-violet/40 hover:bg-violet/[0.25] hover:border-violet/60 transition-all duration-500 overflow-hidden flex items-center justify-center gap-3 mt-4"
              >
                <span className="relative z-10">Send Message</span>
                <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
