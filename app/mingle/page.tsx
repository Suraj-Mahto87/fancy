'use client';

import React, { useMemo } from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA } from '@/lib/data';
import { useDashboard } from '@/lib/context';
import { MiniStats, MiniStat } from '@/components/DashboardUI';

export default function Mingle() {
  const { targets, setDrawer } = useDashboard();
  
  const rows = useMemo(() => {
    return DATA.mingleProfiles.map((p: any) => ({
      ...p,
    }));
  }, []);

  return (
    <div className="pnl on">
      <div>
        <div className="sec-lbl">Mingle — Guest Matching</div>
        <MiniStats>
          <MiniStat label="Opt-Ins" value={rows.length} delta="—" target={targets.mingle + '% of RSVPs'} />
          <MiniStat label="Profiles Complete" value={rows.filter((p: any) => p.complete).length} sub="Full Mingle profile" />
          <MiniStat label="Intros Sent" value={0} delta="—" />
          <MiniStat label="Conversation Rate" value="—" target="40% intro→reply" />
          <MiniStat label="Connections Made" value={0} delta="—" />
        </MiniStats>
      </div>

      <div className="c2 mb-25">
        <div className="cc">
          <div className="ch"><div><div className="ct">Intent Breakdown</div><div className="cs">Life Partner · Friend · Networking</div></div></div>
          <div className="emp"><div className="emp-i">⊕</div><div className="emp-t">No Mingle data yet</div></div>
        </div>
        <div className="cc">
          <div className="ch"><div><div className="ct">Match Score Distribution</div><div className="cs">4-signal: embeddings, city, intent, profession</div></div></div>
          <div className="emp"><div className="emp-i">⊕</div><div className="emp-t">No matches yet</div></div>
        </div>
      </div>

      <div>
        <div className="sec-lbl">Master Records</div>
        <MasterTable
          id="mp"
          title="Mingle Profiles"
          rows={rows}
          onOpen={(item) => setDrawer({ open: true, item, type: 'mingle' })}
          columns={[
            { key: 'id', label: 'Profile ID', sort: 'str' },
            { key: 'intent', label: 'Intent', sort: 'str' },
            { key: 'city', label: 'City', sort: 'str' },
            { key: 'complete', label: 'Complete', sort: 'str', render: (r: any) => r.complete ? <span className="bdg cmd">Yes</span> : <span className="bdg prm">No</span> },
          ]}
          chips={[
            { key: 'intent', value: 'Life Partner', label: 'Intent: Partner' },
            { key: 'intent', value: 'Friend', label: 'Intent: Friend' },
            { key: 'complete', value: true, label: 'Complete' },
          ]}
        />
      </div>
    </div>
  );
}
