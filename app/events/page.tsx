'use client';

import React, { useMemo } from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA, asDate, fmtDay, ratio, IDX, fmtPct } from '@/lib/data';
import { useDashboard } from '@/lib/context';
import { MiniStats, MiniStat } from '@/components/DashboardUI';

export default function Events() {
  const { setDrawer, targets } = useDashboard();

  const stats = useMemo(() => {
    const total = DATA.events.length;
    const live = DATA.events.filter((e: any) => e.status === 'Live').length;
    const draft = DATA.events.filter((e: any) => e.status === 'Draft').length;
    const liveIds = new Set(DATA.events.filter((e: any) => e.status === 'Live').map((e: any) => e.id));
    const liveGuests = DATA.guests.filter((g: any) => liveIds.has(g.eventId));
    const gpl = live ? liveGuests.length / live : 0;
    const opened = liveGuests.filter((g: any) => g.openedAt).length;
    const rsvp = liveGuests.filter((g: any) => g.rsvpAt).length;
    const rsvpRate = ratio(rsvp, opened);
    return { total, live, draft, gpl, rsvpRate };
  }, []);

  const rows = useMemo(() => {
    return DATA.events.map((e: any) => {
      const p = IDX.planner.get(e.plannerId);
      const h = IDX.host.get(e.hostId);
      const gs = DATA.guests.filter((g: any) => g.eventId === e.id);
      const opened = gs.filter((g: any) => g.openedAt).length;
      const rsvp = gs.filter((g: any) => g.rsvpAt).length;
      const rate = ratio(rsvp, opened);
      return {
        ...e,
        plannerName: p ? p.name : '—',
        hostName: h ? h.name : '—',
        guests: gs.length,
        rsvpRate: rate,
      };
    });
  }, []);

  return (
    <div className="pnl on">
      <div>
        <div className="sec-lbl">Event KPIs</div>
        <MiniStats>
          <MiniStat label="Total Events" value={stats.total} sub="All statuses" />
          <MiniStat label="Live Events" value={stats.live} sub="Currently live" />
          <MiniStat label="Draft Events" value={stats.draft} sub="Not yet live" />
          <MiniStat label="Avg Guests / Live" value={stats.live ? Math.round(stats.gpl) : '—'} sub="Guests attached" />
          <MiniStat label="RSVP Rate" value={stats.rsvpRate == null ? '—' : fmtPct(stats.rsvpRate, 0)} sub="Opened → RSVP" />
        </MiniStats>
      </div>

      <div className="c2 mb-25">
        <div className="cc">
          <div className="ch"><div><div className="ct">Events Created</div><div className="cs">Trend over selected range</div></div></div>
          <div className="emp"><div className="emp-i">▦</div><div className="emp-t">Analytics coming next</div><div className="emp-s">Line chart: new events/day · compare mode</div></div>
        </div>
        <div className="cc">
          <div className="ch"><div><div className="ct">Event Health</div><div className="cs">Completion score + vendor readiness</div></div></div>
          <div className="emp"><div className="emp-i">▦</div><div className="emp-t">Analytics coming next</div><div className="emp-s">Bars: completion buckets, vendor contracts</div></div>
        </div>
      </div>

      <div>
        <div className="sec-lbl">Master Records</div>
        <MasterTable
          id="ev"
          title="Events"
          rows={rows}
          onOpen={(item) => setDrawer({ open: true, item, type: 'events' })}
          columns={[
            { key: 'id', label: 'Event ID', sort: 'str' },
            { key: 'type', label: 'Type', sort: 'str' },
            { key: 'status', label: 'Status', sort: 'str', render: (r) => <span className="bdg cmd">{r.status}</span> },
            { key: 'plannerName', label: 'Planner', sort: 'str' },
            { key: 'hostName', label: 'Host', sort: 'str' },
            { key: 'guests', label: 'Guests', sort: 'num' },
            { key: 'rsvpRate', label: 'RSVP Rate', sort: 'num', render: (r) => r.rsvpRate == null ? '—' : fmtPct(r.rsvpRate, 0) },
            { key: 'createdAt', label: 'Created', sort: 'date', render: (r) => fmtDay(asDate(r.createdAt)) },
          ]}
          chips={[
            { key: 'status', value: 'Live', label: 'Status: Live' },
            { key: 'status', value: 'Draft', label: 'Status: Draft' },
            { key: 'status', value: 'Completed', label: 'Status: Completed' },
            { key: 'type', value: 'Wedding', label: 'Type: Wedding' },
            { key: 'type', value: 'Corporate', label: 'Type: Corporate' },
            { key: 'type', value: 'Birthday', label: 'Type: Birthday' },
          ]}
        />
      </div>
    </div>
  );
}
