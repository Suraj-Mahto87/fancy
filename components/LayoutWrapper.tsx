'use client';

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
        <TopBarWrapper />
        <div className="content">
          {children}
        </div>
      </div>
      <MasterDrawerWrapper />
    </div>
  );
}
