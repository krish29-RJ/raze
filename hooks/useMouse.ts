"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMouse(smooth: number = 0.1): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * smooth;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * smooth;

      const { innerWidth, innerHeight } = window;
      setPosition({
        x: currentRef.current.x,
        y: currentRef.current.y,
        normalizedX: (currentRef.current.x / innerWidth) * 2 - 1,
        normalizedY: (currentRef.current.y / innerHeight) * 2 - 1,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [smooth, handleMouseMove]);

  return position;
}
