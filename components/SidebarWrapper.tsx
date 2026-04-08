'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useDashboard } from '@/lib/context';

interface NavItemProps {
  id: string;
  label: string;
  icon: string;
  href: string;
  activePath: string;
}

const NavItem: React.FC<NavItemProps> = ({ id, label, icon, href, activePath }) => {
  const active = activePath.split('/')[1] === id || (activePath === '/' && id === 'overview');
  return (
    <Link href={href} className={`sb-link ${active ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
      <span className="sb-icon">{icon}</span> {label}
    </Link>
  );
};

const SidebarWrapper: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useDashboard();
  const pathname = usePathname();

  return (
    <>
      <div className={`sb-ov ${sidebarOpen ? 'vis' : ''}`} onClick={() => setSidebarOpen(false)}></div>
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="sb-close-btn" onClick={() => setSidebarOpen(false)}>×</button>
        <div className="sb-brand">
          <div className="sb-logo">FANCY</div>
          <div className="sb-role">Command · Internal</div>
        </div>
        <div className="sb-sect">Platform</div>
        <NavItem id="overview" label="Overview" icon="◈" href="/overview" activePath={pathname || ''} />
        <NavItem id="events" label="Events" icon="▦" href="/events" activePath={pathname || ''} />
        <NavItem id="users" label="Users" icon="◑" href="/users" activePath={pathname || ''} />
        <NavItem id="planners" label="Planners" icon="◆" href="/planners" activePath={pathname || ''} />
        <NavItem id="hosts" label="Hosts" icon="○" href="/hosts" activePath={pathname || ''} />
        <NavItem id="guests" label="Guests" icon="·" href="/guests" activePath={pathname || ''} />
        <NavItem id="vendors" label="Vendors" icon="▹" href="/vendors" activePath={pathname || ''} />
        <div className="sb-sect">Features</div>
        <NavItem id="aira" label="Aira" icon="✦" href="/aira" activePath={pathname || ''} />
        <NavItem id="mingle" label="Mingle" icon="⊕" href="/mingle" activePath={pathname || ''} />
        <NavItem id="invitations" label="Invitations" icon="▷" href="/invitations" activePath={pathname || ''} />
        <NavItem id="vivah" label="Vivah" icon="◇" href="/vivah" activePath={pathname || ''} />
        <div className="sb-div"></div>
        <NavItem id="access" label="Team Access" icon="◎" href="/access" activePath={pathname || ''} />
        <div className="sb-foot">
          <div className="sb-foot-name">Alicia Raisinghani<br />CEO · fancy.global</div>
          <div className="sb-foot-sub">Pre-launch · 0 users</div>
        </div>
      </aside>
    </>
  );
};

export default SidebarWrapper;
