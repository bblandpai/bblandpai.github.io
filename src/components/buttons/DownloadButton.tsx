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

// Hàm này đảm bảo link sẽ thử cả serve và server nếu một trong hai không hoạt động
const getFallbackLinks = (originalLink: string): string[] => {
  const links = [originalLink];
  
  // Thử thay thế serve bằng server và ngược lại
  if (originalLink.includes('serve.emulatorgames.net')) {
    links.push(originalLink.replace('serve.emulatorgames.net', 'server.emulatorgames.net'));
  } else if (originalLink.includes('server.emulatorgames.net')) {
    links.push(originalLink.replace('server.emulatorgames.net', 'serve.emulatorgames.net'));
  }
  
  return links;
};

const DownloadButton: React.FC<LoadingButtonProps> = ({ downloadLink, gameName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const handleDownload = async (link: string) => {
    return new Promise<void>((resolve, reject) => {
      // Tạo một iframe ẩn để thử tải xuống
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Thiết lập timeout để xử lý trường hợp không tải được
      const timeoutId = setTimeout(() => {
        document.body.removeChild(iframe);
        reject(new Error('Download timeout. Link might be unavailable.'));
      }, 5000);
      
      iframe.onload = () => {
        clearTimeout(timeoutId);
        document.body.removeChild(iframe);
        resolve();
      };
      
      iframe.onerror = () => {
        clearTimeout(timeoutId);
        document.body.removeChild(iframe);
        reject(new Error('Failed to load resource.'));
      };
      
      iframe.src = link;
      
      // Mở tab mới với link tải
      window.open(link, '_blank');
    });
  };

  const handleClick = async () => {
    sendGAEvent({ event: 'click_download', value: truncateLabel(gameName) });
    setIsLoading(true);
    setError(null);
    
    // Lấy danh sách các link dự phòng
    const fallbackLinks = getFallbackLinks(downloadLink);
    const currentLink = fallbackLinks[attemptCount % fallbackLinks.length];
    
    try {
      // Thử tải xuống
      await handleDownload(currentLink);
      
      // Đã tải thành công, cập nhật số lần thử
      setAttemptCount(prev => prev + 1);
    } catch (error: any) {
      console.error('Download error:', error);
      
      // Nếu còn link dự phòng và đây không phải lần thử cuối
      if (attemptCount < fallbackLinks.length - 1) {
        setError(`Trying alternative server... (${attemptCount + 1}/${fallbackLinks.length})`);
        setAttemptCount(prev => prev + 1);
        setTimeout(() => handleClick(), 1000); // Thử lại sau 1 giây
        return;
      } else {
        // Đã thử tất cả các link và không thành công
        setError("Download failed. Please try again later or try another game.");
      }
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
          {error}
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
