const checkoutCatalog = require("../client/src/data/checkoutCatalog.json");

const errorResponse = (res, status, message) => {
  res.status(status).json({ error: message });
};

const resolveOrigin = (req) => {
  if (req.headers.origin) {
    return req.headers.origin;
  }
  if (process.env.PUBLIC_SITE_URL) {
    return process.env.PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return "https://example.com";
};

async function createCheckoutSessionHandler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return errorResponse(res, 405, "Method Not Allowed");
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return errorResponse(res, 500, "Stripe secret key is not configured.");
  }

  const { productId, currency, entityType, firstName, email, country } = req.body || {};

  if (!productId) {
    return errorResponse(res, 400, "Product ID is required.");
  }

  const productConfig = checkoutCatalog[productId];
  if (!productConfig) {
    return errorResponse(res, 400, "Checkout is not configured for this product.");
  }

  const resolvedCurrency = currency || productConfig.defaultCurrency;
  const currencyConfig = productConfig.currencies?.[resolvedCurrency];
  if (!currencyConfig) {
    return errorResponse(res, 400, "Selected currency is not available for this product.");
  }

  const priceKey = currencyConfig.priceKey;
  if (!priceKey) {
    return errorResponse(res, 500, "Stripe price configuration is missing for this product.");
  }

  const priceId = process.env[priceKey];
  if (!priceId) {
    return errorResponse(
      res,
      500,
      `Stripe price ID for ${resolvedCurrency?.toUpperCase()} currency is not set.`,
    );
  }

  if (!email) {
    return errorResponse(res, 400, "Email is required to begin checkout.");
  }

  const origin = resolveOrigin(req);
  const successPath = productConfig.successPath || `/buy/${productId}?status=success`;
  const cancelPath = productConfig.cancelPath || `/buy/${productId}?status=cancel`;
  const successUrl = `${origin}${successPath}`;
  const cancelUrl = `${origin}${cancelPath}`;

  const body = new URLSearchParams();
  body.append("mode", currencyConfig.mode || productConfig.mode || "payment");
  body.append("success_url", successUrl);
  body.append("cancel_url", cancelUrl);
  body.append("line_items[0][price]", priceId);
  body.append("line_items[0][quantity]", "1");
  body.append("customer_email", email);

  if (entityType) {
    body.append("custom_fields[0][key]", "entity_type");
    body.append("custom_fields[0][label][type]", "custom");
    body.append("custom_fields[0][label][custom]", "Account type");
    body.append("custom_fields[0][type]", "text");
    body.append("custom_fields[0][text][value]", entityType);
  }

  if (firstName) {
    body.append("metadata[first_name]", firstName);
  }

  if (country) {
    body.append("metadata[country]", country);
  }

  body.append("metadata[product_id]", productId);
  body.append("metadata[currency]", resolvedCurrency);

  try {
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data?.error?.message || "Unable to create Stripe checkout session.";
      return errorResponse(res, response.status, message);
    }

    if (!data?.url) {
      return errorResponse(res, 500, "Stripe did not return a checkout URL.");
    }

    return res.status(200).json({ url: data.url });
  } catch (error) {
    console.error("Stripe checkout session error", error);
    return errorResponse(res, 500, "Unexpected error while creating checkout session.");
  }
}

module.exports = createCheckoutSessionHandler;

