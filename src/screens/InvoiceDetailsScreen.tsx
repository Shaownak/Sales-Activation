import { ArrowLeft, ExternalLink, CreditCard, Building2 } from 'lucide-react'
import { invoices } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { id: string | null; onNavigate: NavigateFn }

const invoiceItems = [
  { description: 'Enterprise Platform License – Q2 2024', qty: 1, unit: '$18,000', amount: '$18,000' },
  { description: 'Professional Services', qty: 8, unit: '$600', amount: '$4,800' },
  { description: 'Premium Support (Monthly)', qty: 1, unit: '$1,200', amount: '$1,200' },
  { description: 'Training & Onboarding', qty: 2, unit: '$250', amount: '$500' },
]

const paymentHistory = [
  { date: '2024-02-22', method: 'Wire Transfer', amount: '$18,750', ref: 'TXN-8841-2024', status: 'Cleared' },
  { date: '2024-01-22', method: 'Wire Transfer', amount: '$18,750', ref: 'TXN-7723-2024', status: 'Cleared' },
]

function StatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    Paid: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
    Issued: 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
    Overdue: 'bg-red-50 text-red-700 ring-1 ring-red-600/20',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-500 ${cls[status] || ''}`}>
      {status}
    </span>
  )
}

export default function InvoiceDetailsScreen({ id, onNavigate }: Props) {
  const invoice = invoices.find((i) => i.id === id) || invoices[0]

  return (
    <div className="p-4 md:p-6">
      <button
        onClick={() => onNavigate('invoices')}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5"
      >
        <ArrowLeft size={15} /> Back to Invoices
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-700 text-slate-900">{invoice.id}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-slate-500">{invoice.account}</span>
            <StatusBadge status={invoice.status} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-lg font-500 transition-colors"
          >
            <ExternalLink size={14} />
            View in Zoho
          </a>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-500 transition-colors shadow-sm">
            <CreditCard size={14} />
            Record Payment
          </button>
        </div>
      </div>

      <div className="max-w-4xl space-y-4">
        {/* Account + metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Building2 size={15} className="text-slate-400" />
              <h2 className="text-sm font-600 text-slate-900">Bill To</h2>
            </div>
            <div className="text-sm font-600 text-slate-900">{invoice.account}</div>
            <div className="text-xs text-slate-400 mt-0.5">Enterprise Client</div>
            <div className="text-xs text-slate-500 mt-2">billing@account.com</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-600 text-slate-900 mb-3">Invoice Details</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Invoice #', value: invoice.id },
                { label: 'Status', value: <StatusBadge status={invoice.status} /> },
                { label: 'Issue Date', value: invoice.issueDate },
                { label: 'Due Date', value: invoice.dueDate },
              ].map((f) => (
                <div key={f.label}>
                  <div className="text-xs text-slate-400">{f.label}</div>
                  <div className="text-sm font-500 text-slate-800 mt-0.5">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-600 text-slate-900">Invoice Items</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Description', 'Qty', 'Unit Price', 'Amount'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item, i) => (
                  <tr key={i} className="border-b border-slate-50">
                    <td className="px-5 py-3.5 text-sm text-slate-800">{item.description}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{item.qty}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{item.unit}</td>
                    <td className="px-5 py-3.5 text-sm font-500 text-slate-900">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
            <div className="w-60 space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span><span>$23,500</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Tax (8%)</span><span>$1,880</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-700 text-slate-900">
                <span>Total</span><span className="text-blue-600">{invoice.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment history */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-600 text-slate-900">Payment History</h2>
          </div>
          {invoice.status === 'Paid' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Date', 'Method', 'Reference', 'Amount', 'Status'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((p, i) => (
                    <tr key={i} className="border-b border-slate-50">
                      <td className="px-5 py-3 text-sm text-slate-600">{p.date}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{p.method}</td>
                      <td className="px-5 py-3 text-sm text-slate-500 font-mono text-xs">{p.ref}</td>
                      <td className="px-5 py-3 text-sm font-600 text-slate-900">{p.amount}</td>
                      <td className="px-5 py-3">
                        <span className="bg-green-50 text-green-700 ring-1 ring-green-600/20 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-500">{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-5 py-8 text-center text-sm text-slate-400">No payments recorded yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
