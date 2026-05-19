# RAZE Portfolio

A cinematic, award-winning portfolio website built with Next.js 15, React 19, Three.js, and GSAP.

## Features

- 🌌 Immersive 3D particle background with WebGL
- ✨ Custom magnetic cursor with hover states
- 🎬 Cinematic scroll animations with Lenis smooth scrolling
- 🎨 Glassmorphism UI with neon violet accents
- 📱 Fully responsive design
- ⚡ GPU-optimized animations at 60fps
- ♿ Accessibility support with reduced motion

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger
- Lenis Smooth Scroll
- React Three Fiber + Drei
- Three.js

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm build
```

## Project Structure

```
├── app/                    # Next.js app router
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── sections/           # Page sections
│   ├── effects/            # Visual effects
│   └── ui/                 # UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities
├── public/                 # Static assets
│   └── fonts/              # Custom fonts
└── types/                  # TypeScript types
```

## Customization

1. Update `components/sections/*.tsx` with your actual content
2. Replace placeholder project data in `ProjectsSection.tsx`
3. Update contact information in `ContactSection.tsx`
4. Add your actual resume/experience in `ExperienceSection.tsx`
5. Place Clash Display font in `public/fonts/`

## License

MIT License - feel free to use as a template for your own portfolio.
