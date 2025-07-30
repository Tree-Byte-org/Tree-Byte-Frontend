import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { NftSection } from "@/components/home/nft-section";
import { FarmsSection } from "@/components/home/farms-section";
import { FooterSection } from "@/components/home/footer-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
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
