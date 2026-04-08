'use client';

import React, { useState } from 'react';

interface TargetFieldProps {
  label: string;
  value: number;
  sub?: string;
  unit: string;
  onChange: (v: string) => void;
}

const TargetField: React.FC<TargetFieldProps> = ({ label, value, sub, unit, onChange }) => (
  <div className="mf">
    <div className="mfl">{label}</div>
    {sub && <div className="mfh">{sub}</div>}
    <div className="mir">
      <input className="mi" type="number" value={value} onChange={(e) => onChange(e.target.value)} />
      <span className="mu">{unit}</span>
    </div>
  </div>
);

const TargetSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mg">
    <div className="mgt">{title}</div>
    {children}
  </div>
);

interface TargetsModalProps {
  targets: any;
  onSave: (t: any) => void;
  onClose: () => void;
}

const TargetsModal: React.FC<TargetsModalProps> = ({ targets, onSave, onClose }) => {
  const [local, setLocal] = useState(targets);
  const update = (k: string, v: string) => setLocal({ ...local, [k]: parseFloat(v) || 0 });

  return (
    <div className="mo on" style={{ display: 'flex' }} onClick={onClose}>
      <div className="mp" onClick={(e) => e.stopPropagation()}>
        <div className="mh">
          <div><div className="mt">Edit Benchmark Targets</div><div className="ms2">Saved locally in your browser (localStorage).</div></div>
          <button className="mc" onClick={onClose}>×</button>
        </div>
        <div className="mb">
          <TargetSection title="Platform — Monthly">
            <TargetField label="North Star: Events with ≥1 RSVP" value={local.northstar} sub="The core value moment. Start conservative, raise as you grow." unit="events / month" onChange={(v) => update('northstar', v)} />
            <TargetField label="Active Planners" value={local.planners} unit="planners" onChange={(v) => update('planners', v)} />
            <TargetField label="Events Live" value={local.events} unit="events" onChange={(v) => update('events', v)} />
            <TargetField label="Guests Reached" value={local.guests} unit="guests" onChange={(v) => update('guests', v)} />
          </TargetSection>
          
          <TargetSection title="Planner Health">
            <TargetField label="D7 Planner Retention" value={local.retention} sub="B2B floor: 40%. Our target: 45%." unit="%" onChange={(v) => update('retention', v)} />
            <TargetField label="Time to First RSVP" value={local.ttr} unit="hours (median)" onChange={(v) => update('ttr', v)} />
          </TargetSection>

          <TargetSection title="Guest Experience">
            <TargetField label="RSVP Rate" value={local.rsvp} sub="Floor: 40%. Healthy: 65%+." unit="%" onChange={(v) => update('rsvp', v)} />
            <TargetField label="Page Open Rate" value={local.open} unit="%" onChange={(v) => update('open', v)} />
            <TargetField label="Host Event Completion Score" value={local.completion} unit="%" onChange={(v) => update('completion', v)} />
          </TargetSection>

          <TargetSection title="Features">
            <TargetField label="Aira Adoption Rate" value={local.aira} unit="%" onChange={(v) => update('aira', v)} />
            <TargetField label="Mingle Opt-In Rate" value={local.mingle} unit="%" onChange={(v) => update('mingle', v)} />
            <TargetField label="Invitation Videos Sent" value={local.invite} unit="videos / month" onChange={(v) => update('invites', v)} />
            <TargetField label="Vivah Sessions Started" value={local.vivah} sub="Wedding-only. Sessions where at least one partner submits." unit="sessions / month" onChange={(v) => update('vivah', v)} />
          </TargetSection>

          <TargetSection title="Vendors">
            <TargetField label="Active Contracts" value={local.vendorcontracts} unit="contracts" onChange={(v) => update('vendorcontracts', v)} />
            <TargetField label="Vendor OTP Sign Rate" value={local.vendorsign} unit="%" onChange={(v) => update('vendorsign', v)} />
          </TargetSection>
        </div>
        <div className="mfoot">
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Saved to localStorage</span>
          <div style={{ display: 'flex', gap: '9px' }}>
            <button className="bc" onClick={onClose}>Cancel</button>
            <button className="bs" onClick={() => onSave(local)}>Save Targets</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetsModal;
