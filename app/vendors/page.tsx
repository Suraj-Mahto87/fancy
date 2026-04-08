'use client';

import React, { useMemo } from 'react';
import MasterTable from '@/components/MasterTable';
import { DATA, fmtInr, ratio, IDX, asDate, fmtDay } from '@/lib/data';
import { useDashboard } from '@/lib/context';
import { MiniStats, MiniStat } from '@/components/DashboardUI';

export default function Vendors() {
  const { setDrawer, targets } = useDashboard();
  
  const rows = useMemo(() => {
    return DATA.vendors.map((v: any) => {
      const e = IDX.event.get(v.eventId);
      return {
        ...v,
        event: e ? e.id : '—',
        eventType: e ? e.type : '—',
      };
    });
  }, []);

  return (
    <div className="pnl on">
      <div>
        <div className="sec-lbl">Vendor KPIs</div>
        <MiniStats>
          <MiniStat label="Active Contracts" value={rows.length} delta="—" target={String(targets.vendorcontracts)} />
          <MiniStat label="OTP Sign Rate" value="—" delta="—" target={targets.vendorsign + '%'} />
          <MiniStat label="Avg Contract Value" value="—" sub="Median (INR)" />
          <MiniStat label="Payment Disputes" value={0} delta="—" />
          <MiniStat label="Delivery Confirmed" value="—" target="85%+" />
        </MiniStats>
      </div>

      <div className="c2 mb-25">
        <div className="cc">
          <div className="ch"><div><div className="ct">Contract Status</div><div className="cs">Draft → Sent → Signed → Delivered → Confirmed</div></div></div>
          <div className="emp"><div className="emp-i">▹</div><div className="emp-t">No contracts yet</div></div>
        </div>
        <div className="cc">
          <div className="ch"><div><div className="ct">Contracts by Category</div><div className="cs">vs last month</div></div></div>
          <div className="emp"><div className="emp-i">▹</div><div className="emp-t">No contracts yet</div><div className="emp-s">Photography, Catering, Décor, Makeup, DJ, Venue, Other</div></div>
        </div>
      </div>

      <div>
        <div className="sec-lbl">Master Records</div>
        <MasterTable
          id="vd"
          title="Vendor Contracts"
          rows={rows}
          onOpen={(item) => setDrawer({ open: true, item, type: 'vendors' })}
          columns={[
            { key: 'category', label: 'Category', sort: 'str' },
            { key: 'contractStatus', label: 'Status', render: (r: any) => <span className="bdg cmd">{r.contractStatus}</span> },
            { key: 'valueInr', label: 'Value', sort: 'num', render: (r: any) => fmtInr(r.valueInr) },
            { key: 'eventType', label: 'Event', sort: 'str' },
            { key: 'signedAt', label: 'Signed', sort: 'date', render: (r: any) => fmtDay(asDate(r.signedAt)) },
          ]}
          chips={[
            { key: 'contractStatus', value: 'Sent', label: 'Status: Sent' },
            { key: 'contractStatus', value: 'Signed', label: 'Status: Signed' },
            { key: 'contractStatus', value: 'Delivered', label: 'Status: Delivered' },
          ]}
        />
      </div>
    </div>
  );
}
