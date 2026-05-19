"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const skills = [
  { name: "React / Next.js", level: 98, category: "Frontend" },
  { name: "TypeScript", level: 95, category: "Frontend" },
  { name: "Three.js / R3F", level: 92, category: "3D" },
  { name: "GSAP / Framer", level: 96, category: "Animation" },
  { name: "WebGL / Shaders", level: 88, category: "3D" },
  { name: "Tailwind CSS", level: 94, category: "Design" },
  { name: "Figma", level: 90, category: "Design" },
  { name: "Node.js", level: 85, category: "Backend" },
  { name: "Python / AI", level: 82, category: "Backend" },
  { name: "Web Audio", level: 78, category: "Creative" },
  { name: "Solidity", level: 75, category: "Web3" },
  { name: "Rust", level: 70, category: "Systems" },
];

function FloatingOrb({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.4 + position[0] * 2) * 0.2;
    meshRef.current.rotation.x = time * 0.08;
    meshRef.current.rotation.y = time * 0.12;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.2}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

function SkillsScene() {
  const orbs = useMemo(() => [
    { position: [-3, 0.5, -2] as [number, number, number], color: "#c855ff", scale: 0.6 },
    { position: [3, -0.5, -3] as [number, number, number], color: "#a855f7", scale: 0.5 },
    { position: [0, 1.5, -4] as [number, number, number], color: "#c855ff", scale: 0.35 },
    { position: [-1.5, -1.5, -1] as [number, number, number], color: "#a855f7", scale: 0.4 },
    { position: [2, 0.8, -2] as [number, number, number], color: "#c855ff", scale: 0.55 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#c855ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
      {orbs.map((orb, i) => (
        <FloatingOrb key={i} {...orb} />
      ))}
    </>
  );
}

function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={barRef}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-mono text-white/70 group-hover:text-white transition-colors duration-500">
          {skill.name}
        </span>
        <span className="text-[10px] font-mono text-white/40">{skill.level}%</span>
      </div>

      <div className="h-[2px] bg-white/[0.08] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.5, delay: index * 0.04 + 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-violet/50 relative"
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-violet" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-40 md:py-56 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
          <SkillsScene />
        </Canvas>
      </div>

      <div className="absolute inset-0 gradient-mesh opacity-25" />

      <div className="absolute top-32 left-8 font-display text-[12vw] leading-none text-white/[0.02] pointer-events-none select-none">
        TECH
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-20 md:mb-28">
          <div className="lg:col-span-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-violet mb-6"
            >
              Technical Arsenal — 04
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em]"
            >
              SKILLS &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet to-violet-electric">
                EXPERTISE
              </span>
            </motion.h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/60 max-w-md text-base leading-relaxed"
            >
              A constantly evolving toolkit built over years of crafting digital experiences across disciplines.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.2 }}
              className={`space-y-6 ${catIndex === 0 ? "lg:col-span-7" : catIndex === 1 ? "lg:col-span-5 lg:mt-16" : "lg:col-span-6 lg:col-start-4 lg:mt-8"}`}
            >
              <h3 className="font-display text-lg text-white/90 mb-8 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-violet" />
                {category}
              </h3>

              <div className="space-y-5">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} index={catIndex * 6 + i} />
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "12", label: "Technologies" },
            { value: "8+", label: "Years Coding" },
            { value: "50+", label: "Repositories" },
            { value: "∞", label: "Curiosity" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              className="text-center p-6 md:p-8 rounded-2xl glass hover:bg-white/[0.05] transition-all duration-700"
            >
              <div className="font-display text-4xl md:text-5xl text-violet mb-2">{stat.value}</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
