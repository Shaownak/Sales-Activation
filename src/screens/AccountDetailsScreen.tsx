import { useState } from 'react'
import { ArrowLeft, Edit2, Plus, Mail, Phone, Building2, MapPin } from 'lucide-react'
import { accounts, contacts, contracts, orders, invoices } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { id: string | null; onNavigate: NavigateFn }

function Badge({ text, variant }: { text: string; variant: string }) {
  const cls: Record<string, string> = {
    Active: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
    Pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
    Signed: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
    Drafted: 'bg-slate-100 text-slate-600',
    Expired: 'bg-red-50 text-red-700 ring-1 ring-red-600/20',
    Completed: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
    'In Progress': 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
    Paid: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
    Issued: 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
    Overdue: 'bg-red-50 text-red-700 ring-1 ring-red-600/20',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-500 ${cls[text] || 'bg-slate-100 text-slate-600'}`}>
      {text}
    </span>
  )
}

const tabs = ['Contracts', 'Orders', 'Invoices']

export default function AccountDetailsScreen({ id, onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState('Contracts')
  const account = accounts.find((a) => a.id === id) || accounts[0]
  const accountContacts = contacts.filter((c) => c.accountId === account.id)
  const accountContracts = contracts.filter((c) => c.accountId === account.id)
  const accountOrders = orders.filter((o) => o.accountId === account.id)
  const accountInvoices = invoices.filter((i) => i.accountId === account.id)

  const activityLog = [
    { action: 'Contract signed', user: 'Alex Morgan', date: '2024-04-10' },
    { action: 'Order ORD-2024-001 completed', user: 'Taylor Smith', date: '2024-02-20' },
    { action: 'Invoice INV-2024-001 paid', user: 'Casey Williams', date: '2024-02-22' },
    { action: 'Account created', user: 'Jordan Lee', date: '2024-01-15' },
  ]

  return (
    <div className="p-4 md:p-6">
      <button
        onClick={() => onNavigate('accounts')}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5"
      >
        <ArrowLeft size={15} /> Back to Accounts
      </button>

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-lg font-700">
            {account.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-700 text-slate-900">{account.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-500 text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{account.type}</span>
              <Badge text={account.status} variant={account.status} />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50">
            <Plus size={14} /> Add Contact
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
            <Edit2 size={14} /> Edit Account
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Left column */}
        <div className="space-y-4">
          {/* Account Info */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-600 text-slate-900 mb-4">Account Information</h2>
            <div className="space-y-3">
              {[
                { icon: Building2, label: 'Account ID', value: account.id },
                { icon: Mail, label: 'Email', value: account.email },
                { icon: Phone, label: 'Phone', value: account.phone },
                { icon: MapPin, label: 'Type', value: account.type },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <Icon size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400">{label}</div>
                    <div className="text-sm text-slate-800">{value}</div>
                  </div>
                </div>
              ))}
              <div>
                <div className="text-xs text-slate-400 mb-1">Annual Recurring Revenue</div>
                <div className="text-lg font-700 text-blue-600">{account.arr}</div>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-600 text-slate-900 mb-4">Contacts ({accountContacts.length})</h2>
            <div className="space-y-3">
              {accountContacts.map((c) => (
                <div key={c.id} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-600 flex-shrink-0">
                    {c.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-500 text-slate-800">{c.name}</div>
                    <div className="text-xs text-slate-400">{c.role}</div>
                  </div>
                  {c.isPrimary && (
                    <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-500">Primary</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-sm font-600 text-slate-900 mb-4">Activity Log</h2>
            <div className="space-y-3">
              {activityLog.map((log, i) => (
                <div key={i} className="flex gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-slate-700">{log.action}</div>
                    <div className="text-xs text-slate-400">{log.user} · {log.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column – tabs */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="flex border-b border-slate-100">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3.5 text-sm font-500 border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  {tab}
                  <span className="ml-1.5 text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">
                    {tab === 'Contracts' ? accountContracts.length : tab === 'Orders' ? accountOrders.length : accountInvoices.length}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-5">
              {activeTab === 'Contracts' && (
                <div className="space-y-2.5">
                  {accountContracts.length === 0 && <p className="text-sm text-slate-400">No contracts found.</p>}
                  {accountContracts.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between p-3.5 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 cursor-pointer transition-colors"
                      onClick={() => onNavigate('contract-details', c.id)}
                    >
                      <div>
                        <div className="text-sm font-500 text-slate-900">{c.id}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{c.startDate} → {c.endDate}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-600 text-slate-800">{c.value}</span>
                        <Badge text={c.status} variant={c.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'Orders' && (
                <div className="space-y-2.5">
                  {accountOrders.length === 0 && <p className="text-sm text-slate-400">No orders found.</p>}
                  {accountOrders.map((o) => (
                    <div
                      key={o.id}
                      className="flex items-center justify-between p-3.5 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 cursor-pointer transition-colors"
                      onClick={() => onNavigate('order-details', o.id)}
                    >
                      <div>
                        <div className="text-sm font-500 text-slate-900">{o.id}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{o.provider} · {o.delivery}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-600 text-slate-800">{o.total}</span>
                        <Badge text={o.status} variant={o.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'Invoices' && (
                <div className="space-y-2.5">
                  {accountInvoices.length === 0 && <p className="text-sm text-slate-400">No invoices found.</p>}
                  {accountInvoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="flex items-center justify-between p-3.5 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 cursor-pointer transition-colors"
                      onClick={() => onNavigate('invoice-details', inv.id)}
                    >
                      <div>
                        <div className="text-sm font-500 text-slate-900">{inv.id}</div>
                        <div className="text-xs text-slate-400 mt-0.5">Due {inv.dueDate}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-600 text-slate-800">{inv.total}</span>
                        <Badge text={inv.status} variant={inv.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
