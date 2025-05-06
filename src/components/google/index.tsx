'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA_TRACKING_ID } from '@/constant/env';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

const Gtag = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      pageview(url);
    } catch (error) {
      console.error('Error in Google Analytics tracking:', error);
    }
  }, [pathname, searchParams]);

  return null;
};

export default Gtag;