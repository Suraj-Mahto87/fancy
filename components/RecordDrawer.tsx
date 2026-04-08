'use client';

import React from 'react';
import { fmtDay, fmtInr, fmtPct, ratio, IDX, DATA, asDate } from '@/lib/data';

interface RecordDrawerProps {
  item: any;
  type: string;
  onClose: () => void;
}

export default function RecordDrawer({ item, type, onClose }: RecordDrawerProps) {
  if (!item) return null;

  return (
    <>
      <div className="drov on" onClick={onClose}></div>
      <aside className="dr on" aria-hidden="false">
        <div className="drh">
          <div>
            <div className="drt">{getDrawerTitle(item, type)}</div>
            <div className="drs">{getDrawerSub(item, type)}</div>
          </div>
          <button className="drx" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="drb">
          {renderDrawerContent(item, type)}
        </div>
      </aside>
    </>
  );
}

function getDrawerTitle(item: any, type: string) {
  if (type === 'events') return item.type;
  if (type === 'users' || type === 'planners') return item.name || item.id;
  if (type === 'hosts') return item.name;
  if (type === 'guests') return item.name || item.id;
  if (type === 'vendors') return item.category;
  if (type === 'aira') return 'Aira Conversation';
  if (type === 'mingle') return 'Mingle Profile';
  if (type === 'invitations') return 'Invitation Video';
  if (type === 'vivah') return 'Vivah Session';
  return 'Record';
}

function getDrawerSub(item: any, type: string) {
  return `${type.charAt(0).toUpperCase() + type.slice(1, -1)} · ${item.id}`;
}

function renderDrawerContent(item: any, type: string) {
  switch (type) {
    case 'events':
      return <EventContent item={item} />;
    case 'users':
    case 'planners':
      return <PlannerContent item={item} />;
    case 'hosts':
      return <HostContent item={item} />;
    case 'guests':
      return <GuestContent item={item} />;
    case 'vendors':
      return <VendorContent item={item} />;
    case 'aira':
      return <AiraContent item={item} />;
    case 'mingle':
      return <MingleContent item={item} />;
    case 'invitations':
      return <InvitationContent item={item} />;
    case 'vivah':
      return <VivahContent item={item} />;
    default:
      return <div>No content defined for {type}</div>;
  }
}

function Grid({ items }: { items: [string, any][] }) {
  return (
    <div className="drkv">
      {items.map(([k, v], i) => (
        <div key={i}>
          <div className="k">{k}</div>
          <div className="v">{v ?? '—'}</div>
        </div>
      ))}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="drsec">
      <div className="drsl">{title}</div>
      {children}
    </div>
  );
}

function EventContent({ item }: { item: any }) {
  const p = IDX.planner.get(item.plannerId);
  const h = IDX.host.get(item.hostId);
  const gs = DATA.guests.filter((g: any) => g.eventId === item.id);
  const opened = gs.filter((g: any) => g.openedAt).length;
  const rsvp = gs.filter((g: any) => g.rsvpAt).length;
  const rsvpRate = ratio(rsvp, opened);
  const vs = DATA.vendors.filter((v: any) => v.eventId === item.id);
  const vids = DATA.invitationVideos.filter((v: any) => v.eventId === item.id);
  const aira = DATA.airaConversations.filter((c: any) => c.eventId === item.id);

  return (
    <>
      <Section title="Core">
        <Grid items={[
          ['Event ID', item.id],
          ['Type', item.type],
          ['Status', <span className="bdg cmd" key="st">{item.status}</span>],
          ['Created', fmtDay(asDate(item.createdAt))],
          ['Live Since', fmtDay(asDate(item.goLiveAt))],
          ['Guests', String(gs.length)],
        ]} />
      </Section>
      <Section title="Performance">
        <Grid items={[
          ['Opened', String(opened)],
          ['RSVPs', String(rsvp)],
          ['RSVP Rate', rsvpRate == null ? '—' : fmtPct(rsvpRate, 0)],
          ['Aira Convos', String(aira.length)],
          ['Vendors', String(vs.length)],
          ['Invite Videos', String(vids.length)],
        ]} />
      </Section>
      <Section title="Relationships">
        <div className="rel">
          {p && <div><a href="#">Planner: {p.name}</a><div className="mut">{p.id}</div></div>}
          {h && <div><a href="#">Host: {h.name}</a><div className="mut">{h.id}</div></div>}
        </div>
      </Section>
    </>
  );
}

function PlannerContent({ item }: { item: any }) {
  const ev = DATA.events.filter((e: any) => e.plannerId === item.id);
  const live = ev.filter((e: any) => e.status === 'Live').length;
  const guestCount = DATA.guests.filter((g: any) => ev.some((e: any) => e.id === g.eventId)).length;

  return (
    <>
      <Section title="Core">
        <Grid items={[
          ['Planner ID', item.id],
          ['Tier', item.tier],
          ['Created', fmtDay(asDate(item.createdAt))],
          ['Last Active', fmtDay(asDate(item.lastActiveAt))],
          ['Aira', item.airaEnabled ? <span className="bdg cmd" key="aira">Enabled</span> : <span className="bdg prm" key="aira">Off</span>],
          ['Events', String(ev.length)],
        ]} />
      </Section>
      <Section title="Snapshot">
        <div className="tl">
          <div className="tlit">
            <div className="tld"></div>
            <div className="tlt">
              <strong>{item.name}</strong> has <strong>{live}</strong> live events and <strong>{guestCount}</strong> guests across their portfolio.
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function HostContent({ item }: { item: any }) {
  const ev = DATA.events.filter((e: any) => e.hostId === item.id);
  return (
    <Section title="Core">
      <Grid items={[
        ['Host ID', item.id],
        ['Name', item.name],
        ['City', item.city],
        ['Created', fmtDay(asDate(item.createdAt))],
        ['Events', String(ev.length)],
      ]} />
    </Section>
  );
}

function GuestContent({ item }: { item: any }) {
  const e = IDX.event.get(item.eventId);
  return (
    <Section title="Core">
      <Grid items={[
        ['Guest ID', item.id],
        ['Event', e ? `${e.type} · ${e.id}` : '—'],
        ['Invited', fmtDay(asDate(item.invitedAt))],
        ['Opened', fmtDay(asDate(item.openedAt))],
        ['RSVP', fmtDay(asDate(item.rsvpAt))],
        ['Status', <span className="bdg cmd" key="st">{item.rsvpStatus}</span>],
      ]} />
    </Section>
  );
}

function VendorContent({ item }: { item: any }) {
  const e = IDX.event.get(item.eventId);
  return (
    <>
      <Section title="Contract">
        <Grid items={[
          ['Vendor ID', item.id],
          ['Category', item.category],
          ['Status', <span className="bdg cmd" key="st">{item.contractStatus}</span>],
          ['Value', fmtInr(item.valueInr)],
          ['Sent', fmtDay(asDate(item.sentAt))],
          ['Signed', fmtDay(asDate(item.signedAt))],
        ]} />
      </Section>
      <Section title="Event">
        <Grid items={[
          ['Event', e ? `${e.type} · ${e.id}` : '—'],
          ['Planner', e?.plannerId],
          ['Host', e?.hostId],
          ['Live', e?.goLiveAt ? fmtDay(asDate(e.goLiveAt)) : '—'],
        ]} />
      </Section>
    </>
  );
}

function AiraContent({ item }: { item: any }) {
  const e = IDX.event.get(item.eventId);
  return (
    <Section title="Conversation">
      <Grid items={[
        ['Conversation ID', item.id],
        ['Event', e ? `${e.type} · ${e.id}` : '—'],
        ['Created', fmtDay(asDate(item.createdAt))],
        ['Satisfaction', '★'.repeat(item.satisfaction)],
        ['Escalated', item.escalated ? <span className="bdg prm" key="esc">Yes</span> : <span className="bdg cmd" key="esc">No</span>],
      ]} />
    </Section>
  );
}

function MingleContent({ item }: { item: any }) {
  const g = DATA.guests.find((x: any) => x.id === item.guestId);
  return (
    <Section title="Profile">
      <Grid items={[
        ['Profile ID', item.id],
        ['Guest', g ? g.id : item.guestId],
        ['Intent', item.intent],
        ['City', item.city],
        ['Complete', item.complete ? <span className="bdg cmd" key="cmp">Yes</span> : <span className="bdg prm" key="cmp">No</span>],
        ['Created', fmtDay(asDate(item.createdAt))],
      ]} />
    </Section>
  );
}

function InvitationContent({ item }: { item: any }) {
  const e = IDX.event.get(item.eventId);
  return (
    <Section title="Invitation Video">
      <Grid items={[
        ['Video ID', item.id],
        ['Template', item.template],
        ['Event', e ? `${e.type} · ${e.id}` : '—'],
        ['Created', fmtDay(asDate(item.createdAt))],
        ['Sent', fmtDay(asDate(item.sentAt))],
        ['Delivery', item.deliveryOk == null ? '—' : (item.deliveryOk ? <span className="bdg cmd" key="ok">OK</span> : <span className="bdg prm" key="ok">Failed</span>)],
      ]} />
    </Section>
  );
}

function VivahContent({ item }: { item: any }) {
  const e = IDX.event.get(item.eventId);
  return (
    <Section title="Session">
      <Grid items={[
        ['Session ID', item.id],
        ['Event', e ? `${e.type} · ${e.id}` : '—'],
        ['Started', fmtDay(asDate(item.startedAt))],
        ['P1 Submitted', fmtDay(asDate(item.p1SubmittedAt))],
        ['P2 Submitted', fmtDay(asDate(item.p2SubmittedAt))],
        ['Family Share', item.synthesisSharedToFamily ? <span className="bdg cmd" key="sh">Yes</span> : <span className="bdg prm" key="sh">No</span>],
      ]} />
    </Section>
  );
}
