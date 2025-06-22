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

  const quickLinkGroups = {
    content: {
      title: "Content & Media",
      items: [
        { 
          name: "Books and Journals by me", 
          href: "https://www.amazon.ca/shop/bookescape_/list/3PDNUMMTE0PL6?ref_=cm_sw_r_apann_aipsflist_H4V2XXVECVSZ2MTY13RG&language=en_US", 
          icon: <BookOpen className="w-5 h-5" />
        },
        { 
          name: "Podcast", 
          href: "https://open.spotify.com/show/02zFg2ejkXs1XHBo6teu5n", 
          icon: <Mic className="w-5 h-5" />
        },
        { 
          name: "Blog", 
          href: "#blog", 
          icon: <PenTool className="w-5 h-5" />
        }
      ]
    },
    
    community: {
      title: "Community & Updates",
      items: [
        { 
          name: "Newsletter", 
          href: "#newsletter", 
          icon: <Mail className="w-5 h-5" />
        },
        { 
          name: "Free gift for you", 
          href: "#", 
          icon: <Heart className="w-5 h-5" />
        }
      ]
    },
    
    shopping: {
      title: "Shopping & Wishlist",
      items: [
        { 
          name: "Amazon Storefront", 
          href: "https://www.amazon.ca/shop/bookescape_?ref_=cm_sw_r_cp_mwn_aipsfshop_aipsfbookescape__PBB131SY1HEHXB4D7YG2_1&language=en_US", 
          icon: <ShoppingBag className="w-5 h-5" />
        },
        { 
          name: "My Wishlist", 
          href: "https://www.amazon.ca/hz/wishlist/ls/3S2LVE1XECZ46?ref_=wl_share", 
          icon: <List className="w-5 h-5" />
        }
      ]
    },
    
    support: {
      title: "Support",
      items: [
        { 
          name: "My Paypal", 
          href: "https://www.paypal.com/paypalme/NehalPatel64", 
          icon: <CreditCard className="w-5 h-5" />
        }
      ]
    }
  };

  // Create flat array for desktop navigation
  const allQuickLinks = Object.values(quickLinkGroups).flatMap(group => group.items);

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

            {/* Desktop Navigation - Grouped Dropdowns */}
            <div className="hidden md:flex space-x-8">
              {Object.entries(quickLinkGroups).map(([groupKey, group]) => (
                <div key={groupKey} className="relative group">
                  {/* Group Title */}
                  <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 relative flex items-center gap-1 py-2">
                    {group.title}
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className={`absolute top-full mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
                    groupKey === 'support' ? 'right-0' : 'left-0'
                  }`}>
                    <div className="py-2">
                      {group.items.map((item, index) => (
                        <a
                          key={item.name}
                          href={item.href}
                          target={item.href.startsWith('http') ? "_blank" : "_self"}
                          rel={item.href.startsWith('http') ? "noopener noreferrer" : ""}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="flex-shrink-0 text-gray-500 dark:text-gray-400">
                            {item.icon}
                          </span>
                          <span>{item.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
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
            {/* Menu Items - Grouped and Scrollable */}
            <div className="flex-1 py-8">
              {Object.entries(quickLinkGroups).map(([groupKey, group], groupIndex) => (
                <div key={groupKey} className="mb-8">
                  {/* Group Title */}
                  <div className="px-6 mb-3">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {group.title}
                    </h3>
                  </div>
                  
                  {/* Group Items */}
                  <div className="space-y-1">
                    {group.items.map((item, itemIndex) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target={item.href.startsWith('http') ? "_blank" : "_self"}
                        rel={item.href.startsWith('http') ? "noopener noreferrer" : ""}
                        onClick={handleNavClick}
                        className="px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 relative group flex items-center gap-3"
                        style={{ animationDelay: `${(groupIndex * group.items.length + itemIndex) * 50}ms` }}
                      >
                        <span className="flex-shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.icon}
                        </span>
                        <span className="flex-1">{item.name}</span>
                        <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              {/* Additional Social Links */}
              <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Connect With Me
                </h3>
                <div className="space-y-2">
                  <a
                    href="https://www.youtube.com/@nehalpatelishere"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Youtube
                  </a>
                  <a
                    href="#"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Instagram
                  </a>
                </div>
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