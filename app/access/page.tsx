'use client';

import React, { useState, useEffect } from 'react';
import { PERM } from '@/lib/data';
import { Alert } from '@/components/DashboardUI';

const ini = (email: string) => {
  const n = email.split('@')[0].replace(/[._-]/g, ' ');
  const p = n.trim().split(' ').filter(Boolean);
  return p.length === 1 ? p[0].slice(0, 2).toUpperCase() : (p[0][0] + p[p.length - 1][0]).toUpperCase();
};

export default function Access() {
  const [members, setMembers] = useState<{ email: string; p: boolean }[]>([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const sm = localStorage.getItem('fancy_cmd_mbrs');
    const ex = sm ? JSON.parse(sm) : [];
    setMembers([
      ...PERM.map((e) => ({ email: e, p: true })),
      ...ex.map((e: string) => ({ email: e, p: false })),
    ]);
  }, []);

  const addMember = () => {
    const e = email.trim().toLowerCase();
    if (!e || !e.includes('@')) return;
    if (members.find((m) => m.email === e)) return;
    const newList = [...members.filter((m: any) => !m.p).map((m: any) => m.email), e];
    localStorage.setItem('fancy_cmd_mbrs', JSON.stringify(newList));
    setMembers([...members, { email: e, p: false }]);
    setEmail('');
  };

  const rmv = (emailToRemove: string) => {
    const newList = members.filter((m: any) => !m.p && m.email !== emailToRemove).map((m: any) => m.email);
    localStorage.setItem('fancy_cmd_mbrs', JSON.stringify(newList));
    setMembers(members.filter((m) => m.email !== emailToRemove));
  };

  return (
    <div className="pnl on">
      <div>
        <div className="sec-lbl">Command Team Access</div>
        <Alert type="amb" text={<span><strong>Command role:</strong> Members can view this dashboard, edit targets, and manage team access. Alicia Raisinghani is permanent and cannot be removed. After adding a new email below, ask Robin to set <code style={{ background: 'rgba(0,0,0,.07)', padding: '1px 5px', borderRadius: '3px', fontSize: '12px' }}>role = 'command'</code> in the profiles table.</span>} />
      </div>

      <div className="c2">
        <div>
          <div className="sec-lbl">Current Members</div>
          <div className="ac">
            <div>
              {members.map((m) => (
                <div className="am" key={m.email}>
                  <div className="av">{ini(m.email)}</div>
                  <div className="ai">
                    <div className="an">{m.email}</div>
                    <div className="ae">{m.p ? 'Permanent — cannot be removed' : 'Command member'}</div>
                  </div>
                  <span className={`bdg ${m.p ? 'prm' : 'cmd'}`}>{m.p ? 'Permanent' : 'Command'}</span>
                  <button className="arm" disabled={m.p} onClick={() => rmv(m.email)}>
                    {m.p ? 'Protected' : 'Remove'}
                  </button>
                </div>
              ))}
            </div>
            <div className="add-form">
              <input
                className="add-in"
                type="email"
                placeholder="colleague@fancy.global"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="add-b" onClick={addMember}>+ Add</button>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '10px', lineHeight: '1.65' }}>
              After adding, ask Robin to set <code style={{ background: 'rgba(0,0,0,.06)', padding: '1px 5px', borderRadius: '3px' }}>role = 'command'</code> in Supabase profiles for that email.
            </div>
          </div>
        </div>

        <div>
          <div className="sec-lbl">Access Policy</div>
          <div className="ac" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>Who can access /command</div>
              <div style={{ fontSize: '14px', color: 'var(--ink2)', lineHeight: 1.7 }}>
                Profiles with <code style={{ background: 'rgba(0,0,0,.06)', padding: '2px 5px', borderRadius: '3px' }}>role = 'command'</code>. Checked server-side on every request.
              </div>
            </div>
            <div style={{ height: '1px', background: 'var(--ash)' }}></div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>Permanent accounts</div>
              <div style={{ fontSize: '14px', color: 'var(--ink2)', lineHeight: 1.7 }}>
                alicia.raisinghani@gmail.com and alicia@fancy.global — hardcoded, require code change to remove.
              </div>
            </div>
            <div style={{ height: '1px', background: 'var(--ash)' }}></div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>Capabilities</div>
              <div style={{ fontSize: '14px', color: 'var(--ink2)', lineHeight: 1.7 }}>
                View all dashboards · Edit targets · Manage team access · Cannot impersonate users · Cannot access Razorpay data directly
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
