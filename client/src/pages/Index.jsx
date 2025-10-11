import About from "../components/About";
import CTA from "../components/CTA";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation";
import Newsletter from "../components/Newsletter";
import Programs from "../components/Programs";
import Resources from "../components/Resources";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const Index = () => {
  useSmoothScroll();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950 text-white">
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Programs />
        <Services />
        <Testimonials />
        <Resources />
        <Newsletter />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
