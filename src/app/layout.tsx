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
      <body>
        <TrackingProvider>
          <ErrorProvider>
            <RootLayoutContent>
              <div className="flex-grow flex flex-col items-center">
                {/* <Header /> */}
                {children}
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
