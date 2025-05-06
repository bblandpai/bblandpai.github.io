'use client';

import { createContext, useContext, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, event } from '@/lib/ga';

interface TrackingContextProps {
  trackPageView: (url: string) => void;
  trackEvent: (action: string, category: string, label: string, value?: number) => void;
}

const TrackingContext = createContext<TrackingContextProps | undefined>(undefined);

export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (context === undefined) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};

export const TrackingProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      pageview(url);
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }, [pathname, searchParams]);

  const trackPageView = (url: string) => {
    try {
      pageview(url);
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const trackEvent = (action: string, category: string, label: string, value?: number) => {
    try {
      event({ action, category, label, value });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  return (
    <TrackingContext.Provider value={{ trackPageView, trackEvent }}>
      {children}
    </TrackingContext.Provider>
  );
};
