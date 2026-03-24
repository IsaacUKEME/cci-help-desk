import Navbar from "@/components/church/Navbar";
import HeroSection from "@/components/church/HeroSection";
import AboutSection from "@/components/church/AboutSection";
import ServicesSection from "@/components/church/ServicesSection";
import SermonsSection from "@/components/church/SermonsSection";
import PrayerRequestSection from "@/components/church/PrayerRequestSection";
import GiveSection from "@/components/church/GiveSection";
import ConnectSection from "@/components/church/ConnectSection";
import PastoralDashboard from "@/components/church/PastoralDashboard";
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
        <PrayerRequestSection />
        <GiveSection />
        <ConnectSection />
        <PastoralDashboard />
      </main>
      <Footer />
      <HelpDeskChat />
    </div>
  );
}
