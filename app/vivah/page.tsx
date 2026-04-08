'use client';

import React, { useMemo } from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA, asDate, fmtDay, ratio, IDX } from '@/lib/data';
import { useDashboard } from '@/lib/context';
import { KpiGrid, KpiCard, Alert, InsightPanel, InsightItem } from '@/components/DashboardUI';

export default function Vivah() {
  const { targets, setDrawer } = useDashboard();
  
  const rows = useMemo(() => {
    return DATA.vivahSessions.map((s: any) => {
      const e = IDX.event.get(s.eventId);
      return {
        ...s,
        eventType: e ? e.type : '—',
        completed: !!(s.p1SubmittedAt && s.p2SubmittedAt),
      };
    });
  }, []);

  return (
    <div className="pnl on">
      <Alert type="info" text={<span><strong>What Vivah tracks:</strong> Both partners answer the same reflection questions independently. Their answers are revealed simultaneously. Aira generates a personalised synthesis. Family members may be invited to witness or receive the synthesis. This panel tracks session health, completion rates, and how deeply the couple's wider family circle engages with the experience.</span>} />

      <div>
        <div className="sec-lbl">Session KPIs</div>
        <KpiGrid>
          <KpiCard label="Sessions Started" value={rows.length} target={targets.vivah} progress={rows.length} targetVal={targets.vivah} sub={rows.length === 0 ? "No data yet" : `${rows.length} of ${targets.vivah}`} />
          <KpiCard label="Both Partners Submitted" value="—" target="70%" accent="var(--sage)" progress={0} targetVal={100} sub="No data yet" />
          <KpiCard label="Mutual Reveals Viewed" value="0" target="90% of completed" accent="var(--blue)" progress={0} targetVal={1} sub="No data yet" />
          <KpiCard label="Family Circle Shares" value="0" target="40% of reveals" accent="var(--ch)" progress={0} targetVal={1} sub="No data yet" />
          <KpiCard label="Avg Time to Complete" value="—" target={"<48h"} accent="var(--ash)" progress={0} targetVal={1} sub="Start → both submitted" />
        </KpiGrid>
      </div>

      <div className="c2 mb-25">
        <div className="cc">
          <div className="ch"><div><div className="ct">Session Completion Funnel</div><div className="cs">From session start to family circle engagement</div></div></div>
          <div className="emp"><div className="emp-i">◇</div><div className="emp-t">No sessions yet</div><div className="emp-s">Started → Partner 1 submitted → Partner 2 submitted → Reveal viewed by both → Aira synthesis generated → Shared with family circle</div></div>
        </div>
        <div className="cc">
          <div className="ch"><div><div className="ct">Family Involvement Breakdown</div><div className="cs">Who receives the Vivah synthesis?</div></div></div>
          <div className="emp"><div className="emp-i">◇</div><div className="emp-t">No family shares yet</div><div className="emp-s">Parents (bride's side) · Parents (groom's side) · Maid of Honour / Best Man · Planner · Extended family. Each share is a warm Fancy referral.</div></div>
        </div>
      </div>

      <div className="c2 mb-25">
        <div className="cc">
          <div className="ch"><div><div className="ct">Time-to-Completion Distribution</div><div className="cs">How quickly do couples complete both submissions?</div></div></div>
          <div className="emp"><div className="emp-i">◇</div><div className="emp-t">No completion data yet</div><div className="emp-s">Buckets: Same day · 1–2 days · 3–7 days · 7+ days. Use this to calibrate when to send the "Partner 2 reminder" nudge.</div></div>
        </div>
        <div className="cc">
          <div className="ch"><div><div className="ct">Repeat Session Rate</div><div className="cs">Couples who return for more Vivah questions vs last month</div></div></div>
          <div className="emp"><div className="emp-i">◇</div><div className="emp-t">No repeat data yet</div><div className="emp-s">Couples who complete more than one session have the highest Fancy login frequency in the 30 days before their event.</div></div>
        </div>
      </div>

      <div className="cc mb-25">
        <div className="ch"><div><div className="ct">Vivah → Platform Return Rate</div><div className="cs">Do couples who complete Vivah return to Fancy more often in the lead-up to their event?</div></div></div>
        <div className="emp"><div className="emp-i">◇</div><div className="emp-t">No comparison data yet</div><div className="emp-s">Primary hypothesis: couples who complete a Vivah session show ≥25% higher weekly login frequency in the 30 days before their event vs. those who don't. Track this split from first session — it is the business case for investing further in Vivah.</div></div>
      </div>

      <InsightPanel title="Vivah Strategic Context">
        <InsightItem icon="↑" text={<span><strong>Vivah is Fancy's highest emotional switching cost — and its most under-measured retention lever.</strong> A couple who completes a Vivah session has shared something private and meaningful inside Fancy. That creates a bond with the platform no RSVP dashboard can replicate. The metric to watch beyond completion rate: does the Aira synthesis get shared with parents or the wedding party? Every family-circle share is a warm Fancy referral. Track and attribute new planner signups back to Vivah users from day one.</span>} />
        <InsightItem icon="↑" text={<span><strong>Family involvement is the distribution mechanism.</strong> When a couple shares their Vivah synthesis with their parents or maid of honour, those family members open Fancy for the first time. If they find the platform beautiful and the content meaningful, the next wedding in that family will be planned on Fancy. Design the family share experience with the same care as the couple experience — it is a product surface, not an afterthought.</span>} />
      </InsightPanel>

      <div>
        <div className="sec-lbl">Master Records</div>
        <MasterTable
          id="viv"
          title="Vivah Sessions"
          rows={rows}
          onOpen={(item) => setDrawer({ open: true, item, type: 'vivah' })}
          columns={[
            { key: 'id', label: 'Session ID', sort: 'str' },
            { key: 'eventType', label: 'Event', sort: 'str' },
            { key: 'startedAt', label: 'Started', sort: 'date', render: (r) => fmtDay(asDate(r.startedAt)) },
            { key: 'completed', label: 'Completed', render: (r) => r.completed ? <span className="bdg cmd">Yes</span> : <span className="bdg prm">No</span> },
            { key: 'synthesisSharedToFamily', label: 'Family Share', render: (r: any) => r.synthesisSharedToFamily ? <span className="bdg cmd">Yes</span> : <span className="bdg prm">No</span> },
          ]}
          chips={[
            { key: 'eventType', value: 'Wedding', label: 'Type: Wedding' },
            { key: 'completed', value: true, label: 'Completed: Both' },
          ]}
        />
      </div>
    </div>
  );
}
