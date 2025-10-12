import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const ConnectCheckoutStatus = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const status = search.get("status") || (search.get("session_id") ? "success" : "unknown");
  const sessionId = search.get("session_id");

  const { heading, message } = useMemo(() => {
    switch (status) {
      case "success":
        return {
          heading: "Payment successful",
          message: "Stripe Checkout confirmed the payment on the connected account.",
        };
      case "cancel":
        return {
          heading: "Checkout cancelled",
          message: "The customer exited the hosted checkout flow before completing payment.",
        };
      case "onboarding_complete":
        return {
          heading: "Onboarding complete",
          message:
            "Return to the demo dashboard to refresh the account status and continue setting up products.",
        };
      default:
        return {
          heading: "Status updated",
          message: "Return to the dashboard to continue testing the Connect integration.",
        };
    }
  }, [status]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-6 py-16 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-gray-900/60 p-10 text-center shadow-xl">
        <p className="text-xs uppercase tracking-[0.5em] text-teal-200">Stripe Checkout</p>
        <h1 className="mt-4 text-3xl font-semibold">{heading}</h1>
        <p className="mt-4 text-sm text-white/70">{message}</p>
        {sessionId && (
          <p className="mt-3 text-xs text-white/50">
            Checkout Session ID:
            <span className="ml-2 rounded bg-gray-950/60 px-2 py-1 font-mono text-[11px] text-white/70">{sessionId}</span>
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link
            to="/connect-demo"
            className="inline-flex items-center rounded-full bg-teal-500 px-5 py-2 font-semibold text-gray-950 transition hover:bg-teal-400"
          >
            Back to Connect demo
          </Link>
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-white/20 px-5 py-2 font-medium text-white transition hover:border-teal-300"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConnectCheckoutStatus;
