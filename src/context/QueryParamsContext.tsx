'use client';

import React, { createContext, useContext, useCallback, useState, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';

interface QueryParams {
  userId?: string;
  gameName?: string;
  countryCode?: string;
  deviceType?: string;
}

const QueryParamsContext = createContext<QueryParams | undefined>(undefined);

interface QueryParamsProviderProps {
  children: ReactNode;
}

export const QueryParamsProvider: React.FC<QueryParamsProviderProps> = ({ children }) => {
  const searchParams = useSearchParams();
  
  // Gọi trực tiếp các phương thức trong mỗi lần render
  const getQueryParams = useCallback((): QueryParams => {
    return {
      userId: searchParams.get('userId') || undefined,
      gameName: searchParams.get('gameName') || undefined,
      countryCode: searchParams.get('countryCode') || undefined,
      deviceType: searchParams.get('deviceType') || undefined,
    };
  }, [searchParams]);

  // Lấy giá trị một lần khi component mount
  const params = getQueryParams();

  return (
    <QueryParamsContext.Provider value={params}>
      {children}
    </QueryParamsContext.Provider>
  );
};

export const useQueryParams = (): QueryParams => {
  const context = useContext(QueryParamsContext);
  if (context === undefined) {
    throw new Error('useQueryParams must be used within a QueryParamsProvider');
  }
  return context;
};
