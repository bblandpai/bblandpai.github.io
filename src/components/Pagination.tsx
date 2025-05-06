import React from 'react';
import NavButton from './buttons/NavButton';
import PaginationButton from './buttons/PaginationButton';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
  if (totalPages <= 1) {
    return null;
  }

  const renderPageButtons = () => {
    const buttons = [];
    const visiblePages = window.innerWidth < 640 ? 3 : 5; // Show fewer pages on mobile
    
    // Logic to display buttons with ellipsis, optimized for mobile
    for (let i = 1; i <= totalPages; i++) {
      const shouldShow = 
        i === 1 || 
        i === totalPages ||
        Math.abs(i - currentPage) <= (window.innerWidth < 640 ? 0 : 1);
      
      if (shouldShow) {
        buttons.push(
          <PaginationButton 
            key={i} 
            pageNumber={i} 
            currentPage={currentPage} 
            onClick={paginate} 
          />
        );
      } else if (
        (window.innerWidth < 640 && (i === 2 || i === totalPages - 1) && totalPages > 4) ||
        (window.innerWidth >= 640 && (i === 2 || i === totalPages - 1) && totalPages > 5)
      ) {
        buttons.push(
          <PaginationButton 
            key={`ellipsis-${i}`} 
            pageNumber={i} 
            currentPage={currentPage} 
            onClick={paginate} 
            isEllipsis={true} 
          />
        );
      }
    }

    return buttons;
  };

  return (
    <div className="flex justify-center items-center my-4 sm:my-8 pagination-container">
      <div className="retro-border p-1 sm:p-2 bg-retro-black inline-flex items-center">
        <NavButton 
          direction="prev"
          label="Previous page"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        
        <div className="flex space-x-1 overflow-x-auto px-1 sm:px-2 max-w-[170px] sm:max-w-[300px]">
          {renderPageButtons()}
        </div>
        
        <NavButton 
          direction="next"
          label="Next page"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </div>
      
      {/* Decoration elements */}
      <div className="absolute -top-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 bg-retro-pink"></div>
      <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-retro-cyan"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 bg-retro-cyan"></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-retro-pink"></div>
    </div>
  );
};

export default Pagination; 