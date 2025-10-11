const Contact = () => {
  const contactMethods = [
    {
      label: "Email",
      value: "highfrequencies11@gmail.com",
      href: "mailto:highfrequencies11@gmail.com",
    },
    {
      label: "Instagram",
      value: "@highfrequencies11",
      href: "https://www.instagram.com/highfrequencies11/",
    },
    {
      label: "YouTube",
      value: "@nehalpatelishere",
      href: "https://www.youtube.com/@nehalpatelishere",
    },
  ];

  return (
    <section id="contact" className="bg-gray-950 py-20 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-300">
            Connect
          </p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Ready to raise your frequency?</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
            Tell me about the reality you are stepping into and how you desire to be supported.
            I respond to all inquiries within 48 hours Monday through Friday.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[2fr,3fr]">
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h3 className="text-xl font-semibold">Direct contact</h3>
            <p className="text-white/70">
              Prefer to reach out directly? Use any of the channels below and share a few details about your
              vision so I can guide you to the right container.
            </p>
            <div className="space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-left transition-colors hover:border-teal-300 hover:text-teal-200"
                  target={method.href.startsWith("http") ? "_blank" : "_self"}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">{method.label}</p>
                    <p className="text-base font-medium">{method.value}</p>
                  </div>
                  <span aria-hidden className="text-2xl">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white p-10 text-gray-900 shadow-2xl dark:bg-gray-900 dark:text-gray-100">
            <h3 className="text-xl font-semibold">Share your intentions</h3>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
              This form lands directly in my inbox. Share your story, desires, and what kind of support you are calling in.
            </p>
            <form className="mt-8 space-y-6" action="https://formspree.io/f/mwkggpnz" method="POST">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-base text-gray-900 shadow-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-base text-gray-900 shadow-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Desired Support</label>
                <select
                  name="support"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-base text-gray-900 shadow-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                >
                  <option>1:1 Mentorship</option>
                  <option>Audio/Voxer Coaching</option>
                  <option>Group Activation Circles</option>
                  <option>Custom collaboration</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-base text-gray-900 shadow-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Tell me about the future you are calling in."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-gray-900 px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-teal-400 hover:text-gray-900"
              >
                Send message
              </button>
            </form>
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              By submitting this form you agree to receive occasional updates about High Frequencies 11 offerings. You can opt out at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
