import { createContext, useContext, useMemo } from 'react';
import { useMaintenanceMode } from '../hooks/useMaintenanceMode';

const SiteSettingsContext = createContext();

// FAQs for normal operation
const regularFAQs = [
  {
    question: "What services do you offer?",
    answer: "We offer personalized email coaching, frequency optimization strategies, and comprehensive email management solutions designed to improve your communication effectiveness."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy! Browse our programs, select the one that best fits your needs, and proceed to checkout. You'll immediately receive access to your coaching materials."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards and payment methods through our secure Stripe payment processor. Your payment information is fully encrypted and secure."
  },
  {
    question: "Can I request a refund?",
    answer: "Yes, we offer refunds within 30 days of purchase if you're not satisfied with our services. Please contact us directly for refund requests."
  }
];

// FAQs for maintenance mode
const maintenanceFAQs = [
  {
    question: "When will the site be back up?",
    answer: "We're working hard to restore full service as quickly as possible. Maintenance typically takes a few weeks. We appreciate your patience!"
  },
  {
    question: "Why is the site under maintenance?",
    answer: "We're performing scheduled maintenance to improve site performance, security, and overall user experience. This ensures we continue to provide you with the best service."
  },
  {
    question: "Can I still make a purchase?",
    answer: "Yes, you can still make purchases through email by contacting us directly at highfrequencies11@gmail.com. We'll process your order manually and ensure you receive your coaching materials without delay."
  },
  {
    question: "How can I contact you during maintenance?",
    answer: "You can reach us directly at highfrequencies11@gmail.com. We'll be happy to assist you with any urgent inquiries."
  },
//   {
//     question: "Will my saved information be preserved?",
//     answer: "Yes, all your account information and preferences will be preserved. Everything will be exactly as you left it once we're back online."
//   }
];

// Default site settings for Footer and other components
const defaultSiteSettings = {
  brand: {
    navTitle: "NEHAL",
    fullTitle: "High Frequencies",
    footerTagline: "Manifestation mentorship, meditation rituals, and community support for souls building miraculous lives."
  },
  footer: {
    introEyebrow: "High Frequencies 11",
    introHeading: "A devotional storefront for manifestation, ritual, and private transformation.",
    termsHref: "#",
    termsLabel: "Terms of Service",
    privacyHref: "#",
    privacyLabel: "Privacy Policy",
    statusLabel: "Fully Operational"
  },
  sections: []
};

// Default footer links
const defaultFooterLinks = {
  footer_offerings: [],
  footer_resources: [],
  footer_support: [],
  footer_social: [
    { 
      key: "social-email", 
      icon: "mail", 
      label: "Email", 
      href: "mailto:highfrequencies11@gmail.com" 
    }
  ]
};

export function SiteSettingsProvider({ children }) {
  const isMaintenanceMode = useMaintenanceMode();

  const getLinks = (category) => {
    return defaultFooterLinks[category] || [];
  };

  const settings = useMemo(() => ({
    ...defaultSiteSettings,
    footer: {
      ...defaultSiteSettings.footer,
      statusLabel: isMaintenanceMode ? "Maintenance in Progress" : "Fully Operational"
    },
    faqs: isMaintenanceMode ? maintenanceFAQs : regularFAQs,
    isMaintenanceMode
  }), [isMaintenanceMode]);

  return (
    <SiteSettingsContext.Provider value={{ settings, getLinks }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within SiteSettingsProvider');
  }
  return context;
}
