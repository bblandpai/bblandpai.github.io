'use client';

import { Suspense, ReactNode } from 'react';
import { TrackingProvider } from '@/context/TrackingContext';

export default function TrackingProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackingProvider>{children}</TrackingProvider>
    </Suspense>
  );
} 