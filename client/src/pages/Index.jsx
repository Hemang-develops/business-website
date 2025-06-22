

import Contact from "../components/Contact";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation";
import Services from "../components/Services";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const Index = () => {
  useSmoothScroll();

  return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <Navigation />
        <Hero />
        {/* <AdvancedHero data={portfolioData.hero} /> */}
        <div className="relative z-10">
          <Services/>
          <Contact />
          {/* <About data={portfolioData.about} />
          <Experience data={portfolioData.experience} />
          <Skills data={portfolioData.skills} />
          <Projects data={portfolioData.projects} />
          <Contact data={portfolioData.contact} /> */}
        </div>
    </div>
  );
};

export default Index;