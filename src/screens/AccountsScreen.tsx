import { useState } from 'react'
import { Search, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { accounts } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { onNavigate: NavigateFn }

const PAGE_SIZE = 6

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === 'Active'
      ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
      : 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-500 ${cls}`}>
      {status}
    </span>
  )
}

export default function AccountsScreen({ onNavigate }: Props) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = accounts.filter((a) => {
    const q = search.toLowerCase()
    const matchSearch = a.name.toLowerCase().includes(q) || a.contact.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'All' || a.status === statusFilter
    const matchType = typeFilter === 'All' || a.type === typeFilter
    return matchSearch && matchStatus && matchType
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Customer Accounts</h1>
          <p className="text-sm text-slate-500 mt-0.5">{accounts.length} total accounts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-500 rounded-lg transition-colors shadow-sm">
          <Plus size={16} />
          Add Account
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 p-4 border-b border-slate-100 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search accounts or contacts…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
            >
              {['All', 'Active', 'Pending'].map((s) => <option key={s}>{s}</option>)}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setPage(1) }}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
            >
              {['All', 'Enterprise', 'Mid-Market', 'SMB'].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {['Account Name', 'Type', 'Primary Contact', 'Status', 'ARR', 'Created At', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((acc) => (
                <tr
                  key={acc.id}
                  className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => onNavigate('account-details', acc.id)}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-700 flex-shrink-0">
                        {acc.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-500 text-slate-900">{acc.name}</div>
                        <div className="text-xs text-slate-400">{acc.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-500 text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{acc.type}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-sm text-slate-700">{acc.contact}</div>
                    <div className="text-xs text-slate-400">{acc.email}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={acc.status} />
                  </td>
                  <td className="px-4 py-3.5 text-sm font-500 text-slate-900">{acc.arr}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-500">{acc.createdAt}</td>
                  <td className="px-4 py-3.5">
                    <button
                      className="text-xs text-blue-600 hover:text-blue-700 font-500"
                      onClick={(e) => { e.stopPropagation(); onNavigate('account-details', acc.id) }}
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-400">
                    No accounts match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Showing {Math.min((currentPage - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-7 h-7 text-xs rounded-lg ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
