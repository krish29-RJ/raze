import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: "#0a0a0f",
        violet: {
          DEFAULT: "#c855ff",
          electric: "#a855f7",
          soft: "rgba(200,85,255,0.2)",
          glow: "rgba(200,85,255,0.5)",
        },
        glass: {
          border: "rgba(255,255,255,0.1)",
          surface: "rgba(255,255,255,0.05)",
          hover: "rgba(255,255,255,0.08)",
        },
        offwhite: "#f0f0f5",
        border: "rgba(255,255,255,0.1)",
        input: "rgba(255,255,255,0.08)",
        ring: "#c855ff",
        background: "#0a0a0f",
        foreground: "#f0f0f5",
        primary: {
          DEFAULT: "#c855ff",
          foreground: "#0a0a0f",
        },
        secondary: {
          DEFAULT: "rgba(255,255,255,0.08)",
          foreground: "#f0f0f5",
        },
        muted: {
          DEFAULT: "rgba(255,255,255,0.08)",
          foreground: "rgba(240,240,245,0.55)",
        },
        accent: {
          DEFAULT: "rgba(200,85,255,0.12)",
          foreground: "#f0f0f5",
        },
        destructive: {
          DEFAULT: "#ff5555",
          foreground: "#f0f0f5",
        },
        card: {
          DEFAULT: "rgba(255,255,255,0.05)",
          foreground: "#f0f0f5",
        },
        popover: {
          DEFAULT: "rgba(10,10,15,0.98)",
          foreground: "#f0f0f5",
        },
      },
      fontFamily: {
        display: ["var(--font-clash)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.03)", opacity: "0.9" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "text-reveal": {
          "0%": { clipPath: "inset(0 100% 0 0)", opacity: "0" },
          "100%": { clipPath: "inset(0 0% 0 0)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "border-trail": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "breathe": "breathe 4s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "text-reveal": "text-reveal 1s cubic-bezier(0.16,1,0.3,1) forwards",
        "slide-up": "slide-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        "border-trail": "border-trail 3s linear infinite",
      },
      transitionTimingFunction: {
        "cinematic": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
