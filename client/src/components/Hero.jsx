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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-indigo-500 dark:from-gray-900 dark:to-indigo-900"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col gap-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`hero-content space-y-8 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="space-y-4 flex-wrap">
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Hello, beautiful people. It's
              </p>
              <div className="flex items-end gap-3">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                  Nehal Patel
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl pb-1">
                  aka
                </p>
              </div>
              <h2 className="text-2xl lg:text-3xl text-blue-600 dark:text-blue-400 font-light">
                Your guardian angel
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl pb-1">
                <a href="https://www.youtube.com/@nehalpatelishere">
                  @nehalpatelishere
                </a>
              </p>
            </div>
          </div>

          <div
            className={`hero-image flex justify-center transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <img
                src={profilePic}
                alt="Profile picture"
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-700"
              />
            </div>
          </div>
        </div>
          <div className="flex flex-col gap-y-4">
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl pb-1">
            Speed up your manifestations by signing up for one-on-one coaching
            with me. Remember, you are worthy of all good things. 
            {/* Email: highfrequencies11@gmail.com */}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Join our community
            </a>
            <a
                href="#contact"
                className="px-8 py-4 border-2 border-white dark:border-gray-600 text-gray-900 dark:text-gray-300 rounded-full font-medium hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
              >
                Get In Touch
              </a>
          </div>
          </div>
      </div>
    </section>
  );
};

export default Hero;
