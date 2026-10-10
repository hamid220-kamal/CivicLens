'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';

interface PreloaderProps {
  duration?: number;
  onComplete?: () => void;
}

export default function Preloader({ duration = 2500, onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 300);

    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-background flex items-center justify-center transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-bg/30 to-accent-bg/20 animate-pulse" />

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center gap-8">
        {/* Logo with Animation */}
        <div className="animate-fade-in-scale">
          <Logo size="lg" showText={false} />
        </div>

        {/* Animated Loading Ring */}
        <div className="relative w-20 h-20">
          <svg
            className="absolute inset-0 w-full h-full animate-spin"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="#1E40AF"
              strokeWidth="2"
              opacity="0.2"
            />
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="31.4 125.6"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E40AF" />
                <stop offset="100%" stopColor="#0D9488" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand Text */}
        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-3xl font-bold text-primary">CivicLens</h1>
          <p className="text-text-secondary text-sm">Transparent City Infrastructure</p>
        </div>

        {/* Loading Dots */}
        <div className="flex gap-2 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.15s' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.3s' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-scale {
          animation: fade-in-scale 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
