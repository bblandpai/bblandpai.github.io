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
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    pageview(url);
  }, [pathname, searchParams]);

  const trackPageView = (url: string) => {
    pageview(url);
  };

  const trackEvent = (action: string, category: string, label: string, value?: number) => {
    event({ action, category, label, value });
  };

  return (
    <TrackingContext.Provider value={{ trackPageView, trackEvent }}>
      {children}
    </TrackingContext.Provider>
  );
};
