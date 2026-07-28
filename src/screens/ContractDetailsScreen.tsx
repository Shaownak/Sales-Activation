import { ArrowLeft, Download, CheckCircle, XCircle, FileText } from 'lucide-react'
import { contracts } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { id: string | null; onNavigate: NavigateFn }

const lineItems = [
  { product: 'Enterprise Platform License', qty: 1, unitPrice: '$84,000', total: '$84,000' },
  { product: 'Premium Support Package', qty: 1, unitPrice: '$18,000', total: '$18,000' },
  { product: 'Custom Integrations (5 endpoints)', qty: 5, unitPrice: '$3,200', total: '$16,000' },
  { product: 'Onboarding & Training (days)', qty: 4, unitPrice: '$1,500', total: '$6,000' },
]

function StatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    Signed: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
    Drafted: 'bg-slate-100 text-slate-600',
    Expired: 'bg-red-50 text-red-700 ring-1 ring-red-600/20',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-500 ${cls[status] || ''}`}>
      {status}
    </span>
  )
}

export default function ContractDetailsScreen({ id, onNavigate }: Props) {
  const contract = contracts.find((c) => c.id === id) || contracts[0]

  return (
    <div className="p-4 md:p-6">
      <button
        onClick={() => onNavigate('contracts')}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5"
      >
        <ArrowLeft size={15} /> Back to Contracts
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-700 text-slate-900">{contract.id}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-slate-500">{contract.account}</span>
            <StatusBadge status={contract.status} />
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50">
          <Download size={14} />
          Download PDF
        </button>
      </div>

      <div className="max-w-4xl space-y-4">
        {/* File preview area */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <FileText size={16} className="text-red-500" />
              {contract.id}_agreement.pdf
            </div>
            <span className="text-xs text-slate-400">2.4 MB</span>
          </div>
          <div className="flex items-center justify-center h-48 bg-gradient-to-b from-slate-50 to-white">
            <div className="text-center">
              <FileText size={40} className="text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-400">PDF preview</p>
              <button className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-500">Open in viewer</button>
            </div>
          </div>
        </div>

        {/* Contract metadata */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-600 text-slate-900 mb-4">Contract Details</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Account', value: contract.account },
              { label: 'Contract Type', value: contract.type },
              { label: 'Start Date', value: contract.startDate },
              { label: 'End Date', value: contract.endDate },
              { label: 'Total Value', value: contract.value },
              { label: 'Status', value: <StatusBadge status={contract.status} /> },
              { label: 'Created', value: '2024-01-10' },
              { label: 'Last Modified', value: '2024-04-08' },
            ].map((f) => (
              <div key={f.label}>
                <div className="text-xs text-slate-400 mb-0.5">{f.label}</div>
                <div className="text-sm font-500 text-slate-800">{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Line items */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-600 text-slate-900">Contract Line Items</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Product / Service', 'Qty', 'Unit Price', 'Total'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, i) => (
                  <tr key={i} className="border-b border-slate-50">
                    <td className="px-5 py-3.5 text-sm text-slate-800">{item.product}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{item.qty}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{item.unitPrice}</td>
                    <td className="px-5 py-3.5 text-sm font-500 text-slate-900">{item.total}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50">
                  <td colSpan={3} className="px-5 py-3.5 text-sm font-600 text-slate-900 text-right">Total</td>
                  <td className="px-5 py-3.5 text-sm font-700 text-blue-600">{contract.value}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 text-sm text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 rounded-lg font-500 transition-colors">
            <XCircle size={15} />
            Reject
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg font-500 transition-colors shadow-sm">
            <CheckCircle size={15} />
            Approve & Sign
          </button>
        </div>
      </div>
    </div>
  )
}
