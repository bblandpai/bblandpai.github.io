import { Metadata } from 'next';
import * as React from 'react';

import './globals.css';

import { FacebookSDKInitializer } from '@/components/fb';
import RootLayoutContent from '@/components/layout/RootLayoutContent';

import { siteConfig } from '@/constant/config';
import { FACEBOOK_APP_ID } from '@/constant/env';
import { ErrorProvider } from '@/context/ErrorContext';
import { TrackingProvider } from '@/context/TrackingContext';

export const metadata: Metadata = {
  viewport: {
    width: 'device-width, shrink-to-fit=yes',
    minimumScale: 1,
    initialScale: 1,
    userScalable: false,
    maximumScale: 1,
  },
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    // creator: '@th_clarence',
  },
  // authors: [
  //   {
  //     name: 'Theodorus Clarence',
  //     url: 'https://theodorusclarence.com',
  //   },
  // ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html>
      <body className="relative">
        <div className="fixed top-0 left-0 w-full h-2 bg-retro-cyan z-50"></div>
        <div className="fixed bottom-0 left-0 w-full h-2 bg-retro-cyan z-50"></div>
        <div className="fixed top-0 left-0 w-2 h-full bg-retro-cyan z-50"></div>
        <div className="fixed top-0 right-0 w-2 h-full bg-retro-cyan z-50"></div>
        
        {/* Fixed header */}
        <header className="fixed top-2 left-0 right-0 bg-retro-bg/95 backdrop-blur-sm z-40 py-2 border-b-2 border-retro-cyan shadow-retro-neon">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="font-retro text-center text-lg md:text-2xl text-white neon-text">
              RETRO GAME ARCHIVES
            </h1>
          </div>
        </header>
        
        <TrackingProvider>
          <ErrorProvider>
            <RootLayoutContent>
              <div className="flex-grow flex flex-col items-center pt-20 sm:pt-24 px-4">
                <div className="w-full max-w-4xl mb-8 mt-4">
                  <div className="w-full h-1 bg-retro-cyan mb-4"></div>
                  <p className="font-retro-text text-center text-retro-yellow text-lg md:text-xl">
                    © 1985 - CLASSIC GAMES COLLECTION
                  </p>
                </div>
                {children}
                <footer className="mt-12 mb-6 w-full max-w-4xl">
                  <div className="w-full h-1 bg-retro-pink mb-4"></div>
                </footer>
              </div>
            </RootLayoutContent>
          </ErrorProvider>
        </TrackingProvider>
        {/* <Gtag/> */}
      </body>
      {FACEBOOK_APP_ID && (
        <FacebookSDKInitializer appId={FACEBOOK_APP_ID} />
      )}
      {/* {GA_TRACKING_ID && (
        <GoogleAnalytics gaId={GA_TRACKING_ID} />
      )} */}
    </html>
  );
}
