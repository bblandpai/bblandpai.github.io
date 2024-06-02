import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
  const [queryParams, setQueryParams] = useState<QueryParams>({
    userId: undefined,
    gameName: undefined,
    countryCode: undefined,
    deviceType: undefined,
  });

  useEffect(() => {
    setQueryParams({
      userId: searchParams.get('userId') || undefined,
      gameName: searchParams.get('gameName') || undefined,
      countryCode: searchParams.get('countryCode') || undefined,
      deviceType: searchParams.get('deviceType') || undefined,
    });
  }, [searchParams]);

  return (
    <QueryParamsContext.Provider value={queryParams}>
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
