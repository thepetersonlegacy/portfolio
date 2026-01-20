// Analytics tracking utilities

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, properties);
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Event:', eventName, properties);
  }
};

export const trackPageView = (path: string) => {
  trackEvent('page_view', { page_path: path });
};

export const trackCTAClick = (location: string, ctaText: string) => {
  trackEvent('cta_clicked', {
    location,
    cta_text: ctaText,
  });
};

export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', {
    form_name: formName,
  });
};

export const trackDownload = (fileName: string) => {
  trackEvent('file_download', {
    file_name: fileName,
  });
};

export const trackScroll = (depth: number) => {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
  });
};

// CTA System Event Tracking (GTM/GA4/Meta compatible)
export const trackBookClick = (location: string) => {
  trackEvent('cta_book_click', { location });
};

export const trackFormClick = (location: string) => {
  trackEvent('cta_form_click', { location });
};

export const trackCallClick = (location: string) => {
  trackEvent('cta_call_click', { location });
};

export const trackTextClick = (location: string) => {
  trackEvent('cta_text_click', { location });
};

export const trackLeadFormSubmit = (formName: string, location: string) => {
  trackEvent('lead_form_submit', { form_name: formName, location });
};

export const trackCalendarBooked = (source: string) => {
  trackEvent('calendar_booked', { source });
};
