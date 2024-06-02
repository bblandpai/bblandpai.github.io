'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import React from 'react';

import { cn } from '@/lib/utils';

import ModalAlert from '@/components/modal';

import { useError } from '@/context/ErrorContext';


const RootLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { errorMessage, isModalOpen, clearError, modalAction } = useError();

  return (
    <>
    <main className={cn('flex flex-col min-h-screen w-full')}>
      <ModalAlert
        message={errorMessage || ''}
        isOpen={isModalOpen}
        onClose={clearError}
        onAction={modalAction}
      />
      {children}
    </main>
    <GoogleAnalytics gaId="G-95DQKE460W" />
    </>
  );
};

export default RootLayoutContent;