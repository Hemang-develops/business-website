import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [location]);

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
