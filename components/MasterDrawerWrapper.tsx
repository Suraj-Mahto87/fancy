'use client';

import React from 'react';
import { useDashboard } from '@/lib/context';
import RecordDrawer from './RecordDrawer';

const MasterDrawerWrapper: React.FC = () => {
  const { drawer, setDrawer } = useDashboard();

  if (!drawer.open) return null;

  return (
    <RecordDrawer 
      item={drawer.item} 
      type={drawer.type!} 
      onClose={() => setDrawer({ open: false })} 
    />
  );
};

export default MasterDrawerWrapper;
