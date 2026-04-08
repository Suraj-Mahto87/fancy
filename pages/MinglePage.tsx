'use client';

import React from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA } from '@/lib/data';

const MinglePage: React.FC = () => {
  return (
    <MasterTable
      id="mp"
      title="Mingle Profiles"
      rows={DATA.mingleProfiles}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'guestId', label: 'Guest' },
        { key: 'intent', label: 'Intent' },
        { key: 'city', label: 'City' },
        { key: 'complete', label: 'Progress', render: (r) => r.complete ? '100%' : 'Draft' },
      ]}
    />
  );
};

export default MinglePage;
