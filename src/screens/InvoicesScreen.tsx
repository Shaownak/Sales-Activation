import { useState } from 'react'
import { Plus, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import { invoices } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { onNavigate: NavigateFn }

const PAGE_SIZE = 6

function StatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    Paid: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
    Issued: 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
    Overdue: 'bg-red-50 text-red-700 ring-1 ring-red-600/20',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-500 ${cls[status] || ''}`}>
      {status}
    </span>
  )
}

export default function InvoicesScreen({ onNavigate }: Props) {
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = invoices.filter((i) => statusFilter === 'All' || i.status === statusFilter)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const totalOutstanding = invoices
    .filter((i) => i.status !== 'Paid')
    .reduce((sum, i) => sum + parseFloat(i.total.replace(/[$,]/g, '')), 0)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Invoice Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">{invoices.length} invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg transition-colors">
            <Download size={14} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-500 rounded-lg transition-colors shadow-sm">
            <Plus size={16} />
            Generate Invoice
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: 'Paid', count: invoices.filter((i) => i.status === 'Paid').length, color: 'text-green-600', amount: '$86,050' },
          { label: 'Issued', count: invoices.filter((i) => i.status === 'Issued').length, color: 'text-blue-600', amount: '$46,600' },
          { label: 'Overdue', count: invoices.filter((i) => i.status === 'Overdue').length, color: 'text-red-600', amount: '$16,500' },
        ].map((s) => (
          <button
            key={s.label}
            onClick={() => { setStatusFilter(statusFilter === s.label ? 'All' : s.label); setPage(1) }}
            className={`bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-left hover:border-blue-200 transition-all ${statusFilter === s.label ? 'ring-2 ring-blue-500' : ''}`}
          >
            <div className={`text-2xl font-700 ${s.color}`}>{s.count}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label} Invoices</div>
            <div className="text-sm font-600 text-slate-700 mt-1">{s.amount}</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <Filter size={14} className="text-slate-400" />
          <div className="flex gap-1.5">
            {['All', 'Issued', 'Paid', 'Overdue'].map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1) }}
                className={`px-3 py-1 text-xs rounded-full font-500 transition-colors ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="ml-auto text-xs text-slate-500">
            Outstanding: <span className="font-600 text-slate-800">${totalOutstanding.toLocaleString()}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {['Invoice #', 'Account', 'Issue Date', 'Due Date', 'Total', 'Status', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => onNavigate('invoice-details', inv.id)}
                >
                  <td className="px-4 py-3.5 text-sm font-500 text-blue-600">{inv.id}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-800">{inv.account}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-500">{inv.issueDate}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-sm ${inv.status === 'Overdue' ? 'text-red-600 font-500' : 'text-slate-500'}`}>
                      {inv.dueDate}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-600 text-slate-900">{inv.total}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={inv.status} /></td>
                  <td className="px-4 py-3.5">
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-500">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">{filtered.length} invoice{filtered.length !== 1 ? 's' : ''}</p>
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
