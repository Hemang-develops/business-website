import { coachingWithMe } from "../../utils";
import HorizontalCard from "./HorizontalCard";

const Services = () => {
  return (
    <section
      id="about"
      className="min-h-screen py-20 bg-gray-50 bg-gradient-to-br from-teal-50 to-indigo-500 dark:from-gray-900 dark:to-indigo-900"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Services
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <HorizontalCard
          image={coachingWithMe}
          title="Coaching With Me via Audio Call"
          subtitle="Personal Coaching (One coaching call)"
          //   155 $ or 14,000 INR
          price="155"
          currency="$"
          alternativePrice="14000"
          alternativeCurrency="INR"
          buttonLink="#coaching"
        />
      </div>
    </section>
  );
};

export default Services;
