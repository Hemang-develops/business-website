import {
  BookOpen,
  CreditCard,
  Heart,
  List,
  Mail,
  Mic,
  PenTool,
  ShoppingBag,
} from "lucide-react";
import React, { useState, useEffect } from "react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [toggle]);

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const quickLinkItems = [
    { name: "Books and Journals by me", href: "#books", icon: <BookOpen /> },
    { name: `Free gift for you`, href: "#gift", icon: <Heart /> },
    { name: "Podcast", href: "#podcast", icon: <Mic /> },
    { name: "Amazon Storefront", href: "#amazon", icon: <ShoppingBag /> },
    { name: "Blog", href: "#blog", icon: <PenTool /> },
    { name: "Newsletter", href: "#newsletter", icon: <Mail /> },
    { name: "My Wishlist", href: "#wishlist", icon: <List /> },
    { name: "My Paypal", href: "#paypal", icon: <CreditCard /> },
  ];

  const handleNavClick = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              NP
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {quickLinkItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
              onClick={() => setToggle(!toggle)}
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${
                  toggle ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${
                  toggle ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${
                  toggle ? "-rotate-45 -translate-y-0.5" : "translate-y-1.5"
                }`}
              ></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Full Screen */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          toggle ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setToggle(false)}
        />

        {/* Mobile Menu - Full Height */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-neutral-900 shadow-xl transform transition-transform duration-300 overflow-y-auto ${
            toggle ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col min-h-full">
            {/* Menu Header */}
            {/* <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                Menu
              </div>
              <button
                onClick={() => setToggle(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div> */}

            {/* Menu Items - Scrollable */}
            <div className="flex-1 py-8">
              <div className="flex flex-col space-y-1">
                {quickLinkItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={handleNavClick}
                    className="px-6 py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 relative group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="flex items-center justify-start gap-3">
                      {item.icon}
                      {item.name}
                      {/* <svg
                        className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg> */}
                    </span>
                    <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </a>
                ))}
              </div>

              {/* Additional Content to Demonstrate Scrolling */}
              <div className="px-6 py-8 space-y-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Connect With Me
                  </h3>
                  <div className="space-y-2">
                    <a
                      href="#"
                      className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Youtube
                    </a>
                    <a
                      href="#"
                      className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Instagram
                    </a>
                  </div>
                </div>

                {/* <div className="text-sm text-gray-500 dark:text-gray-400">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Quick Links</h3>
                  <div className="space-y-2">
                    {quickLinkItems.map((item, index)=> {
                    <a href="#" key={index} className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {item}
                    </a>
                    })}
                    <a href="#" className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      Amazon Storefront
                    </a>
                    <a href="#" className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      Blog
                    </a>
                    <a href="#" className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      Newsletter
                    </a>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Menu Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                © 2025 NP
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
