"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Image from "next/image";

// Floating particles near hands
function HandParticles({ mouse }: { mouse: { x: number; y: number } }) {
  const mesh = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const count = 200;
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;

      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = Math.random() * 0.005 + 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return [pos, vel];
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;

    mouseRef.current.x += (mouse.x * 0.3 - mouseRef.current.x) * 0.03;
    mouseRef.current.y += (mouse.y * 0.3 - mouseRef.current.y) * 0.03;

    const posArray = mesh.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      posArray[i3] += velocities[i3] + Math.sin(time * 0.8 + i * 0.5) * 0.001;
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2] + Math.cos(time * 0.6 + i * 0.3) * 0.001;

      const dx = posArray[i3] - mouseRef.current.x * 2;
      const dy = posArray[i3 + 1] - mouseRef.current.y * 2;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2) {
        const force = (2 - dist) * 0.0008;
        posArray[i3] += dx * force;
        posArray[i3 + 1] += dy * force;
      }

      if (posArray[i3 + 1] > 3) {
        posArray[i3 + 1] = -2;
        posArray[i3] = (Math.random() - 0.5) * 3;
        posArray[i3 + 2] = (Math.random() - 0.5) * 2;
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = time * 0.015;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#c855ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Central glow orb
function CoreGlow({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderData = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color("#c855ff") },
      uColor2: { value: new THREE.Color("#a855f7") },
      uColor3: { value: new THREE.Color("#ffffff") },
    },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vPosition;
      varying float vDistortion;

      void main() {
        vUv = uv;
        vPosition = position;

        vec3 pos = position;
        float distortion = sin(pos.x * 3.0 + uTime * 1.5) * 0.15;
        distortion += sin(pos.y * 4.0 + uTime * 1.2) * 0.15;
        distortion += sin(pos.z * 2.0 + uTime * 0.8) * 0.08;

        vDistortion = distortion;
        pos += normal * distortion;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      varying vec2 vUv;
      varying vec3 vPosition;
      varying float vDistortion;

      void main() {
        float mixFactor = vUv.y + sin(uTime * 0.8) * 0.15 + vDistortion * 0.5;
        vec3 color = mix(uColor1, uColor2, mixFactor);
        color = mix(color, uColor3, vDistortion * 0.3 + 0.1);

        float alpha = 0.5 + vDistortion * 0.2;
        float fresnel = pow(1.0 - dot(normalize(vPosition), vec3(0.0, 0.0, 1.0)), 2.5);
        alpha += fresnel * 0.25;

        float dist = length(vUv - 0.5);
        alpha *= smoothstep(0.5, 0.2, dist);

        gl_FragColor = vec4(color, alpha * 0.6);
      }
    `,
  }), []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value.x += (mouse.x * 0.3 - materialRef.current.uniforms.uMouse.value.x) * 0.05;
    materialRef.current.uniforms.uMouse.value.y += (mouse.y * 0.3 - materialRef.current.uniforms.uMouse.value.y) * 0.05;

    const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    meshRef.current.scale.setScalar(breathe);
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        {...shaderData}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Dust particles
function DustParticles() {
  const mesh = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    mesh.current.rotation.y = time * 0.005;
    mesh.current.rotation.x = Math.sin(time * 0.003) * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function HeroVisual({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <div className="fixed inset-0 z-0">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* THE HOODED FIGURE IMAGE — full background */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
      >
        <Image
          src="/hooded-figure.png"
          alt="Hooded Figure"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />

        {/* Overlay gradients to blend with site */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-[#0a0a0f] opacity-40" />
      </motion.div>

      {/* Glitch scan lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-[2px] bg-white/10"
            style={{ top: `${20 + i * 30}%` }}
            animate={{
              x: ["-100%", "200%"],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 0.3 + i * 0.1,
              repeat: Infinity,
              repeatDelay: 5 + i * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* 3D Scene overlay */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.08} />
        <pointLight position={[0, 1, 3]} intensity={1.5} color="#c855ff" distance={10} />
        <pointLight position={[-2, -1, 2]} intensity={0.5} color="#a855f7" distance={8} />
        <pointLight position={[2, 0, 1]} intensity={0.3} color="#ffffff" distance={6} />

        <HandParticles mouse={mouse} />
        <CoreGlow mouse={mouse} />
        <DustParticles />
      </Canvas>

      {/* Hand glow effects */}
      <motion.div
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: 'radial-gradient(circle, rgba(200,85,255,0.3) 0%, rgba(160,60,255,0.15) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Floating magical objects */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2 + Math.random() * 5,
            height: 2 + Math.random() * 5,
            left: `${35 + Math.random() * 30}%`,
            top: `${45 + Math.random() * 25}%`,
            background: i % 2 === 0 ? 'rgba(200,85,255,0.9)' : 'rgba(255,255,255,0.7)',
            boxShadow: `0 0 ${10 + Math.random() * 15}px ${i % 2 === 0 ? 'rgba(200,85,255,0.6)' : 'rgba(255,255,255,0.4)'}`,
          }}
          animate={{
            y: [0, -50 - Math.random() * 40, 0],
            x: [0, (Math.random() - 0.5) * 40, 0],
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.3, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Sparkle particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white pointer-events-none"
          style={{
            left: `${25 + Math.random() * 50}%`,
            top: `${30 + Math.random() * 40}%`,
            boxShadow: '0 0 8px 3px rgba(200,85,255,0.8)',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.8, 0],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />

      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none" />

      {/* Side vignettes */}
      <div className="absolute top-0 left-0 bottom-0 w-1/4 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-1/4 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none" />
    </div>
  );
}
