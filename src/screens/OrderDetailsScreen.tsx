import { ArrowLeft, Wrench, Calendar, CheckCircle2 } from 'lucide-react'
import { orders } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { id: string | null; onNavigate: NavigateFn }

const orderItems = [
  { product: 'Platform License – Annual', qty: 1, price: '$7,200', total: '$7,200' },
  { product: 'API Integration Module', qty: 2, price: '$2,400', total: '$4,800' },
  { product: 'On-site Setup Fee', qty: 1, price: '$3,200', total: '$3,200' },
  { product: 'Extended Warranty (1yr)', qty: 1, price: '$1,200', total: '$1,200' },
]

function StatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    Completed: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
    'In Progress': 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
    Pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-500 ${cls[status] || ''}`}>
      {status}
    </span>
  )
}

export default function OrderDetailsScreen({ id, onNavigate }: Props) {
  const order = orders.find((o) => o.id === id) || orders[0]

  return (
    <div className="p-4 md:p-6">
      <button
        onClick={() => onNavigate('orders')}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5"
      >
        <ArrowLeft size={15} /> Back to Orders
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-700 text-slate-900">{order.id}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-slate-500">{order.account}</span>
            <StatusBadge status={order.status} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl space-y-4">
        {/* Order info card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-600 text-slate-900 mb-4">Order Information</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Order ID', value: order.id },
              { label: 'Account', value: order.account },
              { label: 'Provider', value: order.provider },
              { label: 'Delivery Option', value: order.delivery },
              { label: 'Status', value: <StatusBadge status={order.status} /> },
              { label: 'Created', value: order.createdAt },
              { label: 'Total Value', value: order.total },
              { label: 'Assigned To', value: 'Taylor Smith' },
            ].map((f) => (
              <div key={f.label}>
                <div className="text-xs text-slate-400 mb-0.5">{f.label}</div>
                <div className="text-sm font-500 text-slate-800">{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Order items */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-600 text-slate-900">Order Items</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Product', 'Qty', 'Unit Price', 'Total'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, i) => (
                  <tr key={i} className="border-b border-slate-50">
                    <td className="px-5 py-3.5 text-sm text-slate-800">{item.product}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{item.qty}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{item.price}</td>
                    <td className="px-5 py-3.5 text-sm font-500 text-slate-900">{item.total}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50">
                  <td colSpan={3} className="px-5 py-3.5 text-sm font-600 text-slate-900 text-right">Order Total</td>
                  <td className="px-5 py-3.5 text-sm font-700 text-blue-600">{order.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Provider coordination */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-600 text-slate-900 mb-4">Provider Coordination</h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-500 text-slate-900">{order.provider}</div>
              <div className="text-xs text-slate-400 mt-0.5">Authorized service partner</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-500 text-slate-500">API Status:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-500 bg-green-50 text-green-700 ring-1 ring-green-600/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Connected
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {['Order Submitted', 'Provider Confirmed', 'Scheduled'].map((step, i) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${i <= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {i <= 1 ? <CheckCircle2 size={16} /> : <span className="text-xs font-600">{i + 1}</span>}
                </div>
                <div className="text-xs text-slate-600">{step}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => onNavigate('installation-calendar')}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg font-500 transition-colors"
          >
            <Calendar size={14} />
            Schedule Installation
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-500 transition-colors shadow-sm">
            <Wrench size={14} />
            Process Order
          </button>
        </div>
      </div>
    </div>
  )
}
