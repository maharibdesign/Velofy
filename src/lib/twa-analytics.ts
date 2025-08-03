// This script manages the Telegram Web Apps Analytics SDK

// The SDK is loaded from a CDN, so we declare its type for TypeScript
declare global {
  interface Window {
    TelegramAnalytics: {
      init: (options: {
        apiKey: string;
        appName: string;
        appVersion: string;
      }) => void;
      pageview: (path: string) => void;
    };
  }
}

// A flag to ensure we only initialize the SDK once
let isTwaAnalyticsInitialized = false;

// The main function to initialize and track page views
export function trackTwaAnalytics() {
  // Only run this code in the browser, not on the server
  if (typeof window === 'undefined') return;

  // The API key from your environment variables
  const apiKey = import.meta.env.PUBLIC_TELEGRAM_ANALYTICS_KEY;
  
  // Don't do anything if the key is not set
  if (!apiKey) {
    console.warn('Telegram Analytics key is not set. Skipping analytics.');
    return;
  }

  // Initialize the SDK if it hasn't been already and exists on the window
  if (!isTwaAnalyticsInitialized && window.TelegramAnalytics) {
    try {
      window.TelegramAnalytics.init({
        apiKey: apiKey,
        appName: 'velofy-agency-app', // Your app's internal name
        appVersion: '1.0.0', // Your app's version
      });
      isTwaAnalyticsInitialized = true;
      console.log('Telegram Analytics Initialized.');
    } catch (error) {
      console.error('Failed to initialize Telegram Analytics:', error);
      return; // Stop if initialization fails
    }
  }

  // If initialized, track the current page view
  if (isTwaAnalyticsInitialized) {
    try {
      // Get the current page path (e.g., "/work", "/pricing")
      const path = window.location.pathname;
      window.TelegramAnalytics.pageview(path);
      console.log(`Telegram Analytics Pageview: ${path}`);
    } catch (error) {
      console.error('Failed to send pageview to Telegram Analytics:', error);
    }
  }
}