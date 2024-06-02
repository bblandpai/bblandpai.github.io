'use client';

import * as React from 'react';
import '@/lib/env';

import { Home } from '@/components/home';

import { QueryParamsProvider } from '@/context/QueryParamsContext';

export default function HomePage() {
  return (
    <QueryParamsProvider>
      <Home isShowUpdate={true} />
    </QueryParamsProvider>
  );
}
