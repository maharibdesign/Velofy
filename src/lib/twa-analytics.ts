// src/lib/twa-analytics.ts

declare global {
  interface Window {
    TelegramAnalytics: {
      init: (options: { apiKey: string; appName: string; appVersion: string; }) => void;
      pageview: (path: string) => void;
    };
  }
}

let isTwaAnalyticsInitialized = false;

export function trackTwaAnalytics() {
  // Don't run on the server
  if (typeof window === 'undefined') return;

  // The SDK script is now inlined in Layout.astro, so window.TelegramAnalytics should exist.
  // We'll add a small delay to make sure the inlined script has been parsed by the browser.
  setTimeout(() => {
    const apiKey = import.meta.env.PUBLIC_TELEGRAM_ANALYTICS_KEY;
    
    if (!apiKey) {
      return; // Silently fail if no key is set
    }

    // Check if the SDK is available on the window object
    if (!window.TelegramAnalytics) {
      console.error('Telegram Analytics SDK not found on window object. Initialization failed.');
      return;
    }

    if (!isTwaAnalyticsInitialized) {
      try {
        window.TelegramAnalytics.init({
          apiKey: apiKey,
          appName: 'velofy-agency-app',
          appVersion: '1.0.0',
        });
        isTwaAnalyticsInitialized = true;
        console.log('%c[Analytics]', 'color: #007aff;', 'Telegram Analytics Initialized.');
      } catch (error) {
        console.error('Failed to initialize Telegram Analytics:', error);
        return;
      }
    }

    if (isTwaAnalyticsInitialized) {
      try {
        const path = window.location.pathname;
        window.TelegramAnalytics.pageview(path);
        console.log('%c[Analytics]', 'color: #007aff;', `Pageview tracked for: ${path}`);
      } catch (error) {
        console.error('Failed to send pageview to Telegram Analytics:', error);
      }
    }
  }, 0); // setTimeout with 0ms delay waits for the current execution stack to clear
}