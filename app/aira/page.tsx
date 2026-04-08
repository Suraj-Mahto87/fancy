'use client';

import React, { useMemo } from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA, asDate, fmtDay, IDX } from '@/lib/data';
import { useDashboard } from '@/lib/context';
import { MiniStats, MiniStat, InsightPanel, InsightItem } from '@/components/DashboardUI';

export default function Aira() {
  const { targets, setDrawer } = useDashboard();
  
  const rows = useMemo(() => {
    return DATA.airaConversations.map((c: any) => {
      const e = IDX.event.get(c.eventId);
      return {
        ...c,
        eventType: e ? e.type : '—',
      };
    });
  }, []);

  return (
    <div className="pnl on">
      <div>
        <div className="sec-lbl">Aira AI Concierge</div>
        <MiniStats>
          <MiniStat label="Aira Adoption" value="—" sub="% of planners" />
          <MiniStat label="Auto-Reply On" value={0} sub="Events with auto-reply" />
          <MiniStat label="Guest Convos" value={rows.length} sub="Guest interactions" />
          <MiniStat label="Avg Msgs / Event" value="—" sub="Drafts + Replies" />
          <MiniStat label="Morning Briefings" value={0} sub="Daily executive summaries" />
        </MiniStats>
      </div>

      <div className="c2 mb-25">
        <div className="cc">
          <div className="ch"><div><div className="ct">Aira Feature Usage</div><div className="cs">% of planners using each feature this month</div></div></div>
          <div className="emp"><div className="emp-i">✦</div><div className="emp-t">No Aira data yet</div><div className="emp-s">Morning Briefing, Message Drafts, Pre-Call Scripts, Concierge Inbox, Guest Chatbot</div></div>
        </div>
        <div className="cc">
          <div className="ch"><div><div className="ct">Response Quality</div><div className="cs">Guest satisfaction + escalation rate</div></div></div>
          <div className="emp"><div className="emp-i">✦</div><div className="emp-t">No conversations yet</div><div className="emp-s">Thumbs up/down, follow-up rate, human escalation rate</div></div>
        </div>
      </div>

      <InsightPanel title="Aira Strategic Context">
        <InsightItem icon="↑" text={<span><strong>Aira adoption is a retention multiplier.</strong> Each drafted message saves ~4 minutes. Each morning briefing saves ~15 minutes of manual RSVP checking. A planner running 5 active events saves an estimated 6–8 hours per month with Aira enabled. Planners who use Aira ≥3× per week show materially higher D30 retention. Surface this value inside the planner dashboard once data exists.</span>} />
      </InsightPanel>

      <div>
        <div className="sec-lbl">Master Records</div>
        <MasterTable
          id="ac"
          title="Aira Conversations"
          rows={rows}
          onOpen={(item) => setDrawer({ open: true, item, type: 'aira' })}
          columns={[
            { key: 'id', label: 'ID', sort: 'str' },
            { key: 'eventType', label: 'Event', sort: 'str' },
            { key: 'createdAt', label: 'Created', sort: 'date', render: (r: any) => fmtDay(asDate(r.createdAt)) },
            { key: 'satisfaction', label: 'Sat', sort: 'num' },
            { key: 'escalated', label: 'Escalated', render: (r: any) => r.escalated ? <span className="bdg cmd">Yes</span> : '—' },
          ]}
          chips={[
            { key: 'escalated', value: true, label: 'Escalated' },
          ]}
        />
      </div>
    </div>
  );
}
