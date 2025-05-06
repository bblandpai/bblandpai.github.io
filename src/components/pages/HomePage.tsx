'use client';

import * as React from 'react';
import { Suspense } from 'react';
import '@/lib/env';

import { Home } from '@/components/home';
import ClientWrapper from '@/components/ClientWrapper';
import { QueryParamsProvider } from '@/context/QueryParamsContext';

export default function ClientHomePage() {
  return (
    <ClientWrapper>
      <QueryParamsProvider>
        <Home isShowUpdate={false} />
      </QueryParamsProvider>
    </ClientWrapper>
  );
} 