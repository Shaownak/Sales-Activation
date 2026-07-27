import { useState } from 'react'
import { Search, Plus, Pencil, Trash2, Star } from 'lucide-react'
import { contacts } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { onNavigate: NavigateFn }

export default function ContactsScreen({ onNavigate }: Props) {
  const [search, setSearch] = useState('')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = contacts.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.account.toLowerCase().includes(q)
    )
  })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Contacts</h1>
          <p className="text-sm text-slate-500 mt-0.5">{contacts.length} total contacts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-500 rounded-lg transition-colors shadow-sm">
          <Plus size={16} />
          Add Contact
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search contacts, accounts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {['Name', 'Email', 'Phone', 'Associated Account', 'Role', 'Primary', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-600 text-slate-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  onMouseEnter={() => setHoveredId(contact.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-600 flex-shrink-0">
                        {contact.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="text-sm font-500 text-slate-900">{contact.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{contact.email}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{contact.phone}</td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => onNavigate('account-details', contact.accountId)}
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {contact.account}
                    </button>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{contact.role}</td>
                  <td className="px-4 py-3.5">
                    <Star
                      size={15}
                      className={contact.isPrimary ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <div
                      className={`flex items-center gap-2 transition-opacity ${hoveredId === contact.id ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                        <Pencil size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-400">
                    No contacts match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
