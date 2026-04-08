'use client';

import React from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA, asDate, fmtDay } from '@/lib/data';

const AiraPage: React.FC = () => {
  return (
    <MasterTable
      id="ac"
      title="Aira AI Conversations"
      rows={DATA.airaConversations}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'eventId', label: 'Event' },
        { key: 'createdAt', label: 'Date', sort: 'date', render: (r) => fmtDay(asDate(r.createdAt)) },
        { key: 'satisfaction', label: 'CSAT', sort: 'num', render: (r) => '★'.repeat(r.satisfaction) },
        { key: 'escalated', label: 'Escalated', render: (r) => r.escalated ? <span className="bdg prm">YES</span> : 'No' },
      ]}
    />
  );
};

export default AiraPage;
