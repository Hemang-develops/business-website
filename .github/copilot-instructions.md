Project overview

This repo is a small marketing + checkout sample built with a Vite + React client and lightweight serverless API handlers
that talk to Stripe (including Stripe Connect). The client lives in `client/` and serverless endpoints live in the repository
root `api/` folder (these are Vercel-style handlers that mostly `require()` shared helper modules from `shared/`).

Quick start (local)

- **Install**: `npm install` then `npm install --workspace client` (or run `npm install` at root then `cd client && npm install`).
- **Dev**: `npm run dev` from the repository root — it proxies to the client workspace (`client`) and runs the Vite dev server.
- **Build**: `npm run build` (builds the client). Preview static build with `npm run preview`.
- **Serverless locally**: use `vercel dev` or another local serverless runner and set `VITE_API_BASE_URL` if your API runs on a different origin.

Where to look first

- Client entry: `client/src/main.jsx` and pages under `client/src/pages/` (notably `Buy.jsx` and `ConnectDemo.jsx`).
- Checkout config: `client/src/data/checkoutCatalog.json` — contains `priceKey` or `unitAmount` fallbacks used by the server.
- Shared API helpers: `shared/createCheckoutSession.js` and `shared/stripeConnectHelpers.js` — these show how Stripe requests are composed and how the platform
  uses `Stripe-Account` headers for Connect flows.
- Serverless adapter files: `api/*.js` and `api/connect/*.js` — these are thin adapters that `require()` modules from `shared/`.

Important patterns and conventions

- Environment variables:
  - Platform/Stripe: `STRIPE_SECRET_KEY`, `CONNECT_APPLICATION_FEE_AMOUNT`, `PUBLIC_SITE_URL`, `FORMSPREE_FORM_ID`.
  - Client (Vite): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_BASE_URL`.
  - Stripe price IDs: variables named in `checkoutCatalog.json` (e.g. `STRIPE_PRICE_EMAIL_COACHING_USD`). The server will fall back to
    `unitAmount` in `checkoutCatalog.json` if the matching env var is not set.

- Checkout creation: `shared/createCheckoutSession.js` builds either a `line_items[0][price]` when a price ID env var exists or an
  ad-hoc `price_data` payload when only `unitAmount` is present. It appends metadata fields such as `metadata[first_name]`, `metadata[product_id]`, and `metadata[currency]`.

- Connect flows: `client/src/pages/ConnectDemo.jsx` demonstrates these endpoints:
  - `POST /api/connect/accounts` — create connected account
  - `POST /api/connect/account-link` — generate onboarding link
  - `GET /api/connect/account-status` — fetch live Stripe status
  - `GET|POST /api/connect/products` — list/create products on connected account
  - `POST /api/connect/checkout` — create a Checkout session for a connected account

- Stripe helper: `shared/stripeConnectHelpers.js` sets `Stripe-Version: 2025-09-30.clover` and exposes `encodeFormData`, `stripeRequest`, and a small request parser. Use these helpers when adding new serverless code.

Developer workflows & tips

- Running locally: the client expects `/api/create-checkout-session` to exist relative to the served origin. When developing the client separately, set `VITE_API_BASE_URL` to a running API host (or run `vercel dev` to serve both).
- To add a new checkout product:
  1. Add entry in `client/src/data/checkoutCatalog.json` with a `priceKey` (preferred) or `unitAmount` fallback.
  2. If using `priceKey`, add the Stripe price ID to the environment (e.g. `STRIPE_PRICE_...`).
  3. Update `client/src/data/offerings.js` to include `checkoutOptions: getCheckoutOptions("your-product-id")`.

- Linting: run `npm run lint` at the repo root (delegates to `client` eslint). Keep eslint errors minimal — the project expects modern React + Vite conventions.

Examples & quick references

- Client calls checkout: `fetch(
    `${apiBase}/api/create-checkout-session`,
    { method: 'POST', body: JSON.stringify({ productId, currency, firstName, email, country }) }
  )`
- Shared adapter example: `api/create-checkout-session.js` simply `module.exports = require('../shared/createCheckoutSession')` — follow this pattern when adding new top-level serverless files that delegate to shared logic.

Security & deployment notes

- Do not expose `STRIPE_SECRET_KEY` in client code or public logs. The serverless functions rely on this env var and will throw meaningful errors if missing.
- In production, do not expose Stripe account IDs in public URLs. The `ConnectDemo` explains this and the code warns about storing internal identifiers instead.
- Deploy target: `vercel.json` is present with a simple fallback route; this repo expects deployment to Vercel or any platform that supports Node-style serverless functions.

What to ask next

- Do you want the agent to also add doc links or check-list items to CI that validate required env vars? If yes, tell me which environment (local/dev/staging/prod) to prioritise.
