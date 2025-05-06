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
        className={`retro-button text-2xs sm:text-xs md:text-sm font-retro-alt uppercase tracking-wider w-full py-1 sm:py-2 px-2 sm:px-4 flex justify-center items-center ${
          isLoading ? 'bg-retro-black cursor-not-allowed' : 'bg-retro-black hover:bg-retro-pink'
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="retro-loader w-2 h-2 sm:w-3 sm:h-3 mr-1 sm:mr-2"></div>
            <span className="animate-pulse">LOADING...</span>
          </>
        ) : (
          <>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>DOWNLOAD</span>
          </>
        )}
      </button>
      {error && (
        <div className="mt-1 sm:mt-2 text-retro-pink text-center font-retro-text text-xs">
          ERROR: {error}
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
