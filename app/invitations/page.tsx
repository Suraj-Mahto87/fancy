'use client';

import React, { useMemo } from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA, asDate, fmtDay, IDX } from '@/lib/data';
import { useDashboard } from '@/lib/context';
import { KpiGrid, KpiCard } from '@/components/DashboardUI';

export default function Invitations() {
  const { targets, setDrawer } = useDashboard();
  
  const rows = useMemo(() => {
    return DATA.invitationVideos.map((v: any) => {
      const e = IDX.event.get(v.eventId);
      return {
        ...v,
        eventType: e ? e.type : '—',
      };
    });
  }, []);

  return (
    <div className="pnl on">
      <div>
        <div className="sec-lbl">WhatsApp Invitation Videos</div>
        <KpiGrid>
          <KpiCard label="Videos Generated" value={rows.length} target={targets.invites} progress={rows.length} targetVal={targets.invites} sub={rows.length === 0 ? "No data yet" : `${rows.length} of ${targets.invites}`} />
          <KpiCard label="Render Success" value="—" target="98%+" accent="var(--ch)" progress={0} targetVal={100} sub="No data yet" />
          <KpiCard label="Avg Render Time" value="—" target="<45s" accent="var(--ash)" progress={0} targetVal={1} sub="Creatomate API latency" />
          <KpiCard label="Top Template" value="—" target="Variety" accent="var(--ch)" progress={0} targetVal={1} sub="Monthly most used" />
          <KpiCard label="Aira Notes Used" value="—" target="60%+" accent="var(--sage)" progress={0} targetVal={100} sub="% with personal note" />
        </KpiGrid>
      </div>

      <div className="c2 mb-25">
        <div className="cc">
          <div className="ch"><div><div className="ct">Template Popularity</div><div className="cs">vs last month</div></div></div>
          <div className="emp"><div className="emp-i">▷</div><div className="emp-t">No videos yet</div></div>
        </div>
        <div className="cc">
          <div className="ch"><div><div className="ct">Video vs Text RSVP Rate</div><div className="cs">Hypothesis: video invites outperform text by ≥15pp</div></div></div>
          <div className="emp"><div className="emp-i">▷</div><div className="emp-t">No delivery data yet</div><div className="emp-s">Track this split from the first send</div></div>
        </div>
      </div>

      <div>
        <div className="sec-lbl">Master Records</div>
        <MasterTable
          id="inv"
          title="Video Invitations"
          rows={rows}
          onOpen={(item) => setDrawer({ open: true, item, type: 'invitations' })}
          columns={[
            { key: 'id', label: 'ID', sort: 'str' },
            { key: 'eventType', label: 'Event', sort: 'str' },
            { key: 'template', label: 'Template', sort: 'str' },
            { key: 'sentAt', label: 'Sent', sort: 'date', render: (r) => fmtDay(asDate(r.sentAt)) },
            { key: 'createdAt', label: 'Created', sort: 'date', render: (r) => fmtDay(asDate(r.createdAt)) },
          ]}
          chips={[
            { key: 'template', value: 'Raj', label: 'Tmpl: Raj' },
            { key: 'template', value: 'Mehndi', label: 'Tmpl: Mehndi' },
            { key: 'template', value: 'Floral', label: 'Tmpl: Floral' },
          ]}
        />
      </div>
    </div>
  );
}
