import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { HorizontalScrollShowcase } from "@/components/effects/HorizontalScrollShowcase";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <HorizontalScrollShowcase />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
