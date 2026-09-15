import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { FlagshipSection } from "@/components/flagship-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { EducationSection } from "@/components/education-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <FlagshipSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
      </main>
      <SiteFooter />
    </>
  );
}
