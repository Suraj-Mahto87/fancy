'use client';

import React, { useMemo } from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA, asDate, fmtDay, IDX } from '@/lib/data';
import { useDashboard } from '@/lib/context';
import { MiniStats, MiniStat } from '@/components/DashboardUI';

export default function Guests() {
  const { setDrawer, targets } = useDashboard();

  const rows = useMemo(() => {
    return DATA.guests.map((g: any) => {
      const e = IDX.event.get(g.eventId);
      return {
        ...g,
        eventType: e ? e.type : '—',
        eventStatus: e ? e.status : '—',
      };
    });
  }, []);

  return (
    <div className="pnl on">
      <div>
        <div className="sec-lbl">Guest KPIs</div>
        <MiniStats>
          <MiniStat label="Guests Reached" value={rows.length} delta="—" target={String(targets.guests)} />
          <MiniStat label="Page Open Rate" value="—" delta="—" target={targets.open + '%'} />
          <MiniStat label="RSVP Rate" value="—" delta="—" target={targets.rsvp + '%'} />
          <MiniStat label="Aira Conversations" value={DATA.airaConversations.length} delta="—" />
          <MiniStat label="Mingle Opt-In" value="—" target={targets.mingle + '%'} />
        </MiniStats>
      </div>

      <div className="c2 mb-25">
        <div className="cc">
          <div className="ch"><div><div className="ct">Guest Invite → RSVP Funnel</div><div className="cs">vs last month</div></div></div>
          <div className="emp"><div className="emp-i">·</div><div className="emp-t">No guest data yet</div><div className="emp-s">Invite sent → Link opened → Page viewed → RSVP submitted → Mingle opted in</div></div>
        </div>
        <div className="cc">
          <div className="ch"><div><div className="ct">RSVP by Sub-Event Type</div><div className="cs">Which ceremonies get the highest response?</div></div></div>
          <div className="emp"><div className="emp-i">·</div><div className="emp-t">No RSVPs yet</div></div>
        </div>
      </div>

      <div>
        <div className="sec-lbl">Master Records</div>
        <MasterTable
          id="gu"
          title="Guests"
          rows={rows}
          onOpen={(item) => setDrawer({ open: true, item, type: 'guests' })}
          columns={[
            { key: 'id', label: 'Guest ID', sort: 'str' },
            { key: 'eventType', label: 'Event', sort: 'str' },
            { key: 'rsvpStatus', label: 'RSVP', render: (r: any) => <span className="bdg cmd">{r.rsvpStatus}</span> },
            { key: 'mingleOptIn', label: 'Mingle', render: (r: any) => r.mingleOptIn ? <span className="bdg cmd">Opt-in</span> : '—' },
            { key: 'invitedAt', label: 'Invited', sort: 'date', render: (r: any) => fmtDay(asDate(r.invitedAt)) },
            { key: 'rsvpAt', label: 'RSVP At', sort: 'date', render: (r: any) => fmtDay(asDate(r.rsvpAt)) },
          ]}
          chips={[
            { key: 'rsvpStatus', value: 'Yes', label: 'RSVP: Yes' },
            { key: 'rsvpStatus', value: 'No', label: 'RSVP: No' },
            { key: 'rsvpStatus', value: 'Pending', label: 'RSVP: Pending' },
          ]}
        />
      </div>
    </div>
  );
}
