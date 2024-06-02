'use client';

import * as React from 'react';
import '@/lib/env';

import { QueryParamsProvider } from '@/context/QueryParamsContext';
import { Home } from '@/components/home';

export default function HomePage() {
  return (
    <QueryParamsProvider>
      <Home isShowUpdate={false} />
    </QueryParamsProvider>
  );
}
