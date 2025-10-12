# Client application

This Vite + React app powers the public marketing site and checkout experience for High Frequencies 11.

## Local development

```bash
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in `.env` if you want the client to call a locally running API during development. When the variable is omitted the client will call the same origin that served the static assets.

## Stripe checkout configuration

Checkout behaviour is defined in [`src/data/checkoutCatalog.json`](src/data/checkoutCatalog.json). Each key maps to a product ID that is referenced from [`src/data/offerings.js`](src/data/offerings.js).

Every currency block accepts either a `priceKey` (preferred) or a `unitAmount` fallback:

```json
{
  "email-coaching": {
    "currencies": {
      "usd": {
        "priceKey": "STRIPE_PRICE_EMAIL_COACHING_USD",
        "unitAmount": 25000
      }
    }
  }
}
```

* If you provide `priceKey`, set the matching environment variable (for example `STRIPE_PRICE_EMAIL_COACHING_USD`) to the Stripe price ID in your Vercel project settings.
* If you do not have a pre-created price, keep `unitAmount` (amount in the smallest currency unit) and Stripe will build an ad-hoc price when the checkout session is created.

The `successPath` and `cancelPath` values should point to `/buy/<productId>/status/success` and `/buy/<productId>/status/cancel` respectively. Query-string based paths continue to work, but they are normalised to the new route shape so that deep links never 404.

### Adding additional payment experiences

1. Add a new top-level entry in `checkoutCatalog.json` with the product ID, supported currencies, and either `priceKey` or `unitAmount` values.
2. In `offerings.js`, locate the matching offering and add `checkoutOptions: getCheckoutOptions("your-product-id")`. This automatically wires up the payment form on the detail page.
3. Update the offering’s `paymentMethods` and `manualInstructions` arrays to describe alternative options (UPI, Interac, bank transfer, instalments, etc.). Anything listed here is rendered on the page underneath the Stripe checkout so visitors know how to request a different flow. If you want a dedicated “email me” button for manual arrangements, provide a `manualSupport` object with `label` and `link` values.
4. Deploy to Vercel after setting the Stripe price environment variables and, if you are using manual invoices, update the copy in `manualInstructions` with the right email address or instructions.

Because Stripe Checkout supports wallets natively, adding Apple Pay, Google Pay, and UPI often only requires turning them on inside your Stripe dashboard—no code changes are needed once the product is present in `checkoutCatalog.json`.

## API endpoint

The static build expects the serverless function at `/api/create-checkout-session` to be available (provided by the files in the repository root `api` folder). The client reads the `VITE_API_BASE_URL` to decide where to send the request.
