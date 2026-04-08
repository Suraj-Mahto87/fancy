'use client';

import React from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA, asDate, fmtDay } from '@/lib/data';

interface EventsPageProps {
  onOpen: (item: any) => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ onOpen }) => {
  return (
    <MasterTable
      id="ev"
      title="Events"
      rows={DATA.events}
      onOpen={(r) => onOpen(r)}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'type', label: 'Type' },
        { key: 'status', label: 'Status', render: (r) => <span className="bdg cmd">{r.status}</span> },
        { key: 'plannerId', label: 'Planner' },
        { key: 'hostId', label: 'Host' },
        { key: 'goLiveAt', label: 'Live', sort: 'date', render: (r) => fmtDay(asDate(r.goLiveAt)) },
      ]}
    />
  );
};

export default EventsPage;
