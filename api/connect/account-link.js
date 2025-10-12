const {
  parseRequestBody,
  stripeRequest,
  resolveOrigin,
  sendJson,
} = require("../../shared/stripeConnectHelpers");

module.exports = async function createAccountLink(req, res) {
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
  if (!accountId) {
    return sendJson(res, 400, { error: "Provide the connected account ID." });
  }

  const origin = resolveOrigin(req);
  const returnUrl = payload?.returnUrl || `${origin}/connect/checkout-status?status=onboarding_complete`;
  const refreshUrl = payload?.refreshUrl || `${origin}/connect-demo?accountId=${encodeURIComponent(accountId)}`;

  try {
    const link = await stripeRequest("/account_links", {
      method: "POST",
      body: {
        account: accountId,
        refresh_url: refreshUrl,
        return_url: returnUrl,
        type: "account_onboarding",
      },
    });

    return sendJson(res, 200, {
      onboardingUrl: link.url,
      expiresAt: link.expires_at,
    });
  } catch (error) {
    const status = error?.status || 500;
    const message =
      error?.message ||
      "Unable to create an onboarding link. Confirm that the account exists and that your URLs are HTTPS.";
    return sendJson(res, status, { error: message });
  }
};
