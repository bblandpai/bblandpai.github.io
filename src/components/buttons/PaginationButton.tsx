import React from 'react';

interface PaginationButtonProps {
  pageNumber: number;
  currentPage: number;
  onClick: (pageNumber: number) => void;
  isEllipsis?: boolean;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  pageNumber,
  currentPage,
  onClick,
  isEllipsis = falses
}) => {
  if (isEllipsis) {
    return (
      <span className="font-retro text-2xs sm:text-xs text-retro-cyan w-4 h-6 sm:w-6 sm:h-8 flex items-center justify-center">
        ...
      </span>
    );
  }

  const isActive = currentPage === pageNumber;
  
  return (
    <button
      onClick={() => onClick(pageNumber)}
      className={`font-retro text-2xs sm:text-xs w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border border-2 sm:border-2 transition-all ${
        isActive 
          ? 'bg-retro-cyan text-retro-black border-white active-page' 
          : 'text-retro-cyan border-retro-cyan hover:text-retro-pink hover:border-retro-pink'
      }`}
      aria-label={`Page ${pageNumber}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {pageNumber} 
    </button>
  );
};

export default PaginationButton; 