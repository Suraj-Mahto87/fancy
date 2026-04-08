'use client';

import React, { useMemo } from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA, asDate, fmtDay } from '@/lib/data';
import { useDashboard } from '@/lib/context';
import { MiniStats, MiniStat } from '@/components/DashboardUI';

export default function Hosts() {
  const { setDrawer, targets } = useDashboard();

  const rows = useMemo(() => {
    return DATA.hosts.map((h: any) => {
      const evs = DATA.events.filter((e: any) => e.hostId === h.id);
      const live = evs.filter((e: any) => e.status === 'Live').length;
      return {
        ...h,
        events: evs.length,
        liveEvents: live,
      };
    });
  }, []);

  return (
    <div className="pnl on">
      <div>
        <div className="sec-lbl">Host KPIs</div>
        <MiniStats>
          <MiniStat label="Active Hosts" value={rows.length} delta="—" />
          <MiniStat label="Event Completion" value="—" target={targets.completion + '%'} />
          <MiniStat label="Approval Actions" value={0} delta="—" />
          <MiniStat label="Vivah Sessions" value={DATA.vivahSessions.length} target={String(targets.vivah)} />
          <MiniStat label="Host Self-Serve" value="—" sub="Actions w/o planner prompt" />
        </MiniStats>
      </div>

      <div className="c2 mb-25">
        <div className="cc">
          <div className="ch"><div><div className="ct">Host Self-Service Actions</div><div className="cs">Without planner involvement</div></div></div>
          <div className="emp"><div className="emp-i">○</div><div className="emp-t">No host activity yet</div><div className="emp-s">RSVP checks, vendor summaries, decision approvals, planner messages</div></div>
        </div>
        <div className="cc">
          <div className="ch"><div><div className="ct">Event Completion Distribution</div><div className="cs">How complete are live event pages?</div></div></div>
          <div className="emp"><div className="emp-i">○</div><div className="emp-t">No events yet</div></div>
        </div>
      </div>

      <div>
        <div className="sec-lbl">Master Records</div>
        <MasterTable
          id="ho"
          title="Hosts"
          rows={rows}
          onOpen={(item) => setDrawer({ open: true, item, type: 'hosts' })}
          columns={[
            { key: 'name', label: 'Host', sort: 'str' },
            { key: 'city', label: 'City', sort: 'str' },
            { key: 'events', label: 'Events', sort: 'num' },
            { key: 'liveEvents', label: 'Live', sort: 'num' },
            { key: 'createdAt', label: 'Created', sort: 'date', render: (r: any) => fmtDay(asDate(r.createdAt)) },
          ]}
        />
      </div>
    </div>
  );
}
