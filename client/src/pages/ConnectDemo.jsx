import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const initialProductForm = {
  name: "",
  description: "",
  priceInCents: "",
  currency: "usd",
};

const ConnectDemo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accountId, setAccountId] = useState(searchParams.get("accountId") || "");
  const [newAccountEmail, setNewAccountEmail] = useState("");
  const [newAccountCountry, setNewAccountCountry] = useState("US");
  const [newAccountBusinessType, setNewAccountBusinessType] = useState("individual");
  const [status, setStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [accountError, setAccountError] = useState("");
  const [accountMessage, setAccountMessage] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [productForm, setProductForm] = useState(initialProductForm);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [productError, setProductError] = useState("");
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    if (accountId) {
      setSearchParams({ accountId });
      refreshAccountStatus(accountId);
      loadProducts(accountId);
    } else {
      setSearchParams({});
      setStatus(null);
      setProducts([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  const onboardingReady = useMemo(() => Boolean(accountId), [accountId]);

  const refreshAccountStatus = async (targetAccountId = accountId) => {
    if (!targetAccountId) {
      setAccountError("Create or enter an account ID first.");
      return;
    }

    setStatusLoading(true);
    setAccountError("");
    try {
      const response = await fetch(`/api/connect/account-status?accountId=${encodeURIComponent(targetAccountId)}`);
      const data = await response.json();
      if (!response.ok) {
        setAccountError(data?.error || "Unable to fetch account status.");
        setStatus(null);
        return;
      }
      setStatus(data);
      setAccountMessage("Account status refreshed from Stripe.");
    } catch (error) {
      console.error("Account status fetch failed", error);
      setAccountError("Network error while fetching account status.");
    } finally {
      setStatusLoading(false);
    }
  };

  const handleAccountIdChange = (event) => {
    setAccountId(event.target.value.trim());
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    setCreatingAccount(true);
    setAccountError("");
    setAccountMessage("");
    try {
      const response = await fetch("/api/connect/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newAccountEmail || undefined,
          country: newAccountCountry || undefined,
          businessType: newAccountBusinessType || undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setAccountError(data?.error || "Unable to create the account.");
        return;
      }
      setAccountId(data.accountId);
      setAccountMessage("Connected account created. Continue with onboarding.");
      setNewAccountEmail("");
    } catch (error) {
      console.error("Connected account creation failed", error);
      setAccountError("Network error while creating the account.");
    } finally {
      setCreatingAccount(false);
    }
  };

  const handleStartOnboarding = async () => {
    if (!accountId) {
      setAccountError("Create or select an account before onboarding.");
      return;
    }

    setAccountError("");
    setAccountMessage("");
    try {
      const response = await fetch("/api/connect/account-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId }),
      });
      const data = await response.json();
      if (!response.ok) {
        setAccountError(data?.error || "Unable to generate an onboarding link.");
        return;
      }
      window.open(data.onboardingUrl, "_blank", "noopener");
      setAccountMessage("Onboarding link opened in a new tab. Complete onboarding with Stripe.");
    } catch (error) {
      console.error("Account link creation failed", error);
      setAccountError("Network error while starting onboarding.");
    }
  };

  const loadProducts = async (targetAccountId = accountId) => {
    if (!targetAccountId) {
      setProducts([]);
      return;
    }

    setProductError("");
    try {
      const response = await fetch(`/api/connect/products?accountId=${encodeURIComponent(targetAccountId)}`);
      const data = await response.json();
      if (!response.ok) {
        setProductError(data?.error || "Unable to load products.");
        setProducts([]);
        return;
      }
      setProducts(data.products || []);
    } catch (error) {
      console.error("Product list fetch failed", error);
      setProductError("Network error while loading products.");
    }
  };

  const handleProductFormChange = (event) => {
    const { name, value } = event.target;
    setProductForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    if (!accountId) {
      setProductError("Create or enter an account ID first.");
      return;
    }

    setCreatingProduct(true);
    setProductError("");
    try {
      const response = await fetch("/api/connect/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId,
          name: productForm.name,
          description: productForm.description,
          currency: productForm.currency,
          priceInCents: productForm.priceInCents ? Number(productForm.priceInCents) : undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setProductError(data?.error || "Unable to create the product.");
        return;
      }
      setProductForm(initialProductForm);
      await loadProducts(accountId);
    } catch (error) {
      console.error("Product creation failed", error);
      setProductError("Network error while creating the product.");
    } finally {
      setCreatingProduct(false);
    }
  };

  const handleCheckout = async (priceId) => {
    if (!accountId) {
      setCheckoutError("Create or enter an account ID first.");
      return;
    }

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
      console.error("Checkout Session creation failed", error);
      setCheckoutError("Network error while creating the Checkout Session.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-16 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6">
        <header className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-teal-200">Stripe Connect Demo</p>
          <h1 className="text-3xl font-semibold md:text-4xl">Onboard creators, list their products, and collect payments</h1>
          <p className="text-base text-white/70">
            This sample shows how to create connected accounts, onboard them with Stripe Account Links,
            create products on the connected account, and launch Checkout sessions that include an application fee.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-gray-900/60 p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-teal-200">1. Create or load a connected account</h2>
          <p className="mt-2 text-sm text-white/70">
            Fill in optional details to pre-populate information for onboarding. The Stripe account is created with the
            controller configuration requested in this exercise.
          </p>
          <form onSubmit={handleCreateAccount} className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              <span>Email (optional)</span>
              <input
                type="email"
                className="rounded-xl border border-white/10 bg-gray-950/60 px-4 py-3 text-white focus:border-teal-300 focus:outline-none"
                placeholder="creator@example.com"
                value={newAccountEmail}
                onChange={(event) => setNewAccountEmail(event.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span>Country</span>
              <input
                type="text"
                className="rounded-xl border border-white/10 bg-gray-950/60 px-4 py-3 text-white focus:border-teal-300 focus:outline-none"
                placeholder="US"
                value={newAccountCountry}
                onChange={(event) => setNewAccountCountry(event.target.value.toUpperCase())}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm md:col-span-2">
              <span>Business type</span>
              <input
                type="text"
                className="rounded-xl border border-white/10 bg-gray-950/60 px-4 py-3 text-white focus:border-teal-300 focus:outline-none"
                placeholder="individual"
                value={newAccountBusinessType}
                onChange={(event) => setNewAccountBusinessType(event.target.value)}
              />
            </label>
            <button
              type="submit"
              className="md:col-span-2 inline-flex items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-teal-400"
              disabled={creatingAccount}
            >
              {creatingAccount ? "Creating account..." : "Create connected account"}
            </button>
          </form>
          <div className="mt-6 space-y-3">
            <label className="flex flex-col gap-2 text-sm">
              <span>Current account ID</span>
              <input
                type="text"
                className="rounded-xl border border-white/10 bg-gray-950/60 px-4 py-3 font-mono text-sm text-white focus:border-teal-300 focus:outline-none"
                placeholder="acct_..."
                value={accountId}
                onChange={handleAccountIdChange}
              />
            </label>
            <p className="text-xs text-white/60">
              Paste an existing connected account ID to continue testing. For production you should store an internal
              identifier instead of exposing the Stripe account ID directly in URLs.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => refreshAccountStatus()}
                className="inline-flex items-center rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition hover:border-teal-300"
                disabled={!accountId || statusLoading}
              >
                {statusLoading ? "Refreshing..." : "Refresh status"}
              </button>
              <button
                type="button"
                onClick={handleStartOnboarding}
                className="inline-flex items-center rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                disabled={!onboardingReady}
              >
                Onboard to collect payments
              </button>
              {accountId && (
                <>
                  {/* In production, replace the Stripe account ID with an internal identifier before generating storefront URLs. */}
                  <Link
                    to={`/storefront/${accountId}`}
                    className="inline-flex items-center rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold text-gray-950 transition hover:bg-teal-400"
                  >
                    View sample storefront
                  </Link>
                </>
              )}
            </div>
            {accountError && <p className="text-sm text-red-400">{accountError}</p>}
            {accountMessage && <p className="text-sm text-teal-300">{accountMessage}</p>}
          </div>
          {status && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-gray-950/60 p-6">
              <h3 className="text-lg font-semibold text-teal-200">Live status (always fetched directly from Stripe)</h3>
              <dl className="mt-4 grid gap-4 md:grid-cols-2">
                <StatusItem label="Charges enabled" value={status.chargesEnabled ? "Yes" : "No"} />
                <StatusItem label="Payouts enabled" value={status.payoutsEnabled ? "Yes" : "No"} />
                <StatusItem label="Details submitted" value={status.detailsSubmitted ? "Yes" : "No"} />
                <StatusItem label="Email" value={status.email || "Not provided"} />
              </dl>
              {Boolean(status.currentlyDue?.length) && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-white/80">Currently due requirements</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/60">
                    {status.currentlyDue.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {status.disabledReasons && (
                <p className="mt-4 text-sm text-red-400">Disabled reason: {status.disabledReasons}</p>
              )}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-white/10 bg-gray-900/60 p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-teal-200">2. Create products on the connected account</h2>
          <p className="mt-2 text-sm text-white/70">
            Products are created directly on the connected account by sending requests with the Stripe-Account header.
          </p>
          <form onSubmit={handleCreateProduct} className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              <span>Product name</span>
              <input
                type="text"
                name="name"
                className="rounded-xl border border-white/10 bg-gray-950/60 px-4 py-3 text-white focus:border-teal-300 focus:outline-none"
                value={productForm.name}
                onChange={handleProductFormChange}
                placeholder="Energy healing session"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span>Currency</span>
              <input
                type="text"
                name="currency"
                className="rounded-xl border border-white/10 bg-gray-950/60 px-4 py-3 uppercase text-white focus:border-teal-300 focus:outline-none"
                value={productForm.currency}
                onChange={handleProductFormChange}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm md:col-span-2">
              <span>Description</span>
              <textarea
                name="description"
                className="rounded-xl border border-white/10 bg-gray-950/60 px-4 py-3 text-white focus:border-teal-300 focus:outline-none"
                rows={3}
                value={productForm.description}
                onChange={handleProductFormChange}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm md:col-span-2">
              <span>Price in cents</span>
              <input
                type="number"
                name="priceInCents"
                className="rounded-xl border border-white/10 bg-gray-950/60 px-4 py-3 text-white focus:border-teal-300 focus:outline-none"
                value={productForm.priceInCents}
                onChange={handleProductFormChange}
                placeholder="2500"
                min="1"
              />
            </label>
            <button
              type="submit"
              className="md:col-span-2 inline-flex items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-teal-400"
              disabled={creatingProduct}
            >
              {creatingProduct ? "Creating product..." : "Create product"}
            </button>
          </form>
          {productError && <p className="mt-4 text-sm text-red-400">{productError}</p>}
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-teal-200">Products on this account</h3>
            {!products.length ? (
              <p className="text-sm text-white/60">Create a product to populate the sample storefront.</p>
            ) : (
              <ul className="space-y-4">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-gray-950/60 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="text-base font-medium text-white">{product.name}</p>
                      <p className="text-sm text-white/60">{product.description || "No description"}</p>
                      {product.priceId && (
                        <p className="mt-1 text-sm text-teal-200">
                          {product.unitAmount ? (product.unitAmount / 100).toFixed(2) : "--"} {product.currency?.toUpperCase()}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.priceId ? (
                        <button
                          type="button"
                          onClick={() => handleCheckout(product.priceId)}
                          className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                        >
                          Start Checkout
                        </button>
                      ) : (
                        <span className="text-xs text-red-300">Product is missing a default price.</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {checkoutError && <p className="text-sm text-red-400">{checkoutError}</p>}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-gray-900/60 p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-teal-200">3. Share the storefront</h2>
          <p className="mt-2 text-sm text-white/70">
            The demo storefront lists products for a single connected account and redirects to Stripe Checkout. Replace the
            Stripe account ID in the URL with an internal identifier before you launch this in production.
          </p>
          {accountId ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {/* In production, replace the Stripe account ID with a slug or internal reference that you store in your database. */}
              <Link
                to={`/storefront/${accountId}`}
                className="inline-flex items-center rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold text-gray-950 transition hover:bg-teal-400"
              >
                Preview storefront
              </Link>
              <code className="rounded-xl bg-gray-950/60 px-4 py-2 text-xs text-white/70">/storefront/{accountId}</code>
            </div>
          ) : (
            <p className="mt-4 text-sm text-white/60">Create or load an account to share a storefront link.</p>
          )}
        </section>
      </div>
    </div>
  );
};

const StatusItem = ({ label, value }) => (
  <div className="rounded-2xl border border-white/5 bg-gray-950/40 p-4">
    <dt className="text-xs uppercase tracking-[0.3em] text-white/50">{label}</dt>
    <dd className="mt-2 text-base font-semibold text-white">{value}</dd>
  </div>
);

export default ConnectDemo;
