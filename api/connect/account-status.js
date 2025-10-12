const {
  parseRequestBody,
  stripeRequest,
  sendJson,
} = require("../../shared/stripeConnectHelpers");

module.exports = async function getAccountStatus(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return sendJson(res, 405, { error: "Method Not Allowed" });
  }

  let accountId = req.query?.accountId;

  if (!accountId && req.method === "POST") {
    try {
      const body = await parseRequestBody(req);
      accountId = body?.accountId;
    } catch (error) {
      return sendJson(res, 400, { error: "Unable to parse request body." });
    }
  }

  if (!accountId) {
    return sendJson(res, 400, { error: "Provide the connected account ID." });
  }

  try {
    const account = await stripeRequest(`/accounts/${accountId}`, {
      method: "GET",
    });

    const requirements = account.requirements || {};

    return sendJson(res, 200, {
      accountId: account.id,
      email: account.email,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      capabilities: account.capabilities,
      detailsSubmitted: account.details_submitted,
      currentlyDue: requirements.currently_due || [],
      pastDue: requirements.past_due || [],
      disabledReasons: requirements.disabled_reason || null,
    });
  } catch (error) {
    const status = error?.status || 500;
    const message =
      error?.message ||
      "Unable to retrieve the account status. Confirm that the account exists and your Stripe key has access.";
    return sendJson(res, status, { error: message });
  }
};
