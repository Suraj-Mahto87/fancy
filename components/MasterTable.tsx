'use client';

import React, { useState, useMemo } from 'react';
import { fmtInt, asDate, clamp } from '@/lib/data';

interface Column {
  key: string;
  label: string;
  sort?: 'num' | 'date' | 'str';
  render?: (row: any) => React.ReactNode;
}

interface MasterTableProps {
  id: string;
  title: string;
  rows: any[];
  columns: Column[];
  chips?: { key: string; value: any; label: string }[];
  onOpen?: (row: any) => void;
}

export default function MasterTable({
  id,
  title,
  rows,
  columns,
  chips = [],
  onOpen,
}: MasterTableProps) {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState({ k: columns[0]?.key || '', dir: 'asc' });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const filtered = useMemo(() => {
    let res = rows;

    // Chip filters
    Object.entries(filters).forEach(([k, v]) => {
      res = res.filter((r: any) => String(r[k]) === String(v));
    });

    // Search
    const query = q.trim().toLowerCase();
    if (query) {
      res = res.filter((r: any) =>
        columns.some((c: Column) => {
          const v = r[c.key];
          return v != null && String(v).toLowerCase().includes(query);
        })
      );
    }

    // Sort
    const col = columns.find((c: Column) => c.key === sort.k) || columns[0];
    const dir = sort.dir === 'desc' ? -1 : 1;

    res = [...res].sort((a: any, b: any) => {
      const va = getVal(a, col);
      const vb = getVal(b, col);
      if (va === vb) return 0;
      return va > vb ? dir : -dir;
    });

    return res;
  }, [rows, q, sort, filters, columns]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = clamp(page, 1, pages);
  const start = (currentPage - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  const toggleChip = (key: string, value: any) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (next[key] === value) delete next[key];
      else next[key] = value;
      return next;
    });
    setPage(1);
  };

  const handleSort = (k: string) => {
    setSort((prev) => ({
      k,
      dir: prev.k === k && prev.dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="mr">
      <div className="mrh">
        <div>
          <div className="mrttl">{title}</div>
          <div className="mrmeta">{fmtInt(total)} records</div>
        </div>
        <div className="mrctl">
          <input
            className="mri"
            placeholder="Search…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />
          <button
            className="mrc"
            onClick={() => {
              setQ('');
              setFilters({});
              setPage(1);
            }}
          >
            Reset
          </button>
          <div className="mrp">
            <button onClick={() => setPage(page - 1)} disabled={currentPage <= 1}>
              Prev
            </button>
            <span className="mrmeta">
              {currentPage} / {pages}
            </span>
            <button onClick={() => setPage(page + 1)} disabled={currentPage >= pages}>
              Next
            </button>
          </div>
        </div>
        {chips.length > 0 && (
          <div className="mrchips" style={{ width: '100%', marginTop: '10px' }}>
            {chips.map((ch, i) => {
              const on = filters[ch.key] === ch.value;
              return (
                <button
                  key={i}
                  className={`chip ${on ? 'on' : ''}`}
                  onClick={() => toggleChip(ch.key, ch.value)}
                >
                  {ch.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className="mrwrap">
        <table className="mrtbl">
          <thead>
            <tr>
              {columns.map((c) => {
                const on = c.key === sort.k;
                const arrow = on ? (sort.dir === 'asc' ? '▲' : '▼') : '↕';
                return (
                  <th key={c.key} onClick={() => handleSort(c.key)}>
                    {c.label}
                    <span className="srt">{arrow}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {pageRows.length > 0 ? (
              pageRows.map((r, i) => (
                <tr key={r.id || i} onClick={() => onOpen?.(r)}>
                  {columns.map((c) => (
                    <td key={c.key}>{c.render ? c.render(r) : r[c.key] ?? '—'}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ padding: '18px', color: 'var(--muted)' }}
                >
                  No matching records.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getVal(r: any, col: Column) {
  const v = r[col.key];
  if (col.sort === 'num') return Number(v || 0);
  if (col.sort === 'date') {
    const d = asDate(v);
    return d ? d.getTime() : 0;
  }
  return String(v ?? '').toLowerCase();
}
