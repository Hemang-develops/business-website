const {
  parseRequestBody,
  stripeRequest,
  sendJson,
} = require("../../shared/stripeConnectHelpers");

module.exports = async function handleProducts(req, res) {
  if (req.method === "POST") {
    return createProduct(req, res);
  }

  if (req.method === "GET") {
    return listProducts(req, res);
  }

  res.setHeader("Allow", "GET, POST");
  return sendJson(res, 405, { error: "Method Not Allowed" });
};

async function createProduct(req, res) {
  let payload;
  try {
    payload = await parseRequestBody(req);
  } catch (error) {
    return sendJson(res, 400, { error: "Unable to parse request body." });
  }

  const accountId = payload?.accountId;
  const name = payload?.name;
  const description = payload?.description;
  const currency = payload?.currency || "usd";
  const price = Number(payload?.priceInCents);

  if (!accountId) {
    return sendJson(res, 400, { error: "Provide the connected account ID." });
  }

  if (!name) {
    return sendJson(res, 400, { error: "Product name is required." });
  }

  if (!Number.isFinite(price) || price <= 0) {
    return sendJson(res, 400, {
      error: "Provide priceInCents as a positive integer representing the price in the smallest currency unit.",
    });
  }

  try {
    const product = await stripeRequest("/products", {
      method: "POST",
      stripeAccount: accountId,
      body: {
        name,
        ...(description ? { description } : {}),
        default_price_data: {
          currency,
          unit_amount: Math.round(price),
        },
        metadata: {
          created_with_demo: "connect-sample",
        },
      },
    });

    const defaultPrice = product.default_price;

    let priceSummary = null;
    if (defaultPrice) {
      try {
        const priceData = await stripeRequest(`/prices/${defaultPrice}`, {
          stripeAccount: accountId,
        });
        priceSummary = {
          id: priceData.id,
          unitAmount: priceData.unit_amount,
          currency: priceData.currency,
        };
      } catch (error) {
        priceSummary = null;
      }
    }

    return sendJson(res, 200, {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        defaultPrice: priceSummary,
      },
    });
  } catch (error) {
    const status = error?.status || 500;
    const message =
      error?.message ||
      "Unable to create the product on the connected account. Confirm the account is onboarded and try again.";
    return sendJson(res, status, { error: message });
  }
}

async function listProducts(req, res) {
  const accountId = req.query?.accountId;
  if (!accountId) {
    return sendJson(res, 400, { error: "Provide the connected account ID." });
  }

  const path =
    "/products?limit=20&active=true&expand[]=data.default_price&expand[]=data.default_price.currency_options";

  try {
    const products = await stripeRequest(path, {
      stripeAccount: accountId,
    });

    const formatted = (products?.data || []).map((product) => {
      const defaultPrice = product.default_price || {};
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        priceId: defaultPrice?.id || null,
        currency: defaultPrice?.currency || null,
        unitAmount: defaultPrice?.unit_amount || null,
      };
    });

    return sendJson(res, 200, { products: formatted });
  } catch (error) {
    const status = error?.status || 500;
    const message =
      error?.message ||
      "Unable to retrieve products for the connected account. Confirm the account ID and onboarding status.";
    return sendJson(res, status, { error: message });
  }
}
