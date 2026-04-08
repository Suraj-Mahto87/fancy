'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEF_TARGETS } from '@/lib/data';

interface DashboardContextType {
  targets: typeof DEF_TARGETS;
  setTargets: (t: typeof DEF_TARGETS) => void;
  showTargets: boolean;
  setShowTargets: (show: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  drawer: { open: boolean; item?: any; type?: string };
  setDrawer: (d: { open: boolean; item?: any; type?: string }) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [targets, setTargets] = useState(DEF_TARGETS);
  const [showTargets, setShowTargets] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [drawer, setDrawer] = useState<{ open: boolean; item?: any; type?: string }>({ open: false });

  useEffect(() => {
    const st = localStorage.getItem('fancy_cmd_tgts');
    if (st) setTargets({ ...DEF_TARGETS, ...JSON.parse(st) });
  }, []);

  const handleSetTargets = (newTargets: typeof DEF_TARGETS) => {
    localStorage.setItem('fancy_cmd_tgts', JSON.stringify(newTargets));
    setTargets(newTargets);
  };

  return (
    <DashboardContext.Provider value={{ 
      targets, 
      setTargets: handleSetTargets, 
      showTargets, 
      setShowTargets,
      sidebarOpen,
      setSidebarOpen,
      drawer,
      setDrawer
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within DashboardProvider');
  return context;
};
