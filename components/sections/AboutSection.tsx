"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { BlurRevealText } from "@/components/effects/KineticText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (!textRef.current) return;
    const words = textRef.current.querySelectorAll(".word");

    gsap.fromTo(
      words,
      { opacity: 0.2, filter: "blur(12px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.04,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          end: "top 40%",
          scrub: 1.5,
        },
      }
    );
  }, []);

  const headingWords = "CREATING DIGITAL EXPERIENCES THAT FEEL ALIVE".split(" ");

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-40 md:py-56 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute inset-0 gradient-mesh opacity-40" />

      <motion.div
        className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-violet/10 blur-[120px]"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-violet-electric/8 blur-[150px]"
        style={{ y: y2 }}
      />

      <motion.div
        className="absolute top-20 right-8 md:right-20 font-display text-[20vw] leading-none text-white/[0.04] pointer-events-none select-none"
        style={{ rotate }}
      >
        01
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          <div className="lg:col-span-7 lg:-mt-20">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-violet mb-6"
            >
              About Me — 01
            </motion.span>

            <div ref={textRef}>
              <h2 className="font-display text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-[-0.02em]">
                {headingWords.map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.25em] text-white">
                    {word}
                  </span>
                ))}
              </h2>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 h-[2px] w-24 bg-violet origin-left"
            />
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:mt-32 space-y-10">
            <BlurRevealText
              text="I am a multidisciplinary creative director and frontend engineer based in the digital frontier. With over 8 years of experience crafting immersive web experiences, I specialize in bridging the gap between cutting-edge technology and emotional design."
              className="text-base md:text-lg text-white/70 leading-[1.7] font-body"
              delay={0.3}
            />

            <BlurRevealText
              text="My work has been recognized by Awwwards, CSS Design Awards, and FWA, with features in publications like Web Designer Magazine and Codrops. I believe every pixel should serve a purpose, and every interaction should feel intentional."
              className="text-base md:text-lg text-white/70 leading-[1.7] font-body"
              delay={0.6}
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-2 gap-4 pt-6"
            >
              {[
                { label: "Design Systems", value: "Expert" },
                { label: "WebGL / Three.js", value: "Advanced" },
                { label: "Motion Design", value: "Expert" },
                { label: "Creative Direction", value: "Expert" },
              ].map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
                  className="group p-5 rounded-xl glass hover:bg-white/[0.06] transition-all duration-700"
                >
                  <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/50 mb-2">
                    {skill.label}
                  </div>
                  <div className="font-display text-xl text-white group-hover:text-violet transition-colors duration-500">
                    {skill.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-12 -ml-4 md:-ml-8 pl-6 md:pl-8 border-l-2 border-violet/30"
            >
              <p className="text-lg md:text-xl font-display italic text-white/80 leading-relaxed">
                "Design is not just what it looks like. Design is how it works, how it feels, and how it moves you."
              </p>
            </motion.blockquote>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
