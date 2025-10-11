import HorizontalCard from "./HorizontalCard";

const offeringGroups = [
  {
    title: "Coaching Containers",
    description:
      "Intimate support designed to meet you where you are. Choose the cadence that best serves your manifestations and receive grounded, strategic guidance every step of the way.",
    items: [
      {
        image:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "journal, coffee and laptop on table",
        title: "Email Coaching With Me",
        subtitle: "Five Email Coaching",
        description:
          "Personalized affirmations or rampages, delivered according to your schedule with manifesting advice crafted just for you.",
        price: "250",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "22,000",
        buttonLink: "/buy#email-coaching",
        buttonText: "Book here",
        maxDescriptionLength: 240,
      },
      {
        image:
          "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "woman speaking on a phone call",
        title: "Coaching With Me via Audio Call",
        subtitle: "Personal Coaching (One coaching call)",
        description:
          "One audio call (1 hour) devoted to calibrating your energy, refining your self-concept, and anchoring a plan for the reality you are manifesting.",
        price: "155",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "14,000",
        buttonLink: "/buy#single-audio-call",
        buttonText: "Book here",
        maxDescriptionLength: 240,
      },
      {
        image:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "notebook and headset for coaching call",
        title: "Coaching With Me",
        subtitle: "A package of four audio calls",
        description:
          "Four coaching calls (total 4 hours) so you stay accountable, regulated, and supported while you quantum leap into your dream life.",
        price: "555",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "48,000",
        buttonLink: "/buy#four-call-package",
        buttonText: "Book here",
        maxDescriptionLength: 240,
      },
    ],
  },
  {
    title: "Custom Meditations",
    description:
      "Hand-crafted energetic immersions that weave reiki, channelled energy, and hypnotic soundscapes so you can reprogram overnight and integrate results quickly.",
    items: [
      {
        image:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "woman meditating with headphones",
        title: "Personalised Meditation",
        subtitle: "Two desires crafted only for you",
        description:
          "I will make this meditation only for you, layering energy cleansing affirmations, reiki, channeled energy, and high-frequency music you can loop overnight.",
        price: "250",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "22,000",
        buttonLink: "/buy#personalised-meditation",
        buttonText: "Available here",
        maxDescriptionLength: 240,
      },
      {
        image:
          "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "headphones resting on open journal",
        title: "Manifest Your Specific Person",
        subtitle: "SP rampage/meditation (250+ affirmations)",
        description:
          "Reprogram your subconscious with hypnotizing music, reiki, and 250+ affirmations so your specific person shows up deeply devoted and obsessed with you.",
        price: "66",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "6,000",
        buttonLink: "/buy#manifest-sp",
        buttonText: "Details here!",
        maxDescriptionLength: 240,
      },
      {
        image:
          "https://images.unsplash.com/photo-1523294587484-bae6cc870010?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "celestial imagery with woman visualising",
        title: "Quantum Jump to Dream Reality Meditation",
        subtitle: "Quantum jump + affirmations + Reiki",
        description:
          "Learn how to reprogram your subconscious in your sleep so you quantum jump into your dream body, career, partner, marriage, and master manifester timeline.",
        price: "44",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "4,000",
        buttonLink: "/buy#quantum-jump",
        buttonText: "Available here!",
        maxDescriptionLength: 240,
      },
      {
        image:
          "https://images.unsplash.com/photo-1465146633011-14f8e0781093?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "woman journaling for healing",
        title: "Removing Trauma Blocks Meditation",
        subtitle: "Heal the blocks from your past",
        description:
          "Heal the situations or people you can't move on from so you manifest with ease. Expect powerful guided meditation, affirmations, and inner child healing in 21 days.",
        price: "11",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "1,000",
        buttonLink: "/buy#trauma-release",
        buttonText: "Get it instantly here!",
        maxDescriptionLength: 240,
      },
      {
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "woman relaxing with hand on heart",
        title: "Inner Child Healing Meditation",
        subtitle: "Heal your inner child & transform beliefs",
        description:
          "Go back to your childhood, heal your inner child, and transform the beliefs that shaped your money mindset, relationships, and self-worth.",
        price: "33",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "3,000",
        buttonLink: "/buy#inner-child",
        buttonText: "Available here!",
        maxDescriptionLength: 240,
      },
    ],
  },
  {
    title: "Digital Rituals & Resources",
    description:
      "Short but potent transmissions that you can revisit anytime you want to amplify your magnetism and self-concept.",
    items: [
      {
        image:
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "woman applying beauty ritual with mirror",
        title: "Aphrodite’s Kiss of Beauty Ritual",
        subtitle: "A sacred kiss to awaken divine allure",
        description:
          "This divine transmission is a channeled video ritual with whispered affirmations so you embody magnetic beauty, softness, and irresistible allure.",
        price: "22",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "2,000",
        buttonLink: "/buy#aphrodite-ritual",
        buttonText: "Details here!",
        maxDescriptionLength: 240,
      },
      {
        image:
          "https://images.unsplash.com/photo-1529234316406-31a017689551?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "open book with pen and flowers",
        title: "SP Rampage Ebook",
        subtitle: "250+ affirmations for self concept & SP",
        description:
          "Affirmations list with self-concept and SP rampages plus a 21-day practice so you stay in the frequency of your desired relationship.",
        price: "30",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "3,000",
        buttonLink: "/buy#sp-rampage-ebook",
        buttonText: "Request it here",
        maxDescriptionLength: 240,
      },
    ],
  },
];

const Programs = () => {
  return (
    <section id="programs" className="bg-gray-50 py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-400">
            Offerings
          </p>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Choose the support that aligns with your season of growth.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            Every option below is a living portal into your next reality. Select what resonates now and I will follow up with next steps within 24 hours.
          </p>
        </div>

        <div className="mt-16 space-y-20">
          {offeringGroups.map((group) => (
            <div key={group.title}>
              <div className="mx-auto max-w-3xl text-center">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {group.title}
                </h3>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                  {group.description}
                </p>
              </div>
              <div className="mt-10 flex flex-col items-center gap-10">
                {group.items.map((item) => (
                  <HorizontalCard key={item.title} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
