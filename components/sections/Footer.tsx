"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 md:py-20 px-6 md:px-12 lg:px-20 border-t border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-display text-2xl tracking-[0.2em] text-white">
              R<span className="text-violet">A</span>Z<span className="text-violet">E</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {["Home", "About", "Projects", "Experience", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/50 hover:text-violet transition-colors duration-500"
                data-cursor="LINK"
              >
                {link}
              </a>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-white/50 hover:text-violet transition-colors duration-500"
            data-cursor="TOP"
          >
            Back to Top
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="my-10 h-[1px] bg-white/[0.08] origin-center"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/30"
        >
          <span>© 2026 RAZE. All rights reserved.</span>
          <span className="flex items-center gap-2">
            Crafted with
            <span className="text-violet/70">Next.js</span>
            <span className="text-white/20">+</span>
            <span className="text-violet/70">Three.js</span>
            <span className="text-white/20">+</span>
            <span className="text-violet/70">Passion</span>
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
