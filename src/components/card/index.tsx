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
  className="bg-white border border-gray-300 rounded-lg shadow-md text-left ml-3 mr-3 mb-6 flex flex-col justify-between"
  onMouseEnter={onMouseEnter}
  onMouseLeave={onMouseLeave}
>
  <div className="relative h-48 w-full">
    <Image
      src={image}
      alt={name}
      layout="fill"
      objectFit="cover"
      className="rounded-t-lg"
    />
  </div>
  <div className="p-3 flex-grow flex flex-col justify-between">
    <div>
      <h2 className="text-xl mt-auto mb-2">{name}</h2>
    </div>
    <div className="mt-auto">
    <div className="mt-auto">
      <p className="text-gray-800 text-base mb-2">Downloaded: {downloaded}</p>
      <DownloadLoadingButton gameName={`${id}|${name}`} downloadLink={downloadLink} />
    </div>
    </div>
  </div>
</div>

  );
};

export default GameCard;
