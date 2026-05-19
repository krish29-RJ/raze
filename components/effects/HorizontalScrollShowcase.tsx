"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const showcaseItems = [
  { num: "01", title: "NEBULA", subtitle: "Immersive Universe", year: "2026" },
  { num: "02", title: "AETHER", subtitle: "Luxury Platform", year: "2025" },
  { num: "03", title: "PRISM", subtitle: "Creative Agency", year: "2025" },
  { num: "04", title: "VOID", subtitle: "Art Installation", year: "2024" },
  { num: "05", title: "SYNTH", subtitle: "AI Dashboard", year: "2024" },
];

export function HorizontalScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const scrollWidth = scrollRef.current.scrollWidth - window.innerWidth;

    const tween = gsap.to(scrollRef.current, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-space">
      <div className="absolute top-12 left-8 z-20">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
          Selected Works — Scroll Horizontally
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex items-center h-full gap-0 pl-[10vw]"
        style={{ width: "max-content" }}
      >
        {showcaseItems.map((item, i) => (
          <motion.div
            key={i}
            className="relative flex-shrink-0 w-[70vw] md:w-[50vw] h-[70vh] mx-4 group cursor-none"
            data-cursor="VIEW"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-br opacity-40 transition-opacity duration-700 group-hover:opacity-60"
                style={{
                  background: `linear-gradient(135deg, rgba(176,38,255,0.15) 0%, #050505 60%, rgba(122,0,255,0.1) 100%)`,
                }}
              />

              {/* Animated noise texture */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }} />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-violet/10 blur-[100px]" />
              </div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-8 md:p-12">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                  {item.num}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">
                  {item.year}
                </span>
              </div>

              <div>
                <motion.h3
                  className="font-display text-5xl md:text-7xl lg:text-8xl text-offwhite leading-[0.9] tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet group-hover:to-violet-electric transition-all duration-500"
                >
                  {item.title}
                </motion.h3>
                <p className="mt-4 text-sm font-mono uppercase tracking-[0.2em] text-white/40">
                  {item.subtitle}
                </p>
              </div>

              {/* Bottom line */}
              <div className="relative h-[1px] bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-violet/50"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-3xl">
              <div className="absolute top-0 right-0 w-[1px] h-16 bg-white/10" />
              <div className="absolute top-0 right-0 w-16 h-[1px] bg-white/10" />
            </div>
          </motion.div>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-[20vw]" />
      </div>
    </section>
  );
}
