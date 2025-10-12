const REQUIRED_FIELDS = ["name", "email", "support", "message"];

const parseJsonBody = async (req) => {
  if (req.body) {
    if (typeof req.body === "object") {
      return req.body;
    }

    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body);
      } catch (error) {
        return {};
      }
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

module.exports = async function submitContactForm(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId) {
    return res.status(500).json({
      error:
        "Contact form is not configured. Set FORMSPREE_FORM_ID in your environment to enable submissions.",
    });
  }

  const body = await parseJsonBody(req);
  const missingField = REQUIRED_FIELDS.find((field) => !body?.[field]);

  if (missingField) {
    return res.status(400).json({
      error: `Please provide a value for "${missingField}" before submitting the form.`,
    });
  }

  const formData = new URLSearchParams();
  formData.append("name", body.name.trim());
  formData.append("email", body.email.trim());
  formData.append("support", body.support.trim());
  formData.append("message", body.message.trim());

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const text = await response.text();
    let result = {};
    try {
      result = text ? JSON.parse(text) : {};
    } catch (error) {
      result = {};
    }

    if (!response.ok) {
      const firstError = Array.isArray(result?.errors) ? result.errors[0]?.message : null;
      const errorMessage = firstError || "We couldn't deliver your message. Please try again in a few minutes.";
      return res.status(response.status).json({ error: errorMessage });
    }

    return res.status(200).json({
      message: "Thank you for reaching out. Your message has been delivered successfully.",
    });
  } catch (error) {
    return res.status(502).json({
      error:
        "We were unable to send your message due to a network error. Please check your connection and try again.",
    });
  }
};
