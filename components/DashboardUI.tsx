'use client';

import React from 'react';
import { ratio, fmtInt } from '@/lib/data';

// Standard high-density KPI card (as seen in Overview, Vivah, etc.)
export const KpiGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="kg mb-25">{children}</div>
);

export const KpiCard: React.FC<{ 
  label: string; 
  value: any; 
  compareText?: string; 
  target: any; 
  progress?: number|null; 
  targetVal?: number; 
  sub?: string;
  accent?: string;
}> = ({ label, value, compareText = 'last month', target, progress, targetVal, sub, accent = 'var(--ch)' }) => {
  const isZero = value === 0 || value === '0' || value === '—';
  const progPct = progress !== undefined ? ratio(progress || 0, targetVal || 1) : (typeof value === 'number' && typeof target === 'number' ? ratio(value, target) : 0);
  
  return (
    <div className="kc">
      <div className="ka" style={{ background: accent }}></div>
      <div className="kl">{label}</div>
      <div className={`kv ${isZero ? 'z' : ''}`}>{typeof value === 'number' ? fmtInt(value) : value}</div>
      <div className="kdr"><span className="dl m">—</span><span className="kcl">vs {compareText}</span></div>
      <div className="ktr"><span className="ktl">Target</span><span className="ktv">{target}</span></div>
      <div className="kbw"><div className="kb" style={{ width: (progPct || 0) + '%' }}></div></div>
      <div className="kp">{sub || (progress !== undefined ? 'No data yet' : `${value || 0} of ${target}`)}</div>
    </div>
  );
};

// MiniStat component for the row of smaller blocks (Planners, Hosts, etc.)
export const MiniStats: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="ms mb-25">{children}</div>
);

export const MiniStat: React.FC<{ label: string; value: any; sub?: string; delta?: string; target?: string }> = ({ label, value, sub, delta, target }) => (
  <div className="ms-c">
    <div className="msl">{label}</div>
    <div className={`msv ${value === '—' || value === 0 ? 'z' : ''}`}>{value}</div>
    {delta && <div className="msd m">{delta} vs last month</div>}
    {sub && <div className="msb">{sub}</div>}
    {target && <div className="mst">Target: {target}</div>}
  </div>
);

// InsightPanel for the dark context boxes
export const InsightPanel: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="ins mb-25">
    <div className="ins-ey">{title}</div>
    {children}
  </div>
);

export const InsightItem: React.FC<{ icon: string; text: React.ReactNode }> = ({ icon, text }) => (
  <div className="ins-it">
    <div className="ins-n">{icon}</div>
    <div className="ins-t">{text}</div>
  </div>
);

// Alert component (for information boxes)
export const Alert: React.FC<{ type: 'info' | 'amb'; text: React.ReactNode }> = ({ type, text }) => (
  <div className={`al ${type} mb-25`}>
    <div className={`al-dot ${type === 'info' ? 'blue' : 'amb'}`}></div>
    <div className="al-txt">{text}</div>
  </div>
);
