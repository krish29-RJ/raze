"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 500, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverData = target.closest("[data-cursor]");
      if (hoverData) {
        setIsHovering(true);
        setHoverText(hoverData.getAttribute("data-cursor") || "");
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverData = target.closest("[data-cursor]");
      if (hoverData) {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isHovering ? 72 : 10,
            height: isHovering ? 72 : 10,
            opacity: isHovering ? 1 : 0.8,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className={`w-full h-full rounded-full border border-white/90 flex items-center justify-center transition-all duration-300 ${
              isHovering ? "bg-transparent border-white/70" : "bg-white"
            }`}
          >
            {isHovering && hoverText && (
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white">
                {hoverText}
              </span>
            )}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/15 blur-xl"
          animate={{
            width: isHovering ? 100 : 30,
            height: isHovering ? 100 : 30,
            opacity: isHovering ? 0.5 : 0.25,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </>
  );
}
