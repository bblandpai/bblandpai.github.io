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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black opacity-80"></div>
      <div className="retro-border z-10 max-w-md w-full overflow-hidden">
        <div className="bg-retro-black p-1">
          <div className="border-2 border-retro-cyan p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-retro-pink mr-2"></div>
                <h3 className="font-retro text-retro-cyan text-sm md:text-lg">SYSTEM ALERT</h3>
              </div>
              <button 
                onClick={onClose}
                className="font-retro text-retro-pink hover:text-white"
              >
                [X]
              </button>
            </div>

            <div className="font-retro-text text-white my-6 p-4 border border-retro-cyan bg-retro-black/50">
              {message}
              <div className="inline-block w-2 h-5 bg-white animate-blink ml-1"></div>
            </div>

            <div className="flex justify-end space-x-4">
              {onAction && (
                <button
                  onClick={onAction}
                  className="retro-button text-xs"
                >
                  RETRY
                </button>
              )}
              <button
                onClick={onClose}
                className="retro-button text-xs"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAlert; 