"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "NEBULA",
    category: "Immersive Experience",
    description: "A WebGL-powered interactive universe exploring the boundaries of spatial computing and emotional storytelling.",
    tech: ["Three.js", "R3F", "GSAP", "WebGL"],
    year: "2026",
    size: "large",
  },
  {
    id: 2,
    title: "AETHER",
    category: "Luxury E-Commerce",
    description: "Next-generation fashion platform with real-time 3D product visualization and AI-powered styling.",
    tech: ["Next.js", "Three.js", "AI", "Stripe"],
    year: "2025",
    size: "medium",
  },
  {
    id: 3,
    title: "PRISM",
    category: "Creative Agency",
    description: "Award-winning agency website featuring scroll-driven 3D animations and cinematic page transitions.",
    tech: ["GSAP", "Lenis", "WebGL", "Framer"],
    year: "2025",
    size: "medium",
  },
  {
    id: 4,
    title: "VOID",
    category: "Art Installation",
    description: "An interactive audio-reactive installation commissioned for the Digital Arts Festival in Tokyo.",
    tech: ["Web Audio", "Canvas", "Shaders", "MIDI"],
    year: "2024",
    size: "large",
  },
  {
    id: 5,
    title: "SYNTH",
    category: "AI Dashboard",
    description: "Futuristic analytics dashboard with real-time data visualization and predictive AI insights.",
    tech: ["React", "D3.js", "WebSocket", "TensorFlow"],
    year: "2024",
    size: "small",
  },
  {
    id: 6,
    title: "ECHO",
    category: "Social Platform",
    description: "Decentralized social platform with 3D spatial rooms and real-time collaborative experiences.",
    tech: ["WebRTC", "Three.js", "IPFS", "Solidity"],
    year: "2023",
    size: "small",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    cardRef.current.style.transform = `perspective(1200px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    setIsHovered(false);
  };

  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-2",
    small: "md:col-span-1 md:row-span-1",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl overflow-hidden glass cursor-none ${sizeClasses[project.size as keyof typeof sizeClasses]}`}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-cursor="VIEW"
    >
      <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
        <div
          className="absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-80"
          style={{
            background: `linear-gradient(160deg, rgba(200,85,255,0.1) 0%, #0a0a0f 50%, rgba(160,60,255,0.06) 100%)`,
          }}
        />

        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            <defs>
              <pattern id={`grid-${project.id}`} width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="0.5" fill="#c855ff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
          </svg>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(200, 85, 255, 0.08) 0%, transparent 60%)`,
              }}
            />
          )}
        </AnimatePresence>

        <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="px-3 py-1 rounded-full glass text-[10px] font-mono text-white/60">
            {project.year}
          </span>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
                {project.category}
              </span>
              <motion.div
                animate={{ x: isHovered ? 4 : 0, y: isHovered ? -4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="w-4 h-4 text-white/40" />
              </motion.div>
            </div>

            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-white group-hover:text-violet transition-colors duration-500 tracking-[-0.02em]">
              {project.title}
            </h3>

            <p className="text-sm text-white/60 leading-relaxed max-w-sm line-clamp-2 group-hover:text-white/80 transition-colors duration-500">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.1em] rounded-full bg-white/[0.06] text-white/60 border border-white/[0.08] group-hover:bg-white/[0.1] group-hover:text-white/80 transition-all duration-500"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.08]">
          <motion.div
            className="h-full bg-violet/50"
            initial={{ width: "0%" }}
            animate={isHovered ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-40 md:py-56 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <motion.div
        className="absolute top-32 left-8 font-display text-[15vw] leading-none text-white/[0.03] pointer-events-none select-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
      >
        WORK
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <motion.div style={{ y: headerY }} className="mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-violet mb-6"
              >
                Selected Works — 02
              </motion.span>

              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em]">
                FEATURED<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet to-violet-electric">
                  PROJECTS
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
                A curated selection of projects that push the boundaries of what's possible on the web.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 h-[1px] bg-white/[0.1] origin-left"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[320px]">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 flex justify-end"
        >
          <MagneticButton
            href="#"
            strength={0.15}
            className="group flex items-center gap-3 px-8 py-4 rounded-full glass text-white/70 font-mono text-xs uppercase tracking-[0.2em] hover:text-white hover:bg-white/[0.08] transition-all duration-500"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
