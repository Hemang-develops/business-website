import { useState } from "react";
import { offeringSupportOptions } from "../data/offerings";

const initialFormState = {
  name: "",
  email: "",
  support: "",
  message: "",
};

export default function MaintenanceContactForm({ onClose }) {
  const [formValues, setFormValues] = useState(initialFormState);
  const [submissionState, setSubmissionState] = useState({ status: "idle", message: "" });

  const supportOptions = [...offeringSupportOptions, "Custom collaboration"];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionState({ status: "submitting", message: "" });

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        throw new Error(data?.error || "We were unable to send your message. Please try again.");
      }

      setSubmissionState({
        status: "success",
        message: data?.message || "Thank you! I'll respond during normal operations.",
      });
      setFormValues(initialFormState);

      // Auto-close after 5 seconds
      setTimeout(() => {
        onClose();
        setSubmissionState({ status: "idle", message: "" });
      }, 5000);
    } catch (error) {
      setSubmissionState({
        status: "error",
        message:
          error?.message ||
          "We were unable to send your message. Please double-check your details and try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-slate-700 bg-opacity-50 p-6 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Send us a message</h3>
        <button
          onClick={onClose}
          type="button"
          className="text-slate-300 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex-col items-start flex text-left">
          <label htmlFor="name" className="block text-sm font-medium text-slate-200">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-lg border border-slate-500 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-yellow-500 focus:outline-none"
            placeholder="Your name"
          />
        </div>

        <div className="flex-col items-start flex text-left">
          <label htmlFor="email" className="block text-sm font-medium text-slate-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-lg border border-slate-500 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-yellow-500 focus:outline-none"
            placeholder="your@email.com"
          />
        </div>

        <div className="flex-col items-start flex text-left">
          <label htmlFor="support" className="block text-sm font-medium text-slate-200">
            What are you interested in?
          </label>
          <select
            id="support"
            name="support"
            value={formValues.support}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-lg border border-slate-500 bg-slate-800 px-4 py-2 text-white focus:border-yellow-500 focus:outline-none"
          >
            <option value="">Select an option</option>
            {supportOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-col items-start flex text-left">
          <label htmlFor="message" className="block text-sm font-medium text-slate-200">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formValues.message}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 w-full rounded-lg border border-slate-500 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-yellow-500 focus:outline-none resize-none"
            placeholder="Tell us about your vision..."
          />
        </div>

        {submissionState.message && (
          <div
            className={`rounded-lg p-3 text-sm text-left ${
              submissionState.status === "success"
                ? "bg-green-500 bg-opacity-20 text-green-200"
                : submissionState.status === "error"
                  ? "bg-red-500 bg-opacity-20 text-red-200"
                  : "bg-blue-500 bg-opacity-20 text-blue-200"
            }`}
          >
            {submissionState.message}
          </div>
        )}

        <button
          type="submit"
          disabled={submissionState.status === "submitting"}
          className="w-full rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-slate-900 transition-all hover:bg-yellow-400 disabled:opacity-50"
        >
          {submissionState.status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
