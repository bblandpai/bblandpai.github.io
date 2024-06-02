'use client';

import React from 'react';

interface ModalAlertProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onAction?: () => void;
}

const ModalAlert: React.FC<ModalAlertProps> = ({ message, isOpen, onClose, onAction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-auto lg:mx-auto relative">
        <h2 className="text-lg font-bold mb-4 text-center">Oops, something went wrong</h2>
        <p className="mb-4 text-center">{message}</p>
        <button
          onClick={() => {
            if (onAction) onAction();
            onClose();
          }}
          className="block w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default ModalAlert;