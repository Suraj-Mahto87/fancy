'use client';

import React, { useState } from 'react';

interface AccessPageProps {
  members: any[];
  addMember: (email: string) => void;
  removeMember: (email: string) => void;
}

const AccessPage: React.FC<AccessPageProps> = ({ members, addMember, removeMember }) => {
  const [email, setEmail] = useState('');
  return (
    <div className="pnl on">
      <div>
        <div className="sec-lbl">Command Team Access</div>
        <div className="al amb">
          <div className="al-dot amb"></div>
          <div className="al-txt">
            <strong>Command role:</strong> Members can view this dashboard, edit targets, and manage team access. Alicia Raisinghani is permanent and cannot be removed. After adding a new email below, ask Robin to set <code>role = 'command'</code> in the profiles table.
          </div>
        </div>
      </div>
      <div className="c2">
        <div>
          <div className="sec-lbl">Current Members</div>
          <div className="ac">
            <div id="member-list">
              {members.map((m: any) => (
                <div className="am" key={m.email}>
                  <div className="av">{m.email.split('@')[0].slice(0, 2).toUpperCase()}</div>
                  <div className="ai">
                    <div className="an">{m.email}</div>
                    <div className="ae">{m.p ? 'Permanent — cannot be removed' : 'Command member'}</div>
                  </div>
                  <span className={`bdg ${m.p ? 'prm' : 'cmd'}`}>{m.p ? 'Permanent' : 'Command'}</span>
                  <button className="arm" disabled={m.p} onClick={() => removeMember(m.email)}>
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
              <button className="add-b" onClick={() => { addMember(email); setEmail(''); }}>+ Add</button>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '10px', lineHeight: '1.65' }}>
              After adding, ask Robin to set <code>role = 'command'</code> in Supabase profiles for that email.
            </div>
          </div>
        </div>
        <div>
          <div className="sec-lbl">Access Policy</div>
          <div className="ac" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div><div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>Who can access /command</div><div style={{ fontSize: '14px', color: 'var(--ink2)', lineHeight: 1.7 }}>Profiles with <code>role = 'command'</code>. Checked server-side on every request.</div></div>
            <div style={{ height: '1px', background: 'var(--ash)' }}></div>
            <div><div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>Permanent accounts</div><div style={{ fontSize: '14px', color: 'var(--ink2)', lineHeight: 1.7 }}>alicia.raisinghani@gmail.com and alicia@fancy.global — hardcoded, require code change to remove.</div></div>
            <div style={{ height: '1px', background: 'var(--ash)' }}></div>
            <div><div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>Capabilities</div><div style={{ fontSize: '14px', color: 'var(--ink2)', lineHeight: 1.7 }}>View all dashboards · Edit targets · Manage team access · Cannot impersonate users · Cannot access Razorpay data directly</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessPage;
