const API_VERSION = "2025-09-30.clover";
const STRIPE_API_BASE = "https://api.stripe.com/v1";

const encodeFormData = (data, prefix, form = new URLSearchParams()) => {
  if (!data || typeof data !== "object") {
    return form;
  }

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    const formKey = prefix ? `${prefix}[${key}]` : key;

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          encodeFormData(item, `${formKey}[${index}]`, form);
        } else if (item !== undefined && item !== null) {
          form.append(`${formKey}[${index}]`, `${item}`);
        }
      });
      return;
    }

    if (typeof value === "object") {
      encodeFormData(value, formKey, form);
      return;
    }

    form.append(formKey, `${value}`);
  });

  return form;
};

const parseRequestBody = async (req) => {
  if (req.body) {
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body);
      } catch (error) {
        return {};
      }
    }

    if (typeof req.body === "object") {
      return req.body;
    }
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  if (!chunks.length) {
    return {};
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch (error) {
    return {};
  }
};

const resolveOrigin = (req) => {
  if (req?.headers?.origin) {
    return req.headers.origin.replace(/\/$/, "");
  }
  if (process.env.PUBLIC_SITE_URL) {
    return process.env.PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return "https://example.com";
};

const getStripeSecretKey = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "Set STRIPE_SECRET_KEY in your environment before using the Stripe Connect sample."
    );
  }
  if (key.includes("sk_test") || key.includes("sk_live")) {
    return key;
  }
  throw new Error(
    "STRIPE_SECRET_KEY looks incorrect. Replace the placeholder with your actual Stripe secret key."
  );
};

const toStripeError = (status, data) => {
  if (data?.error?.message) {
    return { status, message: data.error.message };
  }
  return {
    status,
    message: "Unexpected response from Stripe. Check your request parameters and try again.",
  };
};

const stripeRequest = async (path, { method = "GET", body, stripeAccount, idempotencyKey } = {}) => {
  const secretKey = getStripeSecretKey();
  const headers = {
    Authorization: `Bearer ${secretKey}`,
    "Stripe-Version": API_VERSION,
  };

  let requestBody;
  if (body && Object.keys(body).length > 0) {
    requestBody = encodeFormData(body);
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  if (stripeAccount) {
    headers["Stripe-Account"] = stripeAccount;
  }

  if (idempotencyKey) {
    headers["Idempotency-Key"] = idempotencyKey;
  }

  const response = await fetch(`${STRIPE_API_BASE}${path}`, {
    method,
    headers,
    body: requestBody,
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (error) {
    data = {};
  }

  if (!response.ok) {
    throw toStripeError(response.status, data);
  }

  return data;
};

const sendJson = (res, status, payload) => {
  res.status(status).json(payload);
};

module.exports = {
  encodeFormData,
  parseRequestBody,
  resolveOrigin,
  stripeRequest,
  sendJson,
  getStripeSecretKey,
};
