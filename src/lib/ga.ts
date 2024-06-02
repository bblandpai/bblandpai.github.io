import { GA_TRACKING_ID } from "@/constant/env";

export const isGAInitialized = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

export const pageview = (url: string) => {
  if (isGAInitialized()) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }: { action: string, category: string, label: string, value?: number }) => {
  if (isGAInitialized()) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};