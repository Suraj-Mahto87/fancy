'use client';

import React from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA, asDate, fmtDay } from '@/lib/data';

interface GuestsPageProps {
  onOpen: (item: any) => void;
}

const GuestsPage: React.FC<GuestsPageProps> = ({ onOpen }) => {
  return (
    <MasterTable
      id="gu"
      title="Guests"
      rows={DATA.guests}
      onOpen={(r) => onOpen(r)}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'rsvpStatus', label: 'RSVP', render: (r) => <span className="bdg cmd">{r.rsvpStatus}</span> },
        { key: 'eventId', label: 'Event' },
        { key: 'invitedAt', label: 'Invited', sort: 'date', render: (r) => fmtDay(asDate(r.invitedAt)) },
      ]}
      chips={[
        { key: 'rsvpStatus', value: 'Yes', label: 'RSVP: Yes' },
        { key: 'rsvpStatus', value: 'No', label: 'RSVP: No' },
        { key: 'rsvpStatus', value: 'Pending', label: 'RSVP: Pending' },
      ]}
    />
  );
};

export default GuestsPage;
