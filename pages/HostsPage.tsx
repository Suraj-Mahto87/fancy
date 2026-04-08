'use client';

import React from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA, asDate, fmtDay } from '@/lib/data';

interface HostsPageProps {
  onOpen: (item: any) => void;
}

const HostsPage: React.FC<HostsPageProps> = ({ onOpen }) => {
  return (
    <MasterTable
      id="ho"
      title="Hosts"
      rows={DATA.hosts}
      onOpen={(r) => onOpen(r)}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'city', label: 'City' },
        { key: 'createdAt', label: 'Joined', sort: 'date', render: (r) => fmtDay(asDate(r.createdAt)) },
      ]}
    />
  );
};

export default HostsPage;
