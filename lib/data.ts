export const TITLES: Record<string, string> = {
  overview: 'Platform Overview',
  events: 'Event Analytics',
  users: 'Platform Users',
  planners: 'Planner Analytics',
  hosts: 'Host Analytics',
  guests: 'Guest Analytics',
  vendors: 'Vendor Analytics',
  aira: 'Aira AI Analytics',
  mingle: 'Mingle Analytics',
  invitations: 'Invitation Analytics',
  vivah: 'Vivah · Couples Reflection',
  access: 'Command Team Access',
};

export const PERM = ['alicia.raisinghani@gmail.com', 'alicia@fancy.global'];

export const DEF_TARGETS = {
  northstar: 10,
  planners: 5,
  events: 10,
  guests: 500,
  retention: 45,
  ttr: 18,
  rsvp: 65,
  open: 75,
  completion: 75,
  aira: 70,
  mingle: 30,
  invites: 50,
  vivah: 10,
  vendorcontracts: 20,
  vendorsign: 75,
  delivery: 85,
};

// Using a fixed reference date to ensure hydration consistency between server and client
const now = new Date('2026-04-07T12:00:00Z');
const iso = (d: Date | number) => new Date(d).toISOString();
const daysAgo = (n: number) => iso(now.getTime() - n * 24 * 60 * 60 * 1000);

export const DATA = (() => {
  const planners = [
    { id: 'pl_001', name: 'Aanya Mehta', tier: 'Founding', createdAt: daysAgo(62), lastActiveAt: daysAgo(2), airaEnabled: true },
    { id: 'pl_002', name: 'Riya Kapoor', tier: 'Pro', createdAt: daysAgo(41), lastActiveAt: daysAgo(10), airaEnabled: false },
    { id: 'pl_003', name: 'Neel Shah', tier: 'Starter', createdAt: daysAgo(18), lastActiveAt: daysAgo(1), airaEnabled: true },
    { id: 'pl_004', name: 'Sara Iyer', tier: 'Pro', createdAt: daysAgo(9), lastActiveAt: daysAgo(0), airaEnabled: true },
    { id: 'pl_005', name: 'Kabir Malhotra', tier: 'Starter', createdAt: daysAgo(5), lastActiveAt: daysAgo(3), airaEnabled: false },
  ];

  const hosts = [
    { id: 'ho_001', name: 'Arjun & Diya', city: 'Mumbai', createdAt: daysAgo(55) },
    { id: 'ho_002', name: 'Kunal Singh', city: 'Delhi', createdAt: daysAgo(24) },
    { id: 'ho_003', name: 'Fatima & Zain', city: 'Bengaluru', createdAt: daysAgo(12) },
  ];

  const events = [
    { id: 'ev_001', plannerId: 'pl_001', hostId: 'ho_001', type: 'Wedding', status: 'Live', createdAt: daysAgo(54), goLiveAt: daysAgo(46) },
    { id: 'ev_002', plannerId: 'pl_001', hostId: 'ho_001', type: 'Engagement', status: 'Completed', createdAt: daysAgo(60), goLiveAt: daysAgo(58) },
    { id: 'ev_003', plannerId: 'pl_002', hostId: 'ho_002', type: 'Corporate', status: 'Draft', createdAt: daysAgo(20), goLiveAt: null },
    { id: 'ev_004', plannerId: 'pl_003', hostId: 'ho_003', type: 'Birthday', status: 'Live', createdAt: daysAgo(16), goLiveAt: daysAgo(13) },
    { id: 'ev_005', plannerId: 'pl_004', hostId: 'ho_002', type: 'Wedding', status: 'Live', createdAt: daysAgo(8), goLiveAt: daysAgo(6) },
    { id: 'ev_006', plannerId: 'pl_005', hostId: 'ho_003', type: 'Other', status: 'Draft', createdAt: daysAgo(4), goLiveAt: null },
  ];

  const guests = (() => {
    const out: any[] = [];
    const rsvpStatuses = ['Yes', 'No', 'Maybe', 'Pending'];
    let gid = 1;
    const add = (eventId: string, count: number, baseAge: number) => {
      for (let i = 0; i < count; i++) {
        // Deterministic "randomness" based on guest index and event ID
        const seed = (i * 13 + gid * 7) % 100;
        const invitedAt = daysAgo(baseAge + (seed % 8));
        const opened = (seed % 10 < 8) ? daysAgo(Math.max(0, baseAge - 1) + (seed % 6)) : null;
        const rsvp = (seed % 10 < 7) ? daysAgo(Math.max(0, baseAge - 2) + (seed % 5)) : null;
        const rsvpStatus = rsvp ? rsvpStatuses[seed % 3] : 'Pending';
        out.push({
          id: `gu_${String(gid++).padStart(3, '0')}`,
          eventId,
          name: `Guest ${gid}`,
          invitedAt,
          openedAt: opened,
          rsvpAt: rsvp,
          rsvpStatus,
          mingleOptIn: rsvpStatus === 'Yes' ? (seed % 10 > 6) : false
        });
      }
    };
    add('ev_001', 120, 42);
    add('ev_004', 60, 12);
    add('ev_005', 90, 6);
    add('ev_002', 35, 58);
    return out;
  })();

  const vendors = [
    { id: 'vd_001', eventId: 'ev_001', category: 'Photography', contractStatus: 'Signed', valueInr: 185000, sentAt: daysAgo(50), signedAt: daysAgo(47), deliveredAt: null, confirmedAt: null },
    { id: 'vd_002', eventId: 'ev_001', category: 'Catering', contractStatus: 'Delivered', valueInr: 540000, sentAt: daysAgo(49), signedAt: daysAgo(45), deliveredAt: daysAgo(3), confirmedAt: daysAgo(1) },
    { id: 'vd_003', eventId: 'ev_004', category: 'DJ', contractStatus: 'Sent', valueInr: 45000, sentAt: daysAgo(10), signedAt: null, deliveredAt: null, confirmedAt: null },
    { id: 'vd_004', eventId: 'ev_005', category: 'Décor', contractStatus: 'Signed', valueInr: 240000, sentAt: daysAgo(7), signedAt: daysAgo(6), deliveredAt: null, confirmedAt: null },
  ];

  const invitationVideos = [
    { id: 'iv_001', eventId: 'ev_001', template: 'Floral', createdAt: daysAgo(41), sentAt: daysAgo(40), deliveryOk: true },
    { id: 'iv_002', eventId: 'ev_005', template: 'Min', createdAt: daysAgo(5), sentAt: daysAgo(4), deliveryOk: true },
    { id: 'iv_003', eventId: 'ev_004', template: 'Raj', createdAt: daysAgo(11), sentAt: null, deliveryOk: null },
  ];

  const airaConversations = (() => {
    const out: any[] = [];
    let cid = 1;
    const add = (eventId: string, n: number, baseAge: number) => {
      for (let i = 0; i < n; i++) {
        const seed = (i * 17 + cid * 11) % 100;
        const createdAt = daysAgo(baseAge + (seed % 8));
        const satisfaction = (seed % 5) + 1;
        out.push({ id: `ac_${String(cid++).padStart(3, '0')}`, eventId, createdAt, satisfaction, escalated: seed % 10 > 8 });
      }
    };
    add('ev_001', 38, 38); add('ev_004', 12, 10); add('ev_005', 26, 5);
    return out;
  })();

  const mingleProfiles = [
    { id: 'mp_001', guestId: 'gu_010', intent: 'Friend', city: 'Mumbai', createdAt: daysAgo(39), complete: true },
    { id: 'mp_002', guestId: 'gu_021', intent: 'Networking', city: 'Delhi', createdAt: daysAgo(8), complete: false },
    { id: 'mp_003', guestId: 'gu_033', intent: 'LifePartner', city: 'Mumbai', createdAt: daysAgo(6), complete: true },
  ];

  const mingleIntros = [
    { id: 'mi_001', fromProfileId: 'mp_001', toProfileId: 'mp_003', createdAt: daysAgo(6), replied: true },
    { id: 'mi_002', fromProfileId: 'mp_003', toProfileId: 'mp_002', createdAt: daysAgo(5), replied: false },
  ];

  const vivahSessions = [
    { id: 'vs_001', eventId: 'ev_001', startedAt: daysAgo(21), p1SubmittedAt: daysAgo(20), p2SubmittedAt: daysAgo(19), revealViewedAt: daysAgo(18), synthesisSharedToFamily: true },
    { id: 'vs_002', eventId: 'ev_005', startedAt: daysAgo(4), p1SubmittedAt: daysAgo(3), p2SubmittedAt: null, revealViewedAt: null, synthesisSharedToFamily: false },
  ];

  return { planners, hosts, events, guests, vendors, invitationVideos, airaConversations, mingleProfiles, mingleIntros, vivahSessions, generatedAt: iso(now) };
})();

// Helpers from original script
export const asDate = (v: any) => v ? new Date(v) : null;
export const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
export const fmtInt = (n: number) => new Intl.NumberFormat().format(Math.round(n));
export const fmtPct = (n: number, dp = 0) => `${(Number.isFinite(n) ? n : 0).toFixed(dp)}%`;
export const fmtInr = (n: number) => `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(n || 0))}`;
export const fmtDay = (d: Date | null) => d ? new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(d) : '—';

export function rangeDays(r: string) {
  if (r === '7d') return 7;
  if (r === '28d') return 28;
  if (r === '90d') return 90;
  return 30;
}

export function inRange(isoStr: string | null, days: number) {
  const d = asDate(isoStr); if (!d) return false;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return d >= since;
}

export function ratio(num: number, den: number) {
  if (!den) return null;
  return (num / den) * 100;
}

export const IDX = {
  planner: new Map(DATA.planners.map(p => [p.id, p])),
  host: new Map(DATA.hosts.map(h => [h.id, h])),
  event: new Map(DATA.events.map(e => [e.id, e])),
};
