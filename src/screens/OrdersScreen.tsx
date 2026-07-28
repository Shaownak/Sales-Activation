import { useState } from 'react'
import { Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { orders } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { onNavigate: NavigateFn }

const PAGE_SIZE = 6

function StatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    Completed: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
    'In Progress': 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
    Pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-500 ${cls[status] || ''}`}>
      {status}
    </span>
  )
}

export default function OrdersScreen({ onNavigate }: Props) {
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = orders.filter((o) => statusFilter === 'All' || o.status === statusFilter)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Orders</h1>
          <p className="text-sm text-slate-500 mt-0.5">{orders.length} total orders</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-500 rounded-lg transition-colors shadow-sm">
          <Plus size={16} />
          Create Order
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: 'Pending', count: orders.filter((o) => o.status === 'Pending').length, color: 'text-amber-600' },
          { label: 'In Progress', count: orders.filter((o) => o.status === 'In Progress').length, color: 'text-blue-600' },
          { label: 'Completed', count: orders.filter((o) => o.status === 'Completed').length, color: 'text-green-600' },
        ].map((s) => (
          <button
            key={s.label}
            onClick={() => { setStatusFilter(statusFilter === s.label ? 'All' : s.label); setPage(1) }}
            className={`bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-left hover:border-blue-200 transition-all ${statusFilter === s.label ? 'ring-2 ring-blue-500' : ''}`}
          >
            <div className={`text-2xl font-700 ${s.color}`}>{s.count}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <Filter size={14} className="text-slate-400" />
          <div className="flex gap-1.5">
            {['All', 'Pending', 'In Progress', 'Completed'].map((s) => (
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
                {['Order Number', 'Account', 'Provider', 'Status', 'Delivery', 'Total', 'Created At', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => onNavigate('order-details', order.id)}
                >
                  <td className="px-4 py-3.5 text-sm font-500 text-blue-600">{order.id}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-800">{order.account}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{order.provider}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={order.status} /></td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{order.delivery}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-600 text-slate-900">{order.total}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-500">{order.createdAt}</td>
                  <td className="px-4 py-3.5">
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-500">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">{filtered.length} order{filtered.length !== 1 ? 's' : ''}</p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40">
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`w-7 h-7 text-xs rounded-lg ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{i + 1}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
