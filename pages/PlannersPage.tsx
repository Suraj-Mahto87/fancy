'use client';

import React from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA, asDate, fmtDay } from '@/lib/data';

interface PlannersPageProps {
  onOpen: (item: any) => void;
}

const PlannersPage: React.FC<PlannersPageProps> = ({ onOpen }) => {
  return (
    <MasterTable
      id="plr"
      title="Planners"
      rows={DATA.planners}
      onOpen={(r) => onOpen(r)}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'tier', label: 'Tier' },
        { key: 'createdAt', label: 'Joined', sort: 'date', render: (r) => fmtDay(asDate(r.createdAt)) },
        { key: 'airaEnabled', label: 'Aira', render: (r) => r.airaEnabled ? 'Enabled' : 'Off' },
      ]}
    />
  );
};

export default PlannersPage;
