import { AboutSection } from "@/components/home/about-section";
import { FarmsSection } from "@/components/home/farms-section";
import { FooterSection } from "@/components/home/footer-section";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { NftSection } from "@/components/home/nft-section";
import { ProjectsSection } from "@/components/home/projects-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <HowItWorksSection />
      <NftSection />
      <FarmsSection />
      <FooterSection />
    </div>
  );
}
