"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`flex items-center gap-0.5 px-2 py-2 rounded-full transition-all duration-700 ${
            isScrolled
              ? "glass-strong shadow-2xl shadow-violet/[0.05]"
              : "bg-transparent"
          }`}
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className="px-4 py-2 font-display text-sm tracking-[0.2em] text-white hover:text-violet transition-colors duration-500"
            data-cursor="HOME"
          >
            R<span className="text-violet">A</span>Z<span className="text-violet">E</span>
          </a>

          <div className="w-px h-3 bg-white/[0.15] mx-2" />

          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative px-4 py-2 text-[10px] font-mono uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-500"
              data-cursor={item.label.toUpperCase()}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {activeSection === item.href.replace("#", "") && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/[0.08] rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {hoveredItem === item.label && (
                <motion.div
                  layoutId="hoverNav"
                  className="absolute inset-0 bg-violet/[0.1] rounded-full border border-violet/[0.2]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              <span className="relative z-10">{item.label}</span>
            </motion.a>
          ))}

          <div className="w-px h-3 bg-white/[0.15] mx-2" />

          {/* Hire Me — Dark, highly visible */}
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#contact");
            }}
            className="px-5 py-2.5 text-[10px] font-mono uppercase tracking-[0.15em] bg-[#1a1a2e] text-white rounded-full border border-white/20 hover:bg-violet hover:border-violet hover:text-white transition-all duration-500 shadow-lg shadow-black/30"
            data-cursor="HIRE"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me
          </motion.a>
        </div>
      </motion.nav>

      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-violet/40 z-[101]"
        style={{ scaleX: scrollProgress, transformOrigin: "left" }}
      />
    </>
  );
}
