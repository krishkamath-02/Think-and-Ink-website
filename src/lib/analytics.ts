// Safe Google Analytics 4 (GA4) Tracking Utility

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export interface AnalyticsItem {
  item_id?: string;
  item_name: string;
  price: number;
  quantity: number;
}

// Low-level helper to track events safely
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
  // Also log to console in development environment for developer diagnostics
  if (import.meta.env.DEV) {
    console.log(`📊 [GA4 EVENT] ${eventName}:`, params);
  }
};

// 1. Page & Engagement Tracking
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  trackEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  });
};

export const trackTimeSpent = (pagePath: string, durationSeconds: number) => {
  trackEvent("page_time_spent", {
    page_path: pagePath,
    duration_seconds: durationSeconds,
  });
};

export const trackScrollDepth = (pagePath: string, depthPercentage: number) => {
  trackEvent("scroll_depth", {
    page_path: pagePath,
    depth_percentage: depthPercentage,
  });
};

// 2. Shopping Shelf (Cart) Actions
export const trackAddToCart = (item: { title: string; price: string | number; quantity: number }) => {
  const priceVal = typeof item.price === "string" ? parseInt((item.price as string).replace(/[^\d]/g, "")) : item.price;
  const analyticItem: AnalyticsItem = {
    item_name: item.title,
    price: priceVal || 0,
    quantity: item.quantity,
  };

  trackEvent("add_to_cart", {
    currency: "INR",
    value: (priceVal || 0) * item.quantity,
    items: [analyticItem],
  });
};

export const trackRemoveFromCart = (item: { title: string; price: string | number; quantity: number }) => {
  const priceVal = typeof item.price === "string" ? parseInt((item.price as string).replace(/[^\d]/g, "")) : item.price;
  const analyticItem: AnalyticsItem = {
    item_name: item.title,
    price: priceVal || 0,
    quantity: item.quantity,
  };

  trackEvent("remove_from_cart", {
    currency: "INR",
    value: (priceVal || 0) * item.quantity,
    items: [analyticItem],
  });
};

export const trackViewCart = (shelfItems: { title: string; price: string; quantity: number }[]) => {
  const items: AnalyticsItem[] = shelfItems.map((item) => {
    const priceVal = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
    return {
      item_name: item.title,
      price: priceVal,
      quantity: item.quantity,
    };
  });

  const value = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  trackEvent("view_cart", {
    currency: "INR",
    value,
    items,
  });
};

// 3. Checkout Funnel Tracking
export const trackBeginCheckout = (shelfItems: { title: string; price: string; quantity: number }[]) => {
  const items: AnalyticsItem[] = shelfItems.map((item) => {
    const priceVal = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
    return {
      item_name: item.title,
      price: priceVal,
      quantity: item.quantity,
    };
  });

  const value = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  trackEvent("begin_checkout", {
    currency: "INR",
    value,
    items,
  });
};

export const trackAddShippingInfo = (
  deliveryType: string,
  shelfItems: { title: string; price: string; quantity: number }[]
) => {
  const items: AnalyticsItem[] = shelfItems.map((item) => {
    const priceVal = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
    return {
      item_name: item.title,
      price: priceVal,
      quantity: item.quantity,
    };
  });

  const value = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  trackEvent("add_shipping_info", {
    currency: "INR",
    value,
    shipping_tier: deliveryType,
    items,
  });
};

export const trackAddPaymentInfo = (
  paymentMethod: string,
  shelfItems: { title: string; price: string; quantity: number }[]
) => {
  const items: AnalyticsItem[] = shelfItems.map((item) => {
    const priceVal = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
    return {
      item_name: item.title,
      price: priceVal,
      quantity: item.quantity,
    };
  });

  const value = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  trackEvent("add_payment_info", {
    currency: "INR",
    value,
    payment_type: paymentMethod,
    items,
  });
};

export const trackPurchase = (
  orderId: string,
  totalAmount: number,
  paymentMethod: string,
  shelfItems: { title: string; price: string; quantity: number }[]
) => {
  const items: AnalyticsItem[] = shelfItems.map((item) => {
    const priceVal = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
    return {
      item_name: item.title,
      price: priceVal,
      quantity: item.quantity,
    };
  });

  trackEvent("purchase", {
    transaction_id: orderId,
    value: totalAmount,
    currency: "INR",
    payment_type: paymentMethod,
    items,
  });
};

// 4. Checkout / Payment Cancellation Dropoff Tracking
export const trackCheckoutCancellation = (
  step: "form_closed" | "payment_failed_or_dismissed" | "unmounted_incomplete",
  shelfItems: { title: string; price: string; quantity: number }[],
  reason?: string
) => {
  const items: AnalyticsItem[] = shelfItems.map((item) => {
    const priceVal = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
    return {
      item_name: item.title,
      price: priceVal,
      quantity: item.quantity,
    };
  });

  const value = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  trackEvent("checkout_cancelled", {
    cancellation_step: step,
    currency: "INR",
    value,
    reason: reason || "unknown",
    items,
  });
};
