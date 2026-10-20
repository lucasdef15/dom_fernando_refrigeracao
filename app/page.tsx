import Footer from '@/components/layout/Footer';
import About from '@/components/sections/About';
import Automation from '@/components/sections/Automation';
import ContactCTA from '@/components/sections/ContactCTA';
import Gallery from '@/components/sections/gallery/Gallery';
import Hero from '@/components/sections/hero/Hero';
import Services from '@/components/sections/services/Services';
import TrustBar from '@/components/sections/TrustBar';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Gallery />
      <Automation />
      <About />
      <ContactCTA />
      <Footer />
    </>
  );
}
