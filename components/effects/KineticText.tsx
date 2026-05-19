"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function KineticText({ text, className = "", delay = 0, stagger = 0.03, once = true }: KineticTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em] overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", rotateX: -90, opacity: 0 }}
            animate={isInView ? { y: 0, rotateX: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: delay + wordIndex * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: "bottom" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

export function BlurRevealText({ text, className = "", delay = 0 }: KineticTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (!ref.current || !isInView) return;

    const chars = ref.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0.1, filter: "blur(8px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.02,
        duration: 0.6,
        delay,
        ease: "power2.out",
      }
    );
  }, [isInView, delay]);

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.3em]">
          {word.split("").map((char, ci) => (
            <span key={ci} className="char inline-block">
              {char}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}

export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    if (!ref.current || !isInView) return;

    let iteration = 0;
    const target = text;
    const element = ref.current;

    const interval = setInterval(() => {
      element.innerText = target
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return target[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= target.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
