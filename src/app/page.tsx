'use client';

import * as React from 'react';
import { Suspense } from 'react';
import '@/lib/env';

import { Home } from '@/components/home';

import { QueryParamsProvider } from '@/context/QueryParamsContext';

export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <QueryParamsProvider>
        <Home isShowUpdate={false} />
      </QueryParamsProvider>
    </Suspense>
  );
}
