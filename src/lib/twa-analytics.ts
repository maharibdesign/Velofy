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
let isSdkLoading = false;

// NEW: Function to dynamically load the SDK script
function loadTwaSdk(callback: () => void) {
  if (window.TelegramAnalytics) {
    return callback();
  }

  if (isSdkLoading) {
    // If it's already loading, just wait for it to finish
    document.addEventListener('twa-sdk-loaded', callback);
    return;
  }
  
  isSdkLoading = true;
  const script = document.createElement('script');
  script.src = 'https://telegram.org/js/telegram-analytics.js';
  script.async = true;
  
  script.onload = () => {
    console.log('%c[Analytics]', 'color: #007aff;', 'Telegram Analytics SDK Loaded.');
    isSdkLoading = false;
    // Notify any waiting functions that the SDK is ready
    document.dispatchEvent(new Event('twa-sdk-loaded'));
    callback();
  };
  
  script.onerror = () => {
    console.error('Failed to load Telegram Analytics SDK.');
    isSdkLoading = false;
  };
  
  document.head.appendChild(script);
}


export function trackTwaAnalytics() {
  if (typeof window === 'undefined') return;

  loadTwaSdk(() => {
    const apiKey = import.meta.env.PUBLIC_TELEGRAM_ANALYTICS_KEY;
    
    if (!apiKey) {
      return;
    }

    if (!isTwaAnalyticsInitialized && window.TelegramAnalytics) {
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
  });
}