# Business Website

This repository now includes a sample Stripe Connect integration that demonstrates how to:

- Create connected accounts that use the latest Connect controller configuration.
- Generate Stripe Account Link onboarding flows on demand.
- Create products directly on a connected account using the `Stripe-Account` header.
- Present a simple storefront per connected account and launch Stripe Checkout sessions that apply an application fee.

## Getting started

1. Install dependencies for the web client:
   ```bash
   npm install
   npm install --workspace client
   ```

2. Configure the following environment variables before calling any Stripe endpoints:
   - `STRIPE_SECRET_KEY` &mdash; Your Stripe secret key. Replace any placeholder value before running the sample.
   - `CONNECT_APPLICATION_FEE_AMOUNT` &mdash; Fee amount in cents that the platform will charge on each Checkout session. You can override this per request in the sample API, but the amount must always be less than or equal to the Checkout total.
   - (Optional) `PUBLIC_SITE_URL` &mdash; The fully-qualified URL of your deployed site. Used to generate redirect URLs for onboarding and Checkout success pages.
   - `FORMSPREE_FORM_ID` &mdash; The identifier for your Formspree form (the characters after `/f/` in the URL). Until this is provided the "Share your intentions" form will return a helpful configuration error instead of silently failing.

   The standard store checkout (`/api/create-checkout-session`) looks up the Stripe price ID for each product using the keys listed in `client/src/data/checkoutCatalog.json`. If an environment variable is not set, the handler now falls back to the `unitAmount` defined in that file and sends inline `price_data` to Stripe so you can test quickly without creating prices ahead of time. Update both the human-friendly labels and the `unitAmount` (stored in the currency's smallest unit) whenever you change pricing.

3. Start the Vite development server for the client:
   ```bash
   npm run dev
   ```

The new routes are available at `/connect-demo` for the admin-style workflow and `/storefront/:accountId` for the public storefront. For production usage you should replace the exposed Stripe account ID with an internal identifier that maps to the account in your database.

## API endpoints

The `api/connect` directory contains lightweight handlers that call Stripe's REST API using `fetch` and the `2025-09-30.clover` API version. Each handler validates required inputs, returns descriptive error messages when environment variables are missing, and demonstrates how to send the `Stripe-Account` header when acting on behalf of a connected account.

> **Tip:** Before testing Checkout, confirm in the Connect demo dashboard that the connected account shows `charges_enabled` and the `card_payments` capability set to `active`. The sample now checks those values on each Checkout request and blocks the flow until onboarding is complete.

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/connect/accounts` | `POST` | Creates a connected account with the requested controller settings. |
| `/api/connect/account-link` | `POST` | Generates an onboarding Account Link for the given connected account. |
| `/api/connect/account-status` | `GET` | Retrieves the account status directly from Stripe each time the dashboard loads. |
| `/api/connect/products` | `POST` | Creates a product and default price on the connected account. |
| `/api/connect/products` | `GET` | Lists products for a connected account, expanding their default price. |
| `/api/connect/checkout` | `POST` | Creates a direct charge Checkout Session that includes an application fee. |
| `/api/contact/submit` | `POST` | Proxies contact form submissions to Formspree and surfaces actionable error messages. |

Review the inline comments throughout the client pages for tips on how to adapt this sample for production use.
