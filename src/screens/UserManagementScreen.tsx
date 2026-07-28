import { useState } from 'react'
import { Plus, Pencil, MoreVertical } from 'lucide-react'
import { users } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { onNavigate: NavigateFn }

const roleColor: Record<string, string> = {
  Admin: 'bg-purple-50 text-purple-700 ring-1 ring-purple-600/20',
  'Sales Manager': 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
  Operations: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
  Finance: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
  Support: 'bg-slate-100 text-slate-600',
}

const avatarColor = [
  'bg-blue-600', 'bg-purple-600', 'bg-amber-600',
  'bg-green-600', 'bg-rose-600', 'bg-teal-600',
]

export default function UserManagementScreen({ onNavigate }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [userData, setUserData] = useState(users)

  const deactivate = (id: string) => {
    setUserData((prev) => prev.map((u) => u.id === id ? { ...u, status: 'Inactive' } : u))
    setMenuOpen(null)
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-700 text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">{users.length} users · {users.filter((u) => u.status === 'Active').length} active</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-500 rounded-lg transition-colors shadow-sm">
          <Plus size={16} />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-100">
              {['User', 'Email', 'Role', 'Status', 'Last Login', ''].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-600 text-slate-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userData.map((user, i) => (
              <tr
                key={user.id}
                className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                onMouseEnter={() => setHoveredId(user.id)}
                onMouseLeave={() => { setHoveredId(null); setMenuOpen(null) }}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${avatarColor[i % avatarColor.length]} flex items-center justify-center text-white text-xs font-700`}>
                      {user.avatar}
                    </div>
                    <span className="text-sm font-500 text-slate-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">{user.email}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-500 ${roleColor[user.role] || 'bg-slate-100 text-slate-600'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`} />
                    <span className={`text-sm ${user.status === 'Active' ? 'text-green-700' : 'text-slate-500'}`}>{user.status}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-500">{user.lastLogin}</td>
                <td className="px-5 py-4">
                  <div className={`flex items-center gap-1 transition-opacity ${hoveredId === user.id ? 'opacity-100' : 'opacity-0'}`}>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 text-xs font-500 flex items-center gap-1">
                      <Pencil size={13} />
                      Edit
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                      >
                        <MoreVertical size={14} />
                      </button>
                      {menuOpen === user.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-10">
                          <button
                            onClick={() => deactivate(user.id)}
                            className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                          >
                            {user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                          </button>
                          <button className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50">
                            Reset Password
                          </button>
                          <button className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50">
                            View Activity
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
