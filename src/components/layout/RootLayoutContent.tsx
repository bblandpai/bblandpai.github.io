'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import ModalAlert from '@/components/modal';
import GoogleAnalyticsWrapper from '@/components/GoogleAnalyticsWrapper';

import { useError } from '@/context/ErrorContext';


const RootLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { errorMessage, isModalOpen, clearError, modalAction } = useError();

  return (
    <>
    <main className={cn('flex flex-col min-h-screen w-full overflow-x-hidden')}>
      <ModalAlert
        message={errorMessage || ''}
        isOpen={isModalOpen}
        onClose={clearError}
        onAction={modalAction}
      />
      {children}
    </main>
    <GoogleAnalyticsWrapper />
    </>
  );
};

export default RootLayoutContent;