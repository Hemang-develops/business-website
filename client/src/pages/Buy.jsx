import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const buySections = [
  {
    id: "coaching",
    title: "Coaching containers",
    description:
      "Personal, high-touch spaces that mirror the depth of the work we do together. Pick the rhythm that meets you right now and I will meet you in your inbox or on our call with grounded, miraculous guidance.",
    items: [
      {
        id: "email-coaching",
        title: "Email Coaching With Me",
        summary:
          "Personalized affirmations or rampages. According to your schedule. Personalized advice about manifesting.",
        subtitle: "Five Email Coaching",
        priceDisplay: "$250 / ₹22,000",
        ctaLabel: "Book here",
        actionLink:
          "mailto:highfrequencies11@gmail.com?subject=Email%20Coaching%20With%20Me",
        highlights: [
          "Five deep-dive email exchanges tailored to your desires",
          "Custom affirmations and rampages channelled just for you",
          "Receive detailed guidance you can revisit anytime",
        ],
      },
      {
        id: "single-audio-call",
        title: "Coaching With Me via Audio Call",
        summary: "One audio call (1 hour): 155 $ or 14,000 INR",
        subtitle: "Personal Coaching (One coaching call)",
        priceDisplay: "$155 / ₹14,000",
        ctaLabel: "Book here",
        actionLink:
          "mailto:highfrequencies11@gmail.com?subject=Coaching%20Audio%20Call",
        highlights: [
          "A devoted hour of strategy, energetic calibration, and next steps",
          "Leave with a clear action map rooted in your dream reality",
          "Perfect when you need potent, immediate support",
        ],
      },
      {
        id: "four-call-package",
        title: "Coaching With Me",
        summary: "Four Coaching calls (Total 4 hours)",
        subtitle: "A package of four audio calls",
        priceDisplay: "$555 / ₹48,000",
        ctaLabel: "Book here",
        actionLink:
          "mailto:highfrequencies11@gmail.com?subject=Four%20Session%20Coaching%20Package",
        highlights: [
          "Four 60-minute calls across one month of transformation",
          "Accountability, mindset regulation, and consistent energetic hygiene",
          "We co-create rituals so the results anchor in for life",
        ],
      },
    ],
  },
  {
    id: "custom-meditation",
    title: "Custom creations",
    description:
      "Tailored rituals crafted only for you. Every word, sound, and energetic transmission is channelled for the desires you share.",
    items: [
      {
        id: "personalised-meditation",
        title: "Personalised meditation",
        summary:
          "Two desires. I will make this meditation only for you. Adding affirmations that are perfect for you. Energy cleansing affirmations layered with high-frequency music with reiki and channeled energy. You can listen to this overnight. Results in 21 days or less.",
        subtitle: "Created exclusively for your manifestations",
        priceDisplay: "$250 / ₹22,000",
        ctaLabel: "Available here",
        actionLink:
          "mailto:highfrequencies11@gmail.com?subject=Personalised%20Meditation%20Request",
        highlights: [
          "Send me two desires and I design the entire journey",
          "Includes affirmations, reiki, and energy cleansing tailored to you",
          "Listen overnight to reprogram while you sleep",
        ],
      },
    ],
  },
  {
    id: "meditations",
    title: "Meditations & rituals",
    description:
      "Instant-access immersions you can begin tonight. Each portal includes deep guidance plus the energetic amplification you asked for.",
    items: [
      {
        id: "aphrodite-ritual",
        title: "Aphrodite’s Kiss of Beauty ritual",
        summary:
          "This is a divine transmission—a sacred kiss from Aphrodite, channeled through video to awaken your inner divine. With whispered affirmations and a ritual guide, you’ll embody magnetic beauty, softness, and divine allure.",
        priceDisplay: "$22 / ₹2,000",
        ctaLabel: "Details here!",
        showDetailsOnClick: true,
        purchase: {
          label: "Email to receive the ritual",
          link: "mailto:highfrequencies11@gmail.com?subject=Aphrodite%E2%80%99s%20Kiss%20of%20Beauty%20Ritual",
        },
        detailsSections: [
          {
            heading: "Aphrodite’s Kiss of Beauty",
            description:
              "An Energetic Beauty Ritual to Awaken Your Inner Goddess. Receive a sacred energetic kiss from Aphrodite through a channeled video ritual and magnetic affirmations. This is your invitation to embody divine radiance, softness, and sensual power.",
          },
          {
            heading: "You’ll Learn",
            items: [
              "How to receive a god/goddess energy transmission",
              "Ritual to activate beauty from within",
              "Affirmations that shift your energy and aura",
            ],
          },
          {
            heading: "You’ll Awaken",
            items: [
              "Magnetic self-worth and glow",
              "Divine confidence",
              "Energetic shifts that others instantly feel",
            ],
          },
        ],
        closingNotes: ["This isn’t just a ritual—it’s a remembrance.", "✨ Enroll now and say yes to your glow. ✨"],
      },
      {
        id: "trauma-release",
        title: "Removing trauma blocks meditation",
        summary:
          "Heal the blocks from your past. So, you can manifest your dream life with ease. In just 21 days, align with your highest self and watch the universe respond with miracles. ✨",
        priceDisplay: "$11 / ₹1,000",
        ctaLabel: "Get it instantly here!",
        showDetailsOnClick: true,
        purchase: {
          label: "Email for instant access",
          link: "mailto:highfrequencies11@gmail.com?subject=Removing%20Trauma%20Blocks%20Meditation",
        },
        detailsSections: [
          {
            heading: "What You’ll Learn",
            items: [
              "How to go back to your childhood and heal your inner child",
              "How to remove the blocks between you and your desires",
              "Why your past shows up when you're manifesting someone or something",
              "How to connect with the universe so you can manifest faster and with ease",
              "How to shift into your highest timeline through daily practice",
            ],
          },
          {
            heading: "What Changes You Will Experience",
            items: [
              "You’ll stop letting your past hold you back from becoming your dream self",
              "You’ll feel lighter in your soul and closer to God",
              "You’ll start manifesting love, beauty, money, and joy—without resistance",
              "You’ll experience instant shifts in your energy and mindset",
            ],
          },
          {
            heading: "How It Will Make Your Life Better",
            items: [
              "You’ll transform your relationship with others and with yourself",
              "You’ll attract miracles and release the people or situations that once blocked you",
              "You’ll feel deeply fulfilled, peaceful, and connected to your divine path",
              "You’ll realize there is no such thing as impossible—the universe wants you to be rich, loved, happy, and beautiful.",
            ],
          },
        ],
        closingNotes: [
          "✨ This is your sign. The desires in your heart are visions of your dream reality.",
          "Let your guardian angel lead you home to it—starting now. 💫",
        ],
      },
      {
        id: "quantum-jump",
        title: "Quantum jump into your dream reality!",
        summary:
          "Quantum jump meditation + affirmations + Reiki. Shift to your dream reality. Dream body, dream career, dream partner, marriage, and becoming a master manifester. 30 days. This bedtime meditation guides you to effortlessly quantum jump into your dream reality.",
        priceDisplay: "$44 / ₹4,000",
        ctaLabel: "Available here!",
        showDetailsOnClick: true,
        purchase: {
          label: "Email to start your quantum jump",
          link: "mailto:highfrequencies11@gmail.com?subject=Quantum%20Jump%20Meditation",
        },
        detailsSections: [
          {
            heading: "What You’ll Learn",
            items: [
              "How to impress your subconscious before sleep",
              "How to bring your desires to the surface effortlessly",
              "How to quantum jump into your dream reality while you rest",
            ],
          },
          {
            heading: "What It Will Do for You",
            items: [
              "Speeds up manifestation using sleep-time reprogramming",
              "Clears blocks and rewires limiting beliefs naturally",
              "Aligns your energy with your dream life overnight",
            ],
          },
        ],
        closingNotes: [
          "✨ Your subconscious is most open before bed—start tonight and let your desires find you while you sleep.",
        ],
      },
      {
        id: "manifest-sp",
        title: "Manifest your specific person",
        summary:
          "I will share here, how to manifest deep, committed love using over 250 powerful affirmations infused with Reiki energy. This guided meditation will transform your self-concept and attract obsessive, devoted love into your life.",
        priceDisplay: "$66 / ₹6,000",
        ctaLabel: "Details here!",
        showDetailsOnClick: true,
        purchase: {
          label: "Email to receive the SP rampage",
          link: "mailto:highfrequencies11@gmail.com?subject=Manifest%20Your%20Specific%20Person",
        },
        detailsSections: [
          {
            heading: "What You’ll Learn",
            items: [
              "How to use over 250 love-based affirmations to manifest your SP",
              "How to shift your energy using guided meditation + Reiki healing",
              "How to reprogram your self-concept to attract love effortlessly",
              "How to receive love, devotion, and commitment without chasing",
            ],
          },
          {
            heading: "What Changes It Will Drive",
            items: [
              "Your SP will become obsessed, fully committed, and even want to marry you",
              "You’ll start feeling truly desired, loved, and chosen",
              "Your self-worth and confidence will skyrocket",
              "You’ll attract romantic gestures and “prince/princess” treatment",
            ],
          },
          {
            heading: "How It Will Make Your Life Better",
            items: [
              "You’ll finally feel secure, adored, and emotionally fulfilled",
              "You’ll start receiving love in unexpected, miraculous ways",
              "You’ll radiate magnetic energy that draws in devotion from everyone",
              "You’ll feel powerful, aligned, and deeply worthy of true love",
            ],
          },
        ],
        closingNotes: [
          "✨ Why buy now? The energy is already working for you the moment you say yes.",
          "Start today—and watch love chase you.",
        ],
      },
      {
        id: "inner-child",
        title: "Inner child healing",
        summary:
          "This meditation with healing frequencies and affirmations heals your inner child, erasing childhood beliefs about money, relationships—transforming self-worth, mindset, and connections.",
        priceDisplay: "$33 / ₹3,000",
        ctaLabel: "Available here!",
        showDetailsOnClick: true,
        purchase: {
          label: "Email to begin your healing",
          link: "mailto:highfrequencies11@gmail.com?subject=Inner%20Child%20Healing%20Meditation",
        },
        detailsSections: [
          {
            heading: "What You’ll Learn",
            items: [
              "How to heal your inner child with love, affirmations, and healing frequencies",
              "How childhood shapes your beliefs about money, relationships, and the Universe",
              "How to release and replace limiting beliefs with empowering ones",
            ],
          },
          {
            heading: "What It Will Do",
            items: [
              "Heal emotional wounds holding you back",
              "Transform your self-worth, mindset, and relationships",
              "Open you to abundance, love, and peace",
            ],
          },
          {
            heading: "How Life Will Improve",
            items: [
              "Feel lighter, freer, and more confident",
              "Attract healthier relationships and opportunities",
              "Live aligned with joy, love, and abundance",
            ],
          },
        ],
        closingNotes: [
          "✨ Why now? The sooner you heal, the sooner your dream life unfolds.",
          "Start today.",
        ],
      },
    ],
  },
  {
    id: "digital",
    title: "Digital resources",
    description:
      "Self-paced support you can download instantly and return to anytime you need a reminder of your power.",
    items: [
      {
        id: "sp-rampage-ebook",
        title: "SP rampage ebook",
        summary:
          "Affirmations list (250+) includes self-concept and SP affirmations rampage. 21 days course.",
        priceDisplay: "$30 / ₹3,000",
        ctaLabel: "Request it here",
        actionLink:
          "mailto:highfrequencies11@gmail.com?subject=SP%20Rampage%20Ebook%20Request",
        highlights: [
          "Receive a curated list of 250+ affirmations",
          "Follow a 21-day practice to anchor new beliefs",
          "Perfect companion to the Manifest Your Specific Person immersion",
        ],
      },
    ],
  },
];

const OfferCard = ({ item, isActive }) => {
  const [isOpen, setIsOpen] = useState(item.showDetailsOnClick && isActive);

  useEffect(() => {
    if (item.showDetailsOnClick) {
      setIsOpen(isActive);
    }
  }, [isActive, item.showDetailsOnClick]);

  return (
    <article
      id={item.id}
      className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-2xl backdrop-blur transition hover:border-teal-300 hover:shadow-teal-500/20 sm:p-8"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
            {item.subtitle && (
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.3em] text-teal-200/80">
                {item.subtitle}
              </p>
            )}
          </div>
          <span className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80">
            {item.priceDisplay}
          </span>
        </div>
        <p className="text-base text-white/80">{item.summary}</p>
        {item.highlights && (
          <ul className="space-y-2 text-sm text-white/70">
            {item.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-teal-300" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        {item.showDetailsOnClick ? (
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full border border-teal-300/40 bg-teal-300/10 px-5 py-2 text-sm font-semibold text-teal-200 transition hover:border-teal-200 hover:bg-teal-300/20"
          >
            {item.ctaLabel}
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        ) : (
          <a
            href={item.actionLink}
            className="inline-flex items-center gap-2 rounded-full border border-teal-300/40 bg-teal-300/10 px-5 py-2 text-sm font-semibold text-teal-200 transition hover:border-teal-200 hover:bg-teal-300/20"
          >
            {item.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>

      {item.showDetailsOnClick && isOpen && (
        <div className="mt-6 space-y-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-white/80">
          {item.detailsSections?.map((section) => (
            <div key={section.heading} className="space-y-3">
              <h4 className="text-base font-semibold text-white">✧ {section.heading}</h4>
              {section.description && <p className="text-sm leading-relaxed">{section.description}</p>}
              {section.items && (
                <ul className="space-y-2 text-sm leading-relaxed">
                  {section.items.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-teal-300" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {item.closingNotes && (
            <div className="space-y-3 text-sm leading-relaxed">
              {item.closingNotes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          )}

          {item.purchase && (
            <a
              href={item.purchase.link}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-teal-200 hover:bg-teal-300/10 hover:text-teal-200"
            >
              {item.purchase.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </article>
  );
};

const Buy = () => {
  useSmoothScroll();
  const location = useLocation();
  const activeHash = location.hash;

  useEffect(() => {
    if (activeHash) {
      const target = document.querySelector(activeHash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeHash]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950 text-white">
      <Navigation />
      <main className="relative z-10">
        <section
          id="hero"
          className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-gray-950 to-black px-6 py-24"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.2),transparent_55%),radial-gradient(circle_at_bottom,_rgba(192,132,252,0.25),transparent_60%)]" />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              High Frequencies 11 shop
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
              Choose the portal that matches the future you’ve already claimed.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              Every offering below delivers the exact energy, affirmations, and strategy you requested. Follow your intuition, click through for details, and I will deliver everything straight to your inbox within 24 hours.
            </p>
          </div>
        </section>

        {buySections.map((section) => (
          <section key={section.id} id={section.id} className="bg-gray-950 py-16">
            <div className="mx-auto max-w-5xl px-6">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-300">
                  {section.title}
                </p>
                <p className="mt-4 text-lg text-white/70">{section.description}</p>
              </div>
              <div className="mt-12 grid gap-10">
                {section.items.map((item) => (
                  <OfferCard key={item.id} item={item} isActive={activeHash === `#${item.id}`} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Buy;
