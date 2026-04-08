'use client';

import React from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA, fmtInr } from '@/lib/data';

interface VendorsPageProps {
  onOpen: (item: any) => void;
}

const VendorsPage: React.FC<VendorsPageProps> = ({ onOpen }) => {
  return (
    <MasterTable
      id="vd"
      title="Vendors"
      rows={DATA.vendors}
      onOpen={(r) => onOpen(r)}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'category', label: 'Category' },
        { key: 'contractStatus', label: 'Status', render: (r) => <span className="bdg cmd">{r.contractStatus}</span> },
        { key: 'valueInr', label: 'Value', sort: 'num', render: (r) => fmtInr(r.valueInr) },
        { key: 'eventId', label: 'Event' },
      ]}
    />
  );
};

export default VendorsPage;
