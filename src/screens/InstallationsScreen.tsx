import { useState } from 'react'
import { GripVertical, AlertCircle, CheckCircle, Clock, Calendar } from 'lucide-react'
import { installations } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { onNavigate: NavigateFn }

type KanbanStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Issues'

const columns: { id: KanbanStatus; label: string; color: string; bg: string; dot: string }[] = [
  { id: 'Scheduled', label: 'Scheduled', color: 'text-slate-700', bg: 'bg-slate-100', dot: 'bg-slate-400' },
  { id: 'In Progress', label: 'In Progress', color: 'text-blue-700', bg: 'bg-blue-50', dot: 'bg-blue-500' },
  { id: 'Completed', label: 'Completed', color: 'text-green-700', bg: 'bg-green-50', dot: 'bg-green-500' },
  { id: 'Issues', label: 'Issues', color: 'text-red-700', bg: 'bg-red-50', dot: 'bg-red-500' },
]

function InstallCard({ inst }: { inst: (typeof installations)[0] }) {
  const iconMap: Record<string, React.ReactNode> = {
    Scheduled: <Clock size={13} className="text-slate-400" />,
    'In Progress': <Clock size={13} className="text-blue-500 animate-pulse" />,
    Completed: <CheckCircle size={13} className="text-green-500" />,
    Issues: <AlertCircle size={13} className="text-red-500" />,
  }
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-blue-200 transition-all group">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-600 text-slate-400">{inst.id}</span>
        <GripVertical size={14} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
      </div>
      <div className="text-sm font-600 text-slate-900 mb-1">{inst.account}</div>
      <div className="text-xs text-slate-500 mb-3">{inst.type}</div>
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
        <Calendar size={11} />
        {inst.date} · {inst.time}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
        <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-700 text-slate-600">
          {inst.installer.split(' ').map((n) => n[0]).join('')}
        </div>
        {inst.installer}
      </div>
      {inst.notes && (
        <div className="flex items-start gap-1.5 p-2 rounded-lg bg-slate-50 text-xs text-slate-500">
          {iconMap[inst.status]}
          <span className="leading-relaxed">{inst.notes}</span>
        </div>
      )}
    </div>
  )
}

export default function InstallationsScreen({ onNavigate }: Props) {
  const [items, setItems] = useState(installations)

  const getByStatus = (status: KanbanStatus) => items.filter((i) => i.status === status)

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Installation Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">{installations.length} active installations</p>
        </div>
        <button
          onClick={() => onNavigate('installation-calendar')}
          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Calendar size={15} />
          Calendar View
        </button>
      </div>

      {/* Kanban board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colItems = getByStatus(col.id)
          return (
            <div key={col.id} className="flex flex-col">
              {/* Column header */}
              <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl mb-3 ${col.bg}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${col.dot}`} />
                  <span className={`text-xs font-600 ${col.color}`}>{col.label}</span>
                </div>
                <span className={`text-xs font-700 ${col.color}`}>{colItems.length}</span>
              </div>

              {/* Cards */}
              <div className="space-y-2.5 flex-1">
                {colItems.map((inst) => (
                  <InstallCard key={inst.id} inst={inst} />
                ))}
                {colItems.length === 0 && (
                  <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
                    No installations
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
