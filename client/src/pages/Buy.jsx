import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { buySections, offeringsIndex } from "../data/offerings";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const isExternalLink = (link) => typeof link === "string" && /^(https?:|upi:)/.test(link);

const PaymentLinkButton = ({ href, label }) => {
  if (!href) {
    return null;
  }

  const external = isExternalLink(href);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-300 px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-teal-200"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
};

const PaymentSection = ({ item }) => {
  const usdLink = item.paymentLinks?.usd;
  const inrLink = item.paymentLinks?.inr;
  const hasPaymentGateway = Boolean(usdLink || inrLink);
  const backupLink = item.purchase?.link || item.actionLink;
  const backupLabel = item.purchase?.label || item.ctaLabel || "Email for support";

  return (
    <section className="mt-12 grid gap-6 rounded-3xl border border-white/5 bg-white/5 p-8 text-white/90 shadow-2xl backdrop-blur lg:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Checkout</h3>
        {hasPaymentGateway ? (
          <>
            <p className="text-sm text-white/70">
              Choose the currency that serves you best. Payments open in a secure gateway window and are processed immediately.
            </p>
            <div className="flex flex-wrap gap-3">
              {usdLink && (
                <PaymentLinkButton href={usdLink} label={`Pay $${item.price?.usd ?? ""} USD`} />
              )}
              {inrLink && (
                <PaymentLinkButton href={inrLink} label={`Pay ₹${item.price?.inr ?? ""} INR`} />
              )}
            </div>
          </>
        ) : (
          <p className="text-sm text-white/70">
            Secure payment links for this offering are being finalised. Send a quick note and you’ll receive a private checkout link immediately.
          </p>
        )}
      </div>
      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/10 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-200/80">Need a different flow?</p>
        {hasPaymentGateway ? (
          <p className="text-sm text-white/70">
            Prefer a manual invoice or a different currency? Reach out and we’ll arrange it for you within 24 hours.
          </p>
        ) : (
          <p className="text-sm text-white/70">
            We’ll send you the payment link manually and make sure you have everything you need within a few minutes.
          </p>
        )}
        {backupLink && (
          <a
            href={backupLink}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-200 transition hover:text-teal-100"
          >
            {backupLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </section>
  );
};

const DetailSection = ({ detailsSections, closingNotes }) => {
  if (!detailsSections?.length && !closingNotes?.length) {
    return null;
  }

  return (
    <section className="mt-12 space-y-8">
      {detailsSections?.map((section) => (
        <div key={section.heading} className="space-y-4 rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur">
          <h3 className="text-lg font-semibold text-white">✧ {section.heading}</h3>
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
        {item.price && (
          <span className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80">
            ${item.price.usd} / ₹{item.price.inr}
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

const BuyDetailView = ({ item }) => {
  const { section } = offeringsIndex[item.id];
  return (
    <main className="relative z-10">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-950 to-black px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.28),transparent_55%),radial-gradient(circle_at_bottom,_rgba(192,132,252,0.32),transparent_60%)]" />
        <div className="relative mx-auto flex max-w-5xl flex-col gap-6">
          <Link
            to="/buy"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-teal-300 hover:text-teal-200"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all offerings
          </Link>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-teal-200/80">
            {section?.title}
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{item.title}</h1>
          <p className="max-w-3xl text-lg text-white/75">{item.longDescription || item.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-white/80">
            {item.price?.usd && (
              <span className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold">
                USD ${item.price.usd}
              </span>
            )}
            {item.price?.inr && (
              <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold">
                INR ₹{item.price.inr}
              </span>
            )}
          </div>
          <OfferHighlights item={item} />
        </div>
      </section>

      <section className="bg-gray-950 px-6 pb-24 pt-12">
        <div className="mx-auto max-w-4xl">
          <PaymentSection item={item} />
          <DetailSection detailsSections={item.detailsSections} closingNotes={item.closingNotes} />

          {item.purchase && (
            <div className="mt-12 rounded-3xl border border-white/5 bg-white/5 p-8 text-white/75">
              <h3 className="text-lg font-semibold text-white">Need help accessing your files?</h3>
              <p className="mt-2 text-sm leading-relaxed">
                If the automated download doesn’t land in your inbox within a few minutes, tap the button below and we’ll resend it manually.
              </p>
              <a
                href={item.purchase.link}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-teal-300/40 bg-teal-300/10 px-5 py-2 text-sm font-semibold text-teal-200 transition hover:border-teal-200 hover:bg-teal-300/20"
              >
                {item.purchase.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
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
  const isDetailRoute = Boolean(productId);
  const product = productId ? offeringsIndex[productId] : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950 text-white">
      <Navigation />
      {isDetailRoute ? (
        product ? <BuyDetailView item={product} /> : <UnknownProduct />
      ) : (
        <BuyListView key={location.key} />
      )}
      <Footer />
    </div>
  );
};

export default Buy;
