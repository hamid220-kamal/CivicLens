'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Check if preloader has been shown before in this session
    if (typeof window !== 'undefined') {
      const hasShownPreloader = sessionStorage.getItem('civicLensPreloaderShown');
      if (hasShownPreloader) {
        setShowPreloader(false);
      } else {
        sessionStorage.setItem('civicLensPreloaderShown', 'true');
      }
    }
  }, []);

  return (
    <>
      {showPreloader && <Preloader duration={2500} onComplete={() => setShowPreloader(false)} />}
      {children}
    </>
  );
}
