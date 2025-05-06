'use client';

import { Suspense, ReactNode } from 'react';
import Gtag from '@/components/google';

export default function GoogleAnalyticsWrapper() {
  return (
    <Suspense fallback={null}>
      <Gtag />
    </Suspense>
  );
} 