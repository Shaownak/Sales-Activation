import { useState } from 'react'
import { Upload, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { contracts } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { onNavigate: NavigateFn }

const PAGE_SIZE = 6

function StatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    Signed: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
    Drafted: 'bg-slate-100 text-slate-600',
    Expired: 'bg-red-50 text-red-700 ring-1 ring-red-600/20',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-500 ${cls[status] || ''}`}>
      {status}
    </span>
  )
}

export default function ContractsScreen({ onNavigate }: Props) {
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = contracts.filter((c) => statusFilter === 'All' || c.status === statusFilter)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Contracts</h1>
          <p className="text-sm text-slate-500 mt-0.5">{contracts.length} contracts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-500 rounded-lg transition-colors shadow-sm">
          <Upload size={16} />
          Upload Contract
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: 'Signed', count: contracts.filter((c) => c.status === 'Signed').length, color: 'text-green-600 bg-green-50' },
          { label: 'Drafted', count: contracts.filter((c) => c.status === 'Drafted').length, color: 'text-slate-600 bg-slate-100' },
          { label: 'Expired', count: contracts.filter((c) => c.status === 'Expired').length, color: 'text-red-600 bg-red-50' },
        ].map((s) => (
          <button
            key={s.label}
            onClick={() => { setStatusFilter(statusFilter === s.label ? 'All' : s.label); setPage(1) }}
            className={`bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-left hover:border-blue-200 transition-all ${statusFilter === s.label ? 'ring-2 ring-blue-500' : ''}`}
          >
            <div className={`text-2xl font-700 ${s.color.split(' ')[0]}`}>{s.count}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label} Contracts</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <Filter size={14} className="text-slate-400" />
          <span className="text-sm text-slate-500">Filter by status:</span>
          <div className="flex gap-1.5">
            {['All', 'Signed', 'Drafted', 'Expired'].map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1) }}
                className={`px-3 py-1 text-xs rounded-full font-500 transition-colors ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {['Contract Number', 'Account', 'Type', 'Status', 'Start Date', 'End Date', 'Value', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => onNavigate('contract-details', c.id)}
                >
                  <td className="px-4 py-3.5 text-sm font-500 text-blue-600">{c.id}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-800">{c.account}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-500 text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{c.type}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-500">{c.startDate}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-500">{c.endDate}</td>
                  <td className="px-4 py-3.5 text-sm font-600 text-slate-900">{c.value}</td>
                  <td className="px-4 py-3.5">
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-500">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            {filtered.length} contract{filtered.length !== 1 ? 's' : ''} found
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40"
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
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
