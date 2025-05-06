'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-red-500'
            />
            <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
            <a href='/'>Back to home</a>
          </div>
        </section>
      </main>
    </Suspense>
  );
} 