const {
  parseRequestBody,
  stripeRequest,
  resolveOrigin,
  sendJson,
} = require("../../shared/stripeConnectHelpers");

const getApplicationFeeAmount = (payload) => {
  if (payload?.applicationFeeAmount !== undefined) {
    const provided = Number(payload.applicationFeeAmount);
    if (!Number.isFinite(provided) || provided < 0) {
      throw new Error(
        "applicationFeeAmount must be a non-negative integer that represents the fee amount in cents."
      );
    }
    return Math.round(provided);
  }

  const envValue = process.env.CONNECT_APPLICATION_FEE_AMOUNT;
  if (!envValue) {
    throw new Error(
      "Set CONNECT_APPLICATION_FEE_AMOUNT in your environment or include applicationFeeAmount in the request body."
    );
  }

  const parsed = Number(envValue);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(
      "CONNECT_APPLICATION_FEE_AMOUNT must be a non-negative integer stored in cents (for example, 200 for $2)."
    );
  }
  return Math.round(parsed);
};

module.exports = async function createDirectChargeCheckout(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method Not Allowed" });
  }

  let payload;
  try {
    payload = await parseRequestBody(req);
  } catch (error) {
    return sendJson(res, 400, { error: "Unable to parse request body." });
  }

  const accountId = payload?.accountId;
  const priceId = payload?.priceId;
  const quantity = Number(payload?.quantity || 1);
  const customerEmail = payload?.customerEmail;

  if (!accountId) {
    return sendJson(res, 400, { error: "Provide the connected account ID." });
  }

  if (!priceId) {
    return sendJson(res, 400, { error: "Provide the Stripe price ID to sell." });
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    return sendJson(res, 400, { error: "Quantity must be a positive integer." });
  }

  let feeAmount;
  try {
    feeAmount = getApplicationFeeAmount(payload);
  } catch (error) {
    return sendJson(res, 400, { error: error.message });
  }

  const origin = resolveOrigin(req);
  const successUrl = `${origin}/connect/checkout-status?status=success`;
  const cancelUrl = `${origin}/connect/checkout-status?status=cancel`;

  try {
    const account = await stripeRequest(`/accounts/${accountId}`, {
      method: "GET",
    });

    const cardCapability = account?.capabilities?.card_payments;
    const cardPaymentsBlocked = typeof cardCapability === "string" && cardCapability !== "active";
    if (!account?.charges_enabled || cardPaymentsBlocked) {
      return sendJson(res, 400, {
        error:
          "This connected account cannot accept card payments yet. Complete onboarding in the Stripe Dashboard and try again.",
      });
    }

    const price = await stripeRequest(`/prices/${priceId}`, {
      stripeAccount: accountId,
    });

    if (!price?.active) {
      return sendJson(res, 400, { error: "The selected price is inactive. Choose an active price and try again." });
    }

    if (!Number.isFinite(price?.unit_amount)) {
      return sendJson(res, 400, {
        error: "The selected price is missing a unit amount. Create the product again with default_price_data set.",
      });
    }

    const lineTotal = Math.round(price.unit_amount) * Math.round(quantity);

    if (feeAmount > lineTotal) {
      return sendJson(res, 400, {
        error:
          "The application fee is larger than the checkout amount. Lower the platform fee or increase the product price.",
      });
    }

    const session = await stripeRequest("/checkout/sessions", {
      method: "POST",
      stripeAccount: accountId,
      body: {
        mode: "payment",
        success_url: `${successUrl}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl,
        line_items: [
          {
            price: priceId,
            quantity: Math.round(quantity),
          },
        ],
        payment_intent_data: {
          application_fee_amount: feeAmount,
        },
        ...(customerEmail ? { customer_email: customerEmail } : {}),
      },
    });

    if (!session?.url) {
      return sendJson(res, 502, { error: "Stripe did not return a Checkout URL." });
    }

    return sendJson(res, 200, { url: session.url, sessionId: session.id });
  } catch (error) {
    const status = error?.status || 500;
    const message =
      error?.message ||
      "Unable to create a Checkout Session for the connected account. Confirm the price ID and onboarding status.";
    return sendJson(res, status, { error: message });
  }
};
