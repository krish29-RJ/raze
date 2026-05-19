"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const phases = [
      { progress: 15, delay: 300 },
      { progress: 35, delay: 400 },
      { progress: 55, delay: 500 },
      { progress: 75, delay: 400 },
      { progress: 90, delay: 300 },
      { progress: 100, delay: 600 },
    ];

    let currentPhase = 0;

    const runPhase = () => {
      if (currentPhase >= phases.length) {
        setTimeout(() => setIsLoading(false), 800);
        return;
      }

      const p = phases[currentPhase];
      setProgress(p.progress);

      currentPhase++;
      setTimeout(runPhase, p.delay);
    };

    setTimeout(runPhase, 400);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-space flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <h1 className="font-display text-5xl md:text-7xl tracking-[0.3em] text-white">
              R<span className="text-violet">A</span>Z<span className="text-violet">E</span>
            </h1>
          </motion.div>

          <motion.div
            className="absolute w-72 h-72 rounded-full bg-violet/15 blur-[120px]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.6, 0.4], scale: [0.5, 1.2, 1] }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />

          <div className="w-48 h-[2px] bg-white/[0.08] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-violet/60"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <motion.p
            className="mt-6 font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress < 100 ? "Initializing experience" : "Welcome"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
