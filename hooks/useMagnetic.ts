"use client";

import { useRef, useCallback } from "react";

export function useMagnetic(strength: number = 0.3) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      ref.current.style.transform = `translate(${distanceX * strength}px, ${distanceY * strength}px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
