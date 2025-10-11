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
import { useEffect, useState } from "react";

const primaryLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Experience", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
];

const quickLinkGroups = {
  content: {
    title: "Content & Media",
    items: [
      {
        name: "Books and Journals",
        href: "https://www.amazon.ca/shop/bookescape_/list/3PDNUMMTE0PL6?ref_=cm_sw_r_apann_aipsflist_H4V2XXVECVSZ2MTY13RG&language=en_US",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        name: "Podcast",
        href: "https://open.spotify.com/show/02zFg2ejkXs1XHBo6teu5n",
        icon: <Mic className="h-5 w-5" />,
      },
      {
        name: "Blog",
        href: "https://www.instagram.com/highfrequencies11/",
        icon: <PenTool className="h-5 w-5" />,
      },
    ],
  },
  community: {
    title: "Community & Updates",
    items: [
      {
        name: "Newsletter",
        href: "#newsletter",
        icon: <Mail className="h-5 w-5" />,
      },
      {
        name: "Free gift",
        href: "#newsletter",
        icon: <Heart className="h-5 w-5" />,
      },
    ],
  },
  shopping: {
    title: "Shopping & Wishlist",
    items: [
      {
        name: "Amazon Storefront",
        href: "https://www.amazon.ca/shop/bookescape_?ref_=cm_sw_r_cp_mwn_aipsfshop_aipsfbookescape__PBB131SY1HEHXB4D7YG2_1&language=en_US",
        icon: <ShoppingBag className="h-5 w-5" />,
      },
      {
        name: "My Wishlist",
        href: "https://www.amazon.ca/hz/wishlist/ls/3S2LVE1XECZ46?ref_=wl_share",
        icon: <List className="h-5 w-5" />,
      },
    ],
  },
  support: {
    title: "Support",
    items: [
      {
        name: "Paypal",
        href: "https://www.paypal.com/paypalme/NehalPatel64",
        icon: <CreditCard className="h-5 w-5" />,
      },
    ],
  },
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = toggle ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [toggle]);

  const allQuickLinks = Object.values(quickLinkGroups).flatMap((group) => group.items);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-950/90 shadow-lg backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#hero" className="text-2xl font-bold text-white">
            HF11
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {primaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-teal-200"
              >
                {link.label}
              </a>
            ))}
            <div className="relative group">
              <button className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-teal-300 hover:text-teal-200">
                Quick Links
                <svg className="h-4 w-4 transition-transform group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="invisible absolute right-0 top-full mt-2 w-72 divide-y divide-white/5 rounded-3xl border border-white/10 bg-gray-950/95 p-4 opacity-0 shadow-2xl backdrop-blur transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {allQuickLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-teal-200"
                  >
                    <span className="text-white/50">{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 md:hidden"
            onClick={() => setToggle((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-white transition-transform ${toggle ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-white transition-opacity ${toggle ? "opacity-0" : "opacity-100"}`} />
              <span className={`block h-0.5 w-6 bg-white transition-transform ${toggle ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-gray-950/90 backdrop-blur transition-opacity duration-300 md:hidden ${
          toggle ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className={`ml-auto flex h-full w-full max-w-sm flex-col gap-8 border-l border-white/10 bg-gray-950 px-6 py-10 transition-transform duration-300 ${
            toggle ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-white">Navigate</span>
            <button onClick={() => setToggle(false)} className="text-sm text-white/60">Close</button>
          </div>
          <div className="space-y-6">
            {primaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setToggle(false)}
                className="block text-base font-medium uppercase tracking-[0.3em] text-white/80 transition-colors hover:text-teal-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-8">
            {Object.entries(quickLinkGroups).map(([groupKey, group]) => (
              <div key={groupKey}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
                  {group.title}
                </h3>
                <div className="mt-3 space-y-3">
                  {group.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={() => setToggle(false)}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/80 transition-colors hover:border-teal-300 hover:text-teal-200"
                    >
                      <span className="text-white/50">{item.icon}</span>
                      <span>{item.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/60">Need a sign?</p>
            <p className="mt-2 text-sm">
              Email <a href="mailto:highfrequencies11@gmail.com" className="text-teal-200">highfrequencies11@gmail.com</a> and let's talk about what you're manifesting.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
