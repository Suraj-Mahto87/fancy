'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { DATA, asDate, rangeDays, ratio, fmtInt, fmtPct } from '@/lib/data';
import { useDashboard } from '@/lib/context';

const KpiCard: React.FC<{ label: string; value: any; compareText: string; target: any; progress?: number|null; targetVal?: number }> = ({ label, value, compareText, target, progress, targetVal }) => {
  const isZero = value === 0 || value === '0' || value === '—';
  const progPct = progress !== undefined ? ratio(progress || 0, targetVal || 1) : (value && typeof value === 'number' && typeof target === 'number' ? ratio(value, target) : 0);
  return (
    <div className="kc">
      <div className="ka" style={{ background: 'var(--ch)' }}></div>
      <div className="kl">{label}</div>
      <div className={`kv ${isZero ? 'z' : ''}`}>{typeof value === 'number' ? fmtInt(value) : value}</div>
      <div className="kdr"><span className="dl m">—</span><span className="kcl">vs {compareText}</span></div>
      <div className="ktr"><span className="ktl">Target</span><span className="ktv">{target}</span></div>
      <div className="kbw"><div className="kb" style={{ width: (progPct || 0) + '%' }}></div></div>
      <div className="kp">{progress !== undefined ? 'No data yet' : `${value || 0} of ${target}`}</div>
    </div>
  );
};

const HealthBar: React.FC<{ label: string; current: number; target: number; color: string; unit?: string }> = ({ label, current, target, color, unit = '' }) => (
  <div>
    <div className="htop"><span className="hn">{label}</span><span className="hv">{current} / {target}{unit}</span></div>
    <div className="hb"><div className="hf" style={{ width: ratio(current, target) + '%', background: color }}></div></div>
  </div>
);

const EmptySlate: React.FC<{ icon: string; title: string; sub: string }> = ({ icon, title, sub }) => (
  <div className="emp"><div className="emp-i">{icon}</div><div className="emp-t">{title}</div><div className="emp-s">{sub}</div></div>
);

export default function Overview() {
  const searchParams = useSearchParams();
  const { targets } = useDashboard();
  const range = searchParams?.get('range') || '30d';
  const compare = searchParams?.get('compare') || 'month';
  const compareText = compare === 'month' ? 'last month' : 'last year';

  const stats = useMemo(() => {
    const days = rangeDays(range);
    const now = new Date();
    const since = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const activePlanners = DATA.planners.filter((p: any) => asDate(p.lastActiveAt) && asDate(p.lastActiveAt)! >= since).length;
    const eventsLive = DATA.events.filter((e: any) => e.status === 'Live').length;
    const guestsInvited = DATA.guests.filter((g: any) => asDate(g.invitedAt) && asDate(g.invitedAt)! >= since).length;
    const guestsOpened = DATA.guests.filter((g: any) => asDate(g.openedAt) && asDate(g.openedAt)! >= since).length;
    const guestsRsvp = DATA.guests.filter((g: any) => asDate(g.rsvpAt) && asDate(g.rsvpAt)! >= since).length;
    const rsvpRate = ratio(guestsRsvp, guestsOpened);

    const firstRsvpByEvent = new Map<string, string>();
    DATA.guests.forEach((g: any) => {
      if (!g.rsvpAt) return;
      const prev = firstRsvpByEvent.get(g.eventId);
      if (!prev || asDate(g.rsvpAt)! < asDate(prev)!) firstRsvpByEvent.set(g.eventId, g.rsvpAt);
    });
    const northStar = Array.from(firstRsvpByEvent.values()).filter(ts => asDate(ts) && asDate(ts)! >= since).length;
    return { activePlanners, eventsLive, guestsInvited, rsvpRate, northStar };
  }, [range]);

  return (
    <div className="pnl on">
      <div>
        <div className="sec-lbl">Platform Status</div>
        <div className="al info">
          <div className="al-dot blue"></div>
          <div className="al-txt">
            <strong>Pre-launch:</strong> All KPIs show target benchmarks. Deltas appear once two comparable periods have data. Toggle between "Last Month" and "Last Year" comparison at the top.
          </div>
        </div>
      </div>
      <div>
        <div className="sec-lbl">North Star · Monthly</div>
        <div className="ns">
          <div>
            <div className="ns-ey">Monthly North Star</div>
            <div className="ns-n">{fmtInt(stats.northStar)}</div>
            <div className="ns-d">Events that received their first RSVP this month</div>
            <div className="ns-delta">— vs {compareText}</div>
          </div>
          <div className="ns-right">
            <div className="ns-pr">
              <span className="ns-pl">Progress to target</span>
              <span className="ns-tl">Target: {targets.northstar} events</span>
            </div>
            <div className="ns-bo"><div className="ns-bf" style={{ width: ratio(stats.northStar, targets.northstar) + '%' }}></div></div>
            <div className="ns-why">Why: a planner who has received RSVPs rarely churns. This is the moment Fancy delivers its core promise.</div>
          </div>
        </div>
      </div>
      <div>
        <div className="sec-lbl">Primary KPIs</div>
        <div className="kg">
          <KpiCard label="Active Planners" value={stats.activePlanners} compareText={compareText} target={targets.planners} />
          <KpiCard label="Events Live" value={stats.eventsLive} compareText={compareText} target={targets.events} />
          <KpiCard label="RSVP Rate" value={stats.rsvpRate == null ? '—' : fmtPct(stats.rsvpRate, 0)} compareText={compareText} target={targets.rsvp + '%'} progress={stats.rsvpRate} targetVal={targets.rsvp} />
          <KpiCard label="Guests Reached" value={stats.guestsInvited} compareText={compareText} target={targets.guests} />
          <KpiCard label="D7 Retention" value="—" compareText={compareText} target={targets.retention + '%'} />
        </div>
      </div>
      <div className="c2">
        <div className="cc">
          <div className="ch"><div><div className="ct">Events Created</div><div className="cs">vs {compareText}</div></div></div>
          <EmptySlate icon="◻" title="No events yet" sub="Split: Wedding, Birthday, Engagement, Corporate, Other" />
        </div>
        <div className="cc">
          <div className="ch"><div><div className="ct">Activation Funnel</div><div className="cs">Signup → first RSVP</div></div></div>
          <EmptySlate icon="◻" title="No planners yet" sub="Signup → Created event → Shared page → 1st RSVP" />
        </div>
      </div>
      <div className="c2">
        <div className="cc">
          <div className="ct" style={{ marginBottom: '15px' }}>Stakeholder Targets</div>
          <div className="hg">
            <HealthBar label="Planners" current={0} target={targets.planners} color="var(--ch)" />
            <HealthBar label="Events live" current={0} target={targets.events} color="var(--blue)" />
            <HealthBar label="Guests reached" current={0} target={targets.guests} color="var(--sage)" />
            <HealthBar label="Vendor contracts" current={0} target={targets.vendorcontracts} color="var(--ch)" />
          </div>
        </div>
        <div className="cc">
          <div className="ct" style={{ marginBottom: '15px' }}>Feature Targets</div>
          <div className="hg">
            <HealthBar label="Aira adoption" current={0} target={targets.aira} color="var(--ch)" unit="%" />
            <HealthBar label="Mingle opt-in" current={0} target={targets.mingle} color="var(--ch)" unit="%" />
            <HealthBar label="Video invites" current={0} target={targets.invites} color="var(--ch)" />
            <HealthBar label="Vivah sessions" current={0} target={targets.vivah} color="var(--ch)" />
          </div>
        </div>
      </div>
    </div>
  );
}
