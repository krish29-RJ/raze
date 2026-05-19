"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 200, mouse }: { count?: number; mouse: { x: number; y: number } }) {
  const mesh = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }

    return [pos, vel];
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 2 + 0.5;
    }
    return s;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    mouseRef.current.x += (mouse.x * 0.5 - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouse.y * 0.5 - mouseRef.current.y) * 0.05;

    const posArray = mesh.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      posArray[i3] += velocities[i3] + Math.sin(time * 0.5 + i) * 0.001;
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.3 + i) * 0.001;
      posArray[i3 + 2] += velocities[i3 + 2];

      const dx = posArray[i3] - mouseRef.current.x * 3;
      const dy = posArray[i3 + 1] - mouseRef.current.y * 3;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        const force = (3 - dist) * 0.001;
        posArray[i3] += dx * force;
        posArray[i3 + 1] += dy * force;
      }

      if (Math.abs(posArray[i3]) > 10) posArray[i3] *= -0.9;
      if (Math.abs(posArray[i3 + 1]) > 10) posArray[i3 + 1] *= -0.9;
      if (Math.abs(posArray[i3 + 2]) > 5) posArray[i3 + 2] *= -0.9;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = time * 0.02;
    mesh.current.rotation.x = Math.sin(time * 0.01) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#B026FF"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingGeometry({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderData = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color("#B026FF") },
      uColor2: { value: new THREE.Color("#7A00FF") },
    },
    vertexShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec2 vUv;
      varying vec3 vPosition;
      varying float vDistortion;

      void main() {
        vUv = uv;
        vPosition = position;

        vec3 pos = position;
        float distortion = sin(pos.x * 2.0 + uTime) * 0.1;
        distortion += sin(pos.y * 3.0 + uTime * 0.8) * 0.1;
        distortion += sin(pos.z * 1.5 + uTime * 1.2) * 0.08;

        float mouseInfluence = distance(uv, uMouse * 0.5 + 0.5);
        distortion += (1.0 - smoothstep(0.0, 0.5, mouseInfluence)) * 0.2;

        vDistortion = distortion;
        pos += normal * distortion;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;
      varying vec3 vPosition;
      varying float vDistortion;

      void main() {
        float mixFactor = vUv.y + sin(uTime * 0.5) * 0.2 + vDistortion;
        vec3 color = mix(uColor1, uColor2, mixFactor);

        float alpha = 0.4 + vDistortion * 0.3;
        float fresnel = pow(1.0 - dot(normalize(vPosition), vec3(0.0, 0.0, 1.0)), 3.0);
        alpha += fresnel * 0.3;

        gl_FragColor = vec4(color, alpha);
      }
    `,
  }), []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value.x += (mouse.x * 0.5 - materialRef.current.uniforms.uMouse.value.x) * 0.05;
    materialRef.current.uniforms.uMouse.value.y += (mouse.y * 0.5 - materialRef.current.uniforms.uMouse.value.y) * 0.05;

    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
  });

  return (
    <mesh ref={meshRef} scale={2.5}>
      <icosahedronGeometry args={[1, 64]} />
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

export function ParticleBackground({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#B026FF" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#7A00FF" />

        <Particles count={300} mouse={mouse} />
        <FloatingGeometry mouse={mouse} />
      </Canvas>
    </div>
  );
}
