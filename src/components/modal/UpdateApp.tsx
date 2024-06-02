import React, { useState } from 'react';

interface LoadingLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const LoadingLink: React.FC<LoadingLinkProps> = ({ href, className, children }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      window.location.href = href;
    }, 1000);
  };

  return (
    <a
      href={href}
      className={`${className} ${loading ? 'pointer-events-none opacity-70' : ''} relative flex items-center`}
      onClick={handleClick}
    >
      {loading && (
        <div className="flex items-center justify-center w-5 h-5 mr-2 border-4 border-t-white border-gray-200 rounded-full animate-spin"></div>
      )}
      {children}
    </a>
  );
};


interface UpdateVersionProps {
  onClose: () => void;
}

export const UpdateVersion: React.FC<UpdateVersionProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 h-screen">
      <div className="relative flex flex-col items-center justify-center w-full max-w-4xl p-6 md:p-12 bg-black rounded-2xl h-full min-h-screen">
        <button
          className="absolute top-4 left-4"
          onClick={onClose}
        >
          <svg
            width={29}
            height={28}
            viewBox="0 0 29 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect x="0.5" width={28} height={28} fill="url(#pattern0_1_21)" />
            <defs>
              <pattern
                id="pattern0_1_21"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
              >
                <use xlinkHref="#image0_1_21" transform="scale(0.00943396)" />
              </pattern>
              <image
                id="image0_1_21"
                width={64}
                height={64}
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>
        </button>
        <div className="relative flex flex-col items-center p-6 md:p-12 bg-opacity-0 bg-black rounded-lg">
          <h1 className="text-2xl text-center text-zinc-100 md:text-5xl">🎉 Update Alert! Install New Version 🎉</h1>
          <p className="mt-8 text-neutral-200">
            We've got some exciting news! Our latest version of the GBA Game Emulator is now available with incredible updates:
          </p>
          <ul className="mt-8 text-neutral-200 space-y-4">
            <li className="text-violet-300">✨ 
              <span className="font-bold text-yellow-300">
              Faster Game Downloads:
              </span>{" "}: Enjoy your favorite games in record time!</li>
            <li className="text-slate-300">✨ 
              <span className="font-bold text-yellow-300">UI Optimization:
              </span>{" "}: Experience a smoother and more intuitive interface.</li>
            <li className="text-neutral-200">
              <span className="font-bold">Important Note for Premium Users:</span> If you're a premium user, you can ignore this message. Installing the new app version may cause you to lose your current premium package.
            </li>
            <li className="text-neutral-200"><span className="font-semibold">
              Ready for an upgrade? Click below to install the new version now!
            </span>
            </li>
          </ul>
          <LoadingLink
            href="https://play.google.com/store/apps/details?id=com.pixel_ai.emulator.delta.psp"
            className="mt-10 px-16 py-2 text-purple-100 bg-purple-600 rounded-2xl"
          >
            Install New Version
          </LoadingLink>
        </div>
      </div>
    </div>
  );
};