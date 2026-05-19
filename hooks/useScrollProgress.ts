"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
        setProgress(Math.min(Math.max(scrollProgress, 0), 1));
        rafRef.current = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return progress;
}
