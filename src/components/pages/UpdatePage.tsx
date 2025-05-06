'use client';

import * as React from 'react';
import '@/lib/env';

import { Home } from '@/components/home';
import ClientWrapper from '@/components/ClientWrapper';
import { QueryParamsProvider } from '@/context/QueryParamsContext';

export default function ClientUpdatePage() {
  return (
    <ClientWrapper>
      <QueryParamsProvider>
        <Home isShowUpdate={true} />
      </QueryParamsProvider>
    </ClientWrapper>
  );
} 