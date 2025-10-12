const Newsletter = () => {
  return (
    <section id="newsletter" className="relative min-h-screen overflow-hidden bg-gray-950 py-16 lg:py-20 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-blue-500/10 to-purple-500/30" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-200">
          The Frequency Drop
        </p>
        <h2 className="text-4xl font-bold sm:text-5xl">Stay plugged into the vortex.</h2>
        <p className="max-w-2xl text-lg text-white/70">
          Receive my monthly energy reports, journal prompts, and VIP offers before they go public. This is where I share
          the unfiltered behind-the-scenes of manifesting a life beyond logic.
        </p>
        <form
          className="flex w-full flex-col gap-4 sm:flex-row"
          action="https://formspree.io/f/xovqwaaw"
          method="POST"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-base text-white placeholder:text-white/60 focus:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-teal-300 px-8 py-4 text-base font-semibold text-gray-900 shadow-lg shadow-teal-300/40 transition-transform duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto"
          >
            Join now
          </button>
        </form>
        <p className="text-sm text-white/50">
          No spam. Just potent reminders that you are the miracle.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
