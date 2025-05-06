'use client';

import { Suspense, ReactNode } from 'react';

interface ClientWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ClientWrapper({ 
  children, 
  fallback = <div className="text-center py-12 font-retro-text text-retro-cyan">Loading...</div> 
}: ClientWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
} 