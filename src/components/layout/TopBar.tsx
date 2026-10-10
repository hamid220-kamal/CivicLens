/**
 * TopBar Component - Fixed header navigation
 */

import Icon from '@/components/ui/Icon';

interface TopBarProps {
  title?: string;
  showLogo?: boolean;
}

export default function TopBar({ title = 'CivicLens', showLogo = true }: TopBarProps) {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-margin-mobile flex items-center justify-between">
        {/* Left: Logo & Status */}
        <div className="flex items-center gap-space-sm">
          {showLogo && (
            <>
              <img
                alt="CivicLens Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XDrNfhXHayEReWhx1lSJwrjWOiovyTn3ud7hOyGFv9EzqYx0SrPbVNke1czL5vMy4TxBh7qWn8siOXcsU4fhc1VA1916HqBqyQZUOfMgAEVVMBWntVFydvWsSsVf2W85gpxCO33S7-OG0oyZxN4CbPNR7y8p1CxIOWF7KlAcyGV05Eenb_WGM8lvV0dccgc5Teym4IkPfAJg-lLFXW3IDZZQqMmrmIDQnBkqC3GYjHB9OUiwzk8UJ1-jKm"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none">
                    CivicLens
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-[10px] leading-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                    Online
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant truncate max-w-[150px]">
                  {title}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-space-xs">
          <button
            aria-label="Notifications"
            className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
          >
            <Icon name="notifications" size="lg" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
            <Icon name="person" size="sm" className="text-on-primary" />
          </div>
        </div>
      </div>
    </header>
  );
}
