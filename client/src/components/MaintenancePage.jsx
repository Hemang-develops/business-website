import { useState } from "react";
import MaintenanceContactForm from "./MaintenanceContactForm";
import FAQSection from "./FAQSection";

export default function MaintenancePage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 overflow-x-hidden w-full">
      {/* Main Maintenance Message */}
      <div className="flex items-center justify-center min-h-screen">
        <div 
          className={`px-6 mx-auto transition-all duration-700 ease-in-out flex flex-col lg:flex-row items-center w-full ${
            showForm ? "max-w-5xl" : "max-w-xl"
          }`}
        >
          {/* Left/Center Content */}
          <div 
            className={`flex flex-col transition-all duration-700 ease-in-out w-full ${
              showForm ? "lg:w-[50%] lg:pr-6 text-center lg:text-left items-center lg:items-start" : "items-center text-center"
            }`}
          >
            <div className={`mb-8 w-full flex ${showForm ? "justify-center lg:justify-start" : "justify-center"}`}>
              <svg
                className="h-24 w-24 text-yellow-500 animate-pulse transition-all duration-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4 transition-all duration-700">We'll Be Back Soon</h1>

            <p className={`text-xl text-slate-300 mb-8 transition-all duration-700 ${showForm ? "" : "max-w-md"}`}>
              We're currently performing maintenance to improve your experience.
              Thank you for your patience!
            </p>

            <div className={`bg-slate-700 bg-opacity-50 rounded-lg p-6 mb-8 w-full transition-all duration-700 ${showForm ? "" : "max-w-md"}`}>
              <p className="text-slate-200 text-sm mb-2">
                We appreciate your interest. Please check back shortly.
              </p>
              <p className="text-slate-200 text-sm">
                Need immediate assistance? Email us directly at <a href="mailto:highfrequencies11@gmail.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">highfrequencies11@gmail.com</a>
              </p>
            </div>

            <div className={`flex w-full transition-all duration-700 ${showForm ? "justify-center lg:justify-start" : "justify-center"}`}>
              <button
                onClick={() => setShowForm(true)}
                className={`inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-slate-900 transition-all duration-500 ${
                  showForm ? "opacity-0 pointer-events-none -mt-4 mb-4 select-none" : "hover:bg-yellow-400"
                }`}
                aria-hidden={showForm}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get in Touch
              </button>
            </div>

            <div className="mt-8 text-slate-400 text-sm transition-all duration-700">
              <p>Status: <span className="text-yellow-400 font-semibold">Maintenance in Progress</span></p>
            </div>
          </div>

          {/* Right Content - Form */}
          <div 
            className={`transition-all duration-700 ease-in-out overflow-hidden flex justify-center lg:justify-start w-full ${
              showForm ? "lg:w-[50%] lg:pl-6 max-h-[1000px] opacity-100 mt-12 lg:mt-0" : "lg:w-0 max-h-0 opacity-0 m-0"
            }`}
          >
            <div className="w-full max-w-md shrink-0">
              <MaintenanceContactForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
