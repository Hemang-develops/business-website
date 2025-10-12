import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Storefront = () => {
  const { accountId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      if (!accountId) {
        setError("Missing connected account ID.");
        setLoading(false);
        return;
      }

      setError("");
      setLoading(true);
      try {
        const response = await fetch(`/api/connect/products?accountId=${encodeURIComponent(accountId)}`);
        const data = await response.json();
        if (!response.ok) {
          setError(data?.error || "Unable to load products for this account.");
          setProducts([]);
          return;
        }
        setProducts(data.products || []);
      } catch (fetchError) {
        console.error("Storefront product fetch failed", fetchError);
        setError("Network error while loading products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [accountId]);

  const handleCheckout = async (priceId) => {
    setCheckoutError("");
    try {
      const response = await fetch("/api/connect/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId, priceId }),
      });
      const data = await response.json();
      if (!response.ok) {
        setCheckoutError(data?.error || "Unable to start checkout.");
        return;
      }
      window.location.href = data.url;
    } catch (error) {
      console.error("Storefront checkout creation failed", error);
      setCheckoutError("Network error while creating the Checkout Session.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-16 text-white">
      <div className="mx-auto max-w-4xl px-6">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-teal-200">Creator storefront</p>
          <h1 className="mt-4 text-3xl font-semibold md:text-4xl">Browse and purchase creator offerings</h1>
          {/* In production, replace the raw Stripe account ID in the URL with a slug or ID from your database. */}
          <p className="mt-3 text-sm text-white/60">Account: {accountId}</p>
          <p className="mt-2 text-sm text-white/70">
            This page fetches products directly from the connected account via the Stripe-Account header and launches Stripe
            Checkout with a platform application fee.
          </p>
          <div className="mt-4 text-sm text-white/60">
            <Link to="/connect-demo" className="underline decoration-teal-400 decoration-2 underline-offset-4">
              Back to Connect demo
            </Link>
          </div>
        </header>

        <main className="mt-10 space-y-6">
          {loading && <p className="text-center text-sm text-white/60">Loading products…</p>}
          {error && <p className="text-center text-sm text-red-400">{error}</p>}
          {!loading && !error && !products.length && (
            <p className="text-center text-sm text-white/60">No products found. Create one from the Connect demo dashboard.</p>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <article key={product.id} className="rounded-3xl border border-white/10 bg-gray-900/60 p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                <p className="mt-2 text-sm text-white/70">{product.description || "No description provided."}</p>
                {product.priceId ? (
                  <p className="mt-4 text-lg font-semibold text-teal-200">
                    {product.unitAmount ? (product.unitAmount / 100).toFixed(2) : "--"} {product.currency?.toUpperCase()}
                  </p>
                ) : (
                  <p className="mt-4 text-sm text-red-300">This product does not have a default price.</p>
                )}
                {product.priceId && (
                  <button
                    type="button"
                    onClick={() => handleCheckout(product.priceId)}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold text-gray-950 transition hover:bg-teal-400"
                  >
                    Buy with Stripe Checkout
                  </button>
                )}
              </article>
            ))}
          </div>
          {checkoutError && <p className="text-center text-sm text-red-400">{checkoutError}</p>}
        </main>
      </div>
    </div>
  );
};

export default Storefront;
