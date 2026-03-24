import Navbar from "@/components/church/Navbar";
import HeroSection from "@/components/church/HeroSection";
import AboutSection from "@/components/church/AboutSection";
import ServicesSection from "@/components/church/ServicesSection";
import SermonsSection from "@/components/church/SermonsSection";
import GiveSection from "@/components/church/GiveSection";
import ConnectSection from "@/components/church/ConnectSection";
import Footer from "@/components/church/Footer";
import HelpDeskChat from "@/components/church/HelpDeskChat";

export default function Index() {
  return (
    <div className="min-h-screen bg-church-black text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <SermonsSection />
        <GiveSection />
        <ConnectSection />
      </main>
      <Footer />
      <HelpDeskChat />
    </div>
  );
}
