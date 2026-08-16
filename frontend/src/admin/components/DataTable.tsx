import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchKey?: keyof T;
  actions?: React.ReactNode;
  emptyMessage?: string;
}

function DataTable<T extends { id?: string | number; _id?: string | number }>({
  columns,
  data,
  searchPlaceholder = 'Search records...',
  searchKey,
  actions,
  emptyMessage = 'No records found.',
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');

  const filteredData = data.filter((item) => {
    if (!query) return true;
    if (searchKey) {
      const val = item[searchKey];
      return String(val || '').toLowerCase().includes(query.toLowerCase());
    }
    return JSON.stringify(item).toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="space-y-4 font-sans">
      {/* Search & Actions Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-600 transition"
          />
        </div>

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Table Surface */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                {columns.map((col, idx) => (
                  <th key={idx} className={`py-3.5 px-4 ${idx === 0 ? 'sm:px-6' : ''} ${col.className || ''}`}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((row, rowIdx) => (
                  <tr key={row.id || row._id || rowIdx} className="hover:bg-slate-50/80 transition">
                    {columns.map((col, colIdx) => (
                      <td key={colIdx} className={`py-4 px-4 ${colIdx === 0 ? 'sm:px-6' : ''} ${col.className || ''}`}>
                        {col.render
                          ? col.render(row)
                          : col.accessor
                          ? String(row[col.accessor] ?? '')
                          : null}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center py-12 text-slate-400">
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
