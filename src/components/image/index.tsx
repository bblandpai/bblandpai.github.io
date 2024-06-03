import React, { useState } from 'react';
import NextImage from 'next/image';
import './style.css';

interface ImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, fallbackSrc, className }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    if (!error) {
      setError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="loader" />
        </div>
      )}
      <NextImage
        src={currentSrc}
        alt={alt}
        layout="fill"
        objectFit="cover"
        onLoadingComplete={handleLoad}
        onError={handleError}
        className={`${loading ? 'hidden' : 'block'} w-full h-full object-cover`}
      />
    </div>
  );
};

export default Image;
