import { useEffect, useState } from "react";
import { profilePic } from "../../utils";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_bottom,_rgba(192,132,252,0.22),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-gray-950 to-black mix-blend-screen" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 lg:flex-row lg:items-center">
        <div
          className={`space-y-8 transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs font-medium uppercase tracking-[0.4em] text-white/70">
            High Frequencies 11
          </span>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            Quantum manifestation coaching for visionaries ready to lead themselves.
          </h1>
          <p className="max-w-2xl text-lg text-white/70">
            Hey love, I'm <span className="font-semibold text-teal-300">Nehal Patel</span>. I help you manifest with
            integrity—honoring both the mystical and the practical. Together we create a sustainable, regulated, joyful path to
            your next level.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#programs"
              className="rounded-full bg-teal-400 px-8 py-3 text-base font-semibold text-gray-900 shadow-lg shadow-teal-400/40 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Explore offerings
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:border-teal-300 hover:text-teal-200"
            >
              Book a discovery call
            </a>
          </div>
          <div className="grid gap-6 pt-6 sm:grid-cols-3">
            {[
              { title: "Aligned Strategy", text: "Energetic calibrations paired with tangible daily actions." },
              { title: "Sacred Discipline", text: "Rituals that keep you grounded while your manifestations unfold." },
              { title: "Devoted Support", text: "A coach, cheerleader, and mirror as you lead your divine mission." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                <p className="text-base font-semibold text-white">{item.title}</p>
                <p className="mt-2 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mx-auto flex justify-center transition-all duration-1000 ease-out delay-200 lg:mx-0 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 blur-3xl opacity-60" />
            <div className="relative rounded-[36px] border border-white/10 bg-white/10 p-4 backdrop-blur">
              <img
                src={profilePic}
                alt="Nehal Patel portrait"
                className="h-80 w-80 rounded-[28px] object-cover shadow-2xl lg:h-96 lg:w-96"
              />
              <div className="absolute -bottom-10 left-1/2 w-max -translate-x-1/2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur">
                Manifestation Coach &amp; Host of @nehalpatelishere
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
