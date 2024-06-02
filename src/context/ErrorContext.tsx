'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ErrorContextType {
  errorMessage: string | null;
  isModalOpen: boolean;
  showError: (message: string, action?: () => void) => void;
  clearError: () => void;
  modalAction: (() => void) | undefined;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<(() => void) | undefined>(undefined);

  const showError = useCallback((message: string, action?: () => void) => {
    setErrorMessage(message);
    setIsModalOpen(true);
    setModalAction(() => action);
  }, []);

  const clearError = useCallback(() => {
    setErrorMessage(null);
    setIsModalOpen(false);
    setModalAction(undefined);
  }, []);

  return (
    <ErrorContext.Provider value={{ errorMessage, isModalOpen, showError, clearError, modalAction }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};