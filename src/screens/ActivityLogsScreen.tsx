import { useState } from 'react'
import { Download, Filter } from 'lucide-react'
import { activities } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { onNavigate: NavigateFn }

const entityColors: Record<string, string> = {
  Account: 'bg-blue-50 text-blue-700',
  Contract: 'bg-purple-50 text-purple-700',
  Order: 'bg-amber-50 text-amber-700',
  Invoice: 'bg-green-50 text-green-700',
}

const actionColors: Record<string, string> = {
  Created: 'text-blue-600',
  Updated: 'text-amber-600',
  Approved: 'text-green-600',
  Completed: 'text-green-600',
  Generated: 'text-purple-600',
  Recorded: 'text-emerald-600',
  Added: 'text-blue-600',
  Scheduled: 'text-indigo-600',
}

export default function ActivityLogsScreen({ onNavigate }: Props) {
  const [entityFilter, setEntityFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = activities.filter((a) => {
    const matchEntity = entityFilter === 'All' || a.entityType === entityFilter
    const matchSearch = a.description.toLowerCase().includes(search.toLowerCase()) ||
      a.user.toLowerCase().includes(search.toLowerCase())
    return matchEntity && matchSearch
  })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Activity Logs</h1>
          <p className="text-sm text-slate-500 mt-0.5">{activities.length} events recorded</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-500 rounded-lg transition-colors shadow-sm">
          <Download size={14} />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Filters */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-100 flex-wrap">
          <Filter size={14} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search logs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-48 px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Entity:</span>
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
            >
              {['All', 'Account', 'Contract', 'Order', 'Invoice'].map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Date:</span>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
            >
              {[
                { value: 'all', label: 'All time' },
                { value: 'today', label: 'Today' },
                { value: 'week', label: 'This week' },
                { value: 'month', label: 'This month' },
              ].map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {['Timestamp', 'User', 'Action', 'Entity', 'Description'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr key={log.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-mono text-slate-500">{log.timestamp}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-[9px] font-700">
                        {log.user.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="text-sm text-slate-700">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm font-500 ${actionColors[log.action] || 'text-slate-600'}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-500 ${entityColors[log.entityType] || 'bg-slate-100 text-slate-600'}`}>
                      {log.entity}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-600 max-w-sm">
                    {log.description}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-slate-400">
                    No activity logs match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">{filtered.length} events</p>
          <button
            onClick={() => setEntityFilter('All')}
            className="text-xs text-blue-600 hover:text-blue-700 font-500"
          >
            Clear filters
          </button>
        </div>
      </div>
    </div>
  )
}
