'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { TITLES } from '@/lib/data';
import { useDashboard } from '@/lib/context';
import TargetsModal from './TargetsModal';
import { logout } from '@/lib/actions';

const RangeBtn: React.FC<{ r: string; label: string; active: string; onClick: (r: string) => void }> = ({ r, label, active, onClick }) => (
  <button className={`tg-btn ${active === r ? 'on' : ''}`} onClick={() => onClick(r)}>{label}</button>
);

const TopBarWrapper: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { setShowTargets, showTargets, targets, setTargets, setSidebarOpen } = useDashboard();
  const [timer, setTimer] = React.useState('just now');
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  const handleLogout = async () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    await logout();
  };

  React.useEffect(() => {
    const start = Date.now();
    const iv = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 60000);
      if (elapsed > 0) setTimer(`${elapsed} min ago`);
    }, 10000);
    return () => clearInterval(iv);
  }, []);

  const activeTab = pathname?.split('/')[1] || 'overview';
  const range = searchParams?.get('range') || '30d';
  const compare = (searchParams?.get('compare') || 'month') as 'month' | 'year';

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <div className="mob-top">
        <div className="mob-logo">FANCY</div>
        <div className="mob-r">
          <button className="mob-tgt" onClick={() => setShowTargets(true)}>⊙ Targets</button>
          <button className="mob-tgt" onClick={handleLogout} style={{ border: 'none', color: 'var(--rose)', marginLeft: '4px' }}>⏻</button>
          <button className="hbg" onClick={() => setSidebarOpen(true)}><span></span><span></span><span></span></button>
        </div>
      </div>

      <div className="mob-ctrl">
        <div className="tg">
          <RangeBtn r="7d" label="7D" active={range} onClick={(v) => updateParam('range', v)} />
          <RangeBtn r="28d" label="28D" active={range} onClick={(v) => updateParam('range', v)} />
          <RangeBtn r="30d" label="Mo" active={range} onClick={(v) => updateParam('range', v)} />
          <RangeBtn r="90d" label="90D" active={range} onClick={(v) => updateParam('range', v)} />
        </div>
        <div className="cg">
          <button className={`cg-btn ${compare === 'month' ? 'on' : ''}`} onClick={() => updateParam('compare', 'month')}>Last Mo</button>
          <button className={`cg-btn ${compare === 'year' ? 'on' : ''}`} onClick={() => updateParam('compare', 'year')}>Last Yr</button>
        </div>
      </div>

      <div className="topbar">
        <div className="tb-left">
          <span className="tb-title">{TITLES[activeTab]}</span>
          <span className="tb-badge">Pre-launch</span>
        </div>
        <div className="tb-right">
          <div className="tg">
            <RangeBtn r="7d" label="7D" active={range} onClick={(v) => updateParam('range', v)} />
            <RangeBtn r="28d" label="28D" active={range} onClick={(v) => updateParam('range', v)} />
            <RangeBtn r="30d" label="Monthly" active={range} onClick={(v) => updateParam('range', v)} />
            <RangeBtn r="90d" label="90D" active={range} onClick={(v) => updateParam('range', v)} />
          </div>
          <span className="comp-lbl">Compare:</span>
          <div className="cg">
            <button className={`cg-btn ${compare === 'month' ? 'on' : ''}`} onClick={() => updateParam('compare', 'month')}>Last Month</button>
            <button className={`cg-btn ${compare === 'year' ? 'on' : ''}`} onClick={() => updateParam('compare', 'year')}>Last Year</button>
          </div>
          <button className="tgt-btn" onClick={() => setShowTargets(true)}>⊙ Edit Targets</button>
          <span className="ref-t">Live · {timer}</span>
          <button 
            className="tgt-btn" 
            onClick={handleLogout} 
            style={{ 
              border: 'none', 
              color: 'var(--rose)', 
              background: 'rgba(139, 46, 36, 0.05)',
              marginLeft: '8px'
            }}
          >
            ⏻ Logout
          </button>
        </div>
      </div>

      {showTargets && (
        <TargetsModal 
          targets={targets} 
          onSave={setTargets} 
          onClose={() => setShowTargets(false)} 
        />
      )}

      {showLogoutConfirm && (
        <div className="mo on" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }} onClick={() => setShowLogoutConfirm(false)}>
          <div className="mp" style={{ maxWidth: '360px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Logout Confirmation</h2>
              <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '32px' }}>Are you sure you want to logout of your session?</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button 
                  className="tgt-btn" 
                  onClick={() => setShowLogoutConfirm(false)}
                  style={{ background: 'var(--smoke)', color: 'var(--ink)' }}
                >
                  Cancel
                </button>
                <button 
                  className="tgt-btn" 
                  onClick={confirmLogout}
                  style={{ background: 'var(--rose)', color: '#fff', border: 'none' }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBarWrapper;
