'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import MasterTable from '@/components/MasterTable';
import { DATA, asDate, fmtDay, ratio } from '@/lib/data';
import { useDashboard } from '@/lib/context';
import { MiniStats, MiniStat } from '@/components/DashboardUI';

export default function Planners() {
  const { setDrawer, targets } = useDashboard();
  const searchParams = useSearchParams();
  const range = searchParams?.get('range') || '30d';

  const stats = useMemo(() => {
    const total = DATA.planners.length;
    const active = DATA.planners.filter((p: any) => asDate(p.lastActiveAt) && asDate(p.lastActiveAt)! >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length;
    const eps = DATA.events.length / total;
    return { total, active, eps };
  }, []);

  const rows = useMemo(() => {
    return DATA.planners.map((p: any) => {
      const evs = DATA.events.filter((e: any) => e.plannerId === p.id);
      const live = evs.filter((e: any) => e.status === 'Live');
      return {
        ...p,
        events: evs.length,
        liveEvents: live.length,
      };
    });
  }, []);

  return (
    <div className="pnl on">
      <div>
        <div className="sec-lbl">Planner KPIs</div>
        <MiniStats>
          <MiniStat label="Total Planners" value={stats.total} delta="—" target="5" />
          <MiniStat label="D7 Retention" value="—" delta="—" target={(targets.retention || 45) + '%'} />
          <MiniStat label="Activation Rate" value="—" sub="Signup → shared ≤7d" />
          <MiniStat label="Time to 1st RSVP" value="—" target="<18h median" />
          <MiniStat label="Avg Events / Planner" value={stats.eps.toFixed(1)} delta="—" />
        </MiniStats>
      </div>

      <div className="c2 mb-25">
        <div className="cc">
          <div className="ch"><div><div className="ct">Planner Signups</div><div className="cs">New planners per week vs last month</div></div></div>
          <div className="emp"><div className="emp-i">◻</div><div className="emp-t">No signups yet</div></div>
        </div>
        <div className="cc">
          <div className="ch"><div><div className="ct">Retention Cohort Heatmap</div><div className="cs">% returning each subsequent week</div></div></div>
          <div className="emp"><div className="emp-i">◻</div><div className="emp-t">No cohort data yet</div><div className="emp-s">Needs 2+ weeks of planner data</div></div>
        </div>
      </div>

      <div>
        <div className="sec-lbl">Master Records</div>
        <MasterTable
          id="pl"
          title="Planners"
          rows={rows}
          onOpen={(item) => setDrawer({ open: true, item, type: 'planners' })}
          columns={[
            { key: 'name', label: 'Planner', sort: 'str' },
            { key: 'tier', label: 'Tier', sort: 'str' },
            { key: 'events', label: 'Events', sort: 'num' },
            { key: 'liveEvents', label: 'Live', sort: 'num' },
            { key: 'airaEnabled', label: 'Aira', render: (r) => r.airaEnabled ? <span className="bdg cmd">On</span> : <span className="bdg prm">Off</span> },
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
