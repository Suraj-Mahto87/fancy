'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import MasterTable from '@/components/MasterTable';
import { DATA, asDate, fmtDay } from '@/lib/data';
import { useDashboard } from '@/lib/context';
import { MiniStats, MiniStat, Alert } from '@/components/DashboardUI';

export default function Users() {
  const { setDrawer, targets } = useDashboard();
  const searchParams = useSearchParams();
  const range = searchParams?.get('range') || '30d';

  const stats = useMemo(() => {
    const total = DATA.planners.length;
    const active = DATA.planners.filter((p: any) => asDate(p.lastActiveAt) && asDate(p.lastActiveAt)! >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length;
    const eps = DATA.events.length / total;
    const aira = (DATA.planners.filter((p: any) => p.airaEnabled).length / total) * 100;
    return { total, active, eps, aira };
  }, []);

  const rows = useMemo(() => {
    return DATA.planners.map((p: any) => {
      const evs = DATA.events.filter((e: any) => e.plannerId === p.id);
      const live = evs.filter((e: any) => e.status === 'Live');
      const guestCount = DATA.guests.filter((g: any) => live.some((e: any) => e.id === g.eventId)).length;
      return {
        id: p.id,
        name: p.name,
        role: 'Planner',
        tier: p.tier,
        signedUpAt: p.createdAt,
        lastActiveAt: p.lastActiveAt,
        events: evs.length,
        liveEvents: live.length,
        liveGuests: guestCount,
        airaEnabled: p.airaEnabled,
      };
    });
  }, []);

  return (
    <div className="pnl on">
      <div>
        <div className="sec-lbl">Platform Users</div>
        <Alert type="info" text={<span><strong>Users:</strong> For this HTML-only dashboard, “platform users” are represented by planners. You can expand this later to include hosts and internal accounts once those entities exist as first-class user records.</span>} />
      </div>
      
      <div>
        <div className="sec-lbl">User KPIs</div>
        <MiniStats>
          <MiniStat label="Total Users" value={stats.total} sub="All users" />
          <MiniStat label="New Users" value={0} sub="In selected range" />
          <MiniStat label="Active Users" value={stats.active} sub="Active in range" />
          <MiniStat label="Avg Events / User" value={stats.eps.toFixed(1)} sub="Portfolio size" />
          <MiniStat label="Aira Enabled" value={stats.aira.toFixed(0) + '%'} sub="% of users" />
        </MiniStats>
      </div>

      <div className="c2 mb-25">
        <div className="cc">
          <div className="ch"><div><div className="ct">User Signups</div><div className="cs">Trend over selected range</div></div></div>
          <div className="emp"><div className="emp-i">◑</div><div className="emp-t">Analytics coming next</div><div className="emp-s">Line chart: signups/day · compare mode</div></div>
        </div>
        <div className="cc">
          <div className="ch"><div><div className="ct">Activation</div><div className="cs">Signup → first live event → first RSVP</div></div></div>
          <div className="emp"><div className="emp-i">◑</div><div className="emp-t">Analytics coming next</div><div className="emp-s">Funnel: users → created event → went live → first RSVP</div></div>
        </div>
      </div>

      <div>
        <div className="sec-lbl">Master Records</div>
        <MasterTable
          id="us"
          title="Users"
          rows={rows}
          onOpen={(item) => setDrawer({ open: true, item, type: 'planners' })}
          columns={[
            { key: 'name', label: 'User', sort: 'str' },
            { key: 'role', label: 'Role', sort: 'str' },
            { key: 'tier', label: 'Tier', sort: 'str' },
            { key: 'events', label: 'Events', sort: 'num' },
            { key: 'liveEvents', label: 'Live', sort: 'num' },
            { key: 'liveGuests', label: 'Guests (Live)', sort: 'num' },
            { key: 'airaEnabled', label: 'Aira', render: (r) => r.airaEnabled ? <span className="bdg cmd">On</span> : <span className="bdg prm">Off</span> },
            { key: 'signedUpAt', label: 'Signed Up', sort: 'date', render: (r) => fmtDay(asDate(r.signedUpAt)) },
            { key: 'lastActiveAt', label: 'Last Active', sort: 'date', render: (r) => fmtDay(asDate(r.lastActiveAt)) },
          ]}
          chips={[
            { key: 'tier', value: 'Founding', label: 'Tier: Founding' },
            { key: 'tier', value: 'Pro', label: 'Tier: Pro' },
            { key: 'tier', value: 'Starter', label: 'Tier: Starter' },
          ]}
        />
      </div>
    </div>
  );
}
