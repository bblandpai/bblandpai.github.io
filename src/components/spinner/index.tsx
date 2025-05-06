import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 relative">
        <div className="w-full h-full bg-retro-black border-4 border-retro-cyan flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-8 border-retro-pink border-t-transparent"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full animate-pulse">
          <div className="w-2 h-2 bg-retro-yellow absolute top-0 left-0"></div>
          <div className="w-2 h-2 bg-retro-yellow absolute top-0 right-0"></div>
          <div className="w-2 h-2 bg-retro-yellow absolute bottom-0 left-0"></div>
          <div className="w-2 h-2 bg-retro-yellow absolute bottom-0 right-0"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;