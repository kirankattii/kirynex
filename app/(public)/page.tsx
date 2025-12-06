import { Marquee } from "@/components/animations/Marquee";
import { HeroSection } from "./components/HeroSection";
import OurServiceSection from "./components/OurServiceSection";
import { GallarySection } from "./components/GallarySection";
import { AIInteractiveSection } from "./components/AiInterativeSection";
import { TestimonialSection } from "./components/TestimonialSection";
import DigitalSection from "./components/DigitalSection";
import MobileAnimations from "./components/MobileAnimations";
export default function Home() {
  return (
   <section>
    <HeroSection />
    <Marquee text="KIRYNEX — DIGITAL ALCHEMY" speed={20} />
    <OurServiceSection />
    <GallarySection />
    <AIInteractiveSection />
    <MobileAnimations />
    <DigitalSection />
    <TestimonialSection />
   </section>
  );
}
