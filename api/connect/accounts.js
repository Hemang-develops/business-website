const {
  parseRequestBody,
  stripeRequest,
  sendJson,
} = require("../../shared/stripeConnectHelpers");

module.exports = async function createConnectedAccount(req, res) {
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

  const { email, country, businessType } = payload || {};

  try {
    const account = await stripeRequest("/accounts", {
      method: "POST",
      body: {
        controller: {
          fees: { payer: "account" },
          losses: { payments: "stripe" },
          stripe_dashboard: { type: "full" },
        },
        ...(email ? { email } : {}),
        ...(country ? { country } : {}),
        ...(businessType ? { business_type: businessType } : {}),
      },
    });

    return sendJson(res, 200, {
      accountId: account.id,
      email: account.email,
      country: account.country,
      controller: account.controller,
    });
  } catch (error) {
    const status = error?.status || 500;
    const message =
      error?.message ||
      "Unable to create a connected account. Confirm that your Stripe keys are correct and try again.";
    return sendJson(res, status, { error: message });
  }
};
