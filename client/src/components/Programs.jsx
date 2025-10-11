import HorizontalCard from "./HorizontalCard";

const programs = [
  {
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
    title: "1:1 Quantum Mentorship",
    subtitle: "Three-month private container",
    description:
      "Weekly 60-minute sessions, energetic audits, and custom manifestation rituals to collapse timelines with hands-on accountability.",
    price: "1111",
    currency: "$",
    alternativeCurrency: "INR",
    alternativePrice: "92,000",
    buttonLink: "mailto:highfrequencies11@gmail.com?subject=Quantum%20Mentorship%20Inquiry",
  },
  {
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1000&q=80",
    title: "Audio/Voxer Coaching Week",
    subtitle: "Seven days of voice note support",
    description:
      "Perfect for calibrating your energy quickly. Share breakthroughs in real-time and receive daily coaching nudges within 24 hours.",
    price: "222",
    currency: "$",
    alternativeCurrency: "INR",
    alternativePrice: "18,500",
    buttonLink: "https://buy.stripe.com/4gw6pVfylfVP68cdQW",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80",
    title: "Group Activation Circles",
    subtitle: "Live monthly workshops",
    description:
      "Collective rituals, guided meditations, and hot-seat coaching inside a high-frequency vortex of like-minded souls.",
    price: "44",
    currency: "$",
    alternativeCurrency: "INR",
    alternativePrice: "3,700",
    buttonLink: "https://www.instagram.com/highfrequencies11/",
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
            Choose the container that matches your season of growth.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            Every program is designed to help you regulate your nervous system, integrate quantum teachings,
            and embody the self who already has it all.
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center gap-10">
          {programs.map((program) => (
            <HorizontalCard key={program.title} {...program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
