const PersonalizedCoachingCTA = () => {
  return (
    <section className="bg-gray-900 py-20 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-300">
            Click down below for personalised one-on-one coaching
          </p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Personalised Coaching with me for 30 days</h2>
          <p className="mt-4 text-lg text-white/80">
            I designed this immersive container to help you become your higher/divine self with tailored manifestation practices
            and constant energetic support.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <a
            href="#programs"
            className="group rounded-2xl border border-white/20 bg-white/5 p-6 text-left transition hover:border-pink-300 hover:bg-white/10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-200">Click here</p>
            <p className="mt-2 text-xl font-semibold text-white">For energy readings</p>
            <p className="mt-3 text-sm text-white/70">
              Explore detailed tarot and energetic guidance tailored to your manifestations.
            </p>
          </a>
          <a
            href="#resources"
            className="group rounded-2xl border border-white/20 bg-white/5 p-6 text-left transition hover:border-pink-300 hover:bg-white/10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-200">Click here</p>
            <p className="mt-2 text-xl font-semibold text-white">For free manifestation content</p>
            <p className="mt-3 text-sm text-white/70">
              Access meditations, affirmations, and resources to stay anchored in your desired timeline.
            </p>
          </a>
        </div>

        <div className="flex flex-col items-center gap-3 text-center text-white/80">
          <p className="text-base font-medium">
            Email : <a className="text-white underline" href="mailto:highfrequencies11@gmail.com">highfrequencies11@gmail.com</a>
          </p>
          <a
            href="mailto:highfrequencies11@gmail.com?subject=Personalised%20Coaching%20Inquiry"
            className="rounded-full border border-white/30 px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-pink-300 hover:text-pink-200"
          >
            Email me here
          </a>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-pink-500/10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-200">What&apos;s included</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Become a new you coaching immersion</h3>
              <ul className="mt-4 space-y-3 text-white/80">
                <li>Personalised Coaching with me for 30 days</li>
                <li>5 calls with me</li>
                <li>Unlimited emails or DMs</li>
                <li>4 personalized meditations/ rampages</li>
                <li>
                  For self-concept, for becoming a master manifester, for luck, for beauty, for money, for love, and for removing
                  all the blocks that are stopping you from becoming your higher/divine self
                </li>
                <li>
                  Manifestation techniques specifically tailored to you, including portal visualization meditations, EFT technique,
                  and parts work.
                </li>
                <li>Daily Affirmations</li>
                <li>Guided meditations</li>
                <li>30 days</li>
              </ul>
            </div>
            <div className="flex flex-col items-start gap-4 rounded-2xl bg-black/30 p-6 text-left sm:min-w-[220px]">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-200">Investment</p>
              <p className="text-3xl font-bold text-white">1,111 $</p>
              <p className="text-lg font-semibold text-white/80">or 95,000 INR</p>
              <a
                href="mailto:highfrequencies11@gmail.com?subject=Become%20a%20New%20You%20Coaching"
                className="inline-flex w-full justify-center rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-pink-400"
              >
                Become a new you here
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedCoachingCTA;
