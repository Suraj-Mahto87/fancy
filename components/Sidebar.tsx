'use client';

import React from 'react';
import { TITLES } from '@/lib/data';

interface NavItemProps {
  id: string;
  label: string;
  icon: string;
  active: string;
  onClick: (id: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ id, label, icon, active, onClick }) => (
  <div className={`sb-link ${active === id ? 'active' : ''}`} onClick={() => onClick(id)}>
    <span className="sb-icon">{icon}</span> {label}
  </div>
);

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  return (
    <>
      <div className={`sb-ov ${isOpen ? 'vis' : ''}`} onClick={() => setIsOpen(false)}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="sb-close-btn" onClick={() => setIsOpen(false)}>×</button>
        <div className="sb-brand">
          <div className="sb-logo">FANCY</div>
          <div className="sb-role">Command · Internal</div>
        </div>
        <div className="sb-sect">Platform</div>
        <NavItem id="overview" label="Overview" icon="◈" active={activeTab} onClick={setActiveTab} />
        <NavItem id="events" label="Events" icon="▦" active={activeTab} onClick={setActiveTab} />
        <NavItem id="users" label="Users" icon="◑" active={activeTab} onClick={setActiveTab} />
        <NavItem id="planners" label="Planners" icon="◆" active={activeTab} onClick={setActiveTab} />
        <NavItem id="hosts" label="Hosts" icon="○" active={activeTab} onClick={setActiveTab} />
        <NavItem id="guests" label="Guests" icon="·" active={activeTab} onClick={setActiveTab} />
        <NavItem id="vendors" label="Vendors" icon="▹" active={activeTab} onClick={setActiveTab} />
        <div className="sb-sect">Features</div>
        <NavItem id="aira" label="Aira" icon="✦" active={activeTab} onClick={setActiveTab} />
        <NavItem id="mingle" label="Mingle" icon="⊕" active={activeTab} onClick={setActiveTab} />
        <NavItem id="invitations" label="Invitations" icon="▷" active={activeTab} onClick={setActiveTab} />
        <NavItem id="vivah" label="Vivah" icon="◇" active={activeTab} onClick={setActiveTab} />
        <div className="sb-div"></div>
        <NavItem id="access" label="Team Access" icon="◎" active={activeTab} onClick={setActiveTab} />
        <div className="sb-foot">
          <div className="sb-foot-name">Alicia Raisinghani<br />CEO · fancy.global</div>
          <div className="sb-foot-sub">Pre-launch · 0 users</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
