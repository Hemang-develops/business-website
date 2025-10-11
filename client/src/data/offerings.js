export const buySections = [
  {
    id: "coaching",
    title: "Coaching containers",
    description:
      "Personal, high-touch spaces that mirror the depth of the work we do together. Pick the rhythm that meets you right now and I will meet you in your inbox or on our call with grounded, miraculous guidance.",
    items: [
      {
        id: "email-coaching",
        title: "Email Coaching With Me",
        subtitle: "Five Email Coaching",
        summary:
          "Personalized affirmations or rampages. According to your schedule. Personalized advice about manifesting.",
        longDescription:
          "Five deep-dive email exchanges tailored to your desires. Every reply includes custom affirmations, rampages, and detailed coaching you can revisit anytime.",
        price: { usd: "250", inr: "22,000" },
        ctaLabel: "Book here",
        actionLink:
          "mailto:highfrequencies11@gmail.com?subject=Email%20Coaching%20With%20Me",
        paymentLinks: {
          usd: import.meta.env.VITE_PAYMENT_EMAIL_COACHING_USD,
          inr: import.meta.env.VITE_PAYMENT_EMAIL_COACHING_INR,
        },
        highlights: [
          "Five deep-dive email exchanges tailored to your desires",
          "Custom affirmations and rampages channelled just for you",
          "Receive detailed guidance you can revisit anytime",
        ],
      },
      {
        id: "single-audio-call",
        title: "Coaching With Me via Audio Call",
        subtitle: "Personal Coaching (One coaching call)",
        summary: "One audio call (1 hour): 155 $ or 14,000 INR",
        longDescription:
          "A devoted hour of strategy, energetic calibration, and next steps. Perfect when you need potent, immediate support and a clear map forward.",
        price: { usd: "155", inr: "14,000" },
        ctaLabel: "Book here",
        actionLink:
          "mailto:highfrequencies11@gmail.com?subject=Coaching%20Audio%20Call",
        paymentLinks: {
          usd: import.meta.env.VITE_PAYMENT_SINGLE_AUDIO_CALL_USD,
          inr: import.meta.env.VITE_PAYMENT_SINGLE_AUDIO_CALL_INR,
        },
        highlights: [
          "A devoted hour of strategy, energetic calibration, and next steps",
          "Leave with a clear action map rooted in your dream reality",
          "Perfect when you need potent, immediate support",
        ],
      },
      {
        id: "four-call-package",
        title: "Coaching With Me",
        subtitle: "A package of four audio calls",
        summary: "Four Coaching calls (Total 4 hours)",
        longDescription:
          "Four 60-minute calls across one month of transformation. We co-create rituals, maintain accountability, and anchor the results into your daily life.",
        price: { usd: "555", inr: "48,000" },
        ctaLabel: "Book here",
        actionLink:
          "mailto:highfrequencies11@gmail.com?subject=Four%20Session%20Coaching%20Package",
        paymentLinks: {
          usd: import.meta.env.VITE_PAYMENT_FOUR_CALL_PACKAGE_USD,
          inr: import.meta.env.VITE_PAYMENT_FOUR_CALL_PACKAGE_INR,
        },
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
        subtitle: "Created exclusively for your manifestations",
        summary:
          "Two desires. I will make this meditation only for you. Adding affirmations that are perfect for you. Energy cleansing affirmations layered with high-frequency music with reiki and channeled energy. You can listen to this overnight. Results in 21 days or less.",
        longDescription:
          "Share two desires and I will design a meditation infused with reiki, energy cleansing, and hypnotic soundscapes. Listen overnight to let the reprogramming work while you sleep.",
        price: { usd: "250", inr: "22,000" },
        ctaLabel: "Available here",
        actionLink:
          "mailto:highfrequencies11@gmail.com?subject=Personalised%20Meditation%20Request",
        paymentLinks: {
          usd: import.meta.env.VITE_PAYMENT_PERSONALISED_MEDITATION_USD,
          inr: import.meta.env.VITE_PAYMENT_PERSONALISED_MEDITATION_INR,
        },
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
        price: { usd: "22", inr: "2,000" },
        ctaLabel: "Details here!",
        showDetailsOnClick: true,
        purchase: {
          label: "Email to receive the ritual",
          link: "mailto:highfrequencies11@gmail.com?subject=Aphrodite%E2%80%99s%20Kiss%20of%20Beauty%20Ritual",
        },
        paymentLinks: {
          usd: import.meta.env.VITE_PAYMENT_APHRODITE_RITUAL_USD,
          inr: import.meta.env.VITE_PAYMENT_APHRODITE_RITUAL_INR,
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
        price: { usd: "11", inr: "1,000" },
        ctaLabel: "Get it instantly here!",
        showDetailsOnClick: true,
        purchase: {
          label: "Email for instant access",
          link: "mailto:highfrequencies11@gmail.com?subject=Removing%20Trauma%20Blocks%20Meditation",
        },
        paymentLinks: {
          usd: import.meta.env.VITE_PAYMENT_TRAUMA_RELEASE_USD,
          inr: import.meta.env.VITE_PAYMENT_TRAUMA_RELEASE_INR,
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
          "Quantum jump meditation + affirmations + Reiki. Shift to your dream reality. Dream body, dream career, dream partner, marriage, and becoming a master manifester. This bedtime meditation guides you to effortlessly quantum jump into your dream reality.",
        price: { usd: "44", inr: "4,000" },
        ctaLabel: "Available here!",
        showDetailsOnClick: true,
        purchase: {
          label: "Email to start your quantum jump",
          link: "mailto:highfrequencies11@gmail.com?subject=Quantum%20Jump%20Meditation",
        },
        paymentLinks: {
          usd: import.meta.env.VITE_PAYMENT_QUANTUM_JUMP_USD,
          inr: import.meta.env.VITE_PAYMENT_QUANTUM_JUMP_INR,
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
        price: { usd: "66", inr: "6,000" },
        ctaLabel: "Details here!",
        showDetailsOnClick: true,
        purchase: {
          label: "Email to receive the SP rampage",
          link: "mailto:highfrequencies11@gmail.com?subject=Manifest%20Your%20Specific%20Person",
        },
        paymentLinks: {
          usd: import.meta.env.VITE_PAYMENT_MANIFEST_SP_USD,
          inr: import.meta.env.VITE_PAYMENT_MANIFEST_SP_INR,
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
        price: { usd: "33", inr: "3,000" },
        ctaLabel: "Available here!",
        showDetailsOnClick: true,
        purchase: {
          label: "Email to begin your healing",
          link: "mailto:highfrequencies11@gmail.com?subject=Inner%20Child%20Healing%20Meditation",
        },
        paymentLinks: {
          usd: import.meta.env.VITE_PAYMENT_INNER_CHILD_USD,
          inr: import.meta.env.VITE_PAYMENT_INNER_CHILD_INR,
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
        price: { usd: "30", inr: "3,000" },
        ctaLabel: "Request it here",
        actionLink:
          "mailto:highfrequencies11@gmail.com?subject=SP%20Rampage%20Ebook%20Request",
        paymentLinks: {
          usd: import.meta.env.VITE_PAYMENT_SP_RAMPAGE_EBOOK_USD,
          inr: import.meta.env.VITE_PAYMENT_SP_RAMPAGE_EBOOK_INR,
        },
        highlights: [
          "Receive a curated list of 250+ affirmations",
          "Follow a 21-day practice to anchor new beliefs",
          "Perfect companion to the Manifest Your Specific Person immersion",
        ],
      },
    ],
  },
];

export const offeringsIndex = buySections.reduce((acc, section) => {
  section.items.forEach((item) => {
    acc[item.id] = {
      ...item,
      section: { id: section.id, title: section.title, description: section.description },
    };
  });
  return acc;
}, {});

export const offeringSupportOptions = Object.values(offeringsIndex).map((offering) => offering.title);
