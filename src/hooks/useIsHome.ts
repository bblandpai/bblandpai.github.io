'use client';

import { usePathname } from 'next/navigation';

export const useIsHome = () => {
  const pathname = usePathname();
  return pathname === '/';
};