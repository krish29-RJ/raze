"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { HeroVisual } from "@/components/effects/HeroVisual";
import { useMouse } from "@/hooks/useMouse";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mouse = useMouse(0.06);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.8 });

      tl.fromTo(
        ".hero-line",
        { y: 120, opacity: 0, rotateX: -40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        }
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-stat",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out" },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden"
    >
      <HeroVisual mouse={{ x: mouse.normalizedX, y: mouse.normalizedY }} />

      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20"
        style={{ y, opacity, scale }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end min-h-screen pb-32">

          {/* Left column — Social Icons */}
          <div className="lg:col-span-2 hidden lg:flex flex-col justify-between h-[60vh] py-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4, duration: 1 }}
            >
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass text-[10px] font-mono uppercase tracking-[0.25em] text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
                Available
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 1 }}
              className="flex flex-col gap-5"
            >
              {[
                { icon: "X", label: "Twitter", href: "#" },
                { icon: "Ig", label: "Instagram", href: "#" },
                { icon: "Li", label: "LinkedIn", href: "#" },
                { icon: "Gh", label: "GitHub", href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="group flex items-center gap-3 text-white/70 hover:text-violet transition-all duration-500"
                  data-cursor="LINK"
                >
                  <span className="w-9 h-9 rounded-lg glass flex items-center justify-center group-hover:bg-violet/20 group-hover:border-violet/40 transition-all duration-500">
                    <span className="text-[11px] font-mono font-bold tracking-tight">{social.icon}</span>
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                    {social.label}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Center column */}
          <div ref={titleRef} className="lg:col-span-7 perspective-1000">
            <div className="space-y-1 md:space-y-2">
              <div className="overflow-hidden">
                <div
                  className="hero-line font-display text-[13vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-[-0.03em] text-white"
                  style={{
                    transform: `translate3d(${mouse.normalizedX * 5}px, ${mouse.normalizedY * 3}px, 0)`,
                    textShadow: '0 0 40px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.8)',
                  }}
                >
                  CREATIVE
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className="hero-line font-display text-[13vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-violet via-violet-electric to-violet"
                  style={{
                    transform: `translate3d(${mouse.normalizedX * 8}px, ${mouse.normalizedY * 5}px, 0)`,
                    filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.8))',
                  }}
                >
                  DIRECTOR
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className="hero-line font-display text-[10vw] md:text-[7vw] lg:text-[5.5vw] leading-[0.9] tracking-[-0.02em] text-white/95"
                  style={{
                    transform: `translate3d(${mouse.normalizedX * 3}px, ${mouse.normalizedY * 2}px, 0)`,
                    textShadow: '0 0 40px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.8)',
                  }}
                >
                  & DIGITAL DESIGNER
                </div>
              </div>
            </div>

            <p
              ref={subtitleRef}
              className="mt-6 text-base md:text-lg text-white/80 max-w-md font-body leading-relaxed"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
            >
              Crafting immersive experiences that blur the line between{" "}
              <span className="text-white">art</span> and{" "}
              <span className="text-white">technology</span>
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
              <MagneticButton
                href="#projects"
                strength={0.2}
                className="hero-cta group relative px-8 py-4 rounded-full bg-violet/25 text-violet font-mono text-xs uppercase tracking-[0.2em] border border-violet/60 hover:bg-violet/35 hover:border-violet/80 transition-all duration-500 overflow-hidden backdrop-blur-sm"
              >
                <span className="relative z-10">View Projects</span>
              </MagneticButton>

              <MagneticButton
                href="#contact"
                strength={0.2}
                className="hero-cta px-8 py-4 rounded-full glass text-white/90 font-mono text-xs uppercase tracking-[0.2em] hover:text-white hover:bg-white/10 transition-all duration-500 backdrop-blur-sm"
              >
                Get in Touch
              </MagneticButton>
            </div>
          </div>

          {/* Right column — STATS (fixed to stay visible) */}
          <div ref={statsRef} className="lg:col-span-3 hidden lg:flex flex-col justify-between h-[60vh] py-8 items-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4, duration: 1 }}
              className="text-right"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
                EST. 2026
              </span>
            </motion.div>

            <div className="space-y-8 text-right">
              {[
                { value: "50+", label: "Projects Delivered" },
                { value: "8+", label: "Years Experience" },
                { value: "30+", label: "Awards Won" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="hero-stat"
                >
                  <div className="font-display text-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{stat.value}</div>
                  <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5, duration: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/50 writing-vertical h-16">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[3px] h-[3px] rounded-full bg-white/70"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-space to-transparent z-10 pointer-events-none" />
    </section>
  );
}
