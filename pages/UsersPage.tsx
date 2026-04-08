'use client';

import React from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA, asDate, fmtDay } from '@/lib/data';

interface UsersPageProps {
  onOpen: (item: any) => void;
}

const UsersPage: React.FC<UsersPageProps> = ({ onOpen }) => {
  return (
    <MasterTable
      id="pl"
      title="Users (Planners)"
      rows={DATA.planners}
      onOpen={(r) => onOpen(r)}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'tier', label: 'Tier' },
        { key: 'airaEnabled', label: 'Aira', render: (r) => r.airaEnabled ? 'Enabled' : 'Off' },
        { key: 'lastActiveAt', label: 'Last Active', sort: 'date', render: (r) => fmtDay(asDate(r.lastActiveAt)) },
      ]}
    />
  );
};

export default UsersPage;
