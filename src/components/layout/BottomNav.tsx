/**
 * BottomNav Component - Mobile bottom navigation
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

interface BottomNavProps {
  activePath?: string;
  items?: NavItem[];
}

const defaultItems: NavItem[] = [
  { path: '#', label: 'Reporter', icon: 'report_problem' },
  { path: '#', label: 'Dashboard', icon: 'analytics' },
  { path: '/style-guide', label: 'Style Guide', icon: 'palette' },
];

export default function BottomNav({ activePath = '/style-guide', items = defaultItems }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.05)]"
      data-active-classes="text-primary font-body-md-bold"
    >
      <div className="flex justify-around items-center h-16 px-space-xs">
        {items.map((item) => {
          const isActive = item.path === activePath;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
                isActive
                  ? 'text-primary font-body-md-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon name={item.icon} size="lg" />
              <span className="font-label-sm text-label-sm mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
