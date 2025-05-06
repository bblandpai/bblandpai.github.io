import React from 'react';
import Image from 'next/image';
import DownloadLoadingButton from '@/components/buttons/DownloadButton';

interface GameCardProps {
  id: string;
  image: string;
  name: string;
  downloaded: number;
  downloadLink: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  image,
  name,
  downloaded,
  downloadLink,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      key={id}
      className="bg-retro-black border-2 border-retro-cyan transition-all duration-200 transform hover:scale-105 hover:shadow-retro-card-hover shadow-retro-card mb-2 flex flex-col justify-between overflow-hidden h-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative h-24 sm:h-28 md:h-36 w-full border-b-2 border-retro-cyan overflow-hidden">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          quality={100}
          priority={true}
          className="transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-retro-pink p-1 z-20">
          <span className="font-retro-text text-xs text-white">#{id.padStart(3, '0')}</span>
        </div>
      </div>

      <div className="p-2 sm:p-3 flex-grow flex flex-col justify-between bg-retro-black">
        <div>
          <h2 className="font-retro-alt text-retro-cyan text-xs sm:text-sm md:text-base my-1 sm:my-2 line-clamp-2 min-h-[1.5rem] sm:min-h-[2.5rem]">{name}</h2>
        </div>
        
        <div className="flex items-center mb-1 sm:mb-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-retro-yellow" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M8 17l4 4 4-4M12 12v9"/>
            <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>
          </svg>
          <span className="font-retro-text text-retro-yellow text-xs">{downloaded}</span>
        </div>
        
        <DownloadLoadingButton gameName={`${id}|${name}`} downloadLink={downloadLink} />
      </div>
    </div>
  );
};

export default GameCard;
