import { useState } from 'react'
import { AlertTriangle, FileText, Wrench, ShoppingCart, Building2, DollarSign, Bell, Check } from 'lucide-react'
import { notifications } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { onNavigate: NavigateFn }

const iconMap: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  alert: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
  contract: { icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
  install: { icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-50' },
  order: { icon: ShoppingCart, color: 'text-amber-600', bg: 'bg-amber-50' },
  account: { icon: Building2, color: 'text-green-600', bg: 'bg-green-50' },
  payment: { icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
}

export default function NotificationsScreen({ onNavigate }: Props) {
  const [tab, setTab] = useState<'all' | 'unread'>('all')
  const [readIds, setReadIds] = useState<number[]>(
    notifications.filter((n) => n.read).map((n) => n.id)
  )

  const markRead = (id: number) => setReadIds((prev) => [...prev, id])
  const markAllRead = () => setReadIds(notifications.map((n) => n.id))

  const displayed = notifications.filter((n) => {
    if (tab === 'unread') return !readIds.includes(n.id)
    return true
  })

  const unreadCount = notifications.filter((n) => !readIds.includes(n.id)).length

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Notifications</h1>
          <p className="text-sm text-slate-500 mt-0.5">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-500"
          >
            <Check size={14} />
            Mark all as read
          </button>
        )}
      </div>

      <div className="max-w-2xl">
        {/* Tabs */}
        <div className="flex gap-1 mb-4 p-1 bg-slate-100 rounded-lg w-fit">
          {[
            { id: 'all', label: 'All', count: notifications.length },
            { id: 'unread', label: 'Unread', count: unreadCount },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as 'all' | 'unread')}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm font-500 rounded-md transition-colors ${tab === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {t.label}
              <span className={`text-xs rounded-full px-1.5 py-0.5 ${tab === t.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden">
          {displayed.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Bell size={40} className="mb-3 text-slate-200" />
              <p className="text-sm font-500 text-slate-500">No {tab === 'unread' ? 'unread ' : ''}notifications</p>
            </div>
          )}
          {displayed.map((notif, idx) => {
            const isRead = readIds.includes(notif.id)
            const meta = iconMap[notif.icon] || iconMap.alert
            const Icon = meta.icon
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 p-5 border-b border-slate-100 last:border-0 transition-all duration-200 group cursor-pointer ${isRead ? 'hover:bg-slate-50' : 'bg-sky-50/20 hover:bg-sky-50/50'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${meta.bg}`}>
                  <Icon size={18} className={meta.color} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-600 text-slate-800">{notif.title}</span>
                    {!isRead && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 shadow-sm shadow-blue-500/50" />
                    )}
                  </div>
                  <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">{notif.description}</p>
                  <p className="text-[11px] font-500 text-slate-400 mt-2">{notif.time}</p>
                </div>
                {!isRead && (
                  <button
                    onClick={(e) => { e.stopPropagation(); markRead(notif.id) }}
                    className="opacity-0 group-hover:opacity-100 text-xs text-blue-600 hover:text-blue-700 font-600 flex-shrink-0 transition-opacity px-3 py-1.5 rounded-lg hover:bg-blue-100/50"
                  >
                    Mark read
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
