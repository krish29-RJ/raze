"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    id: 1,
    role: "Creative Director",
    company: "Studio Aether",
    period: "2024 — Present",
    description: "Leading a team of 12 designers and developers to create award-winning digital experiences for Fortune 500 clients. Established the studio's creative vision and technical direction.",
    highlights: ["Led 15+ projects", "Awwwards SOTD x3", "Team growth 300%"],
  },
  {
    id: 2,
    role: "Senior Frontend Engineer",
    company: "Nebula Labs",
    period: "2022 — 2024",
    description: "Spearheaded the development of immersive WebGL experiences and design systems for enterprise clients. Mentored junior developers and established coding standards.",
    highlights: ["WebGL architecture", "Performance optimization", "Mentoring"],
  },
  {
    id: 3,
    role: "Lead Designer",
    company: "Prism Digital",
    period: "2020 — 2022",
    description: "Directed the visual identity and digital presence for luxury brands and tech startups across 3 continents. Built a design system used by 20+ products.",
    highlights: ["Brand systems", "Motion design", "Client relations"],
  },
  {
    id: 4,
    role: "Frontend Developer",
    company: "Void Interactive",
    period: "2018 — 2020",
    description: "Built interactive installations and experimental web experiences for museums and art galleries. Contributed to open-source WebGL libraries.",
    highlights: ["Interactive installations", "Canvas animations", "Open source"],
  },
];

function ExperienceCard({ experience, index }: { experience: typeof experiences[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start ${isEven ? "" : "lg:flex-row-reverse"}`}>

        <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-end gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
            className="w-3 h-3 rounded-full bg-space border-2 border-violet/60 relative z-10"
          />
          <div className="lg:w-[1px] lg:h-full w-full h-[1px] bg-white/[0.1] lg:min-h-[200px]" />
        </div>

        <div className={`lg:col-span-11 ${isEven ? "" : "lg:order-first"}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.2 }}
            className="group p-6 md:p-8 rounded-2xl glass hover:bg-white/[0.05] transition-all duration-700"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-violet">
                    {experience.period}
                  </span>
                  <span className="text-[10px] font-mono text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-white group-hover:text-violet transition-colors duration-500 tracking-[-0.01em]">
                  {experience.role}
                </h3>
                <p className="text-white/60 font-mono text-sm">{experience.company}</p>
              </div>
            </div>

            <p className="text-white/60 leading-[1.7] mb-6 max-w-2xl">
              {experience.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {experience.highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.1em] rounded-full bg-violet/[0.1] text-violet/90 border border-violet/[0.2]"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-40 md:py-56 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute inset-0 gradient-mesh opacity-20" />

      <motion.div
        className="absolute bottom-40 right-8 font-display text-[15vw] leading-none text-white/[0.02] pointer-events-none select-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
      >
        EXP
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <motion.div style={{ y: headerY }} className="mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-6">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-violet mb-6"
              >
                Career Path — 03
              </motion.span>

              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em]">
                PROFESSIONAL<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet to-violet-electric">
                  JOURNEY
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white/60 max-w-md text-base leading-relaxed"
              >
                Eight years of crafting digital experiences across agencies, startups, and creative studios worldwide.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 h-[1px] bg-white/[0.1] origin-left max-w-lg"
          />
        </motion.div>

        <div className="space-y-16 md:space-y-20">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
