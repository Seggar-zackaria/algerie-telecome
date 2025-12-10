import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { NewsSection } from '@/components/sections/NewsSection';
import { RegistrationSection } from '@/components/sections/RegistrationSection';
import { ContactSection } from '@/components/sections/ContactSection';

export const LandingPage = () => {

  return (
    <div className="min-h-screen bg-gray-50 font-poppins selection:bg-primary/20 selection:text-primary">
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />

        <NewsSection />
        <RegistrationSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

