import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { buySections, offeringsIndex } from "../data/offerings";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const isExternalLink = (link) => typeof link === "string" && /^(https?:|upi:|mailto:)/.test(link);


const entityOptions = [
  { value: "individual", label: "Individual" },
  { value: "company", label: "Company" },
];

const billingCountries = [
  "India",
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "United Arab Emirates",
  "Singapore",
  "Germany",
  "France",
  "Other",
];

const PaymentSection = ({ item }) => {
  const checkoutOptions = item.checkoutOptions;
  const manualInstructions = item.manualInstructions || [];
  const paymentMethods = item.paymentMethods || [];
  const legalNotes = item.legalNotes || [];
  const priceDetails = item.priceDetails || [];
  const backupLink = item.purchase?.link || item.actionLink;
  const backupLabel = item.purchase?.label || item.ctaLabel || "Email for support";

  const currencyKeys = useMemo(() => {
    if (!checkoutOptions?.currencies) {
      return [];
    }
    return Object.keys(checkoutOptions.currencies);
  }, [checkoutOptions]);

  const hasCheckout = currencyKeys.length > 0;

  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    if (!hasCheckout) {
      return "";
    }
    if (checkoutOptions?.defaultCurrency && currencyKeys.includes(checkoutOptions.defaultCurrency)) {
      return checkoutOptions.defaultCurrency;
    }
    return currencyKeys[0];
  });

  useEffect(() => {
    if (!hasCheckout) {
      setSelectedCurrency("");
      return;
    }
    const preferred =
      (checkoutOptions?.defaultCurrency && currencyKeys.includes(checkoutOptions.defaultCurrency)
        ? checkoutOptions.defaultCurrency
        : currencyKeys[0]) || "";
    setSelectedCurrency((current) => (current && currencyKeys.includes(current) ? current : preferred));
  }, [hasCheckout, checkoutOptions, currencyKeys]);

  const currencyConfig = hasCheckout && selectedCurrency ? checkoutOptions.currencies[selectedCurrency] : null;

  const [entityType, setEntityType] = useState("individual");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("India");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const displayedPriceDetails = useMemo(() => {
    if (priceDetails.length) {
      return priceDetails.map((detail) => ({
        ...detail,
        amountLabel: currencyConfig?.amount || detail.amount,
      }));
    }
    if (currencyConfig?.amount) {
      return [
        {
          label: item.title,
          amountLabel: currencyConfig.amount,
        },
      ];
    }
    return [];
  }, [currencyConfig, priceDetails, item.title]);

  const apiBase = useMemo(() => {
    const base = import.meta.env.VITE_API_BASE_URL;
    if (!base) {
      return "";
    }
    return base.replace(/\/$/, "");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!hasCheckout) {
      return;
    }

    if (!email?.trim()) {
      setError("Enter your email so Stripe can send the receipt and download links.");
      return;
    }

    if (!selectedCurrency) {
      setError("Select a currency to continue.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${apiBase}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.id,
          currency: selectedCurrency,
          entityType,
          firstName: firstName.trim(),
          email: email.trim(),
          country,
        }),
      });

      let data = null;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to start checkout right now. Try again or email us for a manual invoice.",
        );
      }

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error("Stripe did not return a checkout link. Email us and we will send it manually.");
    } catch (err) {
      const message =
        err?.message && typeof err.message === "string"
          ? err.message
          : "Unexpected error while launching checkout. Please email us and we’ll help manually.";

      if (err?.name === "TypeError") {
        setError(
          `${message} If this keeps happening, use the manual payment instructions below while we restore the secure checkout link.`,
        );
      } else {
        setError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/90 shadow-2xl backdrop-blur">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">Checkout</h3>
        {hasCheckout ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-200/80">Account type</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {entityOptions.map((option) => {
                  const isActive = entityType === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setEntityType(option.value)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "border-teal-300 bg-teal-300/20 text-teal-100"
                          : "border-white/10 bg-transparent text-white/70 hover:border-white/30"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-white/70">
                <span className="font-semibold text-white">First name</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="Your first name"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-teal-300 focus:outline-none focus:ring-1 focus:ring-teal-300/60"
                />
              </label>
              <label className="space-y-2 text-sm text-white/70">
                <span className="font-semibold text-white">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-teal-300 focus:outline-none focus:ring-1 focus:ring-teal-300/60"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-white/70">
              <span className="font-semibold text-white">Country</span>
              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-teal-300 focus:outline-none focus:ring-1 focus:ring-teal-300/60"
              >
                {billingCountries.map((option) => (
                  <option key={option} value={option} className="bg-gray-900">
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-200/80">Choose your currency</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {currencyKeys.map((currencyKey) => {
                  const option = checkoutOptions.currencies[currencyKey];
                  const isActive = currencyKey === selectedCurrency;
                  return (
                    <button
                      key={currencyKey}
                      type="button"
                      onClick={() => setSelectedCurrency(currencyKey)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "border-teal-300 bg-teal-300/20 text-teal-100"
                          : "border-white/10 bg-transparent text-white/70 hover:border-white/30"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-200/80">
                  Amount due now
                </span>
                <span className="text-lg font-semibold text-white">
                  {currencyConfig?.amount || item.priceLabel || "Select a currency"}
                </span>
              </div>
              <p className="text-xs text-white/60">
                You’ll be redirected to Stripe to complete your payment over a secure SSL connection.
              </p>
            </div>

            {error && <p className="text-sm font-medium text-rose-300">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-300 px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Redirecting to Stripe…" : "Confirm and pay now"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-sm leading-relaxed text-white/70">
            <p>
              Stripe checkout links for this offering are being finalised. Email me and you’ll receive a private payment link or alternate option within minutes.
            </p>
            {backupLink && (
              <a
                href={backupLink}
                className="inline-flex items-center gap-2 rounded-full border border-teal-300/40 bg-teal-300/10 px-5 py-2 text-sm font-semibold text-teal-200 transition hover:border-teal-200 hover:bg-teal-300/20"
              >
                {backupLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>
        )}

        {paymentMethods.length ? (
          <div className="pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-200/80">Pay with</p>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm text-white/70">
              {paymentMethods.map((method) => (
                <li key={method} className="rounded-full border border-white/10 bg-white/10 px-3 py-1">
                  {method}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="text-xs text-white/60">
          {item.secureNote || "Your payment is processed by Stripe using bank-level encryption."}
        </p>
      </div>

      {displayedPriceDetails.length ? (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/10 p-6">
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-200/80">Price details</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {displayedPriceDetails.map((detail) => (
              <li key={`${detail.label}-${detail.amountLabel}`} className="flex items-center justify-between gap-3">
                <span>{detail.label}</span>
                <span className="font-semibold">{detail.amountLabel}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {manualInstructions.length ? (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/10 p-6 text-sm text-white/75">
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-200/80">Need a different flow?</h4>
          <ul className="space-y-2 leading-relaxed">
            {manualInstructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ul>
          {backupLink && (
            <a
              href={backupLink}
              target={isExternalLink(backupLink) ? "_blank" : undefined}
              rel={isExternalLink(backupLink) ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-200 transition hover:text-teal-100"
            >
              {backupLabel}
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      ) : null}

      {legalNotes.length ? (
        <div className="space-y-2 rounded-2xl border border-white/10 bg-white/10 p-6 text-xs leading-relaxed text-white/60">
          {legalNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      ) : null}
    </section>
  );
};

const CheckoutStatusBanner = ({ status, itemTitle }) => {
  if (!status) {
    return null;
  }

  const normalized = status.toLowerCase();
  if (normalized !== "success" && normalized !== "cancel") {
    return null;
  }

  const isSuccess = normalized === "success";
  const title = isSuccess ? "Payment confirmed" : "Checkout cancelled";
  const description = isSuccess
    ? `Your order for ${itemTitle} is confirmed. Check your inbox for the download or welcome email—if it’s missing, reply to this message and we’ll resend it manually.`
    : "You left the Stripe checkout flow early. You can relaunch it above or email us to request an alternate payment option.";

  return (
    <div
      className={`rounded-3xl border p-6 text-sm leading-relaxed shadow-inner backdrop-blur ${
        isSuccess
          ? "border-teal-300/60 bg-teal-300/10 text-teal-50"
          : "border-amber-300/60 bg-amber-300/10 text-amber-100"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em]">{title}</p>
      <p className="mt-3">{description}</p>
    </div>
  );
};

const DetailSection = ({ detailsSections, closingNotes }) => {
  if (!detailsSections?.length && !closingNotes?.length) {
    return null;
  }

  return (
    <section className="space-y-8">
      {detailsSections?.map((section) => (
        <div key={section.heading} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h3 className="text-lg font-semibold text-white">{section.heading}</h3>
          {section.description && <p className="text-base leading-relaxed text-white/75">{section.description}</p>}
          {section.items && (
            <ul className="space-y-3 text-sm leading-relaxed text-white/70">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-teal-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {closingNotes?.length ? (
        <div className="space-y-3 rounded-3xl border border-teal-300/30 bg-teal-300/10 p-8 text-sm text-white/80">
          {closingNotes.map((note) => (
            <p key={note} className="leading-relaxed">
              {note}
            </p>
          ))}
        </div>
      ) : null}
    </section>
  );
};

const OfferHighlights = ({ item }) => {
  if (!item.highlights?.length) {
    return null;
  }

  return (
    <ul className="mt-6 space-y-3 text-sm leading-relaxed text-white/75">
      {item.highlights.map((highlight) => (
        <li key={highlight} className="flex items-start gap-3">
          <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-teal-300" />
          <span>{highlight}</span>
        </li>
      ))}
    </ul>
  );
};

const SuccessStory = ({ successStory }) => {
  if (!successStory) {
    return null;
  }

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/80">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-200/80">{successStory.heading}</p>
      <p className="text-lg leading-relaxed text-white/90">“{successStory.quote}”</p>
      {successStory.author ? <p className="text-sm font-semibold text-white/60">{successStory.author}</p> : null}
    </div>
  );
};

const OfferCard = ({ item }) => (
  <article className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-2xl backdrop-blur transition hover:border-teal-300 hover:shadow-teal-500/20 sm:p-8">
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
          {item.subtitle && (
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.3em] text-teal-200/80">{item.subtitle}</p>
          )}
        </div>
        {(item.priceLabel || item.price) && (
          <span className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80">
            {item.priceLabel || `$${item.price.usd} / ₹${item.price.inr}`}
          </span>
        )}
      </div>
      <p className="text-base text-white/80">{item.summary}</p>
      <OfferHighlights item={item} />
    </div>

    <div className="mt-6">
      <Link
        to={`/buy/${item.id}`}
        className="inline-flex items-center gap-2 rounded-full border border-teal-300/40 bg-teal-300/10 px-5 py-2 text-sm font-semibold text-teal-200 transition hover:border-teal-200 hover:bg-teal-300/20"
      >
        {item.ctaLabel || "Explore offering"}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </article>
);

const BuyListView = () => {
  useSmoothScroll();
  return (
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
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-300">{section.title}</p>
              <p className="mt-4 text-lg text-white/70">{section.description}</p>
            </div>
            <div className="mt-12 grid gap-10">
              {section.items.map((item) => (
                <OfferCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
};

const BuyDetailView = ({ item, checkoutStatus }) => {
  const { section } = offeringsIndex[item.id];
  const sectionAnchor = section?.id ? `/buy#${section.id}` : "/buy";
  const hasCheckout = Boolean(item.checkoutOptions?.currencies && Object.keys(item.checkoutOptions.currencies).length);
  return (
    <main className="relative z-10">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-950 to-black px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.28),transparent_55%),radial-gradient(circle_at_bottom,_rgba(192,132,252,0.32),transparent_60%)]" />
        <div className="relative mx-auto flex max-w-5xl flex-col gap-6">
          <Link
            to={sectionAnchor}
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-teal-300 hover:text-teal-200"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all offerings
          </Link>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-teal-200/80">
            {section?.title}
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{item.title}</h1>
          <p className="max-w-3xl text-lg text-white/75">{item.longDescription || item.summary}</p>
          {(item.priceLabel || item.price || hasCheckout) && (
            <div className="mt-4 flex flex-wrap items-center gap-4 text-white/80">
              {item.priceLabel ? (
                <span className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold">{item.priceLabel}</span>
              ) : (
                <>
                  {item.price?.usd && (
                    <span className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold">USD ${item.price.usd}</span>
                  )}
                  {item.price?.inr && (
                    <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold">INR ₹{item.price.inr}</span>
                  )}
                </>
              )}
              {!item.priceLabel && !item.price && hasCheckout ? (
                <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold">
                  Pricing shared after checkout selection
                </span>
              ) : null}
            </div>
          )}
          <OfferHighlights item={item} />
        </div>
      </section>

      <section className="bg-gray-950 px-6 pb-24 pt-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr,1.1fr]">
          {checkoutStatus ? (
            <div className="lg:col-span-2">
              <CheckoutStatusBanner status={checkoutStatus} itemTitle={item.title} />
            </div>
          ) : null}
          <div className="space-y-8">
            <SuccessStory successStory={item.successStory} />
            <DetailSection detailsSections={item.detailsSections} closingNotes={item.closingNotes} />
            {item.purchase && (
              <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/80">
                <h3 className="text-lg font-semibold text-white">Need help accessing your files?</h3>
                <p className="text-sm leading-relaxed text-white/70">
                  If the automated download doesn’t land in your inbox within a few minutes, tap the button below and we’ll resend it manually.
                </p>
                <a
                  href={item.purchase.link}
                  className="inline-flex items-center gap-2 rounded-full border border-teal-300/40 bg-teal-300/10 px-5 py-2 text-sm font-semibold text-teal-200 transition hover:border-teal-200 hover:bg-teal-300/20"
                >
                  {item.purchase.label}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>

          <PaymentSection item={item} />
        </div>
      </section>
    </main>
  );
};

const UnknownProduct = () => (
  <main className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center bg-gray-950 px-6 py-24 text-center text-white">
    <h1 className="text-4xl font-bold">Offering not found</h1>
    <p className="mt-4 max-w-xl text-base text-white/70">
      The link you followed is no longer available. Explore the shop to choose a container or ritual that aligns with your current season.
    </p>
    <Link
      to="/buy"
      className="mt-8 inline-flex items-center gap-2 rounded-full border border-teal-300/40 bg-teal-300/10 px-6 py-3 text-sm font-semibold text-teal-200 transition hover:border-teal-200 hover:bg-teal-300/20"
    >
      Return to shop
      <ArrowRight className="h-4 w-4" />
    </Link>
  </main>
);

const Buy = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isDetailRoute = Boolean(productId);
  const product = productId ? offeringsIndex[productId] : null;
  const checkoutStatus = searchParams.get("status");

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950 text-white">
      <Navigation />
      {isDetailRoute ? (
        product ? (
          <BuyDetailView item={product} checkoutStatus={checkoutStatus} />
        ) : (
          <UnknownProduct />
        )
      ) : (
        <BuyListView key={location.key} />
      )}
      <Footer />
    </div>
  );
};

export default Buy;
