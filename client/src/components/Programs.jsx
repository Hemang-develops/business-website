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
        subtitle: "Five-email coaching sequence",
        description:
          "Personalised affirmations and rampages, tailored advice about manifesting, and compassionate support you can access on your own schedule.",
        price: "250",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "22,000",
        buttonLink:
          "mailto:highfrequencies11@gmail.com?subject=Email%20Coaching%20With%20Me%20Inquiry",
        buttonText: "Book here",
        maxDescriptionLength: 220,
      },
      {
        image:
          "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "woman speaking on a phone call",
        title: "Coaching With Me via Audio Call",
        subtitle: "One audio call (1 hour)",
        description:
          "A focused 60-minute private session to calibrate your energy, receive personalised strategy, and leave with a clear manifesting roadmap.",
        price: "155",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "14,000",
        buttonLink:
          "mailto:highfrequencies11@gmail.com?subject=Audio%20Call%20Coaching%20Session",
        buttonText: "Book here",
        maxDescriptionLength: 220,
      },
      {
        image:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "notebook and headset for coaching call",
        title: "Coaching With Me (Four Audio Calls)",
        subtitle: "Four coaching calls (total 4 hours)",
        description:
          "A month-long package for sustained transformation. Receive accountability, energetic recalibration, and strategic direction every single week.",
        price: "555",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "48,000",
        buttonLink:
          "mailto:highfrequencies11@gmail.com?subject=Four%20Session%20Coaching%20Package",
        buttonText: "Book here",
        maxDescriptionLength: 220,
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
        subtitle: "Two desires, made just for you",
        description:
          "Receive a meditation created exclusively for your intentions, layered with high-frequency music, reiki, channelled energy, and affirmations perfect for you.",
        price: "250",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "22,000",
        buttonLink:
          "mailto:highfrequencies11@gmail.com?subject=Personalised%20Meditation%20Request",
        buttonText: "Available here",
        maxDescriptionLength: 220,
      },
      {
        image:
          "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "headphones resting on open journal",
        title: "SP Rampage / Meditation",
        subtitle: "250+ affirmations layered with reiki",
        description:
          "Drift into a trance-like state with hypnotic music and reiki-infused affirmations that rewire your self-concept and specific person story in 21 days or less.",
        price: "66",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "6,000",
        buttonLink:
          "mailto:highfrequencies11@gmail.com?subject=SP%20Rampage%20Meditation",
        buttonText: "Available here",
        maxDescriptionLength: 220,
      },
      {
        image:
          "https://images.unsplash.com/photo-1523294587484-bae6cc870010?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "celestial imagery with woman visualising",
        title: "Quantum Jump to Dream Reality Meditation",
        subtitle: "30-day immersion",
        description:
          "Shift timelines with quantum jump techniques, affirmations, and reiki to embody your dream body, career, partner, marriage, and master manifester identity.",
        price: "44",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "4,000",
        buttonLink:
          "mailto:highfrequencies11@gmail.com?subject=Quantum%20Jump%20Meditation",
        buttonText: "Available here",
        maxDescriptionLength: 220,
      },
      {
        image:
          "https://images.unsplash.com/photo-1465146633011-14f8e0781093?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "woman journaling for healing",
        title: "Removing Blocks of Trauma Meditation",
        subtitle: "21-day guided healing journey",
        description:
          "Move past the situations and relationships you cannot release. Inner child work, affirmations, and powerful guidance to create instant energetic relief.",
        price: "11",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "1,000",
        buttonLink:
          "mailto:highfrequencies11@gmail.com?subject=Trauma%20Release%20Meditation",
        buttonText: "Available here",
        maxDescriptionLength: 220,
      },
      {
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "woman relaxing with hand on heart",
        title: "Inner Child Healing Meditation",
        subtitle: "Transform relationships & money mindset",
        description:
          "Return to your childhood self to heal, rewire, and manifest faster. A 21-day course blending guided meditation with powerful affirmations for lasting peace.",
        price: "33",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "3,000",
        buttonLink:
          "mailto:highfrequencies11@gmail.com?subject=Inner%20Child%20Healing%20Meditation",
        buttonText: "Available here",
        maxDescriptionLength: 220,
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
        title: "Beauty Ritual",
        subtitle: "7-day divine transmission (gender neutral)",
        description:
          "A sacred kiss from Aphrodite channelled through video and whispered affirmations so you embody magnetic beauty, softness, and divine allure.",
        price: "22",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "2,000",
        buttonLink:
          "mailto:highfrequencies11@gmail.com?subject=Beauty%20Ritual%20Purchase",
        buttonText: "Available here",
        maxDescriptionLength: 220,
      },
      {
        image:
          "https://images.unsplash.com/photo-1529234316406-31a017689551?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "open book with pen and flowers",
        title: "SP Rampage Ebook",
        subtitle: "250+ affirmations for self concept & SP",
        description:
          "Download a curated list of affirmations to upgrade your self concept and specific person journey. Includes daily prompts for a 21-day practice.",
        price: "30",
        currency: "$",
        alternativeCurrency: "INR",
        alternativePrice: "3,000",
        buttonLink:
          "mailto:highfrequencies11@gmail.com?subject=SP%20Rampage%20Ebook%20Request",
        buttonText: "Request it here",
        maxDescriptionLength: 220,
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
