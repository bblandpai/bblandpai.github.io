import { sendGAEvent } from '@next/third-parties/google'
import React, { useState } from 'react';

import './style.css';

import useEventTracker from '@/hooks/useEventTracker';

import { useQueryParams } from '@/context/QueryParamsContext';

interface LoadingButtonProps {
  downloadLink: string;
  gameName: string;
}

const truncateLabel = (label: string, maxLength = 500): string => {
  return label.length > maxLength ? label.substring(0, maxLength) : label;
};

const DownloadButton: React.FC<LoadingButtonProps> = ({ downloadLink, gameName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    sendGAEvent({ event: 'click_download', value: truncateLabel(gameName) });
    // handle loading
    setIsLoading(true);
    setError(null);
    try {
      setIsLoading(true);
      // Simulate a download process with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Redirect to the download link
      window.location.href = downloadLink;
    } catch (error: any) { // Explicitly typing error as any
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`bg-black text-white rounded-md cursor-pointer p-2 w-full text-center block flex justify-center items-center transition duration-300 transform ${isLoading ? 'bg-gray-700' : ''} active:scale-95`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="spinner mr-2"></div>
            Downloading
          </>
        ) : (
          'Download Now'
        )}
      </button>
      {error && (
        <div className="mt-2 text-red-500 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
