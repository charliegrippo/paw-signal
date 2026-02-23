// analytics.ts — Thin wrapper around Google Analytics 4 (GA4)
// Sends virtual pageviews and custom events via window.gtag()
// Gracefully no-ops if gtag isn't loaded (dev mode, ad blockers, missing ID)

// ⬇️ Replace this with your real GA4 Measurement ID from https://analytics.google.com
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'

// Extend window to include gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// Safe gtag caller — does nothing if gtag isn't available
function gtag(...args: unknown[]) {
  if (typeof window.gtag === 'function') {
    window.gtag(...args)
  }
}

// Track a virtual pageview (used for SPA screen changes)
export function trackPageView(screenName: string) {
  gtag('event', 'page_view', {
    page_title: screenName,
    page_path: `/${screenName}`,
  })
}

// Track a custom event with optional parameters
export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  gtag('event', eventName, params)
}

export { GA_MEASUREMENT_ID }
