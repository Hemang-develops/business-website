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

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    return res.status(500).json({
      error:
        "Contact form is not configured. Set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, and EMAILJS_PRIVATE_KEY in your environment to enable submissions.",
    });
  }

  const body = await parseJsonBody(req);
  const missingField = REQUIRED_FIELDS.find((field) => !body?.[field]);

  if (missingField) {
    return res.status(400).json({
      error: `Please provide a value for "${missingField}" before submitting the form.`,
    });
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          to_email: process.env.CONTACT_EMAIL_RECIPIENT || body.email,
          from_name: body.name.trim(),
          from_email: body.email.trim(),
          support_type: body.support.trim(),
          message: body.message.trim(),
        },
      }),
    });
    if (!response.ok) {
      let errorMessage = "We couldn't deliver your message. Please try again in a few minutes.";
      try {
        const errorText = await response.text();
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson?.message || errorMessage;
      } catch (e) {
        // If not JSON, it might just be a text string
        console.error("EmailJS Error Response:", e);
      }
      return res.status(response.status).json({ error: errorMessage });
    }

    return res.status(200).json({
      message: "Thank you for reaching out. Your message has been delivered successfully.",
    });
  } catch (error) {
    console.error("Server API Error in submit handler:", error);
    return res.status(502).json({
      error:
        "We were unable to send your message due to a network error. Please check your connection and try again.",
    });
  }
};
