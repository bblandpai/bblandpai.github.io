'use client';

import { cn } from '@/lib/utils';
import { useError } from '@/context/ErrorContext';
import React from 'react';
import ModalAlert from '@/components/modal';
import Gtag from '../google';

const RootLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { errorMessage, isModalOpen, clearError, modalAction } = useError();

  return (
    <main className={cn('flex flex-col min-h-screen w-full')}>
      <ModalAlert
        message={errorMessage || ''}
        isOpen={isModalOpen}
        onClose={clearError}
        onAction={modalAction}
      />
      {children}
    </main>
  );
};

export default RootLayoutContent;