import { useState } from 'react'
import { ChevronDown, ChevronRight, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { onboardingAccounts } from '../data/mockData'
import type { NavigateFn } from '../App'

interface Props { onNavigate: NavigateFn }

const statusColor: Record<string, string> = {
  Completed: 'text-green-600',
  'In Progress': 'text-blue-600',
  Pending: 'text-slate-400',
}

const taskStatusBadge: Record<string, string> = {
  Completed: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
  'In Progress': 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
  Pending: 'bg-slate-100 text-slate-500',
}

const taskIcon: Record<string, React.ReactNode> = {
  Completed: <CheckCircle2 size={14} className="text-green-500" />,
  'In Progress': <Clock size={14} className="text-blue-500" />,
  Pending: <Clock size={14} className="text-slate-300" />,
}

const progressColor: Record<string, string> = {
  Completed: 'bg-green-500',
  'In Progress': 'bg-blue-500',
  'At Risk': 'bg-red-500',
}

const accountStatusBadge: Record<string, string> = {
  Completed: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
  'In Progress': 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
  'At Risk': 'bg-red-50 text-red-700 ring-1 ring-red-600/20',
}

export default function OnboardingScreen({ onNavigate }: Props) {
  const [expanded, setExpanded] = useState<string[]>([])

  const toggle = (id: string) =>
    setExpanded((prev) => prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Onboarding Tracking</h1>
          <p className="text-sm text-slate-500 mt-0.5">{onboardingAccounts.length} accounts in onboarding pipeline</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: 'Completed', count: onboardingAccounts.filter((a) => a.status === 'Completed').length, color: 'text-green-600' },
          { label: 'In Progress', count: onboardingAccounts.filter((a) => a.status === 'In Progress').length, color: 'text-blue-600' },
          { label: 'At Risk', count: onboardingAccounts.filter((a) => a.status === 'At Risk').length, color: 'text-red-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className={`text-2xl font-700 ${s.color}`}>{s.count}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {onboardingAccounts.map((account) => {
          const isExpanded = expanded.includes(account.id)
          const barColor = progressColor[account.status] || 'bg-blue-500'

          return (
            <div key={account.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Row */}
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => toggle(account.id)}
              >
                <button className="text-slate-400 flex-shrink-0">
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-700 flex-shrink-0">
                  {account.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-600 text-slate-900">{account.name}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-500 ${accountStatusBadge[account.status]}`}>
                      {account.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${barColor}`}
                        style={{ width: `${account.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-600 text-slate-700 w-8 text-right">{account.progress}%</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 flex-shrink-0">
                  {account.tasks.filter((t) => t.status === 'Completed').length}/{account.tasks.length} tasks
                </div>
              </div>

              {/* Expanded tasks */}
              {isExpanded && (
                <div className="border-t border-slate-100">
                  <div className="px-5 py-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-600 text-slate-500 uppercase tracking-wide">Onboarding Tasks</span>
                      <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-500">
                        <Plus size={12} /> Add Task
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-100">
                            {['', 'Task', 'Assignee', 'Status', 'Due Date'].map((h) => (
                              <th key={h} className="pb-2 text-left text-xs font-600 text-slate-400 pr-4 first:pr-2">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {account.tasks.map((task) => (
                            <tr key={task.id} className="border-b border-slate-50 last:border-0">
                              <td className="py-2.5 pr-2">{taskIcon[task.status]}</td>
                              <td className="py-2.5 pr-4 text-sm text-slate-800">{task.name}</td>
                              <td className="py-2.5 pr-4 text-sm text-slate-500">{task.assignee}</td>
                              <td className="py-2.5 pr-4">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-500 ${taskStatusBadge[task.status]}`}>
                                  {task.status}
                                </span>
                              </td>
                              <td className="py-2.5 text-sm text-slate-500">{task.dueDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
