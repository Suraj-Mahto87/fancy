'use client';

import React from 'react';

import { usePathname } from 'next/navigation';
import SidebarWrapper from '@/components/SidebarWrapper';
import TopBarWrapper from '@/components/TopBarWrapper';
import MasterDrawerWrapper from '@/components/MasterDrawerWrapper';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="shell">
      <SidebarWrapper />
      <div className="main-col">
        <React.Suspense fallback={<div style={{ height: '60px', background: 'white' }} />}>
          <TopBarWrapper />
        </React.Suspense>
        <div className="content">
          <React.Suspense fallback={<div className="pnl on">Loading...</div>}>
            {children}
          </React.Suspense>
        </div>
      </div>
      <MasterDrawerWrapper />
    </div>
  );
}
