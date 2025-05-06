import React from 'react';

interface NavButtonProps {
  label: string;
  onClick: () => void;
  disabled: boolean;
  direction: 'prev' | 'next';
}

const NavButton: React.FC<NavButtonProps> = ({ label, onClick, disabled, direction }) => {
  const arrow = direction === 'prev' ? '<' : '>';
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`font-retro text-2xs sm:text-xs ${direction === 'prev' ? 'mr-1 sm:mr-2' : 'ml-1 sm:ml-2'} w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center 
        ${disabled ? 'opacity-50 text-gray-500 cursor-not-allowed' : 'text-retro-cyan hover:text-retro-pink'}`}
      aria-label={label}
    >
      {arrow}
    </button>
  );
};

export default NavButton; 